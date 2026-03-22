from pydantic import BaseModel, Field

from fastapi import APIRouter, HTTPException

from app.config import settings
from app.embeddings import embed_query
from app.prompts import CHAT_DISCLAIMER_BLOCK, LEGAL_SYSTEM_GROQ
from app.groq_client import chat_completion
from app.supabase_store import get_supabase, match_chunks

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=8000)
    explain_simple: bool = False
    session_id: str | None = None


class SourceRef(BaseModel):
    document_title: str | None = None
    source_label: str | None = None
    doc_type: str | None = None
    content: str
    similarity: float | None = None


class ChatResponse(BaseModel):
    reply: str
    sources: list[SourceRef]
    disclaimer: str


@router.post("/", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        q_emb = embed_query(req.message)
    except Exception as e:  # noqa: BLE001
        raise HTTPException(503, f"Embedding failed: {e!s}") from e

    try:
        client = get_supabase()
        hits = match_chunks(client, q_emb, settings.rag_top_k)
    except Exception as e:  # noqa: BLE001
        raise HTTPException(503, f"Retrieval failed: {e!s}") from e

    context_blocks: list[str] = []
    sources: list[SourceRef] = []
    for h in hits:
        content = h.get("content") or ""
        context_blocks.append(
            f"[{h.get('document_title') or 'Source'} — {h.get('doc_type') or 'doc'}]\n{content}"
        )
        sources.append(
            SourceRef(
                document_title=h.get("document_title"),
                source_label=h.get("source_label"),
                doc_type=h.get("doc_type"),
                content=content[:500] + ("…" if len(content) > 500 else ""),
                similarity=h.get("similarity"),
            )
        )

    context = "\n\n".join(context_blocks) if context_blocks else "(No retrieved context — answer generally and caution strongly.)"

    style = (
        "Explain at a level a curious teenager could follow. Avoid jargon or define it."
        if req.explain_simple
        else "Use clear, professional plain language."
    )

    messages = [
        {"role": "system", "content": LEGAL_SYSTEM_GROQ},
        {
            "role": "user",
            "content": f"{CHAT_DISCLAIMER_BLOCK}\n\nStyle: {style}\n\nContext from knowledge base:\n{context}\n\nUser question:\n{req.message}",
        },
    ]

    try:
        reply = await chat_completion(messages)
    except Exception as e:  # noqa: BLE001
        raise HTTPException(503, f"LLM failed: {e!s}") from e

    return ChatResponse(
        reply=reply,
        sources=sources,
        disclaimer=CHAT_DISCLAIMER_BLOCK,
    )

import google.generativeai as genai

from app.config import settings


def configure_genai() -> None:
    if settings.gemini_api_key:
        genai.configure(api_key=settings.gemini_api_key)


def embed_texts(texts: list[str], task_type: str = "retrieval_document") -> list[list[float]]:
    configure_genai()
    if not settings.gemini_api_key:
        raise RuntimeError("GEMINI_API_KEY is required for embeddings")
    out: list[list[float]] = []
    for t in texts:
        # Batch could use embed_content with list in newer API; sequential is fine for MVP.
        r = genai.embed_content(
            model=settings.gemini_embedding_model,
            content=t[:8000],
            task_type=task_type,
        )
        emb = r.get("embedding")
        if not emb:
            raise RuntimeError("Empty embedding from Gemini")
        out.append(list(emb))
    return out


def embed_query(text: str) -> list[float]:
    vecs = embed_texts([text], task_type="retrieval_query")
    return vecs[0]

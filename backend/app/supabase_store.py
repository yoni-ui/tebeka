from typing import Any
from uuid import UUID

from supabase import Client, create_client

from app.config import settings


def get_supabase() -> Client:
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise RuntimeError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required")
    return create_client(settings.supabase_url, settings.supabase_service_role_key)


def vector_to_pg(vec: list[float]) -> str:
    return "[" + ",".join(str(float(x)) for x in vec) + "]"


def insert_document(
    client: Client,
    *,
    title: str,
    source_label: str | None,
    doc_type: str,
    session_id: str | None = None,
    storage_path: str | None = None,
) -> UUID:
    row = {
        "title": title,
        "source_label": source_label,
        "doc_type": doc_type,
        "session_id": session_id,
        "storage_path": storage_path,
    }
    res = client.table("knowledge_documents").insert(row).execute()
    if not res.data:
        raise RuntimeError("Failed to insert knowledge_documents")
    return UUID(str(res.data[0]["id"]))


def insert_chunks(
    client: Client,
    document_id: UUID,
    chunks: list[str],
    embeddings: list[list[float]],
    base_metadata: dict[str, Any] | None = None,
) -> None:
    if len(chunks) != len(embeddings):
        raise ValueError("chunks and embeddings length mismatch")
    base = base_metadata or {}
    rows = []
    for i, (content, emb) in enumerate(zip(chunks, embeddings)):
        rows.append(
            {
                "document_id": str(document_id),
                "content": content,
                "chunk_index": i,
                "metadata": {**base, "chunk_index": i},
                "embedding": vector_to_pg(emb),
            }
        )
    client.table("knowledge_chunks").insert(rows).execute()


def match_chunks(client: Client, query_embedding: list[float], match_count: int) -> list[dict[str, Any]]:
    res = (
        client.rpc(
            "match_knowledge_chunks",
            {"query_embedding": vector_to_pg(query_embedding), "match_count": match_count},
        ).execute()
    )
    return list(res.data or [])


def list_documents(client: Client) -> list[dict[str, Any]]:
    res = (
        client.table("knowledge_documents")
        .select("id,title,source_label,doc_type,created_at,session_id")
        .order("created_at", desc=True)
        .execute()
    )
    return list(res.data or [])


def delete_document_cascade(client: Client, document_id: UUID) -> None:
    client.table("knowledge_documents").delete().eq("id", str(document_id)).execute()


def fetch_chunks_text_for_document(client: Client, document_id: UUID) -> str:
    res = (
        client.table("knowledge_chunks")
        .select("content,chunk_index")
        .eq("document_id", str(document_id))
        .order("chunk_index")
        .execute()
    )
    rows = res.data or []
    return "\n\n".join(r["content"] for r in rows)

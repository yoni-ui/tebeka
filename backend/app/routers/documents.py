from uuid import UUID

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.chunking import chunk_text
from app.config import settings
from app.embeddings import embed_texts
from app.extract_text import extract_by_filename
from app.supabase_store import get_supabase, insert_chunks, insert_document

router = APIRouter(prefix="/documents", tags=["documents"])


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    title: str | None = Form(None),
    doc_type: str = Form("user_upload"),
    session_id: str | None = Form(None),
):
    if doc_type not in ("law", "regulation", "template", "user_upload"):
        raise HTTPException(400, "doc_type must be law|regulation|template|user_upload")
    raw = await file.read()
    if not raw:
        raise HTTPException(400, "Empty file")
    try:
        text = extract_by_filename(file.filename or "doc.pdf", raw)
    except ValueError as e:
        raise HTTPException(400, str(e)) from e
    if not text.strip():
        raise HTTPException(400, "No extractable text in document")

    chunks = chunk_text(text)
    if not chunks:
        raise HTTPException(400, "Could not chunk document")

    client = get_supabase()
    doc_title = title or (file.filename or "Uploaded document")
    doc_id = insert_document(
        client,
        title=doc_title,
        source_label=file.filename,
        doc_type=doc_type,
        session_id=session_id,
        storage_path=None,
    )
    embeddings = embed_texts(chunks, task_type="retrieval_document")
    insert_chunks(
        client,
        doc_id,
        chunks,
        embeddings,
        base_metadata={"filename": file.filename},
    )
    return {
        "document_id": str(doc_id),
        "title": doc_title,
        "chunks": len(chunks),
    }


@router.get("/{document_id}/preview")
def preview_document(document_id: UUID):
    from app.supabase_store import fetch_chunks_text_for_document

    client = get_supabase()
    text = fetch_chunks_text_for_document(client, document_id)
    if not text:
        raise HTTPException(404, "Document not found or has no chunks")
    return {"document_id": str(document_id), "text_preview": text[:8000]}

from uuid import UUID

from fastapi import APIRouter, HTTPException

from app.gemini_analysis import analyze_contract_text
from app.supabase_store import fetch_chunks_text_for_document, get_supabase

router = APIRouter(prefix="/analyze", tags=["analyze"])


@router.post("/{document_id}")
def analyze_document(document_id: UUID):
    client = get_supabase()
    text = fetch_chunks_text_for_document(client, document_id)
    if not text.strip():
        raise HTTPException(404, "Document not found or empty")
    try:
        result = analyze_contract_text(text)
    except Exception as e:  # noqa: BLE001
        raise HTTPException(503, f"Analysis failed: {e!s}") from e
    return {"document_id": str(document_id), "analysis": result}

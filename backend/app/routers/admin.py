from uuid import UUID

from fastapi import APIRouter, Depends, Header, HTTPException

from app.config import settings
from app.supabase_store import delete_document_cascade, get_supabase, list_documents

router = APIRouter(prefix="/admin", tags=["admin"])


def require_admin(x_admin_key: str | None = Header(default=None, alias="X-Admin-Key")):
    if not settings.admin_api_key:
        raise HTTPException(503, "Admin API not configured (set ADMIN_API_KEY)")
    if not x_admin_key or x_admin_key != settings.admin_api_key:
        raise HTTPException(401, "Invalid or missing X-Admin-Key")
    return True


@router.get("/documents", dependencies=[Depends(require_admin)])
def admin_list_documents():
    client = get_supabase()
    return {"documents": list_documents(client)}


@router.delete("/documents/{document_id}", dependencies=[Depends(require_admin)])
def admin_delete_document(document_id: UUID):
    client = get_supabase()
    delete_document_cascade(client, document_id)
    return {"ok": True, "deleted": str(document_id)}

from fastapi import APIRouter

from app.config import settings
from app.supabase_store import get_supabase

router = APIRouter(tags=["health"])


@router.get("/health")
def health():
    return {"status": "ok"}


@router.get("/health/ready")
def ready():
    errors: list[str] = []
    if not settings.supabase_url or not settings.supabase_service_role_key:
        errors.append("supabase_not_configured")
    else:
        try:
            client = get_supabase()
            client.table("knowledge_documents").select("id").limit(1).execute()
        except Exception as e:  # noqa: BLE001
            errors.append(f"supabase: {e!s}")
    if not settings.groq_api_key:
        errors.append("groq_not_configured")
    if not settings.gemini_api_key:
        errors.append("gemini_not_configured")
    return {"ready": len(errors) == 0, "warnings": errors}

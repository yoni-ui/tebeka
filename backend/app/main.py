from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import admin, analyze, chat, documents, health

app = FastAPI(
    title="Legal Assistant AI API",
    description="Ethiopia-focused legal information assistant — not legal advice.",
    version="0.1.0",
)

origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(documents.router)
app.include_router(chat.router)
app.include_router(analyze.router)
app.include_router(admin.router)


@app.get("/")
def root():
    return {"service": "legal-assistant-ai", "docs": "/docs"}

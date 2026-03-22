# Tebeka — Legal Assistant AI (Ethiopia)

MVP scaffold: **FastAPI** backend (RAG on **Supabase pgvector**, **Groq** chat, **Gemini** embeddings + analysis) and a **modular Next.js (App Router)** frontend (marketing, auth, product, admin) aligned with the Stitch design tokens in `stitch_rag_app_technical_specification_prd/`.

**This is not legal advice.** The product is an informational assistant; users must consult qualified counsel in Ethiopia for legal decisions.

## Prerequisites

- Python 3.11+
- Node.js 20+
- A [Supabase](https://supabase.com/) project
- API keys: [Groq](https://console.groq.com/), [Google AI Studio](https://aistudio.google.com/) (Gemini)

## 1. Supabase

1. Create a project and open **SQL Editor**.
2. Run the migration in [`supabase/migrations/20250321000000_init_knowledge_rag.sql`](supabase/migrations/20250321000000_init_knowledge_rag.sql) (or use Supabase CLI `db push` if you link the repo).

This enables `vector`, creates `knowledge_documents` / `knowledge_chunks`, and adds `match_knowledge_chunks(query_embedding, match_count)`.

Embeddings are **768-dimensional** (Gemini `text-embedding-004`). If you change embedding models, alter the migration dimension and re-embed.

## 2. Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
# Edit .env with your keys and Supabase URL + service role key
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Use the **virtualenv’s** Python (`.\.venv\Scripts\python`) so dependencies match. If `uvicorn` is not on PATH, `python -m uvicorn` still works.

- OpenAPI: http://127.0.0.1:8000/docs  
- Health: `GET /health`  
- Readiness (soft checks): `GET /health/ready`

### Main API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/documents/upload` | multipart `file` (PDF/DOCX), optional `title`, `doc_type`, `session_id` |
| GET | `/documents/{uuid}/preview` | First ~8k chars of stored chunks |
| POST | `/chat/` | JSON `{ message, explain_simple?, session_id? }` — RAG + Groq |
| POST | `/analyze/{document_id}` | Gemini structured analysis |
| GET | `/admin/documents` | List docs (header `X-Admin-Key`) |
| DELETE | `/admin/documents/{document_id}` | Delete doc + chunks |

## 3. Frontend (Next.js)

```powershell
cd frontend
npm install
copy .env.example .env.local
# Optional: set ADMIN_PANEL_SECRET, BACKEND_URL — see frontend/.env.example
npm run dev
```

- App: http://localhost:3000  
- **Rewrites:** Requests from the browser to `/chat`, `/documents`, `/analyze`, `/health`, and `/admin/documents` are proxied to `BACKEND_URL` (default `http://127.0.0.1:8000`).  
- **Production:** Set `NEXT_PUBLIC_API_URL` to your public API origin if the API is on another domain (no trailing slash), or deploy API and Next together and keep rewrites.

### Auth (MVP)

- **`/app/*`:** Requires cookie `tebeka_user` (demo: sign in from `/login` — any email/password submits and sets the cookie via `/api/auth/sign-in`). Replace with **Supabase Auth** when ready.
- **`/admin/*`:** Requires cookie `tebeka_admin`; use `/admin/login` with `ADMIN_PANEL_SECRET` (Next server env). This is separate from FastAPI’s `X-Admin-Key` / `ADMIN_API_KEY`.
- **`NEXT_PUBLIC_AUTH_DISABLED=true`:** Skips middleware guards (local UI only).

### Key routes

| Area | Paths |
|------|--------|
| Marketing | `/`, `/pricing` |
| Auth | `/login`, `/register`, `/forgot-password` |
| Product | `/app/chat`, `/app/upload`, `/app/analysis/[documentId]`, `/app/history`, `/app/documents/[documentId]`, `/app/settings`, `/app/notifications` |
| Admin | `/admin/login`, `/admin`, `/admin/knowledge`, `/admin/logs`, … |

## 4. Design reference

UI tokens follow **`stitch_rag_app_technical_specification_prd`** HTML exports and **`synthetix_mono/DESIGN.md`**. Product naming remains **Tebeka** (not LexiGen placeholders in Stitch files).

## Troubleshooting

- **Vector insert errors:** Ensure the migration ran and embedding length is **768**. Some PostgREST versions prefer the embedding as a bracket string; the backend sends a PostgreSQL vector literal string.
- **Empty RAG results:** Ingest laws or uploads first; an empty index yields generic answers with a warning in context.
- **CORS:** Backend allows `http://localhost:3000` and legacy `5173` by default.

## License

Use and modify for your product; ensure compliance with Ethiopian law and your own counsel for go-to-market.

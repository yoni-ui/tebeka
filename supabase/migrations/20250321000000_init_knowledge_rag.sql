-- Legal Assistant AI — knowledge base + pgvector
-- Embedding dimension 768 = Gemini text-embedding-004

create extension if not exists vector;

create table public.knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_label text,
  doc_type text not null check (doc_type in ('law', 'regulation', 'template', 'user_upload')),
  storage_path text,
  session_id text,
  created_at timestamptz not null default now()
);

create table public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.knowledge_documents (id) on delete cascade,
  content text not null,
  chunk_index int not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector(768) not null
);

create index knowledge_chunks_document_id_idx on public.knowledge_chunks (document_id);
create index knowledge_chunks_embedding_idx on public.knowledge_chunks
  using hnsw (embedding vector_cosine_ops);

comment on table public.knowledge_documents is 'Ingested legal corpus and user uploads';
comment on table public.knowledge_chunks is 'Chunked text with embeddings for RAG';

-- Semantic search: cosine distance (<=>). Returns similarity = 1 - distance for readability.
create or replace function public.match_knowledge_chunks (
  query_embedding vector(768),
  match_count int default 8
)
returns table (
  id uuid,
  document_id uuid,
  content text,
  chunk_index int,
  metadata jsonb,
  document_title text,
  source_label text,
  doc_type text,
  similarity float
)
language sql
stable
parallel safe
as $$
  select
    kc.id,
    kc.document_id,
    kc.content,
    kc.chunk_index,
    kc.metadata,
    kd.title as document_title,
    kd.source_label,
    kd.doc_type,
    (1 - (kc.embedding <=> query_embedding))::float as similarity
  from public.knowledge_chunks kc
  join public.knowledge_documents kd on kd.id = kc.document_id
  order by kc.embedding <=> query_embedding
  limit least(coalesce(match_count, 8), 50);
$$;

-- Backend uses service_role only for MVP (no direct client RPC).
grant execute on function public.match_knowledge_chunks (vector(768), int) to service_role;

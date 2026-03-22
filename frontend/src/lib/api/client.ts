import { getPublicApiBase } from "@/lib/env";

export type ChatSource = {
  document_title: string | null;
  source_label: string | null;
  doc_type: string | null;
  content: string;
  similarity: number | null;
};

export type ChatResponse = {
  reply: string;
  sources: ChatSource[];
  disclaimer: string;
};

export type UploadResponse = {
  document_id: string;
  title: string;
  chunks: number;
};

export type AnalysisPayload = {
  document_id: string;
  analysis: {
    summary?: string;
    risks?: { level: string; title: string; detail: string }[];
    clauses?: { title: string; plain_explanation: string }[];
    simplified_version?: string;
  };
};

export type AdminDocument = {
  id: string;
  title: string;
  source_label: string | null;
  doc_type: string;
  created_at: string;
  session_id: string | null;
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getPublicApiBase();
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || res.statusText);
  }
  return res.json() as Promise<T>;
}

export async function postChat(message: string, explainSimple: boolean): Promise<ChatResponse> {
  return api<ChatResponse>("/chat/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, explain_simple: explainSimple }),
  });
}

export async function uploadDocument(file: File): Promise<UploadResponse> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("doc_type", "user_upload");
  return api<UploadResponse>("/documents/upload", { method: "POST", body: fd });
}

export async function analyzeDocument(documentId: string): Promise<AnalysisPayload> {
  return api<AnalysisPayload>(`/analyze/${documentId}`, { method: "POST" });
}

export async function listAdminDocuments(
  adminKey: string
): Promise<{ documents: AdminDocument[] }> {
  return api<{ documents: AdminDocument[] }>("/admin/documents", {
    headers: { "X-Admin-Key": adminKey },
  });
}

export async function deleteAdminDocument(adminKey: string, documentId: string): Promise<void> {
  await api<{ ok: boolean }>(`/admin/documents/${documentId}`, {
    method: "DELETE",
    headers: { "X-Admin-Key": adminKey },
  });
}

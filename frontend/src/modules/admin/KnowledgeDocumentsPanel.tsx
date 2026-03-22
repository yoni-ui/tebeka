"use client";

import { useCallback, useState } from "react";
import { listAdminDocuments, deleteAdminDocument, type AdminDocument } from "@/lib/api/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";
import { Input } from "@/components/ui/Input";

const KEY = "tebeka_admin_api_key";

export function KnowledgeDocumentsPanel() {
  const [key, setKey] = useState("");
  const [docs, setDocs] = useState<AdminDocument[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const k = key || (typeof window !== "undefined" ? sessionStorage.getItem(KEY) ?? "" : "");
    if (!k) {
      setError("Set admin API key in Settings or paste below.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await listAdminDocuments(k);
      setDocs(res.documents);
      sessionStorage.setItem(KEY, k);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [key]);

  async function remove(id: string) {
    const k = key || sessionStorage.getItem(KEY) || "";
    if (!k) return;
    if (!confirm("Delete document and all chunks?")) return;
    try {
      await deleteAdminDocument(k, id);
      setDocs((d) => d.filter((x) => x.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <Card>
      <h2 className="font-headline text-lg font-bold text-on-surface">Corpus documents</h2>
      <p className="mt-1 text-sm text-on-surface-variant font-body">
        Uses FastAPI <code className="text-xs text-on-surface">GET /admin/documents</code>. Paste backend{" "}
        <code className="text-xs text-on-surface">ADMIN_API_KEY</code> (same as X-Admin-Key).
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="X-Admin-Key"
          className="max-w-md font-mono text-xs"
          type="password"
        />
        <Button variant="secondary" onClick={load} disabled={loading}>
          {loading ? "Loading…" : "Refresh"}
        </Button>
      </div>
      {error ? (
        <div className="mt-4">
          <ErrorState message={error} onRetry={load} />
        </div>
      ) : null}
      <div className="mt-6 space-y-3">
        {docs.length === 0 && !error ? (
          <p className="text-sm text-on-surface-variant font-body">No rows loaded yet.</p>
        ) : null}
        {docs.map((d) => (
          <div
            key={d.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface-container-low px-4 py-3"
          >
            <div>
              <p className="font-medium text-on-surface font-body">{d.title}</p>
              <p className="text-xs text-on-surface-variant font-mono">{d.id}</p>
              <p className="text-xs text-on-surface-variant font-body">
                {d.doc_type} · {new Date(d.created_at).toLocaleString()}
              </p>
            </div>
            <Button variant="ghost" className="text-error" onClick={() => remove(d.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

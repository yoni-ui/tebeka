"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { uploadDocument, analyzeDocument, type AnalysisPayload } from "@/lib/api/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

type Phase = "empty" | "uploading" | "uploaded" | "processing";

const STORAGE_PREFIX = "tebeka_analysis_";

export function UploadWorkspace() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [phase, setPhase] = useState<Phase>("empty");
  const [docId, setDocId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && (f.name.endsWith(".pdf") || f.name.endsWith(".docx"))) {
      setFile(f);
      setPhase("empty");
      setError(null);
    }
  }, []);

  const ingest = async () => {
    if (!file) return;
    setPhase("uploading");
    setError(null);
    try {
      const res = await uploadDocument(file);
      setDocId(res.document_id);
      setPhase("uploaded");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
      setPhase("empty");
    }
  };

  const runAnalyze = async () => {
    if (!docId) return;
    setPhase("processing");
    setError(null);
    try {
      const res: AnalysisPayload = await analyzeDocument(docId);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(`${STORAGE_PREFIX}${docId}`, JSON.stringify(res));
      }
      router.push(`/app/analysis/${docId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
      setPhase("uploaded");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <h1 className="font-headline text-xl font-bold text-on-surface">Upload &amp; analyze</h1>
        <p className="mt-1 text-sm text-on-surface-variant font-body">
          PDF or DOCX. Text is extracted, chunked, and embedded for RAG.
        </p>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="mt-6 flex min-h-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant/40 bg-surface-container-low px-6 py-12 text-center"
        >
          {file ? (
            <p className="text-sm font-medium text-on-surface font-body">{file.name}</p>
          ) : (
            <EmptyState
              title="Drop a contract here"
              description="Or pick a file below. Supported: PDF, DOCX."
            />
          )}
          <input
            type="file"
            accept=".pdf,.docx"
            className="mt-4 text-sm font-body"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFile(f);
                setError(null);
              }
            }}
          />
        </div>
        {error ? <p className="mt-4 text-sm text-error font-body whitespace-pre-wrap">{error}</p> : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={ingest}
            disabled={!file || phase === "uploading" || phase === "processing"}
            className="gap-2"
          >
            {phase === "uploading" ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
            Ingest document
          </Button>
          <Button
            onClick={runAnalyze}
            disabled={!docId || phase === "processing" || phase === "uploading"}
            className="gap-2"
          >
            {phase === "processing" ? <Loader2 className="animate-spin" size={18} /> : null}
            Analyze
          </Button>
        </div>
        {docId ? (
          <p className="mt-4 text-xs text-on-surface-variant font-body break-all">Document ID: {docId}</p>
        ) : null}
      </Card>
    </div>
  );
}

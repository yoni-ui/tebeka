"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { analyzeDocument, type AnalysisPayload } from "@/lib/api/client";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";

const STORAGE_PREFIX = "tebeka_analysis_";

function riskTone(level: string): "safe" | "warning" | "risk" | "neutral" {
  if (level === "risk") return "risk";
  if (level === "warning") return "warning";
  if (level === "safe") return "safe";
  return "neutral";
}

export function AnalysisResultView({ documentId }: { documentId: string }) {
  const [data, setData] = useState<AnalysisPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const raw =
          typeof window !== "undefined"
            ? sessionStorage.getItem(`${STORAGE_PREFIX}${documentId}`)
            : null;
        if (raw) {
          setData(JSON.parse(raw) as AnalysisPayload);
        } else {
          const res = await analyzeDocument(documentId);
          if (!cancelled) {
            setData(res);
            sessionStorage.setItem(`${STORAGE_PREFIX}${documentId}`, JSON.stringify(res));
          }
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load analysis");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [documentId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse space-y-4">
        <div className="h-10 rounded-xl bg-surface-container-low" />
        <div className="h-40 rounded-xl bg-surface-container-low" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-xl">
        <ErrorState
          message={error ?? "No analysis data"}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  const a = data.analysis;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-headline text-2xl font-bold text-on-surface">Analysis result</h1>
        <div className="flex gap-2">
          <Link href="/app/upload">
            <Button variant="secondary">New upload</Button>
          </Link>
          <Link href={`/app/documents/${documentId}`}>
            <Button variant="ghost">Document detail</Button>
          </Link>
        </div>
      </div>

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-wider text-primary font-body">Summary</h2>
        <p className="mt-2 text-sm text-on-surface font-body leading-relaxed">{a.summary ?? "—"}</p>
      </Card>

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-wider text-primary font-body">Risk detection</h2>
        <div className="mt-4 space-y-3">
          {a.risks?.length ? (
            a.risks.map((r, i) => (
              <div
                key={i}
                className="rounded-xl bg-surface-container-low p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={riskTone(r.level)}>{r.level}</Badge>
                  <span className="font-headline font-semibold text-on-surface">{r.title}</span>
                </div>
                <p className="mt-2 text-sm text-on-surface-variant font-body">{r.detail}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-on-surface-variant font-body">No structured risks returned.</p>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-wider text-primary font-body">Key clauses</h2>
        <ul className="mt-4 space-y-4">
          {a.clauses?.length ? (
            a.clauses.map((c, i) => (
              <li key={i} className="border-l-2 border-primary/40 pl-4">
                <p className="font-headline font-semibold text-on-surface">{c.title}</p>
                <p className="mt-1 text-sm text-on-surface-variant font-body">{c.plain_explanation}</p>
              </li>
            ))
          ) : (
            <li className="text-sm text-on-surface-variant font-body">—</li>
          )}
        </ul>
      </Card>

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-wider text-primary font-body">
          Simplified explanation
        </h2>
        <p className="mt-2 whitespace-pre-wrap text-sm text-on-surface font-body leading-relaxed">
          {a.simplified_version ?? "—"}
        </p>
      </Card>

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-wider text-primary font-body">Suggested actions</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-on-surface-variant font-body">
          <li>Cross-check any risk flags with a licensed lawyer in Ethiopia.</li>
          <li>Request clarifications from the counterparty on ambiguous clauses.</li>
          <li>Keep this report with your contract file for audit trail.</li>
        </ul>
      </Card>
    </div>
  );
}

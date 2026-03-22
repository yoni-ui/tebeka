"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPublicApiBase } from "@/lib/env";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";

export function DocumentDetailContent({ documentId }: { documentId: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const base = getPublicApiBase();
        const res = await fetch(`${base}/documents/${documentId}/preview`);
        if (!res.ok) throw new Error(await res.text());
        const j = (await res.json()) as { text_preview?: string };
        if (!cancelled) setPreview(j.text_preview ?? "");
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [documentId]);

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-headline text-2xl font-bold text-on-surface">Document</h1>
        <div className="flex gap-2">
          <Link href={`/app/analysis/${documentId}`}>
            <Button>View analysis</Button>
          </Link>
          <Link href="/app/upload">
            <Button variant="secondary">Re-upload</Button>
          </Link>
        </div>
      </div>
      <Card>
        <p className="text-xs text-on-surface-variant font-body break-all">ID: {documentId}</p>
        <div className="mt-4 max-h-[480px] overflow-y-auto custom-scrollbar rounded-xl bg-surface-container-low p-4 text-sm text-on-surface font-body whitespace-pre-wrap">
          {preview ?? "Loading…"}
        </div>
      </Card>
    </div>
  );
}

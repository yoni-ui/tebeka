"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

const PREFIX = "tebeka_analysis_";

export function HistoryContent() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const found: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (k?.startsWith(PREFIX)) {
        found.push(k.slice(PREFIX.length));
      }
    }
    setIds(found);
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-headline text-2xl font-bold text-on-surface">History</h1>
      <p className="text-sm text-on-surface-variant font-body">
        Recent analyses stored in this browser session. Server-side history requires auth + database.
      </p>
      {ids.length === 0 ? (
        <EmptyState
          title="No analyses yet"
          description="Run an upload from the Upload page to see results here."
          action={
            <Link
              href="/app/upload"
              className="inline-flex rounded-xl gradient-primary-cta px-5 py-2.5 text-sm font-semibold text-on-primary"
            >
              Upload document
            </Link>
          }
        />
      ) : (
        <ul className="space-y-3">
          {ids.map((id) => (
            <li key={id}>
              <Card className="py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-mono text-on-surface-variant">{id}</p>
                  <Link
                    href={`/app/analysis/${id}`}
                    className="text-sm font-semibold text-primary hover:underline font-body"
                  >
                    Open analysis
                  </Link>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

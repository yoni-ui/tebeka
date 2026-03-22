"use client";

import { useMemo, useState } from "react";
import { MOCK_QUERY_LOGS, type QueryLogRow } from "@/modules/admin/mock/queryLogs";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function QueryLogsTable() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return MOCK_QUERY_LOGS;
    return MOCK_QUERY_LOGS.filter((r) => r.question.toLowerCase().includes(s));
  }, [q]);

  return (
    <Card>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by keyword…" className="max-w-sm" />
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm font-body">
          <thead>
            <tr className="text-xs uppercase text-on-surface-variant">
              <th className="pb-3 pr-4">Question</th>
              <th className="pb-3 pr-4">Model</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Time</th>
            </tr>
          </thead>
          <tbody className="text-on-surface">
            {rows.map((r: QueryLogRow) => (
              <tr key={r.id} className="border-t border-outline-variant/10">
                <td className="py-3 pr-4 align-top">{r.question}</td>
                <td className="py-3 pr-4">{r.model}</td>
                <td className="py-3 pr-4">{r.status}</td>
                <td className="py-3 text-on-surface-variant">{r.at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

import { Card } from "@/components/ui/Card";

const metrics = [
  { label: "Total users", value: "—", note: "Wire to DB" },
  { label: "Queries (24h)", value: "128", note: "Mock" },
  { label: "Documents analyzed", value: "—", note: "Wire to API" },
  { label: "API health", value: "OK", note: "Check /health" },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Dashboard</h1>
        <p className="mt-1 text-sm text-on-surface-variant font-body">
          System health and activity — connect real metrics from FastAPI + analytics.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <p className="text-xs font-bold uppercase tracking-wider text-primary font-body">{m.label}</p>
            <p className="mt-2 font-headline text-2xl font-bold text-on-surface">{m.value}</p>
            <p className="mt-1 text-xs text-on-surface-variant font-body">{m.note}</p>
          </Card>
        ))}
      </div>
      <Card>
        <p className="text-sm font-semibold text-on-surface font-body">Alerts</p>
        <ul className="mt-3 space-y-2 text-sm text-on-surface-variant font-body">
          <li>— No high-severity alerts (placeholder).</li>
          <li>— Monitor Groq / Gemini quotas in production.</li>
        </ul>
      </Card>
    </div>
  );
}

import { Card } from "@/components/ui/Card";

export default function AdminUsagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Usage &amp; limits</h1>
        <p className="mt-1 text-sm text-on-surface-variant font-body">
          API cost and quota visualization — connect billing + usage tables.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-xs font-bold uppercase text-primary font-body">Groq (mock)</p>
          <p className="mt-2 font-headline text-2xl font-bold">42k tokens / day</p>
        </Card>
        <Card>
          <p className="text-xs font-bold uppercase text-primary font-body">Gemini (mock)</p>
          <p className="mt-2 font-headline text-2xl font-bold">12 analyses / day</p>
        </Card>
      </div>
      <Card>
        <p className="text-sm text-on-surface-variant font-body">Chart placeholder — add Recharts or similar when metrics exist.</p>
        <div className="mt-6 h-40 rounded-xl bg-surface-container-low" />
      </Card>
    </div>
  );
}

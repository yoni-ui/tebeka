import { StubPage } from "@/components/StubPage";
import { Card } from "@/components/ui/Card";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <StubPage
        title="Admin settings"
        body="Model parameters, RAG toggles, and API key rotation. Keep secrets server-side only in production."
      />
      <Card>
        <p className="text-sm text-on-surface font-body">
          Panel login uses <code className="text-xs">ADMIN_PANEL_SECRET</code> (Next). FastAPI admin routes use{" "}
          <code className="text-xs">X-Admin-Key</code> / <code className="text-xs">ADMIN_API_KEY</code> (backend).
        </p>
      </Card>
    </div>
  );
}

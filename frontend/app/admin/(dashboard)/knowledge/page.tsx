import { KnowledgeDocumentsPanel } from "@/modules/admin/KnowledgeDocumentsPanel";

export default function AdminKnowledgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Knowledge management</h1>
        <p className="mt-1 text-sm text-on-surface-variant font-body">
          Upload corpus via product flows or API; manage rows here.
        </p>
      </div>
      <KnowledgeDocumentsPanel />
    </div>
  );
}

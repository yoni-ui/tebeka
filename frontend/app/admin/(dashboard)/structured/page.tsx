import { StructuredKnowledgeForm } from "@/modules/admin/StructuredKnowledgeForm";

export default function AdminStructuredPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Structured knowledge</h1>
        <p className="mt-1 text-sm text-on-surface-variant font-body">
          High-quality manual rules — form only until backend table exists.
        </p>
      </div>
      <StructuredKnowledgeForm />
    </div>
  );
}

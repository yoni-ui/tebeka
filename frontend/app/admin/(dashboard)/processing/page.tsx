import { StubPage } from "@/components/StubPage";

export default function AdminProcessingPage() {
  return (
    <StubPage
      title="Document processing monitor"
      body="Track ingestion: pending → chunking → embedding → done. Connect to job queue or Supabase status columns."
    />
  );
}

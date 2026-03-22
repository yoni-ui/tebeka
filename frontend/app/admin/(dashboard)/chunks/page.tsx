import { StubPage } from "@/components/StubPage";

export default function AdminChunksPage() {
  return (
    <StubPage
      title="Chunk viewer / editor"
      body="Left: chunk list. Right: editor with metadata (source, type, confidence). Requires backend endpoints to load and PATCH chunks. Phase 2."
    />
  );
}

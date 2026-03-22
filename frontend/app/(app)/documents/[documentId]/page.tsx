import { DocumentDetailContent } from "@/modules/documents/DocumentDetailContent";

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  return <DocumentDetailContent documentId={documentId} />;
}

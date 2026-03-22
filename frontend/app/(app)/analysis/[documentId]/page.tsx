import { AnalysisResultView } from "@/modules/documents/AnalysisResultView";

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  return <AnalysisResultView documentId={documentId} />;
}

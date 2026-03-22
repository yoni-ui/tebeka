import { QueryLogsTable } from "@/modules/admin/QueryLogsTable";

export default function AdminLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Query logs</h1>
        <p className="mt-1 text-sm text-on-surface-variant font-body">
          Mock data — persist prompts/responses server-side for real monitoring.
        </p>
      </div>
      <QueryLogsTable />
    </div>
  );
}

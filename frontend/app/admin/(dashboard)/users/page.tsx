import { UsersTable } from "@/modules/admin/UsersTable";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">User management</h1>
        <p className="mt-1 text-sm text-on-surface-variant font-body">Mock directory — connect Supabase Auth + profiles.</p>
      </div>
      <UsersTable />
    </div>
  );
}

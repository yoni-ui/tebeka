import { AdminLoginForm } from "@/modules/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-inverse-surface p-6">
      <div className="w-full max-w-md rounded-2xl bg-surface p-8 shadow-cloud text-on-surface">
        <h1 className="font-headline text-xl font-bold">Admin login</h1>
        <p className="mt-1 text-sm text-on-surface-variant font-body">Restricted access.</p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}

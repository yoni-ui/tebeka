import { Suspense } from "react";
import { LoginForm } from "@/modules/auth/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-on-surface">Sign in</h1>
      <p className="mt-1 text-sm text-on-surface-variant font-body">Access your legal workspace.</p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-on-surface-variant font-body">Loading…</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

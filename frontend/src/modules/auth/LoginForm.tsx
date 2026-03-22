"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/app/chat";
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/auth/sign-in", { method: "POST" });
      router.push(next);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">
          Email
        </label>
        <Input type="email" required placeholder="you@company.com" className="mt-1" />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">
          Password
        </label>
        <Input type="password" required placeholder="••••••••" className="mt-1" />
      </div>
      <div className="flex items-center justify-between text-sm font-body">
        <Link href="/forgot-password" className="text-primary hover:underline">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-sm text-on-surface-variant font-body">
        No account?{" "}
        <Link href="/register" className="text-primary font-semibold hover:underline">
          Register
        </Link>
      </p>
      <p className="text-xs text-on-surface-variant font-body text-center">
        Demo: any email/password signs you in (cookie session). Replace with Supabase Auth when ready.
      </p>
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/auth/sign-in", { method: "POST" });
      router.push("/app/chat");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">
          Name
        </label>
        <Input required placeholder="Your name" className="mt-1" />
      </div>
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
      <label className="flex items-start gap-2 text-sm text-on-surface-variant font-body">
        <input type="checkbox" required className="mt-1" />
        <span>I accept the terms (placeholder).</span>
      </label>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating…" : "Create account"}
      </Button>
      <p className="text-center text-sm text-on-surface-variant font-body">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

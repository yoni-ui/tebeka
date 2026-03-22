"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">
          Email
        </label>
        <Input type="email" required placeholder="you@company.com" className="mt-1" />
      </div>
      <Button type="submit" className="w-full">
        Send reset link
      </Button>
      {sent ? (
        <p className="text-sm text-on-surface-variant font-body text-center">
          If an account exists, you will receive instructions. (Placeholder — wire to Supabase Auth.)
        </p>
      ) : null}
      <p className="text-center text-sm font-body">
        <Link href="/login" className="text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}

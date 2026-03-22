"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";
  const [secret, setSecret] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/admin-sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });
    setLoading(false);
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      setError(j.error ?? "Failed");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">
          Admin secret
        </label>
        <Input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="ADMIN_PANEL_SECRET from server env"
          className="mt-1"
          required
        />
      </div>
      {error ? <p className="text-sm text-error font-body">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Enter admin"}
      </Button>
      <p className="text-xs text-on-surface-variant font-body text-center">
        Set <code className="text-on-surface">ADMIN_PANEL_SECRET</code> in{" "}
        <code className="text-on-surface">.env.local</code> (Next server).
      </p>
    </form>
  );
}

export function AdminLoginForm() {
  return (
    <Suspense fallback={<p className="text-sm text-on-surface-variant font-body">Loading…</p>}>
      <Form />
    </Suspense>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const KEY = "tebeka_admin_api_key";

export function SettingsContent() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [adminKey, setAdminKey] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdminKey(sessionStorage.getItem(KEY) ?? "");
    }
  }, []);

  function saveAdminKey() {
    sessionStorage.setItem(KEY, adminKey);
    alert("Saved locally for admin API calls (dev only).");
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="font-headline text-2xl font-bold text-on-surface">Settings</h1>
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-wider text-primary font-body">Profile</h2>
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-on-surface-variant font-body">Name</label>
            <Input
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              placeholder="Your name"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-on-surface-variant font-body">Email</label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              placeholder="you@company.com"
              className="mt-1"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-on-surface-variant font-body">
          Placeholder — connect to Supabase Auth / user table.
        </p>
      </Card>
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-wider text-primary font-body">
          Admin API key (local)
        </h2>
        <p className="mt-2 text-xs text-on-surface-variant font-body">
          Stored in sessionStorage only. Used by the admin Knowledge page to call FastAPI{" "}
          <code className="text-on-surface">X-Admin-Key</code>.
        </p>
        <Input
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="ADMIN_API_KEY from backend .env"
          className="mt-3 font-mono text-xs"
        />
        <Button className="mt-3" onClick={saveAdminKey}>
          Save key
        </Button>
      </Card>
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-wider text-primary font-body">Usage</h2>
        <p className="mt-2 text-sm text-on-surface-variant font-body">
          Usage limits and subscription UI — connect to billing backend (Phase 3).
        </p>
      </Card>
    </div>
  );
}

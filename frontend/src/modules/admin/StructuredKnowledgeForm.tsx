"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function StructuredKnowledgeForm() {
  const [law, setLaw] = useState("Employment Law");
  const [rule, setRule] = useState("");
  const [risk, setRisk] = useState("");
  const [explanation, setExplanation] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Saved locally (placeholder). Wire to POST /admin/structured-rules when API exists.");
  }

  return (
    <Card>
      <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="text-xs font-bold uppercase text-on-surface-variant font-body">Law category</label>
          <Input value={law} onChange={(e) => setLaw(e.target.value)} className="mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-on-surface-variant font-body">Rule</label>
          <Input value={rule} onChange={(e) => setRule(e.target.value)} className="mt-1" placeholder="Plain rule text" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-on-surface-variant font-body">Risk</label>
          <Input value={risk} onChange={(e) => setRisk(e.target.value)} className="mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-on-surface-variant font-body">Explanation</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="mt-1 min-h-[100px] w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm font-body ghost-border outline-none focus:ring-2 focus:ring-primary-fixed/40"
            placeholder="Educational context for reviewers"
          />
        </div>
        <Button type="submit">Save rule (placeholder)</Button>
      </form>
    </Card>
  );
}

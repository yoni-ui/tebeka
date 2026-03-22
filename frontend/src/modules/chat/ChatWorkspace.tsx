"use client";

import { useCallback, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { postChat, type ChatResponse } from "@/lib/api/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CitationChip } from "@/components/ui/CitationChip";

const SUGGESTED = [
  "Explain rental law basics in Ethiopia",
  "What if a contract is broken?",
  "What should I check before signing an employment agreement?",
];

export function ChatWorkspace() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [simple, setSimple] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSources, setLastSources] = useState<ChatResponse["sources"]>([]);
  const [disclaimer, setDisclaimer] = useState<string | null>(null);

  const send = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || loading) return;
      setError(null);
      setInput("");
      setMessages((m) => [...m, { role: "user", text: q }]);
      setLoading(true);
      try {
        const res = await postChat(q, simple);
        setLastSources(res.sources);
        setDisclaimer(res.disclaimer);
        setMessages((m) => [...m, { role: "assistant", text: res.reply }]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Request failed");
      } finally {
        setLoading(false);
      }
    },
    [loading, simple]
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
      <div className="min-w-0 flex-1 space-y-4">
        <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950 border border-amber-200/80 font-body">
          <strong>Not legal advice.</strong> Tebeka provides informational assistance only.
        </div>
        <Card>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-headline text-xl font-bold text-on-surface">Chat</h1>
            <label className="flex items-center gap-2 text-sm text-on-surface-variant font-body cursor-pointer">
              <input type="checkbox" checked={simple} onChange={(e) => setSimple(e.target.checked)} />
              Explain like I&apos;m 15
            </label>
          </div>
          <div className="mb-4 max-h-[min(480px,50vh)] space-y-3 overflow-y-auto custom-scrollbar">
            {messages.length === 0 ? (
              <div>
                <p className="text-sm text-on-surface-variant font-body mb-3">Suggested prompts</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full bg-secondary-container px-3 py-1.5 text-left text-xs text-on-secondary-container font-body hover:opacity-90"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-xl px-4 py-3 text-sm leading-relaxed font-body ${
                  m.role === "user"
                    ? "ml-8 bg-primary text-on-primary"
                    : "mr-8 bg-surface-container text-on-surface"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading ? (
              <div className="flex items-center gap-2 text-on-surface-variant text-sm font-body">
                <Loader2 className="animate-spin" size={18} /> Thinking…
              </div>
            ) : null}
          </div>
          {error ? <p className="mb-2 text-sm text-error font-body whitespace-pre-wrap">{error}</p> : null}
          <div className="flex gap-2">
            <input
              className="min-w-0 flex-1 rounded-xl bg-surface-container-low px-4 py-3 text-sm font-body ghost-border outline-none focus:ring-2 focus:ring-primary-fixed/40"
              placeholder="Ask a question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && void send(input)}
            />
            <Button onClick={() => send(input)} disabled={loading} className="shrink-0 px-4" aria-label="Send">
              <Send size={18} />
            </Button>
          </div>
          {disclaimer ? <p className="mt-3 text-xs text-on-surface-variant font-body">{disclaimer}</p> : null}
        </Card>
      </div>
      <div className="w-full shrink-0 lg:w-80">
        <Card>
          <h2 className="font-headline text-sm font-bold uppercase tracking-wider text-on-surface-variant">
            Sources
          </h2>
          {lastSources.length === 0 ? (
            <p className="mt-3 text-sm text-on-surface-variant font-body">Ask a question to see citations.</p>
          ) : (
            <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto custom-scrollbar">
              {lastSources.map((s, i) => (
                <li key={i} className="rounded-lg bg-surface-container p-2 text-xs text-on-surface font-body">
                  <div className="flex flex-wrap items-center gap-1">
                    <CitationChip>{s.document_title ?? "Source"}</CitationChip>
                    {s.similarity != null ? (
                      <span className="text-on-surface-variant">({s.similarity.toFixed(3)})</span>
                    ) : null}
                  </div>
                  <p className="mt-1 whitespace-pre-wrap text-on-surface-variant">{s.content}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

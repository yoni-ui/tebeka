import type { ReactNode } from "react";

const tones: Record<string, string> = {
  safe: "bg-emerald-100 text-emerald-900",
  warning: "bg-amber-100 text-amber-950",
  risk: "bg-red-100 text-red-900",
  neutral: "bg-secondary-container text-on-secondary-container",
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof tones;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-DEFAULT px-2 py-0.5 text-xs font-medium font-body ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

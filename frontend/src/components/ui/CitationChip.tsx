import type { ReactNode } from "react";

export function CitationChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-DEFAULT bg-secondary-container px-2 py-1 text-xs text-on-secondary-container font-body">
      {children}
    </span>
  );
}

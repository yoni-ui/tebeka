import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-surface-container-low p-6 shadow-cloud ${className}`}
    >
      {children}
    </div>
  );
}

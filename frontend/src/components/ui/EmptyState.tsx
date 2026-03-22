import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-surface-container-low px-8 py-16 text-center">
      <p className="font-headline text-lg font-semibold text-on-surface">{title}</p>
      <p className="mt-2 max-w-md text-sm text-on-surface-variant font-body">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

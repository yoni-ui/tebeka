import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface font-body ghost-border outline-none focus:ring-2 focus:ring-primary-fixed/40 focus:border-primary transition-shadow ${className}`}
      {...props}
    />
  );
}

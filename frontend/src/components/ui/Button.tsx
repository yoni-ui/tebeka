import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "gradient-primary-cta text-on-primary shadow-cloud hover:opacity-95 transition-opacity",
  secondary:
    "bg-surface-container-highest text-primary hover:bg-surface-container-high transition-colors",
  ghost: "text-on-surface-variant hover:bg-surface-container-low transition-colors",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold font-body ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

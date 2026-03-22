"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  FileSearch,
  History,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Upload,
  LogOut,
} from "lucide-react";

const nav = [
  { href: "/app/chat", label: "Chat", icon: MessageSquare },
  { href: "/app/upload", label: "Upload", icon: Upload },
  { href: "/app/history", label: "History", icon: History },
  { href: "/app/notifications", label: "Alerts", icon: Bell },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function ProductShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await fetch("/api/auth/sign-out", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="flex w-64 shrink-0 flex-col border-r border-outline-variant/15 bg-surface-container-high">
        <div className="flex h-16 items-center gap-2 border-b border-outline-variant/15 px-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary-cta text-on-primary">
            <LayoutDashboard size={18} />
          </span>
          <span className="font-headline font-bold text-on-surface">Tebeka</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium font-body transition-colors ${
                  active
                    ? "bg-surface-container-highest text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <Icon size={20} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-outline-variant/15 p-3">
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low font-body"
          >
            <LogOut size={20} />
            Sign out
          </button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-outline-variant/15 bg-surface/80 px-6 backdrop-blur">
          <p className="text-sm text-on-surface-variant font-body">
            Not legal advice — verify with qualified counsel.
          </p>
          <Link
            href="/app/upload"
            className="hidden items-center gap-2 rounded-xl bg-surface-container-highest px-4 py-2 text-sm font-semibold text-primary sm:inline-flex font-body"
          >
            <FileSearch size={18} />
            New analysis
          </Link>
        </header>
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
}

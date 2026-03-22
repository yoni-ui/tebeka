"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Cpu,
  FileStack,
  Flag,
  LayoutDashboard,
  LogOut,
  ScrollText,
  Settings,
  Users,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/admin/chunks", label: "Chunks", icon: FileStack },
  { href: "/admin/structured", label: "Structured", icon: ScrollText },
  { href: "/admin/logs", label: "Query logs", icon: Activity },
  { href: "/admin/flagged", label: "Flagged", icon: Flag },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/processing", label: "Processing", icon: Cpu },
  { href: "/admin/usage", label: "Usage", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await fetch("/api/auth/admin-sign-out", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-inverse-surface text-inverse-on-surface">
      <aside className="flex w-60 shrink-0 flex-col border-r border-white/10 bg-inverse-surface">
        <div className="flex h-14 items-center gap-2 px-4 border-b border-white/10">
          <span className="font-headline text-sm font-bold">Tebeka Admin</span>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-body ${
                  active ? "bg-white/10 text-white" : "text-inverse-on-surface/80 hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-2">
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-inverse-on-surface/80 hover:bg-white/5 font-body"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-auto bg-background text-on-surface">
        <div className="border-b border-outline-variant/15 bg-surface px-8 py-4">
          <p className="text-xs font-bold uppercase tracking-wider text-tertiary font-body flex items-center gap-2">
            <AlertTriangle size={14} />
            Admin only — not legal advice
          </p>
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

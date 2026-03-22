import Link from "next/link";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#trust", label: "Trust" },
];

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-outline-variant/15 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-on-surface">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary-cta text-on-primary text-sm font-bold">
            T
          </span>
          Tebeka Legal
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-on-surface-variant hover:text-primary font-body"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/login"
            className="text-sm font-medium text-on-surface-variant hover:text-primary font-body"
          >
            Sign in
          </Link>
          <Link
            href="/app/chat"
            className="rounded-xl gradient-primary-cta px-5 py-2.5 text-sm font-semibold text-on-primary shadow-cloud"
          >
            Try free
          </Link>
        </nav>
        <Link
          href="/app/chat"
          className="md:hidden rounded-xl gradient-primary-cta px-4 py-2 text-sm font-semibold text-on-primary"
        >
          Try
        </Link>
      </div>
    </header>
  );
}

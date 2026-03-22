import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-outline-variant/15 bg-surface-container-low">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-headline text-lg font-bold text-on-surface">Tebeka Legal</p>
            <p className="mt-3 max-w-md text-sm text-on-surface-variant font-body leading-relaxed">
              Ethiopia-focused legal clarity — not a law firm. Always consult qualified counsel for
              decisions.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-sm font-body">
              <li>
                <Link href="/app/chat" className="text-on-surface hover:text-primary">
                  Assistant
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-on-surface hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-body">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-sm font-body text-on-surface-variant">
              <li>Terms (placeholder)</li>
              <li>Privacy (placeholder)</li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-on-surface-variant font-body">
          © {new Date().getFullYear()} Tebeka. Not legal advice.
        </p>
      </div>
    </footer>
  );
}

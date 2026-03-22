import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Try the assistant with limits.",
    features: ["Basic chat", "Limited uploads", "Community support"],
    cta: "Get started",
    href: "/register",
    highlight: false,
  },
  {
    name: "Pro",
    price: "TBD",
    desc: "For teams that review contracts weekly.",
    features: ["Higher limits", "Saved history", "Priority ingestion", "Templates (soon)"],
    cta: "Contact us",
    href: "/login",
    highlight: true,
  },
];

export function PricingContent() {
  return (
    <main className="bg-background pb-20 pt-12">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <h1 className="text-center font-headline text-4xl font-extrabold text-on-surface">Pricing</h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-on-surface-variant font-body">
          Simple tiers for individuals and businesses. Final numbers before launch.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-8 ${
                p.highlight
                  ? "bg-surface-container-high shadow-cloud ring-2 ring-primary/30"
                  : "bg-surface-container-low"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-primary font-body">{p.name}</p>
              <p className="mt-2 font-headline text-3xl font-bold text-on-surface">{p.price}</p>
              <p className="mt-1 text-sm text-on-surface-variant font-body">{p.desc}</p>
              <ul className="mt-6 space-y-3 text-sm text-on-surface font-body">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold ${
                  p.highlight
                    ? "gradient-primary-cta text-on-primary shadow-cloud"
                    : "bg-surface-container-highest text-primary"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-outline-variant/15 px-4 py-4">
        <Link href="/" className="font-headline text-lg font-bold text-on-surface">
          Tebeka Legal
        </Link>
      </header>
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-surface-container-low p-8 shadow-cloud">{children}</div>
      </div>
    </div>
  );
}

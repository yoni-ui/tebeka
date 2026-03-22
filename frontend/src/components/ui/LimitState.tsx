import Link from "next/link";
import { Button } from "./Button";

export function LimitState() {
  return (
    <div className="rounded-xl bg-surface-container px-6 py-10 text-center shadow-cloud">
      <p className="font-headline text-lg font-semibold text-on-surface">Limit reached</p>
      <p className="mt-2 text-sm text-on-surface-variant font-body">
        You have reached your free plan limit. Upgrade for more queries and uploads.
      </p>
      <Link href="/pricing" className="mt-6 inline-block">
        <Button>View pricing</Button>
      </Link>
    </div>
  );
}

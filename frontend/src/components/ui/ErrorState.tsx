import { Button } from "./Button";

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl border border-error-container bg-error-container/30 px-6 py-8 text-center">
      <p className="text-sm font-semibold text-error font-body">Something went wrong</p>
      <p className="mt-2 text-sm text-on-surface-variant font-body whitespace-pre-wrap">{message}</p>
      {onRetry ? (
        <Button variant="secondary" className="mt-4" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}

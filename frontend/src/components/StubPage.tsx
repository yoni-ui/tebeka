export function StubPage({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-2xl">
      <h1 className="font-headline text-2xl font-bold text-on-surface">{title}</h1>
      <p className="mt-3 text-sm text-on-surface-variant font-body leading-relaxed">{body}</p>
    </div>
  );
}

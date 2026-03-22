import Link from "next/link";
import { CitationChip } from "@/components/ui/CitationChip";

export function LandingContent() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low to-background">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary font-body">
              Ethiopia · RAG legal assistant
            </p>
            <h1 className="mt-4 font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-surface md:text-5xl">
              Precision clarity for contracts &amp; law
            </h1>
            <p className="mt-5 text-lg text-on-surface-variant font-body leading-relaxed">
              Chat with citations, upload PDFs, and get structured analysis — grounded in your corpus.
              Informational only; not legal advice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/app/chat"
                className="inline-flex items-center justify-center rounded-xl gradient-primary-cta px-6 py-3 text-sm font-semibold text-on-primary shadow-cloud"
              >
                Try free
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl bg-surface-container-highest px-6 py-3 text-sm font-semibold text-primary font-body"
              >
                How it works
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-surface-container-lowest p-8 shadow-cloud">
            <p className="text-xs font-bold uppercase text-primary font-body">Assistant preview</p>
            <p className="mt-2 text-sm text-on-surface-variant font-body">
              “What should I verify in a rental agreement in Ethiopia?”
            </p>
            <div className="mt-4 rounded-xl bg-surface-container-low p-4 text-sm text-on-surface font-body leading-relaxed">
              I can summarize typical clauses and risks to discuss with your lawyer — with sources when
              available.
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <CitationChip>Proclamation refs</CitationChip>
              <CitationChip>Uploaded docs</CitationChip>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="text-center font-headline text-3xl font-bold text-on-surface">How it works</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-on-surface-variant font-body">
            Chat → Upload → Analyze → Results. Built as a workflow product, not a single chat box.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                t: "Chat",
                d: "Grounded Q&A with sources and disclaimers.",
              },
              {
                t: "Analyze",
                d: "PDF/DOCX ingestion, chunking, embeddings, structured review.",
              },
              {
                t: "Explain",
                d: "Plain-language clauses and ELI15-style summaries.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-xl bg-surface-container-low p-6">
                <h3 className="font-headline text-lg font-bold text-on-surface">{x.t}</h3>
                <p className="mt-2 text-sm text-on-surface-variant font-body leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="bg-surface-container-low py-16">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="font-headline text-2xl font-bold text-on-surface">Trust &amp; safety</h2>
          <p className="mt-4 text-sm text-on-surface-variant font-body leading-relaxed">
            Tebeka does not provide legal advice. Model outputs may be incomplete or incorrect. Always
            verify with a licensed attorney. Citations and confidence cues are shown to support
            transparency — they are not guarantees.
          </p>
        </div>
      </section>

      <section className="gradient-primary-cta py-16 text-on-primary">
        <div className="mx-auto max-w-6xl px-4 text-center lg:px-8">
          <h2 className="font-headline text-2xl font-bold">Start with your next contract</h2>
          <p className="mt-2 text-sm text-on-primary/90 font-body">
            Free during early access. Usage limits may apply.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex rounded-xl bg-surface-container-lowest px-6 py-3 text-sm font-semibold text-primary"
          >
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}

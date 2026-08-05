type Stamp = {
  text: string;
  tone: "positive" | "pending";
};

type LogEntry = {
  number: string;
  name: string;
  meta: string;
  stamp: Stamp;
  description: string;
  cta: { label: string; href: string } | null;
  demo?: { src: string; width: number; height: number; alt: string };
};

const entries: LogEntry[] = [
  {
    number: "002",
    name: "Sprout",
    meta: "Family journal · web app · started 2026",
    stamp: { text: "Pre-launch", tone: "positive" },
    description:
      'A private, shared journal for our son — milestones, photos, growth charts, and a chatbot that can answer "when did he first walk?" before we forget. Built for our own family first, and architected well enough that other families could use it too.',
    cta: null,
    demo: {
      src: "/demos/sprout-demo.gif",
      width: 1512,
      height: 793,
      alt: "Screen recording of Sprout: writing a journal entry, tagging it as a milestone, and viewing it in the Feed and Milestones tabs",
    },
  },
  {
    number: "001",
    name: "Wordflow",
    meta: "Daily Bible reading · web app · started 2026",
    stamp: { text: "Awaiting license", tone: "pending" },
    description:
      "A habit-sized way to read the Bible daily, $3.99/month. Payments and the reading flow are built and tested — we're waiting on a commercial license from our translation's publisher before it can go live.",
    cta: null,
  },
];

const stampDotClasses: Record<Stamp["tone"], string> = {
  positive: "bg-status-positive",
  pending: "bg-status-pending",
};

export default function Home() {
  return (
    <main className="flex-1 w-full mx-auto max-w-3xl px-6 md:px-8 flex flex-col">
      <header className="flex items-center justify-between py-6 md:py-8">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 font-mono text-[10px] font-medium shrink-0"
          >
            SL
          </span>
          <span className="font-display font-semibold tracking-tight text-sm uppercase">
            SL Studio
          </span>
        </div>
        <a
          href="mailto:support@sl-studio.dev"
          className="inline-block py-2 -my-2 font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-ink transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
        >
          Contact
        </a>
      </header>

      <section className="pt-6 pb-12 md:pt-16 md:pb-24">
        <p className="animate-rise-in font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          Build log — est. 2026
        </p>
        <h1 className="animate-rise-in [animation-delay:80ms] font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mt-4 max-w-2xl">
          I build the things I need first.
        </h1>
        <p className="animate-rise-in [animation-delay:160ms] mt-6 max-w-md text-base md:text-lg text-ink-soft leading-relaxed">
          SL Studio is where they end up once they&apos;re worth sharing with
          anyone else. Two entries in the log so far — more are coming.
        </p>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="flex items-end justify-between border-t border-border pt-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            Build log
          </h2>
          <span className="font-mono text-xs text-ink-soft">
            {entries.length} entries
          </span>
        </div>

        <ul className="mt-8 flex flex-col gap-6">
          {entries.map((entry) => (
            <li key={entry.number}>
              <article className="border border-border bg-bg rounded-lg p-5 sm:p-6 md:p-8 transition-colors hover:border-ink/30">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <span className="font-mono text-xs text-ink-soft">
                    No. {entry.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full ${
                        stampDotClasses[entry.stamp.tone]
                      }`}
                    />
                    {entry.stamp.text}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mt-3">
                  {entry.name}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft mt-1">
                  {entry.meta}
                </p>
                <p className="mt-4 text-ink-soft leading-relaxed max-w-xl">
                  {entry.description}
                </p>
                {entry.demo && (
                  <div className="mt-6 rounded-md border border-border overflow-hidden bg-bg-subtle">
                    {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF, next/image would strip animation */}
                    <img
                      src={entry.demo.src}
                      width={entry.demo.width}
                      height={entry.demo.height}
                      alt={entry.demo.alt}
                      className="w-full h-auto"
                    />
                  </div>
                )}
                {entry.cta && (
                  <a
                    href={entry.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-5 py-2 -my-2 font-medium text-sm text-ink hover:text-ink-soft transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
                  >
                    {entry.cta.label} <span aria-hidden>→</span>
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-auto border-t border-border py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-mono text-xs text-ink-soft">
          SL Studio — Sangho Lee. Built one small thing at a time.
        </p>
        <a
          href="mailto:support@sl-studio.dev"
          className="inline-block py-2 -my-2 font-medium text-sm text-ink hover:text-ink-soft transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
        >
          Say hello →
        </a>
      </footer>
    </main>
  );
}

type Stamp = {
  text: string;
  tone: "moss" | "stamp";
};

type LogEntry = {
  number: string;
  name: string;
  meta: string;
  stamp: Stamp;
  description: string;
  cta: { label: string; href: string } | null;
};

const entries: LogEntry[] = [
  {
    number: "002",
    name: "Sprout",
    meta: "Family journal · web app · started 2026",
    stamp: { text: "Pre-launch", tone: "moss" },
    description:
      'A private, shared journal for our son — milestones, photos, growth charts, and a chatbot that can answer "when did he first walk?" before we forget. Built for our own family first, and architected well enough that other families could use it too.',
    cta: {
      label: "Try Sprout",
      href: "https://sprout-theta-rosy.vercel.app",
    },
  },
  {
    number: "001",
    name: "Wordflow",
    meta: "Daily Bible reading · web app · started 2026",
    stamp: { text: "Awaiting license", tone: "stamp" },
    description:
      "A habit-sized way to read the Bible daily, $3.99/month. Payments and the reading flow are built and tested — we're waiting on a commercial license from our translation's publisher before it can go live.",
    cta: null,
  },
];

const stampClasses: Record<Stamp["tone"], string> = {
  moss: "bg-moss text-paper",
  stamp: "bg-stamp text-paper",
};

export default function Home() {
  return (
    <main className="flex-1 w-full mx-auto max-w-3xl px-6 md:px-8 flex flex-col">
      <header className="flex items-center justify-between py-6 md:py-8">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ink/30 font-mono text-[10px] font-medium -rotate-6 shrink-0"
          >
            SL
          </span>
          <span className="font-display font-semibold tracking-tight text-sm uppercase">
            SL Studio
          </span>
        </div>
        <a
          href="mailto:slstudio8495@gmail.com"
          className="inline-block py-2 -my-2 font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-moss transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss focus-visible:outline-offset-2"
        >
          Contact
        </a>
      </header>

      <section className="pt-6 pb-12 md:pt-16 md:pb-24">
        <p className="animate-rise-in font-mono text-xs uppercase tracking-[0.2em] text-moss">
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
        <div className="flex items-end justify-between border-t border-rule pt-4">
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
              <article className="group relative border border-rule bg-paper-card rounded-sm p-5 sm:p-6 md:p-8 transition-shadow hover:shadow-[0_4px_0_0_var(--rule)]">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <span className="font-mono text-xs text-ink-soft">
                    No. {entry.number}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm rotate-2 group-hover:rotate-0 transition-transform ${
                      stampClasses[entry.stamp.tone]
                    }`}
                  >
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
                {entry.cta && (
                  <a
                    href={entry.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-5 py-2 -my-2 font-mono text-xs uppercase tracking-wide text-moss hover:text-moss-bright transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss focus-visible:outline-offset-2"
                  >
                    {entry.cta.label} <span aria-hidden>→</span>
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-auto border-t border-rule py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-mono text-xs text-ink-soft">
          SL Studio — Sangho Lee. Built one small thing at a time.
        </p>
        <a
          href="mailto:slstudio8495@gmail.com"
          className="inline-block py-2 -my-2 font-mono text-xs uppercase tracking-wide text-moss hover:text-moss-bright transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss focus-visible:outline-offset-2"
        >
          Say hello →
        </a>
      </footer>
    </main>
  );
}

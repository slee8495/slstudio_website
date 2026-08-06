import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { apps, getApp } from "@/lib/apps";

const stampDotClasses: Record<"positive" | "pending", string> = {
  positive: "bg-status-positive",
  pending: "bg-status-pending",
};

const featured = getApp("sprout");

export default function Home() {
  return (
    <main className="flex-1 w-full mx-auto max-w-6xl px-6 md:px-8 flex flex-col">
      <SiteHeader />

      <section className="pt-6 pb-10 md:pt-16 md:pb-14 text-center">
        <p className="animate-rise-in font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          Build log — est. 2026
        </p>
        <h1 className="animate-rise-in [animation-delay:80ms] font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mt-4 max-w-3xl mx-auto">
          I build the things I need first.
        </h1>
        <p className="animate-rise-in [animation-delay:160ms] mt-6 max-w-xl mx-auto text-base md:text-lg text-ink-soft leading-relaxed">
          SL Studio is where they end up once they&apos;re worth sharing with
          anyone else. Two entries in the log so far — more are coming.
        </p>
      </section>

      {featured?.demo && (
        <section className="pb-16 md:pb-24">
          <Link
            href={`/${featured.slug}`}
            className="group block max-w-4xl mx-auto rounded-xl border border-border overflow-hidden bg-bg-subtle transition-colors hover:border-ink/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF, next/image would strip animation */}
            <img
              src={featured.demo.src}
              width={featured.demo.width}
              height={featured.demo.height}
              alt={featured.demo.alt}
              className="w-full h-auto"
            />
          </Link>
          <p className="text-center mt-4 font-mono text-xs uppercase tracking-wide text-ink-soft">
            {featured.name}, in progress —{" "}
            <Link
              href={`/${featured.slug}`}
              className="text-ink hover:text-ink-soft transition-colors underline underline-offset-2"
            >
              see how it works →
            </Link>
          </p>
        </section>
      )}

      <section className="pb-14 md:pb-20">
        <div className="flex items-end justify-between border-t border-border pt-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            Build log
          </h2>
          <span className="font-mono text-xs text-ink-soft">
            {apps.length} entries
          </span>
        </div>

        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((app) => (
            <li key={app.slug}>
              <Link
                href={`/${app.slug}`}
                className="group block h-full border border-border bg-bg-subtle rounded-lg p-5 sm:p-6 md:p-8 transition-colors hover:border-ink/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <span className="font-mono text-xs text-ink-soft">
                    No. {app.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full ${
                        stampDotClasses[app.stamp.tone]
                      }`}
                    />
                    {app.stamp.text}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 mt-3">
                  <span aria-hidden className="text-xl leading-none">
                    {app.icon}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold">
                    {app.name}
                  </h3>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft mt-1">
                  {app.meta}
                </p>
                <p className="mt-4 text-ink-soft leading-relaxed">
                  {app.tagline}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-5 font-medium text-sm text-ink group-hover:text-ink-soft transition-colors">
                  View {app.name} <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </main>
  );
}

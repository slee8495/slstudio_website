import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getApp } from "@/lib/apps";

const app = getApp("wordflow");

export const metadata: Metadata = {
  title: `${app?.name} · SL Studio`,
  description: app?.comingSoon
    ? `${app?.name} is coming soon.`
    : app?.description,
};

const stampDotClasses: Record<"positive" | "pending", string> = {
  positive: "bg-status-positive",
  pending: "bg-status-pending",
};

export default function WordflowPage() {
  if (!app) notFound();

  return (
    <main className="flex-1 w-full mx-auto max-w-6xl px-6 md:px-8 flex flex-col">
      <SiteHeader />

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 py-2 -my-2 self-start font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-ink transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
      >
        <span aria-hidden>←</span> Build log
      </Link>

      <section className="pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-accent-wordflow/25 bg-accent-wordflow-tint text-2xl shrink-0"
          >
            {app.icon}
          </span>
          <div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              No. {app.number}
              <span aria-hidden>·</span>
              <span
                aria-hidden
                className={`h-1.5 w-1.5 rounded-full ${
                  stampDotClasses[app.stamp.tone]
                }`}
              />
              {app.stamp.text}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mt-1">
              {app.name}
            </h1>
          </div>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft mt-6">
          {app.meta}
        </p>

        {app.comingSoon ? (
          <p className="mt-4 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
            We&apos;re finishing up the approval process. This will be live
            soon.
          </p>
        ) : (
          <>
            <p className="mt-6 max-w-2xl font-display text-xl md:text-2xl font-medium tracking-tight leading-snug">
              {app.catchline}
            </p>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
              {app.description}
            </p>
          </>
        )}
      </section>

      {/* Archived: the full marketing content below is kept ready for when Wordflow's
          publisher license comes through. Set comingSoon to false in src/lib/apps.ts to
          bring it back, nothing here needs to be rewritten. */}
      {!app.comingSoon && (
        <>
          <section className="pb-14 md:pb-20">
            <div className="max-w-3xl border border-accent-wordflow/25 bg-accent-wordflow-tint rounded-lg p-6 md:p-8">
              <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                {app.different.title}
              </h2>
              <p className="mt-3 text-ink-soft leading-relaxed">
                {app.different.body}
              </p>
            </div>
          </section>

          {app.statusItems && (
            <section className="pb-14 md:pb-20">
              <div className="border-t border-border pt-4">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                  Where it stands
                </h2>
              </div>
              <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {app.statusItems.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start gap-3 border border-border bg-bg-subtle rounded-lg p-4"
                  >
                    <span
                      aria-hidden
                      className={`mt-0.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                        item.done ? "bg-status-positive" : "bg-status-pending"
                      }`}
                    />
                    <span className="text-sm text-ink-soft leading-relaxed">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AppIcon } from "@/components/app-icon";
import { getApp } from "@/lib/apps";

const app = getApp("daily-math");

export const metadata: Metadata = {
  title: app?.name,
  description: app?.comingSoon
    ? (app?.comingSoonNote ?? `${app?.name} is coming soon.`)
    : app?.description,
};

const stampDotClasses: Record<"positive" | "pending", string> = {
  positive: "bg-status-positive",
  pending: "bg-status-pending",
};

export default function DailyMathPage() {
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
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-16 items-start">
          <div className="flex items-center gap-5">
            <AppIcon icon={app.icon} name={app.name} size="xl" />
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
              <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight mt-1">
                {app.name}
              </h1>
            </div>
          </div>
          <div className="max-w-2xl">
            <p className="font-display text-2xl md:text-3xl font-medium tracking-tight leading-snug">
              {app.catchline}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft mt-4">
              {app.meta}
            </p>
            <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed">
              {app.description}
            </p>
            {app.comingSoon && (
              <p className="mt-4 font-mono text-xs uppercase tracking-wide text-status-pending">
                {app.comingSoonNote ?? "Coming soon."}
              </p>
            )}
          </div>
        </div>
      </section>

      {app.story && (
        <section className="pb-14 md:pb-20">
          <div className="border-t border-border pt-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              {app.story.label}
            </h2>
          </div>
          <div className="mt-8 max-w-2xl space-y-5">
            {app.story.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base md:text-lg text-ink-soft leading-relaxed">
                {paragraph}
              </p>
            ))}
            <p className="text-base md:text-lg text-ink-soft leading-relaxed">
              {app.story.closing}{" "}
              <a
                href={`mailto:${app.story.email}`}
                className="font-medium text-ink hover:text-ink-soft transition-colors underline underline-offset-2"
              >
                {app.story.email}
              </a>
              .
            </p>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}

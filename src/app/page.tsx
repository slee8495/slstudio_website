import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { AppIcon } from "@/components/app-icon";
import { apps } from "@/lib/apps";

const stampDotClasses: Record<"positive" | "pending", string> = {
  positive: "bg-status-positive",
  pending: "bg-status-pending",
};

export default function Home() {
  const visibleApps = apps.filter((app) => !app.hidden);

  return (
    <main className="flex-1 w-full mx-auto max-w-6xl px-6 md:px-8 flex flex-col">
      <SiteHeader />

      <section className="pt-6 pb-10 md:pt-16 md:pb-14 text-center">
        <p className="animate-rise-in font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          Build log · est. 2026
        </p>
        <h1 className="animate-rise-in [animation-delay:80ms] font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mt-4">
          The apps I wish existed when I needed them.
        </h1>
        <p className="animate-rise-in [animation-delay:160ms] mt-6 max-w-xl mx-auto text-base md:text-lg text-ink-soft leading-relaxed">
          Each app here started as something I needed and hadn&apos;t
          found yet. Once it&apos;s ready, it joins this list, in case
          yours needs it too.
        </p>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="flex items-end justify-between border-t border-border pt-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            Build log
          </h2>
          <span className="font-mono text-xs text-ink-soft">
            {visibleApps.length} {visibleApps.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleApps.map((app) => (
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
                  <AppIcon icon={app.icon} name={app.name} />
                  <h3 className="font-display text-2xl md:text-3xl font-semibold">
                    {app.name}
                  </h3>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft mt-1">
                  {app.meta}
                </p>
                <p className="mt-4 text-ink-soft leading-relaxed">
                  {app.comingSoon
                    ? (app.comingSoonNote ?? "Coming soon.")
                    : app.tagline}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-5 font-medium text-sm text-ink group-hover:text-ink-soft transition-colors">
                  View {app.name} <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="pb-14 md:pb-20 scroll-mt-24">
        <div className="border-t border-border pt-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            About
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
            A small studio, not a startup.
          </h3>
          <p className="text-ink-soft leading-relaxed">
            SL Studio builds focused software for real problems, usually ones
            we&apos;re living through ourselves first. No outside funding, no
            roadmap chasing growth metrics. Just careful software, shipped
            when it&apos;s actually ready, for people who need exactly what
            it does. Every app starts the same way: as something we needed
            and couldn&apos;t find done well.
          </p>
        </div>
      </section>

      <section id="contact" className="pb-14 md:pb-20 scroll-mt-24">
        <div className="border-t border-border pt-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            Contact
          </h2>
        </div>
        <div className="mt-8 max-w-2xl">
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
            Get in touch.
          </h3>
          <p className="mt-2 text-ink-soft leading-relaxed">
            Questions, feedback, or just want to say hi? This goes straight
            to us.
          </p>
        </div>
        <div className="mt-6 max-w-2xl">
          <ContactForm />
          <p className="mt-4 font-mono text-xs text-ink-soft">
            If you&apos;d rather email us directly, reach out at{" "}
            <a
              href="mailto:support@sl-studio.dev"
              className="text-ink hover:text-ink-soft transition-colors underline underline-offset-2"
            >
              support@sl-studio.dev
            </a>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

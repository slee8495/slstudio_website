import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HowToCarousel } from "@/components/how-to-carousel";
import { PricingCta } from "@/components/pricing-cta";
import { AppIcon } from "@/components/app-icon";
import { AppleIcon, AndroidIcon, WebAppIcon } from "@/components/platform-icons";
import { getApp } from "@/lib/apps";

const app = getApp("roun");

export const metadata: Metadata = {
  title: app?.name,
  description: app?.description,
};

const stampDotClasses: Record<"positive" | "pending", string> = {
  positive: "bg-status-positive",
  pending: "bg-status-pending",
};

export default function RounPage() {
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
            <AppIcon
              icon={app.icon}
              name={app.name}
              size="xl"
              accentClass="border-accent-roun/25 bg-accent-roun-tint"
            />
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
              {app.nameStory && (
                <a
                  href="#the-name"
                  className="block mt-1.5 max-w-[220px] font-mono text-[11px] text-ink-soft hover:text-ink transition-colors underline underline-offset-2 decoration-border hover:decoration-ink"
                >
                  {app.nameStory.teaser}
                </a>
              )}
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
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="border border-accent-roun/25 bg-accent-roun-tint rounded-2xl p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_1fr] gap-6 lg:gap-16 items-start">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
              {app.different.title}
            </h2>
            <p className="text-base md:text-lg text-ink-soft leading-relaxed">
              {app.different.body}
            </p>
          </div>
        </div>
      </section>

      {app.beforeAfter && (
        <section className="pb-14 md:pb-20">
          <div className="border-t border-border pt-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              {app.beforeAfter.label}
            </h2>
          </div>
          <ul className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {app.beforeAfter.images.map((image) => (
              <li
                key={image.src}
                className="rounded-lg overflow-hidden border border-border"
              >
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  className="w-full h-auto block"
                />
              </li>
            ))}
          </ul>
          <div className="mt-8 mx-auto max-w-[380px] sm:max-w-[420px] rounded-lg overflow-hidden border border-border">
            <Image
              src={app.beforeAfter.bridgeImage.src}
              width={app.beforeAfter.bridgeImage.width}
              height={app.beforeAfter.bridgeImage.height}
              alt={app.beforeAfter.bridgeImage.alt}
              className="w-full h-auto block"
            />
          </div>
        </section>
      )}

      {app.howTo && (
        <section className="pb-14 md:pb-20">
          <div className="border-t border-border pt-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              {app.howTo.label}
            </h2>
          </div>
          <div className="mt-8">
            <HowToCarousel howTo={app.howTo} />
          </div>
        </section>
      )}

      {app.features && (
        <section className="pb-14 md:pb-20">
          <div className="border-t border-border pt-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              What it does
            </h2>
          </div>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {app.features.map((feature) => (
              <li
                key={feature.title}
                className="border border-border bg-bg-subtle rounded-lg p-5"
              >
                <span aria-hidden className="text-xl leading-none">
                  {feature.icon}
                </span>
                <h3 className="font-display text-lg font-semibold mt-3">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {app.pricing && (
        <section className="pb-14 md:pb-20">
          <div className="border-t border-border pt-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              {app.pricing.label}
            </h2>
          </div>
          <p className="mt-8 max-w-xl text-ink-soft leading-relaxed">
            {app.pricing.note}
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            <div className="rounded-xl border border-border bg-bg-subtle p-5 md:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                Free
              </p>
              <p className="mt-2 font-display text-3xl font-semibold tracking-tight">
                $0
              </p>
              <ul className="mt-5 divide-y divide-border">
                {app.pricing.rows.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-4 py-2.5 text-sm first:pt-0 last:pb-0"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                      {row.label}
                    </span>
                    <span className="font-medium text-right">
                      {row.free}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-xl border-2 border-accent-roun bg-accent-roun-tint p-5 md:p-6">
              <span className="absolute -top-3.5 left-5 rounded-full bg-accent-highlight px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
                {app.pricing.trial}
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                Pro
              </p>
              <p className="mt-2 font-display text-3xl font-semibold tracking-tight">
                {app.pricing.price}
              </p>
              <ul className="mt-5 divide-y divide-accent-roun/20">
                {app.pricing.rows.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-4 py-2.5 text-sm first:pt-0 last:pb-0"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                      {row.label}
                    </span>
                    <span className="font-semibold text-right">
                      {row.pro}
                    </span>
                  </li>
                ))}
              </ul>
              <PricingCta href={app.pricing.cta.href} label={app.pricing.cta.label} />
            </div>
          </div>
        </section>
      )}

      {app.referral && (
        <section className="pb-14 md:pb-20">
          <div className="border border-accent-roun/25 bg-accent-roun-tint rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
              {app.referral.title}
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft leading-relaxed">
              {app.referral.body}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={`mailto:${app.referral.email}`}
                className="text-sm font-medium text-ink hover:text-ink-soft transition-colors underline underline-offset-2"
              >
                Email {app.referral.email}
              </a>
              <Link
                href="/#contact"
                className="text-sm font-medium text-ink hover:text-ink-soft transition-colors underline underline-offset-2"
              >
                Or use the contact form →
              </Link>
            </div>
          </div>
        </section>
      )}

      {app.downloads && (
        <section className="pb-14 md:pb-20">
          <div className="border-t border-border pt-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              {app.downloads.label}
            </h2>
          </div>
          <p className="mt-8 max-w-xl text-ink-soft leading-relaxed">
            {app.downloads.note}{" "}
            {app.referral && (
              <a
                href={`mailto:${app.referral.email}`}
                className="font-medium text-ink hover:text-ink-soft transition-colors underline underline-offset-2"
              >
                {app.referral.email}
              </a>
            )}{" "}
            if you started with the mobile web app before the native apps launched, and
            I&apos;ll add a free month as a thank you.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
            {app.downloads.links.map((link) => {
              const Icon =
                link.platform === "ios"
                  ? AppleIcon
                  : link.platform === "android"
                    ? AndroidIcon
                    : WebAppIcon;
              const iconBg =
                link.platform === "ios"
                  ? "bg-ink"
                  : link.platform === "android"
                    ? "bg-[#3DDC84]"
                    : "bg-accent-roun";
              const content = (
                <>
                  <span
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold tracking-tight">
                      {link.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                      {link.href ? "Available now" : "Coming soon"}
                    </p>
                  </div>
                </>
              );
              if (link.href) {
                return (
                  <a
                    key={link.platform}
                    href={link.href}
                    className="flex items-center gap-3 rounded-xl border border-accent-roun bg-accent-roun-tint p-4 transition-opacity hover:opacity-90"
                  >
                    {content}
                  </a>
                );
              }
              return (
                <div
                  key={link.platform}
                  aria-disabled
                  className="flex items-center gap-3 rounded-xl border border-border bg-bg-subtle p-4"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {app.nameStory && (
        <section id="the-name" className="pb-14 md:pb-20 scroll-mt-24">
          <div className="border-t border-border pt-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              {app.nameStory.label}
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-16 items-start">
            <p className="font-display text-5xl md:text-6xl font-semibold tracking-tight">
              {app.name}
            </p>
            <div className="max-w-2xl space-y-5">
              {app.nameStory.paragraphs.map((segments, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-ink-soft leading-relaxed"
                >
                  {segments.map((segment, j) =>
                    segment.emphasis ? (
                      <mark
                        key={j}
                        className="bg-accent-roun-tint text-ink font-semibold rounded-sm px-1 py-0.5"
                      >
                        {segment.text}
                      </mark>
                    ) : (
                      <span key={j}>{segment.text}</span>
                    )
                  )}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DemoMedia } from "@/components/demo-media";
import { AppIcon } from "@/components/app-icon";
import { AppleIcon, AndroidIcon } from "@/components/platform-icons";
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
        <div className="flex items-center gap-4">
          <AppIcon
            icon={app.icon}
            name={app.name}
            size="hero"
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
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mt-1">
              {app.name}
            </h1>
          </div>
        </div>
        <p className="mt-6 max-w-2xl font-display text-xl md:text-2xl font-medium tracking-tight leading-snug">
          {app.catchline}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft mt-4">
          {app.meta}
        </p>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
          {app.description}
        </p>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="max-w-3xl border border-accent-roun/25 bg-accent-roun-tint rounded-lg p-6 md:p-8">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            {app.different.title}
          </h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            {app.different.body}
          </p>
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

      {app.demo && (
        <section className="pb-14 md:pb-20">
          <div
            className={`mx-auto rounded-md border border-border overflow-hidden bg-bg ${
              app.demo.height > app.demo.width
                ? "max-w-[320px] sm:max-w-[360px]"
                : "max-w-4xl"
            }`}
          >
            <DemoMedia demo={app.demo} className="w-full h-auto block" />
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
          <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
              {app.pricing.price}
            </span>
            <span className="text-ink-soft">{app.pricing.trial}</span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">{app.pricing.note}</p>

          <div className="mt-8 max-w-2xl overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left font-mono text-[11px] uppercase tracking-wide text-ink-soft pb-3 pr-4 border-b border-border" />
                  <th className="text-left font-display text-base font-semibold pb-3 px-4 border-b border-border">
                    Free
                  </th>
                  <th className="text-left font-display text-base font-semibold pb-3 px-4 border-b border-border bg-accent-roun-tint">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {app.pricing.rows.map((row) => (
                  <tr key={row.label}>
                    <td className="py-3 pr-4 font-mono text-[11px] uppercase tracking-wide text-ink-soft border-b border-border whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="py-3 px-4 text-ink-soft border-b border-border">
                      {row.free}
                    </td>
                    <td className="py-3 px-4 border-b border-border bg-accent-roun-tint/40">
                      {row.pro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <div className="mt-8 flex flex-wrap gap-3">
            {app.downloads.links.map((link) => {
              const Icon = link.platform === "ios" ? AppleIcon : AndroidIcon;
              return (
                <span
                  key={link.platform}
                  aria-disabled={!link.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-ink-soft opacity-60"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                  <span className="font-mono text-[10px] uppercase tracking-wide">
                    Coming soon
                  </span>
                </span>
              );
            })}
          </div>
        </section>
      )}

      {app.nameStory && (
        <section className="pb-14 md:pb-20">
          <div className="border-t border-border pt-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              {app.nameStory.label}
            </h2>
          </div>
          <p className="mt-8 font-display text-4xl md:text-5xl font-semibold tracking-tight">
            {app.name}
          </p>
          <div className="mt-4 max-w-2xl space-y-4">
            {app.nameStory.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-ink-soft leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}

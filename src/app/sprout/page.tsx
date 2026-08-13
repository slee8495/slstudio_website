import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DemoMedia } from "@/components/demo-media";
import { getApp } from "@/lib/apps";

const app = getApp("sprout");

export const metadata: Metadata = {
  title: app?.name,
  description: app?.description,
};

const stampDotClasses: Record<"positive" | "pending", string> = {
  positive: "bg-status-positive",
  pending: "bg-status-pending",
};

export default function SproutPage() {
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
            className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-accent-sprout/25 bg-accent-sprout-tint text-2xl shrink-0"
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
        <div className="max-w-3xl border border-accent-sprout/25 bg-accent-sprout-tint rounded-lg p-6 md:p-8">
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

      <SiteFooter />
    </main>
  );
}

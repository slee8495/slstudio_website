import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard, ProductTile } from "@/components/product-directory";
import {
  SITE_URL,
  categoryHref,
  decodeParam,
  formatLaunched,
  getDirectoryItem,
  getDirectoryItems,
  LANGUAGE_NAMES,
} from "@/lib/directory";

export const revalidate = 3600;

// Prerender the Smith products known at build time; new ones render on first visit and are
// cached for the hour like everything else.
export async function generateStaticParams() {
  const items = await getDirectoryItems();
  return items
    .filter((item) => item.source === "smith")
    .map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/p/[id]">): Promise<Metadata> {
  const { id } = await params;
  const item = await getDirectoryItem(decodeParam(id));
  if (!item || item.source !== "smith") return {};
  return {
    title: item.name,
    description: item.tagline || item.description.slice(0, 160),
    alternates: { canonical: `/p/${item.id}` },
    openGraph: {
      title: `${item.name} · SL Studio`,
      description: item.tagline,
      url: `${SITE_URL}/p/${item.id}`,
    },
  };
}

function jsonLd(data: unknown) {
  // Escape "<" so product text can never close the script tag.
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export default async function ProductPage({ params }: PageProps<"/p/[id]">) {
  const { id } = await params;
  const items = await getDirectoryItems();
  const item = items.find((entry) => entry.id === decodeParam(id));
  if (!item) notFound();

  // Studio apps already have full pages at /<slug>; /p/<slug> is just their stable alias.
  if (item.source === "studio") permanentRedirect(item.href);

  const lang = item.languages[0] === "ko" ? "ko" : undefined;
  const host = item.outboundUrl ? new URL(item.outboundUrl).hostname : null;
  const related = items
    .filter((entry) => entry.category === item.category && entry.id !== item.id)
    .slice(0, 3);

  return (
    <main className="flex-1 w-full mx-auto max-w-6xl px-6 md:px-8 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: item.name,
          description: item.description,
          url: item.outboundUrl ?? `${SITE_URL}/p/${item.id}`,
          applicationCategory: item.category,
          inLanguage: item.languages,
          ...(item.launched ? { datePublished: item.launched } : {}),
          operatingSystem: "Web",
          publisher: { "@type": "Organization", name: "SL Studio", url: SITE_URL },
        })}
      />
      <SiteHeader />

      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/#products" className="hover:text-ink underline-offset-4 hover:underline">
              Products
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={categoryHref(item.category)} className="hover:text-ink underline-offset-4 hover:underline">
              {item.category}
            </Link>
          </li>
        </ol>
      </nav>

      <article className="pt-8 pb-14 md:pt-12 md:pb-20 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16">
        <div>
          <ProductTile item={item} />
          <h1
            lang={lang}
            className="mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]"
          >
            {item.name}
          </h1>
          {item.tagline && (
            <p lang={lang} className="mt-4 max-w-xl text-lg md:text-xl text-ink-soft leading-relaxed">
              {item.tagline}
            </p>
          )}
          {item.outboundUrl && (
            <a
              href={item.outboundUrl}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-base font-medium text-bg transition-colors hover:bg-ink/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Open {item.name}
              <svg aria-hidden viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 2h6v6M10 2 3 9" />
              </svg>
            </a>
          )}
          {item.description && item.description !== item.tagline && (
            <p lang={lang} className="mt-10 max-w-[62ch] text-ink/85 leading-[1.8]">
              {item.description}
            </p>
          )}
        </div>

        <dl className="self-start rounded-2xl border border-border bg-bg-subtle p-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 text-sm">
          <dt className="text-ink-soft">Category</dt>
          <dd>
            <Link href={categoryHref(item.category)} className="text-ink underline underline-offset-4 hover:text-ink-soft">
              {item.category}
            </Link>
          </dd>
          <dt className="text-ink-soft">Language</dt>
          <dd className="text-ink">
            {item.languages.length
              ? item.languages.map((code) => LANGUAGE_NAMES[code] ?? code.toUpperCase()).join(", ")
              : "Not specified"}
          </dd>
          <dt className="text-ink-soft">Launched</dt>
          <dd className="text-ink">{formatLaunched(item.launched, true)}</dd>
          {host && (
            <>
              <dt className="text-ink-soft">Website</dt>
              <dd>
                <a href={item.outboundUrl!} className="break-all text-ink underline underline-offset-4 hover:text-ink-soft">
                  {host}
                </a>
              </dd>
            </>
          )}
          <dt className="text-ink-soft">Made by</dt>
          <dd className="text-ink">SL Studio</dd>
        </dl>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-border py-14 md:py-16">
          <h2 id="related-heading" className="font-display text-2xl font-semibold tracking-tight">
            More in {item.category}
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => (
              <li key={entry.id}>
                <ProductCard item={entry} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}

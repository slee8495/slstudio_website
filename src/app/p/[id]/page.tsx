import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { StudioShell } from "@/components/studio/studio-shell";
import { ProductGrid, StatusDot } from "@/components/studio/product-directory";
import {
  SITE_URL,
  categoryHref,
  decodeParam,
  getDirectoryItem,
  getDirectoryItems,
} from "@/lib/directory";
import { LANGUAGE_NAMES, formatLaunched, hostOf } from "@/lib/directory-format";

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

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-3 last:border-b-0">
      <dt className="text-xs text-ink-faint">{label}</dt>
      <dd className="min-w-0 text-right text-sm text-ink">{children}</dd>
    </div>
  );
}

export default async function ProductPage({ params }: PageProps<"/p/[id]">) {
  const { id } = await params;
  const items = await getDirectoryItems();
  const item = items.find((entry) => entry.id === decodeParam(id));
  if (!item) notFound();

  // Studio apps already have full pages at /<slug>; /p/<slug> is their stable alias.
  if (item.source === "studio") permanentRedirect(item.href);

  const related = items
    .filter((entry) => entry.category === item.category && entry.id !== item.id)
    .slice(0, 3);

  return (
    <StudioShell>
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

      <nav aria-label="Breadcrumb" className="pt-8 font-mono text-xs text-ink-faint">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/#products" className="hover:text-ink">
              Products
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={categoryHref(item.category)} className="hover:text-ink">
              {item.category}
            </Link>
          </li>
        </ol>
      </nav>

      <article className="grid grid-cols-1 gap-12 pt-10 pb-16 md:pt-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <div>
          <StatusDot launched={item.launched} />
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-ink md:text-4xl">
            {item.name}
          </h1>
          {item.tagline && (
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              {item.tagline}
            </p>
          )}
          {item.outboundUrl && (
            <a
              href={item.outboundUrl}
              className="mt-8 inline-flex h-9 items-center gap-2 rounded-md bg-ink px-4 text-sm font-medium text-bg transition-colors hover:bg-ink/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Visit {hostOf(item.outboundUrl)}
              <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4.5 2.5h5v5M9.5 2.5 3 9" />
              </svg>
            </a>
          )}
          {item.description && item.description !== item.tagline && (
            <div className="mt-12 border-t border-border pt-8">
              <h2 className="text-[15px] font-medium text-ink">Overview</h2>
              <p className="mt-3 max-w-[64ch] text-[15px] leading-[1.75] text-ink-soft">
                {item.description}
              </p>
            </div>
          )}
        </div>

        <dl className="self-start rounded-xl border border-border bg-bg-subtle px-5 py-2">
          <Fact label="Status">{item.launched ? "Live" : "In development"}</Fact>
          <Fact label="Category">
            <Link href={categoryHref(item.category)} className="hover:underline underline-offset-4">
              {item.category}
            </Link>
          </Fact>
          <Fact label="Language">
            {item.languages.length
              ? item.languages.map((code) => LANGUAGE_NAMES[code] ?? code.toUpperCase()).join(", ")
              : "Not specified"}
          </Fact>
          <Fact label="Launched">
            <span className="font-mono tabular-nums">{formatLaunched(item.launched, true)}</span>
          </Fact>
          {item.outboundUrl && (
            <Fact label="Website">
              <a href={item.outboundUrl} className="break-all font-mono text-[13px] hover:underline underline-offset-4">
                {hostOf(item.outboundUrl)}
              </a>
            </Fact>
          )}
          <Fact label="Publisher">SL Studio</Fact>
        </dl>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-border py-14">
          <h2 id="related-heading" className="mb-6 text-[15px] font-medium text-ink">
            More in {item.category}
          </h2>
          <ProductGrid items={related} />
        </section>
      )}
    </StudioShell>
  );
}

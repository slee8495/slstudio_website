import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StudioShell } from "@/components/studio/studio-shell";
import { ProductGrid } from "@/components/studio/product-directory";
import {
  categoryHref,
  categorySlug,
  decodeParam,
  getDirectoryItems,
  summarizeCategories,
} from "@/lib/directory";

export const revalidate = 3600;

export async function generateStaticParams() {
  const items = await getDirectoryItems();
  return summarizeCategories(items).map((c) => ({ category: c.slug }));
}

async function loadCategory(param: string) {
  const slug = decodeParam(param);
  const items = await getDirectoryItems();
  const inCategory = items.filter((item) => categorySlug(item.category) === slug);
  if (inCategory.length === 0) return null;
  return {
    name: inCategory[0].category,
    slug,
    items: inCategory,
    others: summarizeCategories(items).filter((c) => c.slug !== slug),
  };
}

export async function generateMetadata({
  params,
}: PageProps<"/c/[category]">): Promise<Metadata> {
  const data = await loadCategory((await params).category);
  if (!data) return {};
  return {
    title: data.name,
    description: `SL Studio products in ${data.name}.`,
    alternates: { canonical: categoryHref(data.name) },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/c/[category]">) {
  const data = await loadCategory((await params).category);
  if (!data) notFound();

  return (
    <StudioShell>
      <nav aria-label="Breadcrumb" className="pt-8 font-mono text-xs text-ink-faint">
        <Link href="/#products" className="hover:text-ink">
          Products
        </Link>
      </nav>

      <section className="pt-10 pb-16 md:pt-14">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-[-0.025em] text-ink md:text-4xl">
            {data.name}
          </h1>
          <span className="font-mono text-xs text-ink-faint">
            {data.items.length} {data.items.length === 1 ? "product" : "products"}
          </span>
        </div>
        <ProductGrid items={data.items} />
      </section>

      {data.others.length > 0 && (
        <section aria-labelledby="other-categories" className="border-t border-border py-12">
          <h2 id="other-categories" className="text-[15px] font-medium text-ink">
            Other categories
          </h2>
          <ul className="mt-4 flex flex-wrap gap-1">
            {data.others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={categoryHref(c.name)}
                  className="inline-flex h-8 items-center gap-2 rounded-md border border-border px-3 text-[13px] text-ink-soft transition-colors hover:border-border-strong hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {c.name}
                  <span className="font-mono text-[11px] text-ink-faint">{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </StudioShell>
  );
}

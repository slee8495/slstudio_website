import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-directory";
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
    description: `${data.items.length} ${data.items.length === 1 ? "tool" : "tools"} from SL Studio in ${data.name}.`,
    alternates: { canonical: categoryHref(data.name) },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/c/[category]">) {
  const data = await loadCategory((await params).category);
  if (!data) notFound();

  return (
    <main className="flex-1 w-full mx-auto max-w-6xl px-6 md:px-8 flex flex-col">
      <SiteHeader />

      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <Link href="/#products" className="hover:text-ink underline-offset-4 hover:underline">
          Products
        </Link>
      </nav>

      <section className="pt-8 pb-14 md:pt-12 md:pb-20">
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
          {data.name}
        </h1>
        <p className="mt-3 text-ink-soft">
          {data.items.length} {data.items.length === 1 ? "product" : "products"}, newest first
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => (
            <li key={item.id}>
              <ProductCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      {data.others.length > 0 && (
        <section aria-labelledby="other-categories" className="border-t border-border py-12">
          <h2 id="other-categories" className="font-display text-xl font-semibold tracking-tight">
            Other categories
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {data.others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={categoryHref(c.name)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-subtle px-3.5 py-1.5 text-sm text-ink-soft hover:border-ink/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {c.name}
                  <span className="text-ink-soft/70">{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}

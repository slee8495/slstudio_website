import type { MetadataRoute } from "next";
import {
  SITE_URL,
  categoryHref,
  getDirectoryItems,
  summarizeCategories,
} from "@/lib/directory";

export const revalidate = 3600;

// Only pages on sl-studio.dev itself. The sitemaps.org protocol requires every URL to share
// the sitemap's host, so products on <id>.sl-studio.dev subdomains publish their own sitemaps.
// Studio apps are listed at their canonical /<slug> page; /p/<slug> just redirects there.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await getDirectoryItems();

  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    ...items.map((item) => ({
      url: `${SITE_URL}${item.href}`,
      ...(item.launched ? { lastModified: item.launched } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...summarizeCategories(items).map((c) => ({
      url: `${SITE_URL}${categoryHref(c.name)}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}

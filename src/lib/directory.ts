import { apps } from "@/lib/apps";
import { categorySlug } from "@/lib/directory-format";

export {
  categorySlug,
  categoryHref,
  formatLaunched,
  LANGUAGE_NAMES,
} from "@/lib/directory-format";

export const SITE_URL = "https://sl-studio.dev";

// One product in the studio directory. Everything here is public: it's built field by field,
// never spread from an upstream payload.
export type DirectoryItem = {
  // Stable id. The product's detail route is /p/<id>.
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  languages: string[];
  // YYYY-MM-DD, or null for "coming soon".
  launched: string | null;
  // Where the directory card navigates on sl-studio.dev.
  href: string;
  // The product itself, when it lives off this site (Smith products on subdomains).
  outboundUrl: string | null;
  source: "studio" | "smith";
  icon: { kind: "image"; src: string } | { kind: "glyph"; text: string } | null;
};

// Overridable so the directory can be exercised locally against a fixture.
const SMITH_INDEX_URL =
  process.env.SMITH_INDEX_URL ??
  "https://kalshi-bice.vercel.app/api/data?file=smith/smith_index.json";

// Smith products are only ever published on studio subdomains. Anything else in the index
// is treated as a mistake and left off the public site.
const SMITH_URL_HOST = /^[a-z0-9-]+\.sl-studio\.dev$/;
const ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;


// Route params can arrive percent-encoded or decoded depending on the request path.
export function decodeParam(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function staticItems(): DirectoryItem[] {
  return apps
    .filter((app) => !app.hidden)
    .map((app) => ({
      id: app.slug,
      name: app.name,
      tagline: app.comingSoon
        ? (app.comingSoonNote ?? "Coming soon.")
        : app.tagline,
      description: app.comingSoon
        ? (app.comingSoonNote ?? "Coming soon.")
        : app.description,
      category: app.directory.category,
      languages: app.directory.languages,
      launched: app.comingSoon ? null : app.directory.launched,
      href: `/${app.slug}`,
      outboundUrl: null,
      source: "studio" as const,
      icon:
        typeof app.icon === "string"
          ? { kind: "glyph" as const, text: app.icon }
          : { kind: "image" as const, src: app.icon.src },
    }));
}

function str(value: unknown, max = 200): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= max ? trimmed : null;
}

function isoDate(value: unknown): string | null {
  const s = str(value, 40);
  if (!s) return null;
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(s);
  if (!match || Number.isNaN(Date.parse(match[1]))) return null;
  return match[1];
}

function smithUrl(value: unknown): string | null {
  const s = str(value, 300);
  if (!s) return null;
  try {
    const url = new URL(s);
    if (url.protocol !== "https:" || !SMITH_URL_HOST.test(url.hostname)) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

// Reads only the public product fields from Smith's index. The index also carries internal
// logs, candidates and todos; none of that is touched here.
function parseSmithProducts(payload: unknown, taken: Set<string>): DirectoryItem[] {
  if (!payload || typeof payload !== "object") return [];
  const products = (payload as { products?: unknown }).products;
  if (!Array.isArray(products)) return [];

  const items: DirectoryItem[] = [];
  for (const raw of products) {
    if (!raw || typeof raw !== "object") continue;
    const p = raw as Record<string, unknown>;
    if (p.status !== "live") continue;

    const id = str(p.id, 64)?.toLowerCase();
    const name = str(p.name, 80);
    const outboundUrl = smithUrl(p.url);
    if (!id || !ID_PATTERN.test(id) || taken.has(id) || !name || !outboundUrl) {
      continue;
    }
    taken.add(id);

    const lang = str(p.lang, 10)?.toLowerCase();
    const tagline = str(p.tagline) ?? "";
    items.push({
      id,
      name,
      tagline,
      description: str(p.desc, 2000) ?? tagline,
      category: str(p.category, 40) ?? "Tools",
      languages: lang && /^[a-z]{2}$/.test(lang) ? [lang] : [],
      launched: isoDate(p.launched),
      href: `/p/${id}`,
      outboundUrl,
      source: "smith",
      icon: null,
    });
  }
  return items;
}

async function fetchSmithPayload(): Promise<unknown> {
  try {
    const res = await fetch(SMITH_INDEX_URL, {
      next: { revalidate: 3600, tags: ["smith-index"] },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    // Smith being down must never take the site with it.
    return null;
  }
}

// Launched products newest first, then coming-soon ones, then name as a tiebreaker.
function compareItems(a: DirectoryItem, b: DirectoryItem): number {
  if (a.launched && b.launched && a.launched !== b.launched) {
    return a.launched < b.launched ? 1 : -1;
  }
  if (a.launched && !b.launched) return -1;
  if (!a.launched && b.launched) return 1;
  return a.name.localeCompare(b.name);
}

export async function getDirectoryItems(): Promise<DirectoryItem[]> {
  const studio = staticItems();
  // Hidden apps keep their slug reserved so a Smith product can't take over /p/<slug>.
  const taken = new Set(apps.map((app) => app.slug));
  const smith = parseSmithProducts(await fetchSmithPayload(), taken);
  return [...studio, ...smith].sort(compareItems);
}

export async function getDirectoryItem(
  id: string,
): Promise<DirectoryItem | undefined> {
  return (await getDirectoryItems()).find((item) => item.id === id);
}

export type CategorySummary = { name: string; slug: string; count: number };

export function summarizeCategories(items: DirectoryItem[]): CategorySummary[] {
  const map = new Map<string, CategorySummary>();
  for (const item of items) {
    const slug = categorySlug(item.category);
    if (!slug) continue;
    const entry = map.get(slug);
    if (entry) entry.count += 1;
    else map.set(slug, { name: item.category, slug, count: 1 });
  }
  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
}

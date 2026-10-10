"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { DirectoryItem } from "@/lib/directory";
import { categoryHref, formatLaunched } from "@/lib/directory-format";

const PAGE_SIZE = 24;
const SEARCH_THRESHOLD = 12;

const LANGUAGE_FILTERS: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ko", label: "Korean" },
];

// Muted tile colors, picked per category so products in the same field share a color.
// Every pair clears WCAG AA for the glyph on its tile.
const TILE_COLORS: { bg: string; fg: string }[] = [
  { bg: "#e4ece1", fg: "#35603f" },
  { bg: "#e1e8f0", fg: "#334f6e" },
  { bg: "#f1e7cc", fg: "#6b4f12" },
  { bg: "#ece2ec", fg: "#633d5e" },
  { bg: "#dcebe8", fg: "#2a5f58" },
  { bg: "#eee4da", fg: "#5d4532" },
];

function tileColor(category: string) {
  let hash = 0;
  for (const ch of category) hash = (hash * 31 + ch.codePointAt(0)!) >>> 0;
  return TILE_COLORS[hash % TILE_COLORS.length];
}

export function ProductTile({ item }: { item: DirectoryItem }) {
  if (item.icon?.kind === "image") {
    return (
      <Image
        src={item.icon.src}
        width={48}
        height={48}
        alt=""
        className="h-12 w-12 rounded-xl object-cover shrink-0"
      />
    );
  }
  const color = tileColor(item.category);
  const glyph =
    item.icon?.kind === "glyph" ? item.icon.text : Array.from(item.name)[0];
  return (
    <span
      aria-hidden
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-xl font-semibold"
      style={{ backgroundColor: color.bg, color: color.fg }}
    >
      {glyph}
    </span>
  );
}

function LanguageBadges({ languages }: { languages: string[] }) {
  if (languages.length === 0) return null;
  const shown = languages.slice(0, 2);
  const rest = languages.length - shown.length;
  return (
    <span className="flex items-center gap-1">
      <span className="sr-only">Languages:</span>
      {shown.map((code) => (
        <span
          key={code}
          className="rounded border border-border px-1.5 py-px text-[11px] font-medium leading-4 text-ink-soft"
        >
          {code.toUpperCase()}
        </span>
      ))}
      {rest > 0 && (
        <span className="text-[11px] leading-4 text-ink-soft">
          +{rest}
          <span className="sr-only"> more</span>
        </span>
      )}
    </span>
  );
}

export function ProductCard({ item }: { item: DirectoryItem }) {
  const upcoming = item.launched === null;
  const lang = item.languages[0] === "ko" ? "ko" : undefined;
  // The title link stretches over the whole card; the category and outbound links sit
  // above it so each stays separately clickable without nesting anchors.
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-border bg-bg-subtle p-5 transition-colors hover:border-ink/30 has-[a:focus-visible]:border-ink/40">
      <div className="flex items-start gap-4">
        <ProductTile item={item} />
        <div className="min-w-0">
          <h3 lang={lang} className="font-display text-lg font-semibold leading-snug text-ink">
            <Link
              href={item.href}
              className="rounded-sm after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {item.name}
            </Link>
          </h3>
          <Link
            href={categoryHref(item.category)}
            className="relative z-10 text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {item.category}
          </Link>
        </div>
      </div>
      <p lang={lang} className="mt-4 line-clamp-2 text-[15px] leading-relaxed text-ink/80">
        {item.tagline}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs text-ink-soft">
        <span className="flex items-center gap-3">
          <LanguageBadges languages={item.languages} />
          <span className={`inline-flex items-center gap-1.5 ${upcoming ? "text-status-pending" : ""}`}>
            {upcoming && (
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-status-pending" />
            )}
            {formatLaunched(item.launched)}
          </span>
        </span>
        {item.outboundUrl && (
          <a
            href={item.outboundUrl}
            className="relative z-10 inline-flex items-center gap-1 rounded-sm font-medium text-ink hover:text-ink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Open
            <span className="sr-only"> {item.name} at {new URL(item.outboundUrl).hostname}</span>
            <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 2h6v6M10 2 3 9" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}

function Chip({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
        active
          ? "border-ink bg-ink text-bg"
          : "border-border bg-bg-subtle text-ink-soft hover:border-ink/30 hover:text-ink"
      }`}
    >
      {children}
      {count !== undefined && (
        <span className={active ? "text-bg/70" : "text-ink-soft/70"}>{count}</span>
      )}
    </button>
  );
}

export function ProductDirectory({ items }: { items: DirectoryItem[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const searchId = useId();

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return [...counts.entries()].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    );
  }, [items]);

  const languages = useMemo(
    () =>
      LANGUAGE_FILTERS.filter((lang) =>
        items.some((item) => item.languages.includes(lang.code)),
      ),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (item) =>
        (!category || item.category === category) &&
        (!language || item.languages.includes(language)) &&
        (!q ||
          item.name.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)),
    );
  }, [items, category, language, query]);

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const filtering = category !== null || language !== null || query !== "";

  function clearFilters() {
    setCategory(null);
    setLanguage(null);
    setQuery("");
  }

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div
          role="group"
          aria-label="Filter by category"
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        >
          <Chip active={category === null} onClick={() => setCategory(null)} count={items.length}>
            All
          </Chip>
          {categories.map(([name, count]) => (
            <Chip
              key={name}
              active={category === name}
              onClick={() => setCategory(category === name ? null : name)}
              count={count}
            >
              {name}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {languages.length > 1 && (
            <div
              role="group"
              aria-label="Filter by language"
              className="inline-flex rounded-full border border-border bg-bg-subtle p-0.5"
            >
              {[{ code: null, label: "Any language" }, ...languages].map((lang) => (
                <button
                  key={lang.code ?? "any"}
                  type="button"
                  aria-pressed={language === lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`rounded-full px-3 py-1 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink ${
                    language === lang.code
                      ? "bg-ink text-bg"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
          {items.length > SEARCH_THRESHOLD && (
            <div>
              <label htmlFor={searchId} className="sr-only">
                Search products
              </label>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-44 rounded-full border border-border bg-bg-subtle px-4 py-1.5 text-sm text-ink placeholder:text-ink-soft/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              />
            </div>
          )}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-ink-soft">
        {filtering
          ? `${filtered.length} of ${items.length} products`
          : `${items.length} ${items.length === 1 ? "product" : "products"}, newest first`}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border px-6 py-12 text-center">
          <p className="text-ink">No products match these filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 text-sm font-medium text-ink underline underline-offset-4 hover:text-ink-soft"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.id}>
              <ProductCard item={item} />
            </li>
          ))}
        </ul>
      )}

      {!showAll && filtered.length > PAGE_SIZE && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-full border border-ink/20 bg-bg-subtle px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Show all {filtered.length} products
          </button>
        </div>
      )}
    </div>
  );
}

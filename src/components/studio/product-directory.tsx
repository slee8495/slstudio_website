"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { DirectoryItem } from "@/lib/directory";
import {
  categoryHref,
  formatLaunched,
  hostOf,
  statusLabel,
} from "@/lib/directory-format";

const PAGE_SIZE = 24;
const SEARCH_THRESHOLD = 12;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function StatusDot({ launched }: { launched: string | null }) {
  const live = launched !== null;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${live ? "bg-status-positive" : "bg-status-pending"}`}
      />
      {statusLabel(launched)}
    </span>
  );
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className="h-3 w-3 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M4.5 2.5h5v5M9.5 2.5 3 9" />
    </svg>
  );
}

export function ProductCard({ item }: { item: DirectoryItem }) {
  // The name link stretches over the whole card; the category and website links sit above
  // it so each stays separately clickable without nesting anchors.
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-border bg-bg-subtle p-5 transition-colors hover:border-border-strong hover:bg-surface-hover has-[a:focus-visible]:border-border-strong">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="min-w-0 text-[15px] font-medium leading-snug text-ink">
          <Link
            href={item.href}
            className={`rounded-sm after:absolute after:inset-0 after:rounded-xl after:content-[''] ${focusRing}`}
          >
            {item.name}
          </Link>
        </h3>
        <span className="shrink-0">
          <StatusDot launched={item.launched} />
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
        {item.tagline}
      </p>
      <div className="mt-auto flex items-center justify-between gap-4 pt-6 font-mono text-xs text-ink-faint">
        <span className="flex min-w-0 items-center gap-3">
          <Link
            href={categoryHref(item.category)}
            className={`relative z-10 truncate rounded-sm transition-colors hover:text-ink ${focusRing}`}
          >
            {item.category}
          </Link>
          {item.launched && <span className="shrink-0">{formatLaunched(item.launched)}</span>}
          {item.languages.length === 1 && item.languages[0] !== "en" && (
            <span className="shrink-0" title="Interface language">
              {item.languages[0].toUpperCase()}
            </span>
          )}
        </span>
        {item.outboundUrl && (
          <a
            href={item.outboundUrl}
            title={hostOf(item.outboundUrl)}
            className={`relative z-10 -my-1 -mr-1.5 inline-flex h-6 shrink-0 items-center gap-1 rounded-md px-1.5 font-sans text-ink-soft transition-colors hover:bg-bg hover:text-ink ${focusRing}`}
          >
            Visit
            <span className="sr-only"> {hostOf(item.outboundUrl)}</span>
            <ExternalIcon />
          </a>
        )}
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: DirectoryItem[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <ProductCard item={item} />
        </li>
      ))}
    </ul>
  );
}

function Chip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-8 shrink-0 items-center gap-2 rounded-md border px-3 text-[13px] transition-colors ${focusRing} ${
        active
          ? "border-border-strong bg-surface-hover text-ink"
          : "border-transparent text-ink-soft hover:text-ink"
      }`}
    >
      {label}
      <span className="font-mono text-[11px] text-ink-faint">{count}</span>
    </button>
  );
}

export function ProductDirectory({ items }: { items: DirectoryItem[] }) {
  const [category, setCategory] = useState<string | null>(null);
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (item) =>
        (!category || item.category === category) &&
        (!q ||
          item.name.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)),
    );
  }, [items, category, query]);

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const showChips = categories.length > 1;
  const showSearch = items.length > SEARCH_THRESHOLD;

  if (items.length === 0) {
    return <p className="text-sm text-ink-soft">No products are listed yet.</p>;
  }

  return (
    <div>
      {(showChips || showSearch) && (
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {showChips ? (
            <div
              role="group"
              aria-label="Filter by category"
              className="-mx-6 flex gap-1 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
            >
              <Chip
                active={category === null}
                onClick={() => setCategory(null)}
                label="All"
                count={items.length}
              />
              {categories.map(([name, count]) => (
                <Chip
                  key={name}
                  active={category === name}
                  onClick={() => setCategory(category === name ? null : name)}
                  label={name}
                  count={count}
                />
              ))}
            </div>
          ) : (
            <span />
          )}
          {showSearch && (
            <div className="md:w-60">
              <label htmlFor={searchId} className="sr-only">
                Search products
              </label>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className={`h-8 w-full rounded-md border border-border bg-bg-subtle px-3 text-[13px] text-ink placeholder:text-ink-faint ${focusRing}`}
              />
            </div>
          )}
        </div>
      )}

      {(category !== null || query !== "") && (
        <p aria-live="polite" className="mb-4 font-mono text-xs text-ink-faint">
          {filtered.length} of {items.length}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border px-6 py-12 text-center">
          <p className="text-sm text-ink">No products match.</p>
          <button
            type="button"
            onClick={() => {
              setCategory(null);
              setQuery("");
            }}
            className={`mt-2 rounded-sm text-sm text-ink-soft underline underline-offset-4 hover:text-ink ${focusRing}`}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ProductGrid items={visible} />
      )}

      {!showAll && filtered.length > PAGE_SIZE && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className={`h-8 rounded-md border border-border px-4 text-[13px] text-ink-soft transition-colors hover:border-border-strong hover:text-ink ${focusRing}`}
          >
            Show all {filtered.length}
          </button>
        </div>
      )}
    </div>
  );
}

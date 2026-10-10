// Pure helpers shared by server pages and the client-side directory. No data imports here,
// so pulling these into a client component doesn't ship the app catalog to the browser.

// URL segment for a category page: /c/<slug>. Keeps Hangul and other letters as-is.
export function categorySlug(category: string): string {
  return category
    .trim()
    .toLowerCase()
    .replace(/[\s·・/&,+]+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function categoryHref(category: string): string {
  return `/c/${encodeURIComponent(categorySlug(category))}`;
}

export const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  ko: "Korean",
  ja: "Japanese",
  zh: "Chinese",
  es: "Spanish",
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Fixed formatting (no Intl/locale) so server and client render identical text.
export function formatLaunched(date: string | null, long = false): string {
  if (!date) return "Coming soon";
  const [year, month, day] = date.split("-");
  const m = MONTHS[Number(month) - 1] ?? "";
  return long ? `${m} ${Number(day)}, ${year}` : `${m} ${year}`;
}

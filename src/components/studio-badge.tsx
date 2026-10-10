// "Made by SL Studio" footer badge for product sites.
//
// Self-contained on purpose: no imports, no Tailwind, no client JS. Copy this file as-is into
// any product (React/Next.js) and render <StudioBadge productId="your-id" /> in its footer.
// See docs/STUDIO_BADGE.md for the plain-HTML version and placement rules.

const STUDIO_URL = "https://sl-studio.dev";

export function StudioBadge({
  productId,
  lang = "en",
  tone = "light",
}: {
  // The product's id in the studio directory; the badge links to sl-studio.dev/p/<id>.
  productId: string;
  lang?: "en" | "ko";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <a
      href={`${STUDIO_URL}/p/${encodeURIComponent(productId)}`}
      title="SL Studio: small tools, one job each"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px 6px 6px",
        borderRadius: 999,
        border: `1px solid ${dark ? "rgba(255,253,248,0.25)" : "#e8dcc6"}`,
        background: dark ? "transparent" : "#fffdf8",
        color: dark ? "#fffdf8" : "#3a2e26",
        font: "500 12px/1 ui-sans-serif, system-ui, -apple-system, sans-serif",
        textDecoration: "none",
      }}
    >
      <span
        aria-hidden
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          borderRadius: 999,
          background: dark ? "#fffdf8" : "#3a2e26",
          color: dark ? "#3a2e26" : "#fffdf8",
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: 0.3,
        }}
      >
        SL
      </span>
      {lang === "ko" ? "SL Studio에서 만들었어요" : "Made by SL Studio"}
    </a>
  );
}

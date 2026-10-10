// "Made by SL Studio" footer badge for product sites.
//
// Self-contained on purpose: no imports, no Tailwind, no client JS. Copy this file as-is into
// any product (React/Next.js) and render <StudioBadge productId="your-id" /> in its footer.
// See docs/STUDIO_BADGE.md for the plain-HTML version and placement rules.

const STUDIO_URL = "https://sl-studio.dev";

export function StudioBadge({
  productId,
  tone = "light",
}: {
  // The product's id in the studio directory; the badge links to sl-studio.dev/p/<id>.
  productId: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <a
      href={`${STUDIO_URL}/p/${encodeURIComponent(productId)}`}
      title="SL Studio"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 10px 5px 5px",
        borderRadius: 7,
        border: `1px solid ${dark ? "rgba(255,255,255,0.16)" : "#e4e4e7"}`,
        background: dark ? "transparent" : "#ffffff",
        color: dark ? "#ededef" : "#18181b",
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
          width: 18,
          height: 18,
          borderRadius: 5,
          background: dark ? "#ededef" : "#0a0a0b",
          color: dark ? "#0a0a0b" : "#ffffff",
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: 0.3,
        }}
      >
        SL
      </span>
      Made by SL Studio
    </a>
  );
}

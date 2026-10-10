# Studio badge: "Made by SL Studio"

Every product SL Studio ships includes a small badge in its footer that links back to the
product's page on the studio site, `https://sl-studio.dev/p/<id>`. That page lists the
product's name, description, category, language and launch date, links out to the product,
and ties it to the rest of the studio. Each product makes the hub more credible, and the hub
vouches for each product.

## Rules

- Put it in the product's site-wide footer, so it shows on every page.
- `<id>` is the product's id in the studio directory (the `id` field in Smith's
  `smith_index.json`, e.g. `ca-minwage-ko`). The link only resolves once the product is
  `status: "live"` with a `url` set; until then `/p/<id>` returns 404.
- Use a plain followed link. No `rel="nofollow"`, no tracking query string.
- The label is always English ("Made by SL Studio"), on every product.
- Don't restyle it per product. The badge looks the same everywhere so people learn to
  recognize it. `tone="dark"` is the one allowed variant, for dark footers.

## React / Next.js

Copy `src/components/studio-badge.tsx` from this repo into the product as-is. It has no
imports and uses inline styles, so it works with or without Tailwind and needs no client JS.

```tsx
import { StudioBadge } from "@/components/studio-badge";

export function Footer() {
  return (
    <footer>
      {/* ...product footer content... */}
      <StudioBadge productId="ca-minwage-ko" />
    </footer>
  );
}
```

Props: `productId` (required), `tone` (`"light"` default,
or `"dark"`).

## Plain HTML

For products that aren't React, paste this and replace `YOUR-ID`.

```html
<a href="https://sl-studio.dev/p/YOUR-ID"
   title="SL Studio: small tools, one job each"
   style="display:inline-flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;border-radius:999px;border:1px solid #e8dcc6;background:#fffdf8;color:#3a2e26;font:500 12px/1 ui-sans-serif,system-ui,-apple-system,sans-serif;text-decoration:none">
  <span aria-hidden="true"
        style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:999px;background:#3a2e26;color:#fffdf8;font-size:8px;font-weight:700;letter-spacing:.3px">SL</span>
  Made by SL Studio
</a>
```

## Checking it

After launch, open `https://sl-studio.dev/p/<id>` and confirm it shows the product (not a
404), then click the badge on the product site and confirm it lands there.

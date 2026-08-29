# Mobile install flow — briefing for marketing/website work

You're reading this because you're working on Roun's promotional website
(`sl-studio.dev/roun`). This documents a fix just shipped on the app side —
`roun.sl-studio.dev` — that the website's CTA needs to route through
correctly.

## Decision: no separate official domain

We looked at buying a dedicated domain for the app (`roun.page`,
`getroun.com`, `roun-journal-album.app`, etc.) so the URL wouldn't look like
a Vercel subdomain. **Decided against it — `roun.sl-studio.dev` stays the
permanent app URL.** Don't reference or imply any other domain.

## What's new on the app side: `/get-app`

`roun.sl-studio.dev/get-app` is a new public page (no login required) that
detects the visitor's platform and shows the right install instructions:

- **iPhone (Safari)**: step-by-step "Share → Add to Home Screen" walkthrough.
  Roun installs as a real PWA — home screen icon, opens full-screen, no
  Safari chrome.
- **Android (Chrome)**: if the browser fires the native install prompt, a
  one-tap "Install Roun" button; otherwise a fallback "⋮ menu → Add to Home
  screen" walkthrough.
- **Desktop/other**: a simple "open this on your phone" message.

Native App Store / Google Play links are **not live yet** — both store
listings are still pending review. Any "Download" surface on the site should
say **"Coming soon"** for native App Store/Play Store, same as the
`downloads.links` entries already do in `src/lib/apps.ts` (`ios`/`android`
both `href: null` — leave those as-is).

## The fix you need to make: point the CTA at `/get-app` on mobile

**File: `src/lib/apps.ts`, line 362.**

Right now:

```ts
cta: { label: "Start free trial", href: "https://roun.sl-studio.dev/settings" },
```

This sends every visitor — including someone on their phone — straight to
`/settings`, which for a logged-out visitor just becomes the sign-up/login
screen. On mobile, that skips the install guide entirely: no one ever sees
`/get-app`, so no one ever gets prompted to add Roun to their home screen.
They just get a normal webpage sign-up.

**What it should do instead:** on mobile (iOS/Android user agent), the CTA
should send visitors to `https://roun.sl-studio.dev/get-app` first, so they
install the PWA before signing up. On desktop, `/settings` is still the
right destination (no install to walk through). Implement this as a
client-side UA check on the button's click handler (or write the check where
you render `cta.href`, whichever fits this codebase's existing patterns
better) — don't hardcode two separate marketing pages for it.

## Verified working (app side, already deployed)

- `/get-app` is now public (was previously falling through to the
  login-redirect middleware — fixed).
- The hero app icon on that page now loads reliably (was intermittently
  blank due to `next/image`'s default lazy loading on an above-the-fold
  image — fixed with `priority`).

Both fixes are live on `roun.sl-studio.dev` as of this writing — safe to
test the full flow end-to-end once you make the CTA change above.

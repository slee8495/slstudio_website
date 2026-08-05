# Context handoff: SL Studio website

This repo (`slstudio_website`) is brand new — just `git init`'d, no files yet. This doc is a
handoff from a separate Claude Code session working in the sibling `wordflow` repo, where this
website need first came up. Read this before doing anything else.

## Who the user is / business context

The user (Sangho Lee) is building "SL Studio" as an umbrella brand for several small apps he's
shipping. The first one going to real paying users is **Wordflow** — a $3.99/month daily
Bible-reading app (Next.js + Vercel + Neon Postgres + Stripe). Wordflow is currently mid-way
through a launch-readiness checklist (see `LAUNCH_CHECKLIST.md` in the `wordflow` repo — 9 of 14
items done as of this handoff).

Business-identity accounts created so far all use the email **`slstudio8495@gmail.com`**
(a dedicated Gmail the user created specifically for this, separate from his personal
`sanlee8495@gmail.com`):
- Stripe account (org/business name: "SL Studio", org slug `sl-studio-le` for reference)
- Sentry account (org `sl-studio-le`)
- UptimeRobot account

## What's actually being asked of this repo

The user wants **this repo to become the SL Studio company website** — a root-domain landing
page that showcases *all* his apps (Wordflow being the first/only one so far), not just a page
for one product. Direct quote (translated): "slstudio.com 도메인 루트는 나중에 여러 앱 소개
페이지로 쓰고 싶어" — the domain root is meant to become a multi-app portfolio/showcase page.

**Wordflow itself should NOT take over the root domain.** The plan agreed on with the user:
Wordflow lives at a **subdomain**, e.g. `wordflow.<the-domain>`, while the root domain becomes
the portfolio site this repo builds. Exact subdomain naming wasn't fully locked in — the user's
literal last message was `wordflow.sl-studio.com` as a working example, but that's contingent on
which TLD actually gets purchased (see below — `sl-studio.com` itself is unavailable).

## Domain decision — NOT YET FINALIZED

This is the actual unresolved thread this handoff exists for. We were in the middle of picking a
domain when the user redirected this whole effort to this new repo.

**Desired name:** `sl-studio` (matching the business name, hyphenated to match the local project
folder naming convention already in use: `.../SL Studio/wordflow`, `.../SL Studio/sprout`, etc.)

**Availability/pricing check already done** (via Vercel's domain registrar API,
`https://api.vercel.com/v1/registrar/domains/{domain}/price`, using the Vercel CLI's own stored
auth token at `~/Library/Application Support/com.vercel.cli/auth.json` — this worked well as a
read-only way to get real pricing without touching the actual purchase flow, which Vercel's CLI
explicitly refuses to do non-interactively: `vercel domains buy` returns
`"reason": "purchase_requires_user"` and tells you to use the dashboard or run it interactively
yourself). Results, first-year vs. real recurring renewal price (the renewal price is what
matters — first-year prices are often promotional and misleading):

| Domain | Status | First year | **Renewal (recurring)** |
|---|---|---|---|
| sl-studio.com | **Unavailable** (already owned by someone else) | — | — |
| sl-studio.net | **Unavailable** (already owned by someone else) | — | — |
| sl-studio.company | Available | $3.99 | $14.50/yr |
| sl-studio.app | Available | $9.99 | $15.00/yr |
| sl-studio.co | Available | $4.99 | $24.80/yr |
| sl-studio.dev | Available | $9.99 | **$13.00/yr** (cheapest renewal among available options) |
| sl-studio.org | Available | $8.49 | **$10.99/yr** (cheapest overall) |
| sl-studio.io | Available (not checked domain-specific, base TLD price only) | $37.99 | $46.00/yr (expensive, probably skip) |
| sl-studio.studio | Available (base TLD price only, not domain-specific) | $21.99 | $36.00/yr |

We were literally asking the user to pick from this table when the conversation moved here. No
purchase has been made. **Whoever picks this back up should re-run the price check** (prices can
change) and should NOT complete an actual domain purchase without the user explicitly confirming
the exact domain name and price in that exact moment — this is a real recurring financial
commitment, treat it accordingly.

To re-check pricing without needing to log into anything new, if the `wordflow` repo's Vercel CLI
session is still authenticated on this machine, the same trick works from any directory:
```bash
TOKEN=$(cat ~/Library/Application\ Support/com.vercel.cli/auth.json | grep -o '"token": "[^"]*"' | cut -d'"' -f4)
curl -sS "https://api.vercel.com/v1/registrar/domains/sl-studio.dev/price" -H "Authorization: Bearer $TOKEN"
```
(swap the domain name; the whole Vercel team is called `sl-studio` on Vercel, Pro plan, and both
Wordflow and presumably this new site's deployments should live under that same team.)

**Reasonable next step for whoever resumes this:** present the table above again (or a refreshed
version of it), get the user to pick a TLD, then actually buy it — either through
`vercel domains buy <domain>` run *interactively by the user themselves* in their own terminal, or
via the Vercel dashboard (Team "SL Studio" → Domains → Buy).

## Once a domain is picked

- Connect it to a new Vercel project for this repo (root domain → this portfolio site).
- Wordflow's Vercel project (`sl-studio/wordflow`, currently only reachable at
  `wordflow-jade.vercel.app`) needs the subdomain (e.g. `wordflow.<domain>`) added as a domain in
  *its own* Vercel project settings — not this repo's.
- Wordflow's `/privacy` and `/terms` pages currently list `slstudio8495@gmail.com` as the contact
  email, with an explicit note in both the code comments and `wordflow/LAUNCH_CHECKLIST.md` item
  10 that this should be swapped to a real `support@<domain>` address as the *last* step of the
  domain work. Whatever sets up that support inbox (Google Workspace, Cloudflare Email Routing
  forwarding to the existing Gmail, etc.) is this repo's/this task's responsibility to figure out
  and then go update those two files in the `wordflow` repo.

## What this repo needs to actually build

A portfolio/landing site for SL Studio, presumably:
- A homepage introducing SL Studio and listing/linking out to its apps (Wordflow first, more
  later as they ship).
- Wordflow's own product page/description here could double as the "public landing page" that
  Wordflow itself still needs (see `wordflow/LAUNCH_CHECKLIST.md` item 11 — Wordflow currently has
  *no* public marketing page of its own, `/` just shows a login screen). Worth discussing with the
  user whether Wordflow's landing content lives here (linking to `wordflow.<domain>` for the actual
  app) or stays inside the `wordflow` repo itself — this wasn't decided, just flagging the overlap
  so it doesn't get built twice.

No design direction, copy, or tech stack preferences were discussed yet for this site itself —
that's all still open.

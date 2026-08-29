# Album Library — briefing for marketing/website work

You're reading this because you're working on Roun's promotional website. This
explains a big feature that just got built (`feature/album-library` branch,
not yet in production) so you can fold it into the site's copy, screenshots,
and pitch. It is **not live yet** — don't reference a public URL for it, and
don't imply it's shipped in App Store/Play Store copy until told it's out.

## The one-line pitch

**Roun turns your family journal into an actual photobook — one for each kid
and pet, with real page layouts, that you can flip through in the app or
download as a PDF.**

## Why this matters for the pitch (read this before writing copy)

Roun's existing pitch (see `APP_STORE_LISTING.md` / `PROMO_VIDEO_SCRIPT.md`)
is: *a camera roll can hold the photo, it can't hold the memory* — Roun is
where you keep the moments you'd actually want to hand back to your kid
someday. Until now, that promise lived entirely inside a feed — nicely
organized, but still a feed you scroll.

**The Album Library is that promise made literal.** It's the payoff: the
scattered dated entries you've been writing all along get reassembled,
automatically, into something that looks and feels like a real printed baby
book — asymmetric photo collages, a proper title page for big milestones, a
serif "keepsake" typeface, page-turning. Then you can actually download it as
a PDF. This is the single most demo-able, screenshot-able thing in the app
right now — it's the feature that makes someone go "oh, THAT'S what this is
for" instead of filing Roun under "another journaling app."

Good marketing angles:
- "Every entry you've ever written, already laid out as a photobook — no work."
- "You didn't build this album. Roun did, from what you already wrote."
- "One tap, one PDF: your kid's whole story, ready to print or send to grandma."
- Contrast beat: a camera roll is a pile; an Album is a book with a spine.

## What it actually does (feature breakdown)

### 1. Library home (`/library`)
A new top-level tab (**Albums**), sitting right next to Milestones in the nav.
Shows one book-style card per kid/pet — cover art, name, photo count, date
range ("Apr 2026 – Aug 2026"). Visually closest reference: an Apple
Books/Kindle library shelf, not a settings list.

### 2. Custom covers
Each kid/pet gets a cover made of **one emoji (any animal, not just their
default icon) on a pastel background color**, picked from a small swatch set
that matches the app's existing color-theme palette (Sage, Dusty Blue, Dusty
Rose, Lavender, Terracotta). Changeable anytime from Settings. No stock art,
no AI-generated illustration — deliberately simple and fast, but still
personal and cute in screenshots.

### 3. The album itself (`/library/[childId]`)
This is the part worth screenshotting most:
- **Photo entries only** — text-only or voice/video-only entries don't
  clutter the album; it's specifically a *photo* book.
- **Grouped by date into real page layouts**, not a plain grid. A fixed set
  of collage templates (1 photo full-bleed, 2 photos side-by-side, 3 in an
  asymmetric big+small arrangement, 4 in a mosaic, 5 with one large center
  photo and four smaller ones around it) — the same kind of templates real
  photobook apps use, so every page looks intentional.
- **Milestone title pages** — any day with a tracked milestone (first steps,
  first tooth, "first trip to the beach," etc.) gets its own dedicated page:
  big serif typography for the milestone name, the date, and a few accent
  photos — visually distinct from the regular photo-collage pages, like a
  chapter break.
- **A dedicated serif display typeface** (Playfair Display) used only inside
  the album/PDF — everyday Roun UI keeps its friendly rounded font, but the
  album leans into a "keepsake" feel on purpose.
- **Two ways to browse**: scroll straight down through every page, or
  page-turn — swipe/click horizontally like an actual book.
- **Portrait or landscape** page orientation, switchable anytime.
- **Jump to any date instantly** via a built-in calendar — no endless
  scrolling to find "that one day in June."
- **Sort oldest→newest (default) or newest→oldest.**

### 4. PDF export
A real "Download PDF" button generates the entire album — cover page, every
collage page, every milestone title page — as an actual PDF file, ready to
print or email. This is generated fresh from the current photos each time
(not a static export), respects whatever sort order/orientation you had
selected, and has been tested end-to-end on an album with 100+ photos.

### 5. One entry, many kids/pets
Not album-specific, but the piece of plumbing that makes it all work: a
single journal entry can now be tagged to **more than one kid or pet at
once** (previously: one entry, one kid, max). This shows up everywhere, not
just in albums — Feed, Milestones, and Journal all show every tagged
kid/pet on a shared-entry now, as separate badges. Good secondary beat if you
need one: *"one photo of the dog and the baby together, and it shows up in
both of their stories — not just one."*

## Suggested shot list (once this ships and you can capture real screens)

1. `/library` — the book-shelf grid with 2+ kid/pet covers, different pastel
   colors and animal emoji, so it doesn't look like a template.
2. `/library/[childId]` scrolled to a normal photo-collage page (pick a
   3-photo or 5-photo page — those are the most visually interesting
   templates).
3. `/library/[childId]` on a milestone title page — big serif type is the
   money shot here.
4. The "Download PDF" button / the resulting PDF itself opened in a viewer.
5. Optional: the cover-picker UI in Settings (emoji + color swatches) if you
   want a "make it yours" beat.

## Copy hooks (English + Korean, matching existing brand voice)

**English**
- "Your family journal, already laid out as a photobook."
- "Not a camera roll. A book."
- "Every first, every day — turned into pages you'd actually want to print."

**Korean**
- "쓰기만 했을 뿐인데, 어느새 우리 아이만의 앨범이 되어 있어요."
- "카메라롤이 아니라, 진짜 책이에요."
- "쌓아둔 기록이 그대로 넘겨보는 앨범으로."

## Status / caveats for whoever's using this

- Built on git branch `feature/album-library`, verified against a real
  family's data on a Vercel preview deployment — not yet merged/deployed to
  production. Confirm with the user whether it's live before publishing
  anything that implies it's available today.
- Multi-tagging (one entry → multiple kids/pets) is a real, permanent app
  change, not a marketing-only claim — safe to describe as a current feature
  once this branch ships.
- The existing demo account/photos setup described in `PROMO_VIDEO_SCRIPT.md`
  (`slstudio8495@gmail.com`, real photos of "Ted") is the natural account to
  reuse for capturing Album screenshots — same privacy caveats apply (real
  child's photos used knowingly in public marketing material; app-facing name
  is a pseudonym).

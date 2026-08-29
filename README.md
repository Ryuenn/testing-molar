# MOLAR AI — molarai.studio

Marketing site for MOLAR AI: the world's first automated patient education platform for dental
practices. Built greenfield on Astro, deployed to Netlify as a fully static site.

**The site's job is to get a practice to subscribe.** Everything below the hero is arranged around
that: proof, the asset argument, the process, the price, and only then the free resources.

---

## Local development

Requires **Node 20.11+** (`.nvmrc` pins the major).

```bash
npm install
npm run dev      # http://localhost:4321
```

| Script               | What it does                                                          |
| -------------------- | --------------------------------------------------------------------- |
| `npm run dev`        | Dev server with HMR                                                    |
| `npm run build`      | Type-checks (`astro check`) then builds to `dist/`                     |
| `npm run build:fast` | Build without the type-check pass                                      |
| `npm run preview`    | Serve `dist/` on the LAN — use this for real-device checks             |
| `npm run check`      | Type-check only                                                        |

`npm run preview -- --host` prints a LAN address, which is the only honest way to test the hero
video on an actual phone.

---

## Where the assets go

Three folders, three different jobs.

### `public/videos/` — hero footage

`hero.webm`, `hero.mp4`, `hero-mobile.mp4`. Filenames are referenced literally in
`src/components/sections/Hero.astro` and cached immutable by `netlify.toml`, so **keep the names**
— to ship new creative, either accept the cache lag or rename the file and update the component.

Encoding commands and the creative brief are in [`public/videos/README.md`](public/videos/README.md).

Until the real files land the hero falls back to the poster image and renders correctly; the three
`<source>` elements will 404 in the network panel, and that is the only expected failed request.

### `public/images/` — poster, social cards, icons

`hero-poster.jpg` (required — without it there is a black flash before the first decoded frame),
`og/*.png` social cards, and the favicon/manifest icons. See
[`public/images/README.md`](public/images/README.md) for the full table.

Images that should be **optimised by Astro** go in `src/assets/` instead, not here — that is what
generates the responsive AVIF/WebP `srcset`. `public/` is only for files that need a fixed URL.

### `public/pdfs/` — downloadable resources

One PDF per resource-hub entry, served with `Content-Disposition: attachment` and
`X-Robots-Tag: noindex`.

Every media file currently committed is a generated placeholder in the right palette and the right
dimensions. Swapping in the real artwork at the same filename and size needs no code change.

---

## Adding a new PDF resource

1. Drop the file in `public/pdfs/` as `molar-<slug>.pdf`.
2. Add `src/content/resources/<slug>.md`:

   ```markdown
   ---
   title: Clear Aligner Patient FAQ
   blurb: One line on what is inside. Shown on the card and used as the meta description.
   category: Treatment Guides # must match the enum in src/data/resources.ts
   file: /pdfs/molar-clear-aligner-patient-faq.pdf
   pages: 16
   updated: 2026-03-02
   featured: false # pins it to the front of the hub
   order: 70 # lower sorts first
   ---

   Optional longer copy, rendered on the resource's own page.
   ```

3. Optionally add `public/images/og/resource-<slug>.png` (1200×630) and reference it as `ogImage:`.
   Without one the page falls back to the hub card.

That is the whole process. The home-page grid, `/resources/` with its category filter, the
resource page, the download page, the sitemap and the structured data are all generated from the
collection. `category` is validated against the enum, so a typo fails the build instead of
producing a filter nobody can click.

The hub is built to scale past twenty entries — filtering is attribute-based and the home page
shows the first six with a link through to the rest.

---

## Structure

```
src/
├── components/
│   ├── Nav.astro            PLACEHOLDER — design supplied separately
│   ├── Seo.astro            canonical, OG, Twitter, JSON-LD
│   ├── CaseStudy.astro      repeatable — more case studies are coming
│   ├── ResourceCard.astro
│   ├── ResourceGate.astro   single-field email gate
│   ├── WorldMap.astro       equirectangular graticule, projected at build time
│   ├── sections/            one file per page section, in page order
│   └── ui/
├── content/
│   ├── resources/           markdown, one per PDF
│   └── case-studies/
├── data/                    copy and config: pricing, FAQ, comparison, promo code
├── layouts/BaseLayout.astro
├── pages/
├── scripts/motion.ts        Lenis + GSAP, the only always-on client script
└── styles/global.css        design tokens, type scale, motion primitives
```

### Content lives in `src/data/`, not in components

Pricing tiers, FAQ entries, the comparison table and the promo code are all data. The promo code
in particular is a variable (`PROMO` in `src/data/site.ts`) — change it there, or blank
`PROMO.code` out, and the pricing card updates or the promo line disappears.

The FAQ accordion and its `FAQPage` structured data are generated from the same array, so the
markup and the schema cannot drift.

### The nav is a placeholder

`src/components/Nav.astro` has the finished prop, slot and DOM contract with working default
markup. Drop the real design into it and nothing else changes. The contract the rest of the site
depends on is documented at the top of the file.

---

## Motion

Lenis for smooth scroll, GSAP ScrollTrigger for section reveals, CSS for the ticker marquee. One
orchestrated staggered sequence in the hero; everything below it is a quiet fade-and-rise.

`prefers-reduced-motion: reduce` is honoured with no exceptions — `src/scripts/motion.ts` returns
before it imports GSAP or Lenis at all, so reduced-motion visitors get instant reveals *and* a
smaller payload. Flipping the OS setting mid-session tears the animations down live.

Reveal targets are only hidden once a pre-paint bootstrap in `<head>` confirms both that JS is
running and that motion is allowed. Nothing on the page is ever hidden by a class that nothing
will come along to reveal.

---

## Deployment

Netlify, from `netlify.toml`. Build `npm run build`, publish `dist/`.

`netlify.toml` also carries:

- **Long cache headers** on `public/` media and `/_astro/*` (a year, immutable). Static media never
  serves `max-age=0, must-revalidate`.
- **Security headers**: HSTS with `includeSubDomains` and `preload`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, and a CSP locked to `'self'` for every fetch directive —
  there are no third-party origins. `'unsafe-inline'` is present for `script-src` only because of
  the JSON-LD blocks and the pre-paint bootstrap; all executable code is bundled and same-origin.
- **Apex host redirect**, so canonicals, sitemap entries and served URLs agree.
- The Lighthouse plugin, deliberately threshold-free — it should surface regressions in the deploy
  log, not block a release.

### Forms

The email gate posts to Netlify Forms (`resource-download`). Spam protection is layered: a
honeypot field, a client-side time trap that rejects sub-two-second submissions, and Netlify's own
filtering. None of them make a real visitor solve a puzzle. Submissions land in the Netlify UI —
wire the notification or the ESP webhook there.

---

## Before shipping

Run the site at **375 / 768 / 1440** against `npm run preview` and confirm:

- [ ] No console errors, no horizontal overflow, no failed requests other than the hero video
      sources until the real files land
- [ ] Visible keyboard focus on every interactive element, including the comparison scroll region
- [ ] The tooth in the hero footage is not clipped by the portrait cover-crop at 375px
- [ ] `dist/404.html` exists at the publish root
- [ ] Sitemap URLs match the canonical tags exactly — protocol, host, trailing slash
- [ ] Each page's `og:image` is its own, not the home-page card (the `ogImage` prop is required by
      the type, so a missing one is a build error rather than a silent default)

Targets: 95+ mobile Lighthouse performance; 100 on Accessibility, Best Practices and SEO.

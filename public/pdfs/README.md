# PDFs

Downloadable resources for the resource hub. Netlify serves this directory with
`Content-Disposition: attachment` and `X-Robots-Tag: noindex` — the files download rather than
open, and search engines index the resource page instead of the raw PDF.

Everything here today is a generated placeholder. Replacing one with the real document at the
**same filename** requires no code change.

## Adding a new resource

1. Drop the PDF here. Name it `molar-<slug>.pdf`, lowercase, hyphenated.
2. Create `src/content/resources/<slug>.md`:

   ```markdown
   ---
   title: Clear Aligner Patient FAQ
   blurb: One line on what is inside. Shown on the card and used as the meta description.
   category: Treatment Guides # Patient Education | Practice Growth | Social Media | Treatment Guides | Operations
   file: /pdfs/molar-clear-aligner-patient-faq.pdf
   pages: 16
   updated: 2026-03-02
   featured: false # pins it to the front of the hub
   order: 70 # lower sorts first
   ---

   Optional longer body copy, rendered on the resource's own page.
   ```

3. Optionally add a social card at `public/images/og/resource-<slug>.png` (1200×630). Without one,
   the page falls back to `og/resources.png`.

That is the whole process. The hub grid, the category filter, the resource page, the sitemap and
the structured data are all generated from the collection — see `src/content.config.ts`.

`category` is validated against the enum in that file, so a typo fails the build rather than
producing a filter nobody can click.

## Keep in mind

- The filename is the cache key. `netlify.toml` caches `/pdfs/*` for 30 days, so re-uploading a
  changed document under the same name can serve stale for up to a month. Bump the name instead.
- Keep files under ~10 MB. These are lead magnets, not print masters.
- Strip document metadata that names internal authors before publishing.

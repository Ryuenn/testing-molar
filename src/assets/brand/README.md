# Brand assets

| File             | What it is                                                                       |
| ---------------- | -------------------------------------------------------------------------------- |
| `logo-molar.png` | **The master.** Crystalline tooth on transparency, 1174×1340. Edit or replace this one. |
| `logo-mark.png`  | Generated. The master with its transparent margin trimmed, for in-page use.      |
| `arrow.png`      | Hand-placed. Crystal arrow on transparency, 1672×941, matching the mark's material. Used by the hero's Subscribe → Connect → Stay flow. Not part of any generated pipeline — `npm run brand` neither reads nor writes it. |

Everything else — favicons, the `.ico`, the Apple touch icon, the manifest icons and every Open
Graph card — is derived from the master. Nothing is hand-edited.

Files here go through Astro's `<Image>`, which is why they belong in `src/assets/` rather than
`public/`. `arrow.png` is 970 KiB on disk and ships as roughly 1 KiB of WebP; dropped into
`public/` it would have shipped whole.

```bash
npm run brand     # icons + social cards
npm run icons     # favicons, .ico, touch icon, manifest icons only
npm run og        # social cards only
```

## What gets written

`npm run icons` (`scripts/generate-icons.mjs`, then `scripts/build-ico.mjs`):

| Output                                   | Purpose                                        |
| ---------------------------------------- | ---------------------------------------------- |
| `src/assets/brand/logo-mark.png`         | Trimmed mark for Nav and Footer via `<Image>`   |
| `public/favicon.ico`                     | 16/32/48 in one file, PNG-compressed entries    |
| `public/favicon-{16,32,48,96}.png`       | Modern tab icons                                |
| `public/apple-touch-icon.png`            | 180×180, opaque — iOS composites on black       |
| `public/images/logo-molar.png`           | 512×512, Organization schema + manifest         |
| `public/images/logo-molar-192.png`       | 192×192 manifest icon                           |
| `public/images/logo-molar-maskable.png`  | 512×512 with safe-zone padding, `purpose: maskable` |

`npm run og` (`scripts/generate-og.mjs`) writes `public/images/og/` — three page cards plus one
per entry in `src/content/resources/`, titles read straight from the frontmatter.

## Notes

- Small favicons get sharpening and a saturation nudge. Below ~64px the roots blur together and
  the circuit trace vanishes; without it, 16px is an indistinct blue smear.
- The 512px icons are palette-quantised. The mark is a narrow blue ramp over black, so 256 colours
  hold it without banding and the file drops from ~330 KiB to ~83.
- Social cards lay out their text as SVG rasterised by sharp, using **system** fonts. Run this on a
  machine that has Space Grotesk and IBM Plex Mono installed, or the cards fall back to Segoe UI
  and Consolas. Output is committed, so CI never runs it.
- Card titles wrap on an estimated advance width (0.55em), not measured metrics. If a future title
  overflows, shorten it or adjust the size thresholds in `card()`.

## Replacing the logo

Drop the new artwork in as `logo-molar.png` and run `npm run brand`. Nothing else needs editing —
Nav, Footer, every icon, the manifest and all twelve social cards follow.

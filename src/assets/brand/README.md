# Brand assets

**The brand runs on ONE mark: the crystalline tooth.** The wordmark is set in type
wherever it appears — see "The wordmark" below.

| File                     | What it is                                                                       |
| ------------------------ | -------------------------------------------------------------------------------- |
| `logo-molar.png`         | **THE MASTER.** `MolarTooth_FinalReal.png`, as delivered: the crystalline tooth with its circuit trace, on transparency, 2380×2380. Replace this one and run `npm run brand`. Everything below comes off it. |
| `logo-mark.png`          | Generated. The master with its transparent margin trimmed, for in-page use — **Nav**, **Footer** and the hero's CTA tile. The trim matters: the master carries ~8% empty margin on every side, and at 30px that is padding no CSS can see. |
| `page-banner-master.png` | **The inner-page banner master.** See below. |

Retired, and kept only so the history is legible:

| File                     | Why it is no longer used                                                          |
| ------------------------ | -------------------------------------------------------------------------------- |
| `logo-lockup-master.png` | The wordmark master — `MOLAR` over the strapline, 2172×724. |
| `logo-lockup.png`        | Was the **Footer** lockup. Dropped: the letterforms carried heavy compression artefacts (the `O` was speckled through) and it was soft at every size the footer drew it. The footer sets the wordmark in type now, beside `logo-mark.png`. |
| `logo-wordmark.png`      | Was the **Nav** wordmark. Dropped for the same reasons; the nav has set it in type for a while. |
| `logo-icon.png`          | Was briefly the icon master — the MOLAR tile, a chevron on a dark rounded square. The tooth is the mark the brand is known by, and it is the icon master again. |
| `page-banner-master.png` | **The inner-page banner master.** The undulating blue field, 2103×748, delivered art. Not shipped: `public/page_banner_r.png` is this file mirrored, and that is what every inner-page header screens over its lit ground. Re-flip it after replacing this one — the wave has to sit opposite the copy or the mask hides it. |
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
| `src/assets/brand/logo-mark.png`         | Trimmed tooth for in-page use. Written only when the run is against `logo-molar.png` — see `BRAND_ICON_MASTER` |
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

**One file, one command.** Drop the new artwork in as `logo-molar.png` and run:

```bash
npm run brand      # icons + og
```

That regenerates every favicon, the `.ico`, the Apple touch icon, the three manifest icons, the
trimmed in-page `logo-mark.png`, and all sixteen Open Graph cards. Nothing else needs editing —
the Nav, the Footer and the hero CTA all render `logo-mark.png`, which the icons run rewrites.

Requirements for the master: square-ish, on **transparency**, and with the artwork centred. It is
taken whole and trimmed; no ground is added except where a format forbids alpha (the touch icon and
the maskable manifest icon sit on `ink-950`).

Check the 16px favicon by eye afterwards. The tooth's two roots blur together at that size and the
circuit trace disappears; `generate-icons.mjs` sharpens and lifts saturation under 64px to buy the
silhouette back, and a very different mark may need those numbers adjusted.

**The wordmark** is not artwork any more — it is text. The Nav sets `MOLAR TV` and the Footer sets
`MOLAR`, both in Space Grotesk, both live. Changing how the name is set means editing those two
components, not re-cutting a raster. The old lockup crops and the ffmpeg recipe that produced them
are gone with them.

Trim rather than pad: `<Image height>` scales off the file's own box, so baked-in margin shows up
as a logo that renders smaller than every other one on its row.

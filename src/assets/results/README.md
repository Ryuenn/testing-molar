# Results assets

`patricia-before.webp` and `patricia-after.webp` are the two frames in the
exhibit on `/results/`, imported by `src/components/sections/GrowthStory.astro`.

`inbound/` holds the ten DM screenshots published on the wall lower down that
page, imported by `src/components/sections/InboundWall.astro`.

## What is published and what is not

`source/` holds every untouched original. `inbound/` holds the subset that is
actually on the page. The split is the point:

- **`inbound/` is published.** Ten DM captures, shown as images. Each one's
  verbatim transcription lives in `src/data/results.ts` and is used as the
  image's `alt` — an image of a sentence says nothing to a screen reader, so
  that transcription is the only version of the message some visitors get. It
  has to stay exact.
- **`source/` is not.** Nothing under `src/assets/` is emitted unless a
  component imports it, and nothing imports `source/`. It stays in the repo as
  the record.

These files were originally in `public/Testimonials/`. Everything under
`public/` is copied into `dist/` verbatim and served, so all of them were
publicly fetchable at guessable URLs whether or not a page linked them —
including `img_5505.png` and the rest that were never meant to ship. Moving them
here made publication a decision rather than a default. If another one is ever
needed on a page, copy it into `inbound/` and reference it from the data;
do not move the folder back into `public/`.

## Redaction

The published captures are redacted, but not uniformly — some still show a
sender's avatar or name a practice (`lakefront-smiles`, `austria-orthodontist`,
`detroit-group`). Everyone in them wrote in privately for advice, not to be
quoted by name, so the page identifies nobody beyond a role and a city. Check
any new capture against that standard before adding it, and re-crop rather than
relying on the page not to draw attention to a corner of the image.

## Re-cutting the two frames

Both crops are square, and their pixel widths are deliberately different — the
after screenshot was captured at a lower browser zoom, so it is cropped in until
its profile header renders at the same size as the before's. That match is the
thing to check first if either is ever replaced.

```js
const sharp = require('sharp');

sharp('src/assets/results/source/before drpatricia sharp.png')
  .extract({ left: 0, top: 0, width: 1293, height: 1293 })
  .webp({ quality: 90 })
  .toFile('src/assets/results/patricia-before.webp');

sharp('src/assets/results/source/dr-patricia-10k.png')
  .extract({ left: 200, top: 0, width: 760, height: 760 })
  .webp({ quality: 90 })
  .toFile('src/assets/results/patricia-after.webp'); // superseded — see below
```

Re-cut 2026-09 for the 204 posts / 10.7K followers capture. The source PNG for
THIS cut is 1266x887 — a different resolution from whatever produced the crop
above, so its numbers do not transfer to a future re-cut any more than the
original ones transferred to this one. Treat `left`/`top`/`width`/`height` as
specific to the exact screenshot they were measured against: re-derive them
(crop, render, compare avatar size to the before frame, adjust) rather than
reusing either set blind.

```js
sharp('src/assets/results/source/drpatricia_107.png') // the 2026-09 capture
  .extract({ left: 350, top: 15, width: 600, height: 600 })
  .webp({ quality: 90 })
  .toFile('src/assets/results/patricia-after.webp');
```

The transcriptions of the DM screenshots live in `src/data/results.ts`.

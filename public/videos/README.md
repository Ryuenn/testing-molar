# Videos

Three things live here, and the folder is the source of truth for only one of them.

| Path                          | Used for                        | Filenames                                        |
| ----------------------------- | ------------------------------- | ------------------------------------------------ |
| `Hero_video.mp4`              | The hero background, all widths | **Fixed** — `Hero.astro` references it literally  |
| `MolarExampleVideos/`         | The reel below the hero         | **Free** — the folder is read at build time       |
| `molar-testimonial-0721.mp4`  | The film card and its modal     | **Fixed** — `AssetFilm.astro` references it literally |

`netlify.toml` caches all of `/videos/*` as immutable for a year, so a replacement that keeps its
name will not reach anyone already carrying the old one. Bust it by renaming the file
(`Hero_video.mp4` → `Hero_video-v2.mp4`) rather than by overwriting in place.

The hero poster lives at `public/images/hero-poster.jpg` — not in this folder, because Netlify sets
`Content-Disposition` and range headers differently for `/videos/*`.

## The hero footage

Crystalline low-poly tooth with glowing blue circuit traces, floating in deep space over a wet
reflective floor. Deep navy-black with electric blue.

**The subject must sit centred and small in the frame.** The hero cover-crops to portrait on
phones — anything near the edges gets cut. `object-position: 50% 42%` biases the crop slightly
above centre so the tooth stays clear of the copy stack. Verify at 375px before replacing this
file.

The current cut still carries an AAC track. Nothing plays it — the element is `muted`, which is
also the only reason autoplay is permitted at all — but re-encoding with `-an` would shave a little
off the download.

### Encoding a replacement

```bash
# H.264 — faststart matters, or the video will not begin until fully buffered
ffmpeg -i master.mov -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p \
  -movflags +faststart -an Hero_video.mp4

# Poster — pull a frame where the tooth is lit
ffmpeg -i Hero_video.mp4 -ss 00:00:02 -frames:v 1 -q:v 3 ../images/hero-poster.jpg
```

### If you add more cuts

`Hero.astro` renders one `<source>`. To serve a lighter WebM or a portrait mobile cut, add them to
the `VIDEO` map there and list them ahead of the MP4 — the browser takes the first source it can
play, so the narrowest `media` query goes first:

```astro
<source src={VIDEO.mobile} type="video/mp4" media="(max-width: 767px)" />
<source src={VIDEO.webm} type="video/webm" />
<source src={VIDEO.mp4} type="video/mp4" />
```

## `MolarExampleVideos/` — the reel

The strip of clips that scrolls past under the hero. There is no list of these anywhere in the
source: `src/data/reel.ts` reads the folder during `astro build` and sorts alphabetically. **Drop
an `.mp4` in and it joins the reel on the next build; delete one and it leaves.** Spaces in
filenames are fine — they are percent-encoded on the way into the markup.

### Everything is cropped to 9:16

Every card is the same portrait shape and every clip is `object-fit: cover`ed into it. That is the
format the product makes, and one shape is what makes the strip read as a strip rather than as a
pile of assets.

It is also the only safe rule. **`ai_animation_new.mp4` is a 9:16 clip exported centred inside a
720×408 landscape frame — 69% of every frame in it is pillarbox.** An earlier version of the reel
sized each card from its file's own aspect ratio, and that handed this one export a card three
times the width of its neighbours with two thirds of it solid black. A fixed portrait card crops it
back to its picture with about three columns of black left over out of 276.

The consequence to know about: a genuinely landscape clip dropped in this folder will be centre-cropped
to a vertical slice, silently. If one ever needs to be here, re-cut it to 9:16 first — the reel has
no way to tell a real landscape frame from a pillarboxed one.

`ai_animation_new.mp4` is worth re-exporting rather than leaving cropped. It is being upscaled from
a 225px-wide window to fill a card, so it is the softest thing on the strip:

```bash
ffmpeg -i ai_animation_new.mp4 -vf "crop=225:408:248:0,scale=-2:1280" \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -an ai_animation_9x16.mp4
```

### Weight is the constraint

Every clip in this folder is downloaded and decoded at once, by every visitor who scrolls to the
reel. `src/components/sections/VideoReel.astro` does what it can — nothing is fetched until the
strip is within 400px of the viewport, and playback starts one clip at a time — but the total is
the total.

The nine clips here come to **39 MB**, which is far more than a landing page should spend. They are
delivery masters: 720×1280 and 405×720, 24–83 seconds, one of them 11 MB on its own. The reel
renders them at roughly 324px wide.

Re-encode before this goes anywhere near production traffic:

```bash
# ~1-2 MB per clip: half the pixels, a shorter cut, no audio track nobody can hear
for f in *.mp4; do
  ffmpeg -i "$f" -t 12 -vf "scale=-2:720" -c:v libx264 -crf 30 -preset slow \
    -pix_fmt yuv420p -movflags +faststart -an "web/$f"
done
```

`-movflags +faststart` is not optional here. `invisalign - first day hebrew master.mp4` is stored
with its `moov` atom last, so a browser has to pull all 11 MB of it before the first frame appears —
its card stays empty while every other clip is already running.

A WebM/AV1 alternate would halve it again, but the reel renders one `<source>` per clip; adding a
second means editing the template, not just the folder.

## `molar-testimonial-0721.mp4` — the film

The practice testimonial behind the card in `AssetFilm.astro`. Two things about this file are
baked into that component, and both are worth fixing at the source rather than in CSS.

### It is not faststart

`moov` sits at the tail, so a browser has to range-request the end of the file before it can show a
single frame. It works — the card shows its own opening frame and the modal plays — but every start
costs an extra round trip it should not.

```bash
# Lossless. Copies the streams and moves the index to the front; takes about a second.
ffmpeg -i molar-testimonial-0721.mp4 -c copy -movflags +faststart molar-testimonial-0721-fs.mp4
```

### 63% of every frame is black

It is a 2010×1080 screen recording of a vertical reel, and the picture inside it occupies a
**747×965 window at (636, 42)** — measured at eight points across all 37 seconds, over which it does
not shift by a pixel. Everything outside that window is solid black.

`AssetFilm.astro` carries those four numbers as custom properties and scales and offsets the
recording until the window is the only part of it inside the card and the modal. Nothing is cropped
off the subject; the letterbox is simply removed.

Re-cut it and the CSS reduces to nothing:

```bash
ffmpeg -i molar-testimonial-0721.mp4 -vf "crop=747:965:636:42" \
  -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 128k molar-testimonial-0721-cropped.mp4
```

Then set `--pic-x`/`--pic-y` to `0`, `--pic-w`/`--film-w` to `747` and `--pic-h`/`--film-h` to `965`
in `AssetFilm.astro`, or delete the transform rule and let the video fill its box. The file also
gets a good deal smaller, which matters: the card fetches metadata for it on approach.

### A poster would be better than what it does now

There is no poster image, so the card paints its own opening frame — `preload="metadata"`, then a
seek to 1.1s, which is what makes a paused video decode a picture. It costs a metadata fetch and a
range request on a file with its index at the wrong end. One still would replace both:

```bash
ffmpeg -i molar-testimonial-0721.mp4 -ss 00:00:01.1 -frames:v 1 -vf "crop=747:965:636:42" \
  -q:v 3 ../images/film-poster.jpg
```

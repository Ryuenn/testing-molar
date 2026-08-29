# Videos

Final hero footage drops in here. Filenames are **fixed** — `src/components/sections/Hero.astro`
references them literally, and `netlify.toml` caches this whole directory as immutable.

| File               | Used for                      | Target                                                |
| ------------------ | ----------------------------- | ----------------------------------------------------- |
| `hero.webm`        | Primary source, modern browsers | VP9 / AV1, ~1920×1080, under ~4 MB                    |
| `hero.mp4`         | Safari and older engines        | H.264 High, `+faststart`, ~1920×1080, under ~6 MB     |
| `hero-mobile.mp4`  | Served below 768px              | H.264, ~960×1280 **portrait**, under ~2 MB            |

The poster lives at `public/images/hero-poster.jpg` — not in this folder, because Netlify sets
`Content-Disposition` and range headers differently for `/videos/*`.

## Brief for the footage

Crystalline low-poly tooth with glowing blue circuit traces, floating in deep space over a wet
reflective floor. Deep navy-black with electric blue.

**The subject must sit centred and small in the frame.** The hero cover-crops to portrait on
phones — anything near the edges gets cut. Verify at 375px before shipping.

## Encoding

```bash
# WebM (VP9)
ffmpeg -i master.mov -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -an hero.webm

# MP4 (H.264) — faststart matters, or the video will not begin until fully buffered
ffmpeg -i master.mov -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p \
  -movflags +faststart -an hero.mp4

# Mobile cut — portrait crop, centred on the tooth
ffmpeg -i master.mov -vf "crop=ih*3/4:ih,scale=960:-2" -c:v libx264 -crf 26 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an hero-mobile.mp4

# Poster — pull a frame where the tooth is lit
ffmpeg -i master.mov -ss 00:00:02 -frames:v 1 -q:v 3 ../images/hero-poster.jpg
```

Strip the audio track (`-an`). The video is `muted` and autoplay is only permitted while it is.

## Until the real files land

The hero falls back to `hero-poster.jpg` as a CSS background, so the section renders correctly
with no video present. The three `<source>` elements will 404 in the network panel until the files
are added — that is the only expected failed request on the page.

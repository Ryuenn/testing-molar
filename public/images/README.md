# Images (`public/`)

Everything here is served **as-is** at a stable URL and cached immutable for a year by
`netlify.toml`. To change one of these files, either keep the name and accept a cache lag, or
rename it (`hero-poster-v2.jpg`) and update the reference.

| Path                                 | Used by                                                                    | Size      |
| ------------------------------------ | -------------------------------------------------------------------------- | --------- |
| `hero-poster.avif` `.webp` `.jpg`    | `Hero.astro`. The `poster` attribute takes the WebP — it accepts one URL only — and the CSS fallback negotiates all three via `image-set()`. Cut from `Hero_videoFinal-web.mp4`; re-cut all three together whenever that clip changes, or the fold shows one room and then paints another. | 1660×1244 |
| `og/home.png`                        | Home page `og:image`                                                       | 1200×630  |
| `og/resources.png`                   | `/resources/` `og:image`                                                   | 1200×630  |
| `og/404.png`                         | 404 `og:image`                                                             | 1200×630  |
| `og/resource-<slug>.png`             | One social card per resource page, set as `ogImage:` in its markdown. Falls back to `og/resources.png` when absent. | 1200×630 |
| `logo-molar.png`                     | Organization structured data, webmanifest                                  | 512×512   |
| `apple-touch-icon.png`               | iOS home screen                                                            | 180×180   |
| `case-studies/`                      | Any case-study media that must keep a fixed URL                            | —         |

## `public/` vs `src/assets/`

Put an image in **`src/assets/`** whenever it is rendered through Astro's `<Image>` — that is what
produces the responsive AVIF/WebP `srcset`, and it is the default choice.

Put it in **`public/`** only when something outside the build needs a predictable URL: social
cards, favicons, the video poster, structured-data logos.

## Regenerating the hero poster

The poster is the largest paint on the page, so it ships in three formats. After replacing the
JPEG, regenerate the other two — run this from the project root, using the `sharp` that Astro
already depends on:

```js
import sharp from 'sharp';

const src = 'public/images/hero-poster.jpg';
await sharp(src).webp({ quality: 72, effort: 6 }).toFile('public/images/hero-poster.webp');
await sharp(src).avif({ quality: 52, effort: 6 }).toFile('public/images/hero-poster.avif');
```

The current placeholder measures 67 KiB as JPEG, 16 as WebP, 8 as AVIF. Skipping this step costs
roughly 0.4s of mobile LCP, which is the difference between a 97 and a 95 on Lighthouse.

## Placeholders

Every file in this folder is a generated placeholder in the right palette and the right
dimensions. Replacing one with real artwork at the same size needs no code change.

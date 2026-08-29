# Images (`public/`)

Everything here is served **as-is** at a stable URL and cached immutable for a year by
`netlify.toml`. To change one of these files, either keep the name and accept a cache lag, or
rename it (`hero-poster-v2.jpg`) and update the reference.

| Path                          | Used by                          | Size        |
| ----------------------------- | -------------------------------- | ----------- |
| `hero-poster.jpg`             | `Hero.astro` — `<video poster>` and the CSS fallback | 1920×1080 |
| `og/home.png`                 | Home page `og:image`             | 1200×630    |
| `og/resources.png`            | `/resources/` `og:image`         | 1200×630    |
| `og/404.png`                  | 404 `og:image`                   | 1200×630    |
| `og/resource-<slug>.png`      | One social card per resource page. Falls back to `og/resources.png` when absent. | 1200×630 |
| `logo-molar.png`              | Organization structured data, webmanifest | 512×512 |
| `apple-touch-icon.png`        | iOS home screen                  | 180×180     |
| `case-studies/`               | Any case-study media that must keep a fixed URL | — |

## `public/` vs `src/assets/`

Put an image in **`src/assets/`** whenever it is rendered through Astro's `<Image>` — that is what
produces the responsive AVIF/WebP `srcset`, and it is the default choice.

Put it in **`public/`** only when something outside the build needs a predictable URL: social
cards, favicons, the video poster, structured-data logos.

## Placeholders

Every file currently in this folder is a generated placeholder in the right palette and the right
dimensions. Replacing one with real artwork at the same size needs no code change.

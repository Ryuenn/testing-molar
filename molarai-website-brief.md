# MOLAR AI — Website Build Brief

Build the marketing website for **MOLAR AI** (molarai.studio) from scratch. Greenfield project — do not scaffold from a template or starter kit.

**Skip the navbar.** Leave a placeholder `<Nav />` component with correct props and slots wired up. Design supplied separately.

---

## The product

MOLAR AI is a subscription that creates, customizes, schedules, and publishes patient-education content for dental practices. The practice connects its social accounts and content goes out automatically. No filming, no editing, no caption writing, no posting.

Positioning: **the world's first automated patient education platform for dental practices.** Tagline: *the content engine for dentistry.*

**Audience:** practice owners, office managers, and DSO leadership. Busy, not technical, wary of marketing vendors. Their alternative is a $3,000–5,000/mo agency demanding meetings and approvals — or doing nothing.

**The site's job:** get a practice to subscribe.

**Voice:** direct, outcome-led, short sentences. "Own the feed in your city." "Go live in 24 hours." "No filming. No contracts. No agencies." AI is a genuine differentiator against human agencies, so name it — but sell the outcome, not the technology.

---

## Stack

- **Astro** (latest, static output) + **Tailwind**
- **Lenis** smooth scroll
- **GSAP + ScrollTrigger** for scroll-driven reveals
- **Netlify** deploy target — include `netlify.toml`
- TypeScript where it earns its place. No React unless a component genuinely needs state; prefer Astro components and vanilla JS islands.

Zero JS shipped by default. Hydrate only what must be interactive.

---

## Hero

Full-bleed autoplay video background. Crystalline low-poly tooth with glowing blue circuit traces, floating in deep space over a wet reflective floor.

```html
<video autoplay muted loop playsinline poster="/hero-poster.jpg">
  <source src="/hero.webm" type="video/webm">
  <source src="/hero.mp4" type="video/mp4">
</video>
```

- `object-fit: cover`, `min-height: 100dvh` — not `100vh`, it breaks on mobile Safari
- Subject sits centred and small in the footage; cover-cropping to portrait must not clip it. Verify at 375px.
- Poster image required, or there's a black flash before first paint.
- Serve `hero-mobile.mp4` below 768px if the file is heavy.
- Dark scrim under the headline. Do not let the tooth's glow sit behind text.

Headline carries the core promise: the easiest way to educate patients online. Supporting flow: **Subscribe → Connect your accounts → Stay top of mind with patients.** Dual CTA — start now, and see plans and pricing.

Assets go in `public/`. Final files supplied later — use placeholders of the same names.

---

## Page structure

**1. Hero** — as above.

**2. Social proof band.** 10M+ organic views across MOLAR practices. Ticker of per-account view counts (182K, 98K, 2.6M, 74K, 200K, 89K, 127K) as a CSS marquee with a duplicated track.

**3. Global reach.** One platform, six continents — North America, South America, Europe, Africa, Asia, Australia, and growing. Find a treatment that isn't emoji flags. A real map is fine if it stays cheap on weight.

**4. The asset argument.** Every post doubles as a patient-education asset: replayed during consultations, sent after appointments, discovered organically. Education before, during, and after every visit. This is the strongest differentiator on the page — give it room.

**5. How it works.** Genuinely a sequence, so numbering is warranted here and nowhere else on the page.

1. Subscribe — choose the plan that fits the practice
2. Connect your accounts — securely link social accounts
3. Customize your brand — logo, colors, preferences
4. Go live — branded patient education starts posting automatically

One setup, fully automated, live the same day.

**6. Customized at scale.** The same platform powers every practice; no two grids look alike. Content types: reels, carousels, before & afters, case studies. Built around each practice's brand, patients, and city.

**7. Case study.** Quebec smile makeover expert. Frame as a before/after contrast:

- Before: easy to overlook, inconsistent online presence, limited patient awareness, no authority at scale
- After: 10,600+ followers, recognized by dental professionals worldwide, patients regularly mention the content, premium branding that builds trust

Build as a repeatable component — more case studies are coming.

**8. Comparison table.**

| | MOLAR AI | Agencies |
|---|---|---|
| Cost | $497/mo | $3,000–5,000/mo |
| Content speed | 24 hours | 2–4 weeks |
| You own the content | Yes | No |
| Filming required | No | Yes |
| Contracts | None | 6+ months |
| Languages | All | Limited |
| Team | Full-stack AI | 1–2 editors |

Must be readable on mobile. Horizontal scroll is acceptable; an unreadable table is not.

**9. Pricing.** Three tiers, on-page, not linked out.

**MOLAR Starter — $497/month**
Consistent content, zero effort. For practices that want reliable content without adding work to the team.
- 3 posts per week — 1 educational reel, 1 carousel, 1 social proof post
- Customized to branding, treatments, and practice
- Reviews and before & afters incorporated when provided
- Powered by the MOLAR content library
- Captions, scheduling, and publishing included
- Instagram & Facebook
- Live within 24 hours

**MOLAR Premium — $1,497/month** *(Most Popular)*
$500 off the first month with code MOLAR. Their patient acquisition system.
- Daily content for Instagram & Facebook
- Fully custom reels, carousels, stories, and still image posts
- Focused on the practice's highest-value treatments
- Reviews, before & afters, and patient cases turned into content
- Multilingual content in patients' own language
- Voice cloning — narrated by the dentist
- YouTube Shorts included
- Client Portal access
- Priority production & support

**MOLAR Enterprise — Custom**
For groups, DSOs, and multi-location practices. One content strategy, every location.
- Everything in Premium
- AI avatars of doctors and leadership teams
- Multi-location content distribution
- Per-location branding & localization
- Centralized content management across every practice
- Enterprise onboarding & deployment
- Dedicated strategist & priority support
- Volume pricing
- Exclusive content rights available
- CTA: talk with sales

Prices in USD. "No long-term contracts. Cancel anytime." under the grid. Make the promo code a content variable, not a hardcoded string.

**10. Resource hub.** Grid of free branded MOLAR PDFs as a top-of-funnel entry. Each card: title, one line on what's inside, download CTA. Email gate — single field only, no phone, no practice size. Build the grid to scale past 20 items with filtering; ship with placeholder entries and a content collection so new resources are added as markdown. Secondary to pricing — place it accordingly and never let it gate the subscription path.

**11. FAQ.** Accordion. Mark up with FAQPage structured data.

- **What exactly is MOLAR?** A subscription that creates, customizes, schedules, and publishes social media content for dental practices. No filming, no editing, no caption writing, no posting.
- **Is the content customized to my practice?** Yes — branding, treatments, location, and goals. Reels, carousels, stories, review posts, before & after content, and patient education. The more content the practice provides, the more personalized the account becomes.
- **Do I need to create content myself?** No. MOLAR runs completely hands-off. Practices that provide patient photos, reviews, before & afters, and team content typically see the strongest results.
- **What kind of content do you post?** Reels, carousels, stories, before & after cases, patient reviews and testimonials, team and office content, treatment explanations, patient education, treatment-specific calls to action. New content every month, expanding the largest dental content library in the industry.
- **How quickly can we get started?** Most practices are live within 24 hours.
- **How is MOLAR different from hiring an agency?** Agencies require constant meetings, content requests, approvals, and team involvement. MOLAR is hands-off — subscribe, connect accounts, done.
- **How is MOLAR different from paid ads?** Ads target patients ready to book today. MOLAR keeps the practice visible to patients who aren't ready yet — building trust and educating until they are.
- **Why should patients follow our social media?** The best dental marketing happens between appointments. Followers keep seeing educational content, treatment information, and patient transformations long after they leave. Many successful clients use QR codes throughout the practice to drive follows.
- **We have multiple locations. Is MOLAR a fit?** Yes. Content distributes across locations with brand consistency and location-specific customization, from 3 locations to 300.
- **Can I upload my own photos, videos, and reviews?** Yes. Premium subscribers get Client Portal access for patient cases, reviews, before & afters, team photos, and videos.
- **Do I have to approve posts?** No. Most clients prefer fully automated publishing.
- **Is there a contract?** No long-term contracts. Cancel anytime.

**12. Closing CTA.** Own the feed in your city. Go live in 24 hours. No filming, no contracts, no agencies — just daily content patients actually want to watch.

**13. Footer.** © 2026 MOLAR AI • The content engine for dentistry • team@molarai.studio

---

## Design direction

Dark, clinical, precise. The hero footage is deep navy-black with electric blue — build the palette outward from that rather than fighting it. Blue is the accent; use it sparingly enough that it still signals when it appears.

Avoid: cream backgrounds with serif display faces, terracotta accents, generic SaaS gradient blobs, emoji as UI. Dentistry has a real visual vocabulary — precision instruments, clean margins, radiographic imagery, exacting tolerances. Mine that instead.

Typography carries this. A display face with engineering character, a body face readable at length, a real type scale with intentional weights and spacing.

Spend the boldness on the hero. Everything below it stays quiet and disciplined.

---

## Motion

- Lenis smooth scroll, GSAP ScrollTrigger section reveals
- One orchestrated page-load sequence in the hero — staggered, not scattered
- CSS marquee for the view-count ticker
- Hover micro-interactions on pricing cards and CTAs
- `prefers-reduced-motion` falls back to instant reveals, no exceptions

Restraint matters more than volume. Over-animation is the fastest way to make this read as generated.

---

## Performance and correctness

Non-negotiable:

- Long cache headers on `public/` assets in `netlify.toml`. Static media must not serve `max-age=0, must-revalidate`.
- Every image responsive and modern-format. Astro `<Image>` where possible.
- Canonicals, OG and Twitter tags on every page, with a real per-page `og:image` — not one sitewide default. Confirm the param is actually passed through, not merely declared in the SEO component.
- Sitemap URLs match canonicals exactly: protocol, subdomain, trailing slash.
- Structured data: Organization sitewide, Product/Offer on pricing, FAQPage on the FAQ, BreadcrumbList on inner pages.
- Security headers in `netlify.toml`: HSTS with `includeSubDomains`, X-Content-Type-Options, Referrer-Policy, sane CSP.
- Spam protection on the email capture form.

Target: 95+ mobile Lighthouse; 100 on Accessibility, Best Practices, SEO.

Verify against a running build at 375 / 768 / 1440: no console errors, no horizontal overflow, no failed requests, visible keyboard focus throughout.

---

## Deliverable

Working Astro project, committed, deployable to Netlify. Short README covering local dev, where the video assets go, and how to add a new PDF resource.

# Life After Launch

The marketing-and-discovery website for **Life After Launch** — an interview-led
podcast from the **Aussie Founders Club**. Hosts: Megan Luttrell & Geo George.

> **Raw. Real. Un-sugar-coated.**

A bold editorial poster you can walk through — the studio wall, made navigable.
Built end-to-end from the v1.0 design brief.

---

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** — SSG for SEO/GEO,
  first-class metadata, `next/font`, `next/og`, `next/image`.
- **Tailwind CSS 3**, wired to the design tokens (`styles/tokens.css`) — every
  theme key references a CSS variable, so tokens stay the single source of truth.
- **Framer Motion** — in-view reveals, route transitions, drag gestures, the
  filter reflow, accordions, marquee.
- **Lenis** — smooth scroll (destroyed under `prefers-reduced-motion`).
- **Zod** — validates every episode at load; the build fails on bad data.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static-generates every page + episode + OG images
npm run start
npm run typecheck  # tsc --noEmit
```

---

## What's built (maps to the brief's definition of done, §11.2)

- **Design system** — `styles/tokens.css` dropped in verbatim; two-colour
  discipline; per-episode **tonal depth** (`launch` / `deep` / `navy`); AA-safe
  pairings (marigold only on ink-navy or as the logotype/poster type).
- **Five pages + utilities** — Home, Episodes index, Episode detail, About,
  Community, plus Privacy/Terms (`noindex`) and a branded 404.
- **The three set-pieces (§4.4)** —
  1. **Cinematic hero** — wall fade-up, letter-by-letter wordmark reveal,
     drifting cloud-head with pointer parallax (≤12px, the one sanctioned
     drift), CTA pop.
  2. **Draggable episode wall** — Framer Motion drag with momentum,
     rubber-band bounds, centre-scaling, a custom "drag" cursor, arrow-key
     paging, and a native scroll-snap fallback under reduced motion.
  3. **Poster→page morph** — the View Transitions API as progressive
     enhancement: the clicked poster and the destination hero share a
     `view-transition-name` (the slug). Falls back to the route-template fade.
- **Motion system (§4)** — Tier-1 reveals everywhere, one pull-quote scale
  moment per long page, count-ups (real text server-side; animation is a
  visual layer), the marigold "spark" underline, scroll-condensing nav.
- **Key Takeaways (§7.4)** — the McKinsey-style, answer-first, citable article:
  question-led H2, dek, TL;DR, numbered insights with standalone bold lead-ins
  and marigold-on-navy stat callouts, synthesis, FAQ accordion, attribution.
- **SEO/GEO (§9)** — per-page metadata + canonicals + OG/Twitter; `next/og`
  OG images (per-episode + branded default); `sitemap.xml`, `robots.txt`, RSS
  link; dynamic **`llms.txt`**; JSON-LD on every page (`WebSite`+`SearchAction`,
  `Organization`, `PodcastSeries`, `CollectionPage`+`ItemList`, `PodcastEpisode`,
  `Article`, `BreadcrumbList`, `FAQPage`, `AboutPage`, `Person`, `JoinAction`).
- **Branded states (§4.6)** — skeletons, the cloud-head empty state, in-voice
  email success/error.
- **Reduced motion (§4.7)** — every signature animation has a defined reduced
  state; Lenis, drift, count-ups, letter reveal and the morph all degrade.

---

## Verified against the brief's targets (§1.4)

Measured on the production build (`next start`) with Lighthouse + axe-core:

| | Performance | Accessibility | Best-Practices | SEO |
|---|---|---|---|---|
| Home (desktop) | 100 | 100 | 100 | 100 |
| Episode (desktop) | 100 | 100 | 100 | 100 |
| Home (mobile) | 97 | 100 | 100 | 100 |
| Episode (mobile) | 95 | 100 | 100 | 100 |

- **axe-core (WCAG 2.0/2.1 A + AA): 0 violations** on Home, Episodes, Episode
  detail, About and Community.
- Reduced-motion verified (content visible at rest; Lenis/drift/count-ups off).
- Poster→episode navigation verified end-to-end.

> Targets were ≥95 Performance / 100 Accessibility / 100 Best-Practices / 100 SEO
> on the mobile profile — met on every page.

## Content model

Episodes are **typed TypeScript objects** in `content/episodes/`, one file per
episode, validated against the Zod schema in `content/schema.ts` at module load.
This satisfies the brief's "typed, validated and queryable" content layer while
avoiding a fragile MDX pipeline; it's swappable for a headless CMS later without
touching components.

**Adding an episode** = drop a `content/episodes/<slug>.ts` file (matching the
schema) and register it in `content/episodes/index.ts`. No component changes.

Global live figures (the **1,281** Founder count, listen/social URLs, host bios)
live in **one place**: `content/site.ts`.

> ⚠️ All episodes, testimonials and host bios are **sample/placeholder data**,
> clearly flagged `sample: true`. Episode #1 (`the-rev-kept-coming`) is the
> fully-worked exemplar from §7.5. Replace with real content at build time.

---

## Project structure

```
app/                 layout (fonts, nav, footer, Lenis), template (route transition),
                     pages, sitemap/robots/llms.txt/opengraph-image, /api/subscribe
components/
  brand/             BlueWall (the only way to make a blue surface), Wordmark, CloudHead
  layout/            Header, MobileMenu, Footer, SlackBlock, EmailSignup
  episode/           EpisodePoster, EpisodeWall, EpisodesExplorer, EpisodeHero,
                     KeyTakeaways, FaqAccordion, PullQuote, ListenButtons, ListenSheet,
                     Chapters, RelatedWall, StickyListenBar, StatCallout, EpisodeEmbed
  motion/            SmoothScroll (Lenis), Reveal/Stagger, Marquee, MorphLink
  ui/                Button, Eyebrow, Pill, Chip, StatCounter, Skeleton
  home/              HomeHero (the cinematic set-piece)
content/             schema.ts (Zod), site.ts, testimonials.ts, episodes/*.ts
lib/                 content.ts, motion.ts, seo.ts, schema.ts (JSON-LD), nav.ts
styles/              tokens.css (drop-in), globals.css
```

---

## Open items for the brand owner (§12.4 — non-blocking, sensible defaults shipped)

1. **Real episode data** — titles, guests, overviews, listen URLs, durations,
   host-written Key Takeaways.
2. **Host bios & photos** — Megan & Geo, plus warm blue-wall photography for the
   hero / About (host portraits currently render a typographic placeholder; the
   cloud-head covers anonymous guests).
3. **Live member count** — confirm the Founder number (`content/site.ts`).
4. **Email provider** — wire `app/api/subscribe/route.ts` to the chosen service
   (the route contract from §10.5 is implemented; the provider call is stubbed
   with a clear `TODO`).
5. **Slack invite** — public URL vs. gated/auto-invite (`site.slackInvite`).
6. **Listen URLs** — show-level + per-episode (placeholders in place).
7. **AI-crawler policy** — `robots.txt` is permissive by default.
8. **Brand asset masters** — `logo-marigold.png`, `bg-blue-texture.jpg` etc.
   (§12.3). Until supplied, the wall texture is rendered procedurally
   (gradient + plaster noise + vignette) and the wordmark is type-set.

---

*Life After Launch · An Aussie Founders Club podcast · Built from brief v1.0.*

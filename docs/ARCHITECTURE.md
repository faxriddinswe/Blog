# Architecture

## Stack (verified versions)

| Package                    | Version         | Notes                                                                         |
| -------------------------- | --------------- | ----------------------------------------------------------------------------- |
| next                       | 16.4.6          | App Router, Turbopack, `cacheComponents` + `partialPrefetching` on            |
| react / react-dom          | 19.3.0          |                                                                               |
| tailwindcss                | 4.3.3           | CSS-first config (`@theme inline` in `src/styles/globals.css`)                |
| next-intl                  | 4.15.0          | `next/root-params` locale resolution, `src/proxy.ts`                          |
| zod                        | 4.6.7           | Shared lead schema (Contact phase)                                            |
| gsap + @gsap/react         | 3.15.1 / 2.1.2  | Standard License — free incl. SplitText & ScrollTrigger (checked 2026-11-12)  |
| lenis                      | 1.3.27          | MIT, driven by the GSAP ticker                                                |
| three / @react-three/fiber | 0.187.0 / 9.8.2 | MIT, WebGL beam only                                                          |
| motion                     | 14.12.0         | MIT — installed, not yet imported (reserved for form/step micro-interactions) |
| playwright-core            | 1.65            | dev only, `pnpm qa:shots` drives the system Chrome                            |
| typescript                 | 5.9.3           | `strict: true`                                                                |
| pnpm                       | 12.18.0         | pinned via `packageManager`                                                   |

MDX, Shiki and react-hook-form arrive in their phases.

## Performance architecture

The critical path ships **no animation library**. Latest audit (Phase 7, local prod build with `NEXT_PUBLIC_SITE_URL` pointed at the audited origin so canonicals resolve):

| Page / run                                          | Perf     | A11y | BP  | SEO | LCP         | CLS   |
| --------------------------------------------------- | -------- | ---- | --- | --- | ----------- | ----- |
| `/uz` mobile, devtools throttling (slow 4G, 4× CPU) | 97       | 100  | 100 | 100 | 1.8 s       | 0.001 |
| `/uz` mobile, simulated (Lantern)                   | 90–93    | 100  | 100 | 100 | 2.7–3.5 s   | 0.001 |
| `/uz` desktop                                       | 99       | 100  | 100 | 100 | 0.8 s       | 0.003 |
| `/en/blog`, posts — mobile / desktop                | 97 / 100 | 100  | 100 | 100 | 2.1 / 0.6 s | 0.001 |

Observed (unthrottled) LCP equals FCP (~0.36 s): the LCP element is painted in the first frame. Lantern's simulated LCP adds modeled JS execution after it, hence the higher number; real-device throttling meets the < 2.5 s target.

Auditing `localhost` against a production build shows SEO 92 only because canonicals point at `https://faxriddinswe.uz`; with the env pointed at the audited origin it is 100.

1. **Intro in CSS, not JS.** Preloader (letters, 0→100 counter via `@property`, curtain), headline rise and staggered fade-ups are CSS keyframes (`styles/intro.css`) — they start at first paint, independent of hydration.
2. **Flash-free preloader decision.** `PreloaderScript` (inline, in `<head>`) sets `html[data-preloader=show|skip]` before first paint: first visit of the session only, never with reduced motion.
3. **LCP-eligible headline.** The name is split by _words_ (per-char inline-blocks would each be a tiny LCP candidate). Words sit in their final place under the preloader (`animation-fill-mode: none`), so they are painted at FCP, then drop into their masks as the curtain lifts. On narrow screens the portrait (`fetchPriority="high"`) is the LCP instead, so it also must not start at `opacity: 0` — its intro is a transform-only rise.
4. **Fonts.** Only Space Grotesk 600 (headline) is preloaded; Inter and JetBrains Mono 400 swap in. `latin` covers Uzbek ʻ ʼ, so no `latin-ext` (230 KB → 82 KB).
5. **Desktop-only chunks.** `DesktopEnhancements` lazy-loads Lenis + GSAP (smooth scroll, cursor) only for fine pointers without reduced motion; touch devices never download them.
6. **No WebGL.** The R3F waterfall was removed at the owner's request; the hero ring rotates via a compositor-only `rotate` transform.
7. **Scroll-linked effects via CSS scroll-driven animations** — hero parallax, bio word reveal, timeline draw and the pinned Projects gallery. This replaces GSAP ScrollTrigger from the brief for these effects: same result, zero JS, compositor-friendly. Browsers without `animation-timeline` get static/fallback layouts (e.g. a swipe row for Projects). Parallax (`animation-timeline: view()`), progressive enhancement behind `@supports`.
8. **Magnetic CTAs** use rAF + a CSS `translate` transition — no GSAP on the critical path.

## Rendering model

- **Cache Components** is enabled (Next 16 default for new apps). Pages are prerendered to a static shell; anything dynamic must be wrapped in `<Suspense>` or cached with `"use cache"`. `/uz` and `/en` are fully static (○ in build output).
- **Activity**: with Cache Components, Next keeps recently visited routes mounted but hidden. Animation code (GSAP, Lenis, rAF loops) must clean up in effect cleanup and re-init on show — effects re-run when a route becomes visible again.
- Server Components by default. `"use client"` only for interaction/animation: `LangSwitch`, `RotatingText`, `Magnetic`, `HeroBeam`/`BeamCanvas`, `DesktopEnhancements` → `SmoothScroll`/`Cursor`, and the media-query hooks.

## i18n flow

```
request ─▶ src/proxy.ts (next-intl middleware)
            ├─ "/"        → 307 /uz   (default locale, prefix always)
            └─ "/en/..."  → app/[locale]/…
                           └─ src/i18n/request.ts reads `locale` via next/root-params
                              → loads src/i18n/messages/<locale>.json, tz Asia/Tashkent
```

- `src/i18n/routing.ts` — locales, default, prefix mode (single source).
- `src/i18n/navigation.ts` — locale-aware `Link`, `usePathname`, `useRouter`.
- `src/i18n/global.d.ts` — message keys are typed; a wrong key fails `typecheck`.
- `pnpm check:i18n` — fails if `uz.json` / `en.json` keys diverge.
- Unknown paths under a locale hit `app/[locale]/[...rest]` → localized `not-found.tsx`. That segment sets `instant = false` because it always 404s.

## Always-on animation budget

The owner wants many elements permanently animated. Rules that keep that affordable:

- Only `transform`/`opacity` (incl. individual `rotate`/`translate`/`scale`) may animate indefinitely — never `@property` values, `background-position`, `width` or other paint/layout properties.
- Every home section uses `content-visibility: auto`, so off-screen sections and their animations cost nothing.
- Touch devices (`hover: none`) get still rings; the hero ring is the one exception.
- Measure with the CDP snippet pattern used during development: 4× CPU throttle, `Performance.getMetrics` TaskDuration over 5 s.

## SEO

- Per-page metadata with canonical + hreflang (`x-default` → `/uz`) in `[locale]/layout.tsx`, blog index and posts (posts only list locales that exist).
- `app/sitemap.ts` — every locale of every page + posts with `xhtml:link` alternates; `lastModified` comes from post dates (no clock reads while prerendering).
- `app/robots.ts` — allow all, disallow `/api/`, sitemap + host.
- Open Graph images (`next/og`, 1200×630): `[locale]/opengraph-image.tsx` (name, roles, portrait, beam) and `[locale]/blog/[slug]/opengraph-image.tsx` (post title). Shared template `lib/og.tsx`; fonts from `@fontsource` (OFL), portrait from `assets/og/`. Twitter card `summary_large_image`.
- JSON-LD `Person` on the home page (`components/seo/PersonJsonLd.tsx`) — confirmed facts only, `<` escaped.
- Icons: `app/icon.svg` (brand mark) and `app/apple-icon.tsx`.
- `next.config.ts`: `www.faxriddinswe.uz` → apex (308), baseline security headers (nosniff, referrer policy, frame DENY, permissions policy, HSTS). No strict CSP yet: inline pre-paint and JSON-LD scripts would need nonces/hashes — candidate for a later hardening pass.

## Lead pipeline

```
LeadForm (RHF + zodResolver(leadSchema))  ──POST JSON──▶  app/api/lead/route.ts
   lib/validation/lead.ts  ◀── same schema ──┘            ├─ leadSchema.safeParse (source of truth)
                                                           ├─ honeypot → silent 200
                                                           ├─ lib/rate-limit.ts (per instance)
                                                           ├─ lib/turnstile.ts (only if secret set)
                                                           └─ lib/telegram.ts → sendMessage (HTML-escaped)
```

The form has three fields — full name, phone, question/proposal (owner request; replaces the original 4-step form). Zod messages are i18n keys (`Contact.errors.*`); API error codes map to the same namespace, so every error the user sees is localized.

## Data flow

Content is data. Components never hold copy:

- **UI strings** → `src/i18n/messages/{uz,en}.json`
- **Owner facts & structured content** → `src/content/*.ts` using `Localized<T>` (`{ uz, en }`)
- **Design values** → `src/styles/tokens.css` (CSS) and `src/lib/motion/tokens.ts` (JS)

## Blog (MDX)

**Decision: `@next/mdx`** (over `next-mdx-remote`), checked against `node_modules/next/dist/docs/01-app/02-guides/mdx.md` for Next 16.4:

- Official, compiled at **build time** — zero MDX runtime on the client, posts are fully static (○ in the build output).
- Works with Turbopack as long as remark/rehype plugins are given **by name with serializable options** (done in `next.config.ts`).
- Posts are local files we own; we don't need remote/CMS loading, which is `next-mdx-remote`'s main advantage.

How it fits together:

- Posts: `src/content/blog/{uz,en}/<slug>.mdx`. Each exports `metadata` (title, description, date, readingMinutes, tags, demo) — validated with Zod (`content/blog/types.ts`) when loaded, so a broken post fails the build.
- Registry: `src/content/blog/index.ts` maps locale → slug → `import()` (explicit, one chunk per post).
- Routes: `/[locale]/blog` (list) and `/[locale]/blog/[slug]`; `generateStaticParams` prerenders every slug for every locale. A locale missing a translation renders a notice linking to the other language (brief §11).
- Unknown slugs call `notFound()`. Because `dynamicParams` is unavailable with Cache Components, an unknown slug is rendered on demand: Next streams the not-found UI with status 200 + `noindex` (documented in `not-found.md`). Harmless for SEO.
- Plugins: `remark-gfm` (tables), `rehype-slug` (heading ids), `rehype-pretty-code` + Shiki `github-dark-dimmed` (code highlighting, build-time).
- `src/mdx-components.tsx` (required by `@next/mdx`) makes external links open safely in a new tab; typography is `.prose-x` in `styles/blog.css`.

## Folder map

See `CLAUDE.md` §6 for the target tree. Created in Phase 1: `app/[locale]`, `components/{layout,sections,motion,ui}`, `content/`, `i18n/`, `lib/`, `hooks/`, `styles/`, `public/images/{portrait,projects}`, `public/cv`.

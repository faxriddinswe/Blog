# Architecture

## Stack (verified versions)

| Package           | Version | Notes                                                              |
| ----------------- | ------- | ------------------------------------------------------------------ |
| next              | 16.4.6  | App Router, Turbopack, `cacheComponents` + `partialPrefetching` on |
| react / react-dom | 19.3.0  |                                                                    |
| tailwindcss       | 4.3.3   | CSS-first config (`@theme inline` in `src/styles/globals.css`)     |
| next-intl         | 4.15.0  | `next/root-params` locale resolution, `src/proxy.ts`               |
| zod               | 4.6.7   | Shared lead schema (Contact phase)                                 |
| typescript        | 5.9.3   | `strict: true`                                                     |
| pnpm              | 12.18.0 | pinned via `packageManager`                                        |

Motion/3D/MDX packages (GSAP, Lenis, Motion, R3F, MDX, Shiki, RHF) are added in the phases that use them, after a version + license check.

## Rendering model

- **Cache Components** is enabled (Next 16 default for new apps). Pages are prerendered to a static shell; anything dynamic must be wrapped in `<Suspense>` or cached with `"use cache"`. `/uz` and `/en` are fully static (○ in build output).
- **Activity**: with Cache Components, Next keeps recently visited routes mounted but hidden. Animation code (GSAP, Lenis, rAF loops) must clean up in effect cleanup and re-init on show — effects re-run when a route becomes visible again.
- Server Components by default. `"use client"` only for interaction/animation (currently: `LangSwitch`, `useReducedMotion`).

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

## Data flow

Content is data. Components never hold copy:

- **UI strings** → `src/i18n/messages/{uz,en}.json`
- **Owner facts & structured content** → `src/content/*.ts` using `Localized<T>` (`{ uz, en }`)
- **Design values** → `src/styles/tokens.css` (CSS) and `src/lib/motion/tokens.ts` (JS)

## Blog (decision pending — Blog phase)

Options are `@next/mdx` (files compiled at build, zero runtime, good with static export) vs `next-mdx-remote` (load MDX from `content/` at request/build time, frontmatter friendly). Decision and justification will be recorded here when the Blog phase starts, after checking both packages' current docs against Next 16.

## Folder map

See `CLAUDE.md` §6 for the target tree. Created in Phase 1: `app/[locale]`, `components/{layout,sections,motion,ui}`, `content/`, `i18n/`, `lib/`, `hooks/`, `styles/`, `public/images/{portrait,projects}`, `public/cv`.

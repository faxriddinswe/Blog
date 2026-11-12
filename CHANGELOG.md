# Changelog

All notable changes to this project. Format: [Keep a Changelog](https://keepachangelog.com/), commits follow Conventional Commits.

## [Unreleased]

### Phase 4 — Experience & Projects (2026-11-12)

- Experience timeline: SVG rail draws with scroll, nodes light up (opacity/scale only), entries fade up — CSS view timelines, no JS.
- Projects: pinned horizontal gallery on ≥1024px (sticky stage + scroll-driven `translateX`, scroll length scales with project count); native scroll-snap swipe row on mobile, older browsers and reduced motion.
- Project cards: GlowFrame (phase-shifted for warm cards), tall screenshot drifting inside a browser window (pauses on hover), numbered, tech tags, "Visit site ↗" / GitHub with `rel="noopener noreferrer"`.
- 4 clearly marked DEMO projects + generated SVG mock screenshots (owner request); demo links render as "Link coming soon", never fake URLs.
- Socials: GitHub, LinkedIn, X, Telegram bot added with `href: null` until the owner sends URLs.
- Lighthouse: desktop 99/100/100, mobile (simulated) 87/100/100.

### Phase 3 — Marquee, About, Skills (2026-11-12)

- Owner facts: 20+ projects since 2024 (freelance, remote for international companies, startups); confirmed tool list; bio drafted from those facts (UZ/EN).
- Portrait upgraded: denoise + EDSR ×2 super-resolution (640 → 1280 px) with the BiRefNet mask re-applied.
- Tech marquee: CSS infinite loop; scroll velocity drives speed and direction via WAAPI `playbackRate` (rAF only while visible).
- About: scroll-scrubbed word-by-word bio (CSS view timeline), stat counters (2+, 20+; SSR renders real values), halftone duotone portrait in a rotating heated GlowFrame with parallax.
- Skills: light section with a spotlight bento grid; five CSS-only live scenes (agent orbit, code typing, DB rows + cache hit, docker terminal, browser layout).
- New shared UI: `SectionHeading`, `GlowFrame`, `.container-x`, `.section`.
- Navbar logo in a translucent pill so it reads over light sections.
- a11y: unlit reveal words kept ≥ 3:1 contrast. Lighthouse A11y 100, mobile Perf 89–95, desktop 98–99.
- `pnpm qa:shots` can capture sections: `SECTIONS=about,skills`.
- pnpm 12.18.0 installed in `~/.local` (no sudo).

### Phase 2 — Motion core & Hero (2026-11-12)

- **Content fix (owner):** experience headline is now **2+ years** (work since 2024), replacing 3+. Timeline entry 2024 → present added; type of work still TODO.
- Portrait background removed locally (rembg, BiRefNet-portrait) → `public/images/portrait/portrait.png`; original moved to `assets/portrait/` (not publicly served).
- CSS preloader (letters, 0→100 counter, curtain), session-aware via a pre-paint head script.
- Hero: word-split headline rise, rotating roles, magnetic glow-pill CTAs, floating code/terminal/Telegram fragments, portrait rim light, scroll hint, CSS scroll-driven parallax.
- WebGL Waterfall Light Beam (R3F shader: fbm flow, head halo, breathing horizon splash, halftone, mouse sway, scroll response) — idle-loaded on capable desktops, paused off-screen; CSS beam stays as fallback.
- Desktop-only lazy chunk: Lenis (GSAP ticker) + custom cursor.
- Perf: mobile Lighthouse 98 (devtools throttling), desktop 98–100; fonts 230 → 82 KB; no animation library on the critical path.
- a11y: accessible names start with the visible label (logo, language switch).
- `pnpm qa:shots`: Playwright screenshots at 375 / 1440 / reduced motion; fails on console errors.

### Phase 1 — Foundation (2026-11-12)

- Next.js 16.4 (App Router, Turbopack, Cache Components) + TypeScript strict + Tailwind CSS 4 + pnpm.
- next-intl 4.15: `/uz` (default) and `/en`, always-prefixed, `src/proxy.ts`, typed message keys, `pnpm check:i18n`.
- Design tokens (`tokens.css`), motion tokens (`lib/motion/tokens.ts`), Space Grotesk / Inter / JetBrains Mono (OFL).
- Hero foundation: CSS Waterfall Light Beam (5 layers), headline, roles, glow pill CTAs, film grain, skip link, language switch that keeps the current page.
- Typed content layer (`content/*.ts`) with `TODO(owner)` markers.
- SEO base: per-locale metadata, canonical, hreflang alternates (+ x-default).
- ESLint (+ prettier compat), Prettier with Tailwind plugin, `typecheck` script.
- Docs: ARCHITECTURE, DESIGN-SYSTEM, MOTION-GUIDE, CONTENT-GUIDE, DEPLOYMENT, OWNER-INPUTS.

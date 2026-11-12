# Changelog

All notable changes to this project. Format: [Keep a Changelog](https://keepachangelog.com/), commits follow Conventional Commits.

## [Unreleased]

### Phase 7 — SEO & polish (2026-11-12)

- `sitemap.xml` (all locales + posts, hreflang alternates), `robots.txt`.
- Open Graph images via `next/og`: home (portrait + beam) and per blog post (title); Twitter `summary_large_image`.
- JSON-LD `Person` (confirmed facts only).
- Brand icon (`icon.svg`, `apple-icon`) replacing the default Next.js favicon.
- `www` → apex 308 redirect; baseline security headers incl. HSTS.
- Perf: hero portrait intro is transform-only so it counts as painted at first frame (mobile LCP 3.5 s → 1.8 s with devtools throttling).
- Lighthouse (canonical-correct build): SEO 100, A11y 100, BP 100 on home, blog and posts; desktop Perf 99–100, mobile 97 (devtools) / 90–93 (simulated).

### Phase 6 — Blog, teaser & footer (2026-11-12)

- MDX blog with `@next/mdx` (decision in ARCHITECTURE.md): Zod-validated post metadata, explicit post registry, `/[locale]/blog` + `/[locale]/blog/[slug]` fully prerendered, per-post metadata/OG/hreflang (only for existing translations), missing-translation notice.
- `remark-gfm`, `rehype-slug`, `rehype-pretty-code` (Shiki) — build-time highlighting; `.prose-x` article typography.
- Two bilingual **demo** posts: "What is an AI agent?" and "AI solutions for business" (marked Demo).
- Home blog teaser (latest 3 per locale).
- Footer: tagline, Tashkent time, section nav, socials, back-to-top (Lenis-aware), giant top-lit name fitted edge to edge.
- Desktop navbar links (About, Experience, Projects, Services, Blog, Contact).
- Lighthouse: home mobile 93 / desktop 99; post mobile 98 / desktop 100; A11y 100, BP 100.

### Phase 5 — Services & Contact / lead pipeline (2026-11-12)

- Services ("Biznesingizni tizimlashtiramiz"): 6 services with custom SVG icons and hover halos; 4-step "how we work" lit in sequence by a CSS view timeline; CTA to the form.
- Contact: live Asia/Tashkent clock (warm hour arc, cool minute arc; client-only to avoid hydration mismatch), public socials, multi-step lead form in a GlowFrame.
- Lead form: react-hook-form + Zod (shared schema with the server), 4 steps with per-step validation, focus moves to each new step, errors clear while typing, native-radio chips, honeypot, optional env-gated Turnstile, localized server errors, data kept on failure, animated success state.
- `POST /api/lead`: schema re-validation → honeypot → in-memory rate limit (5/10 min/IP) → Turnstile (if configured) → Telegram `sendMessage` with HTML-escaped input and Tashkent timestamp; typed `{ ok } | { ok:false, error }`.
- `pnpm telegram:chat-id` finds the chat id without exposing the token. `docs/DEPLOYMENT.md` documents bot setup, responses and the rate-limit limitation.
- Socials filled (GitHub, LinkedIn, X, Telegram bot).
- Fixed during QA: duplicate `id="contact"`, unselected optional radios (`null`) silently blocking submit, error-removal layout shift eating the "Next" click.
- Lighthouse: A11y 100, mobile Perf 90–92, desktop 99.

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

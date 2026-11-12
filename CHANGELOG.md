# Changelog

All notable changes to this project. Format: [Keep a Changelog](https://keepachangelog.com/), commits follow Conventional Commits.

## [Unreleased]

### Always-alive light, "Men haqimda", all-projects page (owner request, 2026-11-12)

- **Living rings everywhere**: buttons, icons, navbar, cards, technology rows and frames carry an always-lit, always-turning warm↔cool border (hover brightens it and blooms the aura). Rebuilt for performance: a compositor-only `rotate` of a conic square clipped by the element + an opaque fill layer (`--glow-fill`), instead of animating an `@property` angle. Touch devices keep the rings lit but still; the hero portrait ring turns everywhere.
- **Performance**: `content-visibility: auto` on sections (off-screen sections — and their animations — are not rendered); the code-typing scene now animates a transform instead of `width`; marquee only writes `playbackRate` when it changes. Throttled-phone main-thread work on the home page: ~43 s → ~6 s per load; mobile Perf 82–95, desktop 98.
- **About**: title "Men haqimda" / "About me" (eyebrow "Tanishuv"); wide centred panel with a living border, bio left, numbers right.
- **Section eyebrows**: the little light line breathes (compositor transform).
- **All projects**: "Barcha loyihalarim →" button in the Projects section opens `/[locale]/projects` — every project in a still grid (metadata, hreflang, sitemap).

### Light mode, FB logo, single language button, looping projects (owner request, 2026-11-12)

- **Light / night mode**: light token set (`html[data-theme="light"]`), pre-paint `ThemeScript` (saved choice, dark by default — no flash), sun/moon `ThemeToggle` with a short cross-fade; theme is re-applied after locale switches (the `[locale]` root layout re-renders `<html>`). Preloader stays a dark stage in both themes.
- **Language button**: one button shows the current language (globe + "UZ"); hover flips it to the other ("EN"), click switches on the same page.
- **Logo**: navbar shows a gradient-ring "spark" mark + **FB**; favicon, Apple icon and preloader updated to match.
- **About**: photo removed; bio + counters only.
- **Projects**: title "Qilgan loyihalarim" / "Projects I’ve built"; cards drift left in an endless loop (~12 s per card, duplicate copy is `inert`); reduced motion → still, keyboard-scrollable row.
- **Contact**: title "Savollaringiz bormi?" / "Have questions?".
- a11y: axe-core WCAG 2 AA clean on home, blog and posts in both themes, with and without reduced motion; light-mode peach darkened for AA.

### Technologies section (owner request, 2026-11-12)

- New home section "Texnologiyalar / Technologies" (+ nav link): category name as text, technologies as **logos only** — Backend (Python, FastAPI, Django, REST API), AI (agents, LLM, RAG, MCP), Data (PostgreSQL, Redis), DevOps (Docker, Linux), Frontend (HTML, CSS, JavaScript).
- Brand logos from Simple Icons (CC0-1.0); our own stroke glyphs for agents / LLM / RAG (no brand marks exist). Too-dark brand colours (Django, MCP) are lifted to light so they stay visible.
- Each logo has an accessible name and hover tooltip; tiles glow in their brand colour on hover; rows rise on scroll.

### Hero: rotating glow ring only (owner request, 2026-11-12)

- Removed the waterfall entirely (CSS fall and the WebGL beam). The portrait now has only a glowing amber ↔ cyan ring that slowly turns around it, plus a soft aura.
- The ring rotates with a compositor-only `rotate` transform (not an animated gradient angle): an earlier version repainted the blurred aura every frame and pushed mobile TBT to 1.8 s; now 240–470 ms.
- Dropped `three`, `@react-three/fiber`, `@types/three` and `src/components/three/` — no WebGL left on the site.

### Simpler lead form & calmer hero (owner request, 2026-11-12)

- Lead form is now a single step with three fields: full name, phone number, question / proposal (which business needs help) → **Send**. Shared Zod schema, API and Telegram message updated (name, phone, message, locale, Tashkent time). Replaces the brief's 4-step form at the owner's request; step/chip components removed.
- Leads are delivered to the owner's Telegram bot **@faxriddinswe_bot** — set that bot's token as `TELEGRAM_BOT_TOKEN` (see DEPLOYMENT.md).
- Hero: removed the two streams fanning out under the portrait and the floor glow; the waterfall is a little narrower and ends on the ring (shader tail removed too).

### Hero split layout & two-tone waterfall (owner request, 2026-11-12)

- ≥768px (tablet + desktop): text left-aligned on the left, portrait ring on the right; mobile keeps the stacked, centered layout.
- Wider waterfall attached to the ring: soft falling sheets over a sliding amber ↔ white ↔ cyan band with a white-hot core; it pours onto the ring, splits over both halves and fans out to both sides (warm stream left, cool stream right) with travelling light packets and a breathing two-tone spray.
- WebGL beam follows the ring's x position and is tinted warm/cool to match; floor glow moved under the portrait column.
- Hero fragments re-placed so they never overlap the text, fall or streams.

### Hero portrait ring & interactive light (owner request, 2026-11-12)

- Corrected: the **portrait** (not the logo) now sits in a round frame on the beam; the beam pours onto the ring, splits and flows down both halves, rejoining at the bottom; the name sits below. Shader aims at the ring.
- New `.glow-hover` (buttons) and `.glow-edge` (cards): rotating warm↔cool border + outer aura on hover/focus; cards also rise and light their edges while crossing the viewport (CSS view timelines). Applied to CTAs, form buttons, socials, project links, back-to-top, service/skill/post cards; GlowFrame burns brighter on hover.

### Hero emblem (superseded)

- The "F." mark in a ring now lives permanently in the hero, on the beam above the portrait: the beam pours onto the ring, splits and keeps flowing down both halves (looping light packets), rejoins at the bottom and continues onto the portrait; the name sits below. Portrait slightly smaller/lower to make room. Reduced motion: static lit ring.

### Footer (owner request, 2026-11-12)

- Removed the giant name at the bottom of the footer.

### Preloader redesign (owner request, 2026-11-12)

- The "F." mark sits in a ring; a beam falls onto the ring, splits in two and flows down both halves, and the streams flash where they meet; name letters, 0→100 counter and curtain kept (still ≤ 1.5 s, pure CSS/SVG).
- Pre-paint script rendered through `InlineScript` (server `text/javascript`, client `text/plain`) — removes React's dev warning about `<script>` in components (Next docs pattern).

### Phase 7 — SEO & polish (2026-11-12)

- Mobile menu on a native `<dialog>` (browser-provided focus trap, Esc, inert background); closes on navigation.

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

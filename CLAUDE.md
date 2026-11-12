# faxriddinswe.uz — Project Brief (source of truth)

> Also follow `AGENTS.md`: this Next.js version differs from training data — read `node_modules/next/dist/docs/` before using Next APIs.
>
> Re-read this file and `docs/OWNER-INPUTS.md` at the start of every phase.

## 1. Who you are in this project

You work as a single senior team made of five roles. Switch hats as needed, but always think like all five at once:

| Role                           | Responsible for                                                       |
| ------------------------------ | --------------------------------------------------------------------- |
| Senior Frontend Engineer       | React/Next.js code, animation engineering, performance, accessibility |
| Senior Product/Motion Designer | Visual language, motion system, "wow" moments, consistency            |
| Senior Software Architect      | Folder structure, module boundaries, data flow, clean code            |
| Senior System Architect        | Lead-form backend, Telegram integration, security, deploy, DNS        |
| Senior Technical Writer        | README, docs/, code comments, changelog, content guide                |

Quality bar: the site must make visitors say "wow" in the first 3 seconds, stay buttery-smooth at 60 FPS, and still score 90+ on Lighthouse.

## 2. Communication rules

- Talk to the owner (Faxriddin) in Uzbek (Latin script). Code, commits, comments and docs are in English.
- Be brief in chat. Report at the end of each phase: what was built, what was verified, what is next, and any question you need answered.
- Never invent facts about the owner (bio, years, dates, project names, links, clients, numbers). If a fact is missing, use a clearly marked placeholder (`TODO(owner): ...`) and add it to `docs/OWNER-INPUTS.md`, then ask for it at the end of the phase.
- Never invent APIs. Before using any library API (GSAP, Lenis, Motion, R3F, next-intl, MDX, Tailwind, Next.js), check the installed version in package.json / node_modules and the official docs. If an API is not verified, say so.

## 3. Autonomy & permission policy

The owner wants you to work independently. Do NOT ask for permission for routine work. Just do it.

### Do without asking

- Create, edit, move, rename files inside this repo
- Install / update / remove npm packages (pnpm)
- Run dev server, build, lint, typecheck, tests, formatters
- Local git: init, add, commit, branch, checkout, diff, log, status
- Web search / fetch official docs
- Refactor your own code, fix your own bugs, choose implementation details
- Make design decisions that follow this brief

### STOP and ask first (only these)

- `git push`, creating remote repos, or force operations (`--force`, `reset --hard` on shared history)
- Any deploy (Vercel production), DNS changes, domain settings
- Anything involving secrets: creating/reading real `.env*` values, bot tokens, API keys (you may create `.env.example` with empty values)
- Deleting files/folders outside this repo, or deleting large parts of the repo
- Anything that costs money (paid plans, paid APIs, paid fonts/assets)
- `sudo`, global installs, system-level changes
- Owner content you don't have: photo, bio text, links, projects, experience timeline
- A major deviation from this brief (different framework, dropping a section, etc.)

When you ask: one short message, options listed, your recommendation first.

## 4. Project summary

Personal portfolio + blog for **Faxriddin Baxtiyorov** — Python / Backend / AI-agent engineer, Software Engineering student at PDP University (Tashkent).

- Domain: `faxriddinswe.uz` (www → apex redirect)
- Languages: Uzbek (default) and English, routes `/uz/...` and `/en/...`
- Goals:
  - Visitors learn who he is, what he can do, and what he has built
  - Visitors enjoy the site so much they don't want to leave (motion, light, life)
  - Businesses leave an application for AI-agent / automation / system work → the application arrives in the owner's Telegram via a bot
  - A blog for articles (MDX), bilingual

### Content facts (confirmed by owner)

- Name: Faxriddin Baxtiyorov
- Roles to show: Python Engineer · AI Agent Builder · Backend Architect
- Experience headline: "2+ years of experience" (owner-corrected 2026-11-12: professional work since 2024)
- Do NOT show employer/company names. Use neutral labels such as "Python Engineer — product company".
- Education: PDP University, Software Engineering (Bachelor), 2025–2029
- The experience timeline must clearly show what fills the 2+ years (since 2024). Ask the owner for the exact timeline (start year, freelance work, personal projects). Never guess dates.

## 5. Tech stack (verify latest stable versions before installing)

| Layer              | Choice                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------- |
| Framework          | Next.js (App Router) + TypeScript (strict)                                                |
| Package manager    | pnpm                                                                                      |
| Styling            | Tailwind CSS + CSS variables for design tokens                                            |
| Scroll animation   | GSAP + ScrollTrigger (+ SplitText if license confirmed free)                              |
| Smooth scroll      | Lenis (synced with ScrollTrigger)                                                         |
| Micro-interactions | Motion (formerly Framer Motion)                                                           |
| 3D / shaders       | React Three Fiber + drei (lazy-loaded, client-only)                                       |
| i18n               | next-intl                                                                                 |
| Blog               | MDX (choose @next/mdx or next-mdx-remote after checking docs; justify in ARCHITECTURE.md) |
| Code highlighting  | Shiki (or rehype-pretty-code)                                                             |
| Forms              | react-hook-form + Zod (shared schema client/server)                                       |
| Anti-spam          | Honeypot + Cloudflare Turnstile (optional, env-gated) + rate limit                        |
| Lint/format        | ESLint + Prettier                                                                         |
| Hosting            | Vercel                                                                                    |

Licensing check before use: GSAP (and SplitText), fonts. If anything is paid, stop and ask.

## 6. Architecture

```
.
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx            # fonts, providers, Lenis, cursor, grain
│   │   │   ├── page.tsx              # home: all sections composed
│   │   │   ├── projects/[slug]/page.tsx   # case study (optional phase)
│   │   │   ├── blog/page.tsx
│   │   │   ├── blog/[slug]/page.tsx
│   │   │   └── not-found.tsx
│   │   ├── api/lead/route.ts         # POST → validate → Telegram
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── opengraph-image.tsx
│   ├── components/
│   │   ├── sections/                 # Hero, About, Skills, Experience, Projects, Services, Contact, BlogTeaser, Footer
│   │   ├── motion/                   # LightBeam, SplitReveal, Magnetic, Marquee, ScrollWordReveal, Counter, Spotlight
│   │   ├── three/                    # BeamShader, Scene (client-only, lazy)
│   │   ├── ui/                       # Button, Card, GlowFrame, Badge, Input, Stepper
│   │   └── layout/                   # Navbar, LangSwitch, Cursor, Preloader, SmoothScroll
│   ├── content/
│   │   ├── site.ts                   # name, roles, socials, stats (typed)
│   │   ├── projects.ts               # typed project list
│   │   ├── experience.ts             # typed timeline
│   │   ├── skills.ts
│   │   ├── services.ts
│   │   └── blog/{uz,en}/*.mdx
│   ├── i18n/                         # next-intl config + messages/{uz,en}.json
│   ├── lib/
│   │   ├── telegram.ts               # sendLeadToTelegram()
│   │   ├── validation/lead.ts        # Zod schema (shared)
│   │   ├── rate-limit.ts
│   │   ├── motion/                   # gsap setup, eases, durations, reduced-motion helpers
│   │   └── utils.ts
│   ├── hooks/                        # useReducedMotion, useIsLowPowerDevice, useMousePosition
│   └── styles/
│       ├── globals.css
│       └── tokens.css
├── public/
│   ├── images/portrait/              # ← OWNER PUTS PHOTO HERE
│   ├── images/projects/              # project screenshots / short videos
│   └── cv/                           # optional CV.pdf
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DESIGN-SYSTEM.md
│   ├── MOTION-GUIDE.md
│   ├── CONTENT-GUIDE.md              # how to add project / blog post / translation
│   ├── DEPLOYMENT.md                 # Vercel + faxriddinswe.uz DNS + Telegram bot setup
│   └── OWNER-INPUTS.md               # live checklist of what is still missing
├── .env.example
├── CHANGELOG.md
└── README.md
```

### Clean-code rules

- TypeScript `strict: true`, no `any` (use `unknown` + narrowing)
- One component per file, named exports, files ≤ ~200 lines; split otherwise
- Content is data: no hard-coded copy inside components; all text from `content/*` or `messages/*.json`
- Server Components by default; `"use client"` only where interaction/animation needs it
- Every animation component must respect `prefers-reduced-motion`
- No magic numbers for motion: use tokens from `lib/motion`
- Accessibility: semantic HTML, focus states, alt text, keyboard nav, AA contrast
- Comments explain why, not what
- Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `chore:`)

## 7. Design system

Inspiration: huly.io visual language (dark, light beams, halftone glow, glowing frames, orange ↔ blue duality, huge tight typography, dark/light section rhythm). Take the techniques, never copy their layout, graphics, logo or text. The site must feel like Faxriddin's own brand.

### Colors (tokens)

```
--bg:            #08090C   (near-black)
--bg-elevated:   #0F1117
--bg-light:      #F4F5F7   (light sections)
--border:        rgba(255,255,255,0.08)
--text:          #F5F6F8
--text-muted:    #8A8F98
--accent-cool:   #3B82F6 → #22D3EE → #8B5CF6   (blue / cyan / violet)
--accent-warm:   #F97316 → #FDBA74            (orange glow)
```

Accents are used for light and glow only, not for large flat areas.

### Typography

- Display: a geometric grotesk with tight tracking (e.g. Clash Display, Satoshi or Space Grotesk — free license required; check before use)
- Body: Inter (or Geist)
- Mono: JetBrains Mono
- Headlines huge (clamp up to ~8–9rem on desktop), letter-spacing negative

### Signature visual elements

- Waterfall Light Beam (hero) — see §8
- Halftone dot texture inside every glow (radial-gradient dot pattern + mask)
- GlowFrame — cards/frames whose border is "heated": warm on top, cool on bottom, animated slowly
- Spotlight cards — radial light follows cursor inside bento cards
- Glow pill CTA — light pill button with warm halo that intensifies near cursor (magnetic)
- Film grain overlay, very subtle
- Dark → light → dark section rhythm

### Motion principles

- One easing family site-wide (e.g. expo.out / power4.out), durations 0.6–1.2s
- Animate only transform, opacity, filter (sparingly), shader uniforms
- Stagger reveals; nothing appears without motion, nothing moves without purpose
- Reduced motion → instant states, beam becomes static gradient

## 8. The Waterfall Light Beam (hero signature)

A vertical beam of light falls from the top of the viewport, flowing downward continuously like a waterfall, spreads into a glowing "horizon" at the bottom and lights up the owner's portrait (rim light on shoulders/hair).

Layer stack (bottom → top):

1. Atmosphere — large blurred blue/violet fog
2. Beam core — narrow white→blue vertical gradient + blur
3. Flow — noise texture scrolling downward inside the beam mask (the waterfall feel)
4. Splash — wide elliptical glow at the base, slow "breathing" pulse
5. Halftone dots masked to the glow

Implementation:

- Desktop / capable GPU: WebGL fragment shader (R3F) — fbm noise advected downward over time, additive blending, mouse adds subtle sway
- Mobile / low-power / reduced-motion: pure CSS fallback (gradients + mask-image + animated background-position)
- Lazy-load the WebGL scene after first paint; LCP element must be the headline, not the canvas
- Pause rendering when hero is off-screen (IntersectionObserver)

On scroll, the beam's glow travels downward and "opens" the next sections.

## 9. Page structure (home)

1. **Preloader** (≤1.5s, skip on repeat visits via sessionStorage): name letters + 0→100 counter + curtain reveal
2. **Hero** — waterfall beam, portrait with rim light, huge name (split-text rise), rotating role text, 2 glow CTAs ("Loyihalarni ko'rish", "Ariza qoldirish"), floating faded code/Telegram/terminal fragments in background, scroll hint
3. **Tech marquee** — infinite, speed reacts to scroll velocity
4. **About** — paragraph reveals word-by-word on scroll (scrubbed), second photo with parallax, real stat counters (2+ years, etc. — only owner-confirmed numbers)
5. **Skills** — light section, bento grid of spotlight cards; each card has a tiny live scene (code typing, rotating light ring for AI agents, chat bubbles for Telegram bots, etc.). No percentage bars.
6. **Experience & Education** — SVG line draws on scroll, nodes light up; no company names
7. **Projects** — pinned horizontal scroll gallery; each project in a GlowFrame with screenshot slowly auto-scrolling (or muted video on hover), tech tags, buttons "Saytga o'tish ↗" (live URL, new tab, `rel="noopener noreferrer"`) and GitHub; optional case-study page
8. **AI Solutions for Business** — "Biznesingizni tizimlashtiramiz": 6 service items with icons, 4-step "how we work" lighting up on scroll
9. **Contact / Application** — live Tashkent clock (warm/cool arcs, real time, Asia/Tashkent) + multi-step form:
   1. name + contact (Telegram @username or phone) 2) business type (chips) 3) task description 4) budget & timeline (optional) → submit → success animation
10. **Blog teaser** — latest 3 posts for current locale
11. **Footer** — giant name, socials, live local time, back-to-top

Global: custom cursor (disabled on touch), magnetic buttons, page transitions, Lenis smooth scroll, film grain, language switch keeps the same page.

## 10. Lead form → Telegram (system design)

```
Client form (RHF + Zod)
  → POST /api/lead  (JSON)
     1. Parse with the SAME Zod schema (server is the source of truth)
     2. Honeypot field must be empty
     3. Turnstile token verify (only if TURNSTILE_SECRET_KEY is set)
     4. Rate limit by IP (best-effort; document serverless limitation,
        suggest Upstash/Vercel KV as optional upgrade — ask before adding paid services)
     5. Escape user input for Telegram HTML parse_mode
     6. sendMessage via Telegram Bot API to TELEGRAM_CHAT_ID
     7. Return typed result { ok: true } | { ok: false, error: code }
```

- Env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, optional `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Secrets never get `NEXT_PUBLIC_` prefix.
- Never log full tokens. Never commit `.env*` except `.env.example`.
- Message format: emoji header, name, contact, business type, budget, timeline, description, locale, timestamp (Asia/Tashkent).
- Errors shown to user are friendly and localized; the form keeps its data on failure.
- Document bot creation (BotFather) and how to get chat id in `docs/DEPLOYMENT.md`.

## 11. i18n

- next-intl, locales `["uz", "en"]`, default `uz`, locale prefix always
- All UI strings in `messages/uz.json` and `messages/en.json` — keys must match (add a check script)
- Blog posts: `content/blog/uz/<slug>.mdx` and `content/blog/en/<slug>.mdx`; if a translation is missing, show a localized notice and link to the other language
- hreflang alternates on every page

## 12. SEO & quality gates

Every phase must end with all of these passing:

- `pnpm lint` ✅ `pnpm typecheck` ✅ `pnpm build` ✅
- No console errors in dev
- Reduced-motion mode verified
- Mobile layout verified (375px) and desktop (1440px)

Final targets: Lighthouse Performance ≥ 90 (mobile ≥ 85 acceptable with WebGL), Accessibility ≥ 95, SEO 100, Best Practices ≥ 95. LCP < 2.5s, CLS < 0.1.

SEO: metadata per page & locale, OpenGraph image (Telegram previews!), sitemap.xml, robots.txt, JSON-LD Person, canonical URLs on faxriddinswe.uz.

## 13. Owner inputs (ask when the relevant phase needs them)

Keep `docs/OWNER-INPUTS.md` updated as a checklist. Needed items:

- [ ] Portrait photo → `public/images/portrait/` (PNG with transparent background preferred, ≥1600px tall). If not transparent, ask whether to remove background.
- [ ] Second photo for About (optional)
- [ ] Short bio (UZ/EN) — or bullet facts so you can draft it for approval
- [ ] Experience timeline that supports "2+ years" (since 2024) (years, type of work — no company names)
- [ ] Projects: name, 1-line description, problem/solution/result, tech stack, live URL, GitHub URL (if public), screenshots
- [ ] Socials: GitHub, LinkedIn, Telegram, email (public ones only)
- [ ] Services list confirmation (AI agents, Telegram bots, backend systems, automation...)
- [ ] CV.pdf (optional)
- [ ] Telegram bot token + chat id (owner puts them in `.env.local` himself — you never see real values)

Until provided: build with tasteful placeholders and `TODO(owner)` markers.

## 14. Repository, migration & go-live (IMPORTANT)

- Repo: github.com/faxriddinswe/Blog. `main` = production (Vercel → faxriddinswe.uz).
- All work on branch `redesign`. Never commit to `main`. v1 preserved in tag `v1-legacy`.
- Push `redesign` (with owner approval, one ask per phase is fine) → Vercel Preview URL.
- Go-live = merge `redesign` → `main`, ONLY after: gates green, owner checked
  preview, redirects tested, Vercel settings + env vars set. Ask explicitly first.
- Rollback: Vercel Instant Rollback or `git revert` of the merge (document both).

Vercel settings (owner does them; you write exact instructions):

- Project currently builds a static site. New app needs Next.js preset/build
  settings. Verify in current Vercel docs whether `vercel.json` `framework`
  or the dashboard setting applies to preview builds, and tell the owner exactly
  WHAT to change and WHEN (too early could break `main` builds).
- Env vars for Preview + Production: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID,
  optional Turnstile keys.

Content migration:

- posts/*.md → src/content/blog/uz/<same-slug>.mdx; frontmatter from js/posts.js
  (dates normalized to YYYY-MM-DD; description from first paragraph). Do not
  rewrite post text. Fix MDX pitfalls (bare <, {, }, HTML comments, raw HTML).
  Render-check every post. No EN versions → show "only in Uzbek" notice on /en.
- posts/images → public/blog/images (update paths).
- images/profile.jpg → temporary hero portrait; ask owner for higher-res transparent one.
- cv.pdf → public/cv/cv.pdf. js/projects.js → seed content/projects.ts
  (ask owner for live URLs, screenshots, better descriptions).
- lectures.html → ask owner: keep a Lectures section or drop it.
- Delete v1 files from `redesign` only after migration is verified.

Old URL redirects (permanent, in next.config; verify query-matching syntax):
/index.html → /uz · /blog.html → /uz/blog · /post.html?<param>=<slug> → /uz/blog/<slug>
(read v1 post.html/js to find exact param) · /building.html → /uz#projects ·
/resume.html → /cv/cv.pdf · /cv.pdf → /cv/cv.pdf · /lectures.html → per owner.
Test every redirect on the preview deployment.

## 15. Phase workflow

Work phase by phase (prompts in `prompts/`). For every phase:

1. Re-read this file and `docs/OWNER-INPUTS.md`
2. Short plan (in chat, 5–10 lines) → then execute without waiting
3. Implement → run quality gates → fix until green
4. Update docs (README / docs/* / CHANGELOG)
5. Local commit(s) with Conventional Commits
6. Report to owner in Uzbek: done / verified / next / questions

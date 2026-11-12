# Design system

Visual language: dark, light beams, halftone glow, heated frames, orange ↔ blue duality,
huge tight type, dark → light → dark rhythm. Techniques inspired by huly.io — layout,
graphics and copy are our own.

## Tokens

Defined in `src/styles/tokens.css`, exposed to Tailwind in `src/styles/globals.css` (`@theme inline`).

| Token                       | Value                         | Tailwind          |
| --------------------------- | ----------------------------- | ----------------- |
| `--bg`                      | `#08090C`                     | `bg-bg`           |
| `--bg-elevated`             | `#0F1117`                     | `bg-bg-elevated`  |
| `--bg-light`                | `#F4F5F7`                     | `bg-bg-light`     |
| `--border`                  | `rgb(255 255 255 / .08)`      | `border-border`   |
| `--text`                    | `#F5F6F8`                     | `text-text`       |
| `--text-muted`              | `#8A8F98`                     | `text-text-muted` |
| `--accent-blue/cyan/violet` | `#3B82F6 / #22D3EE / #8B5CF6` | `text-accent-*`   |
| `--accent-orange/peach`     | `#F97316 / #FDBA74`           | `text-accent-*`   |

Rule: accents are **light**, not paint — glows, edges, small marks. Never large flat fills.

## Themes

Dark is the default brand look; light mode overrides the same tokens under `html[data-theme="light"]` (`--bg #F6F7F9`, `--bg-elevated #FFF`, `--text #0B0C10`, `--text-muted #555B66`, `--accent-peach #9A3412` for AA small text). `ThemeScript` (pre-paint) + `ThemeToggle` (sun/moon) in the navbar; choice stored in `localStorage["fx:theme"]`. Never hard-code dark colours — use tokens or `color-mix(in srgb, var(--bg) …)`.

## Typography

| Role    | Family         | License                           | Tailwind       |
| ------- | -------------- | --------------------------------- | -------------- |
| Display | Space Grotesk  | SIL OFL 1.1 (free, commercial OK) | `font-display` |
| Body    | Inter          | SIL OFL 1.1                       | `font-sans`    |
| Mono    | JetBrains Mono | SIL OFL 1.1                       | `font-mono`    |

Loaded with `next/font/google` (self-hosted at build). Subset `latin` only — it already includes Uzbek `ʻ ʼ` (U+02BB–02BC). Only Space Grotesk 600 is preloaded.

Scale: `text-display` (clamp 3.25 → 9rem), `text-h1`, `text-h2`; `tracking-display` (−0.045em).

## Signature elements

| Element                                  | Status                     | Where                                                           |
| ---------------------------------------- | -------------------------- | --------------------------------------------------------------- |
| Waterfall Light Beam — CSS fallback      | ✅                         | `components/motion/LightBeamFallback.tsx`, `styles/beam.css`    |
| Waterfall Light Beam — WebGL shader      | ✅ Phase 2                 | `components/three/{beam-shader.ts,BeamCanvas.tsx,HeroBeam.tsx}` |
| Portrait rim light                       | ✅ Phase 2                 | `sections/hero/HeroPortrait.tsx`, `styles/hero.css`             |
| Halftone dots                            | ✅ `.halftone` + in shader | `styles/globals.css`, `beam-shader.ts`                          |
| Glow pill CTA + magnetic halo (`--glow`) | ✅ Phase 2                 | `ui/GlowPillLink.tsx`, `motion/Magnetic.tsx`                    |
| Film grain                               | ✅                         | `layout/Grain.tsx`                                              |
| Custom cursor                            | ✅ Phase 2                 | `layout/Cursor.tsx`, `styles/cursor.css`                        |
| GlowFrame (heated rotating border)       | ✅ Phase 3                 | `ui/GlowFrame.tsx`, `styles/glow.css`                           |
| Spotlight bento cards                    | ✅ Phase 3                 | `motion/Spotlight.tsx`, `sections/skills/*`                     |
| Light section (`.section--light`)        | ✅ Phase 3                 | `styles/skills.css`                                             |

The beam lands on the portrait's hair line in both versions: CSS uses `--portrait-bottom`, `--portrait-h`, `--portrait-head` on `.hero`; the shader measures the same box at runtime.

## Accessibility

- Focus ring: 2px cyan, 3px offset (`:focus-visible`).
- Skip link to `#main` on every page.
- Text on `--bg`: `--text` ≈ 18:1, `--text-muted` ≈ 6.1:1 (AA ✅).

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

## Typography

| Role    | Family         | License                           | Tailwind       |
| ------- | -------------- | --------------------------------- | -------------- |
| Display | Space Grotesk  | SIL OFL 1.1 (free, commercial OK) | `font-display` |
| Body    | Inter          | SIL OFL 1.1                       | `font-sans`    |
| Mono    | JetBrains Mono | SIL OFL 1.1                       | `font-mono`    |

Loaded with `next/font/google` (self-hosted at build, no runtime request), subsets `latin` + `latin-ext` for Uzbek `oʻ gʻ`.

Scale: `text-display` (clamp 3.25 → 9rem), `text-h1`, `text-h2`; `tracking-display` (−0.045em).

## Signature elements

| Element                                  | Status                 | Where                                                        |
| ---------------------------------------- | ---------------------- | ------------------------------------------------------------ |
| Waterfall Light Beam — CSS fallback      | ✅ Phase 1             | `components/motion/LightBeamFallback.tsx`, `styles/beam.css` |
| Waterfall Light Beam — WebGL             | ⏳                     | `components/three/`                                          |
| Halftone dots                            | ✅ utility `.halftone` | `styles/globals.css`                                         |
| Glow pill CTA (static)                   | ✅                     | `components/ui/GlowPillLink.tsx`                             |
| Film grain                               | ✅                     | `components/layout/Grain.tsx`                                |
| GlowFrame, Spotlight cards, magnetic CTA | ⏳                     | —                                                            |

## Accessibility

- Focus ring: 2px cyan, 3px offset (`:focus-visible`).
- Skip link to `#main` on every page.
- Text on `--bg`: `--text` ≈ 18:1, `--text-muted` ≈ 6.1:1 (AA ✅).

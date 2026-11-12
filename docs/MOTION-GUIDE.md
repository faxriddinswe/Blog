# Motion guide

## Principles

1. One easing family: **expo.out** (`cubic-bezier(0.16, 1, 0.3, 1)`).
2. Durations 0.6 / 0.9 / 1.2s only (`duration.fast/base/slow`).
3. Animate `transform`, `opacity`, sparing `filter`, shader uniforms. Never layout properties.
4. Stagger reveals (`stagger.tight/base/loose`). Nothing appears without motion; nothing moves without purpose.
5. Reduced motion → instant end states; the beam becomes a static gradient.

## Tokens

- JS: `src/lib/motion/tokens.ts` — `duration`, `ease`, `stagger`.
- CSS: `--ease-out`, `--dur-fast|base|slow` in `src/styles/tokens.css`; Tailwind `ease-brand`, `duration-(--dur-fast)`.

No magic numbers in components — import a token or add one here first.

## Reduced motion

- CSS: global `@media (prefers-reduced-motion: reduce)` in `globals.css` collapses animations/transitions; `beam.css` also stops its keyframes explicitly.
- JS: `useReducedMotion()` (`src/hooks/useReducedMotion.ts`) — server snapshot is `true`, so nothing animates before hydration confirms the preference.
- Verified in Phase 1 with Chrome `--force-prefers-reduced-motion`.

## Activity caveat (Next 16 Cache Components)

Hidden routes stay mounted. Every GSAP context / ScrollTrigger / Lenis instance must be created in an effect and killed in its cleanup (`gsap.context().revert()` — verify API on install).

## Where motion lives

| Concern                          | Tech                               | File                                                               |
| -------------------------------- | ---------------------------------- | ------------------------------------------------------------------ |
| Preloader, hero intro, word rise | CSS keyframes                      | `styles/intro.css`, `layout/Preloader.tsx`, `motion/SplitRise.tsx` |
| Rotating role                    | React state + CSS `rise-in`        | `motion/RotatingText.tsx`                                          |
| Hero parallax, splash travel     | CSS scroll-driven animations       | `styles/hero.css`                                                  |
| Smooth scroll                    | Lenis on the GSAP ticker (desktop) | `layout/SmoothScroll.tsx`                                          |
| Cursor                           | `gsap.quickTo` (desktop)           | `layout/Cursor.tsx`                                                |
| Magnetic CTAs                    | rAF + CSS transition               | `motion/Magnetic.tsx`                                              |
| Beam                             | GLSL fbm advected downward         | `three/beam-shader.ts`                                             |

Rule: **first paint → CSS; desktop interaction/scroll → GSAP (lazy chunk); shader → R3F (lazy chunk).** Never import `@/lib/motion/gsap` from a component in the initial bundle — go through a `dynamic()` boundary like `DesktopEnhancements`.

## Timing contract

`--preloader-total` (CSS) must equal `preloader.total` (JS). `--curtain-duration` is its tail; headline words start dropping exactly when the curtain starts moving.

## Planned components

`ScrollWordReveal` (SplitText + ScrollTrigger scrub), `Marquee` (scroll velocity), `Counter`, `Spotlight`, `GlowFrame` — next phases.

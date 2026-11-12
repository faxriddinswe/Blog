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

## Planned components

`SplitReveal`, `Magnetic`, `Marquee`, `ScrollWordReveal`, `Counter`, `Spotlight`, WebGL `BeamShader` — added in the Motion phase after verifying GSAP / Lenis / Motion versions and licenses.

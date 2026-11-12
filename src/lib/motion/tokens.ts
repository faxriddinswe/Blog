/**
 * Motion tokens. Every animation in the codebase reads from here so the site
 * moves with one voice (brief §7: one easing family, 0.6–1.2s durations).
 * CSS mirrors live in src/styles/tokens.css — keep them in sync.
 */
export const duration = {
  fast: 0.6,
  base: 0.9,
  slow: 1.2,
} as const;

export const ease = {
  /** GSAP ease name — verify against installed GSAP before use. */
  gsap: "expo.out",
  /** Same curve as cubic-bezier for Motion / CSS. */
  bezier: [0.16, 1, 0.3, 1] as const,
} as const;

export const stagger = {
  tight: 0.03,
  base: 0.06,
  loose: 0.12,
} as const;

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
  /** GSAP ease name (verified: gsap 3.15 core eases include "expo.out"). */
  gsap: "expo.out",
  /** Same curve as cubic-bezier for Motion / CSS. */
  bezier: [0.16, 1, 0.3, 1] as const,
} as const;

export const stagger = {
  tight: 0.03,
  base: 0.06,
  loose: 0.12,
} as const;

/** Lenis: lower lerp = heavier, silkier scroll. */
export const smoothScroll = {
  lerp: 0.1,
  wheelMultiplier: 1,
} as const;

/** Pointer-driven effects. */
export const pointer = {
  /** Fraction of the pointer offset a magnetic element follows. */
  magneticStrength: 0.35,
  /** Extra px around a magnetic element where the pull starts. */
  magneticRadius: 80,
  /** Seconds for quickTo followers to catch up. */
  followLag: 0.45,
  cursorLag: 0.18,
} as const;

/** Rotating role text in the hero. */
export const rotation = {
  intervalMs: 2600,
} as const;

/**
 * Preloader timeline (seconds). Must equal --preloader-total in tokens.css,
 * because the CSS intro and JS listeners both key off it.
 */
export const preloader = {
  total: 1.5,
  storageKey: "fx:preloaded",
} as const;

/** Tech marquee: base loop length and how hard scroll velocity pushes it. */
export const marquee = {
  /** Seconds for one full loop at rest. */
  loopSeconds: 40,
  /** px/frame of scroll → extra playback rate. */
  velocityGain: 0.08,
  maxRate: 6,
  /** Per-frame return toward the base rate (0–1). */
  decay: 0.08,
} as const;

/** Stat counters. */
export const counter = {
  durationMs: 1400,
} as const;

/** Shared media queries so JS and CSS agree on what "capable" means. */
export const mq = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
  desktop: "(min-width: 768px)",
} as const;

export function matches(query: string): boolean {
  return typeof window !== "undefined" && window.matchMedia(query).matches;
}

interface NavigatorHints {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

/**
 * Heuristic for "don't run WebGL here". Prefers false negatives: a capable
 * phone gets the CSS beam, which still looks good.
 */
export function isLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return true;
  const nav = navigator as Navigator & NavigatorHints;
  if (nav.connection?.saveData) return true;
  if ((nav.hardwareConcurrency ?? 8) <= 4) return true;
  if ((nav.deviceMemory ?? 8) <= 4) return true;
  return !matches(mq.desktop) || !matches(mq.finePointer);
}

/** Shared media queries so JS and CSS agree on what "capable" means. */
export const mq = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
  desktop: "(min-width: 768px)",
} as const;

export function matches(query: string): boolean {
  return typeof window !== "undefined" && window.matchMedia(query).matches;
}

"use client";

import { mq } from "@/lib/motion/media";
import { useMediaQuery } from "./useMediaQuery";

/**
 * Live `prefers-reduced-motion` flag. Server snapshot is `true` so nothing
 * starts animating before hydration confirms the user's preference.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery(mq.reducedMotion, true);
}

"use client";

import dynamic from "next/dynamic";
import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// GSAP + Lenis live in these lazy chunks, so touch devices never download them:
// Lenis doesn't smooth touch scrolling by default and the cursor is mouse-only.
const SmoothScroll = dynamic(() => import("./SmoothScroll").then((m) => m.SmoothScroll), {
  ssr: false,
});
const Cursor = dynamic(() => import("./Cursor").then((m) => m.Cursor), { ssr: false });

/** Mouse-and-motion-only global effects: smooth scroll and custom cursor. */
export function DesktopEnhancements() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  if (!fine || reduced) return null;

  return (
    <>
      <SmoothScroll />
      <Cursor />
    </>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
}

/**
 * One pointer listener for a whole bento grid: writes --mx/--my (px, relative
 * to each [data-spotlight] card) so CSS can paint a radial light under the
 * cursor. Mouse only; touch and reduced motion keep the static card.
 */
export function Spotlight({ children, className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || !fine || reduced) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-spotlight]"));
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        for (const card of cards) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
          card.style.setProperty("--my", `${e.clientY - rect.top}px`);
        }
      });
    };
    const onLeave = () => root.removeAttribute("data-active");
    const onEnter = () => root.setAttribute("data-active", "");

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, reduced]);

  return (
    <div ref={ref} className={className} data-spotlight-root>
      {children}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { rotation } from "@/lib/motion/tokens";

interface RotatingTextProps {
  items: readonly string[];
  className?: string;
}

/**
 * Cycles through `items` with a masked slide (CSS in hero.css — no animation
 * library on the critical path). The full list is always available to screen
 * readers; the animated copy is decorative.
 */
export function RotatingText({ items, className }: RotatingTextProps) {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced || items.length < 2) return;
    const id = window.setInterval(() => setTick((t) => t + 1), rotation.intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, items.length]);

  const index = reduced ? 0 : tick % items.length;

  return (
    <span className={className}>
      <span className="sr-only">{items.join(", ")}</span>
      <span aria-hidden="true" className="rotating">
        {/* Keyed span remounts on change, which restarts its enter animation. */}
        <span key={tick} className="rotating__item" data-animate={tick > 0}>
          {items[index]}
        </span>
      </span>
    </span>
  );
}

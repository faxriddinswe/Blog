"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { counter } from "@/lib/motion/tokens";

interface CounterProps {
  value: number;
  suffix?: string;
}

/**
 * Counts 0 → value when scrolled into view. The server renders the real
 * number, so without JS (and for crawlers) the stat is always correct.
 */
export function Counter({ value, suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    // Already on screen at load? Leave the final value — no visible reset.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.textContent = `0${suffix}`;
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / counter.durationMs);
        const eased = 1 - Math.pow(1 - t, 4); // matches the site's expo-ish out curve
        el.textContent = `${Math.round(eased * value)}${suffix}`;
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = `${value}${suffix}`;
    };
  }, [reduced, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { pointer } from "@/lib/motion/tokens";

interface MagneticProps {
  children: ReactNode;
  className?: string;
}

/**
 * Pulls its child toward the cursor and exposes `--glow` (0–1, proximity) so
 * the child can intensify its halo. Easing comes from a CSS transition on
 * `translate` (see .magnetic), so this stays dependency-free on the critical
 * path. Inert on touch and reduced motion.
 */
export function Magnetic({ children, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        // Measure from the resting position, not the already-pulled one.
        const pulledX = Number.parseFloat(el.dataset.x ?? "0");
        const pulledY = Number.parseFloat(el.dataset.y ?? "0");
        const dx = e.clientX - (rect.left - pulledX + rect.width / 2);
        const dy = e.clientY - (rect.top - pulledY + rect.height / 2);
        const reachX = rect.width / 2 + pointer.magneticRadius;
        const reachY = rect.height / 2 + pointer.magneticRadius;
        const inside = Math.abs(dx) < reachX && Math.abs(dy) < reachY;
        const x = inside ? dx * pointer.magneticStrength : 0;
        const y = inside ? dy * pointer.magneticStrength : 0;
        const proximity = inside
          ? 1 - Math.min(1, Math.hypot(dx / reachX, dy / reachY))
          : 0;

        el.dataset.x = String(x);
        el.dataset.y = String(y);
        el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
        el.style.setProperty("--glow", proximity.toFixed(3));
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      el.style.removeProperty("translate");
      el.style.removeProperty("--glow");
    };
  }, [fine, reduced]);

  return (
    <span ref={ref} className={`magnetic ${className ?? ""}`}>
      {children}
    </span>
  );
}

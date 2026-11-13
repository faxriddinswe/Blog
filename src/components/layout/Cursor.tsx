"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";
import { pointer } from "@/lib/motion/tokens";

const INTERACTIVE = "a, button, [role='button'], [data-cursor='hover']";

/** Dot + lagging ring. Mounted by DesktopEnhancements (fine pointer, motion OK). */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");

    const dotX = gsap.quickTo(dot.current, "x", { duration: pointer.cursorLag / 2 });
    const dotY = gsap.quickTo(dot.current, "y", { duration: pointer.cursorLag / 2 });
    const ringX = gsap.quickTo(ring.current, "x", { duration: pointer.cursorLag });
    const ringY = gsap.quickTo(ring.current, "y", { duration: pointer.cursorLag });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      el.dataset.visible = "true";
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      el.dataset.hover = String(Boolean(target?.closest(INTERACTIVE)));
    };
    const onLeave = () => {
      el.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} className="cursor" aria-hidden="true" data-visible="false">
      <div ref={ring} className="cursor__ring" />
      <div ref={dot} className="cursor__dot" />
    </div>
  );
}

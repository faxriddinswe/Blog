"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isLowPowerDevice } from "@/lib/motion/media";

// Client-only, separate chunk: three.js never touches the server or the first paint.
const BeamCanvas = dynamic(() => import("./BeamCanvas").then((m) => m.BeamCanvas), {
  ssr: false,
});

/**
 * Upgrades the CSS beam to WebGL on capable devices, after the page is idle,
 * and pauses rendering whenever the hero is off-screen.
 */
export function HeroBeam() {
  const reduced = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced || isLowPowerDevice()) return;
    const start = () => setEnabled(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = globalThis.setTimeout(start, 600);
    return () => globalThis.clearTimeout(id);
  }, [reduced]);

  useEffect(() => {
    const el = host.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry?.isIntersecting ?? false),
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  const markReady = () => {
    // CSS keeps atmosphere/halftone and fades its core/flow when WebGL takes over.
    host.current?.closest(".beam")?.setAttribute("data-webgl", "on");
    host.current?.closest(".hero")?.setAttribute("data-webgl", "on");
  };

  return (
    <div ref={host} className="absolute inset-0">
      {enabled && <BeamCanvas active={visible && !reduced} onReady={markReady} />}
    </div>
  );
}

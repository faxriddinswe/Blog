"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { lenisStore } from "@/lib/motion/lenis";
import { smoothScroll } from "@/lib/motion/tokens";

/**
 * Lenis driven by GSAP's ticker so ScrollTrigger and smooth scroll share one
 * clock (no double rAF, no drift). Mounted by DesktopEnhancements only.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      lerp: smoothScroll.lerp,
      wheelMultiplier: smoothScroll.wheelMultiplier,
    });
    lenisStore.set(lenis);

    const offScroll = lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // Lenis already smooths; GSAP's lag smoothing would make the two disagree after a hitch.
    gsap.ticker.lagSmoothing(0);

    return () => {
      offScroll();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisStore.set(null);
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { marquee } from "@/lib/motion/tokens";

/**
 * Scroll velocity → marquee speed and direction, via the Web Animations API
 * (`playbackRate` on the running CSS animation). No animation library needed.
 */
export function MarqueeVelocity() {
  const probe = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const track =
      probe.current?.parentElement?.querySelector<HTMLElement>(".marquee__track");
    if (!track || reduced) return;
    const [animation] = track.getAnimations();
    if (!animation) return;

    let lastY = window.scrollY;
    let rate = 1;
    let direction = 1;
    let frame = 0;
    let visible = false;

    const loop = () => {
      const y = window.scrollY;
      const velocity = y - lastY;
      lastY = y;
      if (velocity !== 0) direction = Math.sign(velocity);
      const target =
        1 + Math.min(Math.abs(velocity) * marquee.velocityGain, marquee.maxRate);
      rate += (target - rate) * marquee.decay;
      animation.playbackRate = rate * direction;
      if (visible) frame = requestAnimationFrame(loop);
    };

    // Only spin the rAF loop while the marquee is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      cancelAnimationFrame(frame);
      if (visible) {
        lastY = window.scrollY;
        frame = requestAnimationFrame(loop);
      }
    });
    io.observe(track);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      animation.playbackRate = 1;
    };
  }, [reduced]);

  return <span ref={probe} hidden />;
}

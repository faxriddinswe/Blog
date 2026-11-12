"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { lenisStore } from "@/lib/motion/lenis";

/** Smooth via Lenis when it runs (desktop), native otherwise; instant for reduced motion. */
export function BackToTop({ label }: { label: string }) {
  const reduced = useReducedMotion();

  const onClick = () => {
    const lenis = lenisStore.get();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="glow-hover group inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm text-text hover:border-text-muted"
    >
      {label}
      <span
        aria-hidden="true"
        className="transition-transform duration-(--dur-fast) group-hover:-translate-y-0.5"
      >
        ↑
      </span>
    </button>
  );
}

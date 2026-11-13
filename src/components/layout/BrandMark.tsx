import { useId } from "react";

/**
 * Brand mark: a warm→cool gradient ring (echoing the hero portrait ring)
 * with a small spark inside. Decorative — the "FB" text next to it names it.
 */
export function BrandMark({ className }: { className?: string }) {
  const id = useId();
  const grad = `bm-${id.replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient
          id={grad}
          x1="4"
          y1="4"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#F97316" />
          <stop offset="0.35" stopColor="#FBBF24" />
          <stop offset="0.65" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <circle
        cx="16"
        cy="16"
        r="12.5"
        fill="none"
        stroke={`url(#${grad})`}
        strokeWidth="2.6"
      />
      {/* Four-point spark */}
      <path
        d="M16 9.5c.6 3.6 2.9 5.9 6.5 6.5-3.6.6-5.9 2.9-6.5 6.5-.6-3.6-2.9-5.9-6.5-6.5 3.6-.6 5.9-2.9 6.5-6.5z"
        fill="currentColor"
      />
    </svg>
  );
}

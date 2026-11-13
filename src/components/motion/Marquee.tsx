import type { CSSProperties, ReactNode } from "react";
import { marquee } from "@/lib/motion/tokens";
import { MarqueeVelocity } from "./MarqueeVelocity";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Infinite CSS marquee: the track holds two copies and slides by -50%.
 * The second copy is aria-hidden; MarqueeVelocity (client) only nudges the
 * playback rate, so the loop works without JS.
 */
export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div
      className={`marquee ${className ?? ""}`}
      style={{ "--marquee-duration": `${marquee.loopSeconds}s` } as CSSProperties}
    >
      <div className="marquee__track">
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
      <MarqueeVelocity />
    </div>
  );
}

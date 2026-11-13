import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowFrameProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

/**
 * "Heated" frame (brief §7): the 1px border is a slowly rotating gradient —
 * warm on top, cool at the bottom — with a soft outer glow. CSS in glow.css.
 */
export function GlowFrame({ children, className, innerClassName }: GlowFrameProps) {
  return (
    <div className={cn("glow-frame", className)}>
      <div className={cn("glow-frame__inner", innerClassName)}>{children}</div>
    </div>
  );
}

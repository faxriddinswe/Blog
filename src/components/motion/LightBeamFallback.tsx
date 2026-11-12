/**
 * CSS-only Waterfall Light Beam (brief §8). Serves as the mobile / low-power /
 * reduced-motion version and the first-paint layer. In the hero only the
 * atmosphere is shown (see hero.css). Layer order mirrors the brief: atmosphere → core → flow → splash → halftone.
 * Styles live in src/styles/beam.css.
 */
import type { ReactNode } from "react";

interface LightBeamFallbackProps {
  /** Optional upgrade layer (the WebGL canvas) rendered above the CSS stack. */
  children?: ReactNode;
}

export function LightBeamFallback({ children }: LightBeamFallbackProps) {
  return (
    <div aria-hidden="true" className="beam">
      <div className="beam__atmosphere" />
      <div className="beam__core" />
      <div className="beam__flow" />
      <div className="beam__splash" />
      <div className="beam__halftone halftone" />
      {children}
    </div>
  );
}

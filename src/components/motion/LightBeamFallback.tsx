/**
 * CSS-only Waterfall Light Beam (brief §8). Serves as the mobile / low-power /
 * reduced-motion version and as the first-paint layer under the future WebGL
 * shader. Layer order mirrors the brief: atmosphere → core → flow → splash → halftone.
 * Styles live in src/styles/beam.css.
 */
export function LightBeamFallback() {
  return (
    <div aria-hidden="true" className="beam">
      <div className="beam__atmosphere" />
      <div className="beam__core" />
      <div className="beam__flow" />
      <div className="beam__splash" />
      <div className="beam__halftone halftone" />
    </div>
  );
}

/**
 * Hero background (owner request: "make the home background beautiful").
 * Layers, back to front: drifting warm / cool / violet aurora, a halftone dot
 * field, a perspective grid floor flowing toward the viewer, and a glowing
 * horizon line. Pure CSS (hero-bg.css), decorative, compositor-only motion.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="hero-bg">
      <span className="hero-bg__aurora hero-bg__aurora--cool" />
      <span className="hero-bg__aurora hero-bg__aurora--warm" />
      <span className="hero-bg__aurora hero-bg__aurora--violet" />
      <span className="hero-bg__dots" />
      <div className="hero-bg__floor">
        <span className="hero-bg__grid" />
      </div>
      <span className="hero-bg__horizon" />
      <span className="hero-bg__vignette" />
    </div>
  );
}

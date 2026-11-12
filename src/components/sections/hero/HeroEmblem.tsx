const LEFT = "M50 2 A48 48 0 0 0 50 98";
const RIGHT = "M50 2 A48 48 0 0 1 50 98";

/**
 * The "F." mark in a ring, floating on the beam above the portrait.
 * The beam pours onto the ring's top, splits, and keeps flowing down both
 * halves (light packets travelling along each arc), rejoining at the bottom
 * where the stream continues onto the portrait. The disc is filled, so the
 * beam behind it (CSS or WebGL) reads as interrupted by the ring.
 * Pure SVG + CSS (hero.css), decorative.
 */
export function HeroEmblem() {
  return (
    <div className="hero-emblem" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="hero-emblem__svg">
        <circle cx="50" cy="50" r="48" className="hero-emblem__disc" />
        <path d={LEFT} pathLength={1} className="hero-emblem__arc" />
        <path d={RIGHT} pathLength={1} className="hero-emblem__arc" />
        {/* Two packets per side, half a cycle apart, so the flow never pauses. */}
        <path d={LEFT} pathLength={1} className="hero-emblem__flow" />
        <path d={RIGHT} pathLength={1} className="hero-emblem__flow" />
        <path
          d={LEFT}
          pathLength={1}
          className="hero-emblem__flow hero-emblem__flow--late"
        />
        <path
          d={RIGHT}
          pathLength={1}
          className="hero-emblem__flow hero-emblem__flow--late"
        />
      </svg>
      <span className="hero-emblem__logo">
        F<span className="text-accent-orange">.</span>
      </span>
      <span className="hero-emblem__join" />
    </div>
  );
}

/**
 * Film-grain overlay. An inline SVG turbulence tile keeps it at zero network
 * cost; `pointer-events-none` so it never steals clicks.
 */
const NOISE_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>";

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.045] mix-blend-overlay"
      style={{ backgroundImage: `url("${NOISE_SVG}")` }}
    />
  );
}

/**
 * Waterfall Light Beam shader (brief §8). y = 0 is the bottom of the hero.
 * Layers: atmosphere fog → beam core → downward-advected fbm flow → breathing
 * horizon splash → halftone dots inside the glow. Output is meant for
 * additive compositing (canvas uses mix-blend-mode: screen).
 */
export const beamVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const beamFragment = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;     // -1..1, smoothed on the CPU
uniform float uProgress; // hero scroll progress 0..1
uniform float uHead;     // y where the beam meets the portrait
uniform float uHorizon;  // y of the splash horizon
uniform float uBeamX;    // x (0..1) of the beam — follows the portrait ring
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  float horizon = uHorizon - uProgress * 0.25;

  // Mouse sways the lower part of the beam more than the top, like a hanging stream.
  float sway = uMouse.x * 0.035 * (1.0 - uv.y);
  float x = (uv.x - uBeamX) * aspect - sway;
  float ax = abs(x);

  // Beam fades in from the top edge and thins out below the head.
  float topFade = smoothstep(1.02, 0.86, uv.y);
  float body = smoothstep(uHead - 0.06, uHead + 0.12, uv.y);
  // The fall ends on the portrait ring — no tail below it.
  float fall = topFade * body;

  float core = exp(-ax * 160.0);
  float glow = exp(-ax * 9.0) * 0.38;

  // Waterfall: noise advected downward, stretched vertically.
  float n = fbm(vec2(x * 22.0, uv.y * 5.0 + uTime * 1.25));
  float n2 = fbm(vec2(x * 9.0 + 3.1, uv.y * 2.5 + uTime * 0.6));
  float flow = exp(-ax * 12.0) * smoothstep(0.35, 0.95, n * 0.7 + n2 * 0.5);

  // Two-tone water: amber on one side, cyan on the other, slowly trading places.
  float side = smoothstep(-0.06, 0.06, x + 0.03 * sin(uTime * 0.7));
  vec3 warm = vec3(0.98, 0.62, 0.20);
  vec3 cool = vec3(0.20, 0.75, 0.98);
  vec3 tint = mix(warm, cool, side);

  vec3 col = vec3(0.0);
  col += vec3(1.0, 0.97, 0.92) * core * 0.9;
  col += tint * glow * 1.1;
  col += mix(tint, vec3(1.0), 0.35) * flow * 0.8;
  col *= fall;

  // Halo where the beam hits the head (rim light source).
  float hd = length(vec2(x * 1.6, (uv.y - uHead) * 2.6));
  col += vec3(0.55, 0.75, 1.0) * exp(-hd * 9.0) * 0.45;

  // Horizon splash, slowly breathing; warm edge for the orange/blue duality.
  float sd = length(vec2(x * 0.55, (uv.y - horizon) * 4.2));
  float breathe = 0.85 + 0.15 * sin(uTime * 1.1);
  float splash = exp(-sd * 3.2) * breathe * (1.0 + uProgress * 0.6);
  vec3 splashCol = mix(warm, cool, smoothstep(-0.25, 0.25, x)) * (0.8 + 0.4 * exp(-sd * 2.0));
  col += splashCol * splash * 0.12;

  // Atmosphere fog.
  float fog = exp(-length(vec2(x * 0.6, uv.y - 0.75)) * 2.4) * 0.08;
  col += vec3(0.33, 0.30, 0.85) * fog;

  // Halftone dots, only where the splash glows.
  vec2 cell = gl_FragCoord.xy / 6.0;
  float dotMask = smoothstep(0.32, 0.18, length(fract(cell) - 0.5));
  col += vec3(0.75, 0.82, 1.0) * dotMask * splash * 0.22;

  gl_FragColor = vec4(col, 1.0);
}
`;

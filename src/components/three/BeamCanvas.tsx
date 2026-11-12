"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { ShaderMaterial } from "three";
import { beamFragment, beamVertex } from "./beam-shader";

/** Defaults (shader y, 0 = bottom) until the portrait is measured. */
const HEAD_Y = 0.75;
const HORIZON_Y = 0.3;
/** Mouse smoothing per frame (0–1): low = lazier sway. */
const MOUSE_DAMPING = 0.04;
const MAX_DPR = 1.5;

function BeamPlane() {
  const material = useRef<ShaderMaterial>(null);
  const size = useThree((s) => s.size);
  const canvas = useThree((s) => s.gl.domElement);
  const target = useRef({ x: 0, y: 0 });
  const layout = useRef({ head: HEAD_Y, horizon: HORIZON_Y });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: [1, 1] },
      uMouse: { value: [0, 0] },
      uProgress: { value: 0 },
      uHead: { value: HEAD_Y },
      uHorizon: { value: HORIZON_Y },
    }),
    [],
  );

  // Aim the beam at the portrait's hair line and put the horizon at its base,
  // using the same layout the CSS beam uses (offset* ignores scroll transforms).
  useEffect(() => {
    const measure = () => {
      const hero = canvas.closest<HTMLElement>(".hero");
      const portrait = hero?.querySelector<HTMLElement>(".hero-portrait");
      if (!hero || !portrait) return;
      const headShare =
        Number.parseFloat(getComputedStyle(hero).getPropertyValue("--portrait-head")) ||
        0;
      const h = hero.offsetHeight;
      layout.current = {
        head: 1 - (portrait.offsetTop + portrait.offsetHeight * headShare) / h,
        horizon: 1 - (portrait.offsetTop + portrait.offsetHeight) / h,
      };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [canvas]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const m = material.current;
    if (!m) return;
    const u = m.uniforms;
    u.uTime.value += delta;
    u.uRes.value = [size.width, size.height];
    const mouse = u.uMouse.value as [number, number];
    mouse[0] += (target.current.x - mouse[0]) * MOUSE_DAMPING;
    mouse[1] += (target.current.y - mouse[1]) * MOUSE_DAMPING;
    // Scroll progress through the hero (0 → 1). One rect read per frame, no writes.
    const hero = canvas.closest<HTMLElement>(".hero");
    if (hero) {
      const rect = hero.getBoundingClientRect();
      u.uProgress.value = Math.min(1, Math.max(0, -rect.top / rect.height));
    }
    u.uHead.value = layout.current.head;
    u.uHorizon.value = layout.current.horizon;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={beamVertex}
        fragmentShader={beamFragment}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

interface BeamCanvasProps {
  active: boolean;
  onReady: () => void;
}

/** Full-bleed shader canvas. `active=false` stops the render loop entirely. */
export function BeamCanvas({ active, onReady }: BeamCanvasProps) {
  return (
    <Canvas
      className="beam__canvas"
      frameloop={active ? "always" : "never"}
      dpr={[1, MAX_DPR]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      onCreated={() => onReady()}
      aria-hidden="true"
    >
      <BeamPlane />
    </Canvas>
  );
}

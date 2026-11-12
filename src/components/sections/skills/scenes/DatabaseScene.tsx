import type { CSSProperties } from "react";

/** Query rows streaming into a table; a cache hit flashes on the side. */
export function DatabaseScene() {
  return (
    <div className="scene-db" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="scene-db__row" style={{ "--i": i } as CSSProperties}>
          <i />
          <i />
          <i />
        </span>
      ))}
      <span className="scene-db__cache">cache hit · 2ms</span>
    </div>
  );
}

import type { CSSProperties } from "react";

// Generic illustration of the craft, not a claim about a specific project.
const LINES = [
  '@app.post("/leads")',
  "async def create(lead: Lead):",
  "    await db.save(lead)",
  '    return {"ok": True}',
];

/** Lines "type" in one after another (steps() width reveal), then loop. */
export function CodeScene() {
  return (
    <pre className="scene-code" aria-hidden="true">
      {LINES.map((line, i) => (
        <span
          key={i}
          className="scene-code__line"
          style={{ "--i": i, "--chars": line.length } as CSSProperties}
        >
          {line}
        </span>
      ))}
    </pre>
  );
}

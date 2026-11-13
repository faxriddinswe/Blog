import type { CSSProperties } from "react";

const NODES = ["LLM", "RAG", "MCP", "API", "DB"];

/** A glowing core with tool nodes orbiting it — an agent and its tools. */
export function AgentRingScene() {
  return (
    <div className="scene-ring" aria-hidden="true">
      <div className="scene-ring__orbit">
        {NODES.map((node, i) => (
          <span
            key={node}
            className="scene-ring__node"
            style={{ "--a": `${(360 / NODES.length) * i}deg` } as CSSProperties}
          >
            <span className="scene-ring__label">{node}</span>
          </span>
        ))}
      </div>
      <div className="scene-ring__core" />
    </div>
  );
}

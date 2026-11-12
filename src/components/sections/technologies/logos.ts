import {
  siCss,
  siDjango,
  siDocker,
  siFastapi,
  siHtml5,
  siJavascript,
  siLinux,
  siModelcontextprotocol,
  siOpenapiinitiative,
  siPostgresql,
  siPython,
  siRedis,
} from "simple-icons";
import type { TechLogo } from "@/content/technologies";

export interface Logo {
  /** 24×24 SVG path. */
  path: string;
  /** Brand colour, already lifted to be visible on the dark background. */
  color: string;
  /** Stroke-drawn glyph (our own icons) vs filled brand mark. */
  stroke?: boolean;
}

/** Brand marks this dark would vanish on --bg; render them light instead. */
function visible(hex: string): string {
  const n = Number.parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.2 ? "#E7EAEE" : `#${hex}`;
}

const brand = (icon: { path: string; hex: string }): Logo => ({
  path: icon.path,
  color: visible(icon.hex),
});

// Brand logos: Simple Icons (CC0-1.0). LLM / RAG / agents have no brand
// mark, so they get our own stroke glyphs in the site's accent colours.
export const logos: Record<TechLogo, Logo> = {
  python: brand(siPython),
  fastapi: brand(siFastapi),
  django: brand(siDjango),
  rest: brand(siOpenapiinitiative),
  mcp: brand(siModelcontextprotocol),
  postgresql: brand(siPostgresql),
  redis: brand(siRedis),
  docker: brand(siDocker),
  linux: brand(siLinux),
  html: brand(siHtml5),
  css: brand(siCss),
  javascript: brand(siJavascript),
  agents: {
    stroke: true,
    color: "#FDBA74",
    path: "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  },
  llm: {
    stroke: true,
    color: "#22D3EE",
    path: "M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4 4v-4h0.5A2.5 2.5 0 0 1 4 13.5zM8.5 10h.01M12 10h.01M15.5 10h.01",
  },
  rag: {
    stroke: true,
    color: "#8B5CF6",
    path: "M6 3h8l4 4v6M14 3v4h4M6 3v18h6M8.5 9h5M8.5 12.5h3M17 15.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM19 20l2 2",
  },
};

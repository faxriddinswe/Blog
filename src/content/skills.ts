import type { Localized } from "./types";

export type SkillScene = "code" | "agent-ring" | "database" | "terminal" | "browser";

export interface SkillGroup {
  id: string;
  title: Localized;
  description: Localized;
  /** Which tiny live scene the bento card renders (brief §9 Skills). */
  scene: SkillScene;
  /** Bento footprint on the desktop grid. */
  size: "wide" | "tall" | "small";
  items: string[];
}

// Tools confirmed by the owner (2026-11-12). Grouping and copy are ours.
export const skillGroups: SkillGroup[] = [
  {
    id: "ai-agents",
    title: { uz: "AI agentlar va LLM", en: "AI agents & LLMs" },
    description: {
      uz: "Vositalardan foydalanadigan, maʼlumotdan javob topadigan va ishni oxirigacha yetkazadigan agentlar.",
      en: "Agents that use tools, ground answers in your data and finish the job.",
    },
    scene: "agent-ring",
    size: "tall",
    items: ["LLM", "AI agent tools", "MCP", "RAG", "Agentic coding"],
  },
  {
    id: "python",
    title: { uz: "Python backend", en: "Python backend" },
    description: {
      uz: "Tez, tiplangan va hujjatlashtirilgan API'lar.",
      en: "Fast, typed, documented APIs.",
    },
    scene: "code",
    size: "wide",
    items: ["Python", "FastAPI", "Django", "REST API"],
  },
  {
    id: "data",
    title: { uz: "Maʼlumotlar", en: "Data" },
    description: {
      uz: "Toʻgʻri sxema, tez soʻrovlar, keshlash.",
      en: "Sound schemas, fast queries, caching.",
    },
    scene: "database",
    size: "small",
    items: ["PostgreSQL", "Redis"],
  },
  {
    id: "infra",
    title: { uz: "Infratuzilma", en: "Infrastructure" },
    description: {
      uz: "Konteynerlar va Linux serverlarda barqaror ishlash.",
      en: "Containers and steady Linux servers.",
    },
    scene: "terminal",
    size: "small",
    items: ["Linux", "Docker"],
  },
  {
    id: "web",
    title: { uz: "Veb asoslari", en: "Web fundamentals" },
    description: {
      uz: "Backend'ni foydalanuvchiga yetkazadigan interfeyslar.",
      en: "The interfaces that put a backend in front of people.",
    },
    scene: "browser",
    size: "wide",
    items: ["HTML", "CSS", "JavaScript"],
  },
];

/** Flat list for the tech marquee. */
export const techList: string[] = skillGroups.flatMap((g) => g.items);

import type { Localized } from "./types";

/** Logo keys resolved in components/sections/technologies/logos.ts. */
export type TechLogo =
  | "python"
  | "fastapi"
  | "django"
  | "rest"
  | "mcp"
  | "llm"
  | "rag"
  | "agents"
  | "postgresql"
  | "redis"
  | "docker"
  | "linux"
  | "html"
  | "css"
  | "javascript";

export interface TechItem {
  /** Accessible name and hover tooltip — the logo itself is what's shown. */
  name: string;
  logo: TechLogo;
}

export interface TechCategory {
  id: string;
  label: Localized;
  items: TechItem[];
}

// Owner-confirmed tools (2026-11-12), grouped. Owner request: show logos only.
export const techCategories: TechCategory[] = [
  {
    id: "backend",
    label: { uz: "Backend", en: "Backend" },
    items: [
      { name: "Python", logo: "python" },
      { name: "FastAPI", logo: "fastapi" },
      { name: "Django", logo: "django" },
      { name: "REST API", logo: "rest" },
    ],
  },
  {
    id: "ai",
    label: { uz: "AI", en: "AI" },
    items: [
      { name: "AI agents", logo: "agents" },
      { name: "LLM", logo: "llm" },
      { name: "RAG", logo: "rag" },
      { name: "MCP", logo: "mcp" },
    ],
  },
  {
    id: "data",
    label: { uz: "Maʼlumotlar", en: "Data" },
    items: [
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "Redis", logo: "redis" },
    ],
  },
  {
    id: "devops",
    label: { uz: "DevOps", en: "DevOps" },
    items: [
      { name: "Docker", logo: "docker" },
      { name: "Linux", logo: "linux" },
    ],
  },
  {
    id: "frontend",
    label: { uz: "Frontend", en: "Frontend" },
    items: [
      { name: "HTML", logo: "html" },
      { name: "CSS", logo: "css" },
      { name: "JavaScript", logo: "javascript" },
    ],
  },
];

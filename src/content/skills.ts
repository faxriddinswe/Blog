import type { Localized } from "./types";

export type SkillScene =
  "code" | "agent-ring" | "chat" | "pipeline" | "database" | "terminal";

export interface SkillGroup {
  id: string;
  title: Localized;
  /** Which tiny live scene the bento card renders (brief §9 Skills). */
  scene: SkillScene;
  /** Concrete technologies. */
  items: string[];
}

// Groups follow the confirmed roles; the concrete tool lists are TODO(owner).
export const skillGroups: SkillGroup[] = [
  {
    id: "python",
    title: { uz: "Python muhandisligi", en: "Python engineering" },
    scene: "code",
    items: ["Python"], // TODO(owner): frameworks & libraries
  },
  {
    id: "ai-agents",
    title: { uz: "AI agentlar", en: "AI agents" },
    scene: "agent-ring",
    items: [], // TODO(owner): LLM providers, agent frameworks, tools
  },
  {
    id: "backend",
    title: { uz: "Backend arxitektura", en: "Backend architecture" },
    scene: "database",
    items: [], // TODO(owner): databases, queues, infra
  },
];

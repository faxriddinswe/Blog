import type { Localized } from "./types";

export interface Project {
  slug: string;
  name: string;
  tagline: Localized;
  problem?: Localized;
  solution?: Localized;
  result?: Localized;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Tall screenshot under /public/images/projects/ — it auto-scrolls inside the frame. */
  cover: string;
  /** Glow accent for the card. */
  accent: "warm" | "cool";
  /**
   * Demo placeholder, not a real project. Rendered with a visible "Demo" badge
   * and disabled links so nothing fake reads as a claim.
   */
  demo?: boolean;
}

// TODO(owner): replace these DEMO entries with real projects (owner asked for
// demos until the site is finished, 2026-11-12). Remove `demo: true` when real.
export const projects: Project[] = [
  {
    slug: "ai-sales-agent",
    name: "AI Sales Agent",
    demo: true,
    accent: "cool",
    cover: "/images/projects/demo-ai-agent.svg",
    tagline: {
      uz: "Telegram'da mijoz savollariga javob beradigan va lidlarni CRM'ga yozadigan agent.",
      en: "An agent that answers customers in Telegram and logs leads to the CRM.",
    },
    stack: ["Python", "FastAPI", "LLM", "RAG", "PostgreSQL"],
  },
  {
    slug: "order-bot-platform",
    name: "Order Bot Platform",
    demo: true,
    accent: "warm",
    cover: "/images/projects/demo-order-bot.svg",
    tagline: {
      uz: "Buyurtma qabul qiluvchi Telegram bot va admin panel.",
      en: "A Telegram ordering bot with an admin dashboard.",
    },
    stack: ["Python", "Django", "Redis", "PostgreSQL"],
  },
  {
    slug: "docs-assistant",
    name: "Docs Assistant",
    demo: true,
    accent: "cool",
    cover: "/images/projects/demo-docs-rag.svg",
    tagline: {
      uz: "Kompaniya ichki hujjatlari boʻyicha manbali javob beruvchi RAG yordamchi.",
      en: "A RAG assistant that answers from internal docs, with sources.",
    },
    stack: ["Python", "RAG", "MCP", "Docker"],
  },
  {
    slug: "workflow-api",
    name: "Workflow Automation API",
    demo: true,
    accent: "warm",
    cover: "/images/projects/demo-workflow.svg",
    tagline: {
      uz: "Takroriy jarayonlarni navbat va webhooklar orqali avtomatlashtiruvchi API.",
      en: "An API that automates repetitive work with queues and webhooks.",
    },
    stack: ["FastAPI", "Redis", "Docker", "Linux", "REST API"],
  },
];

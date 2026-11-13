import type { Localized } from "./types";

export type ServiceIcon =
  "agent" | "bot" | "server" | "workflow" | "knowledge" | "integration";

export interface Service {
  id: string;
  icon: ServiceIcon;
  title: Localized;
  description: Localized;
}

export interface ProcessStep {
  id: string;
  title: Localized;
  description: Localized;
}

// Confirmed by the owner (2026-11-12): the original four plus RAG assistants and integrations.
export const services: Service[] = [
  {
    id: "ai-agents",
    icon: "agent",
    title: { uz: "AI agentlar", en: "AI agents" },
    description: {
      uz: "Mijozlarga javob beradigan, maʼlumot yigʻadigan va vazifalarni oʻzi bajaradigan aqlli yordamchilar.",
      en: "Smart assistants that answer customers, gather data and complete tasks on their own.",
    },
  },
  {
    id: "telegram-bots",
    icon: "bot",
    title: { uz: "Telegram botlar", en: "Telegram bots" },
    description: {
      uz: "Buyurtma, toʻlov, CRM va xodimlar bilan ishlaydigan botlar.",
      en: "Bots for orders, payments, CRM and your team.",
    },
  },
  {
    id: "backend-systems",
    icon: "server",
    title: { uz: "Backend tizimlar", en: "Backend systems" },
    description: {
      uz: "Ishonchli API, toʻgʻri maʼlumotlar bazasi va kengayadigan arxitektura.",
      en: "Reliable APIs, sound databases and architecture that scales.",
    },
  },
  {
    id: "automation",
    icon: "workflow",
    title: { uz: "Avtomatlashtirish", en: "Automation" },
    description: {
      uz: "Qoʻlda bajariladigan takroriy ishlarni avtomatik jarayonlarga aylantirish.",
      en: "Turning repetitive manual work into automatic workflows.",
    },
  },
  {
    id: "rag-assistants",
    icon: "knowledge",
    title: { uz: "RAG / bilim bazasi", en: "RAG / knowledge base" },
    description: {
      uz: "Hujjatlaringiz asosida manbali javob beradigan ichki yordamchilar.",
      en: "Internal assistants that answer from your documents, with sources.",
    },
  },
  {
    id: "integrations",
    icon: "integration",
    title: { uz: "API integratsiyalar", en: "API integrations" },
    description: {
      uz: "CRM, toʻlov tizimlari va tashqi servislarni yagona tizimga ulash.",
      en: "Connecting CRMs, payment providers and third-party services into one system.",
    },
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    title: { uz: "Tahlil", en: "Discover" },
    description: {
      uz: "Jarayonlaringizni oʻrganamiz va eng koʻp vaqt olayotgan joyni topamiz.",
      en: "We study your workflows and find where the most time is lost.",
    },
  },
  {
    id: "design",
    title: { uz: "Loyihalash", en: "Design" },
    description: {
      uz: "Arxitektura, muddat va narxni aniq kelishib olamiz.",
      en: "We agree on architecture, timeline and price up front.",
    },
  },
  {
    id: "build",
    title: { uz: "Ishlab chiqish", en: "Build" },
    description: {
      uz: "Bosqichma-bosqich quraman va har bosqichda natijani koʻrsataman.",
      en: "I build in stages and show working results at every step.",
    },
  },
  {
    id: "launch",
    title: { uz: "Ishga tushirish", en: "Launch" },
    description: {
      uz: "Ishga tushiramiz, kuzatamiz va kerak boʻlsa yaxshilaymiz.",
      en: "We launch, monitor and improve where needed.",
    },
  },
];

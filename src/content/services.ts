import type { Localized } from "./types";

export type ServiceIcon =
  "agent" | "bot" | "server" | "workflow" | "integration" | "insight";

export interface Service {
  id: string;
  icon: ServiceIcon;
  title: Localized;
  description: Localized;
}

// Draft based on brief §4/§13 examples — awaiting owner confirmation (docs/OWNER-INPUTS.md).
export const services: Service[] = [
  {
    id: "ai-agents",
    icon: "agent",
    title: { uz: "AI agentlar", en: "AI agents" },
    description: {
      uz: "Biznes jarayonlaringizni oʻzi bajaradigan aqlli yordamchilar.",
      en: "Smart assistants that carry out your business workflows.",
    },
  },
  {
    id: "telegram-bots",
    icon: "bot",
    title: { uz: "Telegram botlar", en: "Telegram bots" },
    description: {
      uz: "Mijozlar, buyurtmalar va xodimlar bilan ishlaydigan botlar.",
      en: "Bots that handle customers, orders and teams.",
    },
  },
  {
    id: "backend-systems",
    icon: "server",
    title: { uz: "Backend tizimlar", en: "Backend systems" },
    description: {
      uz: "Ishonchli API va maʼlumotlar bazasi arxitekturasi.",
      en: "Reliable APIs and data architecture.",
    },
  },
  {
    id: "automation",
    icon: "workflow",
    title: { uz: "Avtomatlashtirish", en: "Automation" },
    description: {
      uz: "Qoʻl mehnatini talab qiladigan takroriy ishlarni avtomatlashtirish.",
      en: "Automating repetitive manual work.",
    },
  },
  // TODO(owner): confirm list and the remaining 2 services.
];

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
  /** Tall screenshot under /public/images/projects/; without one a branded placeholder shows. */
  cover?: string;
  year?: number;
  /** Glow accent for the card. */
  accent: "warm" | "cool";
  /** Placeholder, not a real project: "Demo" badge and no links. */
  demo?: boolean;
}

// Migrated from v1 js/projects.js (docs/MIGRATION.md). English taglines are
// the owner's v1 descriptions; Uzbek ones are direct translations of them.
// TODO(owner): live URLs, screenshots, problem/solution/result.
export const projects: Project[] = [
  {
    slug: "postflow",
    name: "Postflow",
    accent: "cool",
    year: 2026,
    stack: ["Python", "FastAPI"],
    githubUrl: "https://github.com/faxriddinswe/PostFlow",
    tagline: {
      uz: "Postlaringizni Telegram kanalingizga ulashadigan platforma.",
      en: "A platform where you share your posts to your Telegram channel.",
    },
  },
  {
    slug: "namoz-bot",
    name: "Namoz bot",
    accent: "warm",
    year: 2026,
    stack: ["Python"],
    githubUrl: "https://github.com/faxriddinswe/namoz_bot",
    tagline: {
      uz: "Namoz vaqtlarini Telegram akkauntingizga yuboradigan bot.",
      en: "A bot that shares prayer times to your Telegram account.",
    },
  },
  {
    slug: "caretrack-platform",
    name: "CareTrack platform",
    accent: "cool",
    year: 2026,
    stack: ["JavaScript", "React"],
    githubUrl: "https://github.com/faxriddinswe/CareTrack-platform",
    tagline: {
      uz: "Parvarish ehtiyojlaringizni kuzatib borish uchun platforma.",
      en: "A platform where you can track your care needs.",
    },
  },
  {
    slug: "daysleft",
    name: "DaysLeft",
    accent: "warm",
    year: 2025,
    stack: ["JavaScript"],
    githubUrl: "https://github.com/faxriddinswe/left-year-time",
    tagline: {
      uz: "Joriy yil tugashiga qolgan aniq vaqt va foizni koʻrsatadigan sodda veb-ilova.",
      en: "A clean, minimal web app showing the exact time and percentage left in the current year.",
    },
  },
  {
    slug: "techhouse-website",
    name: "TechHouse website",
    accent: "cool",
    year: 2025,
    stack: ["JavaScript"],
    githubUrl: "https://github.com/faxriddinswe/Tech-house-website",
    tagline: {
      uz: "Maishiy texnika doʻkoni sayti: oshxona, tozalash, isitish-sovutish va smart uy mahsulotlari.",
      en: "A store site for household appliances: kitchen, cleaning, heating & cooling and smart-home products.",
    },
  },
  {
    slug: "art-gallery",
    name: "Art gallery",
    accent: "warm",
    year: 2025,
    stack: ["HTML", "CSS"],
    githubUrl: "https://github.com/faxriddinswe/art_gallery",
    tagline: {
      uz: "Sanʼat asarlari rasmlari va tafsilotlarini koʻrsatadigan sodda veb-ilova.",
      en: "A clean, minimal web app showing art gallery images and their details.",
    },
  },
];

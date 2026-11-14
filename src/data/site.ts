import type { Locale } from "@/i18n/ui";

type L10n = Record<Locale, string>;

/** Owner profile. Every fact here is owner-confirmed — see TODO-CONTENT.md for gaps. */
export const site = {
  name: "Faxriddin Baxtiyorov",
  monogram: "FB",
  title: "Python Backend Engineer",
  url: "https://faxriddinswe.uz",
  email: "faxriddinbaxtiyorov077@gmail.com",
  resume: "/resume.pdf",
  /** Owner-confirmed: professional work since 2024 (shown as "2+"). */
  experienceYears: 2,
  location: { uz: "Toshkent, Oʻzbekiston", en: "Tashkent, Uzbekistan" } satisfies L10n,
} as const;

export type SocialId = "telegram" | "linkedin" | "github" | "x";

export const socials: { id: SocialId; label: string; href: string }[] = [
  { id: "telegram", label: "Telegram", href: "https://t.me/faxriddinswe" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/faxriddinswe/" },
  { id: "github", label: "GitHub", href: "https://github.com/faxriddinswe" },
  { id: "x", label: "X", href: "https://x.com/faxriddinswe" },
];

/** Where "Message on Telegram" and "Send a request" go (the owner's contact bot). */
export const telegramContact = "https://t.me/faxriddin_askbot";

export const channel = {
  name: "Faxriddin | Rasmiy Blog",
  handle: "@faxriddinswe",
  href: "https://t.me/faxriddinswe",
  /** Real recent posts from the channel (fetched 2026-11-15). Update by hand. */
  posts: [
    {
      text: "#Fikr Hop mana 2-kurs oʻqish boshlanganiga ham 1 oydan oshdi…",
      href: "https://t.me/faxriddinswe/223",
      date: "2026-11-12",
    },
    {
      text: "Soft skill bu — toʻgʻri vaqtda, toʻgʻri joyda, toʻgʻri odam bilan toʻgʻri gaplashishdir.",
      href: "https://t.me/faxriddinswe/219",
      date: "2026-11-05",
    },
    {
      text: "Aslida biz hamma narsani bilamiz, aybimiz bilgan narsamizni qilmasligimizdadir.",
      href: "https://t.me/faxriddinswe/218",
      date: "2026-11-04",
    },
  ],
};

export const medium = "https://medium.com/@faxriddinswe";

export const techStack: { label: L10n; items: string[] }[] = [
  { label: { uz: "Tillar", en: "Languages" }, items: ["Python", "SQL", "JavaScript", "HTML/CSS"] },
  {
    label: { uz: "Backend", en: "Backend" },
    items: ["FastAPI", "Django", "PostgreSQL", "Redis", "REST API"],
  },
  {
    label: { uz: "Botlar va AI", en: "Bots & AI" },
    items: ["Telegram bots", "LLM", "RAG", "MCP", "AI agents"],
  },
  { label: { uz: "Vositalar", en: "Tools" }, items: ["Docker", "Linux", "Git"] },
];

export const journey: { title: L10n; place?: L10n; date: L10n }[] = [
  {
    title: { uz: "Python Backend Engineer", en: "Python Backend Engineer" },
    date: { uz: "2026-yil oktabr — hozir", en: "Oct 2026 — Present" },
  },
  {
    title: { uz: "Software Engineering, bakalavr", en: "Software Engineering, BSc" },
    place: { uz: "PDP University, Toshkent", en: "PDP University, Tashkent" },
    date: { uz: "2025 — 2029", en: "2025 — 2029" },
  },
  {
    title: { uz: "Frilans va masofaviy backend ishlar", en: "Freelance & remote backend work" },
    place: {
      uz: "Startaplar va xorijiy kompaniyalar",
      en: "Startups and international companies",
    },
    date: { uz: "2024 — hozir", en: "2024 — Present" },
  },
];

export const communities = [
  {
    name: "UzGeeks Community",
    handle: "@UzGeeksCommunity",
    href: "https://t.me/UzGeeksCommunity",
    description: {
      uz: "Dasturchilar va texnologiya ishqibozlari birlashgan oʻzbek hamjamiyatining rasmiy kanali.",
      en: "The official channel of an Uzbek community of developers and tech enthusiasts.",
    },
    tags: [
      { uz: "Dasturlash", en: "Programming", color: "#4FC3F7" },
      { uz: "Hamjamiyat", en: "Community", color: "#7CD992" },
    ],
  },
  {
    name: "IT Community of Uzbekistan",
    handle: "@itcommunityuzb",
    href: "https://t.me/itcommunityuzb",
    description: {
      uz: "ITda oʻsish, ishlash, oʻqish, yangi tanishlar orttirish va birgalikda mahsulot yaratishga yordam beradigan hamjamiyat.",
      en: "A community that helps people grow in IT, find work, learn, meet new people and build great products together.",
    },
    tags: [
      { uz: "Karyera", en: "Career", color: "#FF9F5A" },
      { uz: "Networking", en: "Networking", color: "#B39DFF" },
    ],
  },
];

/** TODO(owner): hobbies — the section stays hidden while this is empty. */
export const hobbies: L10n[] = [];

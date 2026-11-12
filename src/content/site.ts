import type { Localized, SocialLink, Stat } from "./types";

/** Owner-confirmed identity facts (brief §4). Do not add unconfirmed facts here. */
export const site = {
  name: "Faxriddin Baxtiyorov",
  shortName: "Faxriddin",
  domain: "faxriddinswe.uz",
  location: { city: "Tashkent", timeZone: "Asia/Tashkent" },
  roles: ["Python Engineer", "AI Agent Builder", "Backend Architect"],
  education: {
    school: "PDP University",
    degree: {
      uz: "Dasturiy injiniring (bakalavr)",
      en: "Software Engineering (Bachelor)",
    } satisfies Localized,
    startYear: 2025,
    endYear: 2029,
  },
} as const;

export const stats: Stat[] = [
  {
    id: "years",
    value: 2,
    suffix: "+",
    label: { uz: "yillik tajriba", en: "years of experience" },
  },
  {
    id: "projects",
    value: 20,
    suffix: "+",
    label: { uz: "yakunlangan loyiha", en: "projects shipped" },
  },
];

// Owner chose these four to show publicly (2026-11-12).
// TODO(owner): URLs / handles — until then they render as "soon", never as fake links.
export const socials: SocialLink[] = [
  { kind: "github", label: "GitHub", href: null },
  { kind: "linkedin", label: "LinkedIn", href: null },
  { kind: "x", label: "X", href: null },
  { kind: "telegram", label: "Telegram bot", href: null },
];

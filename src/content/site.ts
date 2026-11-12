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
  // TODO(owner): more stats (projects shipped, bots built, …) — only confirmed numbers.
];

// TODO(owner): public social links. Empty until provided — UI hides missing ones.
export const socials: SocialLink[] = [];

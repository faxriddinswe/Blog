import type { Localized } from "./types";

export type TimelineKind = "work" | "freelance" | "project" | "education";

export interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  /** Neutral label only — never an employer name (brief §4). */
  title: Localized;
  context: Localized;
  start: number;
  /** `null` means ongoing. */
  end: number | null;
  summary?: Localized;
}

// Owner-confirmed (2026-11-12): since 2024, 20+ projects across freelance,
// remote work for international companies and backend roles at startups.
// Exact per-track dates were not given, so the tracks share one entry.
export const timeline: TimelineEntry[] = [
  {
    id: "backend-2024",
    kind: "work",
    title: { uz: "Backend muhandis", en: "Backend Engineer" },
    context: {
      uz: "Freelance · Xorijiy kompaniyalar (remote) · Startaplar",
      en: "Freelance · International companies (remote) · Startups",
    },
    start: 2024,
    end: null,
    summary: {
      uz: "20 dan ortiq loyiha: API va backend tizimlar, AI agentlar, avtomatlashtirish.",
      en: "20+ projects: APIs and backend systems, AI agents, automation.",
    },
  },
  {
    id: "pdp-university",
    kind: "education",
    title: { uz: "Dasturiy injiniring", en: "Software Engineering" },
    context: { uz: "PDP University · Bakalavr", en: "PDP University · Bachelor" },
    start: 2025,
    end: 2029,
  },
];

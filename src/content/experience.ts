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

export const timeline: TimelineEntry[] = [
  {
    id: "engineering-2024",
    kind: "work",
    title: { uz: "Python va backend muhandislik", en: "Python & backend engineering" },
    // TODO(owner): type of work (freelance / product company / personal projects); split into periods if needed.
    context: { uz: "TODO(owner)", en: "TODO(owner)" },
    start: 2024,
    end: null,
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

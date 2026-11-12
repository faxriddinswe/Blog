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
  // TODO(owner): work / freelance / personal-project entries that make up "3+ years".
  {
    id: "pdp-university",
    kind: "education",
    title: { uz: "Dasturiy injiniring", en: "Software Engineering" },
    context: { uz: "PDP University · Bakalavr", en: "PDP University · Bachelor" },
    start: 2025,
    end: 2029,
  },
];

import type { Locale } from "@/i18n/routing";

/** Copy that differs per locale. Every content file uses this instead of raw strings. */
export type Localized<T = string> = Record<Locale, T>;

export type SocialKind = "github" | "linkedin" | "x" | "telegram" | "email";

export interface SocialLink {
  kind: SocialKind;
  /** Full URL (mailto: for email). `null` until the owner provides it — UI shows "soon". */
  href: string | null;
  /** Visible name, e.g. "GitHub". */
  label: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  label: Localized;
}

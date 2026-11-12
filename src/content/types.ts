import type { Locale } from "@/i18n/routing";

/** Copy that differs per locale. Every content file uses this instead of raw strings. */
export type Localized<T = string> = Record<Locale, T>;

export type SocialKind = "github" | "linkedin" | "telegram" | "email";

export interface SocialLink {
  kind: SocialKind;
  /** Full URL (mailto: for email). */
  href: string;
  /** Visible handle, e.g. "@faxriddin". */
  label: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  label: Localized;
}

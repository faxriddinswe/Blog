"use client";

import { useTranslations } from "next-intl";

const KNOWN = [
  "nameMin",
  "nameMax",
  "phoneInvalid",
  "messageMin",
  "messageMax",
  "invalid",
  "rate_limited",
  "captcha",
  "delivery",
  "not_configured",
  "network",
] as const;
type ErrorKey = (typeof KNOWN)[number];

const isKnown = (code: string): code is ErrorKey =>
  (KNOWN as readonly string[]).includes(code);

/** Maps Zod message codes and API error codes to localized copy. */
export function useLeadErrors() {
  const t = useTranslations("Contact.errors");
  return (code: string | undefined) =>
    code ? t(isKnown(code) ? code : "invalid") : undefined;
}

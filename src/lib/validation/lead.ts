import { z } from "zod";

/**
 * Lead form contract — imported by the client form AND /api/lead, so the
 * server re-validates exactly what the browser checked (server is the source
 * of truth). Error messages are i18n keys under `Contact.errors`.
 */
export const BUSINESS_TYPES = [
  "ecommerce",
  "services",
  "education",
  "logistics",
  "startup",
  "other",
] as const;
export const BUDGETS = ["lt500", "500to1500", "1500to5000", "gt5000", "unknown"] as const;
export const TIMELINES = ["weeks", "month", "quarter", "flexible"] as const;

// Telegram @username (5–32 chars) or a phone number.
const CONTACT_RE = /^(@[A-Za-z0-9_]{5,32}|\+?[0-9][0-9\s()-]{6,19})$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "nameMin").max(80, "nameMax"),
  contact: z.string().trim().regex(CONTACT_RE, "contactInvalid"),
  businessType: z.enum(BUSINESS_TYPES, "businessRequired"),
  description: z.string().trim().min(20, "descriptionMin").max(2000, "descriptionMax"),
  // Unselected radio groups come through as null from the form, so accept null too.
  budget: z.enum(BUDGETS).nullish(),
  timeline: z.enum(TIMELINES).nullish(),
  locale: z.enum(["uz", "en"]),
  /** Honeypot — real users never see or fill it. */
  website: z.string().optional(),
  /** Cloudflare Turnstile token, only when the widget is enabled. */
  turnstileToken: z.string().optional(),
});

export type Lead = z.infer<typeof leadSchema>;
export type LeadInput = z.input<typeof leadSchema>;

/** Which fields each form step owns — used for per-step validation. */
export const LEAD_STEPS = [
  ["name", "contact"],
  ["businessType"],
  ["description"],
  ["budget", "timeline"],
] as const satisfies ReadonlyArray<ReadonlyArray<keyof LeadInput>>;

export type LeadErrorCode =
  "invalid" | "rate_limited" | "captcha" | "delivery" | "not_configured";
export type LeadResult = { ok: true } | { ok: false; error: LeadErrorCode };

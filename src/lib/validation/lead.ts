import { z } from "zod";

/**
 * Lead form contract — imported by the client form AND /api/lead, so the
 * server re-validates exactly what the browser checked (server is the source
 * of truth). Error messages are i18n keys under `Contact.errors`.
 *
 * Owner request (2026-11-12): one short form — full name, phone number and a
 * question / proposal (which business needs help). Replaces the 4-step form.
 */

// International or local phone: digits with optional +, spaces, dashes, brackets.
const PHONE_RE = /^\+?[0-9][0-9\s()-]{6,19}$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "nameMin").max(80, "nameMax"),
  phone: z.string().trim().regex(PHONE_RE, "phoneInvalid"),
  message: z.string().trim().min(10, "messageMin").max(2000, "messageMax"),
  locale: z.enum(["uz", "en"]),
  /** Honeypot — real users never see or fill it. */
  website: z.string().optional(),
  /** Cloudflare Turnstile token, only when the widget is enabled. */
  turnstileToken: z.string().optional(),
});

export type Lead = z.infer<typeof leadSchema>;
export type LeadInput = z.input<typeof leadSchema>;

export type LeadErrorCode =
  "invalid" | "rate_limited" | "captcha" | "delivery" | "not_configured";
export type LeadResult = { ok: true } | { ok: false; error: LeadErrorCode };

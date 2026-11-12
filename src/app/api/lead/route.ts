import { rateLimit } from "@/lib/rate-limit";
import { getTelegramConfig, sendLeadToTelegram } from "@/lib/telegram";
import { verifyTurnstile } from "@/lib/turnstile";
import { leadSchema, type LeadErrorCode, type LeadResult } from "@/lib/validation/lead";

function reply(result: LeadResult, status = 200) {
  return Response.json(result, { status });
}

function fail(error: LeadErrorCode, status: number) {
  return reply({ ok: false, error }, status);
}

function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/** POST /api/lead — validate → honeypot → rate limit → Turnstile → Telegram. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("invalid", 400);
  }

  // Honeypot filled: pretend success so bots learn nothing, but send nothing.
  if (typeof body === "object" && body !== null && "website" in body) {
    const trap = body.website;
    if (typeof trap === "string" && trap.trim() !== "") return reply({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return fail("invalid", 400);

  const ip = clientIp(request);
  if (!rateLimit(ip).ok) return fail("rate_limited", 429);

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const human = await verifyTurnstile(turnstileSecret, parsed.data.turnstileToken, ip);
    if (!human) return fail("captcha", 400);
  }

  const telegram = getTelegramConfig();
  if (!telegram) {
    console.error("[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set");
    return fail("not_configured", 503);
  }

  const sent = await sendLeadToTelegram(parsed.data, telegram);
  return sent ? reply({ ok: true }) : fail("delivery", 502);
}

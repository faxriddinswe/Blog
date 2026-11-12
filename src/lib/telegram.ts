import type { Lead } from "./validation/lead";

/** Telegram HTML parse_mode only needs these three escaped. */
export function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

// The message goes to the owner, who reads Uzbek; option codes map to readable labels.
const BUSINESS: Record<Lead["businessType"], string> = {
  ecommerce: "Onlayn savdo",
  services: "Xizmat koʻrsatish",
  education: "Taʼlim",
  logistics: "Logistika",
  startup: "Startap",
  other: "Boshqa",
};
const BUDGET: Record<NonNullable<Lead["budget"]>, string> = {
  lt500: "< $500",
  "500to1500": "$500 – $1 500",
  "1500to5000": "$1 500 – $5 000",
  gt5000: "> $5 000",
  unknown: "Hali bilmaydi",
};
const TIMELINE: Record<NonNullable<Lead["timeline"]>, string> = {
  weeks: "1–2 hafta",
  month: "1 oy",
  quarter: "2–3 oy",
  flexible: "Shoshilinch emas",
};

export function formatLeadMessage(lead: Lead, now = new Date()): string {
  const time = new Intl.DateTimeFormat("uz-UZ", {
    timeZone: "Asia/Tashkent",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(now);

  return [
    "🚀 <b>Yangi ariza — faxriddinswe.uz</b>",
    "",
    `👤 <b>Ism:</b> ${escapeHtml(lead.name)}`,
    `📱 <b>Aloqa:</b> ${escapeHtml(lead.contact)}`,
    `🏢 <b>Biznes turi:</b> ${BUSINESS[lead.businessType]}`,
    `💰 <b>Byudjet:</b> ${lead.budget ? BUDGET[lead.budget] : "—"}`,
    `⏱ <b>Muddat:</b> ${lead.timeline ? TIMELINE[lead.timeline] : "—"}`,
    "",
    `📝 <b>Vazifa:</b>\n${escapeHtml(lead.description)}`,
    "",
    `🌐 ${lead.locale.toUpperCase()} · 🕒 ${time} (Toshkent)`,
  ].join("\n");
}

export type TelegramConfig = { token: string; chatId: string };

export function getTelegramConfig(): TelegramConfig | null {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  return token && chatId ? { token, chatId } : null;
}

/** Sends the lead. Never logs the token — only status codes. */
export async function sendLeadToTelegram(
  lead: Lead,
  config: TelegramConfig,
): Promise<boolean> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: formatLeadMessage(lead),
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error(`[lead] telegram sendMessage failed: HTTP ${res.status}`);
    return res.ok;
  } catch (error) {
    console.error(
      "[lead] telegram request error:",
      error instanceof Error ? error.name : "unknown",
    );
    return false;
  }
}

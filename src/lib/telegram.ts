import type { Lead } from "./validation/lead";

/** Telegram HTML parse_mode only needs these three escaped. */
export function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function formatLeadMessage(lead: Lead, now = new Date()): string {
  const time = new Intl.DateTimeFormat("uz-UZ", {
    timeZone: "Asia/Tashkent",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(now);

  // The owner reads Uzbek, so labels are Uzbek regardless of the visitor's locale.
  return [
    "🚀 <b>Yangi ariza — faxriddinswe.uz</b>",
    "",
    `👤 <b>Ism familiya:</b> ${escapeHtml(lead.name)}`,
    `📱 <b>Telefon:</b> ${escapeHtml(lead.phone)}`,
    "",
    `💬 <b>Savol / taklif:</b>\n${escapeHtml(lead.message)}`,
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

#!/usr/bin/env node
/**
 * Prints the chat id(s) that recently messaged your bot.
 * 1) Put TELEGRAM_BOT_TOKEN in .env.local   2) Send /start to the bot
 * 3) pnpm telegram:chat-id   → copy the id into TELEGRAM_CHAT_ID
 * The token is read locally and never printed.
 */
import { readFileSync } from "node:fs";

const env = (() => {
  try {
    return readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  } catch {
    return "";
  }
})();
const token =
  process.env.TELEGRAM_BOT_TOKEN ?? env.match(/^TELEGRAM_BOT_TOKEN=(.*)$/m)?.[1]?.trim();
if (!token) {
  console.error("✗ TELEGRAM_BOT_TOKEN is missing in .env.local");
  process.exit(1);
}

const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const data = await res.json();
if (!data.ok) {
  console.error(`✗ Telegram error: ${data.description ?? res.status}`);
  process.exit(1);
}

const chats = new Map();
for (const u of data.result) {
  const chat = (u.message ?? u.edited_message ?? u.channel_post ?? u.my_chat_member)
    ?.chat;
  if (chat)
    chats.set(
      chat.id,
      chat.username ? `@${chat.username}` : (chat.title ?? chat.first_name ?? ""),
    );
}
if (!chats.size) {
  console.log(
    "No messages yet. Open your bot in Telegram, press Start / send any message, then rerun.",
  );
  process.exit(0);
}
for (const [id, who] of chats) console.log(`TELEGRAM_CHAT_ID=${id}   # ${who}`);

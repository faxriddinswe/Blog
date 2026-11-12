# Deployment

> Deploys, DNS and secrets are owner-approved actions. This file documents them; nothing here runs automatically.

## Environment variables

See `.env.example`. Copy it to `.env.local` locally (git-ignored) and set the same keys in Vercel → Project → Settings → Environment Variables.

| Key                              | Scope           | Required                        |
| -------------------------------- | --------------- | ------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | public          | yes (`https://faxriddinswe.uz`) |
| `TELEGRAM_BOT_TOKEN`             | **server only** | yes — lead delivery             |
| `TELEGRAM_CHAT_ID`               | **server only** | yes — where leads arrive        |
| `TURNSTILE_SECRET_KEY`           | **server only** | optional — enables server check |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | public          | optional — shows the widget     |

Secrets never get the `NEXT_PUBLIC_` prefix and are never logged (the API logs only HTTP status codes).

## Telegram bot (lead delivery)

1. **Bot.** In Telegram open `@BotFather` → `/newbot` (or use an existing bot) and copy the token.
   - A token that was ever pasted into a chat, issue or screenshot should be rotated: `@BotFather` → `/revoke` → pick the bot → use the new token.
2. **Token.** Put it in `.env.local`:
   ```bash
   TELEGRAM_BOT_TOKEN=123456:ABC...
   ```
3. **Chat id.** Open your bot in Telegram and press **Start** (or send any message). Then:
   ```bash
   pnpm telegram:chat-id
   # → TELEGRAM_CHAT_ID=123456789   # @yourname
   ```
   The script reads the token from `.env.local` and prints only chat ids. For a group: add the bot to the group, send a message there, rerun — group ids are negative.
4. Add `TELEGRAM_CHAT_ID=...` to `.env.local`, restart `pnpm dev`, submit the form on `/uz#contact`.
5. In production, set both variables in Vercel and redeploy.

Without these variables the form still works but answers with a friendly "form is being set up, write on Telegram" message (`503 not_configured`).

## `/api/lead` behaviour

| Case                              | Response                             |
| --------------------------------- | ------------------------------------ |
| Malformed JSON / schema fails     | `400 { ok:false, error:"invalid" }`  |
| Honeypot filled                   | `200 { ok:true }` (silently dropped) |
| > 5 requests / 10 min from one IP | `429 rate_limited`                   |
| Turnstile on and token invalid    | `400 captcha`                        |
| Telegram env missing              | `503 not_configured`                 |
| Telegram API failed               | `502 delivery`                       |
| Delivered                         | `200 { ok:true }`                    |

**Rate-limit limitation:** the limiter is in-memory per serverless instance, so on Vercel it is best-effort, not global. Combined with the honeypot (and optionally Turnstile) this is enough for a portfolio. Upgrade path: a shared store such as Upstash Redis / Vercel KV — may have costs, ask the owner first.

## Cloudflare Turnstile (optional)

Create a widget at Cloudflare → Turnstile, add `faxriddinswe.uz` (and `localhost` for testing), then set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`. The widget appears on the last form step only.

## Vercel + domain

Filled in during the Deploy phase: project import, `faxriddinswe.uz` apex + `www` → apex redirect, DNS records at the `.uz` registrar.

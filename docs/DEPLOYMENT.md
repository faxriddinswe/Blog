# Deployment

> Deploys, DNS and secrets are owner-approved actions. This file documents them; nothing here runs automatically.

## Environment variables

See `.env.example`. Copy to `.env.local` locally; set the same keys in Vercel → Project → Settings → Environment Variables.

| Key                              | Scope  | Required                        |
| -------------------------------- | ------ | ------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | public | yes (`https://faxriddinswe.uz`) |
| `TELEGRAM_BOT_TOKEN`             | server | yes (Contact phase)             |
| `TELEGRAM_CHAT_ID`               | server | yes (Contact phase)             |
| `TURNSTILE_SECRET_KEY`           | server | optional                        |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | public | optional                        |

## Vercel + domain

Filled in during the Deploy phase: project import, `faxriddinswe.uz` apex + `www` → apex redirect, DNS records at the `.uz` registrar.

## Telegram bot

Filled in during the Contact phase: BotFather setup, getting the chat id, testing delivery.

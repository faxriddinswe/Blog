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

1. **Bot.** Leads go to the owner's bot **@faxriddinswe_bot**. In Telegram open `@BotFather` → `/mybots` → `@faxriddinswe_bot` → _API Token_ and copy it.
   - A token that was ever pasted into a chat, issue or screenshot should be rotated: `@BotFather` → `/revoke` → pick the bot → use the new token.
2. **Token.** Put it in `.env.local`:
   ```bash
   TELEGRAM_BOT_TOKEN=123456:ABC...
   ```
3. **Chat id.** Open @faxriddinswe_bot in Telegram and press **Start** (or send any message). Then:
   ```bash
   pnpm telegram:chat-id
   # → TELEGRAM_CHAT_ID=123456789   # @yourname
   ```
   The script reads the token from `.env.local` and prints only chat ids. For a group: add the bot to the group, send a message there, rerun — group ids are negative.
4. Add `TELEGRAM_CHAT_ID=...` to `.env.local`, restart `pnpm dev`, submit the form on `/uz#contact` (full name, phone, question).
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

## Vercel: preview & go-live (Phase 08)

Current state: the Vercel project builds `main` as a **static site** (v1) and serves faxriddinswe.uz.

### Why nothing changes in the dashboard up front

`vercel.json` on `redesign` sets `"framework": "nextjs"`, which **overrides the dashboard Framework Preset per deployment** (Vercel docs: _vercel.json → framework_). So:

- deployments of `redesign` (Preview) build as Next.js;
- deployments of `main` (no `vercel.json`) keep building as the static v1 site;
- after the merge, `main` also has `vercel.json` → production builds as Next.js. No dashboard switch, no window where `main` is broken.

`installCommand`/`buildCommand` pin pnpm 12.18.0 through `npx`, so Vercel's own pnpm detection doesn't matter.

### Owner checklist

**Before the first preview push** (safe — does not affect production):

1. Vercel → Project → Settings → **Environment Variables**: add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` for **Preview** (and **Production** too — v1 ignores them). Optional: Turnstile keys. Use the _rotated_ bot token.
2. Settings → **Build & Deployment**: check that _Build Command_, _Output Directory_ and _Install Command_ have **no override toggled on**. If any is on, tell me before changing it (it would affect `main` too).
3. Settings → **Git**: confirm Preview deployments are enabled for non-production branches.

**Note (2026-11-13):** the Vercel project does not auto-build non-production branches, so the Preview was created with the CLI from the linked folder: `npx vercel deploy` (no `--prod`). `.vercelignore` keeps `.env*` out of the upload. Preview is behind Vercel Authentication; test it with `npx vercel curl <path> --deployment <url>`. Verified there: all pages 200, all v1 redirects 308, `/api/lead` → Telegram `{ ok: true }`.

**After pushing `redesign`:** open the Preview URL from the GitHub commit / Vercel dashboard; I test redirects, posts, form → Telegram, OG images there.

**Go-live** (only after explicit "ha"): merge `redesign` → `main` (`git merge --no-ff redesign`), push `main`. Vercel builds production as Next.js. Then verify faxriddinswe.uz, `www` → apex, a v1 URL like `/post.html?post=linux-1`.

### Rollback

- **Fastest:** Vercel → Deployments → previous production deployment (v1) → **Instant Rollback**.
- **In git:** `git revert -m 1 <merge-commit>` on `main` and push — rebuilds v1. Tag `v1-legacy` always points at the last v1 commit.

## Domain (post-launch)

Vercel currently redirects `faxriddinswe.uz → www.faxriddinswe.uz` (www is primary), but canonicals, hreflang and the sitemap use `https://faxriddinswe.uz`. To make them agree (brief §4: www → apex): Vercel → Project → Settings → **Domains** → on `faxriddinswe.uz` choose **Connect to an environment: Production** (no redirect), and on `www.faxriddinswe.uz` set **Redirect to `faxriddinswe.uz` (308)**. Do **not** add a redirect for this in `next.config.ts` — that is what looped on launch day.

## Vercel + domain

Filled in during the Deploy phase: project import, `faxriddinswe.uz` apex + `www` → apex redirect, DNS records at the `.uz` registrar.

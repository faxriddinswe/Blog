# faxriddinswe.uz

Personal portfolio + blog of **Faxriddin Baxtiyorov** — Python Engineer · AI Agent Builder · Backend Architect.

Bilingual (Uzbek default, English), motion-heavy, built to hit Lighthouse 90+.

## Quick start

```bash
corepack enable          # or: npm i -g pnpm  (one-time, provides pnpm 12)
pnpm install
cp .env.example .env.local
pnpm dev                 # http://localhost:3000 → redirects to /uz
```

## Scripts

| Command                        | What it does                                                        |
| ------------------------------ | ------------------------------------------------------------------- |
| `pnpm dev`                     | Dev server (Turbopack)                                              |
| `pnpm build` / `pnpm start`    | Production build / serve                                            |
| `pnpm lint`                    | ESLint                                                              |
| `pnpm typecheck`               | `next typegen` + `tsc --noEmit`                                     |
| `pnpm check:i18n`              | Verifies `uz.json` / `en.json` keys match                           |
| `pnpm check`                   | i18n + lint + typecheck                                             |
| `pnpm format`                  | Prettier                                                            |
| `pnpm qa:shots [url] [outDir]` | Screenshots at 375 / 1440 / reduced motion; fails on console errors |

## Docs

- [Architecture](docs/ARCHITECTURE.md)
- [Design system](docs/DESIGN-SYSTEM.md)
- [Motion guide](docs/MOTION-GUIDE.md)
- [Content guide](docs/CONTENT-GUIDE.md) — add projects, posts, translations
- [Deployment](docs/DEPLOYMENT.md)
- [Owner inputs](docs/OWNER-INPUTS.md) — what's still missing
- Project brief: [CLAUDE.md](CLAUDE.md)

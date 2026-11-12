# Owner inputs — live checklist

Everything the site still needs from Faxriddin. Code marks each gap with `TODO(owner)`
(`grep -rn "TODO(owner)" src`). Tick items as they arrive.

| #   | Item                                                                                   | Where it goes                                        | Needed by      | Status                                                                                                                                                                   |
| --- | -------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Portrait photo                                                                         | `public/images/portrait/`                            | Hero           | ✅ Only photo available (owner, 2026-11-12). Enhanced locally: denoise + EDSR ×2 upscale (1280px) + BiRefNet cut-out                                                     |
| 2   | Second photo for About (optional)                                                      | —                                                    | About          | ✅ None exists — About reuses the portrait as a halftone duotone                                                                                                         |
| 3   | Short bio UZ/EN                                                                        | `src/i18n/messages/*.json` → `About.bio`             | About          | 🟡 Drafted by us from confirmed facts (owner delegated, 2026-11-12) — owner may edit any time                                                                            |
| 4   | Experience timeline                                                                    | `src/content/experience.ts`                          | Experience     | ✅ Since 2024: freelance, remote for international companies, backend at startups. Per-track dates not given — shown as one entry                                        |
| 5   | Extra stats                                                                            | `src/content/site.ts`                                | About          | ✅ 20+ projects                                                                                                                                                          |
| 6   | Tech stack                                                                             | `src/content/skills.ts`                              | Skills         | ✅ Python, PostgreSQL, AI agent tools, FastAPI, Django, Linux, HTML/CSS/JS, LLM, agentic coding, MCP, RAG, Docker, REST API, Redis                                       |
| 7   | Projects: name, tagline, problem/solution/result, stack, live URL, GitHub, screenshots | `src/content/projects.ts`, `public/images/projects/` | Projects       | 🟡 4 DEMO projects (owner asked, 2026-11-12) with SVG mock screenshots, "Demo" badge, no links. Replace after final review                                               |
| 8   | Public socials                                                                         | `src/content/site.ts`                                | Footer/Contact | ✅ github.com/faxriddinswe, linkedin.com/in/faxriddinswe, x.com/faxriddinswe, t.me/faxriddin_askbot                                                                      |
| 9   | Services list                                                                          | `src/content/services.ts`                            | Services       | ✅ 4 originals + RAG assistants + API integrations (confirmed)                                                                                                           |
| 10  | CV.pdf (optional)                                                                      | `public/cv/`                                         | About          | ⬜                                                                                                                                                                       |
| 11  | Telegram bot token + chat id                                                           | `.env.local` (owner)                                 | Contact        | 🟡 Delivery bot: **@faxriddinswe_bot**. Owner to put its token in `.env.local` (rotate via `/revoke` if it was ever pasted in chat); chat id via `pnpm telegram:chat-id` |

## Confirmed facts (do not change without owner)

- Name: Faxriddin Baxtiyorov
- Roles: Python Engineer · AI Agent Builder · Backend Architect
- Headline: **2+ years of experience** — professional work since 2024 (owner correction, 2026-11-12; replaces the earlier "3+")
- Education: PDP University, Software Engineering (Bachelor), 2025–2029
- 20+ projects since 2024 — freelance, remote for international companies, backend engineer at startups
- No employer/company names anywhere

## Demo content to replace before launch

- 4 demo projects (`src/content/projects.ts`, `demo: true`)
- 2 demo blog posts (`src/content/blog/*/`, `demo: true`)
- Bio draft (`About.bio`) — owner to review

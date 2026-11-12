# Owner inputs — live checklist

Everything the site still needs from Faxriddin. Code marks each gap with `TODO(owner)`
(`grep -rn "TODO(owner)" src`). Tick items as they arrive.

| #   | Item                                                                                   | Where it goes               | Needed by      | Status                                                                                           |
| --- | -------------------------------------------------------------------------------------- | --------------------------- | -------------- | ------------------------------------------------------------------------------------------------ |
| 1   | Portrait photo (transparent PNG preferred, ≥1600px tall)                               | `public/images/portrait/`   | Hero           | 🟡 640×640 JPG received, background removed locally. Higher-res original (sent as _file_) wanted |
| 2   | Second photo for About (optional)                                                      | `public/images/portrait/`   | About          | ⬜                                                                                               |
| 3   | Short bio UZ/EN — or bullet facts to draft from                                        | `src/i18n/messages/*.json`  | About          | ⬜                                                                                               |
| 4   | Experience: type of work per period (freelance / product company / personal projects)  | `src/content/experience.ts` | Experience     | 🟡 2024 → present confirmed; type of work missing                                                |
| 5   | Extra stats (only confirmed numbers)                                                   | `src/content/site.ts`       | About          | ⬜                                                                                               |
| 6   | Concrete tech stack per skill group                                                    | `src/content/skills.ts`     | Skills         | ⬜                                                                                               |
| 7   | Projects: name, tagline, problem/solution/result, stack, live URL, GitHub, screenshots | `src/content/projects.ts`   | Projects       | ⬜                                                                                               |
| 8   | Public socials: GitHub, LinkedIn, Telegram, email                                      | `src/content/site.ts`       | Footer/Contact | ⬜                                                                                               |
| 9   | Confirm services + 2 more (draft has 4)                                                | `src/content/services.ts`   | Services       | ⬜                                                                                               |
| 10  | CV.pdf (optional)                                                                      | `public/cv/`                | About          | ⬜                                                                                               |
| 11  | Telegram bot token + chat id (owner sets in `.env.local` himself)                      | `.env.local`                | Contact        | ⬜                                                                                               |

## Confirmed facts (do not change without owner)

- Name: Faxriddin Baxtiyorov
- Roles: Python Engineer · AI Agent Builder · Backend Architect
- Headline: **2+ years of experience** — professional work since 2024 (owner correction, 2026-11-12; replaces the earlier "3+")
- Education: PDP University, Software Engineering (Bachelor), 2025–2029
- No employer/company names anywhere

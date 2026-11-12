# Owner inputs — live checklist

Everything the site still needs from Faxriddin. Code marks each gap with `TODO(owner)`
(`grep -rn "TODO(owner)" src`). Tick items as they arrive.

| #   | Item                                                                                       | Where it goes                                        | Needed by phase | Status |
| --- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------- | --------------- | ------ |
| 1   | Portrait photo (transparent PNG preferred, ≥1600px tall)                                   | `public/images/portrait/`                            | Hero            | ⬜     |
| 2   | Second photo for About (optional)                                                          | `public/images/portrait/`                            | About           | ⬜     |
| 3   | Short bio UZ/EN — or bullet facts to draft from                                            | `src/i18n/messages/*.json`                           | About           | ⬜     |
| 4   | Experience timeline backing "3+ years" (start year, type of work — no company names)       | `src/content/experience.ts`                          | Experience      | ⬜     |
| 5   | Extra stats (only confirmed numbers)                                                       | `src/content/site.ts` → `stats`                      | About           | ⬜     |
| 6   | Concrete tech stack per skill group                                                        | `src/content/skills.ts`                              | Skills          | ⬜     |
| 7   | Projects: name, tagline, problem/solution/result, stack, live URL, GitHub URL, screenshots | `src/content/projects.ts`, `public/images/projects/` | Projects        | ⬜     |
| 8   | Public socials: GitHub, LinkedIn, Telegram, email                                          | `src/content/site.ts` → `socials`                    | Footer/Contact  | ⬜     |
| 9   | Confirm services + 2 more (draft has 4)                                                    | `src/content/services.ts`                            | Services        | ⬜     |
| 10  | CV.pdf (optional)                                                                          | `public/cv/`                                         | About           | ⬜     |
| 11  | Telegram bot token + chat id (owner sets in `.env.local` himself)                          | `.env.local`                                         | Contact         | ⬜     |

## Confirmed facts (do not change without owner)

- Name: Faxriddin Baxtiyorov
- Roles: Python Engineer · AI Agent Builder · Backend Architect
- Headline: 3+ years of experience
- Education: PDP University, Software Engineering (Bachelor), 2025–2029
- No employer/company names anywhere

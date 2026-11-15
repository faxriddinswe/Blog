# faxriddinswe.uz

Personal portfolio of Faxriddin Baxtiyorov, a Python Backend Engineer. It is a static, bilingual (uz/en) Astro site with dark and light themes.

## Requirements

- Node **≥ 22.23.4**, which Astro 7 needs. Node 26 LTS is recommended.
- pnpm 12.

## Commands

```bash
pnpm install            # install dependencies
pnpm dev                # dev server → http://localhost:4321
pnpm build              # type-check (astro check) + static build → dist/
pnpm preview            # serve dist/ → http://localhost:4321

pnpm test:e2e           # Playwright e2e + axe (needs `pnpm preview` running or starts it)
pnpm qa:shots           # screenshots: pages × widths × themes × languages → qa/screenshots/
pnpm qa:links           # internal + external link check over dist/
pnpm qa:lighthouse      # Lighthouse mobile on every page (needs `pnpm preview`)
pnpm assets             # regenerate public/og.png and icons
```

Playwright uses the installed Google Chrome (`channel: "chrome"`). Set `CHROME_PATH` to use a different binary.

## Where content lives

| What | File |
|---|---|
| Profile, socials, tech stack, journey, communities, Telegram posts, hobbies | `src/data/site.ts` |
| Projects | `src/data/projects.json` |
| Certificates (+ images in `src/assets/certificates/`) | `src/data/certificates.json` |
| Offer letters (+ images in `src/assets/offers/`) | `src/data/offers.json` |
| Courses | `src/data/courses.json` |
| Lectures (YouTube) | `src/data/lectures.json` |
| Medium / LinkedIn articles | `src/data/articles.ts` |
| Interface strings (uz/en) | `src/i18n/ui.ts` |
| Resume PDF | `public/resume.pdf` |
| Raw uploads from the owner | `content/` |

How to add things, in Uzbek: [CONTENT-GUIDE.md](CONTENT-GUIDE.md). What is still missing: [TODO-CONTENT.md](TODO-CONTENT.md).

## Docs

- [ARCHITECTURE.md](ARCHITECTURE.md): stack, structure, i18n, theme and accessibility decisions.
- [TRANSLATIONS.md](TRANSLATIONS.md): every string in both languages, with its source.
- [QA-REPORT.md](QA-REPORT.md): latest test, accessibility and Lighthouse results.
- [PROGRESS.md](PROGRESS.md): current state and open questions.

## Deploy

Vercel serves `dist/` as static output (see `vercel.json`). Pushing or merging to `main` deploys to production. Only do that after the owner approves.

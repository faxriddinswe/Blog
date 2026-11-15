# QA Report: portfolio-v2

Date: 2026-11-15.
Build: local `pnpm build && pnpm preview` (static `dist/`).
Browser: Google Chrome via Playwright 1.65.

**Overall status:** every automated gate passes. Sign-off is held only for the open owner items listed at the end.

## Gates

| Check | Result |
|---|---|
| `pnpm build` (astro check + build) | ✅ 0 errors, 0 warnings, 0 hints; 18 pages |
| E2E + axe (`pnpm test:e2e`) | ✅ **52 / 52 passed** (desktop Chrome + Pixel 7) |
| axe-core, WCAG 2.0/2.1/2.2 A + AA | ✅ 0 serious/critical on all 16 pages × dark + light |
| Screenshots, portrait | ✅ 448 shots: 8 pages × 14 widths × 2 themes × 2 languages; no horizontal overflow, no broken images |
| Screenshots, landscape | ✅ 176 shots: 8 pages × 11 phone/tablet widths × 2 languages, dark theme; no overflow |
| Internal links | ✅ all resolve (18 pages) |
| External links | ⚠️ 45 unique, 41 OK; see below |
| Lighthouse, mobile | ✅ Performance min **95**, Accessibility min **100**, Best Practices min **100**, SEO min **100** |
| Employer name in build output | ✅ no `worksFor` / employer field anywhere; the owner hasn't named the employer for a text grep (see TODO-CONTENT.md) |
| Unique `<title>` / description per page and language | ✅ no duplicates |

### Screenshot widths

- **Portrait:** 320, 360, 375, 390, 412, 414, 430, 768, 820, 834, 1024, 1280, 1440, 1920.
- **Landscape:** phone and tablet widths only (the 11 widths up to 1024).
- **Manual visual review:** contact sheets at 320 (dark, uz), 768 (light, en), 1440 (dark and light) and 844×390 landscape.

## What the E2E suite covers (`tests/site.spec.ts`)

**Every page, both languages:**
- exactly one `<h1>`;
- `<html lang>` matches the language;
- the title is set;
- every image has an `alt`;
- no console errors;
- every external link has `target="_blank"` and `rel="noopener noreferrer"`;
- axe passes in both themes.

**Root `/`:**
- `en-US` → `/en`, `uz-UZ` → `/uz`, `ru-RU` → `/uz`;
- a saved language choice wins over the browser language.

**Language switch:** keeps the current page (desktop segmented control and the mobile sheet).

**Theme:**
- the first visit follows the system setting;
- the toggle's choice persists after a reload, with no flash.

**Desktop navigation:**
- nav links go to the right page and set `aria-current`;
- the Learning dropdown works with the mouse (including outside click) and with the keyboard (↓/↑, Esc returns focus, Enter).

**Mobile menu:**
- opens and traps focus (20 × Tab stays inside);
- closes on Esc (focus returns to the button), on a backdrop tap and on a link click.

**Lightbox:** opens a full-size image that has loaded; Esc closes it and focus returns.

**Resume:** opens in a new tab and has no `download` attribute (owner request).

**Status codes:** `/resume.pdf` returns 200 and unknown URLs return 404.

## Lighthouse (mobile, default throttling)

| Page | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/uz` | 95 | 100 | 100 | 100 | 0.8 s | 2.9 s | 0 ms | 0 |
| `/uz/about` | 97 | 100 | 100 | 100 | 0.9 s | 2.6 s | 10 ms | 0 |
| `/uz/projects` | 96 | 100 | 100 | 100 | 0.8 s | 0.8 s | 220 ms | 0 |
| `/uz/blog` | 100 | 100 | 100 | 100 | 0.8 s | 0.8 s | 0 ms | 0 |
| `/uz/lectures` | 96 | 100 | 100 | 100 | 0.8 s | 2.7 s | 0 ms | 0 |
| `/uz/courses` | 100 | 100 | 100 | 100 | 0.8 s | 0.8 s | 0 ms | 0 |
| `/uz/certificates` | 98 | 100 | 100 | 100 | 0.8 s | 2.5 s | 20 ms | 0.023 |
| `/uz/offer-letters` | 97 | 100 | 100 | 100 | 0.8 s | 2.6 s | 0 ms | 0 |
| `/en` | 97 | 100 | 100 | 100 | 0.8 s | 2.6 s | 0 ms | 0 |
| `/en/about` | 99 | 100 | 100 | 100 | 0.9 s | 2.1 s | 20 ms | 0 |
| `/en/projects` | 100 | 100 | 100 | 100 | 0.8 s | 0.8 s | 60 ms | 0 |
| `/en/blog` | 100 | 100 | 100 | 100 | 0.8 s | 0.8 s | 10 ms | 0 |
| `/en/lectures` | 97 | 100 | 100 | 100 | 0.8 s | 2.6 s | 0 ms | 0 |
| `/en/courses` | 100 | 100 | 100 | 100 | 0.8 s | 0.8 s | 0 ms | 0 |
| `/en/certificates` | 95 | 100 | 100 | 100 | 0.8 s | 2.9 s | 80 ms | 0 |
| `/en/offer-letters` | 97 | 100 | 100 | 100 | 0.8 s | 2.6 s | 10 ms | 0 |

**bf-cache:** this audit fails locally because `astro preview` sends `Cache-Control: no-store`. It does not affect the score. Re-check it on the Vercel preview.

## External links not OK

All four are bot protection; the pages open fine in a browser.

- `403 https://medium.com/@faxriddinswe` and both article URLs: Medium blocks scripted requests. The article URLs come from Medium's own RSS feed.
- `999 https://www.linkedin.com/in/faxriddinswe/`: LinkedIn blocks scripted requests. The five post URLs resolved through the owner's links and returned 200 with a browser user agent.

## Fixed during QA

- **Brand link:** the accessible name did not match the visible text (axe `label-content-name-mismatch`). The extra `aria-label` was removed.
- **Project cover links:** they were duplicate links with mismatched names. They are now `aria-hidden` mouse shortcuts, and the labelled buttons remain.
- **Course monograms:** contrast was below AA for the PDP, Ibrat and 42.uz colours in both themes. The brand colours are now mixed toward white (dark theme) or black (light theme).
- **Phones narrower than 380px:** the header name was truncated with "…". Below 380px the name is now smaller, and below 340px only the FB mark shows.
- **Long project names:** they overlapped the cover icon. The cover is now a column layout, the name is limited to 2 lines and the stack to 1 row.

## Not signed off yet (owner input needed)

See TODO-CONTENT.md.

- **Offer-letter images:** they are not in git, so a clean checkout, including the one on Vercel, fails to build until the owner decides.
- **Resume:** `public/resume.pdf` is the old CV. The new upload is corrupted.

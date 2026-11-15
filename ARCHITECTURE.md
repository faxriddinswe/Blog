# Architecture — faxriddinswe.uz (portfolio-v2)

## Stack and why

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Astro 7.4** (static output) | The site is content + links, no server. Astro ships zero JS by default, has typed content collections and a built-in image pipeline. |
| Styling | Plain CSS + custom properties | The spec is token-driven (exact px, radii, two themes). One `global.css` with tokens and scoped component styles is smaller and clearer than a utility framework here. Tailwind was dropped. |
| Font | Inter 400–800 via `@fontsource/inter` | Self-hosted, `font-display: swap`, latin + latin-ext (Uzbek oʻ gʻ). |
| Icons | Inline SVG: Lucide paths (ISC) + Simple Icons (CC0) | No icon font, no runtime. LinkedIn is not in Simple Icons and is drawn in `Icon.astro`. |
| Images | `astro:assets` `<Picture>` → AVIF + WebP, srcset | Explicit sizes prevent layout shift. Lightbox uses a 1600px WebP. |
| Tests | Playwright + @axe-core/playwright, Lighthouse 13 | See QA-REPORT.md. |
| Host | Vercel, static `dist/` | `vercel.json`: `cleanUrls`, no trailing slash, redirects, security headers. |

Runtime requirements: Node ≥ 22.23.4 (Astro 7) and pnpm 12. Use TypeScript 6, because `astro check` rejects TypeScript 7.

## Folder structure

```
content/                 raw owner uploads (txt templates, images) — source, not served
src/
  assets/                images processed by astro:assets (portrait, banners, certificates, offers*)
  components/            Header, Footer, Icon, PageIntro, SocialButtons,
                         ProjectCard, ContactBand, Lightbox, ZoomImage
  content.config.ts      typed collections (zod): projects, certificates, offers, courses, lectures
  data/                  *.json for the collections + site.ts (profile) + articles.ts
  i18n/ui.ts             locales, all UI strings (uz/en), localePath(), formatDate()
  layouts/Base.astro     <head> (SEO, hreflang, OG, theme pre-paint), header, footer
  pages/index.astro      "/" → language redirect (client-side)
  pages/[lang]/*.astro   8 pages × uz/en via getStaticPaths
  pages/404.astro
  styles/global.css      tokens (dark/light), base, buttons, chips
public/                  resume.pdf, og.png, favicons, robots.txt, manifest
scripts/brand-assets.mjs regenerates og.png + icons with real Inter (Chrome render)
qa/                      shoot.mjs (screenshots), links.mjs, lighthouse.mjs
tests/site.spec.ts       e2e + axe
```

`src/assets/offers/` and its source images are git-ignored until the owner approves publishing them. While they are missing the build fails.

## i18n

- Routes are `/uz/...` and `/en/...`, with no trailing slash. The 404 page is shared by both languages.
- `/` is a static page with a tiny inline script. It picks the language in this order:
  1. the saved choice in `localStorage.lang`, set when the visitor clicks the language switch;
  2. the first `uz*` or `en*` entry in `navigator.languages`;
  3. Uzbek as the default.

  Without JS, a meta refresh sends the visitor to `/uz`. This is the owner's decision (2026-11-14): detect the browser language on the first visit, then remember the choice.
- The language switch links to the same page in the other language.
- `hreflang` alternates are uz, en and x-default (uz).
- All strings live in `src/i18n/ui.ts`. Its type makes a missing key a build error. Content fields are `{ uz, en }` objects validated by zod.

## Theme

The default is the system preference, or dark if there is none. A blocking inline script in `<head>` sets `data-theme` before first paint. The toggle saves the choice in `localStorage.theme`. Colours transition over 0.3s with `cubic-bezier(.4,0,.2,1)`, and this is disabled under `prefers-reduced-motion`.

## JavaScript shipped

Only the Header script (theme, language memory, Learning dropdown, mobile `<dialog>` sheet) and the Lightbox script (`<dialog>`), plus the inline theme and root-language snippets. No framework runtime.

## Accessibility decisions

- The mobile menu and lightbox are modal `<dialog>`s, which give native focus trapping and Esc. Clicking the backdrop closes them, and focus returns to the opener.
- The dropdown is a disclosure button with `aria-expanded`. Arrow keys, Home/End and Esc work, and it closes on outside click or when focus leaves.
- Project and article covers are mouse shortcuts (`aria-hidden`, `tabindex=-1`). The real, labelled links are the buttons under them.
- Accent-as-text uses `--accent-text`, which is darker in the light theme (#0E7A4F) for AA contrast. Mint `#3DDC97` is used for fills and lines.

## Decisions that differ from the brief

- **Experience is "2+ years"**, not "3+". The owner made this correction twice.
- **Project and article banners are CC0 / public-domain photos** from Openverse, picked to match each title (owner request, 2026-11-15). Google Images results are copyrighted, so they were not used. Credits are in `src/data/banner-credits.json`. Real project screenshots should replace them later.
- **Projects and Blog are one list each.** The owner removed the Personal/Freelance and Medium/LinkedIn tiles, so the type or platform now shows on each card.
- **The resume button opens the PDF in a new tab** ("View Resume") instead of downloading it. On phones the button order is "Learn more about me", then "View Resume".
- **The portrait is the owner's original photo with its background.** It was upscaled 2× with the EDSR super-resolution model and sharpened slightly.
- **The hobbies section is hidden** while the list is empty.
- **The IELTS report and the HarvardX "PREVIEW" image are excluded** because of personal data and because it is not an issued certificate. See PROGRESS.md.

# Content guide

## Golden rule

Never put copy inside components. UI text → `src/i18n/messages/*.json`; facts and lists → `src/content/*.ts`.

## Uzbek typography

Use the proper modifier letters: **oʻ gʻ** with `ʻ` (U+02BB) and the tutuq belgisi `ʼ` (U+02BC), e.g. `maʼlumot`. Not `'` or `` ` ``.

## Add / change a UI string

1. Add the key to **both** `src/i18n/messages/uz.json` and `en.json`.
2. Use it: `const t = useTranslations("Hero"); t("ctaApply")` (server or client).
3. `pnpm check:i18n` — fails if the files diverge. `pnpm typecheck` — fails on unknown keys.

## Add a project

Edit `src/content/projects.ts`:

```ts
{
  slug: "my-bot",
  name: "My Bot",
  tagline: { uz: "…", en: "…" },
  stack: ["Python", "aiogram"],
  liveUrl: "https://…",
  githubUrl: "https://github.com/…",
  cover: "/images/projects/my-bot.webp",
}
```

Put screenshots in `public/images/projects/`. They drift vertically inside the card window, so use a **tall** capture (ideally 1200×2100, PNG/WebP) — other sizes work but the drift distance assumes 1200×2100. Set `accent: "warm" | "cool"`.

Current entries are **demo placeholders** (`demo: true` → "Demo" badge, links hidden). For a real project, remove `demo`, add `liveUrl` / `githubUrl`; missing links simply show "Link coming soon".

## Socials

`src/content/site.ts` → `socials`. Set `href` to the full URL; `null` renders a disabled "soon" item.

## Skills & marquee

`src/content/skills.ts` → `skillGroups`. Each group has a bento `size` (`wide | tall | small`) and a `scene`. The tech marquee is generated from all `items`, so adding a tool there updates both.

## Technologies (logo section)

`src/content/technologies.ts` → categories with `label` and items `{ name, logo }`. Add a logo key in `components/sections/technologies/logos.ts`: import the Simple Icons export (`si<Name>`, CC0) or draw a 24×24 stroke glyph. Only logos are shown; `name` is the accessible label and tooltip.

## Bio & stats

Bio: `About.bio` in both message files (one paragraph — it is revealed word by word). Stats: `stats` in `src/content/site.ts` — only owner-confirmed numbers.

## Add a timeline entry

`src/content/experience.ts` → `timeline`. Use neutral labels (“Python Engineer — product company”), never employer names.

## Blog posts

1. Create `src/content/blog/uz/<slug>.mdx` and/or `src/content/blog/en/<slug>.mdx` (same slug = translations).
2. Start the file with:
   ```mdx
   export const metadata = {
     title: "…",
     description: "…",
     date: "2026-11-12",
     readingMinutes: 5,
     tags: ["AI agents"],
   };
   ```
   Add `demo: true` only for placeholder posts.
3. Register the slug in `src/content/blog/index.ts` for each locale that has it.
4. Write Markdown/MDX below. Code fences with a language (` ```python `) are highlighted; tables work (GFM).
5. `pnpm build` validates the metadata.

The two current posts are **demo** articles (owner request) — remove `demo: true` or delete them when real posts exist.

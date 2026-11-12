# v1 → v2 migration

v1 (static HTML on `main`, live at faxriddinswe.uz) is preserved in tag **`v1-legacy`** and was merged into `redesign` (`git merge --allow-unrelated-histories`), so `redesign` descends from `main` and go-live is a normal merge. v1 files stay in the repo root until migration is verified, excluded from lint/format.

## Files: old → new

| v1 path                                                                                                         | v2 destination                                                   | Status       |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------ |
| `posts/*.md` (7)                                                                                                | `src/content/blog/uz/<slug>.mdx`                                 | ⬜ Phase 07  |
| `js/posts.js` (metadata)                                                                                        | MDX `metadata` export per post                                   | ⬜ Phase 07  |
| `posts/images/*`                                                                                                | `public/blog/images/*`                                           | ⬜ Phase 07  |
| `images/profile.jpg` (960×1280, with background)                                                                | candidate hero portrait source (higher-res than the current one) | ⬜ ask owner |
| `cv.pdf`                                                                                                        | `public/cv/cv.pdf`                                               | ⬜ Phase 07  |
| `js/projects.js` (6)                                                                                            | `src/content/projects.ts` (replaces the 4 demo projects)         | ⬜ Phase 07  |
| `js/lectures.js`, `lectures.html` (2 YouTube lectures)                                                          | keep as a section, or drop                                       | ❓ owner     |
| `index.html`, `blog.html`, `post.html`, `building.html`, `resume.html`, `css/`, `js/nav.js`, `js/marked.min.js` | deleted after migration is verified                              | ⬜ Phase 07  |
| `.gitattributes` (`*.mp4` via LFS)                                                                              | kept                                                             | ✅           |

## Redirects (permanent, `next.config.ts`)

v1 post links are `post.html?post=<slug>` (param read in `post.html`: `URLSearchParams(location.search).get("post")`).

| Old URL                  | New URL                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `/index.html`            | `/uz`                                                                                          |
| `/blog.html`             | `/uz/blog`                                                                                     |
| `/post.html?post=<slug>` | `/uz/blog/<slug>` (`has: [{ type: "query", key: "post" }]` — syntax to verify in Next 16 docs) |
| `/post.html` (no param)  | `/uz/blog`                                                                                     |
| `/building.html`         | `/uz#projects`                                                                                 |
| `/resume.html`           | `/cv/cv.pdf`                                                                                   |
| `/cv.pdf`                | `/cv/cv.pdf`                                                                                   |
| `/lectures.html`         | per owner decision                                                                             |

Every redirect is tested on the Vercel Preview before go-live.

## Posts (from `js/posts.js`)

| Slug                     | Title                                       | Date (normalised) | Notes                                                    |
| ------------------------ | ------------------------------------------- | ----------------- | -------------------------------------------------------- |
| python-interview-qs      | Pythonda interview savollari                | 2026-08-03        | 1 image; `{}` in code                                    |
| python-memory-management | Pythonda xotira boshqaruvi                  | 2026-08-03        | 1 image; raw `<br>`                                      |
| linux-2                  | Linux olamiga sayohat (2 qism )             | 2026-08-02        | `{}`                                                     |
| linux-1                  | Linux olamiga sayohat (1 qism )             | 2026-08-02        | bare `<PID>`, `<signal>`, `<username>` → must be escaped |
| consume-less-create-more | Kamroq iste'mol qiling. Ko'proq yarating.   | 2026-08-28        | —                                                        |
| blog-yozish              | Blog yozish niyyati qayerdan kelib chiqdi ? | 2026-07-13        | 1 image                                                  |
| markdown-qollanma        | _(not in posts.js — unpublished guide)_     | —                 | ❓ owner: publish or skip; references missing images     |

Image paths in posts are `posts/images/...` → become `/blog/images/...`.

## Projects (from `js/projects.js`)

| Name               | GitHub                                     | Stack             | Date       |
| ------------------ | ------------------------------------------ | ----------------- | ---------- |
| Postflow           | github.com/faxriddinswe/PostFlow           | Python, FastAPI   | 2026-07-14 |
| Namoz bot          | github.com/faxriddinswe/namoz_bot          | Python            | 2026-07-24 |
| CareTrack platform | github.com/faxriddinswe/CareTrack-platform | JavaScript, React | 2026-05-09 |
| DaysLeft           | github.com/faxriddinswe/left-year-time     | JavaScript        | 2025-11-04 |
| TechHouse website  | github.com/faxriddinswe/Tech-house-website | JavaScript        | 2025-01-04 |
| Art gallery        | github.com/faxriddinswe/art_gallery        | HTML, CSS         | 2025-01-24 |

No live URLs or screenshots in v1.

## Open questions

1. Lectures: keep a Lectures section (2 YouTube videos) or drop it?
2. `markdown-qollanma.md`: publish or skip?
3. Projects: live URLs, screenshots, better descriptions (UZ/EN)?
4. Portrait: use v1 `images/profile.jpg` (960×1280) as the new hero source? (a transparent ≥1600px one is still preferred)
5. v1 also linked LeetCode (`leetcode.com/faxriddinswe`) and `t.me/faxriddinswe` — add to v2 socials?

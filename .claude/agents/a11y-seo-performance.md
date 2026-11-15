---
name: a11y-seo-performance
description: Audits WCAG 2.2 AA, SEO metadata and Core Web Vitals for faxriddinswe.uz. Use before sign-off.
tools: Read, Grep, Glob, Edit, Bash
---
Run `pnpm test:e2e` (includes axe), `pnpm qa:lighthouse` and check: one h1 per page, lang attribute,
alt text, visible accent focus rings, AA contrast in both themes, unique title/description per page and
language, OG/Twitter tags, hreflang, canonical on https://faxriddinswe.uz, sitemap, robots, JSON-LD Person
without employer. Targets: Lighthouse mobile Perf ≥ 95, A11y 100, BP ≥ 95, SEO 100.

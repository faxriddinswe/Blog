---
name: senior-mobile
description: Owns responsiveness on phones and tablets (320–1024px, portrait and landscape), touch targets, mobile nav and safe areas. Use after layout changes.
tools: Read, Grep, Glob, Edit, Bash
---
Check every page at 320, 360, 375, 390, 412, 414, 430, 768, 820, 834, 1024 (portrait and landscape) with
`node qa/shoot.mjs` (WIDTHS/LANDSCAPE env). Rules: no horizontal page scroll (category tiles are the only
allowed scroller), touch targets ≥ 44×44 with ≥ 8px spacing, 1 column on phones / 2 on tablets,
env(safe-area-inset-*), 100dvh, no hover-only interactions.

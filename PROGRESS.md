# Ish holati — portfolio-v2

Oxirgi yangilanish: 2026-11-15. Branch: `portfolio-v2`. Hech narsa push yoki deploy qilinmagan.
Jonli sayt (`main`, eski Next.js versiya) avvalgidek ishlab turibdi.

## Nima qilindi ✅

- **Texnologiya:** Astro 7 asosidagi static sayt, `/uz` va `/en`, qorongʻi va yorugʻ mavzu.
- **Sahifalar:** Bosh sahifa, Men haqimda, Loyihalar, Blog, Maʼruzalar, Kurslar, Sertifikatlar, Ish takliflari, 404.
- **Til va mavzu:**
  - `/` sahifasi tilni avval saqlangan tanlovdan, boʻlmasa brauzer tilidan oladi, ikkalasi ham boʻlmasa oʻzbekcha ochiladi.
  - Mavzu ham eslab qolinadi va sahifa chizilishidan oldin qoʻllanadi, shuning uchun yorugʻ/qorongʻi oʻtishda miltillash boʻlmaydi.
- **Tajriba:** hamma joyda **2+ yil** deb yozilgan (briefdagi 3+ emas, egasining qarori).
- **Kontent:**
  - Portret.
  - 8 ta loyiha (GitHub README'laridan).
  - 9 ta sertifikat.
  - 2 ta offer letter.
  - 2 ta YouTube maʼruza.
  - 9 ta kurs.
  - Blogda 2 ta Medium maqolasi va 5 ta LinkedIn posti.
  - Telegram kanalning oxirgi 3 ta haqiqiy posti.
  - 2 ta hamjamiyat.
- **SEO:** OG rasm, favicon toʻplami, sitemap, robots.txt, hreflang, canonical, JSON-LD Person.
- **Tekshiruv:** `pnpm build` 0 xato va 0 ogohlantirish bilan oʻtadi. 1440 va 375 kengliklarda gorizontal scroll yoki buzilgan rasm topilmadi.

## Egasidan javob kutilmoqda ❓

1. **IELTS rasmi:** saytga qoʻyilmagan va git'ga kiritilmagan, chunki unda tugʻilgan sana, Candidate ID va surat bor. Variantlar: natijani (5.5 / B2) rasmsiz yozish yoki umuman qoʻymaslik.
2. **HarvardX CS50 (`cr1.jpg`):** rasmda "PREVIEW" yozuvi bor, yaʼni bu hali berilmagan sertifikatning namunasi. Saytga qoʻyilmagan.
3. **Offer letter'lar:** ularda imzo va ID raqamlar bor. Rasmlar git'ga kiritilmagan (`src/assets/offers/` ignore qilingan). ⚠️ Shu hal boʻlmaguncha Vercel'da build oʻtmaydi.
4. **CV:** yangi fayl buzilgan, bosh sahifa boʻlib ochiladi. Hozir saytda eski CV (`public/resume.pdf`) turibdi, unda "Junior" deb yozilgan.
5. **Loyiha turlari:** TechHouse va Yuksalish Edu shaxsiymi yoki frilansmi?
6. **Kurslar roʻyxati va logolar:** toʻgʻrimi? Hozir logolar oʻrnida monogram yoki ikonka turibdi.
7. **Qiziqishlar (hobbilar):** roʻyxat boʻsh boʻlgani uchun bu boʻlim yashirilgan.
8. **LinkedIn post sarlavhalari:** ularni men yozdim, oʻzgartirish kerakmi?

## Qolgan ishlar 🔜

- `.claude/agents/` papkasidagi subagent fayllari.
- Toʻliq QA:
  - skrinshotlar: 14 ta kenglik × 2 til × 2 mavzu (`node qa/shoot.mjs`);
  - landscape rejim;
  - Playwright e2e testlari;
  - axe-core;
  - Lighthouse;
  - link check;
  - natijalar `QA-REPORT.md` ga yoziladi.
- Hujjatlar: `TODO-CONTENT.md`, `TRANSLATIONS.md`, `CONTENT-GUIDE.md` (oʻzbekcha), `ARCHITECTURE.md`, `README.md`.
- Egasi ruxsat bergandan keyin: push → Vercel Preview → `main` ga PR.

## Ishga tushirish

```bash
pnpm install
pnpm build && pnpm preview --port 4321   # http://localhost:4321
```

Talab: Node ≥ 22.23.4 (`~/.local/opt/node` da Node 26 LTS oʻrnatilgan).
TypeScript 6 ishlatiladi, chunki `astro check` TypeScript 7 ni hali qoʻllamaydi.

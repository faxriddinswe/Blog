# Ish holati — portfolio-v2

Oxirgi yangilanish: 2026-11-15 (2-sessiya). Branch: `portfolio-v2`. Hech narsa push yoki deploy qilinmagan.
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

1. ✅ **IELTS, HarvardX, offer letter'lar:** egasi ruxsat berdi, saytga qoʻyildi (2026-11-15). HarvardX rasmi "PREVIEW" namunasi, haqiqiysi kelganda almashtiriladi.
4. **CV:** yangi fayl buzilgan, bosh sahifa boʻlib ochiladi. Hozir saytda eski CV (`public/resume.pdf`) turibdi, unda "Junior" deb yozilgan.
5. **Loyiha turlari:** TechHouse va Yuksalish Edu shaxsiymi yoki frilansmi?
6. **Kurslar roʻyxati va logolar:** toʻgʻrimi? Hozir logolar oʻrnida monogram yoki ikonka turibdi.
7. **Qiziqishlar (hobbilar):** roʻyxat boʻsh boʻlgani uchun bu boʻlim yashirilgan.
8. **LinkedIn post sarlavhalari:** ularni men yozdim, oʻzgartirish kerakmi?

## 2-sessiyada qilindi ✅

- `.claude/agents/`: 7 ta subagent fayli.
- Testlar va QA — natijalar `QA-REPORT.md` da:
  - E2E va axe: 52/52 test oʻtdi.
  - Skrinshotlar: 624 ta (portrait va landscape), gorizontal scroll yoki buzilgan rasm yoʻq.
  - Lighthouse (mobil): Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.
  - Link check: barcha ichki havolalar ishlaydi.
- Hujjatlar: `ARCHITECTURE.md`, `README.md`, `CONTENT-GUIDE.md`, `TODO-CONTENT.md`, `TRANSLATIONS.md`, `QA-REPORT.md`.
- "Rezyumeni yuklab olish" tugmasi endi PDF'ni yangi tabda ochadi (egasining soʻrovi).

## Qolgan ishlar 🔜

- Yuqoridagi savollarga javob kelgach, kontentni yangilash.
- Egasi ruxsat bergandan keyin: push → Vercel Preview → tekshiruv → `main` ga PR.

## Ishga tushirish

```bash
pnpm install
pnpm build && pnpm preview --port 4321   # http://localhost:4321
```

Talab: Node ≥ 22.23.4 (`~/.local/opt/node` da Node 26 LTS oʻrnatilgan).
TypeScript 6 ishlatiladi, chunki `astro check` TypeScript 7 ni hali qoʻllamaydi.

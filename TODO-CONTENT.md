# Yetishmayotgan kontent

Har bir qatorda nima yetishmasligi va uni qaysi faylga qoʻyish kerakligi yozilgan.
Shu roʻyxatdagi narsalar hal boʻlmaguncha saytda placeholder turadi.

## Egasi qaror qilishi kerak (maxfiylik)

- [ ] **Offer letter rasmlari** — rasmlarda imzo va ID raqamlar bor. Saytga chiqaramizmi?
  - Rasmlar: `content/offer-letters/offer1.jpg` va `offer2.jpg` → `src/assets/offers/`.
  - ⚠️ Hal boʻlmaguncha Vercel'da build oʻtmaydi, chunki bu rasmlar git'ga kiritilmagan.
- [ ] **IELTS** — rasmda tugʻilgan sana, Candidate ID va surat bor. Natijani (5.5 / B2) rasmsiz yozamizmi?
  - Yozilsa, `src/data/certificates.json` ga matnli karta qoʻshiladi.
- [ ] **HarvardX CS50 (`cr1.jpg`)** — "PREVIEW" namunasi, haqiqiy sertifikat emas.
  - Haqiqiysini `content/certificates/` ga qoʻying.

## Fayllar

- [ ] **CV** — `Faxriddin_Baxtiyorov_org_CV.pdf` buzilgan, boʻsh sahifa boʻlib ochiladi.
  - Qayta eksport qilib `public/resume.pdf` ga qoʻying.
  - Hozir u yerda eski CV turibdi, unda "Junior" va "Self-directed study" deb yozilgan.
- [ ] **Loyiha skrinshotlari** — hozir generatsiya qilingan muqova turibdi.
  - Har bir loyiha uchun 16:10 rasm kerak → `src/assets/projects/<id>.png`.
  - `ProjectCard` ga ulash kerak boʻladi.
- [ ] **Kurs logolari** — hozir monogram turibdi, Anthropic, Huawei va HackerRank uchun rasmiy ikonka bor.
  - Kvadrat logolar → `content/courses/`.
- [ ] **Telegram kanal postlari** — `src/data/site.ts` dagi `channel.posts`.
  - Hozir 2026-11-15 holatidagi oxirgi 3 ta post.
  - Yangilash qoʻlda qilinadi.

## Tasdiqlash kerak

- [ ] **Loyiha turlari** — TechHouse (hozir: shaxsiy) va Yuksalish Edu (hozir: frilans) toʻgʻrimi? → `src/data/projects.json`, `type`.
- [ ] **PostFlow jonli havolasi** — README'dagi Railway manzili 404 qaytaradi, shuning uchun "Sayt" tugmasi yoʻq.
- [ ] **Kurslar roʻyxati** — sertifikatlar va GitHub'dagi maʼlumotlardan tuzilgan → `src/data/courses.json`.
- [ ] **Hobbilar** — roʻyxat boʻsh, shuning uchun boʻlim yashirilgan → `src/data/site.ts`, `hobbies`.
- [ ] **Maʼruzalar tavsifi** — hozir "Tengdosh Ustoz YouTube kanalidagi maʼruza" deb yozilgan.
  - Har biri uchun 1 gaplik tavsif kerak → `src/data/lectures.json`.
- [ ] **LinkedIn post sarlavhalari** — post matnidan men yozdim → `src/data/articles.ts`.
- [ ] **Ish joyi nomi** — saytda hech qayerda yozilmagan.
  - Build natijasida tekshirish uchun nomini aytsangiz, grep bilan yoʻqligini tasdiqlayman.

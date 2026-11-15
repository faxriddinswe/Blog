# Yetishmayotgan kontent

Har bir qatorda nima yetishmasligi va uni qaysi faylga qoʻyish kerakligi yozilgan.
Shu roʻyxatdagi narsalar hal boʻlmaguncha saytda placeholder turadi.

## Maxfiylik (egasi qaror qilgan, 2026-11-15)

- [x] **IELTS, HarvardX va offer letter rasmlari** saytga qoʻyildi (egasining ruxsati bilan).
  - Repo ochiq, shuning uchun IELTS'dagi tugʻilgan sana, Candidate ID va surat, offer letter'lardagi imzo va ID raqamlar hamma uchun koʻrinadi.
  - ⚠️ HarvardX rasmida "PREVIEW" yozuvi va namunaviy ID bor. Haqiqiy sertifikatni olganda `src/assets/certificates/harvardx-cs50.jpg` ni almashtiring.

## Fayllar

- [x] **CV** — yangi CV `public/resume.pdf` ga qoʻyildi (2026-11-15).
  - Lavozim "Software Engineer" ga PDF ichida almashtirildi (asl fayl: `content/profile/`, git'da emas).
  - ⚠️ CV'da ish joyi nomi (Datheon) bor. Egasi buni bilib turib qoldirdi. Maxfiylik qoidasi (nomni koʻrsatmaslik) CV uchun bekor qilingan.
- [ ] **Loyiha skrinshotlari** — hozir nomiga mos CC0 banner rasm turibdi.
  - Haqiqiy skrinshot boʻlsa → `src/assets/banners/<id>.jpg` ni almashtiring (16:10).
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
- [ ] **Ish joyi nomi** — saytning sahifalarida yozilmagan, faqat `resume.pdf` ichida bor (egasi ruxsat bergan).

# Kontent qoʻshish qoʻllanmasi

Saytdagi barcha matn va maʼlumotlar `src/data/` papkasida turadi. Kod yozish shart emas,
faqat shu fayllarni tahrirlaysiz.

Har bir matn **ikki tilda** yoziladi: `{ "uz": "...", "en": "..." }`.
Oʻzbekchada toʻgʻri belgilarni ishlating: **oʻ gʻ** (U+02BB) va **ʼ** (U+02BC), oddiy `'` emas.

Oʻzgartirgandan keyin tekshiring:

```bash
pnpm build      # 0 errors boʻlishi kerak — xato boʻlsa, qaysi maydon notoʻgʻriligini aytadi
pnpm preview    # http://localhost:4321 da koʻrish
```

## Yangi loyiha → `src/data/projects.json`

```json
{
  "id": "yangi-loyiha",
  "order": 9,
  "name": "Loyiha nomi",
  "type": "personal",
  "glyph": "bot",
  "description": { "uz": "Bir-ikki gap.", "en": "One or two sentences." },
  "stack": ["FastAPI", "PostgreSQL"],
  "github": "https://github.com/faxriddinswe/...",
  "live": "https://..."
}
```

- `type` — `personal` yoki `freelance`.
- `glyph` — muqovadagi ikonka: `bot`, `agent`, `web`, `shop`, `edu`, `api`.
- `live` — sayt boʻlmasa, bu qatorni oʻchiring.
- `order` — kichik raqamli loyiha birinchi chiqadi.

## Yangi maqola (Medium / LinkedIn) → `src/data/articles.ts`

Roʻyxatga yangi blok qoʻshing:

```ts
{
  platform: "medium",            // yoki "linkedin"
  title: { uz: "Sarlavha", en: "Title" },
  url: "https://medium.com/@faxriddinswe/...",
  date: "2026-12-01",
},
```

Saytda maqolalar sana boʻyicha oʻzi tartiblanadi. Eng yangisi "Men haqimda" sahifasida "Soʻnggi maqola" boʻlib chiqadi.

## Yangi sertifikat → `src/data/certificates.json`

1. Rasmni `src/assets/certificates/nom.jpg` ga qoʻying.
2. Shu blokni qoʻshing:

```json
{
  "id": "nom",
  "order": 10,
  "name": "Sertifikat nomi",
  "issuer": "Kim bergan",
  "date": "2026-12-01",
  "image": "../assets/certificates/nom.jpg",
  "verify": "https://... (ixtiyoriy)",
  "description": { "uz": "...", "en": "..." }
}
```

Sertifikatlar soni "Men haqimda" sahifasidagi raqamda oʻzi yangilanadi.

## Yangi ish taklifi → `src/data/offers.json`

Rasmni `src/assets/offers/` ga qoʻying. Blok qoʻshish tartibi sertifikatdagidek. Maydonlar:

- `company` — kompaniya nomi;
- `role` — `{ uz, en }`;
- `description` — `{ uz, en }`;
- `date`;
- `image`.

⚠️ Rasmda maosh, manzil, telefon, ID yoki imzo boʻlsa, avval oʻylab koʻring: repo ochiq.

## Yangi maʼruza → `src/data/lectures.json`

```json
{
  "id": "nom",
  "order": 3,
  "youtubeId": "AUWfSrafHiY",
  "duration": "20:52",
  "title": { "uz": "...", "en": "..." },
  "description": { "uz": "...", "en": "..." }
}
```

`youtubeId` — YouTube havolasidagi `v=` dan keyingi 11 ta belgi.
`youtu.be/XXXXXXXXXXX` koʻrinishidagi havolada esa `/` dan keyingi qism.

## Yangi kurs → `src/data/courses.json`

Maydonlar:

- `name` — kurs yoki joy nomi;
- `url` — sayti;
- `monogram` — logo oʻrnida chiqadigan 1–3 harf;
- `color` — HEX rang, masalan `#2F6BFF`.

## Profil, ijtimoiy tarmoqlar, Telegram postlar, hobbilar → `src/data/site.ts`

Bu faylda quyidagilar bor:

- email;
- ijtimoiy tarmoq havolalari;
- texnologiyalar (tech stack);
- "Yoʻlim" (journey);
- hamjamiyatlar;
- Telegram kanalning 3 ta posti;
- hobbilar.

Hobbilar roʻyxati boʻsh boʻlsa, bu boʻlim saytda koʻrinmaydi.

## Interfeys matnlari → `src/i18n/ui.ts`

Tugmalar, sarlavhalar va menyu yozuvlari shu faylda. `uz` va `en` boʻlimlarida kalitlar bir xil boʻlishi shart. Bitta kalit tushib qolsa, build xato beradi.

## Rezyume va rasm

- **Rezyume:** `public/resume.pdf` faylini almashtiring. Tugma uni yangi tabda ochadi.
- **Portret:** `src/assets/portrait.png` (kvadrat, fon olib tashlangan).
- **OG rasm va ikonkalar:** portret yoki ism oʻzgarsa, `pnpm assets` bilan qayta yarating.

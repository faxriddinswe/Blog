# Shaxsiy Sayt — To'liq Qo'llanma

Statik, tez ishlaydigan shaxsiy sayt. Faqat **HTML + CSS + JavaScript** — hech qanday framework, hech qanday backend yo'q.

---

## 1. Papka tuzilishi

```
site/
├── index.html          ← Home sahifasi
├── blog.html           ← Blog ro'yxati
├── post.html           ← Postni ochib o'qiydigan sahifa (bitta fayl — hamma post uchun)
├── building.html       ← Loyihalar (GitHub'ga link qilingan)
├── lectures.html       ← Lectures (hozircha "coming soon")
├── resume.html         ← Rezyume (PDF ko'rish + yuklab olish)
├── cv.pdf              ← SIZNING REZYUMENGIZ (almashtiring!)
├── README.md           ← Shu fayl
│
├── css/
│   └── style.css       ← Butun dizayn: ranglar, shriftlar, hover effektlar
│
├── js/
│   ├── posts.js        ← POSTLAR RO'YXATI (yangi post shu yerga qo'shiladi)
│   ├── projects.js     ← LOYIHALAR RO'YXATI (GitHub linklari shu yerda)
│   ├── nav.js          ← Navigatsiya va footer (hamma sahifada bir xil)
│   └── marked.min.js   ← Markdown → HTML aylantiruvchi kutubxona (tegmang)
│
├── images/
│   └── avatar.jpg      ← SIZNING RASMINGIZ (almashtiring!)
│
└── posts/
    ├── salom-dunyo.md          ← Postlar .md (Markdown) fayl bo'lib turadi
    ├── markdown-qollanma.md
    ├── username-band-qilish.md
    └── images/                 ← Postlar ichidagi rasmlar shu yerda
        └── example.png
```

---

## 2. Saytni kompyuterda ochish (MUHIM!)

Postlar `.md` fayldan `fetch()` orqali yuklanadi. Brauzer xavfsizlik sababli `file://` protokolida `fetch` ga ruxsat bermaydi. Shuning uchun `index.html` ni **ikki marta bosib ochsangiz, blog postlari ochilmaydi**. Saytni **lokal server** orqali oching. 3 ta oson yo'l:

**1-usul: VS Code Live Server (eng oson)**
1. VS Code'da **Live Server** kengaytmasini o'rnating
2. `index.html` ustiga o'ng tugma → **Open with Live Server**

**2-usul: Python (terminal orqali)**
```bash
cd site
python3 -m http.server 8000
```
Brauzerda oching: `http://localhost:8000`

**3-usul: Node.js**
```bash
npx serve site
```

---

## 3. YANGI POST QO'SHISH (2 qadam)

### 1-qadam: `.md` fayl yarating

`posts/` papkasida yangi fayl yarating. Fayl nomi — **kichik harflar, bo'sh joysiz, chiziqcha bilan**:

```
posts/redis-haqida.md
```

Ichiga Markdown formatda yozing (qanday yozish — pastda, 5-bo'limda).

### 2-qadam: `js/posts.js` ga ro'yxatga qo'shing

`js/posts.js` faylini oching va `POSTS` ro'yxatining **eng boshiga** qo'shing (eng yangi post tepada tursin):

```javascript
const POSTS = [
  {
    slug: "redis-haqida",              // fayl nomi (.md siz!)
    title: "Redis faqat Cache emas",   // blog ro'yxatida ko'rinadigan sarlavha
    date: "2026-07-11",                // sana: YYYY-MM-DD
    readTime: "6 min read",            // taxminiy o'qish vaqti
  },
  // ... eski postlar
];
```

**Tamom!** Sahifani yangilang — post blogda paydo bo'ladi. `slug` fayl nomi bilan **aynan bir xil** bo'lishi shart (`.md` siz).

---

## 4. POSTGA RASM QO'SHISH

1. Rasmni `posts/images/` papkasiga tashlang, masalan: `posts/images/redis-diagram.png`
2. Post ichida shunday yozing:

```markdown
![Redis diagrammasi](posts/images/redis-diagram.png)
```

- `[]` ichida — rasm tavsifi (rasm yuklanmasa shu matn chiqadi)
- `()` ichida — rasm manzili

Internetdagi rasmni ham qo'yish mumkin:

```markdown
![Tavsif](https://i.imgur.com/rasm.png)
```

---

## 5. MARKDOWN YOZISH QOIDALARI

| Nima kerak | Qanday yoziladi | Natija |
|------------|-----------------|--------|
| Katta sarlavha | `## Sarlavha` | Bo'lim sarlavhasi (pastida chiziq bilan) |
| Kichik sarlavha | `### Sarlavha` | Kichikroq sarlavha |
| Qalin matn | `**matn**` | **matn** |
| Qiya matn | `*matn*` | *matn* |
| Bir qatorli kod | `` `kod` `` | Sariq rangda `kod` |
| Link | `[nom](https://...)` | Bosiladigan link |
| Rasm | `![tavsif](manzil)` | Rasm |
| Ro'yxat | `- element` | • element |
| Raqamli ro'yxat | `1. element` | 1. element |
| Iqtibos | `> matn` | Chap tomoni sariq chiziqli iqtibos |
| Chiziq | `---` | Gorizontal ajratuvchi chiziq |

### Kod bloki (rang bilan)

Uch dona teskari qo'shtirnoq (\`\`\`) orasiga yozing va til nomini ko'rsating — kod avtomatik ranglanadi:

````markdown
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Salom!");
    }
}
```
````

Qo'llab-quvvatlanadigan tillar: `java`, `python`, `javascript`, `sql`, `bash`, `html`, `css`, `json` va boshqalar.

### Jadval

```markdown
| Ustun 1 | Ustun 2 |
|---------|---------|
| qiymat  | qiymat  |
```

**Jonli namuna:** saytdagi "Markdown Qo'llanma" postini oching va uni `posts/markdown-qollanma.md` fayli bilan solishtiring — hamma narsa qanday yozilgani ko'rinadi.

---

## 6. LOYIHA QO'SHISH (Building sahifasi)

`js/projects.js` faylini oching va `PROJECTS` ro'yxatiga qo'shing:

```javascript
{
  name: "mening-loyiham",                              // loyiha nomi
  url: "https://github.com/akarshiev/mening-loyiham",  // GitHub repo linki
  desc: "Loyiha haqida qisqa tavsif.",                 // ixtiyoriy
  lang: "Java",                                        // ixtiyoriy
  date: "2026-07-11",                                  // ixtiyoriy
  stars: 0,                                            // ixtiyoriy (0 bo'lsa ko'rinmaydi)
},
```

Kartaga bosilganda `url` dagi GitHub sahifa **yangi tabda** ochiladi.

---

## 7. O'ZINGIZGA MOSLASH

| Nimani o'zgartirish | Qayerda |
|---------------------|---------|
| Ism, matn, "Hey, I'm..." | `index.html` |
| Rasmingiz (avatar) | `images/avatar.jpg` ni almashtiring |
| GitHub / LinkedIn / Telegram linklari | `index.html` dagi `.socials` bo'limi |
| Rezyume | `cv.pdf` ni o'zingiznikiga almashtiring |
| Ranglar (sariq aksent, fon...) | `css/style.css` boshidagi `:root` bo'limi |
| Navigatsiya (bo'lim qo'shish/olib tashlash) | `js/nav.js` dagi `NAV_ITEMS` |
| Footer matni | `js/nav.js` ning oxiri |

**Ranglarni o'zgartirish misoli** (`css/style.css`):

```css
:root {
  --bg: #0a0a0a;       /* asosiy fon */
  --accent: #e5a54b;   /* sariq rang — buni o'zgartirsangiz butun sayt o'zgaradi */
}
```

---

## 8. INTERNETGA JOYLASH (GitHub Pages — bepul)

1. GitHub'da yangi repo yarating (masalan `my-website`)
2. Terminal orqali:

```bash
cd site
git init
git add .
git commit -m "birinchi versiya"
git branch -M main
git remote add origin https://github.com/akarshiev/my-website.git
git push -u origin main
```

3. GitHub'da repo → **Settings** → **Pages** → Source: **main** branch → **Save**
4. 1-2 daqiqadan keyin sayt tayyor: `https://akarshiev.github.io/my-website/`

O'z domeningiz (`abdukarim.uz` kabi) bo'lsa — Pages sozlamalarida **Custom domain** ga yozing va domen provayderida CNAME yozuvini GitHub'ga yo'naltiring.

**Yangilash:** har safar post qo'shganingizda:

```bash
git add .
git commit -m "yangi post: redis haqida"
git push
```

Bir daqiqada sayt yangilanadi.

---

## 9. SAYT QANDAY ISHLAYDI? (texnik tushuntirish)

1. **Blog ro'yxati:** `blog.html` ochilganda JS `js/posts.js` dagi `POSTS` massivini o'qib, har biri uchun qator chizadi. Har qator `post.html?post=SLUG` ga link.
2. **Post ochish:** `post.html` URL'dan `?post=SLUG` ni oladi → `posts/SLUG.md` faylni `fetch` qiladi → `marked.js` Markdown'ni HTML'ga aylantiradi → `highlight.js` kodlarni ranglaydi.
3. **Building:** `js/projects.js` dagi massivdan kartalar chiziladi, har karta GitHub'ga tashqi link.
4. **Navigatsiya:** `js/nav.js` har sahifada nav + footer'ni qo'shadi va URL'ga qarab qaysi tugma faolligini (sariq) aniqlaydi.

Hech qanday server-kod yo'q — hammasi brauzerda ishlaydi, shuning uchun sayt **juda tez** va **bepul** hosting'da turadi.

---

## 10. Tez-tez uchraydigan xatolar

| Muammo | Sabab / Yechim |
|--------|----------------|
| Post ochilmayapti, "fayl topilmadi" | Sayt `file://` orqali ochilgan. Lokal server ishlating (2-bo'lim) |
| Post blogda ko'rinmayapti | `js/posts.js` ga qo'shishni unutgansiz, yoki `slug` fayl nomiga mos emas |
| Rasm chiqmayapti | Manzilni tekshiring: `posts/images/nom.png` — katta-kichik harflar muhim! |
| Kod ranglanmayapti | Internetga ulanmagansiz (highlight.js CDN'dan yuklanadi) yoki til nomi noto'g'ri |
| PDF ko'rinmayapti | `cv.pdf` asosiy papkada ekanligini tekshiring |

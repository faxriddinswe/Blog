/* ============================================================
   nav.js — navigatsiya va footer BARCHA sahifalarda bir xil.
   O'zgartirish kerak bo'lsa, faqat shu faylni tahrirlaysiz.
   ============================================================ */

const NAV_ITEMS = [
  {
    href: "index.html",
    label: "Home",
    icon: '<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/></svg>',
  },
  {
    href: "blog.html",
    label: "Blog",
    icon: '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  },
  {
    href: "building.html",
    label: "Building",
    icon: '<svg viewBox="0 0 24 24"><path d="M14.5 4 20 9.5 8.5 21H3v-5.5L14.5 4z"/><path d="M12.5 6.5 17.5 11.5"/></svg>',
  },
  {
    href: "lectures.html",
    label: "Lectures",
    icon: '<svg viewBox="0 0 24 24"><rect x="2" y="6" width="13" height="12" rx="2"/><path d="M15 10.5 22 7v10l-7-3.5"/></svg>',
  },
  {
    href: "resume.html",
    label: "Resume",
    icon: '<svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h7M9 17h7"/></svg>',
  },
];

// Hozir qaysi sahifa ochiq? (URL'dan fayl nomini olamiz)
// post.html blogning ichki sahifasi, shuning uchun uni ham "Blog" deb belgilaymiz
let current = location.pathname.split("/").pop() || "index.html";
if (current === "post.html") current = "blog.html";

// Navigatsiyani yasab, sahifaning boshiga joylashtiramiz
const navHTML = `
  <div class="nav-wrap">
    <nav class="nav">
      ${NAV_ITEMS.map(
  (item) => `
        <a href="${item.href}" class="${item.href === current ? "active" : ""}">
          ${item.icon}<span>${item.label}</span>
        </a>`
).join("")}
    </nav>
  </div>
`;

document.body.insertAdjacentHTML("afterbegin", navHTML);

// Footer — sahifaning oxiriga
document.body.insertAdjacentHTML(
  "beforeend",
  `<footer>© ${new Date().getFullYear()} Faxriddin Baxtiyorov.</footer>`
);

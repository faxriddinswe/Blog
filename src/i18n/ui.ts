export const locales = ["uz", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

/** Pages of the site, in nav order. `learning` pages live under the dropdown. */
export const pages = {
  home: "",
  about: "about",
  projects: "projects",
  blog: "blog",
  lectures: "lectures",
  courses: "courses",
  certificates: "certificates",
  offers: "offer-letters",
} as const;
export type PageId = keyof typeof pages;

export const ui = {
  uz: {
    "meta.lang": "uz-UZ",
    "nav.label": "Asosiy menyu",
    "nav.about": "Men haqimda",
    "nav.projects": "Loyihalar",
    "nav.blog": "Blog",
    "nav.lectures": "Maʼruzalar",
    "nav.learning": "Taʼlim",
    "nav.courses": "Kurslar",
    "nav.certificates": "Sertifikatlar",
    "nav.offers": "Ish takliflari",
    "nav.home": "Bosh sahifa",
    "nav.menu": "Menyu",
    "nav.openMenu": "Menyuni ochish",
    "nav.closeMenu": "Menyuni yopish",
    "skip": "Asosiy qismga oʻtish",
    "lang.label": "Til",
    "lang.switch": "Tilni almashtirish",
    "theme.toLight": "Yorugʻ mavzuga oʻtish",
    "theme.toDark": "Qorongʻi mavzuga oʻtish",
    "external": "yangi oynada ochiladi",

    "home.meta.title": "Faxriddin Baxtiyorov — Python Backend Engineer",
    "home.meta.description":
      "Faxriddin Baxtiyorov — Toshkentdagi Python Backend Engineer. Backend tizimlar, Telegram botlar va AI agentlar.",
    "home.experience": "{n}+ yil tajriba",
    "home.resume": "Rezyumeni koʻrish",
    "home.more": "Men haqimda batafsil",
    "home.photoAlt": "Faxriddin Baxtiyorovning surati",
    "home.socials": "Ijtimoiy tarmoqlar",

    "about.meta.title": "Men haqimda",
    "about.meta.description":
      "Faxriddin Baxtiyorov haqida: tajriba, texnologiyalar, taʼlim yoʻli va hamjamiyatlar.",
    "about.eyebrow": "Men haqimda",
    "about.h1": "Salom, men Faxriddin.",
    "about.h1b": "Backend va AI agentlar quraman.",
    "about.p1":
      "Men Toshkentda yashovchi Python Backend Engineerman. Backend tizimlar va avtomatlashtirish vositalarini yaratishda 2 yildan ortiq tajribam bor.",
    "about.p2":
      "Hozirda PDP Universityda Software Engineering (bakalavr) yoʻnalishida oʻqiyapman (2025–2029).",
    "about.p3":
      "Shu yillar davomida Python, FastAPI, PostgreSQL, Telegram botlar va AI agentlar kabi texnologiyalar bilan ishlaganman.",
    "about.p4":
      "Ayniqsa tizim arxitekturasi va xavfsizlikka qiziqaman, yangi narsalarni amalda qurib oʻrganishni yaxshi koʻraman.",
    "about.p5":
      "Doimiy rivojlanish meni harakatga undaydi. Real bizneslarning muammolarini hal qiladigan mahsulotlar yaratishni yoqtiraman.",
    "about.contactMe": "Bogʻlanish",
    "about.currently": "Hozir",
    "about.facts": "Qisqacha",
    "about.fact.years": "yillik tajriba",
    "about.fact.projects": "ta loyiha",
    "about.fact.certificates": "ta sertifikat",
    "about.fact.languages": "tillar",
    "about.stack": "Texnologiyalar",
    "about.journey": "Yoʻlim",
    "about.find": "Meni qayerda topish mumkin",
    "about.channel": "Telegram kanal",
    "about.live": "Faol",
    "about.latestArticle": "Soʻnggi maqola",
    "about.noArticle": "Birinchi maqola tez orada Medium’da chiqadi.",
    "about.allArticles": "Barcha maqolalar",
    "about.community": "Hamjamiyat",
    "about.communities": "Hamjamiyatlar",
    "about.activeCommunity": "Faol hamjamiyat",
    "about.hobbies": "Qiziqishlar",
    "contact.eyebrow": "Keling, birga ishlaymiz",
    "contact.title": "Loyihangiz yoki AI agent gʻoyangiz bormi?",
    "contact.text": "Menga yozing — odatda Telegram’da javob beraman.",
    "contact.telegram": "Telegram’da yozish",

    "projects.meta.title": "Loyihalar",
    "projects.meta.description":
      "Faxriddin Baxtiyorov qurgan backend tizimlar, Telegram botlar va AI avtomatlashtirish loyihalari.",
    "projects.h1": "Loyihalar",
    "projects.lead":
      "Men qurgan narsalar — backend tizimlar, Telegram botlar va AI avtomatlashtirish.",
    "projects.personal": "Shaxsiy",
    "projects.freelance": "Frilans",
    "projects.live": "Sayt",
    "projects.cta": "Biznesingiz uchun AI agent kerakmi?",
    "projects.ctaButton": "Ariza yuborish",
    "projects.openSite": "{name} saytini ochish",
    "projects.openRepo": "{name} — GitHub’da ochish",

    "blog.meta.title": "Blog",
    "blog.meta.description":
      "Faxriddin Baxtiyorovning Medium va LinkedIn’dagi maqolalari: backend, AI agentlar va avtomatlashtirish.",
    "blog.h1": "Blog",
    "blog.lead": "Maqolalarim Medium va LinkedIn’da — bu yerda hammasiga havola.",
    "blog.read.medium": "Medium’da oʻqish",
    "blog.read.linkedin": "LinkedIn’da oʻqish",
    "blog.empty.medium": "Medium’dagi birinchi maqola tez orada chiqadi.",
    "blog.empty.linkedin": "LinkedIn’dagi maqolalar tez orada shu yerda boʻladi.",
    "blog.profile": "Profilni ochish",

    "lectures.meta.title": "Maʼruzalar",
    "lectures.meta.description": "Faxriddin Baxtiyorovning YouTube’dagi maʼruzalari.",
    "lectures.h1": "Maʼruzalar",
    "lectures.lead": "YouTube’dagi chiqishlarim.",
    "lectures.watch": "YouTube’da koʻrish",
    "lectures.duration": "Davomiyligi",

    "courses.meta.title": "Kurslar",
    "courses.meta.description": "Faxriddin Baxtiyorov oʻqigan joylar va kurslar.",
    "courses.h1": "Kurslar",
    "courses.lead": "Men oʻqigan va oʻrganayotgan joylar.",

    "certificates.meta.title": "Sertifikatlar",
    "certificates.meta.description": "Faxriddin Baxtiyorovning sertifikatlari.",
    "certificates.h1": "Sertifikatlar",
    "certificates.lead": "Tamomlagan kurslarim va topshirgan imtihonlarim.",
    "certificates.verify": "Tasdiqlash",
    "certificates.open": "{name} sertifikatini kattalashtirish",

    "offers.meta.title": "Ish takliflari",
    "offers.meta.description": "Faxriddin Baxtiyorovga kelgan ish va amaliyot takliflari.",
    "offers.h1": "Ish takliflari",
    "offers.lead": "Menga kelgan amaliyot va ish takliflari.",
    "offers.open": "{name} taklif xatini kattalashtirish",

    "lightbox.close": "Yopish",
    "items": "{n} ta",
    "notFound.title": "Sahifa topilmadi",
    "notFound.text": "Bu sahifa mavjud emas yoki koʻchirilgan.",
    "notFound.back": "Bosh sahifaga",
  },
  en: {
    "meta.lang": "en-US",
    "nav.label": "Main menu",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.lectures": "Lectures",
    "nav.learning": "Learning",
    "nav.courses": "Courses",
    "nav.certificates": "Certificates",
    "nav.offers": "Offer Letters",
    "nav.home": "Home",
    "nav.menu": "Menu",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "skip": "Skip to content",
    "lang.label": "Language",
    "lang.switch": "Switch language",
    "theme.toLight": "Switch to light theme",
    "theme.toDark": "Switch to dark theme",
    "external": "opens in a new tab",

    "home.meta.title": "Faxriddin Baxtiyorov — Python Backend Engineer",
    "home.meta.description":
      "Faxriddin Baxtiyorov — a Python Backend Engineer in Tashkent. Backend systems, Telegram bots and AI agents.",
    "home.experience": "{n}+ years experience",
    "home.resume": "View Resume",
    "home.more": "Learn more about me",
    "home.photoAlt": "Photo of Faxriddin Baxtiyorov",
    "home.socials": "Social profiles",

    "about.meta.title": "About",
    "about.meta.description":
      "About Faxriddin Baxtiyorov: experience, tech stack, journey and communities.",
    "about.eyebrow": "About me",
    "about.h1": "Hi, I'm Faxriddin.",
    "about.h1b": "I build backends and AI agents.",
    "about.p1":
      "I am a Python Backend Engineer based in Tashkent, Uzbekistan, with 2+ years of experience building backend systems and automation tools.",
    "about.p2":
      "I am currently studying Software Engineering (BSc) at PDP University in Tashkent (2025–2029).",
    "about.p3":
      "Over the years, I have worked with technologies including Python, FastAPI, PostgreSQL, Telegram bots and AI agents.",
    "about.p4":
      "I am especially interested in system architecture and security, and I enjoy learning by building.",
    "about.p5":
      "I'm driven by continuous growth and enjoy building products that solve real problems for real businesses.",
    "about.contactMe": "Contact me",
    "about.currently": "Currently",
    "about.facts": "At a glance",
    "about.fact.years": "years of experience",
    "about.fact.projects": "projects shipped",
    "about.fact.certificates": "certificates",
    "about.fact.languages": "languages",
    "about.stack": "Tech stack",
    "about.journey": "Journey",
    "about.find": "Where to find me",
    "about.channel": "Telegram channel",
    "about.live": "Live",
    "about.latestArticle": "Latest article",
    "about.noArticle": "My first article is coming to Medium soon.",
    "about.allArticles": "All articles",
    "about.community": "Community",
    "about.communities": "Communities",
    "about.activeCommunity": "Active community",
    "about.hobbies": "Hobbies & activities",
    "contact.eyebrow": "Let's work together",
    "contact.title": "Have a project or an AI agent idea?",
    "contact.text": "Write to me — I usually reply on Telegram.",
    "contact.telegram": "Message on Telegram",

    "projects.meta.title": "Projects",
    "projects.meta.description":
      "Backend systems, Telegram bots and AI automation projects built by Faxriddin Baxtiyorov.",
    "projects.h1": "Projects",
    "projects.lead": "Things I've built — backend systems, Telegram bots and AI automation.",
    "projects.personal": "Personal",
    "projects.freelance": "Freelance",
    "projects.live": "Live site",
    "projects.cta": "Need an AI agent for your business?",
    "projects.ctaButton": "Send a request",
    "projects.openSite": "Open the {name} website",
    "projects.openRepo": "Open {name} on GitHub",

    "blog.meta.title": "Blog",
    "blog.meta.description":
      "Articles by Faxriddin Baxtiyorov on Medium and LinkedIn: backend, AI agents and automation.",
    "blog.h1": "Blog",
    "blog.lead": "My articles live on Medium and LinkedIn — this page links to all of them.",
    "blog.read.medium": "Read on Medium",
    "blog.read.linkedin": "Read on LinkedIn",
    "blog.empty.medium": "My first Medium article is coming soon.",
    "blog.empty.linkedin": "LinkedIn articles will appear here soon.",
    "blog.profile": "Open profile",

    "lectures.meta.title": "Lectures",
    "lectures.meta.description": "Talks by Faxriddin Baxtiyorov on YouTube.",
    "lectures.h1": "Lectures",
    "lectures.lead": "My talks on YouTube.",
    "lectures.watch": "Watch on YouTube",
    "lectures.duration": "Duration",

    "courses.meta.title": "Courses",
    "courses.meta.description": "Places where Faxriddin Baxtiyorov has studied.",
    "courses.h1": "Courses",
    "courses.lead": "Places where I've studied and keep learning.",

    "certificates.meta.title": "Certificates",
    "certificates.meta.description": "Certificates earned by Faxriddin Baxtiyorov.",
    "certificates.h1": "Certificates",
    "certificates.lead": "Courses I've completed and exams I've passed.",
    "certificates.verify": "Verify",
    "certificates.open": "Enlarge the {name} certificate",

    "offers.meta.title": "Offer Letters",
    "offers.meta.description": "Job and internship offers received by Faxriddin Baxtiyorov.",
    "offers.h1": "Offer Letters",
    "offers.lead": "Internship and job offers I've received.",
    "offers.open": "Enlarge the {name} offer letter",

    "lightbox.close": "Close",
    "items": "{n} items",
    "notFound.title": "Page not found",
    "notFound.text": "This page doesn't exist or has moved.",
    "notFound.back": "Back home",
  },
} as const;

export type UiKey = keyof (typeof ui)["uz"];

export function t(locale: Locale, key: UiKey, vars: Record<string, string | number> = {}) {
  return (ui[locale][key] as string).replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}

/** Localized path for a page: localePath("en", "about") → "/en/about". */
export function localePath(locale: Locale, page: PageId = "home") {
  const slug = pages[page];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "uz" ? "en" : "uz";
}

/** Static paths for every `[lang]` page. */
export function langPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

const months = {
  uz: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/** "2026-09-05" → "5-sentabr, 2026" / "Sep 5, 2026". Done by hand: ICU has no uz month names everywhere. */
export function formatDate(locale: Locale, iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = months[locale][(m ?? 1) - 1];
  if (!d) return locale === "uz" ? `${y}-yil ${month}` : `${month} ${y}`;
  return locale === "uz" ? `${d}-${month}, ${y}` : `${month} ${d}, ${y}`;
}

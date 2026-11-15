import type { ImageMetadata } from "astro";
import aiThinking from "@/assets/banners/ai-thinking.jpg";
import andrewNg from "@/assets/banners/andrew-ng.jpg";
import consumeLess from "@/assets/banners/consume-less.jpg";
import fundamentals from "@/assets/banners/fundamentals.jpg";
import https from "@/assets/banners/https.jpg";
import naval from "@/assets/banners/naval.jpg";
import startDoing from "@/assets/banners/start-doing.jpg";

/**
 * Articles live on Medium / LinkedIn; the site only links out.
 * Add one per article (newest first is not required — pages sort by date).
 * A plain module, not a collection: an empty file-loader collection warns on every build.
 */
export interface Article {
  platform: "medium" | "linkedin";
  title: { uz: string; en: string };
  url: string;
  /** YYYY-MM-DD */
  date: string;
  /** Optional cover: import it from src/assets/articles/. */
  cover?: ImageMetadata;
}

/** Medium: from the RSS feed (medium.com/feed/@faxriddinswe). LinkedIn: links the owner sent.
 * LinkedIn titles are short summaries of each post. Fetched 2026-11-15. Covers are CC0 banners
 * picked to match each title (credits: src/data/banner-credits.json); the posts' own images are third-party. */
export const articles: Article[] = [
  {
    platform: "medium",
    title: {
      uz: "Kamroq isteʼmol qiling. Koʻproq yarating.",
      en: "Consume less. Create more.",
    },
    url: "https://medium.com/@faxriddinswe/kamroq-istemol-qiling-ko-proq-yarating-552104e84cbc",
    cover: consumeLess,
    date: "2026-07-29",
  },
  {
    platform: "medium",
    title: { uz: "The Almanack of Naval Ravikant", en: "The Almanack of Naval Ravikant" },
    url: "https://medium.com/@faxriddinswe/the-almanack-of-naval-ravikant-bdb655ccf528",
    cover: naval,
    date: "2026-04-17",
  },
  {
    platform: "linkedin",
    title: {
      uz: "AI inson tafakkuriga qanday taʼsir qilmoqda",
      en: "How AI is affecting the way we think",
    },
    url: "https://www.linkedin.com/posts/faxriddinswe_httpslnkding7xwbxrj-bu-postda-open-activity-7503313697482801152-9yAD",
    cover: aiThinking,
    date: "2026-09-09",
  },
  {
    platform: "linkedin",
    title: {
      uz: "Andrew Ng: AI haqida vahimaga berilmang",
      en: "Andrew Ng: don’t panic about AI",
    },
    url: "https://www.linkedin.com/posts/faxriddinswe_aimastava-ai-ainews-activity-7502014445179600896-b31B",
    cover: andrewNg,
    date: "2026-09-05",
  },
  {
    platform: "linkedin",
    title: {
      uz: "HTTPS qanday ishlaydi — komiks koʻrinishida",
      en: "How HTTPS works, explained as a comic",
    },
    url: "https://www.linkedin.com/posts/faxriddinswe_how-https-works-activity-7501526190885679104-6M7W",
    cover: https,
    date: "2026-09-04",
  },
  {
    platform: "linkedin",
    title: {
      uz: "AI davrida fundamental bilimlar nega muhim",
      en: "Why fundamentals matter in the AI era",
    },
    url: "https://www.linkedin.com/posts/faxriddinswe_hozirgi-ai-davrida-koproq-kod-yozish-muhim-activity-7486718005616373760-1EV4",
    cover: fundamentals,
    date: "2026-07-25",
  },
  {
    platform: "linkedin",
    title: { uz: "Start doing and keep going!", en: "Start doing and keep going!" },
    url: "https://www.linkedin.com/posts/faxriddinswe_start-doing-and-keep-going-activity-7476957739622154240-TcqI",
    cover: startDoing,
    date: "2026-06-28",
  },
];

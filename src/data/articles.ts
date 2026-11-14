import type { ImageMetadata } from "astro";

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

/** From the Medium RSS feed (medium.com/feed/@faxriddinswe), 2026-11-15. No covers in the feed. */
export const articles: Article[] = [
  {
    platform: "medium",
    title: {
      uz: "Kamroq isteʼmol qiling. Koʻproq yarating.",
      en: "Consume less. Create more.",
    },
    url: "https://medium.com/@faxriddinswe/kamroq-istemol-qiling-ko-proq-yarating-552104e84cbc",
    date: "2026-07-29",
  },
  {
    platform: "medium",
    title: { uz: "The Almanack of Naval Ravikant", en: "The Almanack of Naval Ravikant" },
    url: "https://medium.com/@faxriddinswe/the-almanack-of-naval-ravikant-bdb655ccf528",
    date: "2026-04-17",
  },
];

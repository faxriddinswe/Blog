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

export const articles: Article[] = [];

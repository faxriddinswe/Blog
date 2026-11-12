import type { MetadataRoute } from "next";
import { allSlugs, getPost, hasPost } from "@/content/blog";
import { routing, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/site-url";

const url = (path: string) => new URL(path, siteUrl).toString();

function alternates(
  path: (l: Locale) => string,
  locales: readonly Locale[] = routing.locales,
) {
  return { languages: Object.fromEntries(locales.map((l) => [l, url(path(l))])) };
}

/** Every locale of every page, with hreflang alternates (brief §11–12). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) => [
    {
      url: url(`/${locale}`),
      changeFrequency: "monthly",
      priority: 1,
      alternates: alternates((l) => `/${l}`),
    },
    {
      url: url(`/${locale}/projects`),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: alternates((l) => `/${l}/projects`),
    },
    {
      url: url(`/${locale}/blog`),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: alternates((l) => `/${l}/blog`),
    },
  ]);

  const posts = await Promise.all(
    allSlugs().flatMap((slug) => {
      const locales = routing.locales.filter((l) => hasPost(l, slug));
      return locales.map(async (locale) => {
        const post = await getPost(locale, slug);
        return {
          url: url(`/${locale}/blog/${slug}`),
          // Post dates are content data — no clock reads during prerendering.
          lastModified: post?.meta.date,
          changeFrequency: "yearly" as const,
          priority: 0.6,
          alternates: alternates((l) => `/${l}/blog/${slug}`, locales),
        };
      });
    }),
  );

  return [...pages, ...posts];
}

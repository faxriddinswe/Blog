import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getPost } from "@/content/blog";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = site.name;
export const size = ogSize;
export const contentType = ogContentType;

/** Per-post preview card: the article title is the hero. */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const post = await getPost(locale, slug);

  return renderOg({
    eyebrow: `${t("eyebrow")} · ${site.name}`,
    title: post?.meta.title ?? site.name,
    subtitle: post?.meta.description ?? "",
  });
}

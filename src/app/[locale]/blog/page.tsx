import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listPosts, listUntranslated } from "@/content/blog";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("metaTitle"),
    description: t("lead"),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/blog`])),
    },
  };
}

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = await listPosts(locale);
  const foreign = await listUntranslated(locale);

  return (
    <main id="main" className="section pt-40">
      <div className="container-x">
        <SectionHeading
          id="blog-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
        />
        {posts.length === 0 && foreign.length === 0 ? (
          <p className="mt-14 text-text-muted">{t("empty")}</p>
        ) : (
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
            {foreign.map((post) => (
              <PostCard
                key={`${post.locale}-${post.slug}`}
                post={post}
                foreign={post.locale}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

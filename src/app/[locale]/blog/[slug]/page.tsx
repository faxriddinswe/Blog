import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { MissingTranslation } from "@/components/blog/MissingTranslation";
import { allSlugs, getPost, hasPost } from "@/content/blog";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// Every slug is prerendered for every locale; a locale without the post
// renders the "missing translation" notice instead of a 404.
export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const post = await getPost(locale, slug);
  if (!post) return { robots: { index: false } };

  const available = routing.locales.filter((l) => hasPost(l, slug));
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: Object.fromEntries(available.map((l) => [l, `/${l}/blog/${slug}`])),
    },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      publishedTime: post.meta.date,
      url: `/${locale}/blog/${slug}`,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const post = await getPost(locale, slug);
  if (!post) {
    const other = routing.locales.find(
      (l): l is Locale => l !== locale && hasPost(l, slug),
    );
    if (!other) notFound();
    return <MissingTranslation slug={slug} other={other} />;
  }

  const t = await getTranslations({ locale, namespace: "Blog" });
  const format = await getFormatter({ locale });
  const { meta, Content } = post;

  return (
    <main id="main" className="section pt-36">
      <article className="container-x max-w-3xl">
        <Link
          href="/blog"
          className="font-mono text-xs tracking-widest text-text-muted uppercase hover:text-text"
        >
          ← {t("back")}
        </Link>
        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
            <time dateTime={meta.date}>
              {format.dateTime(new Date(meta.date), {
                dateStyle: "long",
                timeZone: "UTC",
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{t("readingTime", { minutes: meta.readingMinutes })}</span>
          </div>
          <h1 className="mt-5 font-display text-h1 leading-[0.95] font-semibold tracking-display text-balance">
            {meta.title}
          </h1>
          <p className="mt-6 text-xl text-text-muted">{meta.description}</p>
          {meta.demo && (
            <p className="mt-6 rounded-(--radius-md) border border-accent-orange/40 bg-accent-orange/10 px-4 py-3 text-sm text-accent-peach">
              <strong className="mr-2 font-mono tracking-widest uppercase">
                {t("demoBadge")}
              </strong>
              {t("demoNote")}
            </p>
          )}
        </header>
        <div className="prose-x mt-14">
          <Content />
        </div>
      </article>
    </main>
  );
}

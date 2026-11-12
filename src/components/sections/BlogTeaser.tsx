import { getLocale, getTranslations } from "next-intl/server";
import { PostCard } from "@/components/blog/PostCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listPosts } from "@/content/blog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const TEASER_COUNT = 3;

/** Latest posts for the current locale; hidden entirely when there are none. */
export async function BlogTeaser() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Blog");
  const posts = (await listPosts(locale)).slice(0, TEASER_COUNT);
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      aria-labelledby="blog-teaser-title"
      className="section pb-16 md:pb-20"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="blog-teaser-title"
            eyebrow={t("eyebrow")}
            title={t("teaserTitle")}
          />
          <Link
            href="/blog"
            className="glow-hover rounded-full border border-border-strong px-5 py-2.5 text-sm hover:border-text-muted"
          >
            {t("allPosts")} →
          </Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

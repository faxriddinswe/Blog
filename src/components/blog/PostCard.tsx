import { useFormatter, useTranslations } from "next-intl";
import type { PostSummary } from "@/content/blog";
import { Link } from "@/i18n/navigation";

/** Card used on /blog and in the home teaser. Whole card is one link. */
export function PostCard({ post }: { post: PostSummary }) {
  const t = useTranslations("Blog");
  const format = useFormatter();
  const { meta } = post;

  return (
    <article className="post-card group">
      <Link href={`/blog/${post.slug}`} className="post-card__link">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
          <time dateTime={meta.date}>
            {format.dateTime(new Date(meta.date), { dateStyle: "long", timeZone: "UTC" })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{t("readingTime", { minutes: meta.readingMinutes })}</span>
          {meta.demo && (
            <span className="rounded-full border border-accent-orange/50 px-2 py-0.5 tracking-widest text-accent-peach uppercase">
              {t("demoBadge")}
            </span>
          )}
        </div>
        <h3 className="mt-5 font-display text-2xl leading-tight font-semibold tracking-tight text-text md:text-3xl">
          {meta.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-text-muted">{meta.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-peach">
          {t("readMore")}
          <span
            aria-hidden="true"
            className="transition-transform duration-(--dur-fast) group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </article>
  );
}

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/** Shown when a post exists only in the other locale (brief §11). */
export function MissingTranslation({ slug, other }: { slug: string; other: Locale }) {
  const t = useTranslations("Blog");
  return (
    <main
      id="main"
      className="section grid min-h-[70dvh] place-items-center pt-40 text-center"
    >
      <div className="container-x max-w-xl">
        <h1 className="font-display text-h2 leading-none font-semibold tracking-display">
          {t("missingTitle")}
        </h1>
        <p className="mt-5 text-text-muted">{t("missingBody")}</p>
        <Link
          href={`/blog/${slug}`}
          locale={other}
          hrefLang={other}
          className="mt-8 inline-flex rounded-full bg-text px-6 py-3 text-sm font-medium text-bg"
        >
          {t("readIn")} →
        </Link>
      </div>
    </main>
  );
}

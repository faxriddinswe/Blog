import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("Common");
  return (
    <a
      href="#main"
      className="sr-only z-60 rounded-full bg-text px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      {t("skipToContent")}
    </a>
  );
}

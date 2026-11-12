import { useTranslations } from "next-intl";
import { GlowPillLink } from "@/components/ui/GlowPillLink";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main
      id="main"
      className="relative grid min-h-dvh place-items-center px-(--gutter) text-center"
    >
      <div className="max-w-xl">
        <p className="font-mono text-sm text-text-muted">404</p>
        <h1 className="mt-4 font-display text-h2 leading-none font-semibold tracking-display">
          {t("title")}
        </h1>
        <p className="mt-6 text-text-muted">{t("body")}</p>
        <div className="mt-10 flex justify-center">
          <GlowPillLink href="/">{t("back")}</GlowPillLink>
        </div>
      </div>
    </main>
  );
}

import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { LangSwitch } from "./LangSwitch";

export function Navbar() {
  const t = useTranslations("Nav");

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        aria-label={t("label")}
        className="mx-auto flex max-w-(--container) items-center justify-between px-(--gutter) py-5"
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-text"
          aria-label={t("home")}
        >
          {site.shortName}
          <span className="text-accent-orange">.</span>
        </Link>
        <LangSwitch />
      </nav>
    </header>
  );
}

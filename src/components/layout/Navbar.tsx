import { useTranslations } from "next-intl";
import { navItems } from "@/content/navigation";
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
          className="rounded-full border border-border bg-bg-elevated/70 px-4 py-2 font-display text-base font-semibold tracking-tight text-text backdrop-blur-md"
        >
          {site.shortName}
          <span aria-hidden="true" className="text-accent-orange">
            .
          </span>
          <span className="sr-only"> — {t("home")}</span>
        </Link>
        <ul className="hidden items-center gap-1 rounded-full border border-border bg-bg-elevated/70 p-1 backdrop-blur-md lg:flex">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className="block rounded-full px-3.5 py-1.5 text-sm text-text-muted transition-colors duration-(--dur-fast) hover:bg-white/5 hover:text-text"
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
        <LangSwitch />
      </nav>
    </header>
  );
}

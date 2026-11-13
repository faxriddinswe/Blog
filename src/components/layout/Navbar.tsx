import { useTranslations } from "next-intl";
import { navItems } from "@/content/navigation";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { BrandMark } from "./BrandMark";
import { LangSwitch } from "./LangSwitch";
import { MobileMenu } from "./MobileMenu";

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
          className="glow-hover inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/70 py-1.5 pr-4 pl-2 font-display text-base font-semibold tracking-tight text-text backdrop-blur-md"
        >
          <BrandMark className="size-7" />
          {site.monogram}
          <span className="sr-only"> — {t("home")}</span>
        </Link>
        <ul className="glow-hover hidden items-center gap-1 rounded-full border border-border bg-bg-elevated/70 p-1 backdrop-blur-md lg:flex">
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
        <div className="flex items-center gap-2">
          <LangSwitch />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

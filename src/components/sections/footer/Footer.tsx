import { useTranslations } from "next-intl";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { navItems } from "@/content/navigation";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { BackToTop } from "./BackToTop";
import { LocalTime } from "./LocalTime";

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="footer">
      <div className="container-x">
        <div className="grid gap-12 border-t border-border pt-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="max-w-xs text-lg text-text-muted">{t("tagline")}</p>
            <p className="mt-6 font-mono text-xs tracking-widest text-text-muted uppercase">
              {t("localTime")} · <LocalTime />
            </p>
          </div>
          <nav aria-label={t("navLabel")}>
            <ul className="grid gap-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="text-text/80 hover:text-accent-peach">
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col items-start gap-6">
            <SocialLinks label={t("socialsLabel")} />
            <BackToTop label={t("backToTop")} />
          </div>
        </div>
      </div>

      <div className="container-x mt-14 pb-8 font-mono text-xs text-text-muted">
        © {site.name}. {t("rights")}
      </div>
    </footer>
  );
}

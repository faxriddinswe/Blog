import { useTranslations } from "next-intl";
import { BrandMark } from "@/components/layout/BrandMark";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { navItems } from "@/content/navigation";
import { site, socials } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { BackToTop } from "./BackToTop";
import { LocalTime } from "./LocalTime";

const linkClass =
  "text-text/80 transition-colors duration-(--dur-fast) hover:text-accent-peach";

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const telegram = socials.find((s) => s.kind === "telegram");

  return (
    <footer className="footer">
      <div className="container-x">
        {/* Brand row */}
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <BrandMark className="size-12 text-text" />
            <div>
              <p className="font-display text-2xl font-semibold tracking-tight">
                {site.name}
              </p>
              <p className="mt-1 text-text-muted">{t("tagline")}</p>
            </div>
          </div>
          <BackToTop label={t("backToTop")} />
        </div>

        <div aria-hidden="true" className="footer__rule" />

        {/* Columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <nav aria-label={t("navLabel")}>
            <h2 className="footer__heading">{t("sectionsTitle")}</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className={linkClass}>
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer__heading">{t("socialTitle")}</h2>
            <ul aria-label={t("socialsLabel")} className="flex flex-wrap gap-3">
              {socials
                .filter((s) => s.href)
                .map((s) => (
                  <li key={s.kind}>
                    <a
                      href={s.href ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="footer__social glow-hover"
                    >
                      <SocialIcon kind={s.kind} className="size-5" />
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__heading">{t("contactTitle")}</h2>
            <ul className="grid gap-3 text-text/80">
              {telegram?.href && (
                <li>
                  <a
                    href={telegram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} inline-flex items-center gap-2`}
                  >
                    <SocialIcon kind="telegram" className="size-4" />
                    {telegram.label}
                  </a>
                </li>
              )}
              <li>{t("location")}</li>
              <li className="inline-flex items-center gap-2 font-mono text-sm">
                <span aria-hidden="true" className="footer__live-dot" />
                {t("localTime")} · <LocalTime />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border py-8 font-mono text-xs text-text-muted">
          <p>
            © {site.name}. {t("rights")}
          </p>
          <p>{t("location")}</p>
        </div>
      </div>
    </footer>
  );
}

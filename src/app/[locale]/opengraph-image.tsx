import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = site.name;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return renderOg({
    eyebrow: t("ogEyebrow"),
    title: site.name,
    subtitle: t("description"),
    portrait: true,
  });
}

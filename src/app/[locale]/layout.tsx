import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { DesktopEnhancements } from "@/components/layout/DesktopEnhancements";
import { Grain } from "@/components/layout/Grain";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/footer/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { PreloaderScript } from "@/components/layout/PreloaderScript";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { SkipLink } from "@/components/layout/SkipLink";
import { routing } from "@/i18n/routing";
import { inter, jetbrainsMono, spaceGrotesk } from "@/lib/fonts";
import { siteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: siteUrl,
    title: { default: t("title"), template: `%s — Faxriddin Baxtiyorov` },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
        "x-default": `/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Faxriddin Baxtiyorov",
      locale: locale === "uz" ? "uz_UZ" : "en_US",
      url: `/${locale}`,
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#08090C",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      // The head script sets data-preloader before hydration.
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <PreloaderScript />
      </head>
      <body className="min-h-dvh">
        <NextIntlClientProvider>
          <Preloader />
          <DesktopEnhancements />
          <SkipLink />
          <Navbar />
          {children}
          <Footer />
          <Grain />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

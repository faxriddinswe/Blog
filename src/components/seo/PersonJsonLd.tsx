import { skillGroups } from "@/content/skills";
import { site, socials } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/site-url";

/** schema.org Person — only owner-confirmed facts (brief §12). */
export function PersonJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: new URL(`/${locale}`, siteUrl).toString(),
    image: new URL("/images/portrait/portrait.png", siteUrl).toString(),
    jobTitle: site.roles.join(", "),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: "UZ",
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: site.education.school },
    knowsAbout: skillGroups.flatMap((g) => g.items),
    sameAs: socials.flatMap((s) => (s.href ? [s.href] : [])),
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag (Next docs: JSON-LD guide).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

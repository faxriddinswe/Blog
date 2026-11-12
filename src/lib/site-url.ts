/** Canonical origin. Falls back to production so metadata is never relative. */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://faxriddinswe.uz",
);

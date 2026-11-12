import type { ComponentType } from "react";
import type { Locale } from "@/i18n/routing";
import { postMetaSchema, type PostMeta } from "./types";

type MdxModule = { default: ComponentType; metadata: unknown };
type Loader = () => Promise<MdxModule>;

/**
 * Post registry. Explicit imports (not a directory glob) keep every post a
 * separate, statically analysable chunk. Same slug in both locales = a
 * translation pair. Add a post: create the .mdx, then register it here.
 */
const registry: Record<Locale, Record<string, Loader>> = {
  uz: {
    "what-is-an-ai-agent": () => import("./uz/what-is-an-ai-agent.mdx"),
    "ai-solutions-for-business": () => import("./uz/ai-solutions-for-business.mdx"),
  },
  en: {
    "what-is-an-ai-agent": () => import("./en/what-is-an-ai-agent.mdx"),
    "ai-solutions-for-business": () => import("./en/ai-solutions-for-business.mdx"),
  },
};

export interface PostSummary {
  slug: string;
  meta: PostMeta;
}

export interface Post extends PostSummary {
  Content: ComponentType;
}

export function hasPost(locale: Locale, slug: string): boolean {
  return slug in registry[locale];
}

/** Every slug that exists in at least one locale. */
export function allSlugs(): string[] {
  return [...new Set(Object.values(registry).flatMap((posts) => Object.keys(posts)))];
}

export async function getPost(locale: Locale, slug: string): Promise<Post | null> {
  const load = registry[locale][slug];
  if (!load) return null;
  const mod = await load();
  // Fail the build loudly if a post's metadata is malformed.
  const meta = postMetaSchema.parse(mod.metadata);
  return { slug, meta, Content: mod.default };
}

/** Newest first. */
export async function listPosts(locale: Locale): Promise<PostSummary[]> {
  const posts = await Promise.all(
    Object.keys(registry[locale]).map((slug) => getPost(locale, slug)),
  );
  return posts
    .filter((p): p is Post => p !== null)
    .map(({ slug, meta }) => ({ slug, meta }))
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

// Our posts also export `metadata` (validated at load time by postMetaSchema).
declare module "*.mdx" {
  export const metadata: unknown;
}

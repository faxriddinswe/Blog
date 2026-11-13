import { z } from "zod";

/** Every post exports `metadata` matching this shape (validated on load). */
export const postMetaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  /** ISO date, e.g. "2026-11-12". */
  date: z.iso.date(),
  readingMinutes: z.number().int().positive(),
  tags: z.array(z.string()).default([]),
  /** Placeholder article — shows a "Demo" badge. */
  demo: z.boolean().default(false),
});

export type PostMeta = z.infer<typeof postMetaSchema>;

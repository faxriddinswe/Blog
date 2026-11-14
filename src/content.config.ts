import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

/** Every user-facing text field exists in both languages. */
const i18n = z.object({ uz: z.string().min(1), en: z.string().min(1) });
const url = z.url();

const projects = defineCollection({
  loader: file("src/data/projects.json"),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    type: z.enum(["personal", "freelance"]),
    description: i18n,
    stack: z.array(z.string()).min(1),
    github: url,
    live: url.optional(),
    /** Visual for the generated cover (no real screenshots yet). */
    glyph: z.enum(["bot", "agent", "web", "shop", "edu", "api"]),
  }),
});

const certificates = defineCollection({
  loader: file("src/data/certificates.json"),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: z.string(),
      description: i18n,
      issuer: z.string(),
      /** ISO date, or YYYY-MM when the certificate shows no day. */
      date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/).optional(),
      image: image(),
      verify: url.optional(),
    }),
});

const offers = defineCollection({
  loader: file("src/data/offers.json"),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      company: z.string(),
      role: i18n,
      description: i18n,
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      image: image(),
    }),
});

const courses = defineCollection({
  loader: file("src/data/courses.json"),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    url,
    /** simple-icons slug when an official mark exists; otherwise a monogram is drawn. */
    icon: z.string().optional(),
    monogram: z.string().max(3),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  }),
});

const lectures = defineCollection({
  loader: file("src/data/lectures.json"),
  schema: z.object({
    order: z.number(),
    youtubeId: z.string().regex(/^[\w-]{11}$/),
    title: i18n,
    description: i18n,
    duration: z.string().regex(/^\d{1,2}:\d{2}(:\d{2})?$/),
  }),
});


export const collections = { projects, certificates, offers, courses, lectures };

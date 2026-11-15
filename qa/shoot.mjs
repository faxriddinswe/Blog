#!/usr/bin/env node
/**
 * Full-page screenshots: every page × theme × language × width.
 *   node qa/shoot.mjs [baseUrl]            — full matrix (spec §7)
 *   PAGES=about,projects WIDTHS=375,1440 THEMES=dark LANGS=uz node qa/shoot.mjs
 * Also reports horizontal overflow and broken images per shot.
 */
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://127.0.0.1:4321";
const list = (env, all) => (process.env[env] ? process.env[env].split(",") : all);
const pages = list("PAGES", ["home", "about", "projects", "blog", "lectures", "courses", "certificates", "offer-letters"]);
const widths = list("WIDTHS", ["320", "360", "375", "390", "412", "414", "430", "768", "820", "834", "1024", "1280", "1440", "1920"]).map(Number);
const themes = list("THEMES", ["dark", "light"]);
const langs = list("LANGS", ["uz", "en"]);
const landscape = process.env.LANDSCAPE === "1";
const out = "qa/screenshots";
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ channel: process.env.CHROME_PATH ? undefined : "chrome", executablePath: process.env.CHROME_PATH });
const problems = [];
for (const theme of themes) {
  for (const w of widths) {
    const tall = w < 768 ? 844 : w < 1280 ? 1100 : 900;
    const [vw, vh] = landscape && w < 1280 ? [tall, w] : [w, tall];
    const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, colorScheme: theme, deviceScaleFactor: 1, hasTouch: w < 1024, isMobile: w < 768 });
    for (const lang of langs) {
      for (const p of pages) {
        const page = await ctx.newPage();
        const path = p === "home" ? `/${lang}` : `/${lang}/${p}`;
        await page.goto(base + path, { waitUntil: "networkidle" });
        // Load lazy images before the full-page shot.
        await page.evaluate(async () => {
          document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager"));
          await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r)))));
        });
        const info = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          broken: [...document.images].filter((i) => i.getAttribute("src") && i.complete && i.naturalWidth === 0).map((i) => i.src),
        }));
        if (info.overflow > 0) problems.push(`${path} @${vw}x${vh} ${theme}: horizontal overflow ${info.overflow}px`);
        if (info.broken.length) problems.push(`${path} @${vw} ${theme}: broken ${info.broken.join(", ")}`);
        await page.screenshot({ path: `${out}/${lang}-${p}-${vw}x${vh}-${theme}.png`, fullPage: true });
        await page.close();
      }
    }
    await ctx.close();
  }
}
await browser.close();
console.log(problems.length ? problems.join("\n") : "✓ no overflow, no broken images");

#!/usr/bin/env node
/**
 * Visual QA: screenshots at 375px and 1440px (+ reduced motion) and fails on
 * console errors. Uses the locally installed Chrome via playwright-core.
 *
 *   node scripts/shoot.mjs [baseUrl] [outDir] [path...]
 */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? ".shots";
const paths = process.argv.slice(4).length ? process.argv.slice(4) : ["/uz", "/en"];
mkdirSync(out, { recursive: true });

const runs = [
  {
    name: "desktop",
    viewport: { width: 1440, height: 900 },
    hasTouch: false,
    reducedMotion: "no-preference",
  },
  {
    name: "mobile",
    viewport: { width: 375, height: 812 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "no-preference",
  },
  {
    name: "reduced",
    viewport: { width: 1440, height: 900 },
    hasTouch: false,
    reducedMotion: "reduce",
  },
];

const browser = await chromium.launch({
  channel: process.env.CHROME_PATH ? undefined : "chrome",
  executablePath: process.env.CHROME_PATH,
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
});

const errors = [];
for (const run of runs) {
  const { name, ...options } = run;
  const context = await browser.newContext({ ...options, deviceScaleFactor: 1 });
  for (const path of paths) {
    const page = await context.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`[${name} ${path}] ${msg.text()}`);
    });
    page.on("pageerror", (err) => errors.push(`[${name} ${path}] ${err.message}`));
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(3500);
    const state = await page.evaluate(() => ({
      preloader: document.documentElement.dataset.preloader,
      webgl: document.querySelector(".beam")?.getAttribute("data-webgl") ?? "off",
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
    }));
    const file = `${out}/${name}${path.replaceAll("/", "_")}.png`;
    await page.screenshot({ path: file });
    console.log(`${file}  ${JSON.stringify(state)}`);
    await page.close();
  }
  await context.close();
}
await browser.close();

if (errors.length) {
  console.error(`\n✗ ${errors.length} console error(s):\n${errors.join("\n")}`);
  process.exit(1);
}
console.log("\n✓ no console errors");

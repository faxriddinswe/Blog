#!/usr/bin/env node
/**
 * Lighthouse (mobile, default throttling) on every page in both languages.
 * Needs the preview server: pnpm build && pnpm preview --port 4321
 *   node qa/lighthouse.mjs [baseUrl]   → qa/lighthouse.json + a table on stdout
 */
import { writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";

const base = process.argv[2] ?? "http://127.0.0.1:4321";
const pages = ["", "/about", "/projects", "/blog", "/lectures", "/courses", "/certificates", "/offer-letters"];
const port = 9333;
const browser = await chromium.launch({
  channel: process.env.CHROME_PATH ? undefined : "chrome",
  executablePath: process.env.CHROME_PATH,
  args: [`--remote-debugging-port=${port}`],
});

const rows = [];
for (const lang of ["uz", "en"]) {
  for (const p of pages) {
    const url = `${base}/${lang}${p}`;
    const { lhr } = await lighthouse(url, { port, output: "json", logLevel: "error" }, undefined);
    const s = (k) => Math.round((lhr.categories[k]?.score ?? 0) * 100);
    const a = (k) => lhr.audits[k]?.displayValue ?? "";
    rows.push({
      url: `/${lang}${p}`,
      perf: s("performance"),
      a11y: s("accessibility"),
      bp: s("best-practices"),
      seo: s("seo"),
      fcp: a("first-contentful-paint"),
      lcp: a("largest-contentful-paint"),
      tbt: a("total-blocking-time"),
      cls: a("cumulative-layout-shift"),
      failed: Object.values(lhr.audits)
        .filter((x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode === "binary")
        .map((x) => x.id),
    });
    process.stdout.write(".");
  }
}
await browser.close();
await writeFile("qa/lighthouse.json", JSON.stringify(rows, null, 2));
console.log("\n" + "page".padEnd(20) + "perf a11y  bp seo  FCP     LCP     TBT     CLS");
for (const r of rows) {
  console.log(
    r.url.padEnd(20) +
      [r.perf, r.a11y, r.bp, r.seo].map((n) => String(n).padStart(4)).join(" ") +
      `  ${r.fcp.padEnd(7)} ${r.lcp.padEnd(7)} ${r.tbt.padEnd(7)} ${r.cls}` +
      (r.failed.length ? `  ✗ ${r.failed.join(", ")}` : ""),
  );
}

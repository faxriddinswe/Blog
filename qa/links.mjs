#!/usr/bin/env node
/**
 * Link check over the built site (dist/): every internal href/src must resolve to a
 * built file; external links are requested once each and reported (not failed).
 *   pnpm build && node qa/links.mjs
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const dist = "dist";
const files = [];
const walk = async (dir) => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (p.endsWith(".html")) files.push(p);
  }
};
await walk(dist);

const exists = async (p) => !!(await stat(p).catch(() => null));
const resolveInternal = async (url) => {
  const path = decodeURIComponent(url.split(/[?#]/)[0]);
  if (path === "/") return exists(join(dist, "index.html"));
  return (await exists(join(dist, path))) || (await exists(join(dist, `${path}.html`))) || (await exists(join(dist, path, "index.html")));
};

const broken = [];
const external = new Map();
for (const f of files) {
  const html = await readFile(f, "utf8");
  for (const [, attr, url] of html.matchAll(/\s(href|src|srcset)="([^"]+)"/g)) {
    for (const u of attr === "srcset" ? url.split(",").map((x) => x.trim().split(" ")[0]) : [url]) {
      if (u.startsWith("#") || u.startsWith("mailto:") || u.startsWith("data:")) continue;
      if (/^https?:\/\//.test(u)) {
        if (!u.startsWith("https://faxriddinswe.uz")) external.set(u, f);
        continue;
      }
      if (u.startsWith("/") && !(await resolveInternal(u))) broken.push(`${f}: ${u}`);
    }
  }
}

console.log(`Internal: ${broken.length ? broken.length + " broken" : "✓ all resolve"} (${files.length} pages)`);
broken.forEach((b) => console.log("  ✗ " + b));

const bad = [];
await Promise.all(
  [...external.keys()].map(async (u) => {
    try {
      const r = await fetch(u, { method: "GET", redirect: "follow", headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) Chrome/140" }, signal: AbortSignal.timeout(20000) });
      if (r.status >= 400) bad.push(`${r.status} ${u}`);
    } catch (e) {
      bad.push(`ERR ${u} (${e.cause?.code ?? e.name})`);
    }
  }),
);
console.log(`External: ${external.size} unique, ${bad.length} not OK (bot-blocking sites such as LinkedIn/Medium may report 403/999)`);
bad.sort().forEach((b) => console.log("  ! " + b));
process.exitCode = broken.length ? 1 : 0;

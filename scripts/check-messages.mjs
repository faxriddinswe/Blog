#!/usr/bin/env node
// Fails CI when uz.json and en.json drift apart (brief §11: keys must match).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dir = new URL("../src/i18n/messages/", import.meta.url);
const locales = ["uz", "en"];

/** @param {unknown} obj @param {string} prefix @returns {string[]} */
function flatten(obj, prefix = "") {
  if (obj === null || typeof obj !== "object") return [prefix];
  return Object.entries(obj).flatMap(([k, v]) =>
    flatten(v, prefix ? `${prefix}.${k}` : k),
  );
}

const keys = Object.fromEntries(
  locales.map((l) => {
    const file = fileURLToPath(new URL(`${l}.json`, dir));
    return [l, new Set(flatten(JSON.parse(readFileSync(file, "utf8"))))];
  }),
);

let failed = false;
for (const a of locales) {
  for (const b of locales) {
    if (a === b) continue;
    const missing = [...keys[a]].filter((k) => !keys[b].has(k));
    if (missing.length) {
      failed = true;
      console.error(`✗ ${b}.json is missing ${missing.length} key(s) from ${a}.json:`);
      for (const k of missing) console.error(`   - ${k}`);
    }
  }
}

if (failed) process.exit(1);
console.log(
  `✓ i18n keys match across ${locales.join(", ")} (${keys[locales[0]].size} keys)`,
);

#!/usr/bin/env node
/**
 * Generates public/og.png (1200×630), apple-touch-icon.png, favicon.ico and
 * icon-512.png by rendering HTML in Chrome — so the text uses the real Inter font.
 *   node scripts/brand-assets.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const font = async (w) =>
  (await readFile(`node_modules/@fontsource/inter/files/inter-latin-${w}-normal.woff2`)).toString("base64");
const [f500, f800] = await Promise.all([font(500), font(800)]);
const portrait = (await sharp("src/assets/portrait.png").resize(560, 560).png().toBuffer()).toString("base64");

const base = `
<style>
@font-face{font-family:Inter;font-weight:500;src:url(data:font/woff2;base64,${f500})}
@font-face{font-family:Inter;font-weight:800;src:url(data:font/woff2;base64,${f800})}
*{margin:0;box-sizing:border-box}body{font-family:Inter;-webkit-font-smoothing:antialiased}
</style>`;

const og = `${base}
<body style="width:1200px;height:630px;background:#0A0E14;color:#E8EDF2;position:relative;overflow:hidden">
<div style="position:absolute;inset:0;background:
  radial-gradient(520px 420px at 930px 300px,rgba(61,220,151,.18),transparent 70%),
  linear-gradient(#18212D 1px,transparent 1px) 0 0/40px 40px,
  linear-gradient(90deg,#18212D 1px,transparent 1px) 0 0/40px 40px;opacity:.9"></div>
<div style="position:absolute;left:80px;top:80px;display:flex;align-items:center;gap:16px">
  <div style="width:56px;height:56px;border-radius:15px;background:#3DDC97;color:#0A0E14;display:grid;place-items:center;font-weight:800;font-size:22px">FB</div>
  <div style="font-weight:500;font-size:26px;color:#93A1B0">faxriddinswe.uz</div>
</div>
<div style="position:absolute;left:80px;top:220px;width:640px">
  <div style="display:inline-flex;align-items:center;gap:10px;padding:8px 18px;border-radius:999px;border:1px solid rgba(61,220,151,.33);background:rgba(61,220,151,.15);font-weight:500;font-size:22px">
    <span style="width:10px;height:10px;border-radius:50%;background:#3DDC97"></span>Tashkent, Uzbekistan</div>
  <div style="margin-top:26px;font-weight:800;font-size:76px;line-height:1.02;letter-spacing:-2.4px">Faxriddin<br>Baxtiyorov</div>
  <div style="margin-top:20px;font-weight:500;font-size:34px;color:#93A1B0">Python Backend Engineer</div>
</div>
<div style="position:absolute;right:90px;top:95px;width:440px;height:440px;border-radius:50%;border:3px solid #3DDC97;padding:10px">
  <div style="width:100%;height:100%;border-radius:50%;overflow:hidden;background:#18212D">
    <img src="data:image/png;base64,${portrait}" style="width:100%;height:100%;object-fit:cover"></div>
</div>
</body>`;

const icon = (size) => `${base}
<body style="width:${size}px;height:${size}px;background:transparent">
<div style="width:100%;height:100%;border-radius:${size * 0.22}px;background:#3DDC97;color:#0A0E14;display:grid;place-items:center;font-weight:800;font-size:${size * 0.42}px;letter-spacing:-${size * 0.01}px">FB</div>
</body>`;

const browser = await chromium.launch({ channel: process.env.CHROME_PATH ? undefined : "chrome", executablePath: process.env.CHROME_PATH });
const shot = async (html, w, h, omitBackground = false) => {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ omitBackground });
  await page.close();
  return buf;
};

await writeFile("public/og.png", await sharp(await shot(og, 1200, 630)).png({ compressionLevel: 9 }).toBuffer());
// The touch icon is opaque (iOS fills transparency with black).
await writeFile("public/apple-touch-icon.png", await shot(icon(180).replace("background:transparent", "background:#3DDC97"), 180, 180));
await writeFile("public/icon-512.png", await shot(icon(512), 512, 512, true));
const png32 = await shot(icon(32), 32, 32, true);
// ICO container holding one PNG image (valid since Windows Vista; every browser reads it).
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("public/favicon.ico", Buffer.concat([header, png32]));
await browser.close();
console.log("✓ og.png, apple-touch-icon.png, icon-512.png, favicon.ico");

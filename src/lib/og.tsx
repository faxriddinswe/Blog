import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Shared Open Graph template (1200×630) — what Telegram, LinkedIn and X show
 * when a link is shared. Rendered at build time; fonts and portrait are read
 * from disk (Space Grotesk / Inter via @fontsource, OFL-1.1).
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const root = process.cwd();
const assets = Promise.all([
  readFile(
    join(
      root,
      "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff",
    ),
  ),
  readFile(
    join(root, "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff"),
  ),
  readFile(join(root, "assets/og/portrait.png"), "base64"),
]);

interface OgOptions {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Show the portrait on the right (home); posts use full width for the title. */
  portrait?: boolean;
}

export async function renderOg({
  eyebrow,
  title,
  subtitle,
  portrait = false,
}: OgOptions) {
  const [display, body, portraitB64] = await assets;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#08090C",
        color: "#F5F6F8",
        fontFamily: "Inter",
        overflow: "hidden",
      }}
    >
      {/* Beam + horizon glow, same language as the hero. Kept clear of the text column. */}
      <div
        style={{
          position: "absolute",
          left: portrait ? 905 : 1090,
          top: 0,
          width: 4,
          height: portrait ? 300 : 420,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0), #ffffff 30%, #60A5FA)",
          boxShadow: "0 0 40px 12px rgba(59,130,246,0.55)",
        }}
      />
      {/* Satori has no `closest-side`: an explicit ellipse that fully fades inside its box. */}
      <div
        style={{
          position: "absolute",
          left: portrait ? 470 : 640,
          bottom: -230,
          width: 1000,
          height: 460,
          background:
            "radial-gradient(ellipse at center, rgba(96,165,250,0.5) 0%, rgba(249,115,22,0.16) 42%, rgba(8,9,12,0) 70%)",
        }}
      />

      {portrait && (
        // eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img>.
        <img
          src={`data:image/png;base64,${portraitB64}`}
          width={470}
          height={470}
          style={{ position: "absolute", right: 30, bottom: 0 }}
          alt=""
        />
      )}

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          width: portrait ? 760 : 1200,
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8A8F98",
          }}
        >
          <div style={{ width: 40, height: 2, background: "#F97316" }} />
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontFamily: "Space Grotesk",
              fontSize: title.length > 60 ? 56 : 76,
              lineHeight: 1.02,
              letterSpacing: -2.5,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, color: "#A9AEB7", lineHeight: 1.35 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#FDBA74" }}>
          faxriddinswe.uz
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Space Grotesk", data: display, weight: 600, style: "normal" },
        { name: "Inter", data: body, weight: 400, style: "normal" },
      ],
    },
  );
}

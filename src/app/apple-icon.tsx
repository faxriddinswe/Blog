import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon: the gradient ring + "FB", solid background (no transparency on iOS). */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#08090C",
      }}
    >
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #F97316, #FBBF24 35%, #22D3EE 65%, #3B82F6)",
        }}
      >
        <div
          style={{
            width: 128,
            height: 128,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#08090C",
            color: "#F5F6F8",
            fontSize: 58,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          FB
        </div>
      </div>
    </div>,
    size,
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon: same mark as icon.svg, solid background (no transparency on iOS). */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#08090C",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 107,
          top: 12,
          width: 8,
          height: 84,
          borderRadius: 4,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0), #ffffff 45%, #60A5FA)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 45,
          width: 18,
          height: 96,
          background: "#F5F6F8",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 45,
          width: 57,
          height: 17,
          background: "#F5F6F8",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 84,
          width: 51,
          height: 17,
          background: "#F5F6F8",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 113,
          top: 118,
          width: 23,
          height: 23,
          borderRadius: 999,
          background: "#F97316",
        }}
      />
    </div>,
    size,
  );
}

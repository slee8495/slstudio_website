import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3a2e26",
          color: "#fffdf8",
          fontFamily: "sans-serif",
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: -3,
        }}
      >
        SL
      </div>
    ),
    { ...size }
  );
}

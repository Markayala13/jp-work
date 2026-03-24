import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "#2C5530",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontSize: 18,
          fontWeight: 600,
          color: "#FAF6F0",
          letterSpacing: "-0.5px",
        }}
      >
        OB
      </div>
    ),
    { ...size }
  );
}

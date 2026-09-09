import { ImageResponse } from "next/og";

export const alt = "Neftali Aguilar — Design Systems & Frontend Engineering";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "96px",
        background: "#0f0f11",
        color: "#f2f2f4",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#8b8d98",
        }}
      >
        Neftali Aguilar
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 64,
          fontWeight: 600,
          lineHeight: 1.15,
          maxWidth: 900,
        }}
      >
        I build the layer where design becomes code.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          width: 96,
          height: 8,
          borderRadius: 9999,
          background: "#3e63dd",
        }}
      />
    </div>,
    { ...size },
  );
}

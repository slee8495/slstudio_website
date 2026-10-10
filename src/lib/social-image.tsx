export const socialImageSize = { width: 1200, height: 630 };

export function SocialImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "88px 96px",
        background: "#ffffff",
        color: "#0a0a0a",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 76,
            height: 76,
            borderRadius: 18,
            background: "#0a0a0a",
            color: "#ffffff",
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          SL
        </div>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 600 }}>
          SL Studio
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 52,
          fontSize: 58,
          fontWeight: 600,
          letterSpacing: -1.5,
          lineHeight: 1.15,
          maxWidth: 920,
        }}
      >
        SL Studio builds and operates software products.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 26,
          color: "#737373",
        }}
      >
        sl-studio.dev
      </div>
    </div>
  );
}

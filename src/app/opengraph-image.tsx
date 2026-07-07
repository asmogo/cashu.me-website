import { ImageResponse } from "next/og";

export const alt = "cashu.me, hold your ecash.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INKWELL = "#0a0a0a";
const PAPER = "#fafafa";
const LILAC = "#b4a7f5";
const RULE = "#1f1f22";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INKWELL,
          color: PAPER,
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: LILAC,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          <span
            style={{
              display: "block",
              width: 28,
              height: 28,
              border: `1px solid ${LILAC}`,
            }}
          />
          CASHU.ME
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 152,
              fontWeight: 600,
              lineHeight: 0.94,
              letterSpacing: "-0.04em",
              color: PAPER,
            }}
          >
            Hold your ecash.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid ${RULE}`,
              paddingTop: 28,
              fontSize: 22,
              color: "#8a8a93",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span>Bearer cash for the web.</span>
            <span style={{ color: LILAC }}>cashu.me →</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

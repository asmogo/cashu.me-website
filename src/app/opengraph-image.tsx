import { ImageResponse } from "next/og";

export const alt = "cashu.me, A Cashu Wallet.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SKY_TOP = "#c9e2f5";
const SKY_BOTTOM = "#dcedf9";
const INK = "#14181f";
const LILAC_CTA = "#5b46d4";
const RULE = "#a7c3dc";
const MUTED = "#46536b";

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
          backgroundImage: `linear-gradient(180deg, ${SKY_TOP}, ${SKY_BOTTOM})`,
          color: INK,
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: LILAC_CTA,
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
              border: `1px solid ${LILAC_CTA}`,
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
              color: INK,
            }}
          >
            A Cashu Wallet.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid ${RULE}`,
              paddingTop: 28,
              fontSize: 22,
              color: MUTED,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span>Bearer cash for the web.</span>
            <span style={{ color: LILAC_CTA }}>cashu.me →</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

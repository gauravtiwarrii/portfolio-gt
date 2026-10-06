import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.has("title")
      ? searchParams.get("title")?.slice(0, 100)
      : "Software, Data & AI Systems";
    const type = searchParams.get("type") ?? "Portfolio / Gaurav Tiwari";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px",
            position: "relative",
            backgroundColor: "#0b0c0a",
            backgroundImage:
              "linear-gradient(to right, rgba(241,243,231,.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(241,243,231,.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            color: "#f1f3e7",
            fontFamily: "Geist, sans-serif",
          }}
        >
          <div style={{ position: "absolute", inset: "0 0 auto", height: 3, background: "#68b6ff" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 52,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(241,243,231,.28)",
                color: "#68b6ff",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              GT
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontSize: 20, fontWeight: 600 }}>Gaurav Tiwari</span>
              <span style={{ color: "#85897c", fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase" }}>
                Engineering / {type}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
            <div style={{ height: 1, width: 88, background: "#68b6ff" }} />
            <div
              style={{
                fontSize: title && title.length > 56 ? 64 : 82,
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: 0,
                overflowWrap: "break-word",
              }}
            >
              {title}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "#b0b3a7", fontSize: 18 }}>Software · Data · AI</span>
            <span style={{ color: "#85897c", fontSize: 15 }}>hellogaurav.me</span>
          </div>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : String(error));
    return new Response("Failed to generate the image", { status: 500 });
  }
}
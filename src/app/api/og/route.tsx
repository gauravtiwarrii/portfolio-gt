import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Dynamic params
        const hasTitle = searchParams.has("title");
        const title = hasTitle
            ? searchParams.get("title")?.slice(0, 100)
            : "Data Engineer | System Architecture | AI";

        const hasType = searchParams.has("type");
        const type = hasType ? searchParams.get("type") : "Portfolio GT";

        return new ImageResponse(
            (
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        padding: "80px",
                        backgroundColor: "#09090b",
                        backgroundImage:
                            "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%)",
                        backgroundSize: "100px 100px",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    {/* Glowing Orbs */}
                    <div
                        style={{
                            position: "absolute",
                            top: "-200px",
                            left: "-200px",
                            width: "800px",
                            height: "800px",
                            borderRadius: "50%",
                            background: "rgba(99, 102, 241, 0.3)", // indigo
                            filter: "blur(150px)",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: "-200px",
                            right: "-200px",
                            width: "800px",
                            height: "800px",
                            borderRadius: "50%",
                            background: "rgba(16, 185, 129, 0.2)", // emerald
                            filter: "blur(150px)",
                        }}
                    />

                    {/* Top Bar Label */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                padding: "8px 16px",
                                borderRadius: "20px",
                                background: "rgba(255, 255, 255, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                color: "#a1a1aa", // zinc-400
                                fontSize: 24,
                                textTransform: "uppercase",
                                letterSpacing: 3,
                            }}
                        >
                            {type}
                        </div>
                    </div>

                    {/* Main Title Area */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "24px",
                            maxWidth: "1000px",
                            marginTop: "80px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: title && title.length > 50 ? 70 : 90,
                                fontStyle: "normal",
                                fontWeight: 900,
                                color: "white",
                                lineHeight: 1.1,
                                letterSpacing: "-0.04em",
                                textShadow: "0 10px 30px rgba(0,0,0,0.5)",
                            }}
                        >
                            {title}
                        </div>
                    </div>

                    {/* Footer Identity Area */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "24px",
                            marginTop: "auto",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                width: "60px",
                                height: "60px",
                                background: "linear-gradient(to right, #6366f1, #10b981)",
                                borderRadius: "50%",
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span style={{ fontSize: 32, fontWeight: 700, color: "white" }}>
                                Gaurav Tiwari
                            </span>
                            <span style={{ fontSize: 24, color: "#a1a1aa", marginTop: 4 }}>
                                Data Engineer - gaurav.dev
                            </span>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}

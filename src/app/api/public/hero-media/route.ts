import { NextRequest, NextResponse } from "next/server";

const GLITZFUSION_API_BASE =
  process.env.NEXT_PUBLIC_GLITZFUSION_API_URL || "http://localhost:3001";

export async function GET(_request: NextRequest) {
  try {
    const upstream = await fetch(
      `${GLITZFUSION_API_BASE}/api/public/hero-media`,
      {
        // Always fetch fresh data from GlitzFusion
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => "");
      console.error(
        "Upstream hero-media error",
        upstream.status,
        upstream.statusText,
        text
      );
      return NextResponse.json(
        { error: "Failed to fetch hero media" },
        { status: 502 }
      );
    }

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying hero media:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero media" },
      { status: 500 }
    );
  }
}

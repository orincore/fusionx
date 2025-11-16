import { NextRequest, NextResponse } from "next/server";
import { getEventBySlug } from "@/lib/events";

function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_request: NextRequest, context: RouteParams) {
  try {
    const { slug } = await context.params;
    const event = await getEventBySlug(slug);

    if (!event) {
      const notFoundResponse = NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
      return withCors(notFoundResponse);
    }

    const response = NextResponse.json(event, { status: 200 });
    return withCors(response);
  } catch (error) {
    console.error("/api/events/[slug] error", error);
    const response = NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
    return withCors(response);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getAllEvents, getUpcomingEvents, getPastEvents } from "@/lib/events";

function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let events;
    if (status === "upcoming") {
      events = await getUpcomingEvents();
    } else if (status === "past") {
      events = await getPastEvents();
    } else {
      events = await getAllEvents();
    }

    const response = NextResponse.json(events, {
      status: 200,
    });

    return withCors(response);
  } catch (error) {
    console.error("/api/events error", error);
    const response = NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
    return withCors(response);
  }
}

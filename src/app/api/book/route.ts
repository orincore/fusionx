import { NextRequest, NextResponse } from "next/server";

interface BookingPayload {
  name: string;
  email: string;
  eventId: string;
  tickets: number;
  notes?: string;
}

const inMemoryBookings: BookingPayload[] = [];

function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<BookingPayload>;

    if (!body.name || !body.email || !body.eventId || !body.tickets) {
      const badRequest = NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
      return withCors(badRequest);
    }

    const booking: BookingPayload = {
      name: body.name,
      email: body.email,
      eventId: body.eventId,
      tickets: Number(body.tickets),
      notes: body.notes ?? "",
    };

    inMemoryBookings.push(booking);

    // Hook: place for analytics / GA events in a real implementation

    const response = NextResponse.json(
      {
        success: true,
        message: "Booking received",
      },
      { status: 201 }
    );

    return withCors(response);
  } catch (error) {
    console.error("/api/book error", error);
    const response = NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
    return withCors(response);
  }
}

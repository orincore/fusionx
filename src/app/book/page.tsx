"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Trash2, Calendar, Clock, Users } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Event {
  id: string;
  title: string;
  dateSlots: Array<{ date: string; timeSlots: string[] }>;
  pricing: Array<{ category: string; currentPrice: number }>;
}

export default function BookPage() {
  const searchParams = useSearchParams();
  const preselectedEventId = searchParams.get("eventId") ?? "";

  // Form state
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPricing, setSelectedPricing] = useState("");
  const [members, setMembers] = useState<Member[]>([
    { id: "1", name: "", email: "", phone: "" }
  ]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    if (!name || !email || !eventId || !tickets) {
      setError("Please fill all required fields.");
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          eventId,
          tickets: Number(tickets),
          notes,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (bookingError) {
      console.error(bookingError);
      setError(
        bookingError instanceof Error
          ? bookingError.message
          : "Unable to complete booking."
      );
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 pb-20 pt-10 md:pb-28 md:pt-16">
      <h1 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
        Book FusionX
      </h1>
      <p className="mt-2 text-sm text-zinc-300">
        Share a few details about your brand or campus, and our team will get in touch
        with a tailored FusionX format and costing.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-100"
          >
            Name *
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 placeholder:text-zinc-500 focus:border-emerald-400 focus:ring-2"
            autoComplete="name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-100"
          >
            Work email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 placeholder:text-zinc-500 focus:border-emerald-400 focus:ring-2"
            autoComplete="email"
          />
        </div>

        <div>
          <label
            htmlFor="eventId"
            className="block text-sm font-medium text-zinc-100"
          >
            Reference event ID or working title *
          </label>
          <input
            id="eventId"
            name="eventId"
            value={eventId}
            onChange={(event) => setEventId(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 placeholder:text-zinc-500 focus:border-emerald-400 focus:ring-2"
            placeholder="e.g. fx-neo-night-001 or Campus IP launch"
          />
        </div>

        <div>
          <label
            htmlFor="tickets"
            className="block text-sm font-medium text-zinc-100"
          >
            Expected attendees
          </label>
          <input
            id="tickets"
            name="tickets"
            type="number"
            min={1}
            value={tickets}
            onChange={(event) => setTickets(event.target.value)}
            className="mt-2 w-full max-w-[200px] rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 placeholder:text-zinc-500 focus:border-emerald-400 focus:ring-2"
          />
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-zinc-100"
          >
            Notes (city, dates, format, budget range)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 placeholder:text-zinc-500 focus:border-emerald-400 focus:ring-2"
            rows={4}
          />
        </div>

        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        {status === "success" && !error && (
          <p className="text-sm text-emerald-300" role="status">
            Booking request received. Our team will get back to you shortly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_30px_rgba(34,197,94,0.65)] transition hover:bg-emerald-300 disabled:opacity-60"
        >
          {status === "loading" ? "Submitting..." : "Submit booking"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Calendar, Clock, Users } from "lucide-react";
import { MemberForm } from "@/components/booking/MemberForm";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Event {
  id: string;
  title: string;
  date: string; // ISO string from API
  time?: string;
  status?: string;
  isPast?: boolean;
  dateSlots?: Array<{
    date: string;
    timeSlots: { startTime: string; endTime: string; isAvailable?: boolean }[];
  }>;
  pricing: Array<{ category: string; currentPrice: number }>;
  location?: {
    venue: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
}

export function BookingForm() {
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
  const [totalPrice, setTotalPrice] = useState(0);

  // Only allow booking for non-completed, non-past events
  const availableEvents = events.filter((event) => event.status !== "completed" && event.isPast !== true);

  // Normalized dateSlots for the selected event: use full slots if present, otherwise fall back to single date/time
  const normalizedDateSlots = selectedEvent
    ? (selectedEvent.dateSlots && selectedEvent.dateSlots.length > 0
        ? selectedEvent.dateSlots
        : selectedEvent.date
        ? [{
            date: selectedEvent.date,
            timeSlots: selectedEvent.time
              ? [{ startTime: selectedEvent.time, endTime: selectedEvent.time }]
              : []
          }]
        : [])
    : [];

  // Load events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Auto-select event if eventId is provided
  useEffect(() => {
    if (preselectedEventId && availableEvents.length > 0) {
      const event = availableEvents.find(e => e.id === preselectedEventId);
      if (event) {
        setSelectedEvent(event);
      }
    }
  }, [preselectedEventId, availableEvents]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const eventsData = await response.json();
        setEvents(eventsData);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const addMember = () => {
    if (members.length < 5) {
      const newMember: Member = {
        id: Date.now().toString(),
        name: "",
        email: "",
        phone: ""
      };
      setMembers([...members, newMember]);
    }
  };

  const removeMember = (id: string) => {
    if (members.length > 1) {
      setMembers(members.filter(member => member.id !== id));
    }
  };

  const updateMember = (id: string, field: keyof Member, value: string) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  // Calculate total price based on selected pricing and member count
  const calculateTotalPrice = () => {
    if (!selectedEvent || !selectedPricing) {
      setTotalPrice(0);
      return;
    }

    const pricingTier = selectedEvent.pricing.find(p => p.category === selectedPricing);
    if (pricingTier) {
      const basePrice = pricingTier.currentPrice;
      const total = basePrice * members.length;
      setTotalPrice(total);
    }
  };

  // Recalculate price when members or pricing changes
  useEffect(() => {
    calculateTotalPrice();
  }, [members.length, selectedPricing, selectedEvent]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    // Validation
    if (!selectedEvent || !selectedDate || !selectedTime || !selectedPricing) {
      setError("Please select event, date, time, and pricing.");
      setStatus("idle");
      return;
    }

    // Validate all members have required fields
    const incompleteMembers = members.filter(member => 
      !member.name.trim() || !member.email.trim() || !member.phone.trim()
    );

    if (incompleteMembers.length > 0) {
      setError("Please fill all required fields for all members.");
      setStatus("idle");
      return;
    }

    try {
      const API_BASE = process.env.NEXT_PUBLIC_GLITZFUSION_API_URL || "http://localhost:3001";
      const response = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          selectedDate,
          selectedTime,
          selectedPricing,
          members
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      const result = await response.json();
      setStatus("success");
      
      // Show success message with booking code
      setError(null);
    } catch (bookingError) {
      console.error(bookingError);
      setError(
        bookingError instanceof Error
          ? bookingError.message
          : "Unable to complete booking."
      );
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Event Selection */}
      <div className="rounded-xl border border-white/10 bg-black/40 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-emerald-400" />
          <h2 className="text-lg font-semibold text-white">Select Event</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="event-select" className="block text-sm font-medium text-zinc-100 mb-2">
              Choose Event *
            </label>
            <select
              id="event-select"
              value={selectedEvent?.id || ""}
              onChange={(e) => {
                const event = availableEvents.find(ev => ev.id === e.target.value);
                setSelectedEvent(event || null);
                setSelectedDate("");
                setSelectedTime("");
                setSelectedPricing("");
                console.log('Event changed, reset all selections');
              }}
              className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 focus:border-emerald-400 focus:ring-2"
              required
            >
              <option value="">Select an event</option>
              {availableEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Date & Time Selection */}
      {selectedEvent && (
        <div className="rounded-xl border border-white/10 bg-black/40 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">Select Date & Time</h2>
          </div>

          {/* Location Display */}
          {selectedEvent.location && (
            <div className="mb-6 p-4 rounded-lg border border-emerald-400/30 bg-emerald-400/5">
              <h3 className="text-sm font-medium text-emerald-300 mb-2">📍 Event Location</h3>
              <div className="text-sm text-white">
                <div className="font-semibold">{selectedEvent.location.venue}</div>
                <div className="text-zinc-300 mt-1">
                  {selectedEvent.location.address}
                  {selectedEvent.location.landmark && `, Near ${selectedEvent.location.landmark}`}
                </div>
                <div className="text-zinc-300">
                  {selectedEvent.location.city}, {selectedEvent.location.state} - {selectedEvent.location.pincode}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Selection */}
            <div>
              <label htmlFor="date-select" className="block text-sm font-medium text-zinc-100 mb-2">
                Select Date *
              </label>
              <select
                id="date-select"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime(""); // Reset time when date changes
                }}
                className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 focus:border-emerald-400 focus:ring-2"
                required
              >
                <option value="">Choose a date</option>
                {normalizedDateSlots.map((slot, index) => (
                  <option key={index} value={slot.date}>
                    {new Date(slot.date).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Selection */}
            <div>
              <label htmlFor="time-select" className="block text-sm font-medium text-zinc-100 mb-2">
                Select Time *
              </label>
              <select
                id="time-select"
                value={selectedTime}
                onChange={(e) => {
                  console.log('Time selected:', e.target.value);
                  setSelectedTime(e.target.value);
                }}
                className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 focus:border-emerald-400 focus:ring-2"
                required
                disabled={!selectedDate}
              >
                <option value="">Choose a time</option>
                {selectedDate && normalizedDateSlots
                  .find(slot => slot.date === selectedDate)
                  ?.timeSlots.map((ts, index) => {
                    const label = `${ts.startTime} – ${ts.endTime}`;
                    return (
                      // Value is startTime (what backend expects), label is full range
                      <option key={index} value={ts.startTime}>
                        {label}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Selection */}
      {selectedEvent && (
        <div className="rounded-xl border border-white/10 bg-black/40 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">Select Pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedEvent.pricing.map((pricing, index) => (
              <div
                key={index}
                className={`rounded-lg border p-4 cursor-pointer transition-all ${
                  selectedPricing === pricing.category
                    ? 'border-emerald-400 bg-emerald-400/10'
                    : 'border-white/10 bg-black/20 hover:border-emerald-400/50'
                }`}
                onClick={() => setSelectedPricing(pricing.category)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white capitalize">
                    {pricing.category.replace('_', ' ')}
                  </h3>
                  <input
                    type="radio"
                    name="pricing"
                    value={pricing.category}
                    checked={selectedPricing === pricing.category}
                    onChange={() => setSelectedPricing(pricing.category)}
                    className="text-emerald-400"
                  />
                </div>
                <div className="text-lg font-bold text-emerald-300">
                  ₹{pricing.currentPrice.toLocaleString()}
                </div>
                <div className="text-xs text-zinc-400 mt-1">per person</div>
              </div>
            ))}
          </div>

          {/* Dynamic Pricing Display */}
          {selectedPricing && totalPrice > 0 && (
            <div className="mt-6 p-4 rounded-lg border border-emerald-400/30 bg-emerald-400/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-emerald-300">Total for {members.length} member{members.length > 1 ? 's' : ''}</div>
                  <div className="text-xs text-zinc-400">
                    ₹{selectedEvent.pricing.find(p => p.category === selectedPricing)?.currentPrice.toLocaleString()} × {members.length}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-300">
                    ₹{totalPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-zinc-400">Final Amount</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Members Section */}
      <div className="rounded-xl border border-white/10 bg-black/40 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">
              Members ({members.length}/5)
            </h2>
          </div>
          {members.length < 5 && (
            <button
              type="button"
              onClick={addMember}
              className="flex items-center gap-2 rounded-lg border border-emerald-400/50 bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-400/20 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Member
            </button>
          )}
        </div>

        <div className="space-y-4">
          {members.map((member, index) => (
            <MemberForm
              key={member.id}
              member={member}
              index={index}
              onUpdate={updateMember}
              onRemove={removeMember}
              canRemove={members.length > 1}
            />
          ))}
        </div>
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm text-red-300" role="alert">
            {error}
          </p>
        </div>
      )}

      {status === "success" && !error && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
          <p className="text-sm text-emerald-300" role="status">
            🎉 Booking confirmed! Check your email for booking details and confirmation code.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={status === "loading" || !selectedEvent}
          className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(34,197,94,0.65)] transition hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Processing Booking..." : "Complete Booking"}
        </button>
      </div>
    </form>
  );
}

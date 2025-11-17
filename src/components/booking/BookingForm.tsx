"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Calendar, Clock, Users, CheckCircle, Mail, Shield } from "lucide-react";
import { MemberForm } from "@/components/booking/MemberForm";
import { PaymentModal } from "@/components/booking/PaymentModal";

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
  const router = useRouter();
  const preselectedEventId = searchParams.get("eventId") ?? "";

  // Form state
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPricing, setSelectedPricing] = useState("");
  const [members, setMembers] = useState<Member[]>([
    { id: "1", name: "", email: "", phone: "" }
  ]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "payment" | "completed" | "otp_verification">("idle");
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingData, setBookingData] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  
  // OTP verification state
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [groupDiscount, setGroupDiscount] = useState(0);

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
        email: "", // Will be empty for non-primary members
        phone: "" // Will be empty for non-primary members
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

  // Calculate total price based on selected pricing and member count with group discount
  const calculateTotalPrice = () => {
    if (!selectedEvent || !selectedPricing) {
      setTotalPrice(0);
      setGroupDiscount(0);
      return;
    }

    const pricingTier = selectedEvent.pricing.find(p => p.category === selectedPricing);
    if (pricingTier) {
      const basePrice = pricingTier.currentPrice;
      let total = basePrice * members.length;
      
      // Apply 10% group discount for 5 members
      let discount = 0;
      if (members.length === 5) {
        discount = total * 0.1;
        total = total - discount;
      }
      
      setGroupDiscount(discount);
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

    // Validate primary contact has all required fields
    const primaryContact = members[0];
    if (!primaryContact.name.trim() || !primaryContact.email.trim() || !primaryContact.phone.trim()) {
      setError("Please fill all required fields for primary contact.");
      setStatus("idle");
      return;
    }

    // Validate other members have names
    const incompleteMembers = members.slice(1).filter(member => !member.name.trim());
    if (incompleteMembers.length > 0) {
      setError("Please provide names for all additional members.");
      setStatus("idle");
      return;
    }

    // Check email verification
    if (!isEmailVerified) {
      setError("Please verify your email address before proceeding.");
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
          members: members.map((member, index) => ({
            ...member,
            // Only include email and phone for primary contact
            email: index === 0 ? member.email : '',
            phone: index === 0 ? member.phone : ''
          }))
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      const result = await response.json();
      
      // Check if booking was created and requires payment
      // Since we've implemented payment flow, ALL successful bookings should go through payment
      if (result.success && result.booking) {
        // Store booking data and show payment modal
        setBookingData({
          bookingId: result.booking.id || result.booking._id,
          bookingCode: result.booking.bookingCode || result.bookingCode,
          eventTitle: result.booking.eventTitle || selectedEvent?.title,
          totalAmount: result.booking.totalAmount || totalPrice,
          memberCount: result.booking.memberCount || members.length,
          primaryContact: {
            name: members[0].name,
            email: members[0].email,
            phone: members[0].phone,
          },
        });
        setStatus("payment");
        setShowPaymentModal(true);
        setError(null);
      } else {
        // This should rarely happen now - only if booking creation fails
        setError(result.error || "Booking creation failed. Please try again.");
        setStatus("error");
      }
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

  const handlePaymentSuccess = (result: any) => {
    setPaymentResult(result);
    setStatus("completed");
    setShowPaymentModal(false);
    setError(null);
    
    // Redirect to success page with booking details
    const params = new URLSearchParams({
      code: bookingData?.bookingCode || '',
      paymentId: result.paymentId || '',
    });
    
    // Small delay to show success state before redirect
    setTimeout(() => {
      router.push(`/booking-success?${params.toString()}`);
    }, 2000);
  };

  const handlePaymentError = (error: string) => {
    setError(error);
    setStatus("error");
    setShowPaymentModal(false);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    if (status === "payment") {
      setStatus("idle");
    }
  };

  // OTP verification functions
  const sendOTP = async () => {
    const primaryContact = members[0];
    if (!primaryContact.email.trim()) {
      setOtpError("Please enter email address first.");
      return;
    }

    setOtpLoading(true);
    setOtpError(null);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_GLITZFUSION_API_URL || "http://localhost:3001";
      const response = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: primaryContact.email }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send OTP");
      }

      setOtpSent(true);
      setOtpError(null);
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOTP = async () => {
    const primaryContact = members[0];
    if (!otp.trim()) {
      setOtpError("Please enter the OTP.");
      return;
    }

    setOtpLoading(true);
    setOtpError(null);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_GLITZFUSION_API_URL || "http://localhost:3001";
      const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: primaryContact.email, otp }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Invalid OTP");
      }

      setIsEmailVerified(true);
      setOtpError(null);
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "OTP verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate suppressHydrationWarning>
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-emerald-300">Base Price for {members.length} member{members.length > 1 ? 's' : ''}</div>
                    <div className="text-xs text-zinc-400">
                      ₹{selectedEvent.pricing.find(p => p.category === selectedPricing)?.currentPrice.toLocaleString()} × {members.length}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-white">
                      ₹{((selectedEvent.pricing.find(p => p.category === selectedPricing)?.currentPrice || 0) * members.length).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {/* Group Discount */}
                {groupDiscount > 0 && (
                  <div className="flex items-center justify-between border-t border-emerald-400/20 pt-2">
                    <div>
                      <div className="text-sm text-emerald-300">🎉 Group Discount (5 members)</div>
                      <div className="text-xs text-zinc-400">10% off total amount</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-400">
                        -₹{groupDiscount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Final Total */}
                <div className="flex items-center justify-between border-t border-emerald-400/20 pt-2">
                  <div>
                    <div className="text-sm text-emerald-300 font-semibold">Final Amount</div>
                    {groupDiscount > 0 && (
                      <div className="text-xs text-zinc-400">After group discount</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-300">
                      ₹{totalPrice.toLocaleString()}
                    </div>
                  </div>
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

      {/* Email Verification Section */}
      {members[0]?.email && (
        <div className="rounded-xl border border-white/10 bg-black/40 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">Email Verification</h2>
            {isEmailVerified && (
              <div className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Verified</span>
              </div>
            )}
          </div>

          {!isEmailVerified ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-blue-400/30 bg-blue-400/5">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <p className="text-sm font-medium text-blue-300">Verify your email to continue</p>
                </div>
                <p className="text-xs text-zinc-400">
                  We'll send a verification code to <span className="font-medium text-white">{members[0].email}</span>
                </p>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOTP}
                  disabled={otpLoading || !members[0].email.trim()}
                  className="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {otpLoading ? "Sending OTP..." : "Send Verification Code"}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-emerald-400/30 bg-emerald-400/5">
                    <p className="text-sm text-emerald-300">
                      ✅ Verification code sent to {members[0].email}
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="otp-input" className="block text-sm font-medium text-zinc-100 mb-2">
                      Enter 6-digit code
                    </label>
                    <input
                      id="otp-input"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-emerald-400/50 placeholder:text-zinc-500 focus:border-emerald-400 focus:ring-2 text-center font-mono text-lg tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={verifyOTP}
                      disabled={otpLoading || otp.length !== 6}
                      className="flex-1 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    >
                      {otpLoading ? "Verifying..." : "Verify Code"}
                    </button>
                    
                    <button
                      type="button"
                      onClick={sendOTP}
                      disabled={otpLoading}
                      className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    >
                      Resend
                    </button>
                  </div>
                </div>
              )}

              {otpError && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                  <p className="text-sm text-red-300">{otpError}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-lg border border-emerald-400/30 bg-emerald-400/5">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-emerald-300">Email verified successfully!</p>
                  <p className="text-xs text-zinc-400">You can now proceed with booking</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error and Success Messages */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm text-red-300" role="alert">
            {error}
          </p>
        </div>
      )}

      {status === "completed" && !error && paymentResult && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <p className="text-sm font-semibold text-emerald-300">Payment Successful!</p>
          </div>
          <p className="text-sm text-emerald-300">
            🎉 Booking confirmed! Your booking code is <span className="font-mono font-semibold">{bookingData?.bookingCode}</span>. 
            Check your email for tickets and booking details.
          </p>
          {paymentResult.paymentId && (
            <p className="text-xs text-emerald-400 mt-2">
              Payment ID: {paymentResult.paymentId}
            </p>
          )}
        </div>
      )}

      {status === "payment" && (
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
          <p className="text-sm text-blue-300" role="status">
            📋 Booking created successfully! Please complete the payment to confirm your booking.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={status === "loading" || status === "payment" || status === "completed" || !selectedEvent}
          className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(34,197,94,0.65)] transition hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Creating Booking..." : 
           status === "payment" ? "Payment Pending..." :
           status === "completed" ? "Booking Completed" :
           "Create Booking"}
        </button>
      </div>

      {/* Payment Modal */}
      {bookingData && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={handleClosePaymentModal}
          bookingData={bookingData}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      )}
    </form>
  );
}

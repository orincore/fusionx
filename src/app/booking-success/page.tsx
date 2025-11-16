"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Download, Mail, Calendar } from "lucide-react";
import Link from "next/link";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const bookingCode = searchParams.get("code");
  const paymentId = searchParams.get("paymentId");
  
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingCode) {
      fetchBookingDetails();
    }
  }, [bookingCode]);

  const fetchBookingDetails = async () => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_GLITZFUSION_API_URL || "http://localhost:3001";
      const response = await fetch(`${API_BASE}/api/bookings?code=${bookingCode}`);
      
      if (response.ok) {
        const data = await response.json();
        setBookingDetails(data.booking);
      }
    } catch (error) {
      console.error('Error fetching booking details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 mb-4">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-gray-300">Your FusionX event booking is confirmed</p>
        </div>

        {/* Booking Details Card */}
        <div className="rounded-xl border border-white/10 bg-black/40 p-6 mb-6">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Booking Code</p>
              <p className="text-2xl font-mono font-bold text-emerald-400">
                {bookingCode}
              </p>
            </div>

            {bookingDetails && (
              <>
                <div className="border-t border-white/10 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Event</p>
                      <p className="text-white font-medium">{bookingDetails.eventTitle}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Date</p>
                      <p className="text-white">{bookingDetails.selectedDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Amount</p>
                      <p className="text-emerald-400 font-semibold">
                        ₹{bookingDetails.totalAmount?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Members</p>
                      <p className="text-white">{bookingDetails.members?.length}</p>
                    </div>
                  </div>
                </div>

                {paymentId && (
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs text-gray-400">Payment ID</p>
                    <p className="text-xs text-white font-mono">{paymentId}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
            <Mail className="w-4 h-4" />
            <span className="text-sm">Confirmation email with tickets sent!</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              View Events
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-black hover:bg-emerald-400 transition-colors"
            >
              <Download className="w-4 h-4" />
              Print Receipt
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            Need help? Contact us at{" "}
            <a href="mailto:support@fusionx.com" className="text-emerald-400 hover:underline">
              support@fusionx.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookingSuccessContent />
    </Suspense>
  );
}

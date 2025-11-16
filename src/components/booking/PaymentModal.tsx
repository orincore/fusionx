"use client";

import { useState } from "react";
import { X, CreditCard, Shield, Clock } from "lucide-react";
import { createPaymentOrder, processPayment, PaymentOptions } from "@/lib/payment";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    bookingId: string;
    bookingCode: string;
    eventTitle: string;
    totalAmount: number;
    memberCount: number;
    primaryContact: {
      name: string;
      email: string;
      phone: string;
    };
  };
  onPaymentSuccess: (paymentResult: any) => void;
  onPaymentError: (error: string) => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  bookingData,
  onPaymentSuccess,
  onPaymentError,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Create payment order
      const orderResult = await createPaymentOrder(bookingData.bookingId);
      
      if (!orderResult.success) {
        throw new Error(orderResult.error || 'Failed to create payment order');
      }

      const { orderId, amount, currency, key } = orderResult.data;

      // Step 2: Process payment with Razorpay
      const paymentOptions: PaymentOptions = {
        bookingId: bookingData.bookingId,
        amount: amount,
        currency: currency,
        orderId: orderId,
        bookingCode: bookingData.bookingCode,
        eventTitle: bookingData.eventTitle,
        customerName: bookingData.primaryContact.name,
        customerEmail: bookingData.primaryContact.email,
        customerPhone: bookingData.primaryContact.phone,
        razorpayKey: key, // Pass the key from backend
      };

      const paymentResult = await processPayment(paymentOptions);

      if (paymentResult.success) {
        onPaymentSuccess(paymentResult);
        onClose();
      } else {
        throw new Error(paymentResult.error || 'Payment failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      setError(errorMessage);
      onPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <div className="rounded-xl border border-white/10 bg-black/90 p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Complete Payment</h2>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Booking Summary */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-6">
            <h3 className="font-medium text-white mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Event:</span>
                <span className="text-white font-medium">{bookingData.eventTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Members:</span>
                <span className="text-white">{bookingData.memberCount}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                <span className="text-gray-300">Total Amount:</span>
                <span className="text-emerald-400 font-semibold text-lg">
                  ₹{bookingData.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <Shield className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
              <p className="text-xs text-gray-300">Secure</p>
            </div>
            <div className="text-center">
              <CreditCard className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
              <p className="text-xs text-gray-300">All Cards</p>
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
              <p className="text-xs text-gray-300">Instant</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 mb-4">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-black shadow-[0_0_20px_rgba(34,197,94,0.4)] transition hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay ₹${bookingData.totalAmount.toLocaleString()}`
            )}
          </button>

          {/* Payment Methods Info */}
          <p className="text-xs text-gray-400 text-center mt-4">
            Powered by Razorpay • Supports UPI, Cards, Net Banking & Wallets
          </p>
        </div>
      </div>
    </div>
  );
}

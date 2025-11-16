// Razorpay payment integration for FusionX

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOptions {
  bookingId: string;
  amount: number;
  currency: string;
  orderId: string;
  bookingCode: string;
  eventTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  razorpayKey?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  error?: string;
}

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Create payment order
export const createPaymentOrder = async (bookingId: string): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> => {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_GLITZFUSION_API_URL || "http://localhost:3001";
    const response = await fetch(`${API_BASE}/api/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookingId }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to create payment order');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error creating payment order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create payment order',
    };
  }
};

// Verify payment
export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  bookingId?: string;
}): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> => {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_GLITZFUSION_API_URL || "http://localhost:3001";
    const response = await fetch(`${API_BASE}/api/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Payment verification failed');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment verification failed',
    };
  }
};

// Process payment with Razorpay
export const processPayment = async (options: PaymentOptions): Promise<PaymentResult> => {
  try {
    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      return { success: false, error: 'Failed to load payment gateway' };
    }

    return new Promise((resolve) => {
      const razorpayOptions = {
        key: options.razorpayKey, // Use the key from backend
        amount: options.amount,
        currency: options.currency,
        name: 'FusionX Events',
        description: `Booking for ${options.eventTitle}`,
        order_id: options.orderId,
        prefill: {
          name: options.customerName,
          email: options.customerEmail,
          contact: options.customerPhone,
        },
        theme: {
          color: '#22c55e', // Emerald color to match FusionX theme
        },
        modal: {
          ondismiss: () => {
            resolve({ success: false, error: 'Payment cancelled by user' });
          },
        },
        handler: async (response: any) => {
          // Payment successful, verify on backend
          const verificationResult = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: options.bookingId,
          });

          if (verificationResult.success) {
            resolve({
              success: true,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            });
          } else {
            resolve({
              success: false,
              error: verificationResult.error || 'Payment verification failed',
            });
          }
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment processing failed',
    };
  }
};

// Check payment status
export const checkPaymentStatus = async (bookingId: string): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> => {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_GLITZFUSION_API_URL || "http://localhost:3001";
    const response = await fetch(`${API_BASE}/api/payments/status?bookingId=${bookingId}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to check payment status');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error checking payment status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to check payment status',
    };
  }
};

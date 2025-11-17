import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";

function BookingFormFallback() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="text-center mb-8">
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Book FusionX Event
        </h1>
        <p className="mt-2 text-sm text-zinc-300">
          Loading booking form...
        </p>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
      </div>
    </div>
  );
}

export default function BookPage() {

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="text-center mb-8">
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Book FusionX Event
        </h1>
        <p className="mt-2 text-sm text-zinc-300">
          Select your event, verify your email, add member names (max 5), and secure your booking
        </p>
      </div>

      <Suspense fallback={<BookingFormFallback />}>
        <BookingForm />
      </Suspense>
    </div>
  );
}

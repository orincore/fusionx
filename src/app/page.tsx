import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getUpcomingEvents, getPastEvents, type Event } from "@/lib/events";
import { Hero } from "@/components/home/Hero";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { HomeJsonLd } from "@/components/seo/HomeJsonLd";

interface PastEventsGalleryProps {
  events: Event[];
}

const PastEventsGallery = dynamic<PastEventsGalleryProps>(
  () => import("@/components/home/PastEventsGallery").then((m) => m.PastEventsGallery),
  {
    loading: () => (
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-xl bg-white/5"
            aria-hidden="true"
          />
        ))}
      </div>
    ),
  }
);

export const revalidate = 60;

export default async function Home() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  return (
    <div className="relative overflow-hidden -mt-24 md:-mt-28 lg:-mt-28">
      <Hero />

      <section
        id="upcoming"
        className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 md:flex-row md:gap-12 md:pb-24 md:pt-16"
        aria-labelledby="upcoming-events-heading"
      >
        <UpcomingEventsSection events={upcomingEvents} />
      </section>

      <section
        id="past"
        className="relative z-10 mx-auto max-w-6xl px-4 pb-20 md:pb-28"
        aria-labelledby="past-events-heading"
      >
        <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
          <div>
            <h2
              id="past-events-heading"
              className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              Past Successful Events
            </h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-300 md:text-base">
              A snapshot of FusionX IPs that have already lit up cities, campuses, and
              premium venues.
            </p>
          </div>
        </div>

        <Suspense fallback={null}>
          <PastEventsGallery events={pastEvents} />
        </Suspense>
      </section>

      <HomeJsonLd events={upcomingEvents} />
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/lib/events";

interface PastEventsGalleryProps {
  events: Event[];
}

export function PastEventsGallery({ events }: PastEventsGalleryProps) {
  const pastEvents = events.filter((event) => event.isPast === true || event.status === 'completed');

  if (pastEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🎭</div>
        <h3 className="text-lg font-semibold text-zinc-50 mb-2">No Past Events Yet</h3>
        <p className="text-sm text-zinc-400">
          Past FusionX events will appear here once they're completed.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {pastEvents.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-black/40 pb-3 text-left transition hover:border-emerald-400/70 hover:bg-emerald-400/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {event.poster && !event.poster.includes('PLACEHOLDER') ? (
                <Image
                  src={event.poster}
                  alt={event.title}
                  fill
                  sizes="(min-width: 1024px) 220px, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-900/20 to-emerald-600/20">
                  <div className="text-center">
                    <div className="text-2xl">🎉</div>
                    <div className="mt-1 text-xs text-emerald-300">Event Poster</div>
                  </div>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="p-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300">
                {new Date(event.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                {event.time && ` · ${event.time}`}
              </p>
              <h3 className="mt-1 text-balance text-sm font-semibold text-zinc-50">
                {event.title}
              </h3>
              
              {/* Enhanced Location Display */}
              {event.location ? (
                <p className="mt-1 text-xs text-zinc-400">
                  📍 {event.location.venue}, {event.location.city}
                </p>
              ) : event.venue && (
                <p className="mt-1 text-xs text-zinc-400">
                  📍 {event.venue}
                </p>
              )}

              {/* Available Time Slots for Past Events */}
              {event.dateSlots && event.dateSlots.length > 0 && (
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1">
                    {event.dateSlots[0]?.timeSlots?.slice(0, 2).map((ts, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-zinc-800/50 px-1.5 py-0.5 text-[8px] text-zinc-400"
                      >
                        {ts.startTime} – {ts.endTime}
                      </span>
                    ))}
                    {event.dateSlots[0]?.timeSlots?.length > 2 && (
                      <span className="text-[8px] text-zinc-500">
                        +{event.dateSlots[0].timeSlots.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {event.attendeesCount && event.attendeesCount > 0 ? (
                <p className="mt-2 text-[10px] text-zinc-400">
                  {event.attendeesCount.toLocaleString()}+ attendees
                </p>
              ) : (
                <p className="mt-2 text-[10px] text-zinc-400">
                  {event.status === 'completed' ? 'Completed Event' : 'Past Event'}
                </p>
              )}
              {event.tags && event.tags.length > 0 && (
                <p className="text-[9px] text-emerald-400">
                  #{event.tags[0]}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

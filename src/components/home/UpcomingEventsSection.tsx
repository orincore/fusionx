"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { Event } from "@/lib/events";

interface UpcomingEventsSectionProps {
  events: Event[];
}

const listVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function UpcomingEventsSection({ events }: UpcomingEventsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const posterY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const posterScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const posterStyle: any = prefersReducedMotion
    ? {}
    : { y: posterY, scale: posterScale };

  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    events[0]?.slug ?? null
  );

  const selectedEvent = events.find((event) => event.slug === selectedSlug) ?? events[0];

  return (
    <>
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2
              id="upcoming-events-heading"
              className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              Upcoming drops
            </h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-300 md:text-base">
              Pick a night before it sells out. Each drop has its own storyline,
              vibe, and hype level.
            </p>
          </div>
        </div>

        <motion.ul
          variants={prefersReducedMotion ? undefined : listVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-3"
        >
          {events.map((event) => {
            const isActive = event.slug === selectedEvent?.slug;
            return (
              <motion.li
                key={event.id}
                variants={itemVariants}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => setSelectedSlug(event.slug)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:px-5 md:py-4 ${
                    isActive
                      ? "border-emerald-400/80 bg-emerald-400/10 shadow-[0_0_35px_rgba(34,197,94,0.55)]"
                      : "border-white/5 bg-black/40 hover:border-emerald-400/60 hover:bg-emerald-400/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
                          {new Date(event.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                          {event.time ? ` · ${event.time}` : ""}
                        </p>
                        {event.status === 'sold_out' && (
                          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-300">
                            SOLD OUT
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-semibold text-zinc-50 md:text-base">
                        {event.title}
                      </p>
                      {event.venue && (
                        <p className="mt-1 text-xs text-zinc-400">
                          {event.venue}
                        </p>
                      )}
                      <p className="mt-2 line-clamp-2 text-xs text-zinc-300 md:text-sm">
                        {event.shortDescription}
                      </p>

                      {/* Available Time Slots */}
                      {event.dateSlots && event.dateSlots.length > 0 && (
                        <div className="mt-2">
                          <p className="text-[10px] font-medium text-zinc-400 mb-1">Available Times:</p>
                          <div className="flex flex-wrap gap-1">
                            {event.dateSlots[0]?.timeSlots?.slice(0, 3).map((ts, idx) => (
                              <span
                                key={idx}
                                className="rounded-full bg-zinc-800/50 px-2 py-0.5 text-[9px] text-zinc-300"
                              >
                                {ts.startTime} – {ts.endTime}
                              </span>
                            ))}
                            {event.dateSlots[0]?.timeSlots?.length > 3 && (
                              <span className="text-[9px] text-zinc-400">
                                +{event.dateSlots[0].timeSlots.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Pricing Information */}
                      {event.pricing && event.pricing.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {event.pricing.slice(0, 2).map((price, idx) => (
                            <span
                              key={idx}
                              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                price.priceIncreaseApplied
                                  ? 'bg-orange-500/20 text-orange-300'
                                  : 'bg-emerald-500/20 text-emerald-300'
                              }`}
                            >
                              {price.category}: ₹{price.currentPrice.toLocaleString()}
                              {price.priceIncreaseApplied && ' ↗'}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      {typeof event.attendeesCount === "number" && event.attendeesCount > 0 && (
                        <p className="text-[10px] text-emerald-300">
                          {event.attendeesCount.toLocaleString()}+ attendees
                        </p>
                      )}
                      {typeof event.bookingPercentage === "number" && event.bookingPercentage > 0 && (
                        <p className="mt-1 text-[10px] text-zinc-400">
                          {event.bookingPercentage}% booked
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      <div className="mt-8 w-full md:mt-0 md:w-[320px] lg:w-[360px]">
        <AnimatePresence mode="wait">
          {selectedEvent && (
            <motion.article
              key={selectedEvent.slug}
              style={posterStyle}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-emerald-400/50 bg-gradient-to-b from-zinc-950 via-black to-emerald-950/30 p-4 shadow-[0_0_45px_rgba(0,255,122,0.35)]"
              aria-label={selectedEvent.title}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                <Image
                  src={selectedEvent.poster}
                  alt={selectedEvent.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 100vw"
                  className="object-cover transition duration-700 ease-out will-change-transform"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-emerald-500/10" />
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
                    Highlight IP
                  </p>
                  {selectedEvent.status === 'sold_out' && (
                    <span className="rounded-full bg-red-500/20 px-2 py-1 text-[10px] font-medium text-red-300">
                      SOLD OUT
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-zinc-50 md:text-base">
                  {selectedEvent.title}
                </h3>
                {selectedEvent.venue && (
                  <p className="text-xs text-zinc-400">{selectedEvent.venue}</p>
                )}
                <p className="line-clamp-3 text-xs text-zinc-300 md:text-sm">
                  {selectedEvent.longDescription ?? selectedEvent.shortDescription}
                </p>
                
                {/* Pricing and Booking Info */}
                {selectedEvent.pricing && selectedEvent.pricing.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                      Pricing
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedEvent.pricing.slice(0, 4).map((price, idx) => (
                        <div
                          key={idx}
                          className={`rounded-lg border p-2 ${
                            price.priceIncreaseApplied
                              ? 'border-orange-500/30 bg-orange-500/10'
                              : 'border-emerald-500/30 bg-emerald-500/10'
                          }`}
                        >
                          <p className="text-[10px] font-medium text-zinc-300 capitalize">
                            {price.category.replace('_', ' ')}
                          </p>
                          <p className={`text-xs font-semibold ${
                            price.priceIncreaseApplied ? 'text-orange-300' : 'text-emerald-300'
                          }`}>
                            ₹{price.currentPrice.toLocaleString()}
                            {price.priceIncreaseApplied && (
                              <span className="ml-1 text-[10px]">↗</span>
                            )}
                          </p>
                          <p className="text-[9px] text-zinc-500">
                            {price.availableTickets} left
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    {typeof selectedEvent.bookingPercentage === "number" && selectedEvent.bookingPercentage > 0 && (
                      <div className="rounded-lg border border-white/10 bg-black/40 p-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-zinc-400">Booking Progress</span>
                          <span className="text-emerald-300">{selectedEvent.bookingPercentage}%</span>
                        </div>
                        <div className="mt-1 h-1 rounded-full bg-zinc-800">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300"
                            style={{ width: `${Math.min(selectedEvent.bookingPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {selectedEvent.contactPhone && (
                  <p className="text-[10px] text-zinc-400">
                    Contact:{" "}
                    <a
                      href={`tel:${selectedEvent.contactPhone}`}
                      className="text-emerald-300 hover:text-emerald-200 underline-offset-2 hover:underline"
                    >
                      {selectedEvent.contactPhone}
                    </a>
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={`/events/${selectedEvent.slug}`}
                  className="flex-1 rounded-full bg-emerald-400 px-4 py-2 text-center text-xs font-semibold text-black shadow-[0_0_30px_rgba(34,197,94,0.65)] transition hover:bg-emerald-300"
                >
                  View Details
                </Link>
                {selectedEvent.status !== 'sold_out' ? (
                  <Link
                    href={{ pathname: "/book", query: { eventId: selectedEvent.id } }}
                    className="flex-1 rounded-full border border-emerald-400/60 bg-emerald-400/10 px-4 py-2 text-center text-xs font-medium text-emerald-200 transition hover:bg-emerald-400/20"
                  >
                    Book Now
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex-1 rounded-full border border-gray-600 bg-gray-600/20 px-4 py-2 text-center text-xs font-medium text-gray-400 cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                )}
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

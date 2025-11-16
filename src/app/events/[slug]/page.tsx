import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllEvents, getEventBySlug, type Event } from "@/lib/events";
import { EventJsonLd } from "@/components/seo/EventJsonLd";
import { EventGallery } from "@/components/events/EventGallery";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event not found | FusionX",
    };
  }

  const title = `${event.title} | FusionX`;
  const description = event.shortDescription;

  const url = `https://fusionx.glitzfusion.in/events/${event.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.2fr)] md:items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
            FusionX Event
          </p>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {event.title}
          </h1>
          
          {/* Enhanced Location Display */}
          {event.location ? (
            <div className="mt-4 p-4 rounded-lg border border-emerald-400/30 bg-emerald-400/5">
              <h3 className="text-sm font-medium text-emerald-300 mb-2">📍 Event Location</h3>
              <div className="text-sm text-white">
                <div className="font-semibold">{event.location.venue}</div>
                <div className="text-zinc-300 mt-1">
                  {event.location.address}
                  {event.location.landmark && `, Near ${event.location.landmark}`}
                </div>
                <div className="text-zinc-300">
                  {event.location.city}, {event.location.state} - {event.location.pincode}
                </div>
              </div>
            </div>
          ) : event.venue && (
            <p className="mt-2 text-sm text-zinc-400">{event.venue}</p>
          )}

          {/* Date and Available Time Slots */}
          <div className="mt-4">
            <p className="text-xs text-zinc-400">
              {new Date(event.date).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              {event.time ? ` · ${event.time}` : ""}
            </p>
            
            {/* Available Time Slots */}
            {event.dateSlots && event.dateSlots.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium text-zinc-400 mb-2">Available Time Slots:</p>
                <div className="flex flex-wrap gap-2">
                  {event.dateSlots.map((dateSlot, dateIdx) => (
                    <div key={dateIdx} className="space-y-1">
                      <div className="text-[10px] text-emerald-300 font-medium">
                        {new Date(dateSlot.date).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric"
                        })}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {dateSlot.timeSlots.map((ts, timeIdx) => (
                          <span
                            key={timeIdx}
                            className="rounded-full bg-zinc-800/50 border border-zinc-700 px-2 py-1 text-[10px] text-zinc-300"
                          >
                            {ts.startTime} – {ts.endTime}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4 text-sm text-zinc-200">
            {event.longDescription && (
              <div className="whitespace-pre-wrap leading-relaxed">
                {event.longDescription}
              </div>
            )}
            {!event.longDescription && (
              <p className="leading-relaxed">{event.shortDescription}</p>
            )}
          </div>

          {/* Event Status */}
          {event.status && (
            <div className="mt-6">
              <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                event.status === 'completed' 
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-600/30'
                  : event.status === 'published'
                  ? 'bg-green-600/20 text-green-300 border border-green-600/30'
                  : event.status === 'sold_out'
                  ? 'bg-red-600/20 text-red-300 border border-red-600/30'
                  : 'bg-gray-600/20 text-gray-300 border border-gray-600/30'
              }`}>
                {event.status === 'completed' ? '✓ Event Completed' : event.status.replace('_', ' ')}
              </div>
            </div>
          )}

          {/* Pricing Information (only for upcoming/active events) */}
          {event.pricing &&
            event.pricing.length > 0 &&
            event.status !== 'completed' &&
            event.isPast !== true && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white mb-3">Pricing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.pricing.map((price, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 ${
                      price.priceIncreaseApplied
                        ? 'border-orange-500/30 bg-orange-500/10'
                        : 'border-emerald-500/30 bg-emerald-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-zinc-200 capitalize">
                        {price.category.replace('_', ' ')}
                      </p>
                      {price.priceIncreaseApplied && (
                        <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-medium text-orange-300">
                          PRICE INCREASED
                        </span>
                      )}
                    </div>
                    <p className={`text-lg font-bold ${
                      price.priceIncreaseApplied ? 'text-orange-300' : 'text-emerald-300'
                    }`}>
                      ₹{price.currentPrice.toLocaleString()}
                      {price.priceIncreaseApplied && (
                        <span className="ml-2 text-xs line-through text-zinc-500">
                          ₹{price.basePrice.toLocaleString()}
                        </span>
                      )}
                    </p>
                    {typeof price.availableTickets === "number" && price.availableTickets > 0 && (
                      <p className="text-xs text-zinc-400 mt-1">
                        {price.availableTickets} tickets available
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              {typeof event.bookingPercentage === "number" &&
                event.bookingPercentage > 0 && (
                  <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-zinc-300">Booking Progress</span>
                      <span className="text-emerald-300 font-semibold">{event.bookingPercentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300"
                        style={{ width: `${Math.min(event.bookingPercentage, 100)}%` }}
                      />
                    </div>
                    {event.bookingPercentage >= 50 && (
                      <p className="text-xs text-orange-300 mt-2">
                        ⚡ High demand - prices may increase soon!
                      </p>
                    )}
                  </div>
                )}
            </div>
          )}

          {/* Contact Information */}
          {event.contactPhone && (
            <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4">
              <h3 className="text-sm font-semibold text-white mb-2">Contact</h3>
              <p className="text-sm text-zinc-300">
                For queries: <a href={`tel:${event.contactPhone}`} className="text-emerald-300 hover:text-emerald-200">{event.contactPhone}</a>
              </p>
            </div>
          )}

          {event.tags && event.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-emerald-400/50 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/60 bg-black/60 shadow-[0_0_45px_rgba(0,255,122,0.35)]">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {event.poster && !event.poster.includes('PLACEHOLDER') ? (
                <Image
                  src={event.poster}
                  alt={event.title}
                  fill
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-900/30 to-emerald-600/30">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <div className="text-lg text-emerald-300 font-medium px-4">
                      {event.title}
                    </div>
                    <div className="text-sm text-emerald-400 mt-2">
                      Event Poster
                    </div>
                  </div>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-black/70 p-4 text-sm text-zinc-200">
            {event.status === 'sold_out' && event.isPast !== true && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center">
                <p className="text-sm font-semibold text-red-300">SOLD OUT</p>
                <p className="text-xs text-red-400 mt-1">This event is fully booked</p>
              </div>
            )}
            
            {typeof event.attendeesCount === "number" && event.attendeesCount > 0 && (
              <p className="text-xs text-zinc-400">
                <span className="font-semibold text-emerald-300">
                  {event.attendeesCount.toLocaleString()}+
                </span>{" "}
                people have already experienced this IP.
              </p>
            )}
            
            {/* Booking CTA only for upcoming/active events (not completed/past) */}
            {event.status !== 'completed' && event.isPast !== true && (
              event.status !== 'sold_out' ? (
                <a
                  href={`/book?eventId=${encodeURIComponent(event.id)}`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black shadow-[0_0_30px_rgba(34,197,94,0.65)] transition hover:bg-emerald-300"
                >
                  Book this format
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex w-full items-center justify-center rounded-full bg-gray-600 px-4 py-2 text-xs font-semibold text-gray-400 cursor-not-allowed"
                >
                  Sold Out
                </button>
              )
            )}
            
            {event.contactPhone && (
              <div className="border-t border-white/10 pt-3">
                <p className="text-xs text-zinc-400 mb-2">Need help?</p>
                <a
                  href={`tel:${event.contactPhone}`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-200 transition hover:bg-emerald-400/20"
                >
                  Call {event.contactPhone}
                </a>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Event Gallery and Highlights */}
      <EventGallery 
        gallery={event.gallery} 
        highlights={event.highlights} 
        eventTitle={event.title} 
      />

      <EventJsonLd event={event} />
    </div>
  );
}

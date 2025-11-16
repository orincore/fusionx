import type { Event } from "@/lib/events";

interface EventJsonLdProps {
  event: Event;
}

export function EventJsonLd({ event }: EventJsonLdProps) {
  const status = event.isPast
    ? "https://schema.org/EventCompleted"
    : "https://schema.org/EventScheduled";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.shortDescription,
    startDate: event.date,
    eventStatus: status,
    image: event.poster
      ? `https://fusionx.glitzfusion.in${event.poster}`
      : undefined,
    location: event.venue
      ? {
          "@type": "Place",
          name: event.venue,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      availability: event.isPast
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

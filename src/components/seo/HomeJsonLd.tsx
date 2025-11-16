import type { Event } from "@/lib/events";

interface HomeJsonLdProps {
  events: Event[];
}

export function HomeJsonLd({ events }: HomeJsonLdProps) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FusionX Upcoming Events",
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://fusionx.glitzfusion.in/events/${event.slug}`,
      item: {
        "@type": "Event",
        name: event.title,
        startDate: event.date,
        description: event.shortDescription,
        image: event.poster
          ? `https://fusionx.glitzfusion.in${event.poster}`
          : undefined,
        location: event.venue
          ? {
              "@type": "Place",
              name: event.venue,
            }
          : undefined,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}

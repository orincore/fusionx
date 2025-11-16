export interface EventPricing {
  category: string;
  currentPrice: number;
  basePrice: number;
  priceIncreaseApplied: boolean;
  availableTickets: number;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO
  time?: string;
  venue?: string;
  shortDescription: string;
  longDescription?: string;
  poster: string; // R2 URL or path under /public
  gallery?: string[];
  highlights?: string[]; // Event highlights/recap media
  tags?: string[];
  isPast?: boolean;
  attendeesCount?: number;
  contactPhone?: string;
  status?: string;
  bookingPercentage?: number;
  pricing?: EventPricing[];
}

const GLITZFUSION_API_BASE = process.env.NEXT_PUBLIC_GLITZFUSION_API_URL || 'http://localhost:3001';

async function fetchEventsFromAPI(): Promise<Event[]> {
  try {
    const response = await fetch(`${GLITZFUSION_API_BASE}/api/public/fusionx-events`, {
      cache: 'no-store', // Always fetch fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }

    const events = await response.json();
    return events as Event[];
  } catch (error) {
    console.error('Error fetching events from API:', error);
    
    // Fallback to mock data if API fails
    return [
      {
        id: "fx-neon-night-001",
        title: "FusionX Neon Night 2025",
        slug: "fusionx-neon-night-2025",
        date: "2025-12-20T18:30:00.000Z",
        time: "8:00 PM",
        venue: "GlitzFusion Arena, Mumbai",
        shortDescription: "A high-energy collision of music, motion graphics, and interactive light sculptures.",
        longDescription: "Step into an immersive neon universe where DJs, live performers, and generative visuals sync perfectly with the crowd. FusionX Neon Night is designed as a 360° sensory experience, combining cutting-edge lighting rigs, laser mapping, and interactive installations.",
        poster: "/events/neon-night-2025.jpg",
        gallery: [
          "/events/neon-night-2025-1.jpg",
          "/events/neon-night-2025-2.jpg",
          "/events/neon-night-2025-3.jpg"
        ],
        tags: ["music", "neon", "interactive", "festival"],
        isPast: false,
        attendeesCount: 1200
      }
    ];
  }
}

export async function getAllEvents(): Promise<Event[]> {
  const events = await fetchEventsFromAPI();
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const events = await fetchEventsFromAPI();
  return events.find((event) => event.slug === slug);
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const events = await fetchEventsFromAPI();
  const now = new Date();

  return events.filter((event) => {
    if (event.isPast === true) return false;
    const date = new Date(event.date);
    return date.getTime() >= now.getTime();
  });
}

export async function getPastEvents(): Promise<Event[]> {
  const events = await fetchEventsFromAPI();
  const now = new Date();

  return events.filter((event) => {
    // Include events marked as past or completed
    if (event.isPast === true || event.status === 'completed') return true;
    // Include events with past dates
    const date = new Date(event.date);
    return date.getTime() < now.getTime();
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending (newest first)
}

export interface HeroMedia {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  position: number;
}

export async function fetchHeroMedia(): Promise<HeroMedia[]> {
  try {
    // Call FusionX's own proxy route, which forwards to GlitzFusion.
    // This avoids exposing or depending on the GlitzFusion URL in the browser.
    const response = await fetch('/api/public/hero-media', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching hero media:', error);
    return []; // Return empty array as fallback
  }
}

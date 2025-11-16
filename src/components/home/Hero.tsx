"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fetchHeroMedia, type HeroMedia } from "@/lib/heroMedia";

export function Hero() {
  const [heroMedia, setHeroMedia] = useState<HeroMedia[]>([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const bgTranslateY = useTransform(scrollY, [0, 400], [0, 80]);
  const titleTranslateY = useTransform(scrollY, [0, 300], [0, -40]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  useEffect(() => {
    const loadHeroMedia = async () => {
      const media = await fetchHeroMedia();
      setHeroMedia(media);
    };
    loadHeroMedia();
  }, []);

  // Auto-rotate through media if multiple items exist
  useEffect(() => {
    if (heroMedia.length > 1) {
      const interval = setInterval(() => {
        setCurrentMediaIndex((prev) => (prev + 1) % heroMedia.length);
      }, 8000); // Change every 8 seconds
      return () => clearInterval(interval);
    }
  }, [heroMedia.length]);

  const currentMedia = heroMedia[currentMediaIndex];

  return (
    <section
      aria-labelledby="fusionx-hero-heading"
      className="relative min-h-screen overflow-hidden border-b border-white/5 bg-gradient-to-b from-black via-black to-zinc-950"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={prefersReducedMotion ? {} : { y: bgTranslateY }}
      >
        {/* Dynamic Hero Media Background */}
        <div className="absolute inset-0">
          {currentMedia ? (
            <div className="relative h-full w-full">
              {currentMedia.mediaType === 'image' ? (
                <Image
                  src={currentMedia.mediaUrl}
                  alt={currentMedia.title}
                  fill
                  className="object-cover opacity-40"
                  priority
                />
              ) : (
                <video
                  src={currentMedia.mediaUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover opacity-40"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          ) : (
            // Fallback: solid black background when no media is available
            <div className="h-full w-full bg-black" />
          )}
        </div>

        <div className="absolute -left-40 top-10 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />

        {/* Media indicators for multiple hero media */}
        {heroMedia.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {heroMedia.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMediaIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentMediaIndex
                    ? 'bg-emerald-400 w-6'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`View hero media ${index + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          className="text-center"
          style={prefersReducedMotion ? {} : { y: titleTranslateY, opacity: titleOpacity }}
        >
          <motion.h1
            id="fusionx-hero-heading"
            className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Experience the</span>
            <span className="block bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 bg-clip-text text-transparent">
              FusionX
            </span>
            <span className="block text-3xl sm:text-5xl lg:text-6xl font-medium">
              Revolution
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Immersive experiences that blend music, technology, and storytelling.
            From festivals to campus tours, we create moments that matter.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="#upcoming"
              className="rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-black shadow-lg transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              Explore Events
            </Link>
            <Link
              href="/book"
              className="rounded-full border border-emerald-400/60 bg-emerald-400/10 px-8 py-3 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              Book FusionX
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface EventGalleryProps {
  gallery?: string[];
  highlights?: string[];
  eventTitle: string;
}

export function EventGallery({ gallery = [], highlights = [], eventTitle }: EventGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine gallery and highlights, filter out placeholders
  const allMedia = [
    ...gallery.filter(url => !url.includes('PLACEHOLDER')),
    ...highlights.filter(url => !url.includes('PLACEHOLDER'))
  ];

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|mov|avi)$/i);
  };

  const openLightbox = (url: string) => {
    const index = allMedia.indexOf(url);
    setCurrentIndex(index);
    setSelectedMedia(url);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : allMedia.length - 1;
    setCurrentIndex(newIndex);
    setSelectedMedia(allMedia[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < allMedia.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedMedia(allMedia[newIndex]);
  };

  if (allMedia.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-2">
            {highlights.length > 0 && gallery.length === 0 
              ? "Event Highlights" 
              : "Event Gallery"
            }
          </h2>
          <p className="text-sm text-zinc-400">
            {highlights.length > 0 && gallery.length > 0 
              ? `${gallery.length} gallery images and ${highlights.length} event highlights`
              : highlights.length > 0 
                ? `${highlights.length} event highlights`
                : `${gallery.length} gallery images`
            }
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allMedia.map((url, index) => (
            <button
              key={index}
              onClick={() => openLightbox(url)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/40 transition hover:border-emerald-400/50"
            >
              {isVideo(url) ? (
                <div className="relative w-full h-full">
                  <video
                    src={url}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                    <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                      <Play className="h-6 w-6 text-white fill-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={url}
                  alt={`${eventTitle} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-7xl max-h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation buttons */}
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Media content */}
              <div className="flex items-center justify-center h-full">
                {isVideo(selectedMedia) ? (
                  <video
                    src={selectedMedia}
                    controls
                    autoPlay
                    className="max-w-full max-h-full rounded-lg"
                  />
                ) : (
                  <Image
                    src={selectedMedia}
                    alt={`${eventTitle} - Gallery`}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                )}
              </div>

              {/* Counter */}
              {allMedia.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                  {currentIndex + 1} / {allMedia.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

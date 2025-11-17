"use client";

import { useState } from "react";

interface ShareEventButtonProps {
  url: string;
  title: string;
}

export function ShareEventButton({ url, title }: ShareEventButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      setIsSharing(true);
      setCopied(false);

      if (navigator.share) {
        await navigator.share({
          title,
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback: simple prompt copy
        window.prompt("Copy this event link:", url);
      }
    } catch (error) {
      // User may cancel share; ignore
      console.error("Share failed", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={isSharing}
      className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-200 transition hover:bg-emerald-400/20 disabled:opacity-60"
    >
      <span className="mr-1">{copied ? "Link copied" : "Share event"}</span>
      <span aria-hidden>↗</span>
    </button>
  );
}

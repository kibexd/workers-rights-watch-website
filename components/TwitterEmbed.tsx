"use client";

import { useEffect, useRef, useState } from "react";

/**
 * TwitterEmbed renders a fully interactive X (Twitter) card embed.
 * - Always loads widgets.js only once.
 * - Always calls widgets.load on the embed after render.
 * - Retries if needed to ensure the card is always interactive.
 * - Apple-style glowy animated background, no border/radius mismatch.
 * - Accepts className for parent layout styling (e.g. break-inside-avoid for masonry).
 */
export default function TwitterEmbed({ tweetHtml, className = "" }: { tweetHtml: string, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure widgets.js is loaded only once
  useEffect(() => {
    setMounted(true);
    if (!document.getElementById('twitter-widgets-js')) {
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      script.id = "twitter-widgets-js";
      document.body.appendChild(script);
    }
  }, []);

  // MutationObserver to robustly reload the embed
  useEffect(() => {
    if (!mounted || !ref.current) return;
    let tries = 0;
    const maxTries = 15;
    const win = window as any;

    const tryLoad = () => {
      if (win['twttr']?.widgets?.load && ref.current) {
        win['twttr'].widgets.load(ref.current);
      }
    };

    // Initial load
    tryLoad();

    // Retry if still not upgraded
    const interval = setInterval(() => {
      if (ref.current && ref.current.querySelector('.twitter-tweet-rendered')) {
        clearInterval(interval);
      } else if (tries < maxTries) {
        tryLoad();
        tries++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    // MutationObserver to reload on DOM changes
    const observer = new MutationObserver(() => {
      tryLoad();
    });
    observer.observe(ref.current, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [mounted, tweetHtml]);

  if (!mounted) return null;

  return (
    <div className={`relative flex justify-center items-center py-6 ${className}`}>
      {/* Glowy animated background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          filter: "blur(32px)",
          background: "radial-gradient(circle at 50% 40%, #10bfae55 0%, #0a0a0a 80%)",
          opacity: 0.7,
          animation: "glowPulse 3s ease-in-out infinite alternate"
        }}
      />
      {/* The actual Twitter embed */}
      <div
        ref={ref}
        className="relative z-10"
        dangerouslySetInnerHTML={{ __html: tweetHtml }}
      />
      <style jsx>{`
        @keyframes glowPulse {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// To add more X (Twitter) posts in the future, simply:
// 1. Import and use <TwitterEmbed tweetHtml={...} /> in your columns layout.
// 2. Copy the blockquote HTML from X (Twitter) and pass as tweetHtml.
// 3. For best results, use className="break-inside-avoid mb-8" for each card.
//
// Example:
//   // <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 w-full max-w-6xl mx-auto space-y-8 pb-8">
//   //   <TwitterEmbed tweetHtml={`<blockquote class="twitter-tweet">...</blockquote>`} className="break-inside-avoid mb-8" />
//   //   <TwitterEmbed tweetHtml={`<blockquote class="twitter-tweet">...</div>`} className="break-inside-avoid mb-8" />
//   //   {/* Add more here! */}
//   // </div>
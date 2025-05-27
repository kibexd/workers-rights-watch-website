"use client";

import { useEffect, useRef, useState } from "react";

/**
 * TwitterEmbed renders a fully interactive X (Twitter) card embed.
 * - Always loads widgets.js only once.
 * - Always calls widgets.load on the embed after render.
 * - Retries if needed to ensure the card is always interactive.
 * - Apple-style glowy animated background, no border/radius mismatch.
 */
export default function TwitterEmbed({ tweetHtml }: { tweetHtml: string }) {
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

  // After every render, try to upgrade the blockquote robustly
  useEffect(() => {
    if (!mounted) return;
    let tries = 0;
    const maxTries = 10;
    const tryLoad = () => {
      const win = window as any;
      if (win['twttr']?.widgets?.load && ref.current) {
        win['twttr'].widgets.load(ref.current);
      } else if (tries < maxTries) {
        tries++;
        setTimeout(tryLoad, 300);
      }
    };
    tryLoad();
  }, [mounted, tweetHtml]);

  if (!mounted) return null;

  return (
    <div className="relative flex justify-center items-center py-6">
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
// 1. Import and use <TwitterEmbed tweetHtml={...} /> in your grid or flex layout.
// 2. Copy the blockquote HTML from X (Twitter) and pass as tweetHtml.
// 3. For best results, wrap each <TwitterEmbed /> in a container with padding and spacing.
//
// Example:
//   // <div className="grid md:grid-cols-2 gap-8">
//   //   <TwitterEmbed tweetHtml={`<blockquote class=\"twitter-tweet\">...</blockquote>`} />
//   //   <TwitterEmbed tweetHtml={`<blockquote class=\"twitter-tweet\">...</blockquote>`} />
//   //   {/* Add more here! */}
//   // </div> 
"use client";

import { useEffect, useRef, useState } from "react";

export default function TwitterEmbed({ tweetHtml }: { tweetHtml: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Load widgets.js if not already loaded
    const win = window as any;
    if (!win['twttr']) {
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    } else if (win['twttr']?.widgets?.load) {
      win['twttr'].widgets.load();
    }
  }, [mounted, tweetHtml]);

  if (!mounted) return null;

  return (
    <div ref={ref} dangerouslySetInnerHTML={{ __html: tweetHtml }} />
  );
} 
import React from "react";

export default function Marquee() {
  return (
    <div className="w-full bg-gradient-to-r from-teal-400 via-white to-orange-400 border-b-2 border-neutral-900 overflow-hidden relative z-30 h-10">
      <div className="relative w-full h-10">
        <div className="absolute top-0 left-0 flex items-center whitespace-nowrap animate-marquee-continuous h-10" style={{ minWidth: '300%' }}>
          <span className="font-bold text-xl md:text-2xl tracking-wide text-black px-4">
            Workers Rights Watch • Empowering Workers • Dignity • Equality • Justice • WRW Impact • Safe Workplaces • Gender Equality • Legal Support • Community • Advocacy •
          </span>
          <span className="font-bold text-xl md:text-2xl tracking-wide text-black px-4">
            Workers Rights Watch • Empowering Workers • Dignity • Equality • Justice • WRW Impact • Safe Workplaces • Gender Equality • Legal Support • Community • Advocacy •
          </span>
          <span className="font-bold text-xl md:text-2xl tracking-wide text-black px-4">
            Workers Rights Watch • Empowering Workers • Dignity • Equality • Justice • WRW Impact • Safe Workplaces • Gender Equality • Legal Support • Community • Advocacy •
          </span>
        </div>
      </div>
    </div>
  );
} 
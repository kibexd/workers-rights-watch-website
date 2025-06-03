"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface CarouselItem {
  type: "image" | "video"
  src: string
  alt: string
  videoUrl?: string
}

interface HeroCarouselProps {
  items: CarouselItem[];
  autoplayInterval?: number;
}

export function HeroCarousel({ items, autoplayInterval = 5000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, autoplayInterval) // Use the prop for interval

    return () => clearInterval(timer)
  }, [isPlaying, items.length, autoplayInterval])

  const handleMouseEnter = () => setIsPlaying(false)
  const handleMouseLeave = () => setIsPlaying(true)

  return (
    <div 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {items[currentIndex].type === "video" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={items[currentIndex].videoUrl} type="video/mp4" />
            </video>
          ) : (
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "linear" }}
              className="relative w-full h-full"
            >
              <Image
                src={items[currentIndex].src}
                alt={items[currentIndex].alt}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A]" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-teal-500 w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
} 
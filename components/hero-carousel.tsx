"use client"

import { useEffect, useState, useRef } from "react"
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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Preload next video
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % items.length
    if (items[nextIndex].type === "video" && items[nextIndex].videoUrl) {
      const video = new Audio()
      video.src = items[nextIndex].videoUrl
      video.load()
    }
  }, [currentIndex, items])

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, autoplayInterval)

    return () => clearInterval(timer)
  }, [isPlaying, items.length, autoplayInterval])

  const handleMouseEnter = () => setIsPlaying(false)
  const handleMouseLeave = () => setIsPlaying(true)

  const handleVideoError = () => {
    console.error("Error loading video:", items[currentIndex].videoUrl)
    // Move to next item if video fails to load
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }

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
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              onError={handleVideoError}
              onLoadedData={handleVideoLoaded}
              className="w-full h-full object-cover"
              style={{ opacity: isVideoLoaded ? 1 : 0 }}
            >
              <source src={items[currentIndex].videoUrl} type="video/mp4" />
              <source src={items[currentIndex].videoUrl} type="video/webm" />
              <source src={items[currentIndex].videoUrl} type="video/quicktime" />
              <source src={items[currentIndex].videoUrl} type="video/x-matroska" />
              Your browser does not support the video tag.
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
                quality={100}
                sizes="100vw"
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
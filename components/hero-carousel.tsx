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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const preloadRef = useRef<HTMLVideoElement>(null)

  // Optimize video preloading
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % items.length
    if (items[nextIndex].type === "video" && items[nextIndex].videoUrl) {
      if (preloadRef.current) {
        preloadRef.current.src = items[nextIndex].videoUrl
        preloadRef.current.load()
      }
    }
  }, [currentIndex, items])

  // Handle video transitions
  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length)
        setIsTransitioning(false)
      }, 500)
    }, autoplayInterval)

    return () => clearInterval(timer)
  }, [isPlaying, items.length, autoplayInterval])

  const handleMouseEnter = () => setIsPlaying(false)
  const handleMouseLeave = () => setIsPlaying(true)

  const handleVideoError = () => {
    console.error("Error loading video:", items[currentIndex].videoUrl)
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
      {/* Hidden preload video element */}
      <video
        ref={preloadRef}
        className="hidden"
        preload="auto"
        muted
        playsInline
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {items[currentIndex].type === "video" ? (
            <div className="relative w-full h-full">
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                onError={handleVideoError}
                onLoadedData={handleVideoLoaded}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  perspective: '1000px'
                }}
              >
                <source 
                  src={items[currentIndex].videoUrl} 
                  type="video/mp4"
                  media="(min-width: 768px)"
                />
                <source 
                  src={items[currentIndex].videoUrl?.replace('.mp4', '-mobile.mp4')} 
                  type="video/mp4"
                  media="(max-width: 767px)"
                />
                Your browser does not support the video tag.
              </video>
            </div>
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
                quality={85}
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
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrentIndex(index)
                setIsTransitioning(false)
              }, 500)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-teal-500 w-8" : "bg-white/50"
            }`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  )
} 
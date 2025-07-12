"use client"

import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

interface CarouselItem {
  type: 'image' | 'video'
  src: string
  alt: string
  title: string
  description: string
}

interface ParallaxCarouselProps {
  items: CarouselItem[]
  autoAdvance?: boolean
  interval?: number
}

export function ParallaxCarousel({
  items,
  autoAdvance = true,
  interval = 4500,
}: ParallaxCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const total = items.length
  const containerRef = useRef<HTMLDivElement>(null)

  // Responsive card sizing
  const [cardSize, setCardSize] = useState({ width: 340, height: 420, gap: 32 })

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return
      const width = containerRef.current.offsetWidth
      let cardW = 340, cardH = 420, gap = 32
      if (width < 500) {
        cardW = 220; cardH = 280; gap = 16
      } else if (width < 800) {
        cardW = 260; cardH = 320; gap = 20
      } else if (width < 1100) {
        cardW = 320; cardH = 400; gap = 28
      }
      setCardSize({ width: cardW, height: cardH, gap })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-advance effect
  useEffect(() => {
    if (!autoAdvance || isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, interval)
    return () => clearInterval(timer)
  }, [autoAdvance, interval, total, isPaused])

  // Navigation
  const goToNext = () => setCurrent((prev) => (prev + 1) % total)
  const goToPrev = () => setCurrent((prev) => (prev - 1 + total) % total)
  const togglePause = () => setIsPaused((p) => !p)

  // Calculate translateX for each card
  const getCardStyle = (i: number) => {
    const { width, gap } = cardSize
    let offset = i - current
    // Wrap for circular effect
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total
    // Only show center and neighbors
    const visible = Math.abs(offset) <= 1
    const zIndex = 10 - Math.abs(offset)
    return {
      transform: `translateX(${offset * (width + gap)}px) scale(${offset === 0 ? 1 : 0.92}) rotateY(${offset * -18}deg)` + (offset === 0 ? '' : ' perspective(800px)'),
      opacity: visible ? 1 : 0,
      zIndex,
      transition: 'transform 0.7s cubic-bezier(.4,0,.2,1), opacity 0.5s cubic-bezier(.4,0,.2,1)',
      pointerEvents: visible ? 'auto' : 'none',
      boxShadow: offset === 0 ? '0 8px 32px 0 rgba(0,0,0,0.18)' : '0 2px 8px 0 rgba(0,0,0,0.10)',
      border: '2px solid #222',
      background: '#fff',
    } as React.CSSProperties
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative overflow-visible px-2 md:px-6 lg:px-10"
      style={{ minHeight: cardSize.height + 32 }}
    >
      {/* Card Row */}
      <div
        className="relative flex items-center justify-center w-full h-full"
        style={{
          height: cardSize.height,
          minWidth: cardSize.width + cardSize.gap * 2,
          maxWidth: '100%',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="absolute rounded-2xl overflow-hidden bg-white transition-all duration-700 ease-in-out shadow-lg"
            style={{
              width: cardSize.width,
              height: cardSize.height,
              left: '50%',
              top: 0,
              marginLeft: -cardSize.width / 2,
              ...getCardStyle(i),
            }}
          >
            <div
              className="w-full h-full relative flex flex-col justify-end"
              style={{ background: item.type === 'image' ? `url(${item.src}) center/cover` : undefined }}
            >
              {item.type === 'video' && (
                <video
                  src={item.src}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ zIndex: 1 }}
                />
              )}
              <div className="relative z-10 p-5 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h2 className="text-lg md:text-xl font-bold mb-1 drop-shadow-lg">{item.title}</h2>
                <p className="text-xs md:text-sm text-gray-200 drop-shadow-md">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 shadow-lg z-20">
        <button
          onClick={goToPrev}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Previous card"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={togglePause}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play className="h-5 w-5 text-white" /> : <Pause className="h-5 w-5 text-white" />}
        </button>
        <button
          onClick={goToNext}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Next card"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
      {/* Progress dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-white scale-125 shadow' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 
"use client"

import { cn } from "@/lib/utils"

interface LoadingProps {
  size?: number
  color?: string
  className?: string
  message?: string
}

export function Loading({ size = 40, color = "currentColor", className, message }: LoadingProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <svg
        className="container"
        x="0px"
        y="0px"
        viewBox="0 0 40 40"
        height={size}
        width={size}
        preserveAspectRatio="xMidYMid meet"
        style={{
          "--uib-size": `${size}px`,
          "--uib-color": color,
          "--uib-speed": "1.4s",
          "--uib-bg-opacity": "0.1",
        } as React.CSSProperties}
      >
        <path
          className="track"
          fill="none"
          strokeWidth="4"
          pathLength="100"
          d="M29.76 18.72c0 7.28-3.92 13.6-9.84 16.96-2.88 1.68-6.24 2.64-9.84 2.64-3.6 0-6.88-0.96-9.76-2.64 0-7.28 3.92-13.52 9.84-16.96 2.88-1.68 6.24-2.64 9.76-2.64s6.88 0.96 9.76 2.64c5.84 3.36 9.76 9.68 9.84 16.96-2.88 1.68-6.24 2.64-9.76 2.64-3.6 0-6.88-0.96-9.84-2.64-5.84-3.36-9.76-9.68-9.76-16.96 0-7.28 3.92-13.6 9.76-16.96C25.84 5.12 29.76 11.44 29.76 18.72z"
        />
        <path
          className="car"
          fill="none"
          strokeWidth="4"
          pathLength="100"
          d="M29.76 18.72c0 7.28-3.92 13.6-9.84 16.96-2.88 1.68-6.24 2.64-9.84 2.64-3.6 0-6.88-0.96-9.76-2.64 0-7.28 3.92-13.52 9.84-16.96 2.88-1.68 6.24-2.64 9.76-2.64s6.88 0.96 9.76 2.64c5.84 3.36 9.76 9.68 9.84 16.96-2.88 1.68-6.24 2.64-9.76 2.64-3.6 0-6.88-0.96-9.84-2.64-5.84-3.36-9.76-9.68-9.76-16.96 0-7.28 3.92-13.6 9.76-16.96C25.84 5.12 29.76 11.44 29.76 18.72z"
        />
      </svg>
      {message && (
        <p className="text-sm text-gray-400 animate-pulse">{message}</p>
      )}
      <style jsx>{`
        .container {
          --uib-size: 40px;
          --uib-color: black;
          --uib-speed: 1.4s;
          --uib-bg-opacity: 0.1;
          height: var(--uib-size);
          width: var(--uib-size);
          transform-origin: center;
          overflow: visible;
        }

        .car {
          fill: none;
          stroke: var(--uib-color);
          stroke-dasharray: 15, 85;
          stroke-dashoffset: 0;
          stroke-linecap: round;
          animation: travel var(--uib-speed) linear infinite;
          will-change: stroke-dasharray, stroke-dashoffset;
          transition: stroke 0.5s ease;
        }

        .track {
          stroke: var(--uib-color);
          opacity: var(--uib-bg-opacity);
          transition: stroke 0.5s ease;
        }

        @keyframes travel {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  )
} 
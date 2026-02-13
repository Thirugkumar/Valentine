'use client'

import { useMemo } from 'react'
import type { ThemeId } from '@/lib/theme'

const BALLOON_COLORS = [
  'from-pink-400 to-rose-500',
  'from-rose-400 to-red-500',
  'from-red-400 to-rose-600',
  'from-purple-400 to-pink-500',
  'from-pink-300 to-rose-400',
]

interface BalloonsProps {
  count?: number
  themeId: ThemeId
  /** Start off-screen bottom and animate up */
  animateUp?: boolean
  className?: string
}

export default function Balloons({
  count = 8,
  themeId,
  animateUp = true,
  className = '',
}: BalloonsProps) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 5 + (i / (count - 1 || 1)) * 80 + (Math.random() - 0.5) * 10,
        delay: i * 0.15 + Math.random() * 0.3,
        duration: 4 + Math.random() * 2,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        size: 0.8 + Math.random() * 0.6,
        floatDelay: Math.random() * 2,
      })),
    [count]
  )

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ perspective: 1000 }}
    >
      {balloons.map((b) => (
        <div
          key={b.id}
          className={`absolute animate-float balloon-rise bg-gradient-to-b ${b.color} rounded-full shadow-lg`}
          style={{
            left: `${b.left}%`,
            bottom: animateUp ? '-15%' : `${10 + Math.random() * 30}%`,
            width: `${48 * b.size}px`,
            height: `${60 * b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)',
          }}
        />
      ))}
    </div>
  )
}

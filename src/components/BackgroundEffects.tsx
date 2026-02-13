'use client'

import { useMemo } from 'react'
import type { ThemeId } from '@/lib/theme'

interface BackgroundEffectsProps {
  themeId: ThemeId
  /** Show glass blobs (dreamy) */
  showBlobs?: boolean
  /** Show sparkles (dreamy, genz) */
  showSparkles?: boolean
  /** Show subtle particles (dark) */
  showParticles?: boolean
  /** Extra class for container */
  className?: string
}

export default function BackgroundEffects({
  themeId,
  showBlobs = true,
  showSparkles = themeId === 'dreamy' || themeId === 'genz',
  showParticles = themeId === 'dark',
  className = '',
}: BackgroundEffectsProps) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        size: 2 + Math.random() * 4,
      })),
    []
  )

  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 2,
      })),
    []
  )

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Glass blobs - dreamy */}
      {showBlobs && themeId === 'dreamy' && (
        <>
          <div
            className="absolute w-[400px] h-[400px] rounded-full bg-rose-400/20 blur-[100px] animate-blob"
            style={{ left: '10%', top: '20%' }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full bg-violet-400/20 blur-[80px] animate-blob animation-delay-2000"
            style={{ right: '10%', top: '60%' }}
          />
          <div
            className="absolute w-[350px] h-[350px] rounded-full bg-pink-400/20 blur-[90px] animate-blob animation-delay-4000"
            style={{ left: '50%', bottom: '10%' }}
          />
        </>
      )}

      {/* Sparkles */}
      {showSparkles && (
        <div className="absolute inset-0">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full bg-white animate-sparkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Dark theme shimmer particles */}
      {showParticles && themeId === 'dark' && (
        <div className="absolute inset-0">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute w-1 h-1 rounded-full bg-rose-400/40 animate-float"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

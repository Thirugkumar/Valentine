'use client'

import { useMemo } from 'react'
import type { ThemeId } from '@/lib/theme'

const HEARTS = ['💖', '💕', '💗', '💓', '💝']

interface FloatingHeartsProps {
  count?: number
  themeId: ThemeId
  /** Larger size for welcome/gift scenes */
  size?: 'sm' | 'md' | 'lg'
  /** 3D depth: different scale/opacity by layer */
  depthLayers?: boolean
  className?: string
}

export default function FloatingHearts({
  count = 20,
  themeId,
  size = 'md',
  depthLayers = false,
  className = '',
}: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        layer: depthLayers ? (i % 3) as 0 | 1 | 2 : 0,
      })),
    [count, depthLayers]
  )

  const sizeClass =
    size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-5xl md:text-6xl' : 'text-4xl'

  const opacityByLayer = depthLayers
    ? (layer: number) => (layer === 0 ? 'opacity-10' : layer === 1 ? 'opacity-20' : 'opacity-30')
    : () => 'opacity-20'

  const scaleByLayer = depthLayers
    ? (layer: number) => (layer === 0 ? 'scale-75' : layer === 1 ? 'scale-100' : 'scale-125')
    : () => ''

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${sizeClass} ${opacityByLayer(heart.layer)} ${scaleByLayer(heart.layer)} animate-float`}
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            transformStyle: 'preserve-3d',
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  )
}

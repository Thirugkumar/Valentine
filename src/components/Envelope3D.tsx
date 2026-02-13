'use client'

import { useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '@/components/ThemeProvider'
import FloatingHearts from './FloatingHearts'
import BackgroundEffects from './BackgroundEffects'
import { ease } from '@/lib/animation'

interface Envelope3DProps {
  onOpen: () => void
  className?: string
}

export default function Envelope3D({ onOpen, className = '' }: Envelope3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const envelopeRef = useRef<HTMLDivElement>(null)
  const flapRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const [isOpening, setIsOpening] = useState(false)
  const { themeId, theme } = useTheme()

  const handleClick = useCallback(() => {
    if (isOpening) return
    setIsOpening(true)
    if (!envelopeRef.current || !flapRef.current || !paperRef.current) {
      onOpen()
      return
    }

    const tl = gsap.timeline({ defaults: { ease: ease.smooth } })
    tl.to(flapRef.current, {
      rotationX: -180,
      transformOrigin: 'top center',
      duration: 0.6,
      ease: 'power2.inOut',
    })
      .to(
        paperRef.current,
        {
          y: -80,
          opacity: 0,
          duration: 0.4,
        },
        '-=0.2'
      )
      .to(envelopeRef.current, { scale: 0.95, opacity: 0.8, duration: 0.2 })
      .call(onOpen, [], '+=0.3')
  }, [isOpening, onOpen])

  return (
    <div
      ref={containerRef}
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden pt-14 ${theme.bgClass} ${className}`}
      style={{ perspective: 1000 }}
    >
      <BackgroundEffects themeId={themeId} showSparkles={themeId === 'dreamy'} />
      <FloatingHearts themeId={themeId} count={12} size="sm" />

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        <div
          ref={envelopeRef}
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          className="relative w-64 h-40 md:w  80 md:h-52 cursor-pointer envelope-3d"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)',
          }}
        >
          {/* Envelope body - glass style */}
          <div
            className={`absolute inset-0 ${theme.glass.backdrop} ${theme.glass.bg} ${theme.glass.border} ${theme.glass.rounded} shadow-2xl`}
            style={{
              boxShadow: themeId === 'dark' ? '0 0 40px rgba(244, 63, 94, 0.3)' : undefined,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl md:text-6xl opacity-100">💌</span>
            </div>
          </div>

          {/* Flap */}
          <div
            ref={flapRef}
            className={`absolute top-0 left-0 right-0 h-1/2 ${theme.glass.backdrop} ${theme.glass.bg} ${theme.glass.border} ${theme.glass.rounded} origin-top`}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center',
              boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
            }}
          />

          {/* Paper peeking out */}
          <div
            ref={paperRef}
            className={`absolute bottom-2 left-4 right-4 h-8 ${themeId === 'dark' ? 'bg-amber-50/90' : 'bg-white/50'} ${theme.glass.rounded} shadow-lg mb-2`}
            style={{ transform: 'translateZ(1px)' }}
          >
            <span className="text-base font-semibold opacity-60 flex items-center justify-center mt-1 ">Open</span>
          </div>
        </div>
      </div>

      <p className={`absolute bottom-48 md:bottom-24 left-0 right-0 text-center ${theme.text} opacity-70 text-xl md:text-base`}>
        Click the envelope to open it
      </p>
    </div>
  )
}

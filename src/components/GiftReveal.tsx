'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '@/components/ThemeProvider'
import FloatingHearts from './FloatingHearts'
import BackgroundEffects from './BackgroundEffects'
import type { CustomizeData } from '@/lib/customize'
import { ease } from '@/lib/animation'

const CAROUSEL_IMAGES = [
  '/img/img.jpg',
  '/img/img1.jpg',
  '/img/img2.jpg',
  '/img/img3.jpeg',
  '/img/img4.jpeg',
  '/img/img5.jpeg',
  '/img/img6.jpg',
  '/img/img7.jpg',
  '/img/img8.jpg',
]

interface GiftRevealProps {
  customizeData: CustomizeData
  onComplete?: () => void
  className?: string
}

export default function GiftReveal({
  customizeData,
  onComplete,
  className = '',
}: GiftRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const lidRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [showContent, setShowContent] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { themeId, theme } = useTheme()

  const firstImage = customizeData.imagePath
    ? customizeData.imagePath.startsWith('/')
      ? customizeData.imagePath
      : `/${customizeData.imagePath}`
    : CAROUSEL_IMAGES[0]
  const carouselImages = [firstImage, ...CAROUSEL_IMAGES.filter((_, i) => i > 0)]

  useEffect(() => {
    if (!containerRef.current || !boxRef.current || !lidRef.current) return

    const tl = gsap.timeline({ defaults: { ease: ease.smooth } })
    tl.set(containerRef.current, { visibility: 'visible' })
      .fromTo(boxRef.current, { scale: 0.5, opacity: 0 }, { duration: 0.6, scale: 1, opacity: 1, ease: 'back.out(1.4)' })
      .to({}, { duration: 0.5 })
      .to(
        lidRef.current,
        {
          rotationX: -120,
          y: -30,
          transformOrigin: 'bottom center',
          duration: 0.5,
          ease: 'back.out(1.2)',
        },
        0
      )
      .to(
        boxRef.current,
        {
          boxShadow: '0 0 60px rgba(255, 100, 150, 0.4)',
          duration: 0.3,
        },
        '-=0.5'
      )
      .call(setShowContent, [true])
      .fromTo(
        messageRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { duration: 0.7, opacity: 1, y: 0, scale: 1, ease: ease.smooth },
        '-=0.2'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { duration: 0.6, opacity: 1, scale: 1 },
        '-=0.5'
      )
    if (onComplete) tl.call(onComplete, [], '+=0.5')
  }, [onComplete])

  useEffect(() => {
    if (!showContent || imageError || carouselImages.length <= 1) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [showContent, imageError, carouselImages.length])

  return (
    <div
      ref={containerRef}
      className={`min-h-screen w-full flex flex-col md:flex-row items-center justify-center relative overflow-hidden invisible pt-2 ${theme.bgClass} ${className}`}
      style={{ perspective: 1000 }}
    >
      <BackgroundEffects themeId={themeId} />
      <FloatingHearts themeId={themeId} count={16} size="md" depthLayers />

      {/* 3D Gift box - hidden after gift opens */}
      {!showContent && (
        <div
          ref={boxRef}
          className="relative w-32 h-32 md:w-40 md:h-40 mb-8"
          style={{
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-b from-rose-400 to-rose-600 ${theme.glass.rounded} shadow-2xl`}
            style={{
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.2)',
            }}
          />
          <div
            ref={lidRef}
            className={`absolute -top-2 left-0 right-0 h-4 bg-gradient-to-b from-rose-300 to-rose-500 ${theme.glass.roundedTop} origin-bottom`}
            style={{ transformStyle: 'preserve-3d' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl">
            🎁
          </div>
        </div>
      )}

      {showContent && (
        <div
          ref={messageRef}
          className={`relative z-10 w-[98%] md:w-full max-w-lg mx-4 text-center ${theme.glass.backdrop} ${theme.glass.bg} ${theme.glass.border} ${theme.glass.shadow} ${theme.glass.rounded} p-8 md:p-10`}
        >
          <div className="relative inline-block text-6xl md:text-7xl mb-4 opacity-80">💖</div>
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${theme.text}`}>
            {customizeData.greetingText}
          </h2>
          <p className={`text-lg md:text-xl ${theme.text} opacity-90 mb-6`}>
            {customizeData.wishText}
          </p>
          <p className={`text-xl font-semibold ${theme.text}`}>— {customizeData.name}😘</p>
        </div>
      )}

      {showContent && (
        <div
          ref={imageRef}
          className={`relative w-[98%] h-[400px] md:w-[500px] md:h-[400px] mt-6 ${theme.glass.rounded} overflow-hidden shadow-2xl bg-black/10 flex items-center justify-center`}
        >
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose-200/80 to-pink-300/80 text-gray-700">
              <span className="text-5xl">💖</span>
              <span className="text-sm font-medium">Add img1–img6.jpg to public/img/</span>
            </div>
          ) : (
            <>
              <div className="w-full h-full overflow-hidden">
                <div
                  className="flex h-full transition-transform duration-[1500ms] ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {carouselImages.map((src, i) => (
                    <div key={i} className="w-full h-full flex-shrink-0 relative">
                      <img
                        src={src}
                        alt={`Valentine ${i + 1}`}
                        className="w-full h-full object-cover block"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {carouselImages.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                  {carouselImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                        }`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

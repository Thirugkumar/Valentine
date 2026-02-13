'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '@/components/ThemeProvider'
import FloatingHearts from './FloatingHearts'
import Balloons from './Balloons'
import BackgroundEffects from './BackgroundEffects'
import { ease } from '@/lib/animation'

interface WelcomeSceneProps {
  name: string
  onComplete: () => void
  className?: string
}

function WaveText({ text, className = '' }: { text: string; className?: string }) {
  const chars = Array.from(text)
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span key={i} className="wave-letter inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char}
        </span>
      ))}
    </span>
  )
}

export default function WelcomeScene({ name, onComplete, className = '' }: WelcomeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const { themeId, theme } = useTheme()

  const subtitleText = `Happy Valentine's Day My ${name}`
  const titleText = 'Love You So Much Papa 💖💖💖💖💖'
  const descriptionText = "Being with you is the best thing that ever happened to me. You make my ordinary days feel magical and my difficult days feel lighter. Your love fills my heart with happiness and peace. I’m so grateful for every moment we share, and I look forward to creating many more beautiful memories together. 💕"

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current || !cardRef.current || !descriptionRef.current) return

    const titleLetters = titleRef.current.querySelectorAll('.wave-letter')
    const subtitleLetters = subtitleRef.current.querySelectorAll('.wave-letter')
    const descriptionLetters = descriptionRef.current.querySelectorAll('.wave-letter')
    const allLetters = cardRef.current.querySelectorAll('.wave-letter')

    const waveTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
    waveTl.to(allLetters, {
      y: -5,
      duration: 0.15,
      stagger: { each: 0.04, from: 'start' },
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1,
    })

    const tl = gsap.timeline({ defaults: { ease: ease.smooth } })
    tl.set(containerRef.current, { visibility: 'visible' })
      .set(allLetters, { opacity: 0, y: 12 })
      .to(titleLetters, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: 'back.out(1.2)',
      })
      .to(
        subtitleLetters,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: 'back.out(1.2)',
        },
        '-=0.2'
      )
      .to(
        descriptionLetters,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.015,
          ease: 'back.out(1.2)',
        },
        '-=0.1'
      )
      .to({}, { duration: 1 })
      .add(() => { waveTl.play(0) })
      .to({}, { duration: 5, onComplete })

    return () => {
      waveTl.kill()
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden invisible pt-12 ${theme.bgClass} ${className}`}
      style={{ perspective: 1000 }}
    >
      <BackgroundEffects themeId={themeId} />
      <FloatingHearts themeId={themeId} count={34} size="lg" depthLayers />
      <Balloons themeId={themeId} count={10} animateUp />

      <div
        ref={cardRef}
        className={`w-[95%] relative z-10 text-center ${theme.glass.backdrop} ${theme.glass.bg} ${theme.glass.border} ${theme.glass.shadow} ${theme.glass.rounded} py-10 px-8 md:py-12 md:px-12`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <h3 ref={subtitleRef} className={`text-xl md:text-2xl font-medium mb-5 ${themeId === 'dark' ? 'text-white' : theme.text} opacity-90`}>
          <WaveText text={subtitleText} />
        </h3>

        <h1
          ref={titleRef}
          className={`text-4xl md:text-6xl font-bold mb-10 ${themeId === 'dark' ? 'text-white' : theme.text} drop-shadow-lg`}
        >
          <WaveText text={titleText} />
        </h1>
        <p
          ref={descriptionRef}
          className={`text-xl md:text-2xl font-medium mb-5 text-left ${themeId === 'dark' ? 'text-white' : theme.text} opacity-95 drop-shadow-md`}
          style={{ textShadow: themeId === 'dark' ? '0 2px 8px rgba(0,0,0,0.3)' : undefined }}
        >
          <WaveText text={descriptionText} />
        </p>
      </div>
    </div>
  )
}

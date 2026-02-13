'use client'

import { useState, FormEvent } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '@/components/ThemeProvider'
import FloatingHearts from './FloatingHearts'
import BackgroundEffects from './BackgroundEffects'
import { ease } from '@/lib/animation'

interface NameInputProps {
  onNameSubmit: (name: string) => void
  defaultName?: string
}

export default function NameInput({ onNameSubmit, defaultName = '' }: NameInputProps) {
  const [name, setName] = useState(defaultName)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const { themeId, theme } = useTheme()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const finalName = name.trim() || defaultName || 'Vijju Kutty'
    if (finalName) {
      setIsSubmitting(true)
      const card = document.querySelector('[data-name-card]')
      if (card) {
        gsap.to(card, {
          duration: 0.4,
          opacity: 0,
          y: -20,
          scale: 0.98,
          ease: ease.smooth,
          onComplete: () => onNameSubmit(finalName),
        })
      } else {
        setTimeout(() => onNameSubmit(finalName), 300)
      }
    }
  }

  const canSubmit = name.trim() || defaultName
  const buttonDisabled = !canSubmit || isSubmitting

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen overflow-hidden pt-14 ${theme.bgClass}`}
    >
      <BackgroundEffects themeId={themeId} />
      <FloatingHearts themeId={themeId} count={20} size="md" />

      <div
        data-name-card
        className={`relative z-10 w-full max-w-md mx-4 rounded-3xl ${theme.glass.backdrop} ${theme.glass.bg} ${theme.glass.border} ${theme.glass.shadow} ${theme.glass.rounded} p-8 md:p-10 transition-all duration-300`}
      >
        <div className="text-center mb-8">
          <div className="inline-block text-7xl mb-6 animate-heart-beat">💝</div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg ${themeId === 'dark' ? 'text-white' : theme.text}`}>
            Hello!
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={defaultName || 'Enter your name...'}
              className={`w-full px-5 py-4 text-2xl  text-center rounded-xl focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 ${theme.input.bg} ${themeId !== 'dark' ? "text-pink-400" : theme.text} ${theme.input.placeholder} border-2 ${isFocused ? theme.input.borderFocus : theme.input.border
                } ${isFocused ? 'scale-[1.02]' : ''}`}
              autoFocus
            />
            {isFocused && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 rounded-full animate-shimmer" />
            )}
          </div>

          <button
            type="submit"
            disabled={buttonDisabled}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform shadow-xl ${!buttonDisabled ? theme.button.base + ' ' + theme.button.hover + ' text-white' : theme.button.disabled + ' ' + theme.text
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Starting...</span>
                </>
              ) : defaultName && name.trim() === defaultName ? (
                <>
                  <span>Continue with {defaultName}</span>
                  <span className="animate-bounce">💕</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <span className="animate-pulse">💖</span>
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import NameInput from '@/components/NameInput'
import WelcomeScene from '@/components/WelcomeScene'
import Envelope3D from '@/components/Envelope3D'
import GiftReveal from '@/components/GiftReveal'
import FloatingHearts from '@/components/FloatingHearts'
import BackgroundEffects from '@/components/BackgroundEffects'
import { getCustomizeData, defaultCustomizeData, type CustomizeData } from '@/lib/customize'
import { useTheme } from '@/components/ThemeProvider'

type Scene = 'loading' | 'name' | 'welcome' | 'envelope' | 'gift'

export default function Home() {
  const [scene, setScene] = useState<Scene>('loading')
  const [userName, setUserName] = useState<string | null>(null)
  const [customizeData, setCustomizeData] = useState<CustomizeData>(defaultCustomizeData)
  const [isLoading, setIsLoading] = useState(true)
  const { themeId, theme } = useTheme()

  useEffect(() => {
    const loadData = async () => {
      const data = await getCustomizeData()
      setCustomizeData(data)
      setIsLoading(false)
      setScene('name')
    }
    loadData()
  }, [])

  const handleNameSubmit = useCallback((name: string) => {
    setUserName(name)
    setCustomizeData((prev) => ({ ...prev, name }))
    setScene('welcome')
  }, [])

  const handleWelcomeComplete = useCallback(() => setScene('envelope'), [])
  const handleEnvelopeOpen = useCallback(() => setScene('gift'), [])

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div
          className={`relative flex items-center justify-center min-h-screen overflow-hidden pt-14 ${theme.bgClass}`}
        >
          <BackgroundEffects themeId={themeId} />
          <FloatingHearts themeId={themeId} count={15} size="sm" />
          <div
            className={`relative z-10 text-center ${theme.glass.backdrop} ${theme.glass.bg} ${theme.glass.border} ${theme.glass.shadow} ${theme.glass.rounded} p-12`}
          >
            <div className="text-7xl mb-6 animate-heart-beat">💝</div>
            <p className={`text-2xl md:text-3xl font-semibold ${theme.text} drop-shadow-lg`}>
              Loading...
            </p>
          </div>
        </div>
      </>
    )
  }

  if (scene === 'name') {
    return (
      <>
        <Navbar />
        <NameInput
          onNameSubmit={handleNameSubmit}
          defaultName={customizeData.name}
        />
      </>
    )
  }

  if (scene === 'welcome' && userName) {
    return (
      <>
        <Navbar />
        <WelcomeScene
          name={userName}
          onComplete={handleWelcomeComplete}
        />
      </>
    )
  }

  if (scene === 'envelope') {
    return (
      <>
        <Navbar />
        <Envelope3D onOpen={handleEnvelopeOpen} />
      </>
    )
  }

  if (scene === 'gift') {
    return (
      <>
        <Navbar />
        <GiftReveal customizeData={customizeData} />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <NameInput
        onNameSubmit={handleNameSubmit}
        defaultName={customizeData.name}
      />
    </>
  )
}

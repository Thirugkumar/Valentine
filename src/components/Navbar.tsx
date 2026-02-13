'use client'

import { useTheme } from '@/components/ThemeProvider'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { themeId, theme } = useTheme()

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${theme.glass.backdrop} ${theme.glass.bg} ${theme.glass.border} ${theme.glass.shadow} ${theme.glass.roundedBottom} border-b`}
      role="navigation"
      aria-label="Main"
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a className={`cursor-pointer font-bold flex items-center gap-1 ${themeId === 'dark' ? 'text-white' : theme.text}`} onClick={() => window.location.href = '/'}>
          <span className="text-2xl">💝</span>
          <span className="text-3xl">MINE</span>
        </a>
        <ThemeToggle />
      </div>
    </nav>
  )
}

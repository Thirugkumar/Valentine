'use client'

import { useTheme } from '@/components/ThemeProvider'
import { themes, type ThemeId } from '@/lib/theme'

export default function ThemeToggle() {
  const { themeId, setThemeId, theme } = useTheme()

  return (
    <div
      className={`flex flex-wrap gap-1.5 p-1 rounded-2xl ${theme.glass.backdrop} ${theme.glass.bg} ${theme.glass.rounded}`}
      role="radiogroup"
      aria-label="Theme"
    >
      {(Object.keys(themes) as ThemeId[]).map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => setThemeId(id)}
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-lg font-medium transition-all duration-300 ${themeId === id
              ? 'border-2 border-white/50 shadow-md ' + theme.text
              : 'bg-transparent border border-white/20 opacity-70 hover:opacity-100 ' + theme.text
            }`}
          aria-pressed={themeId === id}
          title={themes[id].label}
        >
          <span className="text-xl">{themes[id].emoji}</span>
          <span className="hidden sm:inline">{themes[id].label}</span>
        </button>
      ))}
    </div>
  )
}

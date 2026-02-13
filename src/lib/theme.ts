export type ThemeId = 'dreamy' | 'minimal' | 'dark' | 'genz'

export interface ThemeConfig {
  id: ThemeId
  label: string
  emoji: string
  /** Tailwind/CSS class for root background */
  bgClass: string
  /** Glass card: backdrop, border, shadow */
  glass: {
    backdrop: string
    bg: string
    border: string
    shadow: string
    rounded: string
    roundedTop: string
    roundedBottom: string
  }
  /** Input field styling */
  input: {
    bg: string
    border: string
    borderFocus: string
    placeholder: string
    glow: string
  }
  /** Button styling */
  button: {
    base: string
    hover: string
    disabled: string
  }
  /** Accent color for text/glow */
  accent: string
  /** Typography / text color */
  text: string
  /** Reduce motion on mobile */
  reducedMotion?: boolean
}

export const themes: Record<ThemeId, ThemeConfig> = {
  dreamy: {
    id: 'dreamy',
    label: 'Dreamy Glass',
    emoji: '🌸',
    bgClass: 'bg-dreamy-gradient',
    glass: {
      backdrop: 'backdrop-blur-xl',
      bg: 'bg-white/10',
      border: 'border border-white/20',
      shadow: 'shadow-2xl',
      rounded: 'rounded-3xl',
      roundedTop: 'rounded-t-3xl',
      roundedBottom: 'rounded-b-3xl',
    },
    input: {
      bg: 'bg-white/20 backdrop-blur-md',
      border: 'border-white/40',
      borderFocus: 'border-white/80 shadow-lg shadow-pink-500/50',
      placeholder: 'placeholder-white/70',
      glow: 'shadow-pink-500/30',
    },
    button: {
      base: 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500',
      hover: 'hover:from-pink-600 hover:via-rose-600 hover:to-red-600 hover:scale-105 hover:shadow-2xl',
      disabled: 'bg-white/20 border border-white/30 cursor-not-allowed',
    },
    accent: '#ff4e8d',
    text: 'text-white',
  },
  minimal: {
    id: 'minimal',
    label: 'Premium Minimal',
    emoji: '🍎',
    bgClass: 'bg-minimal-gradient',
    glass: {
      backdrop: 'backdrop-blur-md',
      bg: 'bg-white/60',
      border: 'border border-gray-200/80',
      shadow: 'shadow-xl',
      rounded: 'rounded-2xl',
      roundedTop: 'rounded-t-2xl',
      roundedBottom: 'rounded-b-2xl',
    },
    input: {
      bg: 'bg-white/80',
      border: 'border-gray-200',
      borderFocus: 'border-rose-300 shadow-md shadow-rose-100',
      placeholder: 'placeholder-gray-400',
      glow: 'shadow-rose-200/50',
    },
    button: {
      base: 'bg-rose-400 text-white',
      hover: 'hover:bg-rose-500 hover:scale-[1.02]',
      disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed',
    },
    accent: '#fb7185',
    text: 'text-gray-800',
  },
  dark: {
    id: 'dark',
    label: 'Luxury Dark Romance',
    emoji: '🌙',
    bgClass: 'bg-dark-gradient',
    glass: {
      backdrop: 'backdrop-blur-xl',
      bg: 'bg-black/30',
      border: 'border border-rose-500/20',
      shadow: 'shadow-2xl shadow-rose-900/20',
      rounded: 'rounded-3xl',
      roundedTop: 'rounded-t-3xl',
      roundedBottom: 'rounded-b-3xl',
    },
    input: {
      bg: 'bg-black/40 backdrop-blur-md',
      border: 'border-rose-500/30',
      borderFocus: 'border-rose-400/60 shadow-lg shadow-rose-500/20',
      placeholder: 'placeholder-rose-300/50',
      glow: 'shadow-rose-500/40',
    },
    button: {
      base: 'bg-gradient-to-r from-rose-600 to-rose-800 text-amber-50',
      hover: 'hover:from-rose-500 hover:to-rose-700 hover:shadow-rose-500/30 hover:scale-105',
      disabled: 'bg-black/40 border border-rose-500/20 cursor-not-allowed',
    },
    accent: '#f43f5e',
    text: 'text-amber-50',
  },
  genz: {
    id: 'genz',
    label: 'Playful Gen-Z',
    emoji: '🎮',
    bgClass: 'bg-genz-gradient',
    glass: {
      backdrop: 'backdrop-blur-lg',
      bg: 'bg-white/25',
      border: 'border-2 border-pink-300/50',
      shadow: 'shadow-2xl shadow-pink-300/30',
      rounded: 'rounded-3xl',
      roundedTop: 'rounded-t-3xl',
      roundedBottom: 'rounded-b-3xl',
    },
    input: {
      bg: 'bg-white/40',
      border: 'border-pink-300',
      borderFocus: 'border-pink-500 shadow-lg shadow-pink-400/50 scale-105',
      placeholder: 'placeholder-pink-400',
      glow: 'shadow-pink-400/50',
    },
    button: {
      base: 'bg-gradient-to-r from-pink-400 to-purple-500',
      hover: 'hover:scale-110 hover:shadow-pink-400/50 active:scale-95',
      disabled: 'bg-gray-300/50 cursor-not-allowed',
    },
    accent: '#ec4899',
    text: 'text-gray-900',
  },
}

export const defaultThemeId: ThemeId = 'dreamy'

import { gsap } from 'gsap'

/** Easing presets for cinematic feel */
export const ease = {
  smooth: 'power3.out' as const,
  bounce: 'back.out' as const,
  soft: 'power2.inOut' as const,
}

/** Check if we should reduce motion (e.g. mobile) */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Stagger delay helper */
export function staggerDelay(index: number, base = 0.05): number {
  return index * base
}

/** Kill all GSAP animations on a target (cleanup) */
export function killTweens(target: gsap.TweenTarget) {
  gsap.killTweensOf(target)
}

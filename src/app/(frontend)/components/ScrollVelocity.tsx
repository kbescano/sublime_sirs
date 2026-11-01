'use client'

import { useEffect } from 'react'

// Publishes smoothed scroll velocity as --scroll-v on <html> so CSS can react to it
export default function ScrollVelocity() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    let last = window.scrollY
    let velocity = 0
    let raf = 0

    const tick = () => {
      const y = window.scrollY
      const delta = Math.max(-60, Math.min(60, y - last))
      last = y
      velocity += (delta - velocity) * 0.18
      root.style.setProperty('--scroll-v', velocity.toFixed(2))

      // Keep running until motion fully settles, then sleep until the next scroll
      if (Math.abs(velocity) > 0.02 || delta !== 0) {
        raf = requestAnimationFrame(tick)
      } else {
        root.style.setProperty('--scroll-v', '0')
        raf = 0
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}

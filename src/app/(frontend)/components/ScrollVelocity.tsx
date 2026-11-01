'use client'

import { useEffect } from 'react'

/*
 * Publishes smoothed scroll velocity as --scroll-v on the 3D cards only (not <html>,
 * which would restyle the whole page every frame). Skipped on touch screens and with
 * reduced motion, where the lean effect isn't worth the scroll cost.
 */
export default function ScrollVelocity() {
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return
    }

    let last = window.scrollY
    let velocity = 0
    let written = ''
    let raf = 0

    const write = (value: string) => {
      if (value === written) return
      written = value
      document
        .querySelectorAll<HTMLElement>('.card3d-lean')
        .forEach((el) => el.style.setProperty('--scroll-v', value))
    }

    const tick = () => {
      const y = window.scrollY
      const delta = Math.max(-60, Math.min(60, y - last))
      last = y
      velocity += (delta - velocity) * 0.18

      // Keep running until motion fully settles, then sleep until the next scroll
      if (Math.abs(velocity) > 0.02 || delta !== 0) {
        write(velocity.toFixed(1))
        raf = requestAnimationFrame(tick)
      } else {
        write('0')
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

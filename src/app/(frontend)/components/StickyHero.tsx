'use client'

import React, { useEffect, useRef } from 'react'

// Pins the hero while the page slides over it; publishes scroll progress as --hero-p
export default function StickyHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const progress = Math.min(Math.max(window.scrollY / el.offsetHeight, 0), 1)
      el.style.setProperty('--hero-p', progress.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="hero-sticky sticky top-0 z-0">
      {children}
    </div>
  )
}

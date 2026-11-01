'use client'

import React, { useEffect, useRef } from 'react'

// Pins the hero while the page slides over it; publishes scroll progress as --hero-p
export default function StickyHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Height is measured on resize only, so scrolling never forces a layout read
    let height = el.offsetHeight
    const resize = new ResizeObserver(() => {
      height = el.offsetHeight
      onScroll()
    })
    resize.observe(el)

    let raf = 0
    let written = ''
    const update = () => {
      raf = 0
      const value = Math.min(Math.max(window.scrollY / height, 0), 1).toFixed(3)
      if (value === written) return
      written = value
      el.style.setProperty('--hero-p', value)
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      resize.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="hero-sticky sticky top-0 z-0">
      {children}
    </div>
  )
}

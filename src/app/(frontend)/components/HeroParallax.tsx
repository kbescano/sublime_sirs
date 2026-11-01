'use client'

import React, { useEffect, useRef } from 'react'

// Hero copy drifts down, skews and fades as the page scrolls away (transform + opacity only, so it stays on the GPU)
export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let lastProgress = -1
    const update = () => {
      raf = 0
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      if (progress === lastProgress) return // fully scrolled past: nothing left to write
      lastProgress = progress
      el.style.transform = `translate3d(0, ${(progress * 140).toFixed(1)}px, 0) skewY(${(progress * -4).toFixed(2)}deg)`
      el.style.opacity = (1 - progress * 0.9).toFixed(3)
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
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  )
}

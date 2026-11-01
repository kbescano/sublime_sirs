'use client'

import React, { useEffect, useRef } from 'react'

// Hero copy drifts down, skews and blurs out as the page scrolls away
export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      el.style.transform = `translate3d(0, ${progress * 140}px, 0) skewY(${progress * -4}deg)`
      el.style.opacity = String(1 - progress * 0.9)
      el.style.filter = `blur(${progress * 8}px)`
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

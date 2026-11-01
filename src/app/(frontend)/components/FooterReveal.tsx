'use client'

import React, { useEffect, useRef } from 'react'

/*
 * Sticky footer that tracks how much of it the page has uncovered and
 * publishes that as --fp (0 → 1). Without JS or with reduced motion --fp
 * stays unset and the CSS falls back to the fully revealed state.
 */
export default function FooterReveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const footerHeight = el.offsetHeight
      const uncoveredFrom = doc.scrollHeight - footerHeight
      const progress = (window.scrollY + window.innerHeight - uncoveredFrom) / footerHeight
      el.style.setProperty('--fp', Math.min(Math.max(progress, 0), 1).toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <footer ref={ref} className={className}>
      {children}
    </footer>
  )
}

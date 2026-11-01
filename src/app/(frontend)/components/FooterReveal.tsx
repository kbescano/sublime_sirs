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

    // Geometry is measured on resize only, so scrolling never forces a layout read
    let footerHeight = 0
    let uncoveredFrom = 0
    const measure = () => {
      footerHeight = el.offsetHeight
      uncoveredFrom = document.documentElement.scrollHeight - footerHeight
    }
    const resize = new ResizeObserver(() => {
      measure()
      onScroll()
    })
    resize.observe(document.body)
    measure()

    let raf = 0
    let written = ''
    const update = () => {
      raf = 0
      const progress = (window.scrollY + window.innerHeight - uncoveredFrom) / footerHeight
      const value = Math.min(Math.max(progress, 0), 1).toFixed(3)
      if (value === written) return // far from the footer: nothing changes, nothing written
      written = value
      el.style.setProperty('--fp', value)
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      resize.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <footer ref={ref} className={className}>
      {children}
    </footer>
  )
}

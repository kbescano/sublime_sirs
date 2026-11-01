'use client'

import React, { useEffect, useRef } from 'react'

/*
 * Sizes the headline so it spans the full width of its container: one line on wide
 * screens, one word per line (each filling the width) on phones. Measured from the
 * text itself, so any CMS title fits. CSS font sizes on the <h1> are the pre-JS fallback.
 */
export default function FitHeadline({
  children,
  className = '',
  label,
}: {
  children: React.ReactNode
  className?: string
  label: string
}) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const h1 = ref.current
    const line = h1?.firstElementChild as HTMLElement | null
    if (!h1 || !line) return

    const BASE = 100
    const fit = () => {
      const width = h1.clientWidth
      const stack = width < 640
      h1.toggleAttribute('data-stack', stack)
      h1.style.fontSize = `${BASE}px`

      const words = Array.from(line.querySelectorAll<HTMLElement>('[data-word]'))
      const measured = stack
        ? Math.max(...words.map((word) => word.getBoundingClientRect().width))
        : line.getBoundingClientRect().width
      if (!measured) return

      // Never taller than ~42% of the viewport on wide, short screens
      const size = Math.min((BASE * width) / measured, window.innerHeight * 0.42) * 0.995
      h1.style.fontSize = `${size.toFixed(2)}px`
    }

    fit()
    document.fonts?.ready.then(fit)
    const resize = new ResizeObserver(fit)
    resize.observe(h1)
    return () => resize.disconnect()
  }, [])

  return (
    <h1 ref={ref} aria-label={label} className={`fit-headline ${className}`}>
      <span className="fit-line">{children}</span>
    </h1>
  )
}

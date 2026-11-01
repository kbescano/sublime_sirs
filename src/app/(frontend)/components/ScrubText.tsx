'use client'

import React, { useEffect, useRef } from 'react'

/*
 * Large statement whose words fill in as it scrolls through the viewport.
 * Wrap words in *asterisks* to accent them in cobalt; {seal} drops in a small spinning seal.
 */
export default function ScrubText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  // An *accent* can span several words: track whether we're inside one
  let inAccent = false
  const tokens = text.split(' ').map((token) => {
    const opens = token.startsWith('*')
    const accent = inAccent || opens
    inAccent = accent && !token.endsWith('*')
    return { token, accent }
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = Array.from(el.querySelectorAll<HTMLElement>('.scrub-word'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach((word) => word.classList.add('is-lit'))
      return
    }

    // Position is measured on resize only, so scrolling never forces a layout read
    let top = 0
    let height = 0
    const measure = () => {
      const rect = el.getBoundingClientRect()
      top = rect.top + window.scrollY
      height = rect.height
    }
    const resize = new ResizeObserver(() => {
      measure()
      onScroll()
    })
    resize.observe(document.body)
    measure()

    let lit = -1
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const viewTop = top - window.scrollY
      const progress = Math.min(Math.max((vh * 0.85 - viewTop) / (height + vh * 0.25), 0), 1)
      const next = Math.round(progress * words.length)
      if (next === lit) return
      words.forEach((word, i) => word.classList.toggle('is-lit', i < next))
      lit = next
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
    <p ref={ref} className={className}>
      {tokens.map(({ token, accent }, i) => {
        if (token === '{seal}') {
          return (
            <React.Fragment key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/chapter-seal.webp" alt="" className="scrub-seal scrub-word" />{' '}
            </React.Fragment>
          )
        }
        const word = token.replace(/\*/g, '')
        return (
          <React.Fragment key={i}>
            <span className={`scrub-word ${accent ? 'scrub-accent' : ''}`}>{word}</span>{' '}
          </React.Fragment>
        )
      })}
    </p>
  )
}

'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CLOSING_LINE } from './SiteFooter'

export const INTRO_KEY = 'pilantod-intro'

// Runs before paint: plays the intro once per session, never with reduced motion
export const introScript = `try{var d=document.documentElement;if(!sessionStorage.getItem('${INTRO_KEY}')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro-playing')}}catch(e){}`

const HOLD_MS = 2400 // counter + wordmark before the curtain lifts
const LIFT_MS = 1300

/*
 * Cinematic opening: the footer (dark, giant wordmark) plays first with a
 * 000→100 counter, then lifts away on a curve to reveal the hero underneath.
 */
export default function IntroCurtain({ tagline }: { tagline: string }) {
  const [done, setDone] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const html = document.documentElement
    if (!html.classList.contains('intro-playing')) {
      setDone(true)
      return
    }
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {}

    const start = performance.now()
    let raf = 0
    const count = (now: number) => {
      const p = Math.min((now - start) / (HOLD_MS - 200), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      if (counterRef.current)
        counterRef.current.textContent = String(Math.round(eased * 100)).padStart(3, '0')
      if (p < 1) raf = requestAnimationFrame(count)
    }
    raf = requestAnimationFrame(count)

    const lift = setTimeout(() => {
      rootRef.current?.classList.add('is-leaving')
      html.classList.remove('intro-playing')
    }, HOLD_MS)
    const end = setTimeout(() => setDone(true), HOLD_MS + LIFT_MS)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(lift)
      clearTimeout(end)
    }
  }, [])

  if (done) return null

  return (
    <div ref={rootRef} aria-hidden className="intro">
      <div className="intro-inner max-w-[1400px] w-full mx-auto px-4 md:px-8 h-full flex flex-col justify-between pt-6 md:pt-8">
        <div className="flex items-start justify-between text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/50">
          <span className="intro-fade">{tagline}</span>
          <span
            ref={counterRef}
            className="intro-fade font-display text-4xl md:text-6xl tracking-normal text-white"
          >
            000
          </span>
        </div>

        <p
          className="intro-fade text-2xl md:text-4xl font-light leading-tight tracking-tight max-w-xl"
          style={{ animationDelay: '300ms' }}
        >
          {CLOSING_LINE.lead}{' '}
          <span className="text-white/40">{CLOSING_LINE.muted}</span>
        </p>

        <p className="font-display uppercase leading-[0.8] text-[26vw] tracking-tight text-center select-none pb-[2vw]">
          {'Pilantod'.split('').map((char, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="intro-letter" style={{ animationDelay: `${150 + i * 60}ms` }}>
                {char}
              </span>
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

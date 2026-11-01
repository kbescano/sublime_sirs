import React from 'react'
import HeroParallax from './HeroParallax'
import StickyHero from './StickyHero'
import FitHeadline from './FitHeadline'

// Cobalt hero with an edge-to-edge display headline, shared by every frontend page
export default function PageHero({
  eyebrow,
  title,
  intro,
  visual,
  mark,
  size = 'lg',
}: {
  eyebrow: string
  title: string
  intro?: React.ReactNode
  // Large tonal centrepiece, bleeding off the top right
  visual?: React.ReactNode
  // Small round badge beside the intro text
  mark?: React.ReactNode
  size?: 'lg' | 'md'
}) {
  const words = title.split(' ')
  let letterIndex = 0

  return (
    <StickyHero>
      <section className="relative bg-cobalt text-white overflow-hidden rounded-b-[32px] md:rounded-b-[56px]">
        {/* Soft light bloom for depth */}
        <div
          aria-hidden
          className="absolute -top-1/3 -right-1/4 w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_60%)]"
        />

        {visual && (
          <div className="hero-cine hero-visual absolute pointer-events-none top-[9%] left-1/2 -translate-x-1/2 h-[44svh] md:left-auto md:translate-x-0 md:-right-[16%] md:top-[-4%] md:h-[108%]">
            {visual}
          </div>
        )}

        <div
          className={`hero-cine relative max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col justify-end ${
            size === 'lg'
              ? 'min-h-[100svh] pt-24 pb-8 md:pb-10'
              : 'min-h-[62svh] pt-32 pb-8 md:pb-10'
          }`}
        >
          <HeroParallax>
            <div className="flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-5 mb-6 md:mb-8">
              {intro && (
                <div className="flex items-center gap-4 md:gap-5 max-w-xl">
                  {mark && (
                    <span className="hero-mark shrink-0 grid place-items-center w-14 h-14 md:w-[72px] md:h-[72px] rounded-full bg-cobalt-deep ring-1 ring-white/25">
                      <span className="block h-8 md:h-10">{mark}</span>
                    </span>
                  )}
                  <div className="text-[15px] md:text-lg font-light leading-snug text-white/90">
                    {intro}
                  </div>
                </div>
              )}
              <span className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] md:text-[11px] uppercase tracking-[0.25em]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {eyebrow}
              </span>
            </div>

            <FitHeadline
              label={title}
              className={`font-display uppercase leading-[0.82] tracking-tight ${
                size === 'lg' ? 'text-[24vw] md:text-[17vw]' : 'text-[18vw] md:text-[12vw]'
              }`}
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  data-word
                  aria-hidden
                  className="inline-block overflow-hidden align-bottom mr-[0.18em] last:mr-0 pt-[0.15em] -mt-[0.15em]"
                >
                  {word.split('').map((char) => {
                    const delay = letterIndex++ * 45
                    return (
                      <span
                        key={delay}
                        className="letter"
                        style={{ '--rise-delay': `${delay}ms` } as React.CSSProperties}
                      >
                        {char}
                      </span>
                    )
                  })}
                </span>
              ))}
            </FitHeadline>
          </HeroParallax>
        </div>
        {/* Darkens as the page slides over the pinned hero */}
        <div aria-hidden className="hero-dim absolute inset-0 bg-ink pointer-events-none z-20" />
      </section>
    </StickyHero>
  )
}

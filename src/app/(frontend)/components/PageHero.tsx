import React from 'react'
import HeroParallax from './HeroParallax'
import StickyHero from './StickyHero'

// Cobalt hero with oversized display headline, shared by every frontend page
export default function PageHero({
  eyebrow,
  title,
  intro,
  visual,
  backdrop,
  size = 'lg',
}: {
  eyebrow: string
  title: string
  intro?: React.ReactNode
  visual?: React.ReactNode
  backdrop?: React.ReactNode
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
        {backdrop && (
          <div
            aria-hidden
            className="absolute inset-y-0 -right-[22%] md:right-[2%] w-[95%] md:w-[48%] flex items-center justify-center pointer-events-none"
          >
            <div className="h-[78%]">{backdrop}</div>
          </div>
        )}
        {/* Big, faint centrepiece behind the hero copy */}
        {visual && (
          <div className="hero-cine absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-[min(86%,92vw)] opacity-30">{visual}</div>
          </div>
        )}
        <div
          className={`hero-cine relative max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col justify-end ${
            size === 'lg'
              ? 'min-h-[100svh] pt-24 pb-10 md:pb-14'
              : 'min-h-[62svh] pt-32 pb-10 md:pb-14'
          }`}
        >
          <HeroParallax>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
              <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/25 bg-white/10 backdrop-blur px-4 py-2 text-[10px] md:text-[11px] uppercase tracking-[0.25em]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {eyebrow}
              </span>
              {intro && (
                <div className="max-w-md text-base md:text-lg font-light leading-snug text-white/85">
                  {intro}
                </div>
              )}
            </div>

            <h1
              aria-label={title}
              className={`font-display uppercase leading-[0.85] tracking-tight ${
                size === 'lg'
                  ? 'text-[22vw] md:text-[15vw] xl:text-[13rem]'
                  : 'text-[18vw] md:text-[11vw] xl:text-[10rem]'
              }`}
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="inline-block overflow-hidden align-bottom mr-[0.2em] last:mr-0 pt-[0.15em] -mt-[0.15em]"
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
            </h1>
          </HeroParallax>
        </div>
        {/* Darkens as the page slides over the pinned hero */}
        <div aria-hidden className="hero-dim absolute inset-0 bg-ink pointer-events-none z-20" />
      </section>
    </StickyHero>
  )
}

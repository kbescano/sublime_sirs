import React from 'react'
import Link from 'next/link'
import FooterReveal from './FooterReveal'
import BackToTop from './BackToTop'

// Closing line shared by the footer and the intro curtain
export const CLOSING_LINE = {
  lead: 'Seven precepts. One brotherhood.',
  muted: 'Carried forward since April 1984.',
}

const links = [
  { name: 'Home', href: '/' },
  { name: 'Activities', href: '/activities' },
  { name: 'Members', href: '/members' },
]

export default function SiteFooter({ tagline }: { tagline: string }) {
  return (
    <FooterReveal className="sticky bottom-0 z-0 bg-ink text-white overflow-hidden">
      <div className="footer-drift max-w-[1400px] mx-auto px-4 md:px-8 pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr] pb-16 md:pb-24 border-b border-white/10">
          <p
            className="footer-rise text-2xl md:text-4xl font-light leading-tight tracking-tight max-w-xl"
            style={{ '--i': 0 } as React.CSSProperties}
          >
            {CLOSING_LINE.lead} <span className="text-white/40">{CLOSING_LINE.muted}</span>
          </p>
          <div className="footer-rise space-y-4" style={{ '--i': 1 } as React.CSSProperties}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Explore</p>
            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-rise space-y-4" style={{ '--i': 2 } as React.CSSProperties}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Chapter</p>
            <p className="text-sm text-white/80 leading-relaxed">{tagline}</p>
          </div>
        </div>

        {/* Wordmark rises letter by letter as the footer is uncovered */}
        <p
          aria-label="Pilantod"
          className="font-display uppercase leading-[0.8] text-[26vw] tracking-tight text-center select-none pt-10 pb-[2vw] text-white"
        >
          {'Pilantod'.split('').map((char, i) => (
            <span
              key={i}
              aria-hidden
              className="inline-block overflow-hidden align-bottom pt-[0.1em] -mt-[0.1em]"
            >
              <span className="footer-letter" style={{ '--i': i } as React.CSSProperties}>
                <span className="footer-letter-hover">{char}</span>
              </span>
            </span>
          ))}
        </p>
      </div>
      <div className="relative bg-ink border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 pb-28 lg:pb-6 flex flex-col md:flex-row gap-3 md:items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/40">
          <span>© {new Date().getFullYear()} Pilantod</span>
          <span>Order of DeMolay</span>
          <BackToTop />
        </div>
      </div>
    </FooterReveal>
  )
}

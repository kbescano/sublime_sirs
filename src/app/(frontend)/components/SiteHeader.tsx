'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Activities', href: '/activities' },
  { name: 'Members', href: '/members' },
]

export default function SiteHeader({ tagline }: { tagline: string }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Every page opens on a cobalt hero, so the header starts light
  const light = !scrolled

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[90] transition-all duration-500 ${
        scrolled ? 'bg-paper/80 backdrop-blur-xl border-b border-ink/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 md:h-20 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        <Link
          href="/"
          className={`font-display text-2xl md:text-[28px] uppercase tracking-wide leading-none transition-colors ${
            light ? 'text-white' : 'text-ink'
          }`}
        >
          Pilantod
        </Link>

        <p
          className={`hidden lg:block text-center text-[11px] uppercase tracking-[0.3em] whitespace-nowrap text-ink/60 transition-opacity duration-500 ${
            light ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {tagline}
        </p>

        <nav className="hidden lg:flex justify-end">
          <ul
            className={`flex items-center gap-1 rounded-full p-1 border backdrop-blur-md transition-colors ${
              light ? 'bg-white/10 border-white/20' : 'bg-white/70 border-ink/10'
            }`}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors ${
                      isActive
                        ? light
                          ? 'bg-white text-cobalt'
                          : 'bg-cobalt text-white'
                        : light
                          ? 'text-white hover:bg-white/15'
                          : 'text-ink hover:bg-ink/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <span
          className={`lg:hidden justify-self-end text-[10px] uppercase tracking-[0.3em] transition-colors ${
            light ? 'text-white/70' : 'text-ink/50'
          }`}
        >
          Order of DeMolay
        </span>
      </div>
    </header>
  )
}

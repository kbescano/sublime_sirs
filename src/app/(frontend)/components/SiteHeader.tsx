'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SiteMenu, { type NavItem } from './SiteMenu'

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Activities', href: '/activities' },
  { name: 'Members', href: '/members' },
]

export default function SiteHeader({ tagline }: { tagline: string }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Every page opens on a cobalt hero, so the header starts light
  const light = !scrolled

  return (
    <>
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

          {/* Below desktop: ONFORM-style MENU pill opens the fullscreen menu */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="lg:hidden justify-self-end flex items-center gap-4 rounded-full bg-ink/85 backdrop-blur-md border border-white/15 text-white pl-5 pr-4 h-11 text-[11px] uppercase tracking-[0.25em] font-medium active:scale-95 transition-transform"
          >
            Menu
            <span aria-hidden className="flex flex-col items-end gap-[5px]">
              <span className="block w-6 h-[1.5px] bg-current" />
              <span className="block w-4 h-[1.5px] bg-current" />
            </span>
          </button>
        </div>
      </header>
      {/* Sibling of the header: its backdrop-filter would trap a fixed overlay inside it */}
      <SiteMenu open={menuOpen} onClose={closeMenu} items={navItems} pathname={pathname} />
    </>
  )
}

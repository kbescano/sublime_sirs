'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline'

export type NavItem = { name: string; href: string }

/*
 * Fullscreen menu (ONFORM-style): the page blurs behind, link tiles alternating
 * paper/cobalt fly in one after another, with the chapter seal panel alongside.
 */
export default function SiteMenu({
  open,
  onClose,
  items,
  pathname,
}: {
  open: boolean
  onClose: () => void
  items: NavItem[]
  pathname: string
}) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    firstLinkRef.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
      className={`site-menu fixed inset-0 z-[150] ${open ? 'is-open' : ''}`}
    >
      <div aria-hidden onClick={onClose} className="site-menu-backdrop absolute inset-0" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="site-menu-close absolute top-3 right-4 md:top-5 md:right-8 z-10 grid place-items-center w-12 h-12 rounded-full bg-ink/90 border border-white/15 text-white hover:bg-cobalt transition-colors"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="relative h-full max-w-[1400px] mx-auto px-4 md:px-8 pt-20 pb-6 md:py-16 grid md:grid-cols-[1.1fr_1fr] gap-2 md:gap-3 pointer-events-none">
        <nav className="flex flex-col gap-2 md:gap-3 min-h-0">
          {items.map((item, i) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                style={{ '--i': i } as React.CSSProperties}
                className={`site-menu-tile group flex-1 flex items-center justify-between px-6 md:px-8 pointer-events-auto ${
                  i % 2 === 0 ? 'bg-paper text-ink' : 'bg-cobalt text-white'
                }`}
              >
                <span className="font-display uppercase text-[15vw] md:text-7xl lg:text-8xl leading-none tracking-tight">
                  {item.name}
                </span>
                <span className="flex items-center gap-3">
                  {isActive && (
                    <span
                      aria-hidden
                      className="w-2.5 h-2.5 rounded-full bg-current"
                      title="Current page"
                    />
                  )}
                  <ArrowUpRightIcon className="w-9 h-9 md:w-12 md:h-12 stroke-[1.25] transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Seal panel */}
        <div
          className="site-menu-tile hidden md:grid place-items-center bg-cobalt-deep overflow-hidden pointer-events-auto"
          style={{ '--i': items.length } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/chapter-seal.webp"
            alt=""
            className="w-[70%] max-w-[420px] rounded-full shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}

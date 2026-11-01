'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  CalendarIcon,
  UserCircleIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeSolid,
  CalendarIcon as CalendarSolid,
  UserCircleIcon as UserSolid,
  ClipboardDocumentIcon as ClipboardSolid,
} from '@heroicons/react/24/solid'

export default function MobileMenu() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/', icon: HomeIcon, activeIcon: HomeSolid },
    { name: 'Activities', href: '/activities', icon: CalendarIcon, activeIcon: CalendarSolid },
    { name: 'Members', href: '/members', icon: ClipboardDocumentIcon, activeIcon: ClipboardSolid },
    { name: 'Admin', href: '/admin', icon: UserCircleIcon, activeIcon: UserSolid },
  ]

  return (
    // Floating glass dock
    <nav className="lg:hidden fixed bottom-4 inset-x-4 z-[100] pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto max-w-sm flex justify-between items-center gap-1 rounded-full bg-ink/85 backdrop-blur-xl p-1.5 shadow-[0_10px_40px_rgba(11,11,16,0.25)] border border-white/10">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = isActive ? item.activeIcon : item.icon

          return (
            <li key={item.name} className="flex-1">
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center justify-center gap-2 h-12 rounded-full transition-all active:scale-95 ${
                  isActive ? 'bg-white text-ink' : 'text-white/60'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {isActive && (
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em]">{item.name}</span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

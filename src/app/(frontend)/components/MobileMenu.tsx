'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  CalendarIcon, 
  UserCircleIcon, 
  ClipboardDocumentIcon 
} from '@heroicons/react/24/outline'
import { 
  HomeIcon as HomeSolid, 
  CalendarIcon as CalendarSolid, 
  UserCircleIcon as UserSolid, 
  ClipboardDocumentIcon as ClipboardSolid 
} from '@heroicons/react/24/solid'

export default function MobileMenu() {
  const pathname = usePathname()

  // Navigation config matches Instagram's structure
  const navItems = [
    { name: 'Home', href: '/', icon: HomeIcon, activeIcon: HomeSolid },
    { name: 'Activities', href: '/activities', icon: CalendarIcon, activeIcon: CalendarSolid },
    { name: 'Members', href: '/members', icon: ClipboardDocumentIcon, activeIcon: ClipboardSolid },
    { name: 'Admin', href: '/admin', icon: UserCircleIcon, activeIcon: UserSolid },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 z-[100] pb-safe shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = isActive ? item.activeIcon : item.icon

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full transition-transform active:scale-90"
            >
              {/* Icon Container */}
              <div className="relative">
                <Icon className={`w-6 h-6 transition-colors duration-200 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                
                {/* Optional: Indicator Dot like a real app */}
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                )}
              </div>

              {/* Label */}
              <span className={`text-[9px] mt-1 font-bold uppercase tracking-widest ${isActive ? 'text-black' : 'text-gray-300'}`}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
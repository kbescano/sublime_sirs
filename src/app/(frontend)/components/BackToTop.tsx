'use client'

import React from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/outline'

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group inline-flex items-center gap-2 uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors"
    >
      Back to top
      <span className="grid place-items-center w-7 h-7 rounded-full border border-white/20 transition-all duration-500 group-hover:bg-white group-hover:text-ink group-hover:-translate-y-1">
        <ArrowUpIcon className="w-3.5 h-3.5" />
      </span>
    </button>
  )
}

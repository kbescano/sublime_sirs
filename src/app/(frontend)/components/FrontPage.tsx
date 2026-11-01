'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import type { HomePage } from '@/payload-types'
import MediaSlider from './MediaSlider'
import Reveal from './Reveal'
import TiltCard from './TiltCard'

export default function Services({ services }: { services: HomePage[] }) {
  const [expandedId, setExpandedId] = useState<HomePage['id'] | null>(null)

  return (
    <section id="services" className="bg-paper text-ink py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
            <h2 className="font-display uppercase text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight">
              Our
              <br />
              Story<span className="text-cobalt">.</span>
            </h2>
            <p className="max-w-sm text-sm md:text-base text-ink/60 leading-relaxed">
              Who we are, where we came from and the organization we proudly belong to.
            </p>
          </div>
        </Reveal>

        <div className="space-y-6 md:space-y-10">
          {services.map((service, index) => {
            const isExpanded = expandedId === service.id
            const reversed = index % 2 === 1

            return (
              <TiltCard
                key={service.id}
                index={index}
                max={10}
                glareClassName="rounded-[28px] md:rounded-[40px]"
              >
                <article
                  className={`grid md:grid-cols-2 gap-6 md:gap-0 bg-white rounded-[28px] md:rounded-[40px] p-3 md:p-4 ${
                    reversed ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div
                    className="pop rounded-[22px] md:rounded-[32px] bg-white border border-ink/[0.06] overflow-hidden"
                    style={{ '--depth': '40px' } as React.CSSProperties}
                  >
                    <MediaSlider images={service.images || []} alt={service.title} />
                  </div>

                  <div className="flex flex-col justify-between gap-10 p-4 md:p-10 lg:p-14">
                    <div
                      className="pop flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-ink/40"
                      style={{ '--depth': '25px' } as React.CSSProperties}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>/ {String(services.length).padStart(2, '0')}</span>
                    </div>

                    <div>
                      <h3
                        className="pop font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-6"
                        style={{ '--depth': '70px' } as React.CSSProperties}
                      >
                        {service.title}
                      </h3>
                      <p
                        style={{ '--depth': '30px' } as React.CSSProperties}
                        className={`pop text-[15px] md:text-base text-ink/70 leading-relaxed whitespace-pre-line ${
                          isExpanded ? '' : 'line-clamp-4'
                        }`}
                      >
                        {service.description}
                      </p>
                      {service.description?.length > 200 && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : service.id)}
                          style={{ '--depth': '90px' } as React.CSSProperties}
                          className="pop mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-cobalt hover:border-cobalt hover:text-white transition-colors"
                        >
                          {isExpanded ? 'Read less' : 'Read more'}
                          <span className={`transition-transform ${isExpanded ? 'rotate-45' : ''}`}>
                            +
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard>
            )
          })}
        </div>

        <div className="mt-24 md:mt-36 grid md:grid-cols-2 gap-4 md:gap-6">
          <TiltCard index={0} max={18} glareClassName="rounded-[28px] md:rounded-[40px]">
            <Link
              href="/activities"
              className="group relative rounded-[28px] md:rounded-[40px] bg-cobalt text-white p-8 md:p-12 min-h-[260px] h-full flex flex-col justify-between"
            >
              <span
                className="pop text-[11px] uppercase tracking-[0.3em] text-white/70"
                style={{ '--depth': '30px' } as React.CSSProperties}
              >
                What we do
              </span>
              <span className="flex items-end justify-between gap-4">
                <span
                  className="pop font-display uppercase text-5xl md:text-7xl leading-[0.9]"
                  style={{ '--depth': '45px' } as React.CSSProperties}
                >
                  Activities
                </span>
                <span
                  className="pop shrink-0"
                  style={{ '--depth': '70px' } as React.CSSProperties}
                >
                  <span className="grid place-items-center w-14 h-14 rounded-full bg-white text-cobalt transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRightIcon className="w-6 h-6" />
                  </span>
                </span>
              </span>
            </Link>
          </TiltCard>
          <TiltCard index={1} max={18} glareClassName="rounded-[28px] md:rounded-[40px]">
            <Link
              href="/members"
              className="group relative rounded-[28px] md:rounded-[40px] bg-ink text-white p-8 md:p-12 min-h-[260px] h-full flex flex-col justify-between"
            >
              <span
                className="pop text-[11px] uppercase tracking-[0.3em] text-white/50"
                style={{ '--depth': '30px' } as React.CSSProperties}
              >
                The brotherhood
              </span>
              <span className="flex items-end justify-between gap-4">
                <span
                  className="pop font-display uppercase text-5xl md:text-7xl leading-[0.9]"
                  style={{ '--depth': '45px' } as React.CSSProperties}
                >
                  Members
                </span>
                <span
                  className="pop shrink-0"
                  style={{ '--depth': '70px' } as React.CSSProperties}
                >
                  <span className="grid place-items-center w-14 h-14 rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRightIcon className="w-6 h-6" />
                  </span>
                </span>
              </span>
            </Link>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}

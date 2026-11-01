'use client'

import React, { useState } from 'react'
import type { Activity } from '@/payload-types'
import MediaSlider from './MediaSlider'
import Reveal from './Reveal'
import TiltCard from './TiltCard'

export default function Activities({ activities }: { activities: Activity[] }) {
  const [expandedId, setExpandedId] = useState<Activity['id'] | null>(null)

  return (
    <section id="activities" className="bg-paper text-ink py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12 md:mb-20 border-b border-ink/10 pb-6">
            <h2 className="font-display uppercase text-5xl md:text-7xl leading-[0.9] tracking-tight">
              Featured
              <br />
              events<span className="text-cobalt">.</span>
            </h2>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ink/40 pb-2">
              {String(activities.length).padStart(2, '0')} total
            </span>
          </div>
        </Reveal>

        {activities.length === 0 ? (
          <p className="py-24 text-center text-sm uppercase tracking-[0.3em] text-ink/40">
            No activities yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
            {activities.map((activity, index) => {
              const isExpanded = expandedId === activity.id
              return (
                <TiltCard
                  key={activity.id}
                  index={index % 3}
                  max={14}
                  glareClassName="rounded-[24px] md:rounded-[32px]"
                >
                  <article className="flex flex-col">
                    <div
                      className="pop rounded-[24px] md:rounded-[32px] bg-white overflow-hidden"
                      style={{ '--depth': '30px' } as React.CSSProperties}
                    >
                      <MediaSlider images={activity.images || []} alt={activity.title} />
                    </div>

                    <div className="pt-6 px-1">
                      <div
                        className="pop flex items-baseline justify-between gap-4 mb-3"
                        style={{ '--depth': '70px' } as React.CSSProperties}
                      >
                        <h3 className="font-display uppercase text-2xl md:text-3xl leading-none tracking-tight">
                          {activity.title}
                        </h3>
                        <span className="text-[11px] uppercase tracking-[0.25em] text-ink/40 shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p
                        style={{ '--depth': '40px' } as React.CSSProperties}
                        className={`pop text-[15px] text-ink/65 leading-relaxed whitespace-pre-line ${
                          isExpanded ? '' : 'line-clamp-3'
                        }`}
                      >
                        {activity.description}
                      </p>
                      {activity.description?.length > 120 && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : activity.id)}
                          style={{ '--depth': '90px' } as React.CSSProperties}
                          className="pop mt-4 text-[11px] uppercase tracking-[0.2em] font-medium text-cobalt border-b border-cobalt/30 pb-0.5 hover:border-cobalt transition-colors"
                        >
                          {isExpanded ? 'Read less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  </article>
                </TiltCard>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

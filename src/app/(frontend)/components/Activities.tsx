'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// --- SUB-COMPONENT: SLIDER ---
const ActivitiesSlider = ({ images }: { images: any[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden cursor-grab active:cursor-grabbing group/slider " ref={emblaRef}>
      <div className="flex h-full">
        {images.map((item, index) => {
          const imgUrl = item.image?.url || item.url || '';
          return (
            /* REMOVED p-6 to eliminate all vertical and horizontal padding */
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full flex items-center justify-center">
              <Image
                src={imgUrl}
                alt="Activity"
                fill
                priority={index === 0}
                /* Keeps the whole image visible but allows it to touch the edges */
                className="object-contain transition-transform duration-1000 group-hover/slider:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )
        })}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeftIcon className="w-5 h-5 text-zinc-400 stroke-[1px]" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300"
          >
            <ChevronRightIcon className="w-5 h-5 text-zinc-400 stroke-[1px]" />
          </button>
        </>
      )}
      
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-[1px] transition-all duration-500 ${
                i === selectedIndex ? 'w-8 bg-zinc-800' : 'w-3 bg-zinc-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// --- MAIN COMPONENT ---
export default function Activities() {
  const [activities, setActivities] = useState<any[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch('/api/activities?limit=100')
        const data = await response.json()
        setActivities(data.docs || [])
      } catch (error) {
        console.error("Error fetching activities:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchActivities()
  }, [])

  if (loading) return (
    <div className="bg-white py-32 text-center min-h-screen flex items-center justify-center">
      <span className="text-zinc-300 uppercase tracking-[0.6em] text-[9px] animate-pulse">
        Initializing...
      </span>
    </div>
  )

  return (
    <section id="activities" className="bg-white pb-20 lg:pb-32 text-black pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-2 group">
  <div className="flex flex-col gap-1">
    {/* Tiny uppercase label */}
    <span className="text-[9px] uppercase tracking-[0.5em] text-zinc-400 font-bold ml-0.5">
      Chapter&apos;s
    </span>
    
    {/* Main Title */}
    <h2 className="text-3xl font-light tracking-tighter uppercase font-serif text-zinc-900 leading-none">
      Events
    </h2>
  </div>
  
  {/* Animated hairline border */}
  <div className="w-8 h-[1px] bg-zinc-200 mt-6 transition-all duration-700 group-hover:w-16"></div>
</header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-2">
          {activities.map((activity) => (
            <div key={activity.id} className="flex flex-col group">
              
              <div className="relative -mx-6 md:mx-0 overflow-hidden">
                {activity.images && activity.images.length > 0 ? (
                  <ActivitiesSlider images={activity.images} />
                ) : (
                  <div className="aspect-[4/5] w-full bg-zinc-50 flex items-center justify-center text-[8px] uppercase tracking-[0.4em] text-zinc-200">
                    No Media
                  </div>
                )}
              </div>

              <div className="flex flex-col -mt-8">
                {/* Kept your spacing logic but matched the Services alignment */}
                <div className="pt-6 pb-4 px-2 md:px-0 border-b border-zinc-100">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1.5 text-zinc-900 leading-tight">
                    {activity.title}
                  </h3>
                  
                  <div className="relative">
                    <p className={`text-[12px] font-light text-zinc-500 leading-relaxed tracking-tight ${
                      expandedId === activity.id ? 'line-clamp-none' : 'line-clamp-2'
                    }`}>
                      {activity.description}
                    </p>
                    {activity.description?.length > 80 && (
                      <button 
                        onClick={() => setExpandedId(expandedId === activity.id ? null : activity.id)}
                        className="mt-2 text-[9px] font-bold tracking-widest text-black hover:text-zinc-400 uppercase transition-colors border-b border-zinc-50 pb-0.5"
                      >
                        {expandedId === activity.id ? 'less' : 'more'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
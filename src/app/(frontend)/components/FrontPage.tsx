'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// --- SUB-COMPONENT: SLIDER ---
const ServiceSlider = ({ images }: { images: any[] }) => {
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
    <div className="relative aspect-[4/5] w-full overflow-hidden cursor-grab active:cursor-grabbing group/slider bg-white" ref={emblaRef}>
      <div className="flex h-full">
        {images.map((item, index) => {
          const imgUrl = item.image?.url || item.url || '';
          return (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
              <Image
                src={imgUrl}
                alt="Service"
                fill
                priority={index === 0}
                className="object-contain w-full transition-transform duration-1000 group-hover/slider:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              className={`h-[1px] transition-all duration-700 ${
                i === selectedIndex ? 'w-8 bg-zinc-800' : 'w-3 bg-zinc-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// --- MAIN COMPONENT ---
export default function Services() {
  const [services, setServices] = useState<any[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/home-page?limit=100')
        const data = await response.json()
        setServices(data.docs || [])
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  if (loading) return (
    <div className="bg-white py-32 text-center min-h-screen flex items-center justify-center">
      <span className="text-zinc-300 uppercase tracking-[0.6em] text-[9px] animate-pulse">
        Initializing Studio...
      </span>
    </div>
  )

  return (
    <section id="services" className="bg-white pb-20 lg:pb-32 text-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col group">
              
              {/* Added padding here so title doesn't hit the edge */}
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-zinc-900 md:px-0">
                {service.title}
              </h3>
              
              {/* THE CHANGE: 
                -mx-6 pulls the slider to the very edge of the mobile screen.
                md:mx-0 resets it for the desktop grid.
              */}
              <div className="relative -mx-6 md:mx-0 overflow-hidden bg-white">
                {service.images && service.images.length > 0 ? (
                  <ServiceSlider images={service.images} />
                ) : (
                  <div className="aspect-[4/5] w-full bg-white border border-zinc-50 flex items-center justify-center text-[8px] uppercase tracking-[0.4em] text-zinc-200">
                    Media Offline
                  </div>
                )}
              </div>

              {/* Added padding here so description doesn't hit the edge */}
              <div className="flex flex-col px-1 md:px-0">
                <div className="pt-8 pb-4">
                  <div className="relative">
                    <p className={`text-[12px] font-light text-zinc-500 leading-relaxed tracking-tight ${
                      expandedId === service.id ? 'line-clamp-none' : 'line-clamp-2'
                    }`}>
                      {service.description}
                    </p>
                    {service.description?.length > 80 && (
                      <button 
                        onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                        className="mt-4 text-[8px] tracking-widest text-black hover:text-zinc-400 uppercase transition-colors border-b border-zinc-100 pb-1"
                      >
                        {expandedId === service.id ? 'less' : 'more'}
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
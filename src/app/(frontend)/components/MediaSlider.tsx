'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import type { Media } from '@/payload-types'

type SlideItem = { image: number | Media; id?: string | null }

// Shared carousel for Home and Activities cards
export default function MediaSlider({ images, alt }: { images: SlideItem[]; alt: string }) {
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
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const slides = images
    .map((item) => (typeof item.image === 'object' ? item.image?.url : null))
    .filter((url): url is string => Boolean(url))

  if (slides.length === 0) {
    return (
      <div className="aspect-[4/5] w-full flex items-center justify-center text-[10px] uppercase tracking-[0.4em] text-zinc-400">
        No media
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/5] w-full group/slider">
      <div className="h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((url, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
              <Image
                src={url}
                alt={alt}
                fill
                priority={index === 0}
                className="object-contain p-8 md:p-10 transition-transform duration-[1.4s] ease-out-expo group-hover/slider:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex gap-1.5 rounded-full bg-white/80 backdrop-blur px-3 py-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === selectedIndex ? 'w-6 bg-cobalt' : 'w-1.5 bg-zinc-300'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="grid place-items-center w-9 h-9 rounded-full bg-white/80 backdrop-blur text-ink hover:bg-cobalt hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next slide"
              className="grid place-items-center w-9 h-9 rounded-full bg-white/80 backdrop-blur text-ink hover:bg-cobalt hover:text-white transition-colors"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

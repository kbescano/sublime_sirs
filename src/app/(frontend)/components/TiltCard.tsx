'use client'

import React, { useEffect, useRef } from 'react'

/*
 * Layered 3D card:
 *  - flies in from depth when scrolled into view (direction alternates by index)
 *  - leans with scroll velocity (driven by <ScrollVelocity /> via --scroll-v)
 *  - tilts toward the cursor with a moving glare and shadow
 * Children marked with the `pop` class and a `--depth` style float off the card surface.
 */
export default function TiltCard({
  children,
  index = 0,
  max = 16,
  className = '',
  glareClassName = '',
}: {
  children: React.ReactNode
  index?: number
  max?: number
  className?: string
  glareClassName?: string
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      outer.classList.add('is-in')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          outer.classList.add('is-in')
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(outer)

    let rx = 0
    let ry = 0
    let scale = 1
    let targetRx = 0
    let targetRy = 0
    let targetScale = 1
    let raf = 0

    const render = () => {
      rx += (targetRx - rx) * 0.12
      ry += (targetRy - ry) * 0.12
      scale += (targetScale - scale) * 0.12

      inner.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale.toFixed(4)})`
      inner.style.boxShadow = `${(-ry * 1.6).toFixed(1)}px ${(24 + rx * 1.6).toFixed(1)}px 60px rgba(8, 26, 122, ${(0.08 + (scale - 1) * 3).toFixed(3)})`

      const settled =
        Math.abs(targetRx - rx) < 0.01 && Math.abs(targetRy - ry) < 0.01 && Math.abs(targetScale - scale) < 0.0005
      raf = settled ? 0 : requestAnimationFrame(render)
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const rect = outer.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      targetRy = (px - 0.5) * max * 2
      targetRx = -(py - 0.5) * max * 2
      targetScale = 1.03
      inner.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
      inner.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
      inner.classList.add('is-hover')
      kick()
    }

    const onLeave = () => {
      targetRx = 0
      targetRy = 0
      targetScale = 1
      inner.classList.remove('is-hover')
      kick()
    }

    outer.addEventListener('pointermove', onMove)
    outer.addEventListener('pointerleave', onLeave)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      outer.removeEventListener('pointermove', onMove)
      outer.removeEventListener('pointerleave', onLeave)
    }
  }, [max])

  return (
    <div
      ref={outerRef}
      className={`card3d ${className}`}
      style={{ '--i': index, '--dir': index % 2 === 0 ? 1 : -1 } as React.CSSProperties}
    >
      <div className="card3d-enter">
        <div className="card3d-lean">
          <div ref={innerRef} className={`card3d-inner ${glareClassName}`}>
            {children}
            <div aria-hidden className={`card3d-glare ${glareClassName}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

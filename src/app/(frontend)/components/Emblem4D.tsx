import React from 'react'

const EDGE_FACETS = 48
// Facet width that closes the polygon around the coin edge
const EDGE_FACET_WIDTH = Math.tan(Math.PI / EDGE_FACETS).toFixed(4)

/*
 * Static, deep 3D chapter seal: a thick navy coin held at a fixed angle,
 * with the crest raised well off the ring face and a soft cast shadow.
 * No motion — depth comes from the stacked layers alone.
 */
export default function Emblem4D() {
  return (
    <div
      className="emblem-stage relative h-full aspect-square select-none"
      role="img"
      aria-label="A. Mabini Chapter seal"
    >
      {/* Cast shadow under the coin */}
      <div aria-hidden className="emblem-shadow" />

      <div className="emblem-rig absolute inset-0">
        {/* Edge: flat facets around the rim form a solid side in the seal's navy */}
        {Array.from({ length: EDGE_FACETS }, (_, i) => (
          <div
            key={i}
            aria-hidden
            className="emblem-edge"
            style={{
              width: `calc(var(--w) * ${EDGE_FACET_WIDTH} + 1px)`,
              transform: `translate(-50%, -50%) rotateZ(${(360 / EDGE_FACETS) * i}deg) translateY(calc(var(--w) / -2)) rotateX(90deg)`,
            }}
          />
        ))}

        {/* Front face — seal ring */}
        <div
          className="emblem-face emblem-front"
          style={{ transform: 'translateZ(calc(var(--t) / 2 + 0.5px))' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/chapter-seal-ring.webp" alt="" draggable={false} className="w-full h-full" />
          <div aria-hidden className="emblem-glare" />
        </div>

        {/* Raised crest — the seal face is ring-only, so the crest stands off it as deep relief */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/chapter-crest.webp"
          alt=""
          draggable={false}
          className="emblem-crest"
          style={{
            transform:
              'translateZ(calc(var(--t) / 2 + var(--w) * 0.14)) translateY(-4%) scale(0.58)',
          }}
        />
      </div>
    </div>
  )
}

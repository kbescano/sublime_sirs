import React from 'react'

// Fragmented wheelchair-user pictogram: separate angular pieces with gaps between them
const PIECES = [
  // head
  { points: '86,18 110,10 117,58 90,64', fx: '-18px', fy: '-40px', fr: '-14deg' },
  // torso + arm
  { points: '88,74 124,78 130,150 110,154 99,112 97,172 74,167 75,104', fx: '-36px', fy: '-10px', fr: '8deg' },
  // thigh
  { points: '133,148 190,158 176,174 112,177', fx: '30px', fy: '-20px', fr: '-10deg' },
  // shin
  { points: '180,184 196,190 182,254 168,252', fx: '40px', fy: '24px', fr: '12deg' },
]

// Open wheel arc centred on (95,190), r=60, gap at the upper right
const CX = 95
const CY = 190
const R = 60
const arcPoint = (deg: number) => {
  const rad = (deg * Math.PI) / 180
  return `${(CX + R * Math.cos(rad)).toFixed(1)} ${(CY + R * Math.sin(rad)).toFixed(1)}`
}
const ARC = `M ${arcPoint(-128)} A ${R} ${R} 0 1 0 ${arcPoint(-28)}`

export default function HeroPictogram() {
  return (
    <svg viewBox="0 0 210 262" aria-hidden className="picto h-full w-auto overflow-visible">
      {PIECES.map((piece, i) => (
        <polygon
          key={i}
          points={piece.points}
          className="picto-piece"
          style={
            {
              '--fx': piece.fx,
              '--fy': piece.fy,
              '--fr': piece.fr,
              '--d': `${300 + i * 140}ms`,
            } as React.CSSProperties
          }
        />
      ))}
      <g className="picto-wheel">
        <path
          d={ARC}
          fill="none"
          strokeWidth="11"
          className="picto-piece"
          style={{ '--fx': '0px', '--fy': '30px', '--fr': '-40deg', '--d': '200ms' } as React.CSSProperties}
        />
      </g>
    </svg>
  )
}

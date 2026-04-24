'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CaretRight } from '@phosphor-icons/react'
import { Location } from '@/lib/types'

interface LocationCardProps {
  location: Location
}

export default function LocationCard({ location }: LocationCardProps) {
  const { name, city, image } = location
  const href = `/listings?city=${encodeURIComponent(city)}&district=${encodeURIComponent(name)}`

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => setIsClient(true), [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      {isClient && isHovering && (
        <div 
          className="fixed top-0 left-0 pointer-events-none z-[100] transition-opacity duration-300 ease-out flex items-center justify-center w-[96px] h-[96px] rounded-full bg-navy text-white text-[13px] font-bold tracking-[0.1em] shadow-xl"
          style={{ 
            opacity: 1,
            transform: `translate(${mousePos.x - 48}px, ${mousePos.y - 48}px)`,
            willChange: 'transform'
          }}
          aria-hidden="true"
        >
          VIEW &gt;
        </div>
      )}

      <Link
        href={href}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2 rounded-[16px] cursor-none"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        aria-label={`Browse properties in ${name}, ${city}`}
      >
      {/*
        ── CARD CONTAINER ──
        White/off-white background, rounded outer corners, subtle shadow.
        Image sits inside with its own padding and inner rounded corners.
      */}
      <div className="bg-white rounded-[16px] p-2 shadow-card">

        {/* Image — padded inside card, own rounded corners */}
        <div className="relative overflow-hidden rounded-[12px] w-full" style={{ aspectRatio: '4/3' }}>
          <Image
            src={image ?? '/images/locations/placeholder.jpg'}
            alt={`${name}, ${city}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* ── NAME + ARROW ROW — below the image, inside card ── */}
        <div className="flex items-center justify-between px-2 pt-3 pb-1">
          {/* Location name: ALL CAPS, navy, bold */}
          <p className="text-[13px] font-bold text-navy uppercase tracking-[0.04em]">
            {name}, {city}
          </p>

          {/*
            Arrow button:
            Default: light grey background, rounded
            Hover: fills solid dark navy
          */}
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#ebebeb] group-hover:bg-navy transition-colors duration-200 shrink-0"
            aria-hidden="true"
          >
            <CaretRight
              size={14}
              weight="bold"
              className="text-navy group-hover:text-white transition-colors duration-200"
            />
          </div>
        </div>

      </div>
    </Link>
    </>
  )
}

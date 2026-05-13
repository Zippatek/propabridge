'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { Property } from '@/lib/types'

interface PropertyHeroProps {
  property: Property
}

export function PropertyHero({ property }: PropertyHeroProps) {
  const heroImage =
    property.images && property.images.length > 0 ? property.images[0] : null

  const sectionRef = useRef<HTMLElement | null>(null)
  // Door effect: image starts slightly zoomed in and opens (scales down to 1) as the section enters view.
  // On scroll-away it re-zooms slightly — like closing a door behind you.
  const [scale, setScale] = useState(1.06)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // progress: 0 = section top at viewport bottom (not yet visible), 1 = section bottom at viewport top (scrolled past)
      const progress = Math.min(Math.max((vh - rect.top) / (rect.height + vh), 0), 1)

      // Door open: starts at 1.06, eases to 1.0 as section fills viewport (progress 0→0.5)
      // Door close: stays at 1.0 then slightly zooms back to 1.04 as we scroll past (progress 0.5→1)
      let s: number
      if (progress < 0.5) {
        s = 1.06 - progress * 2 * 0.06 // 1.06 → 1.0
      } else {
        s = 1.0 + (progress - 0.5) * 2 * 0.04 // 1.0 → 1.04
      }
      setScale(s)

      // Subtle vertical parallax — image drifts upward as you scroll down
      const localScroll = Math.max(-rect.top, 0)
      setTranslateY(Math.min(localScroll * 0.28, 80))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Google Maps deep link
  const mapsHref = property.location
    ? `https://maps.google.com/?q=${encodeURIComponent(property.location + ', Nigeria')}`
    : null

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '72vh', minHeight: 520, marginTop: '-84px', paddingTop: '84px' }}
      aria-labelledby="property-hero-heading"
    >
      {/* Background image with door-open scroll effect */}
      <div
        className="absolute inset-0 z-0 bg-[#d0cfc5]"
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: 'center center',
          transition: 'transform 0.05s linear',
          willChange: 'transform',
        }}
      >
        {heroImage && (
          <Image
            src={heroImage}
            alt={property.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
      </div>

      {/* Very thin gradient — only the bottom 28% fades to beige so text is readable */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(244,243,234,0.96) 0%, rgba(244,243,234,0.45) 18%, rgba(244,243,234,0.05) 32%, transparent 46%)',
        }}
      />

      {/* Content pinned to bottom */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-12 px-4">
        <h1
          id="property-hero-heading"
          className="text-center font-semibold text-[#001a40] max-w-5xl mb-4"
          style={{ fontSize: 'clamp(24px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
        >
          {property.title}
        </h1>

        {mapsHref ? (
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#4a5568] hover:text-[#006aff] font-medium transition-colors text-[14px] group"
            title="Open in Google Maps"
          >
            <MapPin size={18} className="text-[#001a40] group-hover:text-[#006aff] transition-colors flex-shrink-0" />
            <span className="group-hover:underline underline-offset-2">{property.location}</span>
            <span className="text-[11px] font-semibold text-[#006aff] opacity-0 group-hover:opacity-100 transition-opacity">
              → Maps
            </span>
          </a>
        ) : (
          <div className="flex items-center gap-2 text-[#4a5568] font-medium text-[14px]">
            <MapPin size={18} className="text-[#001a40]" />
            <span>{property.location}</span>
          </div>
        )}
      </div>
    </section>
  )
}

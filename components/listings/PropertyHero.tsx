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
  const [mounted, setMounted] = useState(false)
  const [imageScale, setImageScale] = useState(1.08)
  const [translateY, setTranslateY] = useState(0)

  // Door open on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true)
      setImageScale(1.0)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  // Door close + parallax as hero scrolls away
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrolledPast = Math.max(-rect.top, 0)
      const scrollRatio = Math.min(scrolledPast / (rect.height || 1), 1)
      setImageScale(1.0 + scrollRatio * 0.05)
      setTranslateY(Math.min(scrolledPast * 0.25, 80))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const mapsHref = property.location
    ? `https://maps.google.com/?q=${encodeURIComponent(property.location + ', Nigeria')}`
    : null

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      // 99vh — specs bar always below the fold on desktop
      style={{ height: '99vh', minHeight: 600, marginTop: '-84px' }}
      aria-labelledby="property-hero-heading"
    >
      {/* ── Image: door-open scale + parallax ── */}
      <div
        className="absolute inset-0 z-0 bg-[#d0cfc5]"
        style={{
          opacity: mounted ? 1 : 0,
          transform: `scale(${imageScale}) translateY(${translateY}px)`,
          transformOrigin: 'center center',
          transition: mounted
            ? 'transform 0.08s linear'
            : 'opacity 700ms ease, transform 700ms ease',
          willChange: 'transform, opacity',
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

      {/* ── Beige gradient — fades from brand beige at bottom to transparent ── */}
      {/*    Image stays fully clear in the top ~45%; bottom half transitions      */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, #f4f3ea 0%, rgba(244,243,234,0.92) 18%, rgba(244,243,234,0.55) 34%, rgba(244,243,234,0.15) 50%, transparent 65%)',
        }}
      />

      {/* ── Content: centered, pinned to bottom ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 px-4 text-center">

        <h1
          id="property-hero-heading"
          className="max-w-4xl mb-4"
          style={{
            fontSize: 'clamp(26px, 4.5vw, 54px)',
            fontWeight: 500,           // reduced weight — was 700
            lineHeight: 1.08,
            letterSpacing: '-0.022em',
            color: '#001a40',
          }}
        >
          {property.title}
        </h1>

        {/* Location link — dotted underline, centered */}
        {mapsHref ? (
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#4a5568] hover:text-[#006aff] font-medium transition-colors text-[14px] group"
            title="Open in Google Maps"
          >
            <MapPin size={15} className="text-[#001a40] group-hover:text-[#006aff] transition-colors flex-shrink-0" />
            <span
              style={{
                textDecoration: 'underline',
                textDecorationStyle: 'dotted',
                textDecorationColor: 'rgba(74,85,104,0.5)',
                textUnderlineOffset: '4px',
              }}
            >
              {property.location}
            </span>
            <span className="text-[11px] font-semibold text-[#006aff] opacity-0 group-hover:opacity-100 transition-opacity">
              → Maps
            </span>
          </a>
        ) : property.location ? (
          <div className="flex items-center gap-1.5 text-[#4a5568] font-medium text-[14px]">
            <MapPin size={15} className="text-[#001a40]" />
            <span>{property.location}</span>
          </div>
        ) : null}
      </div>
    </section>
  )
}

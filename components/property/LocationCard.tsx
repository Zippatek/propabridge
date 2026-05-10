'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Location } from '@/lib/types'
import HoverCursorWrapper from '@/components/ui/HoverCursorWrapper'

interface LocationCardProps {
  location: Location
}

export default function LocationCard({ location }: LocationCardProps) {
  const { name, city, image } = location
  const href = `/neighborhood/${encodeURIComponent(location.id)}`

  return (
    <HoverCursorWrapper>
      <Link
        href={href}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2 rounded-[24px]"
        aria-label={`Browse properties in ${name}, ${city}`}
      >
      {/*
        ── CARD CONTAINER ──
        White/off-white background, rounded outer corners, subtle shadow.
        Image sits inside with its own padding and inner rounded corners.
      */}
      <div className="bg-brand-light-1 rounded-[24px] p-3">

        {/* Image — padded inside card, own rounded corners */}
        <div className="relative overflow-hidden rounded-[16px] w-full" style={{ aspectRatio: '4/3' }}>
          <Image
            src={image ?? '/images/locations/placeholder.jpg'}
            alt={`${name}, ${city}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* ── NAME + ARROW ROW — below the image, inside card ── */}
        <div className="flex items-center justify-between px-2 pt-4 pb-2">
          {/* Location name: ALL CAPS, navy, bold */}
          <p className="text-xl font-bold text-navy uppercase tracking-tight">
            {name}, {city}
          </p>

          {/*
            Arrow button:
            Default: light cream background, rounded
            Hover: darkens slightly
          */}
          <div
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white group-hover:bg-gray-100 transition-colors duration-200 shrink-0"
            aria-hidden="true"
          >
            <ChevronRight
              size={20}
              className="text-navy transition-colors duration-200"
            />
          </div>
        </div>

      </div>
    </Link>
    </HoverCursorWrapper>
  )
}

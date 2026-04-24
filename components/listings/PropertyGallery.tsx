'use client';

import Image from 'next/image';
import { Property } from '@/lib/types';

interface PropertyGalleryProps {
  property: Property;
}

// Curated Unsplash interior shots that complement the modern Nigerian terrace exterior
const INTERIOR_GALLERY = [
  // Image 0: Use property's own exterior (from mock data)
  // Image 1: Large center — living room with LED ceiling
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=900&q=85',
  // Image 2: top-right 1 — open plan interior
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=85',
  // Image 3: top-right 2 — modern kitchen
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=85',
  // Image 4: bottom-right 1 — bedroom
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=85',
  // Image 5: bottom-right 2 (with overlay button) — staircase
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=85',
];

export function PropertyGallery({ property }: PropertyGalleryProps) {
  const exteriorImage = property.images?.[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=85';

  return (
    <div className="w-full mt-10 mb-16">
      <div className="container-site">
        {/*
          Gallery Grid (matches reference exactly):
          - Col 1: 1 tall portrait image (exterior)
          - Col 2: 1 large square image (living room)
          - Col 3+4: 2×2 grid of 4 smaller images
          Total: 4 columns, ~390px tall
        */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: '1fr 1.45fr 0.75fr 0.75fr',
            gridTemplateRows: '1fr 1fr',
            height: '390px',
          }}
        >
          {/* ── Left: Exterior (spans both rows) ── */}
          <div
            className="relative rounded-[12px] overflow-hidden"
            style={{ gridColumn: '1', gridRow: '1 / 3' }}
          >
            <Image
              src={exteriorImage}
              alt={`${property.title} - Exterior`}
              fill
              className="object-cover hover:scale-[1.03] transition-transform duration-500"
              sizes="25vw"
            />
          </div>

          {/* ── Center: Living Room (spans both rows) ── */}
          <div
            className="relative rounded-[12px] overflow-hidden"
            style={{ gridColumn: '2', gridRow: '1 / 3' }}
          >
            <Image
              src={INTERIOR_GALLERY[1]}
              alt={`${property.title} - Living Room`}
              fill
              className="object-cover hover:scale-[1.03] transition-transform duration-500"
              sizes="30vw"
            />
          </div>

          {/* ── Right Top-Left: Open Plan ── */}
          <div
            className="relative rounded-[12px] overflow-hidden"
            style={{ gridColumn: '3', gridRow: '1' }}
          >
            <Image
              src={INTERIOR_GALLERY[2]}
              alt={`${property.title} - Interior`}
              fill
              className="object-cover hover:scale-[1.03] transition-transform duration-500"
              sizes="15vw"
            />
          </div>

          {/* ── Right Top-Right: Kitchen ── */}
          <div
            className="relative rounded-[12px] overflow-hidden"
            style={{ gridColumn: '4', gridRow: '1' }}
          >
            <Image
              src={INTERIOR_GALLERY[3]}
              alt={`${property.title} - Kitchen`}
              fill
              className="object-cover hover:scale-[1.03] transition-transform duration-500"
              sizes="15vw"
            />
          </div>

          {/* ── Right Bottom-Left: Bedroom ── */}
          <div
            className="relative rounded-[12px] overflow-hidden"
            style={{ gridColumn: '3', gridRow: '2' }}
          >
            <Image
              src={INTERIOR_GALLERY[4]}
              alt={`${property.title} - Bedroom`}
              fill
              className="object-cover hover:scale-[1.03] transition-transform duration-500"
              sizes="15vw"
            />
          </div>

          {/* ── Right Bottom-Right: Staircase + VIEW ALL IMAGES overlay ── */}
          <div
            className="relative rounded-[12px] overflow-hidden"
            style={{ gridColumn: '4', gridRow: '2' }}
          >
            <Image
              src={INTERIOR_GALLERY[5]}
              alt={`${property.title} - Staircase`}
              fill
              className="object-cover hover:scale-[1.03] transition-transform duration-500"
              sizes="15vw"
            />
            {/* Dark overlay + button — centered inside the image */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button className="bg-[#001a40] hover:bg-[#002a5e] text-white font-semibold text-[12px] uppercase tracking-[0.07em] px-4 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap shadow-lg">
                VIEW ALL IMAGES
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

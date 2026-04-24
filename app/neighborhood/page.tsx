import type { Metadata } from 'next'
import LocationCard from '@/components/property/LocationCard'
import { MOCK_LOCATIONS } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Neighborhoods — Propabridge',
  description:
    'Explore verified neighborhoods across Abuja, Kaduna, and Minna. Discover local communities, lifestyle perks, and what makes each area special.',
  openGraph: {
    title: 'Neighborhoods — Propabridge',
    description:
      'Explore verified neighborhoods across Abuja, Kaduna, and Minna. Discover local communities, lifestyle perks, and what makes each area special.',
    url: 'https://propabridge.com/neighborhood',
  },
}

export default function NeighborhoodPage() {
  return (
    <main className="bg-beige min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="container-site pt-20 pb-14 text-center" aria-labelledby="neighborhoods-heading">

        {/* Pill badge — matches the reference exactly */}
        <div className="inline-flex items-center gap-2 border border-navy/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-navy inline-block" aria-hidden="true" />
          <span className="text-[11px] font-semibold text-navy uppercase tracking-[0.12em]">
            Neighborhoods
          </span>
          <span className="w-2 h-2 rounded-full bg-navy inline-block" aria-hidden="true" />
        </div>

        {/* Heading */}
        <h1
          id="neighborhoods-heading"
          className="text-navy font-bold leading-[1.1] tracking-[-0.02em] max-w-3xl mx-auto"
          style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
        >
          Every neighborhood has its rhythm — let&apos;s find the one that fits you best.
        </h1>
      </section>

      {/* ── NEIGHBORHOOD GRID ────────────────────────────────────────── */}
      <section
        className="container-site pb-24"
        aria-label="All neighborhoods"
      >
        {/* Subtle divider between hero and grid */}
        <hr className="border-t border-grey-light mb-10" aria-hidden="true" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_LOCATIONS.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        {/* Empty state — future-proofed */}
        {MOCK_LOCATIONS.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-navy/50 text-[15px]">
              No neighborhoods available at the moment. Check back soon.
            </p>
          </div>
        )}
      </section>

    </main>
  )
}

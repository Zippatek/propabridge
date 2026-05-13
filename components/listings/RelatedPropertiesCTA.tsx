import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Bed, Bath } from 'lucide-react';
import { fetchListings } from '@/lib/api';
import { Property } from '@/lib/types';

interface Props {
  property: Property;
}

function RelatedCard({ p }: { p: Property }) {
  const href = `/properties-details/${p.slug || p.id}`;
  const img = p.images?.[0];
  return (
    <Link
      href={href}
      className="group flex flex-col bg-white rounded-[14px] overflow-hidden shadow-[0_2px_16px_rgba(0,26,64,0.07)] hover:shadow-[0_8px_32px_rgba(0,26,64,0.14)] transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#e2e8f0]">
        {img ? (
          <Image
            src={img}
            alt={p.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#e2e8f0] flex items-center justify-center">
            <span className="text-[#a0aec0] text-[12px]">No image</span>
          </div>
        )}
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-[#001a40]/90 text-white text-[10px] font-bold uppercase tracking-[0.07em] px-2.5 py-1 rounded-[5px]">
            {p.status === 'FOR RENT' ? 'For Rent' : p.status === 'OFF-PLAN' ? 'Off-Plan' : 'For Sale'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h4 className="text-[#001a40] font-semibold text-[14px] leading-snug line-clamp-2 group-hover:text-[#006aff] transition-colors">
          {p.title}
        </h4>
        {p.location && (
          <div className="flex items-center gap-1 text-[#4a5568] text-[12px]">
            <MapPin size={12} className="flex-shrink-0 text-[#001a40]" />
            <span className="truncate">{p.location}</span>
          </div>
        )}

        {/* Specs row */}
        {(p.beds || p.baths) && (
          <div className="flex items-center gap-3 text-[#4a5568] text-[12px]">
            {p.beds && (
              <span className="flex items-center gap-1">
                <Bed size={12} /> {p.beds} bed{p.beds > 1 ? 's' : ''}
              </span>
            )}
            {p.baths && (
              <span className="flex items-center gap-1">
                <Bath size={12} /> {p.baths} bath{p.baths > 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        <p className="text-[#001a40] font-bold text-[15px] mt-auto pt-2 border-t border-[#f0f0ea]">
          {p.price ? `₦${p.price.toLocaleString()}` : 'Price on enquiry'}
        </p>
      </div>
    </Link>
  );
}

export async function RelatedPropertiesCTA({ property }: Props) {
  // Fetch similar properties: same city + same status, exclude self
  let related: Property[] = [];
  try {
    const candidates = await fetchListings({
      status: property.status,
      limit: 9,
    });
    // Score: same city = 3pts, same type = 2pt, similar price bracket = 1pt
    const scoreFn = (p: Property) => {
      if (p.id === property.id || p.slug === property.slug) return -1;
      let score = 0;
      if (p.city && property.city && p.city === property.city) score += 3;
      if (p.type === property.type) score += 2;
      if (property.price && p.price) {
        const ratio = p.price / property.price;
        if (ratio >= 0.6 && ratio <= 1.6) score += 1;
      }
      return score;
    };
    related = candidates
      .map((p) => ({ p, score: scoreFn(p) }))
      .filter(({ score }) => score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ p }) => p);
  } catch {
    // silently degrade
  }

  return (
    <section className="container-site pt-16 pb-20">
      <hr className="border-t border-[#cbd5e0] mb-14" />

      {/* Section header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-[10px] h-[10px] rounded-[2px] bg-[#001a40] inline-block" />
            <span className="text-[#001a40] text-[11px] font-bold uppercase tracking-[0.1em]">
              SMART PICKS FOR YOU
            </span>
          </div>
          <h2
            className="text-heading font-semibold"
            style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            {related.length > 0
              ? 'Similar properties in your area'
              : 'More properties you might like'}
          </h2>
          {related.length > 0 && (
            <p className="text-[#4a5568] text-[13px] mt-2">
              Matched by location, type, and price range — curated by PropaAI.
            </p>
          )}
        </div>
        <Link
          href={`/listings?city=${encodeURIComponent(property.city || '')}&status=${encodeURIComponent(property.status || '')}`}
          className="btn-cream-pill shrink-0"
        >
          VIEW MORE <span aria-hidden="true">›</span>
        </Link>
      </div>

      {/* Cards grid */}
      {related.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p) => (
            <RelatedCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        /* Fallback CTA when no similar listings found */
        <div className="flex justify-center">
          <Link href="/listings" className="btn-cream-pill">
            VIEW ALL PROPERTIES <span aria-hidden="true">›</span>
          </Link>
        </div>
      )}
    </section>
  );
}

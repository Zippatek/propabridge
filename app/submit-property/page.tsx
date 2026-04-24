import { SubmitPropertyForm } from '@/components/forms/SubmitPropertyForm';
import { ListingPerksSection } from '@/components/sections/ListingPerksSection';
import { SubmitPropertyFAQ } from '@/components/sections/SubmitPropertyFAQ';

export const metadata = {
  title: 'Submit Property — Propabridge',
  description: 'Submit your property for listing on Propabridge. Free verification, zero inspection fees, maximum visibility.',
};

export default function SubmitPropertyPage() {
  return (
    <main className="min-h-screen bg-[#f4f3ea]">

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <section className="pt-16 pb-10 px-4 flex flex-col items-center text-center">

        {/* Centered pill badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 border border-[#d0cec4] rounded-full px-4 py-1.5 mb-8">
          <span className="w-[7px] h-[7px] rounded-[2px] bg-[#001a40] inline-block" />
          <span className="text-[#001a40] text-[12px] font-bold uppercase tracking-[0.1em]">
            Submit Property
          </span>
          <span className="w-[7px] h-[7px] rounded-[2px] bg-[#001a40] inline-block" />
        </div>

        {/* Centered headline */}
        <h1
          className="text-[#001a40] font-bold leading-[1.2] tracking-[-0.02em] max-w-2xl"
          style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}
        >
          Submit Your Property. Reach<br className="hidden sm:block" /> Thousands of Verified Clients.
        </h1>
      </section>

      {/* ── FORM ────────────────────────────────────────────────────── */}
      <section className="pb-28 px-4">
        <div className="max-w-[760px] mx-auto">
          <SubmitPropertyForm />
        </div>
      </section>

      {/* ── LISTING PERKS ───────────────────────────────────────────── */}
      <ListingPerksSection />

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <SubmitPropertyFAQ />

    </main>
  );
}

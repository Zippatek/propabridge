'use client';

import { useState } from 'react';
import { Envelope, Phone, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Property } from '@/lib/types';

interface Props { property: Property }

export function PropertyInquiryCard({ property }: Props) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
  };

  // Truncate listing title for the pre-filled field
  const listingTitle = property.title.length > 42
    ? property.title.slice(0, 42) + '…'
    : property.title;

  return (
    <div className="flex flex-col gap-5">

      {/* ── AGENT CARD ─────────────────────────────────────────────────── */}
      <div className="bg-[#f4f3ea] rounded-[14px] p-6 shadow-[0_4px_24px_rgba(0,26,64,0.08)]">
        {/* Logo + Listed By */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#e2e8f0]">
          {/* Propabridge house icon */}
          <div className="w-[60px] h-[60px] flex-shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="60" height="60" rx="10" fill="#f4f3ea"/>
              <path d="M30 10L8 28H14V50H46V28H52L30 10Z" stroke="#001a40" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
              <path d="M22 50V36H38V50" stroke="#001a40" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M26 36V28H34V36" stroke="#001a40" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#4a5568] uppercase tracking-[0.08em] mb-0.5">
              LISTED BY
            </p>
            <p className="text-[#001a40] font-bold text-[16px]">Propabridge Team</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[#001a40] font-bold text-[14px] mb-1">Email</p>
            <a
              href="mailto:hello@propabridge.com"
              className="text-[#006aff] text-[14px] hover:underline"
            >
              hello@propabridge.com
            </a>
          </div>
          <Envelope size={22} color="#4a5568" weight="light" />
        </div>

        {/* Phone */}
        <hr className="border-t border-[#cbd5e0] border-dashed mb-5" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[#001a40] font-bold text-[14px] mb-1">Phone</p>
            <a
              href="tel:+2348090892219"
              className="text-[#006aff] text-[14px] hover:underline"
            >
              +234 809 089 2219
            </a>
          </div>
          <Phone size={22} color="#4a5568" weight="light" />
        </div>

        {/* Agent Details CTA */}
        <button className="w-full flex items-center justify-center gap-2 bg-[#006aff] hover:bg-[#0052cc] text-white font-semibold text-[13px] uppercase tracking-[0.06em] py-3.5 rounded-[8px] transition-all duration-200">
          AGENT DETAILS
          <ArrowRight size={16} weight="bold" />
        </button>
      </div>

      {/* ── INQUIRY FORM ───────────────────────────────────────────────── */}
      <div className="bg-[#f4f3ea] rounded-[14px] p-6 shadow-[0_4px_24px_rgba(0,26,64,0.08)]">
        <h3
          className="text-[#001a40] font-bold mb-2"
          style={{ fontSize: 'clamp(18px, 1.6vw, 22px)' }}
        >
          Interested in this property?
        </h3>
        <p className="text-[#4a5568] text-[14px] leading-[1.6] mb-6">
          Fill in the form and we&apos;ll arrange a tour so you can explore this for yourself.
        </p>

        {submitted ? (
          <div className="bg-[#1a7a4a]/10 border border-[#1a7a4a]/30 rounded-[8px] p-4 text-[#1a7a4a] font-semibold text-[14px] text-center">
            ✓ Request submitted! We&apos;ll be in touch shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

            {/* Name */}
            <div>
              <label className="block text-[#001a40] font-semibold text-[13px] mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                required
                className="w-full bg-white border-0 rounded-[8px] px-4 py-3 text-[14px] text-[#001a40] placeholder:text-[#a0aec0] outline-none focus:ring-2 focus:ring-[#006aff]/30 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[#001a40] font-semibold text-[13px] mb-1.5">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                className="w-full bg-white border-0 rounded-[8px] px-4 py-3 text-[14px] text-[#001a40] placeholder:text-[#a0aec0] outline-none focus:ring-2 focus:ring-[#006aff]/30 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#001a40] font-semibold text-[13px] mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full bg-white border-0 rounded-[8px] px-4 py-3 text-[14px] text-[#001a40] placeholder:text-[#a0aec0] outline-none focus:ring-2 focus:ring-[#006aff]/30 transition"
              />
            </div>

            {/* Property ID — pre-filled, read-only */}
            <div>
              <label className="block text-[#001a40] font-semibold text-[13px] mb-1.5">Property ID</label>
              <input
                type="text"
                value={property.id}
                readOnly
                className="w-full bg-white border-0 rounded-[8px] px-4 py-3 text-[14px] text-[#4a5568] outline-none cursor-default select-none"
              />
            </div>

            {/* Listing Title — pre-filled, read-only */}
            <div>
              <label className="block text-[#001a40] font-semibold text-[13px] mb-1.5">Listing Title</label>
              <input
                type="text"
                value={listingTitle}
                readOnly
                className="w-full bg-white border-0 rounded-[8px] px-4 py-3 text-[14px] text-[#4a5568] outline-none cursor-default select-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-[#001a40] font-semibold text-[13px] mb-1.5">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here"
                rows={4}
                className="w-full bg-white border-0 rounded-[8px] px-4 py-3 text-[14px] text-[#001a40] placeholder:text-[#a0aec0] outline-none focus:ring-2 focus:ring-[#006aff]/30 transition resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#001a40] hover:bg-[#002a5e] text-white font-bold text-[13px] uppercase tracking-[0.06em] py-4 rounded-[8px] transition-all duration-200 mt-1"
            >
              REQUEST A TOUR
              <ArrowRight size={16} weight="bold" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

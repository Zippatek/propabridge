'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Custom hook to track mouse position universally to prevent lag
const useMousePosition = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mousePos
}

type Blog = {
  id: string
  date: string
  category: string
  title: string
  image: string
}

const BLOGS: Blog[] = [
  {
    id: 'renting-abuja',
    date: 'MAR 5, 2026',
    category: 'GUIDE',
    title: 'First Time Renting in Abuja? Start Here. The Complete Honest Guide.',
    image: '/images/blogs/rent.png',
  },
  {
    id: 'property-documents',
    date: 'FEB 8, 2026',
    category: 'GUIDE',
    title: 'The 7 Documents You Must See Before Paying Rent on Any Nigerian Property',
    image: '/images/blogs/docs.png',
  },
  {
    id: 'inspection-fees',
    date: 'JUL 5, 2025',
    category: 'NEWS',
    title: 'Why Inspection Fees Are Exploitative — and Why We Banned Them',
    image: '/images/blogs/fees.png',
  }
]

export default function BlogsSection() {
  const mousePos = useMousePosition()
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)

  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])

  return (
    <section className="bg-beige section-pt section-pb relative" aria-labelledby="blogs-heading">

      {/* ── TOP DIVIDER ── */}
      <hr className="border-t border-grey-light mx-6 mb-12 md:mb-16" aria-hidden="true" />

      {/* ── GLOBAL CUSTOM CURSOR ── */}
      {isClient && (
        <div
          className={`fixed top-0 left-0 pointer-events-none z-[100] transition-opacity duration-300 ease-out flex items-center justify-center w-[100px] h-[100px] rounded-full bg-navy text-white text-[13px] font-bold tracking-[0.1em] shadow-float ${hoveredCardId ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          style={{
            transform: `translate(${mousePos.x - 50}px, ${mousePos.y - 50}px)`,
            willChange: 'transform'
          }}
          aria-hidden="true"
        >
          VIEW &gt;
        </div>
      )}

      <div className="container-site">

        {/* ── HEADER ── */}
        <div className="relative mb-16 md:mb-24 flex justify-center pt-8">
          <div className="absolute left-0 top-0 flex items-start gap-2 pt-1 md:pt-4">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0 mt-[4px]" aria-hidden="true" />
            <p className="text-[12px] font-bold text-navy uppercase tracking-[0.08em]">
              BLOGS
            </p>
          </div>
          <h2
            id="blogs-heading"
            className="text-navy font-medium leading-[1.1] tracking-[-0.03em] max-w-[850px] text-center"
            style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}
          >
            News, stories, and inspiration<br className="hidden md:block" /> for better living every day
          </h2>
        </div>

        {/* ── BLOG GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {BLOGS.map(blog => (
            <Link
              href={`/blogs/${blog.id}`}
              key={blog.id}
              className="group block cursor-none transition-transform hover:-translate-y-1 duration-300"
              onMouseEnter={() => setHoveredCardId(blog.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              {/* Image Thumbnail */}
              <div className="relative w-full aspect-[4/3] md:aspect-[3/2] rounded-[24px] overflow-hidden bg-[#e0e0d5] mb-8 border border-[#ecece0]/50 shadow-sm transition-shadow">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Data Row */}
              <div className="flex items-center gap-2 text-navy mb-4">
                <p className="text-[12px] font-bold tracking-[0.1em] uppercase">{blog.date}</p>
                <div className="w-[4px] h-[4px] rounded-full bg-navy/40" />
                <p className="text-[12px] font-bold tracking-[0.1em] uppercase">{blog.category}</p>
              </div>

              {/* Title - Restored to Bold and Navy-only */}
              <h3 className="text-[20px] md:text-[23px] text-navy font-bold leading-[1.3] tracking-[-0.012em] mb-7 pr-4">
                {blog.title}
              </h3>

              {/* Author Pill - Refined Grey Background */}
              <div className="inline-flex items-center gap-2.5 bg-[#f0f0f0] pr-4 pl-1.5 py-1.5 rounded-full border border-[#ecece0]/80">
                <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-white">
                  <Image src="/images/blogs/author.png" alt="Aminu S. Muhammad" fill className="object-cover" />
                </div>
                <p className="text-[11px] font-bold text-navy tracking-[0.05em] uppercase">
                  AMINU S. MUHAMMAD
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── CTA BUTTON ── */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center bg-blue hover:bg-blue-hover text-white font-sans font-semibold text-[14px] uppercase tracking-wider px-6 py-3 rounded-btn transition-all duration-300 shadow-[0_4px_14px_rgba(0,106,255,0.3)] gap-2"
          >
            READ ALL BLOGS
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <path d="M5 12h14"></path>
              <path d="M13 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}

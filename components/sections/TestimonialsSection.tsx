'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { CaretLeft, CaretRight, PlayCircle } from '@phosphor-icons/react'

export type Review = {
  id: string
  type: 'image' | 'text'
  highlightQuote?: string[] 
  fullText?: string
  author: string
  role?: string
  location: string
  image: string
  hasVideo?: boolean
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    type: 'text',
    highlightQuote: ['“Fastest home tour booking ever!”'],
    fullText: '"I clicked on a listing, and within hours, I was walking through the front door. That kind of speed blew my mind. But it wasn’t just fast — it was personal. The agent pointed out details I would have missed, like the morning light in the kitchen and the quiet street at night."',
    author: 'Tunde O.',
    location: 'KADUNA',
    image: '/images/reviews/tunde.png',
  },
  {
    id: 'rev-2',
    type: 'image',
    fullText: '“I recommend them to everyone — even my picky cousin.”',
    author: 'Daniel T',
    role: 'TECH CONSULTANT',
    location: 'ABUJA',
    image: '/images/reviews/daniel.png',
  },
  {
    id: 'rev-3',
    type: 'text',
    highlightQuote: ['“Found my dream home', 'without losing my sanity!”'],
    fullText: '"I spent over ₦60,000 on inspection fees before Propabridge. Sixty thousand naira, just to see apartments that looked nothing like the pictures. Then I chatted with Propa, booked a viewing, and signed my Wuse 2 lease two days later. I paid nothing to view. That\'s when I knew this was different."',
    author: 'Amaka E.,',
    location: 'ABUJA',
    image: '/images/reviews/amaka_avatar.png',
  },
  {
    id: 'rev-4',
    type: 'image',
    fullText: '“They made me feel like my time actually mattered.”',
    author: 'Omar T',
    location: 'ABUJA',
    image: '/images/reviews/omar.png',
  },
  {
    id: 'rev-5',
    type: 'text',
    highlightQuote: ['“...working with this team', 'changed everything...”'],
    fullText: '"I was terrified of land scams. Propabridge showed me the original title documents before I made a single offer. Peace of mind I didn\'t think was possible in this market."',
    author: 'Umar Ibrahim',
    role: 'LAND OWNER',
    location: 'KADUNA',
    image: '/images/reviews/avatar.png',
  },
  {
    id: 'rev-6',
    type: 'image',
    fullText: '“...it wasn’t just fast — it was personal...”',
    author: 'Dr Ibrahim S.',
    location: 'MINNA',
    image: '/images/reviews/dr.png',
    hasVideo: true,
  }
]

interface TestimonialsSectionProps {
  heading?: string
}

export default function TestimonialsSection({
  heading = 'Stories from people who found their place with us',
}: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [totalDots, setTotalDots] = useState(REVIEWS.length)
  const [showArrows, setShowArrows] = useState(false)

  // Use layout effect or standard effect for initial measurements
  useEffect(() => {
    setShowArrows(true)
    handleScroll() // initial calc based on window width
    window.addEventListener('resize', handleScroll)
    return () => window.removeEventListener('resize', handleScroll)
  }, [])

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
    const itemWidth = window.innerWidth >= 768 ? 404 : 324
    
    // Exactly how many pagination dots are reachable
    const calculatedDots = Math.ceil(maxScroll / itemWidth) + 1
    // Safeguard to never have 0 dots layout shifts
    const validDots = calculatedDots > 0 ? calculatedDots : 1
    
    if (validDots !== totalDots) {
       setTotalDots(validDots)
    }

    const newIndex = Math.min(Math.round(scrollLeft / itemWidth), validDots - 1)
    setActiveIndex(Math.max(0, newIndex))
  }

  const scrollLeftClick = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const itemWidth = window.innerWidth >= 768 ? 404 : 324
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      
      if (scrollLeft <= 5) {
        // At start -> jump to end
        scrollRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' })
      } else {
        scrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' })
      }
    }
  }

  const scrollRightClick = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const itemWidth = window.innerWidth >= 768 ? 404 : 324
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      
      if (scrollLeft >= maxScroll - 5) {
        // At end -> jump back to start
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="bg-beige section-pt section-pb" aria-labelledby="reviews-heading">
      
      {/* ── DIVIDER ── */}
      <hr className="border-t border-grey-light mx-6 mb-12" aria-hidden="true" />
      
      <div className="container-site">
        {/* ── HEADER ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-24">
          <div className="md:col-span-3 flex items-start gap-2 md:pt-4">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0 mt-[4px]" aria-hidden="true" />
            <p className="text-[12px] font-semibold text-navy uppercase tracking-[0.08em]">
              REVIEWS
            </p>
          </div>
          <div className="md:col-span-9 flex items-center">
            <h2
              id="reviews-heading"
              className="text-navy font-medium leading-[1.15] tracking-[-0.02em] max-w-[850px]"
              style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
            >
              {heading}
            </h2>
          </div>
        </div>

        {/* ── CAROUSEL WRAPPER ── */}
        {/* Negative margins on mobile to allow edge-to-edge scrolling inside constrained container */}
        <div className="relative w-full -mx-4 px-4 md:mx-0 md:px-0">
           
           {/* LEFT ARROW (Desktop only or enabled based on screen) */}
           {showArrows && (
             <button 
               onClick={scrollLeftClick}
               className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-navy text-white rounded-full flex items-center justify-center z-30 hover:bg-navy/90 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)] hidden md:flex"
               aria-label="Previous Review"
             >
                <CaretLeft size={24} weight="bold" />
             </button>
           )}

           {/* RIGHT ARROW */}
           {showArrows && (
             <button 
               onClick={scrollRightClick}
               className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-navy text-white rounded-full flex items-center justify-center z-30 hover:bg-navy/90 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)] hidden md:flex"
               aria-label="Next Review"
             >
                <CaretRight size={24} weight="bold" />
             </button>
           )}

           {/* ── SCROLL CONTAINER ── */}
           {/* Adding overflow padding so shadows don't clip */}
           <div 
             ref={scrollRef}
             onScroll={handleScroll}
             className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
           >
              {REVIEWS.map((review) => {
                 
                 // VARIANT A: IMAGE FULL-CARD
                 if (review.type === 'image') {
                    return (
                       <div key={review.id} className="relative shrink-0 w-[300px] md:w-[380px] aspect-[8/11] rounded-[24px] overflow-hidden snap-center group shadow-sm transition-transform hover:scale-[1.01]">
                          <Image src={review.image} alt={review.author} fill className="object-cover" />
                          
                          {/* Dark Base Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1722]/90 via-[#0e1c28]/40 to-transparent" />

                          {/* Video Play Icon Overlay */}
                          {review.hasVideo && (
                            <div className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-85 group-hover:opacity-100 transition-opacity">
                               <div className="w-[68px] h-[68px] rounded-full border border-white/50 bg-white/20 backdrop-blur-md flex items-center justify-center pl-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                                 <div className="w-0 h-0 border-t-[9px] border-t-transparent border-l-[14px] border-l-white border-b-[9px] border-b-transparent relative left-[2px]" />
                               </div>
                            </div>
                          )}

                          {/* Content Overlay */}
                          <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                             <h4 className="text-white text-[22px] md:text-[24px] font-medium leading-[1.25] mb-8 tracking-[-0.01em]">
                                {review.fullText}
                             </h4>
                             <div>
                               <p className="text-white font-bold text-[16px]">{review.author}</p>
                               <p className="text-white/80 text-[11px] font-bold tracking-[0.15em] mt-1.5 uppercase">{review.location}</p>
                             </div>
                          </div>
                       </div>
                    )
                 }

                 // VARIANT B: BEIGE TEXT CARD
                 return (
                    <div key={review.id} className="relative shrink-0 w-[300px] md:w-[380px] aspect-[8/11] rounded-[24px] bg-[#fcfdf8] p-8 md:p-10 flex flex-col justify-between snap-center shadow-sm border border-[#ecece0]/60 transition-transform hover:scale-[1.01]">
                       
                       <div className="space-y-6">
                         {/* Highlight Block */}
                         {review.highlightQuote && (
                           <div className="flex flex-col items-start gap-1">
                             {review.highlightQuote.map((line, i) => (
                               <span key={i} className="bg-grey-light/50 px-2 py-0.5 leading-snug text-[18px] md:text-[20px] font-medium text-navy tracking-tight">
                                 {line}
                               </span>
                             ))}
                           </div>
                         )}

                         {/* Full Text Paragraph */}
                         <p className="text-grey text-[15px] md:text-[16px] leading-[1.65] tracking-tight">
                           {review.fullText}
                         </p>
                       </div>

                       {/* Bottom Author Profile */}
                       <div className="flex items-end justify-between mt-8">
                         <div className="mb-1">
                           <p className="text-navy font-bold text-[17px] mb-1.5">{review.author}</p>
                           <p className="text-grey text-[11px] font-bold tracking-[0.1em] uppercase">
                             {review.role ? `${review.role}, ${review.location}` : review.location}
                           </p>
                         </div>
                         <div className="relative w-[52px] h-[52px] rounded-[16px] overflow-hidden shadow-sm shrink-0 border border-grey-light/30">
                           <Image src={review.image} alt={review.author} fill className="object-cover" />
                         </div>
                       </div>

                    </div>
                 )
              })}
           </div>
        </div>

        {/* ── PAGINATION DOTS ── */}
        <div className="flex justify-center mt-10 md:mt-14 w-full">
           <div className="flex items-center gap-3 bg-white px-5 py-[10px] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#ecece0]/60">
              {Array.from({ length: totalDots }).map((_, i) => (
                <button 
                  key={i} 
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                     // Click a dot jumps to specific child width, clamped to max visible
                     let targetX = i * (window.innerWidth >= 768 ? 404 : 324)
                     if (scrollRef.current) {
                        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
                        if (targetX > maxScroll) targetX = maxScroll
                        scrollRef.current.scrollTo({ left: targetX, behavior: 'smooth' })
                     }
                  }}
                  className={`w-[7px] h-[7px] rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-navy scale-125' : 'bg-grey/30 hover:bg-grey/50'}`}
                />
              ))}
           </div>
        </div>

      </div>
    </section>
  )
}

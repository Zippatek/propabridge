import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      // Pull the hero UP by the navbar spacer height so the background fills
      // the full viewport including the area BEHIND the floating navbar
      style={{ minHeight: '100vh', marginTop: '-84px' }}
      aria-labelledby="hero-heading"
    >
      {/* ── BACKGROUND IMAGE — covers full 100vh including behind floating navbar ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          // Use a blurred Nigerian lifestyle/property image matching the original
          backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=85')`,
        }}
        role="img"
        aria-label="Nigerian residential property"
      />

      {/* Dark overlay — ~55% to match reference */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      {/* ── HERO CONTENT ── centered vertically, padded top to clear floating navbar */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center w-full px-6"
        style={{ minHeight: '100vh', paddingTop: 100 }}
      >
        {/*
          "buy. sell. rent." — each word is a link
          Hover: turns golden/amber (#f5c842) matching reference screenshot
          Cursor: pointer (hand) — shown in reference
        */}
        <h1
          id="hero-heading"
          className="font-medium leading-none tracking-[-0.02em] mb-6 text-center"
          style={{ fontSize: 'clamp(72px, 12vw, 160px)' }}
        >
          <Link
            href="/listings?type=buy"
            className="text-white hover:text-[#f5c842] transition-colors duration-200"
          >
            buy
          </Link>
          <span className="text-white">. </span>
          <Link
            href="/listings?type=sell"
            className="text-white hover:text-gold-hover transition-colors duration-200"
          >
            sell
          </Link>
          <span className="text-white">. </span>
          <Link
            href="/listings?type=rent"
            className="text-white hover:text-gold-hover transition-colors duration-200"
          >
            rent
          </Link>
          <span className="text-white">.</span>
        </h1>

        {/* Subtitle — perfectly centered, two lines */}
        <p
          className="text-white font-normal leading-[1.6] mb-10 text-center mx-auto"
          style={{ fontSize: 'clamp(18px, 2.4vw, 26px)', maxWidth: 650 }}
        >
          The Smartest Way to<br />
          <span className="bg-white/20 px-2 py-0.5 rounded-sm">Rent, Buy</span> and <span className="bg-white/20 px-2 py-0.5 rounded-sm">Invest</span> in <span className="bg-white/20 px-2 py-0.5 rounded-sm">Properties</span> in <span className="bg-white/20 px-2 py-0.5 rounded-sm">Nigeria</span>
        </p>

        {/* CTA */}
        <Link
          href="/listings"
          className="inline-flex items-center gap-2 bg-white text-navy font-semibold rounded-btn hover:bg-white/90 transition-all duration-200 uppercase tracking-wide"
          style={{ fontSize: 14, paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 24 }}
        >
          VIEW PROPERTIES
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

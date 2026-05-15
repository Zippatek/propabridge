import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import RecentListings from '@/components/sections/RecentListings'
import LocationSection from '@/components/sections/LocationSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WhyPropabridge from '@/components/sections/WhyPropabridge'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import HowItWorks from '@/components/sections/HowItWorks'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import BlogsSection from '@/components/sections/BlogsSection'
import FAQSection from '@/components/sections/FAQSection'

export const metadata: Metadata = {
  title: 'Propabridge — The Smartest Way to Rent, Buy and Invest in Properties in Nigeria',
  description:
    'Find verified properties in Abuja, Kaduna, and Minna. Zero inspection fees. Zero fake listings. Physical + legal verification on every listing.',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Propabridge',
  url: 'https://propabridge.com',
  logo: 'https://propabridge.com/logo-circle.jpg',
  description:
    'Buy, rent, or invest in verified properties across Nigeria. No fake listings. No inspection fees.',
  areaServed: ['Abuja', 'Kaduna', 'Minna', 'Nigeria'],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NG',
    addressRegion: 'FCT',
    addressLocality: 'Abuja',
  },
  sameAs: [
    'https://www.instagram.com/propabridge',
    'https://www.linkedin.com/company/propabridge',
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HeroSection />
      <RecentListings />
      <LocationSection />
      <ServicesSection />
      <WhyPropabridge />
      <WhyChooseUs />
      <HowItWorks />
      <TestimonialsSection />
      <BlogsSection />
      <FAQSection />
    </>
  )
}

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

export default function HomePage() {
  return (
    <>
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

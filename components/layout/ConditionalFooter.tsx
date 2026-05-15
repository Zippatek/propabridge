'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/layout/Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()

  if (pathname?.startsWith('/waitlist')) {
    return null
  }

  return <Footer />
}

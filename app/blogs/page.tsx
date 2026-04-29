import type { Metadata } from 'next'
import BlogsSection from '@/components/sections/BlogsSection'

export const metadata: Metadata = {
  title: 'Blogs & News | Propabridge',
  description:
    'News, stories, and inspiration for better living every day. Read the latest guides on buying, renting, and investing in Nigerian real estate.',
  openGraph: {
    title: 'Blogs & News | Propabridge',
    description:
      'News, stories, and inspiration for better living every day. Read the latest guides on buying, renting, and investing in Nigerian real estate.',
    type: 'website',
  },
}

export default function BlogsPage() {
  return (
    <main className="bg-beige min-h-screen pt-[72px]">
      <BlogsSection limit={8} isPage={true} />
    </main>
  )
}

'use client'

import { cn } from '@/lib/cn'

interface ListingsFiltersProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

const CATEGORIES = [
  'RETAIL SHOP',
  'ALL',
  'VILLA',
  'SINGLE FAMILY HOME',
  'LUXURY HOMES',
  'APARTMENT',
  'OFFICE SPACE',
  'COMMERCIAL',
  'LAND',
]

export default function ListingsFilters({ activeCategory, onCategoryChange, className }: ListingsFiltersProps) {
  return (
    <div className={cn("flex", className)}>
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-4 py-2.5 rounded-[8px] text-[12px] font-bold tracking-[0.05em] uppercase transition-colors whitespace-nowrap",
              isActive
                ? "bg-navy text-white shadow-md"
                : "bg-[#E5E7EB] text-navy hover:bg-[#D1D5DB]"
            )}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

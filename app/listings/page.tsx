'use client'

import { useState } from 'react'
import ListingsHero from '@/components/listings/ListingsHero'
import ListingsFilters from '@/components/listings/ListingsFilters'
import PropertyCard from '@/components/property/PropertyCard'
import { MOCK_PROPERTIES } from '@/lib/mock-data'
import { Property } from '@/lib/types'

export default function ListingsPage() {
  const [activeStatus, setActiveStatus] = useState('ALL')
  const [activeCategory, setActiveCategory] = useState('ALL')

  // Filter logic
  const filteredProperties = MOCK_PROPERTIES.filter((property) => {
    const matchesStatus = activeStatus === 'ALL' || property.status === activeStatus
    const matchesCategory = activeCategory === 'ALL' || property.type.toUpperCase() === activeCategory
    return matchesStatus && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#f4f3ea]">
      {/* Hero Section */}
      <ListingsHero 
        activeStatus={activeStatus} 
        onStatusChange={setActiveStatus} 
      />

      <div className="container-site pb-20">
        
        {/* Mobile Filters (Hidden on Desktop) */}
        <div className="md:hidden mt-8 mb-12">
          <ListingsFilters 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
            className="flex-wrap justify-center gap-3"
          />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 mt-12 md:mt-20">
          
          {/* Desktop Sidebar Filters (Hidden on Mobile) */}
          <div className="hidden md:block w-[240px] shrink-0">
            <div className="sticky top-32">
              <ListingsFilters 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
                className="flex-col gap-3"
              />
            </div>
          </div>

          {/* Property Cards Grid */}
          <div className="flex-1 min-w-0 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} priority={index < 4} />
                ))
              ) : (
                <div className="text-center py-20 bg-[#E5E7EB] rounded-[16px]">
                  <h3 className="text-navy font-semibold text-[20px] mb-2">No properties found</h3>
                  <p className="text-navy/70 text-[14px]">Try adjusting your search filters.</p>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

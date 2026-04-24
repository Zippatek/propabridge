import { notFound } from "next/navigation";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import { PropertyHero } from "@/components/listings/PropertyHero";
import { PropertySpecsBar } from "@/components/listings/PropertySpecsBar";
import { PropertyGallery } from "@/components/listings/PropertyGallery";
import { PropertyDescription } from "@/components/listings/PropertyDescription";
import { PropertyPlotMap } from "@/components/listings/PropertyPlotMap";
import { PropertyContentLayout } from "@/components/listings/PropertyContentLayout";
import { RelatedPropertiesCTA } from "@/components/listings/RelatedPropertiesCTA";

export default function PropertyDetailsPage({ searchParams }: { searchParams: { id?: string } }) {
  // Use the ID from the URL if present, otherwise fallback to the first mock property
  const propertyId = searchParams.id;
  const property = propertyId 
    ? MOCK_PROPERTIES.find((p) => p.id === propertyId) 
    : MOCK_PROPERTIES[0];

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f3ea] pb-24">
      {/* 1. Hero Section */}
      <PropertyHero property={property} />

      {/* Container for the rest of the page */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Specs Bar */}
        <PropertySpecsBar property={property} />
      </div>

      {/* 3. Image Gallery */}
      <PropertyGallery property={property} />

      {/* 4. Short Description */}
      <div className="container-site mb-10">
        <p
          className="text-[#001a40] leading-[1.65]"
          style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', fontWeight: 500 }}
        >
          {property.fullDescription || property.shortDescription}
        </p>
      </div>

      {/* 5. Plot Map */}
      <PropertyPlotMap />

      {/* 6. Two-Column Content Layout */}
      <PropertyContentLayout property={property} />

      {/* 7. Related Properties CTA */}
      <RelatedPropertiesCTA />
    </main>
  );
}

import { notFound } from "next/navigation";
import { fetchListing } from "@/lib/api";
import { PropertyHero } from "@/components/listings/PropertyHero";
import { PropertySpecsBar } from "@/components/listings/PropertySpecsBar";
import { PropertyGallery } from "@/components/listings/PropertyGallery";
import { PropertyContentLayout } from "@/components/listings/PropertyContentLayout";
import { RelatedPropertiesCTA } from "@/components/listings/RelatedPropertiesCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const property = await fetchListing(slug);
  if (!property) notFound();

  return (
    <main className="min-h-screen bg-[#f4f3ea] pb-24">
      <PropertyHero property={property} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PropertySpecsBar property={property} />
      </div>
      <PropertyGallery property={property} />
      <div className="container-site mb-10">
        <p
          className="text-[#001a40] leading-[1.65]"
          style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', fontWeight: 500 }}
        >
          {property.fullDescription || property.shortDescription}
        </p>
      </div>
      <PropertyContentLayout property={property} />
      <RelatedPropertiesCTA />
    </main>
  );
}

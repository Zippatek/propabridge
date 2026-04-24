import { notFound } from "next/navigation";
import propertiesData from "@/data/properties.json";
import { Property } from "@/lib/types";
import { PropertyHero } from "@/components/listings/PropertyHero";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function PropertyDetailsPage({ params }: PageProps) {
  // Find the property in our mock data based on the slug
  const property = propertiesData.find((p) => p.slug === params.slug) as Property | undefined;

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fcfdf8] pb-24">
      {/* 1. Hero Section */}
      <PropertyHero property={property} />

      {/* Container for the rest of the page */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Placeholder for the next components */}
        <div className="text-center text-gray-500 py-12">
          [Property Specs Bar Component Placeholder]
        </div>
      </div>
    </main>
  );
}

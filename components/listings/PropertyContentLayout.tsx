import { Property } from '@/lib/types';
import { PropertyDetails } from './PropertyDetails';
import { PropertyInquiryCard } from './PropertyInquiryCard';

interface Props { property: Property }

export function PropertyContentLayout({ property }: Props) {
  return (
    <div className="container-site mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-16 items-start">

        {/* Left Column */}
        <PropertyDetails property={property} />

        {/* Right Column — sticky sidebar */}
        <div className="lg:sticky lg:top-[100px] self-start">
          <PropertyInquiryCard property={property} />
        </div>

      </div>
    </div>
  );
}

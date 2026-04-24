import { Property } from '@/lib/types';

interface PropertyDescriptionProps {
  property: Property;
}

export function PropertyDescription({ property }: PropertyDescriptionProps) {
  const description = property.fullDescription || property.shortDescription;

  if (!description) return null;

  return (
    <div className="container-site mb-10">
      <p
        className="text-[#001a40] leading-[1.65]"
        style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', fontWeight: 500 }}
      >
        {description}
      </p>
    </div>
  );
}

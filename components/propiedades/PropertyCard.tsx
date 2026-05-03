import Image from "next/image";

export type PropertyCardDetails = {
  labels: {
    superficie: string;
    recamaras: string;
    banos: string;
  };
  values: {
    superficie: string;
    recamaras: string;
    banos: string;
  };
};

export type PropertyCardData = {
  slug: string;
  accent: string;
  title: string;
  subtitle: string;
  heroImageSrc: string;
  heroAlt: string;
  details: PropertyCardDetails | null;
};

type PropertyCardProps = {
  property: PropertyCardData;
  className?: string;
};

export default function PropertyCard({
  property,
  className = "",
}: PropertyCardProps) {
  return (
    <article
      className={`relative overflow-hidden border border-[#222]/[0.06] bg-[#EFE6DC] ${className}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${property.accent}, rgba(225,177,155,1))`,
        }}
      />
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE6DC]">
        <Image
          src={property.heroImageSrc}
          alt={property.heroAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
        />
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              className="text-[#222] leading-tight mb-2"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
              }}
            >
              {property.title}
            </h2>
            {property.subtitle ? (
              <p
                className="text-[11px] tracking-[0.24em] uppercase text-[#222]/45"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {property.subtitle}
              </p>
            ) : null}
          </div>
        </div>

        {property.details ? (
          <div
            className="mt-4 grid grid-cols-3 gap-3 border-t border-[#222]/[0.06] pt-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#222]/40">
                {property.details.labels.superficie}
              </p>
              <p className="mt-1 text-[12px] text-[#222]/70 font-medium truncate">
                {property.details.values.superficie}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#222]/40">
                {property.details.labels.recamaras}
              </p>
              <p className="mt-1 text-[12px] text-[#222]/70 font-medium truncate">
                {property.details.values.recamaras}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#222]/40">
                {property.details.labels.banos}
              </p>
              <p className="mt-1 text-[12px] text-[#222]/70 font-medium truncate">
                {property.details.values.banos}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

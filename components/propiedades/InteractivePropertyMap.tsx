"use client";

import { type KeyboardEvent, useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { type PropertyCardData } from "./PropertyCard";

export type PropertyMapType = "wellness" | "residencial" | "farm" | "presa";
type PropertyMapStage = "stage1" | "final";
type PropertyZoneStatus = "inDevelopment" | "comingSoon";

export type PropertyMapItem = PropertyCardData & {
  mapType: PropertyMapType;
};

type ZonePhoto = {
  src: string;
  alt: string;
};

export type PropertyMapCopy = {
  eyebrow: string;
  title: string;
  description: string;
  viewLabel: string;
  masterplanTitle: string;
  labels: {
    masterplan: string;
    amenities: string;
    photos: string;
    close: string;
    stage1: string;
    finalStage: string;
  };
  statusLabels: Record<PropertyZoneStatus, string>;
  zones: Record<
    PropertyMapType,
    {
      label: string;
      summary: string;
      amenities: string[];
      photoAlts: string[];
    }
  >;
  initialPhotoAlts: string[];
};

type InteractivePropertyMapProps = {
  copy: PropertyMapCopy;
  properties: PropertyMapItem[];
};

type MapShape =
  | {
    type: "path";
    d: string;
    transform?: string;
  }
  | {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
    transform?: string;
  };

const OVERVIEW_MAP_WIDTH = 2878;
const OVERVIEW_MAP_HEIGHT = 1858;
const MAP_VIEWBOX_Y = 119;
const MAP_VIEWBOX_HEIGHT = 1620;

const overviewSectionOrder: PropertyMapType[] = ["residencial", "farm", "presa", "wellness"];
const mapStageImageSrc: Record<PropertyMapStage, string> = {
  stage1: "/propiedades/mapa-etapa-1-detail.png",
  final: "/propiedades/mapa-final-detail.png",
};

const sectionMeta: Record<
  PropertyMapType,
  {
    status: PropertyZoneStatus;
    color: string;
    iconColor: string;
    iconSrc: string;
    marker: {
      x: number;
      y: number;
    };
    photoSrcs: string[];
  }
> = {
  residencial: {
    status: "inDevelopment",
    color: "#E1B19B",
    iconColor: "#C99580",
    iconSrc: "/final/residencial-logo.svg",
    marker: { x: 863, y: 743 },
    photoSrcs: [
      "/final/club-residencial.png",
      "/final/residencial.jpg",
      "/final/casa-flores.webp",
      "/final/padel.jpg",
    ],
  },
  farm: {
    status: "inDevelopment",
    color: "#DEBEBF",
    iconColor: "#C4A3A4",
    iconSrc: "/final/farm-logo.svg",
    marker: { x: 1554, y: 1208 },
    photoSrcs: [
      "/final/organic-farm.png",
      "/final/huerto.jpg",
      "/final/flores.png",
      "/final/invernadero.webp",
    ],
  },
  wellness: {
    status: "comingSoon",
    color: "#D7D7AA",
    iconColor: "#B5B588",
    iconSrc: "/final/wellness-logo.svg",
    marker: { x: 547, y: 390 },
    photoSrcs: [
      "/final/wellness-center.png",
      "/final/spa.jpg",
      "/final/wellness.webp",
      "/final/spa-2.png",
    ],
  },
  presa: {
    status: "comingSoon",
    color: "#C8D7E6",
    iconColor: "#8FC0DA",
    iconSrc: "/final/presa-logo.svg",
    marker: { x: 2360, y: 948 },
    photoSrcs: [
      "/final/presa-de-la-cantera.png",
      "/final/presa.jpg",
      "/final/agua.jpg",
      "/final/presa-2.jpg",
    ],
  },
};

const initialMapPhotoSrcs = [
  "/final/masterplan.jpeg",
  "/final/club-residencial.png",
  "/final/organic-farm.png",
  "/final/presa-de-la-cantera.png",
];

const overviewZoneShapes: Record<PropertyMapType, MapShape> = {
  farm: {
    type: "path",
    d: "M1838,956L1903,1561L1198,1568L1145,1767L902,1696C902,1696 1027.333,1374.833 1069,1276C1093.847,1217.063 1116.5,1146.333 1152,1103C1185.044,1062.665 1235.167,1038.833 1282,1016C1328.833,993.167 1398.278,975.056 1433,966",
  },
  presa: {
    type: "path",
    d: "M2485,1446L2818,1193L3174,1355L3274,1236L3512,1266L3421,1621L3186,1698C3186,1698 3188.833,1866.833 3164,1857C3139.167,1847.167 3078.167,1636.167 3037,1639C2995.833,1641.833 2992.058,1828.148 2917,1874C2834.333,1924.5 2541,1942 2541,1942L2485,1446Z",
    transform: "matrix(1.014606 0 0 1.00267 -685.799564 -488.185581)",
  },
  residencial: {
    type: "path",
    d: "M859,392C782.667,523.667 630,787 630,787L1129,1101L1281,992L977,720",
  },
  wellness: {
    type: "rect",
    x: 1068,
    y: 805,
    width: 407,
    height: 199,
    transform: "matrix(0.496702 -0.867922 0.867922 0.496702 -754.59548 1156.795485)",
  },
};

function resolvePhotos(srcs: string[], alts: string[]): ZonePhoto[] {
  return srcs.map((src, index) => ({
    src,
    alt: alts[index] ?? "",
  }));
}

export default function InteractivePropertyMap({ copy, properties }: InteractivePropertyMapProps) {
  const [activeMapType, setActiveMapType] = useState<PropertyMapType | null>(null);
  const [hoveredMapType, setHoveredMapType] = useState<PropertyMapType | null>(null);
  const [activeMapStage, setActiveMapStage] = useState<PropertyMapStage>("final");
  const shouldReduceMotion = useReducedMotion() ?? false;
  const {
    description,
    eyebrow,
    labels: panelLabels,
    masterplanTitle,
    statusLabels,
    title,
    viewLabel,
    zones,
  } = copy;

  const zoneProperties = useMemo(
    () =>
      overviewSectionOrder
        .map((mapType) => properties.find((property) => property.mapType === mapType))
        .filter((property): property is PropertyMapItem => Boolean(property)),
    [properties],
  );
  const mapStageOptions: { id: PropertyMapStage; label: string }[] = [
    { id: "stage1", label: panelLabels.stage1 },
    { id: "final", label: panelLabels.finalStage },
  ];
  const activeMeta = activeMapType ? sectionMeta[activeMapType] : null;
  const activeZone = activeMapType ? zones[activeMapType] : null;
  const initialMapPhotos = resolvePhotos(initialMapPhotoSrcs, copy.initialPhotoAlts);
  const activePhotos =
    activeMapType && activeZone
      ? resolvePhotos(sectionMeta[activeMapType].photoSrcs, activeZone.photoAlts).slice(0, 4)
      : [];

  const selectMapType = (mapType: PropertyMapType) => {
    setActiveMapType(mapType);
  };

  const closeActiveZone = () => {
    setActiveMapType(null);
    setHoveredMapType(null);
  };
  const panelMotion = shouldReduceMotion
    ? {
      initial: false as const,
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0 },
    }
    : {
      initial: { opacity: 0, x: -14 },
      animate: { opacity: 1, x: 0 },
      transition: {
        x: { duration: 0.32, ease: [0.23, 1, 0.32, 1] as const },
        opacity: { duration: 0.42, ease: "easeOut" },
      },
    };

  return (
    <section id="mapa-interactivo" className="scroll-mt-24 bg-[#EFE6DC] px-6 py-12 md:px-10 lg:px-14 lg:py-20">
      <div className="mx-auto max-w-[1404px]">
        <header className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <p
              className="mb-4 text-xs uppercase tracking-[0.3em] text-[#AA7D69] lg:mb-7"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {eyebrow}
            </p>
            <h2
              className="max-w-4xl leading-[1.02] tracking-normal text-[#222]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.75rem, 5vw, 4.75rem)",
              }}
            >
              {title}
            </h2>
          </div>
          <p
            className="max-w-[34rem] text-base leading-relaxed text-[#222]/68 md:text-lg lg:justify-self-end"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {description}
          </p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,960px)_400px] lg:items-stretch xl:grid-cols-[minmax(0,960px)_420px]">
          <div className="min-w-0">
            <div className="relative mx-auto overflow-hidden border border-[#1F1D1B]/10 bg-[#F7EFE6] shadow-[0_18px_38px_rgba(26,25,23,0.1)]">
              <svg
                viewBox={`0 ${MAP_VIEWBOX_Y} ${OVERVIEW_MAP_WIDTH} ${MAP_VIEWBOX_HEIGHT}`}
                role="group"
                aria-label={activeZone ? `${title}: ${activeZone.label}` : title}
                className="block aspect-[2878/1620] h-auto w-full select-none touch-pan-y"
              >
                <image
                  href={mapStageImageSrc[activeMapStage]}
                  width={OVERVIEW_MAP_WIDTH}
                  height={OVERVIEW_MAP_HEIGHT}
                  preserveAspectRatio="xMidYMid meet"
                />
                {zoneProperties.map((property) => {
                  const isActive = activeMapType === property.mapType;
                  const isHighlighted = isActive || hoveredMapType === property.mapType;

                  return (
                    <MapZoneShape
                      key={property.slug}
                      shape={overviewZoneShapes[property.mapType]}
                      label={`${viewLabel} ${zones[property.mapType].label}`}
                      color={sectionMeta[property.mapType].color}
                      active={isActive}
                      highlighted={isHighlighted}
                      onOpen={() => selectMapType(property.mapType)}
                      onHover={() => setHoveredMapType(property.mapType)}
                      onLeave={() => setHoveredMapType(null)}
                    />
                  );
                })}
                {zoneProperties.map((property) => {
                  const isActive = activeMapType === property.mapType;
                  const isHighlighted = isActive || hoveredMapType === property.mapType;

                  return (
                    <MapZoneMarker
                      key={`${property.slug}-marker`}
                      mapType={property.mapType}
                      label={`${viewLabel} ${zones[property.mapType].label}`}
                      active={isActive}
                      highlighted={isHighlighted}
                      onOpen={() => selectMapType(property.mapType)}
                      onHover={() => setHoveredMapType(property.mapType)}
                      onLeave={() => setHoveredMapType(null)}
                    />
                  );
                })}
              </svg>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {zoneProperties.map((property) => {
                const meta = sectionMeta[property.mapType];
                const selected = activeMapType === property.mapType;
                const mutedInStageOne =
                  activeMapStage === "stage1" && (property.mapType === "presa" || property.mapType === "wellness");

                return (
                  <button
                    type="button"
                    key={property.slug}
                    aria-pressed={selected}
                    onClick={() => selectMapType(property.mapType)}
                    onMouseEnter={() => setHoveredMapType(property.mapType)}
                    onMouseLeave={() => setHoveredMapType(null)}
                    onFocus={() => setHoveredMapType(property.mapType)}
                    onBlur={() => setHoveredMapType(null)}
                    className={`flex min-h-14 items-center justify-center gap-3 border px-3 py-3 text-center text-sm transition-[background-color,border-color,box-shadow,opacity] ${mutedInStageOne
                      ? selected
                        ? "opacity-70 hover:opacity-[0.85]"
                        : "opacity-50 hover:opacity-70"
                      : "opacity-100"
                      } ${selected
                      ? "border-[#222]/30 bg-[#F7EFE6] text-[#222] shadow-[0_10px_24px_rgba(47,39,33,0.06)]"
                      : "border-[#1F1D1B]/10 bg-transparent text-[#222]/70 hover:border-[#AA7D69]/45 hover:bg-[#F7EFE6]/70"
                      }`}
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: meta.iconColor }}
                      aria-hidden="true"
                    >
                      <Image
                        src={meta.iconSrc}
                        alt=""
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px] object-contain"
                      />
                    </span>
                    <span className="leading-tight">{zones[property.mapType].label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex justify-end">
              <div
                className="inline-grid w-full grid-cols-2 border border-[#1F1D1B]/10 bg-[#F7EFE6] p-1 sm:w-auto"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {mapStageOptions.map((option) => {
                  const selected = activeMapStage === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActiveMapStage(option.id)}
                      className={`min-h-10 px-4 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AA7D69] ${selected
                        ? "bg-[#222] text-[#FFF8ED]"
                        : "text-[#222]/58 hover:bg-[#EFE6DC] hover:text-[#222]"
                        }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="min-w-0 lg:h-full">
            <div className="relative flex h-full flex-col overflow-hidden border border-[#1F1D1B]/10 bg-[#F7EFE6] p-6 shadow-[0_16px_34px_rgba(47,39,33,0.07)] md:p-8 lg:min-h-[720px]">
              {activeMeta ? (
                <button
                  type="button"
                  aria-label={panelLabels.close}
                  onClick={closeActiveZone}
                  className="absolute right-5 top-6 z-10 flex h-6 w-6 items-center justify-center text-[#222]/55 transition-colors hover:text-[#AA7D69] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AA7D69] md:right-7 md:top-8"
                >
                  <X className="h-4 w-4" strokeWidth={1.7} />
                </button>
              ) : null}

              <motion.div
                key={activeMapType ?? "masterplan"}
                className="relative flex min-h-0 flex-1 flex-col"
                {...panelMotion}
              >
                {activeMeta ? (
                  <div
                    className="pointer-events-none absolute -right-5 -top-5 z-0 h-28 w-28"
                    style={{
                      backgroundColor: activeMeta.iconColor,
                      opacity: 0.24,
                      WebkitMaskImage: `url(${activeMeta.iconSrc})`,
                      WebkitMaskPosition: "center",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskImage: `url(${activeMeta.iconSrc})`,
                      maskPosition: "center",
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                    }}
                    aria-hidden="true"
                  />
                ) : null}
                {activeMeta && activeZone ? (
                  <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                    <div className="min-w-0 pr-10">
                      <ZoneStatusIndicator
                        status={activeMeta.status}
                        color={activeMeta.color}
                        labels={statusLabels}
                        reduceMotion={shouldReduceMotion}
                      />
                      <h3
                        className="mt-3 text-[#222] leading-none"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(1.9rem, 2.45vw, 2.55rem)",
                        }}
                      >
                        {activeZone.label}
                      </h3>
                    </div>

                    <p
                      className="mt-7 max-w-[34rem] text-base leading-relaxed text-[#222]/64"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {activeZone.summary}
                    </p>

                    <div className="mt-7">
                      <p
                        className="text-[11px] uppercase tracking-[0.24em] text-[#222]/55"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {panelLabels.amenities}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeZone.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="border border-[#1F1D1B]/10 bg-[#FFF8ED]/72 px-3 py-2 text-[12px] leading-none text-[#222]/70"
                            style={{ fontFamily: "var(--font-sans)" }}
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-8">
                      <p
                        className="text-[11px] uppercase tracking-[0.24em] text-[#222]/55"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {panelLabels.photos}
                      </p>
                      <PanelPhotoGrid photos={activePhotos} />
                    </div>
                  </div>
                ) : (
                  <>
                    <p
                      className="mb-3 text-xs uppercase tracking-[0.3em] text-[#AA7D69]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {panelLabels.masterplan}
                    </p>
                    <h3
                      className="text-[#222] leading-none"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.9rem, 2.45vw, 2.55rem)",
                      }}
                    >
                      {masterplanTitle}
                    </h3>
                    <p
                      className="mt-7 max-w-[34rem] text-base leading-relaxed text-[#222]/64"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {description}
                    </p>
                    <div className="mt-auto pt-8">
                      <p
                        className="text-[11px] uppercase tracking-[0.24em] text-[#222]/55"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {panelLabels.photos}
                      </p>
                      <PanelPhotoGrid photos={initialMapPhotos} />
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ZoneStatusIndicator({
  status,
  color,
  labels,
  reduceMotion,
  compact = false,
}: {
  status: PropertyZoneStatus;
  color: string;
  labels: Record<PropertyZoneStatus, string>;
  reduceMotion: boolean;
  compact?: boolean;
}) {
  const isActive = status === "inDevelopment";

  return (
    <span className={`inline-flex items-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <span
        className={`${compact ? "text-[9px] tracking-[0.14em]" : "text-[10px] tracking-[0.16em]"} font-bold uppercase text-[#222222]/50`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {labels[status]}
      </span>
      <span
        className={`${compact ? "h-1.5 w-1.5" : "h-2 w-2"} rounded-full ${isActive && !reduceMotion ? "animate-pulse" : ""}`}
        style={{
          backgroundColor: color,
          opacity: isActive ? 1 : 0.52,
          boxShadow: isActive
            ? `0 0 0 1px ${color}70, 0 0 6px ${color}35`
            : `inset 0 0 0 1px ${color}80`,
        }}
        aria-hidden="true"
      />
    </span>
  );
}

function MapZoneShape({
  shape,
  label,
  color,
  active,
  highlighted,
  onOpen,
  onHover,
  onLeave,
}: {
  shape: MapShape;
  label: string;
  color: string;
  active: boolean;
  highlighted: boolean;
  onOpen: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  const fillOpacity = active ? 0.42 : highlighted ? 0.18 : 0;
  const handleKeyDown = (event: KeyboardEvent<SVGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };
  const commonProps = {
    fill: color,
    fillOpacity,
    stroke: "none",
    pointerEvents: "all" as const,
    className: "cursor-pointer outline-none transition-opacity hover:opacity-100",
    focusable: false,
    role: "button",
    tabIndex: 0,
    "aria-label": label,
    "aria-pressed": active,
    onClick: onOpen,
    onMouseEnter: onHover,
    onMouseLeave: onLeave,
    onFocus: onHover,
    onBlur: onLeave,
    onKeyDown: handleKeyDown,
    style: active ? { filter: "drop-shadow(0 0 11px rgba(255, 248, 237, 0.85))" } : undefined,
  };

  if (shape.type === "rect") {
    return (
      <rect
        {...commonProps}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        transform={shape.transform}
      />
    );
  }

  return <path {...commonProps} d={shape.d} transform={shape.transform} />;
}

function MapZoneMarker({
  mapType,
  label,
  active,
  highlighted,
  onOpen,
  onHover,
  onLeave,
}: {
  mapType: PropertyMapType;
  label: string;
  active: boolean;
  highlighted: boolean;
  onOpen: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  const meta = sectionMeta[mapType];
  const haloOpacity = active ? 0.34 : highlighted ? 0.24 : 0.16;
  const iconSize = active ? 132 : 120;
  const logoSize = active ? 84 : 76;

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <g
      transform={`translate(${meta.marker.x} ${meta.marker.y})`}
      className="cursor-pointer outline-none"
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={active}
      onClick={onOpen}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onKeyDown={handleKeyDown}
    >
      <circle
        r={active ? 78 : 70}
        fill={meta.iconColor}
        opacity={haloOpacity}
        className="transition-opacity"
        pointerEvents="none"
      />
      <circle
        r={iconSize / 2}
        fill={meta.iconColor}
        pointerEvents="none"
        style={{
          filter: active
            ? "drop-shadow(0 14px 20px rgba(34, 34, 34, 0.22))"
            : "drop-shadow(0 10px 16px rgba(34, 34, 34, 0.16))",
        }}
      />
      <image
        href={meta.iconSrc}
        x={-logoSize / 2}
        y={-logoSize / 2}
        width={logoSize}
        height={logoSize}
        preserveAspectRatio="xMidYMid meet"
        pointerEvents="none"
        aria-hidden="true"
      />
    </g>
  );
}

function PanelPhotoGrid({ photos }: { photos: ZonePhoto[] }) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {photos.map((photo, index) => (
        <div
          key={`${photo.src}-${index}`}
          className={`relative overflow-hidden bg-[#FFF8ED] ${index === 0 ? "col-span-3 aspect-[16/9]" : "aspect-square"
            }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes={index === 0 ? "(max-width: 1024px) 100vw, 420px" : "140px"}
          />
        </div>
      ))}
    </div>
  );
}

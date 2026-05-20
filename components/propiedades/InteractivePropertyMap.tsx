"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { MAP_SECTION_IMAGE_SRC } from "@/lib/map-assets";
import { type PropertyCardData } from "./PropertyCard";

type PropertyMapType = "wellness" | "residencial" | "farm" | "presa";
type MapFeatureId = "padel-courts";

export type PropertyMapItem = PropertyCardData & {
  mapType: PropertyMapType;
  typeLabel: string;
  mapColor: string;
  panel: {
    kicker: string;
    description: string;
    typology: string;
    price: string;
    availability: string;
    amenities: string[];
    planLabel: string;
  };
  marker: {
    x: number;
    y: number;
  };
};

type InteractivePropertyMapProps = {
  eyebrow: string;
  title: string;
  description: string;
  viewLabel: string;
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

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 646;
const OVERVIEW_MAP_WIDTH = 2878;
const OVERVIEW_MAP_HEIGHT = 1858;
const OVERVIEW_MAP_CENTER_X = OVERVIEW_MAP_WIDTH / 2;
const OVERVIEW_MAP_CENTER_Y = OVERVIEW_MAP_HEIGHT / 2;
const DEFAULT_DETAIL_MAP_TYPE: PropertyMapType = "residencial";
const DETAIL_ZOOM_PADDING = 1.22;
const MAX_DETAIL_ZOOM = 3.4;
const MARKER_SCALE_X = OVERVIEW_MAP_WIDTH / MAP_WIDTH;
const MARKER_SCALE_Y = OVERVIEW_MAP_HEIGHT / MAP_HEIGHT;

type MapFeature = {
  id: MapFeatureId;
  label: string;
  color: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  details: Array<{
    label: string;
    value: string;
  }>;
  shape: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
  };
  marker: {
    x: number;
    y: number;
  };
};

const padelFeature: MapFeature = {
  id: "padel-courts",
  label: "Canchas de padel",
  color: "#7FB7C9",
  description:
    "Espacio deportivo integrado al recorrido residencial, pensado para partidos casuales, entrenamiento y convivencia activa cerca de las amenidades principales.",
  imageSrc: "/final/pickleball.png",
  imageAlt: "Cancha deportiva al aire libre en Don Diego",
  details: [
    { label: "Uso", value: "Deportivo" },
    { label: "Ambiente", value: "Exterior" },
    { label: "Acceso", value: "Residentes" },
  ],
  shape: {
    x: 286 * MARKER_SCALE_X,
    y: 210.5 * MARKER_SCALE_Y,
    width: 15 * MARKER_SCALE_X,
    height: 12 * MARKER_SCALE_Y,
    rotation: 30,
  },
  marker: {
    x: (286 + 15 / 2) * MARKER_SCALE_X,
    y: (210.5 + 12 / 2) * MARKER_SCALE_Y,
  },
};

const sectionFeaturesByMapType: Record<PropertyMapType, MapFeature[]> = {
  wellness: [],
  residencial: [padelFeature],
  farm: [],
  presa: [],
};

const sectionMeta: Record<
  PropertyMapType,
  {
    label: string;
    color: string;
  }
> = {
  residencial: {
    label: "Club Residencial",
    color: "#E1B19B",
  },
  farm: {
    label: "Organic Farm & Flowers",
    color: "#DEBEBF",
  },
  wellness: {
    label: "Wellness Center",
    color: "#D7D7AA",
  },
  presa: {
    label: "Presa de la Cantera",
    color: "#C8D7E6",
  },
};

const overviewSectionOrder: PropertyMapType[] = ["wellness", "residencial", "farm", "presa"];

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

const sectionZoomConfig: Record<
  PropertyMapType,
  {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    padding: number;
    maxZoom: number;
    offsetX: number;
    offsetY: number;
  }
> = {
  farm: {
    minX: 902,
    minY: 956,
    maxX: 1903,
    maxY: 1767,
    padding: 1.08,
    maxZoom: MAX_DETAIL_ZOOM,
    offsetX: 0,
    offsetY: 0,
  },
  presa: {
    minX: 1836,
    minY: 708,
    maxX: 2878,
    maxY: 1459,
    padding: 1.08,
    maxZoom: MAX_DETAIL_ZOOM,
    offsetX: 0,
    offsetY: 0,
  },
  residencial: {
    minX: 630,
    minY: 392,
    maxX: 1281,
    maxY: 1101,
    padding: 1,
    maxZoom: 5,
    offsetX: 0,
    offsetY: 100,
  },
  wellness: {
    minX: 475,
    minY: 276,
    maxX: 850,
    maxY: 728,
    padding: DETAIL_ZOOM_PADDING,
    maxZoom: MAX_DETAIL_ZOOM,
    offsetX: 0,
    offsetY: 160,
  },
};

export default function InteractivePropertyMap({
  eyebrow,
  title,
  description,
  viewLabel,
  properties,
}: InteractivePropertyMapProps) {
  const [activeMapType, setActiveMapType] = useState<PropertyMapType | null>(null);
  const [lastMapType, setLastMapType] = useState<PropertyMapType | null>(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState<MapFeatureId | null>(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const fallbackMapType = lastMapType ?? DEFAULT_DETAIL_MAP_TYPE;
  const activeProperty = useMemo(
    () => properties.find((property) => property.mapType === activeMapType) ?? null,
    [activeMapType, properties],
  );
  const activeSectionFeatures = useMemo(
    () => (activeMapType ? sectionFeaturesByMapType[activeMapType] : []),
    [activeMapType],
  );
  const selectedFeature = useMemo(
    () => activeSectionFeatures.find((feature) => feature.id === selectedFeatureId) ?? null,
    [activeSectionFeatures, selectedFeatureId],
  );
  const zoneProperties = useMemo(
    () =>
      overviewSectionOrder
        .map((mapType) => properties.find((property) => property.mapType === mapType))
        .filter((property): property is PropertyMapItem => Boolean(property)),
    [properties],
  );

  const panelLabels =
    viewLabel === "View"
      ? {
        masterplan: "Masterplan",
        typology: "Typology",
        price: "Price",
        availability: "Availability",
        amenities: "Amenities",
        close: "Close map panel",
        back: "Back to masterplan",
        zoomIn: "Open selected section",
        amenity: "Amenity",
      }
      : {
        masterplan: "Masterplan",
        typology: "Tipologia",
        price: "Precio",
        availability: "Disponibilidad",
        amenities: "Amenidades",
        close: "Cerrar panel del mapa",
        back: "Volver al masterplan",
        zoomIn: "Abrir seccion seleccionada",
        amenity: "Amenidad",
      };

  const openDetailView = (mapType: PropertyMapType | null) => {
    if (!mapType) return;
    setLastMapType(mapType);
    setActiveMapType(mapType);
    setSelectedFeatureId(null);
  };

  const closeDetailView = () => {
    setActiveMapType(null);
    setSelectedFeatureId(null);
  };

  const dismissSelectedFeature = () => {
    setSelectedFeatureId(null);
  };

  const mapTransform = useMemo(() => {
    if (!activeMapType) {
      return "translate(0px, 0px) scale(1)";
    }

    const config = sectionZoomConfig[activeMapType];
    const boundsWidth = config.maxX - config.minX;
    const boundsHeight = config.maxY - config.minY;
    const scale = Math.min(
      config.maxZoom,
      OVERVIEW_MAP_WIDTH / (boundsWidth * config.padding),
      OVERVIEW_MAP_HEIGHT / (boundsHeight * config.padding),
    );
    const centerX = config.minX + boundsWidth / 2;
    const centerY = config.minY + boundsHeight / 2;
    const translateX = OVERVIEW_MAP_CENTER_X - centerX * scale + config.offsetX;
    const translateY = OVERVIEW_MAP_CENTER_Y - centerY * scale + config.offsetY;

    return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }, [activeMapType]);

  return (
    <section id="mapa-interactivo" className="scroll-mt-24 bg-[#fff8ed] px-6 pt-8 pb-14 md:px-10 md:pt-12 md:pb-20 lg:px-14">
      <div className={`mx-auto ${isMapExpanded ? "max-w-none" : "max-w-[1500px]"}`}>
        <header className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end">
          <div>
            <p
              className="mb-3 text-[11px] uppercase tracking-[0.32em] text-[#AA7D69]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {eyebrow}
            </p>
            <h2
              className="max-w-4xl text-[#222] leading-[0.98]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.8rem, 7vw, 6.2rem)",
              }}
            >
              {title}
            </h2>
          </div>
          <p
            className="max-w-md text-[15px] leading-[1.75] text-[#222]/65 lg:justify-self-end"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {description}
          </p>
        </header>

        <div
          className={`mt-8 grid gap-6 lg:items-start ${isMapExpanded ? "lg:grid-cols-1" : "lg:grid-cols-[minmax(0,1fr)_420px]"
            }`}
        >
          <div className="min-w-0">
            <div className="relative overflow-hidden border border-[#E6D8C8] bg-[#fff8ed] shadow-[0_24px_80px_-60px_rgba(34,34,34,0.45)]">
              <svg
                viewBox={`0 0 ${OVERVIEW_MAP_WIDTH} ${OVERVIEW_MAP_HEIGHT}`}
                role="img"
                aria-label={
                  activeMapType
                    ? `${title}: ${sectionMeta[activeMapType].label}`
                    : title
                }
                className="block aspect-[2878/1858] h-auto w-full select-none touch-pan-y"
              >
                <g
                  className="[transition:transform_280ms_cubic-bezier(0.645,0.045,0.355,1)] motion-reduce:transition-none"
                  style={{
                    transform: mapTransform,
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    willChange: "transform",
                  }}
                >
                  <image
                    href={MAP_SECTION_IMAGE_SRC}
                    width={OVERVIEW_MAP_WIDTH}
                    height={OVERVIEW_MAP_HEIGHT}
                    preserveAspectRatio="xMidYMid meet"
                  />
                  {activeProperty ? (
                    <>
                      {selectedFeature ? (
                        <rect
                          width={OVERVIEW_MAP_WIDTH}
                          height={OVERVIEW_MAP_HEIGHT}
                          fill="#111111"
                          fillOpacity="0.06"
                          pointerEvents="none"
                        />
                      ) : null}
                      {activeSectionFeatures.map((feature) => {
                        const selected = feature.id === selectedFeatureId;
                        const centerX = feature.shape.x + feature.shape.width / 2;
                        const centerY = feature.shape.y + feature.shape.height / 2;
                        return (
                          <rect
                            key={feature.id}
                            x={feature.shape.x}
                            y={feature.shape.y}
                            width={feature.shape.width}
                            height={feature.shape.height}
                            fill={feature.color}
                            fillOpacity={selected ? 0.6 : 0.38}
                            stroke={selected ? "#FFF8ED" : undefined}
                            strokeWidth={selected ? 3 : undefined}
                            strokeOpacity={selected ? 0.95 : undefined}
                            vectorEffect="non-scaling-stroke"
                            transform={
                              feature.shape.rotation
                                ? `rotate(${feature.shape.rotation} ${centerX} ${centerY})`
                                : undefined
                            }
                            className="cursor-pointer transition-opacity hover:opacity-90"
                            focusable="false"
                            style={
                              selected
                                ? { filter: "drop-shadow(0 0 5px rgba(255, 248, 237, 0.9))" }
                                : undefined
                            }
                            aria-label={`${viewLabel} ${feature.label}`}
                            onClick={() => setSelectedFeatureId(feature.id)}
                          />
                        );
                      })}
                    </>
                  ) : (
                    zoneProperties.map((property) => (
                      <MapZoneShape
                        key={property.slug}
                        shape={overviewZoneShapes[property.mapType]}
                        label={`${viewLabel} ${sectionMeta[property.mapType].label}`}
                        onOpen={() => openDetailView(property.mapType)}
                      />
                    ))
                  )}
                </g>
              </svg>

              <div className="absolute right-4 top-4 overflow-hidden border border-[#E6D8C8] bg-[#fff8ed]/95 shadow-[0_14px_28px_-22px_rgba(34,34,34,0.45)]">
                <button
                  type="button"
                  aria-label={panelLabels.zoomIn}
                  onClick={() => openDetailView(fallbackMapType)}
                  disabled={!fallbackMapType || Boolean(activeProperty)}
                  className="flex h-11 w-11 items-center justify-center border-b border-[#E6D8C8] text-[#222] transition-colors hover:bg-[#f4eadb] disabled:cursor-not-allowed disabled:text-[#222]/25 disabled:hover:bg-transparent"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label={panelLabels.back}
                  onClick={closeDetailView}
                  disabled={!activeProperty}
                  className="flex h-11 w-11 items-center justify-center text-[#222] transition-colors hover:bg-[#f4eadb] disabled:cursor-not-allowed disabled:text-[#222]/25 disabled:hover:bg-transparent"
                >
                  <Minus className="h-5 w-5" />
                </button>
              </div>

              <button
                type="button"
                className="absolute bottom-4 right-4 hidden h-11 w-11 items-center justify-center border border-[#E6D8C8] bg-[#fff8ed]/95 text-[#222] shadow-[0_14px_28px_-22px_rgba(34,34,34,0.45)] transition-colors hover:bg-[#f4eadb] md:flex"
                aria-label={isMapExpanded ? "Collapse map" : "Expand map"}
                aria-pressed={isMapExpanded}
                onClick={() => setIsMapExpanded((current) => !current)}
              >
                {isMapExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
            </div>

            {!activeMapType || activeSectionFeatures.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {activeMapType
                  ? activeSectionFeatures.map((feature) => {
                    const selected = selectedFeatureId === feature.id;
                    return (
                      <button
                        type="button"
                        key={feature.id}
                        onClick={() =>
                          setSelectedFeatureId((current) => (current === feature.id ? null : feature.id))
                        }
                        className={`flex h-14 items-center justify-center gap-3 border px-4 text-sm transition-colors ${selected
                          ? "border-[#222] bg-[#fff8ed] text-[#222]"
                          : "border-[#E6D8C8] bg-transparent text-[#222]/70 hover:border-[#AA7D69]/45 hover:bg-[#fff8ed]/70"
                          }`}
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: feature.color }} />
                        {feature.label}
                      </button>
                    );
                  })
                  : zoneProperties.map((property) => (
                    <button
                      type="button"
                      key={property.slug}
                      onClick={() => openDetailView(property.mapType)}
                      onMouseEnter={() => setLastMapType(property.mapType)}
                      onFocus={() => setLastMapType(property.mapType)}
                      className="flex h-14 items-center justify-center gap-3 border border-[#E6D8C8] bg-transparent px-4 text-sm text-[#222]/70 transition-colors hover:border-[#AA7D69]/45 hover:bg-[#fff8ed]/70"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: sectionMeta[property.mapType].color }} />
                      {sectionMeta[property.mapType].label}
                    </button>
                  ))}
              </div>
            ) : null}
          </div>

          <aside className={`min-w-0 ${isMapExpanded ? "hidden" : ""}`}>
            <div className="relative border border-[#E6D8C8] bg-[#fff8ed] p-6 pt-12 shadow-[0_22px_60px_-48px_rgba(34,34,34,0.45)] md:p-8 md:pt-14">
              {selectedFeature ? (
                <>
                  <button
                    type="button"
                    aria-label={panelLabels.close}
                    onClick={dismissSelectedFeature}
                    className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center text-[#222]/80 transition-colors hover:text-[#AA7D69] md:right-6 md:top-6"
                  >
                    <X className="h-6 w-6" strokeWidth={1.5} />
                  </button>

                  <p
                    className="mb-3 text-[11px] uppercase tracking-[0.32em] text-[#AA7D69]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {panelLabels.amenity}
                  </p>
                  <h3
                    className="pr-10 text-[#222] leading-none"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.9rem, 2.45vw, 2.55rem)",
                    }}
                  >
                    {selectedFeature.label}
                  </h3>
                  <p
                    className="mt-7 max-w-[34rem] text-[15px] leading-[1.85] text-[#222]/58"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {selectedFeature.description}
                  </p>

                  <div className="mt-7 border-y border-[#E6D8C8]">
                    {selectedFeature.details.map((detail) => (
                      <div
                        key={detail.label}
                        className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] items-center gap-4 border-b border-[#E6D8C8] py-4 last:border-b-0"
                      >
                        <p
                          className="text-[11px] uppercase tracking-[0.24em] text-[#222]/55"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {detail.label}
                        </p>
                        <p
                          className="text-right text-[14px] leading-snug text-[#222]/78"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {detail.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-7 aspect-[2.3/1] overflow-hidden bg-[#fff8ed]">
                    <Image
                      src={selectedFeature.imageSrc}
                      alt={selectedFeature.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 420px"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p
                    className="mb-3 text-[11px] uppercase tracking-[0.32em] text-[#AA7D69]"
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
                    {activeMapType ? sectionMeta[activeMapType].label : "Don Diego Club Residencial"}
                  </h3>
                  <p
                    className="mt-7 max-w-[34rem] text-[15px] leading-[1.85] text-[#222]/58"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {description}
                  </p>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function MapZoneShape({
  shape,
  label,
  onOpen,
}: {
  shape: MapShape;
  label: string;
  onOpen: () => void;
}) {
  const commonProps = {
    fill: "transparent",
    stroke: "none",
    pointerEvents: "all" as const,
    vectorEffect: "non-scaling-stroke" as const,
    className: "cursor-pointer",
    focusable: false,
    "aria-label": label,
    onClick: onOpen,
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

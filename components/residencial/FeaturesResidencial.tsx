"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowUpRight, Bath, BedDouble, Car, Maximize2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ResidenceSpec = {
    superficie: string;
    recamaras: string;
    banos: string;
    estacionamientos: string;
};

type Residence = {
    id: number;
    slug: string;
    category: "departamentos" | "duplex";
    title: string;
    typeLabel: string;
    accent: string;
    accentSoft: string;
    description: string;
    mainImages?: string[];
    images: string[];
    specs: ResidenceSpec;
    highlights: string[];
};

const RESIDENCE_IMAGE_SIZES = "(min-width: 1280px) 680px, (min-width: 1024px) 52vw, 100vw";
const RESIDENCE_SPLIT_IMAGE_SIZES = "(min-width: 1280px) 340px, (min-width: 1024px) 26vw, 50vw";
const RESIDENCE_THUMB_IMAGE_SIZES = "(min-width: 1280px) 210px, (min-width: 1024px) 16vw, 33vw";
const CASA_DUPLEX_MAIN_IMAGES = ["/final/Casa Duplex Tipo 1-A (Planta) Mid-Century Transparent.png"];
const CASA_DUPLEX_RENDER_IMAGES = [
    "/final/3 Recamara Principal.png",
    "/final/6 Terraza.png",
    "/final/1 Sala Comedor y Cocina.png",
];

function ResidenceImageShowcase({
    mainImages,
    images,
    title,
    accent,
    accentSoft,
    t,
}: {
    mainImages?: string[];
    images: string[];
    title: string;
    accent: string;
    accentSoft: string;
    t: (key: string, values?: Record<string, string | number>) => string;
}) {
    const hasExplicitMainImages = Boolean(mainImages?.length);
    const resolvedMainImages = hasExplicitMainImages ? mainImages ?? [] : images.slice(0, 1);
    const primaryImage = resolvedMainImages[0];
    const splitMainImages = resolvedMainImages.length === 2 ? resolvedMainImages : null;
    const galleryImages = hasExplicitMainImages ? images.slice(0, 3) : images.slice(1, 4);
    const carouselImages = hasExplicitMainImages ? [...resolvedMainImages, ...images] : images;
    const containCarouselImageCount = hasExplicitMainImages ? resolvedMainImages.length : 0;

    if (!primaryImage) return null;

    return (
        <>
            <div className="lg:hidden">
                <ResidenceImageCarousel
                    images={carouselImages}
                    containImageCount={containCarouselImageCount}
                    title={title}
                    accent={accent}
                    accentSoft={accentSoft}
                    t={t}
                />
            </div>
            <div className="hidden min-w-0 lg:block">
                <div
                    className={`relative w-full overflow-hidden ${
                        hasExplicitMainImages ? "aspect-[1344/752]" : "aspect-[2/1]"
                    }`}
                >
                    {splitMainImages ? (
                        <div className="grid h-full w-full grid-cols-2 gap-px bg-[#EFE6DC]">
                            {splitMainImages.map((src, i) => (
                                <div key={`${i}-${src}`} className="relative min-w-0 overflow-hidden">
                                    <Image
                                        src={src}
                                        alt={t("imageAlt", { title, index: i + 1, total: splitMainImages.length })}
                                        fill
                                        className="object-contain"
                                        sizes={RESIDENCE_SPLIT_IMAGE_SIZES}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Image
                            src={primaryImage}
                            alt={title}
                            fill
                            className={hasExplicitMainImages ? "object-contain" : "object-cover"}
                            sizes={RESIDENCE_IMAGE_SIZES}
                        />
                    )}
                </div>
                {galleryImages.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-3">
                        {galleryImages.map((src, i) => (
                            <div key={`${i}-${src}`} className="relative aspect-[4/3] min-w-0 overflow-hidden">
                                <Image
                                    src={src}
                                    alt={t("imageAlt", { title, index: resolvedMainImages.length + i + 1, total: carouselImages.length })}
                                    fill
                                    className="object-cover"
                                    sizes={RESIDENCE_THUMB_IMAGE_SIZES}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

function ResidenceImageCarousel({
    images,
    containImageCount = 0,
    title,
    accent,
    accentSoft,
    t,
}: {
    images: string[];
    containImageCount?: number;
    title: string;
    accent: string;
    accentSoft: string;
    t: (key: string, values?: Record<string, string | number>) => string;
}) {
    const n = images.length;

    if (n === 1) {
        const shouldContainImage = containImageCount > 0;
        return (
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                    src={images[0]}
                    alt={title}
                    fill
                    className={shouldContainImage ? "object-contain" : "object-cover"}
                    sizes={RESIDENCE_IMAGE_SIZES}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
        );
    }

    return (
        <ResidenceImageCarouselEmbla
            images={images}
            containImageCount={containImageCount}
            title={title}
            accent={accent}
            accentSoft={accentSoft}
            t={t}
        />
    );
}

function ResidenceImageCarouselEmbla({
    images,
    containImageCount = 0,
    title,
    accent,
    accentSoft,
    t,
}: {
    images: string[];
    containImageCount?: number;
    title: string;
    accent: string;
    accentSoft: string;
    t: (key: string, values?: Record<string, string | number>) => string;
}) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const n = images.length;

    useEffect(() => {
        if (!api) return;
        const sync = () => setCurrent(api.selectedScrollSnap());
        sync();
        api.on("select", sync);
        api.on("reInit", sync);
        return () => {
            api.off("select", sync);
            api.off("reInit", sync);
        };
    }, [api]);

    return (
        <div className="w-full overflow-hidden">
            <Carousel
                setApi={setApi}
                opts={{ align: "start", loop: true }}
                className="group/carousel w-full overflow-hidden [&_[data-slot=carousel-content]]:h-full"
            >
                <CarouselContent className="-ml-0 aspect-[16/10] h-auto">
                    {images.map((src, i) => {
                        const shouldContainImage = i < containImageCount;
                        return (
                            <CarouselItem key={`${i}-${src}`} className="h-full basis-full pl-0">
                                <div className="relative h-full w-full">
                                    <Image
                                        src={src}
                                        alt={t("imageAlt", { title, index: i + 1, total: n })}
                                        fill
                                        className={shouldContainImage ? "object-contain" : "object-cover"}
                                        sizes={RESIDENCE_IMAGE_SIZES}
                                    />
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious
                    className="left-1 z-30 h-7 w-7 border border-[#f4e6db]/80 bg-[#f4e6db]/90 text-[#8d5639] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-[#f4e6db] disabled:text-[#8d5639]/35 disabled:bg-[#f4e6db]/70 opacity-100 active:!-translate-y-1/2 md:left-3 md:h-9 md:w-9 md:opacity-0 md:group-hover/carousel:opacity-100 md:pointer-events-none md:group-hover/carousel:pointer-events-auto"
                />
                <CarouselNext
                    className="right-1 z-30 h-7 w-7 border border-[#f4e6db]/80 bg-[#f4e6db]/90 text-[#8d5639] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-[#f4e6db] disabled:text-[#8d5639]/35 disabled:bg-[#f4e6db]/70 opacity-100 active:!-translate-y-1/2 md:right-3 md:h-9 md:w-9 md:opacity-0 md:group-hover/carousel:opacity-100 md:pointer-events-none md:group-hover/carousel:pointer-events-auto"
                />
                <div
                    className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2"
                    role="tablist"
                    aria-label={t("carouselAria", { title })}
                >
                    {images.map((src, i) => (
                        <button
                            key={`${i}-${src}`}
                            type="button"
                            role="tab"
                            aria-selected={i === current}
                            aria-label={t("carouselGoTo", { index: i + 1, total: n })}
                            onClick={() => api?.scrollTo(i)}
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                                width: i === current ? 22 : 8,
                                backgroundColor: i === current ? accent : accentSoft,
                                opacity: i === current ? 1 : 0.55,
                            }}
                        />
                    ))}
                </div>
            </Carousel>
        </div>
    );
}

function ResidenceDetailPanel({
    residence,
    labels,
    t,
}: {
    residence: Residence;
    labels: Record<keyof ResidenceSpec, string>;
    t: (key: string, values?: Record<string, string | number>) => string;
}) {
    const specItems: { key: keyof ResidenceSpec; Icon: typeof Maximize2 }[] = [
        { key: "superficie", Icon: Maximize2 },
        { key: "recamaras", Icon: BedDouble },
        { key: "banos", Icon: Bath },
        { key: "estacionamientos", Icon: Car },
    ];

    return (
        <div className="flex h-full min-h-0 min-w-0 flex-col" style={{ fontFamily: "var(--font-sans)" }}>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <dl className="order-1 grid grid-cols-2 gap-x-4 gap-y-4 border-b border-neutral-200/90 pb-6 text-[#0a0a0a] lg:order-2 lg:mt-0 lg:gap-x-5 lg:gap-y-4 lg:border-b-0 lg:border-t lg:pt-7 lg:pb-0">
                    {specItems.map(({ key, Icon }) => (
                        <div key={key} className="min-w-0">
                            <div className="flex min-w-0 items-start gap-2.5">
                                <Icon className="mt-0.5 size-4 shrink-0 text-[#b76d4b]" strokeWidth={1.75} aria-hidden />
                                <div className="min-w-0">
                                    <dt className="text-[9px] font-medium uppercase leading-snug tracking-[0.16em] text-neutral-500">
                                        {labels[key]}
                                    </dt>
                                    <dd className="mt-0.5 text-pretty text-[13px] font-medium leading-snug tracking-normal text-[#0a0a0a] tabular-nums">
                                        {residence.specs[key]}
                                    </dd>
                                </div>
                            </div>
                        </div>
                    ))}
                </dl>
                <p className="order-2 mt-6 max-w-none text-pretty text-[15px] leading-[1.7] text-neutral-600 md:text-[15.5px] md:leading-[1.72] lg:order-1 lg:mt-0">
                    {residence.description}
                </p>
                <div className="order-3 mt-7 flex flex-col gap-3.5">
                    {residence.highlights.map((highlight) => (
                        <div
                            key={highlight}
                            className="flex items-start gap-3 text-pretty text-[10.5px] font-medium uppercase leading-[1.55] tracking-[0.18em] text-neutral-700 sm:text-[11px]"
                        >
                            <span
                                className="mt-[0.35em] h-1.5 w-1.5 shrink-0 rounded-full border border-[#0a0a0a]"
                                style={{ backgroundColor: residence.accentSoft }}
                            />
                            {highlight}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex w-full shrink-0 justify-end pt-7">
                <Link
                    href="/propiedades#mapa-interactivo"
                    className="inline-flex items-center gap-1.5 border-b border-[#1F1D1B] pb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#1F1D1B] transition-opacity hover:opacity-60 lg:text-xs"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t("viewPropertyPage")}
                    <ArrowUpRight className="size-3.5 shrink-0 translate-y-px lg:size-4" aria-hidden />
                </Link>
            </div>
        </div>
    );
}

export default function FeaturesResidencial() {
    const t = useTranslations("pages.residencial.features");
    const [activeIndex, setActiveIndex] = useState(0);

    const labels: Record<keyof ResidenceSpec, string> = {
        superficie: t("labels.superficie"),
        recamaras: t("labels.recamaras"),
        banos: t("labels.banos"),
        estacionamientos: t("labels.estacionamientos"),
    };

    const typeLabel = (number: number) => t("typeLabel", { number });

    const residences: Residence[] = [
        {
            id: 1,
            slug: "departamentos-tipo-1",
            category: "departamentos",
            title: t("unitNames.departamento", { type: typeLabel(1) }),
            typeLabel: typeLabel(1),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.departamentos.description"),
            mainImages: CASA_DUPLEX_MAIN_IMAGES,
            images: CASA_DUPLEX_RENDER_IMAGES,
            specs: {
                superficie: "113 m2",
                recamaras: "2",
                banos: "2",
                estacionamientos: "2",
            },
            highlights: [
                t("residences.departamentos.highlights.1"),
                t("residences.departamentos.highlights.2"),
                t("residences.departamentos.highlights.3"),
            ],
        },
        {
            id: 2,
            slug: "departamentos-tipo-2",
            category: "departamentos",
            title: t("unitNames.departamento", { type: typeLabel(2) }),
            typeLabel: typeLabel(2),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.departamentos.description"),
            mainImages: CASA_DUPLEX_MAIN_IMAGES,
            images: CASA_DUPLEX_RENDER_IMAGES,
            specs: {
                superficie: "128 m2",
                recamaras: "2",
                banos: "2.5",
                estacionamientos: "2",
            },
            highlights: [
                t("residences.departamentos.highlights.1"),
                t("residences.departamentos.highlights.2"),
                t("residences.departamentos.highlights.3"),
            ],
        },
        {
            id: 3,
            slug: "departamentos-tipo-3",
            category: "departamentos",
            title: t("unitNames.departamento", { type: typeLabel(3) }),
            typeLabel: typeLabel(3),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.departamentos.description"),
            mainImages: CASA_DUPLEX_MAIN_IMAGES,
            images: CASA_DUPLEX_RENDER_IMAGES,
            specs: {
                superficie: "146 m2",
                recamaras: "3",
                banos: "3",
                estacionamientos: "2",
            },
            highlights: [
                t("residences.departamentos.highlights.1"),
                t("residences.departamentos.highlights.2"),
                t("residences.departamentos.highlights.3"),
            ],
        },
        {
            id: 4,
            slug: "departamentos-tipo-4",
            category: "departamentos",
            title: t("unitNames.departamento", { type: typeLabel(4) }),
            typeLabel: typeLabel(4),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.departamentos.description"),
            mainImages: CASA_DUPLEX_MAIN_IMAGES,
            images: CASA_DUPLEX_RENDER_IMAGES,
            specs: {
                superficie: "173 m2",
                recamaras: "3",
                banos: "3.5",
                estacionamientos: "2",
            },
            highlights: [
                t("residences.departamentos.highlights.1"),
                t("residences.departamentos.highlights.2"),
                t("residences.departamentos.highlights.3"),
            ],
        },
        {
            id: 5,
            slug: "duplex-tipo-1",
            category: "duplex",
            title: t("unitNames.duplex", { type: typeLabel(1) }),
            typeLabel: typeLabel(1),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.duplex1.description"),
            mainImages: CASA_DUPLEX_MAIN_IMAGES,
            images: CASA_DUPLEX_RENDER_IMAGES,
            specs: {
                superficie: "128 m2",
                recamaras: "2",
                banos: "2.5",
                estacionamientos: "2",
            },
            highlights: [
                t("residences.duplex1.highlights.1"),
                t("residences.duplex1.highlights.2"),
                t("residences.duplex1.highlights.3"),
            ],
        },
        {
            id: 6,
            slug: "duplex-tipo-2",
            category: "duplex",
            title: t("unitNames.duplex", { type: typeLabel(2) }),
            typeLabel: typeLabel(2),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.duplex2.description"),
            mainImages: CASA_DUPLEX_MAIN_IMAGES,
            images: CASA_DUPLEX_RENDER_IMAGES,
            specs: {
                superficie: "155 m2",
                recamaras: "3",
                banos: "3",
                estacionamientos: "2",
            },
            highlights: [
                t("residences.duplex2.highlights.1"),
                t("residences.duplex2.highlights.2"),
                t("residences.duplex2.highlights.3"),
            ],
        },
        {
            id: 7,
            slug: "duplex-tipo-3",
            category: "duplex",
            title: t("unitNames.duplex", { type: typeLabel(3) }),
            typeLabel: typeLabel(3),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.duplex3.description"),
            mainImages: CASA_DUPLEX_MAIN_IMAGES,
            images: CASA_DUPLEX_RENDER_IMAGES,
            specs: {
                superficie: "166 m2",
                recamaras: "3",
                banos: "3.5",
                estacionamientos: "2",
            },
            highlights: [
                t("residences.duplex3.highlights.1"),
                t("residences.duplex3.highlights.2"),
                t("residences.duplex3.highlights.3"),
            ],
        },
        {
            id: 8,
            slug: "duplex-tipo-4",
            category: "duplex",
            title: t("unitNames.duplex", { type: typeLabel(4) }),
            typeLabel: typeLabel(4),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.duplex3.description"),
            mainImages: CASA_DUPLEX_MAIN_IMAGES,
            images: CASA_DUPLEX_RENDER_IMAGES,
            specs: {
                superficie: "185 m2",
                recamaras: "4",
                banos: "4",
                estacionamientos: "2",
            },
            highlights: [
                t("residences.duplex3.highlights.1"),
                t("residences.duplex3.highlights.2"),
                t("residences.duplex3.highlights.3"),
            ],
        },
    ];

    const propertyGroups = [
        {
            id: "departamentos",
            title: t("groups.departamentos"),
            residences: residences.filter((residence) => residence.category === "departamentos"),
        },
        {
            id: "duplex",
            title: t("groups.duplex"),
            residences: residences.filter((residence) => residence.category === "duplex"),
        },
    ];

    const active = residences[activeIndex] ?? residences[0];

    return (
        <section className="relative bg-[#EFE6DC] px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-20">
                <div className="mx-auto min-w-0 max-w-[1280px]" style={{ fontFamily: "var(--font-sans)" }}>
                    <div className="grid min-w-0 grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)_minmax(0,300px)] lg:grid-rows-[minmax(6.5rem,auto)_minmax(30rem,auto)] lg:gap-x-0 lg:gap-y-0">
                        <nav
                            aria-label={t("propertyNavAria")}
                            className="grid min-w-0 gap-5 border-b border-[#3a3028]/10 pb-6 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-start lg:border-b-0 lg:pr-8 lg:pt-0"
                        >
                            {propertyGroups.map((group) => (
                                <div key={group.id} className="min-w-0">
                                    <h4
                                        id={`residence-group-${group.id}`}
                                        className="text-[11px] font-semibold uppercase leading-none tracking-[0.18em] text-[#8d5639] sm:text-xs"
                                    >
                                        {group.title}
                                    </h4>
                                    <div
                                        className="mt-3 grid min-w-0 grid-cols-4 gap-2 sm:gap-2.5 lg:grid-cols-1"
                                        aria-labelledby={`residence-group-${group.id}`}
                                    >
                                        {group.residences.map((residence) => {
                                            const residenceIndex = residences.findIndex((item) => item.id === residence.id);
                                            const isActive = residenceIndex === activeIndex;
                                            return (
                                                <button
                                                    key={residence.id}
                                                    type="button"
                                                    onClick={() => setActiveIndex(residenceIndex)}
                                                    aria-current={isActive ? "true" : undefined}
                                                    aria-label={`${group.title} ${residence.typeLabel}, ${residence.specs.superficie}`}
                                                    className={`min-w-0 rounded-[6px] border px-1.5 py-2 text-center transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b76d4b] active:scale-[0.98] sm:px-2.5 lg:px-2 lg:py-2.5 ${
                                                        isActive
                                                            ? "border-[#2f2721] bg-[#2f2721] text-[#fff7ef] shadow-[0_12px_24px_rgba(47,39,33,0.16)]"
                                                            : "border-[#3a3028]/15 bg-[#f7eee5]/60 text-[#2f2721]/75 hover:border-[#b76d4b]/40 hover:bg-[#fff8f1] hover:text-[#2f2721]"
                                                    }`}
                                                >
                                                    <span
                                                        className="block truncate text-[11px] font-semibold uppercase leading-none tracking-[0.12em] sm:text-xs"
                                                        style={{ fontFamily: "var(--font-sans)" }}
                                                    >
                                                        {residence.typeLabel}
                                                    </span>
                                                    <span
                                                        className={`mt-1.5 block truncate text-[11px] font-medium leading-none tabular-nums sm:text-xs ${
                                                            isActive ? "text-[#f1d6c8]" : "text-neutral-500"
                                                        }`}
                                                    >
                                                        {residence.specs.superficie}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </nav>

                        <div className="min-w-0 lg:contents">
                            <div className="mb-4 flex min-h-0 md:mb-5 lg:col-start-2 lg:row-start-1 lg:mb-0 lg:min-h-0 lg:items-end lg:pr-8 lg:pb-6">
                                <h2
                                    className="text-pretty text-[#2f2721] font-medium tracking-tight text-balance"
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "clamp(2rem, 4.85vw, 3.55rem)",
                                        lineHeight: 1.12,
                                    }}
                                >
                                    {active.title}
                                </h2>
                            </div>
                            <div
                                key={active.id}
                                className="relative w-full min-w-0 self-stretch lg:col-start-2 lg:row-start-2 lg:pr-8"
                            >
                                <ResidenceImageShowcase
                                    mainImages={active.mainImages}
                                    images={active.images}
                                    title={active.title}
                                    accent={active.accent}
                                    accentSoft={active.accentSoft}
                                    t={t}
                                />
                            </div>
                        </div>

                        <div className="flex min-h-[18rem] min-w-0 flex-col self-stretch md:min-h-[20rem] lg:col-start-3 lg:row-start-2 lg:min-h-0 lg:h-full lg:pl-8 lg:pt-0">
                            <ResidenceDetailPanel key={active.id} residence={active} labels={labels} t={t} />
                        </div>
                    </div>
                </div>
        </section>
    );
}

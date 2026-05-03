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
    title: string;
    accent: string;
    accentSoft: string;
    description: string;
    images: string[];
    specs: ResidenceSpec;
    highlights: string[];
};

const RESIDENCE_IMAGE_SIZES = "(min-width: 1280px) 680px, (min-width: 1024px) 52vw, 100vw";
const RESIDENCE_THUMB_IMAGE_SIZES = "(min-width: 1280px) 210px, (min-width: 1024px) 16vw, 33vw";

function ResidenceImageShowcase({
    images,
    title,
    accent,
    accentSoft,
    t,
}: {
    images: string[];
    title: string;
    accent: string;
    accentSoft: string;
    t: (key: string, values?: Record<string, string | number>) => string;
}) {
    const galleryImages = images.slice(1, 4);

    return (
        <>
            <div className="lg:hidden">
                <ResidenceImageCarousel images={images} title={title} accent={accent} accentSoft={accentSoft} t={t} />
            </div>
            <div className="hidden min-w-0 lg:block">
                <div className="relative aspect-[2/1] w-full overflow-hidden">
                    <Image src={images[0]} alt={title} fill className="object-cover" sizes={RESIDENCE_IMAGE_SIZES} />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
                </div>
                {galleryImages.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-3">
                        {galleryImages.map((src, i) => (
                            <div key={`${i}-${src}`} className="relative aspect-[4/3] min-w-0 overflow-hidden">
                                <Image
                                    src={src}
                                    alt={t("imageAlt", { title, index: i + 2, total: images.length })}
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
    title,
    accent,
    accentSoft,
    t,
}: {
    images: string[];
    title: string;
    accent: string;
    accentSoft: string;
    t: (key: string, values?: Record<string, string | number>) => string;
}) {
    const n = images.length;

    if (n === 1) {
        return (
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image src={images[0]} alt={title} fill className="object-cover" sizes={RESIDENCE_IMAGE_SIZES} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
        );
    }

    return <ResidenceImageCarouselEmbla images={images} title={title} accent={accent} accentSoft={accentSoft} t={t} />;
}

function ResidenceImageCarouselEmbla({
    images,
    title,
    accent,
    accentSoft,
    t,
}: {
    images: string[];
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
                    {images.map((src, i) => (
                        <CarouselItem key={`${i}-${src}`} className="h-full basis-full pl-0">
                            <div className="relative h-full w-full">
                                <Image
                                    src={src}
                                    alt={t("imageAlt", { title, index: i + 1, total: n })}
                                    fill
                                    className="object-cover"
                                    sizes={RESIDENCE_IMAGE_SIZES}
                                />
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-1 z-30 h-7 w-7 border border-[#f4e6db]/80 bg-[#f4e6db]/90 text-[#8d5639] opacity-100 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-[#f4e6db] disabled:bg-[#f4e6db]/70 disabled:text-[#8d5639]/35 active:!-translate-y-1/2 md:left-3 md:h-9 md:w-9 md:pointer-events-none md:opacity-0 md:group-hover/carousel:pointer-events-auto md:group-hover/carousel:opacity-100" />
                <CarouselNext className="right-1 z-30 h-7 w-7 border border-[#f4e6db]/80 bg-[#f4e6db]/90 text-[#8d5639] opacity-100 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-[#f4e6db] disabled:bg-[#f4e6db]/70 disabled:text-[#8d5639]/35 active:!-translate-y-1/2 md:right-3 md:h-9 md:w-9 md:pointer-events-none md:opacity-0 md:group-hover/carousel:pointer-events-auto md:group-hover/carousel:opacity-100" />
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
                    className="inline-flex items-center gap-1.5 border-b border-[#1F1D1B] pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#1F1D1B] transition-opacity hover:opacity-60 lg:text-[11px]"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t("viewPropertyPage")}
                    <ArrowUpRight className="size-3.5 shrink-0 translate-y-px lg:size-4" aria-hidden />
                </Link>
            </div>
        </div>
    );
}

export default function ResidencesShowcasePropiedades() {
    const t = useTranslations("pages.residencial.features");
    const [activeIndex, setActiveIndex] = useState(0);

    const labels: Record<keyof ResidenceSpec, string> = {
        superficie: t("labels.superficie"),
        recamaras: t("labels.recamaras"),
        banos: t("labels.banos"),
        estacionamientos: t("labels.estacionamientos"),
    };

    const residences: Residence[] = [
        {
            id: 1,
            title: t("residences.departamentos.title"),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.departamentos.description"),
            images: ["/residencias/departamentos.webp", "/babylon/duplex-1-rear.png", "/babylon/duplex-1-key-interior.png", "/babylon/duplex-1-primary-bedroom.png", "/babylon/duplex-1-primary-bath.png"],
            specs: {
                superficie: t("residences.departamentos.specs.superficie"),
                recamaras: t("residences.departamentos.specs.recamaras"),
                banos: t("residences.departamentos.specs.banos"),
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
            title: t("residences.duplex1.title"),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.duplex1.description"),
            images: ["/residencias/duplex-1.webp", "/babylon/duplex-1-rear.png", "/babylon/duplex-1-key-interior.png", "/babylon/duplex-1-primary-bedroom.png", "/babylon/duplex-1-primary-bath.png"],
            specs: {
                superficie: t("residences.duplex1.specs.superficie"),
                recamaras: t("residences.duplex1.specs.recamaras"),
                banos: t("residences.duplex1.specs.banos"),
                estacionamientos: "2",
            },
            highlights: [
                t("residences.duplex1.highlights.1"),
                t("residences.duplex1.highlights.2"),
                t("residences.duplex1.highlights.3"),
            ],
        },
        {
            id: 3,
            title: t("residences.duplex2.title"),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.duplex2.description"),
            images: ["/residencias/duplex-2.webp", "/babylon/duplex-1-rear.png", "/babylon/duplex-1-key-interior.png", "/babylon/duplex-1-primary-bedroom.png", "/babylon/duplex-1-primary-bath.png"],
            specs: {
                superficie: t("residences.duplex2.specs.superficie"),
                recamaras: t("residences.duplex2.specs.recamaras"),
                banos: t("residences.duplex2.specs.banos"),
                estacionamientos: "2",
            },
            highlights: [
                t("residences.duplex2.highlights.1"),
                t("residences.duplex2.highlights.2"),
                t("residences.duplex2.highlights.3"),
            ],
        },
        {
            id: 4,
            title: t("residences.duplex3.title"),
            accent: "#b76d4b",
            accentSoft: "#e7d2c6",
            description: t("residences.duplex3.description"),
            images: ["/residencias/duplex-3.webp", "/babylon/duplex-1-rear.png", "/babylon/duplex-1-key-interior.png", "/babylon/duplex-1-primary-bedroom.png", "/babylon/duplex-1-primary-bath.png"],
            specs: {
                superficie: t("residences.duplex3.specs.superficie"),
                recamaras: t("residences.duplex3.specs.recamaras"),
                banos: t("residences.duplex3.specs.banos"),
                estacionamientos: "2",
            },
            highlights: [
                t("residences.duplex3.highlights.1"),
                t("residences.duplex3.highlights.2"),
                t("residences.duplex3.highlights.3"),
            ],
        },
    ];

    const active = residences[activeIndex] ?? residences[0];

    return (
        <section className="relative bg-[#EFE6DC] px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-20">
            <div className="mx-auto min-w-0 max-w-[1280px]" style={{ fontFamily: "var(--font-sans)" }}>
                <div className="grid min-w-0 grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)_minmax(0,300px)] lg:grid-rows-[minmax(6.5rem,auto)_minmax(30rem,auto)] lg:gap-x-0 lg:gap-y-0">
                    <nav
                        aria-label={t("propertyNavAria")}
                        className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-3 border-b border-[#3a3028]/10 pb-5 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:flex lg:flex-col lg:gap-2.5 lg:self-start lg:border-b-0 lg:pr-8 lg:pt-0"
                    >
                        {residences.map((residence, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={residence.id}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    aria-current={isActive ? "true" : undefined}
                                    className={`min-w-0 border-b-2 px-0 py-2.5 text-left transition-colors lg:border-b-0 lg:border-l-2 lg:px-3 lg:py-2.5 lg:pl-4 ${
                                        isActive
                                            ? "border-[#2f2721] text-[#2f2721] lg:-ml-px"
                                            : "border-transparent text-neutral-500 hover:text-neutral-800"
                                    }`}
                                >
                                    <span
                                        className={`block text-pretty text-[0.92rem] leading-snug sm:text-base lg:inline ${
                                            isActive ? "font-medium" : "font-normal"
                                        }`}
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {residence.title}
                                    </span>
                                    <span className="mt-0.5 block text-[10px] font-normal normal-case tracking-normal text-neutral-500 lg:mt-1">
                                        ({residence.specs.superficie})
                                    </span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="min-w-0 lg:contents">
                        <div className="mb-4 flex min-h-0 md:mb-5 lg:col-start-2 lg:row-start-1 lg:mb-0 lg:min-h-0 lg:items-end lg:pr-8 lg:pb-6">
                            <h2
                                className="text-pretty text-balance font-medium tracking-tight text-[#2f2721]"
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
                                images={active.images}
                                title={active.title}
                                accent={active.accent}
                                accentSoft={active.accentSoft}
                                t={t}
                            />
                        </div>
                    </div>

                    <div className="flex min-h-[18rem] min-w-0 flex-col self-stretch md:min-h-[20rem] lg:col-start-3 lg:row-start-2 lg:h-full lg:min-h-0 lg:pl-8 lg:pt-0">
                        <ResidenceDetailPanel key={active.id} residence={active} labels={labels} t={t} />
                    </div>
                </div>
            </div>
        </section>
    );
}

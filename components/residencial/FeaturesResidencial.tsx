"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { VirtualStagingModal } from "@/components/virtual-staging/virtual-staging-modal";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

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

function ResidenceImageCarousel({
    images,
    title,
    accent,
    accentSoft,
    onVirtualStage,
    t,
}: {
    images: string[];
    title: string;
    accent: string;
    accentSoft: string;
    onVirtualStage: (imageUrl: string) => void;
    t: (key: string, values?: Record<string, string | number>) => string;
}) {
    const n = images.length;

    if (n === 1) {
        return (
            <div className="flex h-full min-h-0 w-full flex-col">
                <div className="relative min-h-0 w-full flex-1">
                    <Image
                        src={images[0]}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes={RESIDENCE_IMAGE_SIZES}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />
                </div>
                <div className="flex justify-end px-1 pt-2">
                    <Button
                        type="button"
                        size="sm"
                        className="h-auto rounded-none bg-transparent px-0 text-left text-[#222222] text-[10px] font-bold uppercase tracking-[0.15em] border-b border-[#222222] pb-1 shadow-none hover:opacity-60 transition-opacity hover:bg-transparent active:!translate-y-0 lg:text-[11px]"
                        onClick={() => onVirtualStage(images[0])}
                    >
                        {t("virtualStage")}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <ResidenceImageCarouselEmbla
            images={images}
            title={title}
            accent={accent}
            accentSoft={accentSoft}
            onVirtualStage={onVirtualStage}
            t={t}
        />
    );
}

function ResidenceImageCarouselEmbla({
    images,
    title,
    accent,
    accentSoft,
    onVirtualStage,
    t,
}: {
    images: string[];
    title: string;
    accent: string;
    accentSoft: string;
    onVirtualStage: (imageUrl: string) => void;
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
        <div className="flex h-full min-h-0 w-full flex-col">
            <Carousel
                setApi={setApi}
                opts={{ align: "start", loop: true }}
                className="group/carousel w-full min-h-0 flex-1 [&_[data-slot=carousel-content]]:h-full"
            >
                <CarouselContent className="-ml-0 h-full">
                    {images.map((src, i) => (
                        <CarouselItem key={`${i}-${src}`} className="h-full basis-full pl-0">
                            <div className="relative h-full min-h-[12rem] w-full">
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
            <div className="flex items-center justify-end pt-2">
                <Button
                    type="button"
                    size="sm"
                    className="h-auto rounded-none bg-transparent px-0 text-left text-[#222222] text-[10px] font-bold uppercase tracking-[0.15em] border-b-[#222222] pb-1 shadow-none hover:opacity-60 transition-opacity hover:bg-transparent active:!translate-y-0 lg:text-[10px]"
                    onClick={() => onVirtualStage(images[current] ?? images[0])}
                >
                    <Sparkles className="mr-1.5 size-3.5 sm:size-4" />
                    {t("virtualStage")}
                </Button>
            </div>
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
    return (
        <div className="flex min-w-0 flex-col" style={{ fontFamily: "var(--font-sans)" }}>
            <h3
                className="text-[#2f2721] font-medium tracking-normal"
                style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.35rem, 2.2vw, 2rem)",
                    lineHeight: 1.2,
                }}
            >
                {residence.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600 md:text-[15px]">{residence.description}</p>
            <div className="my-6 h-px w-full bg-neutral-200" />
            <dl className="space-y-2.5 text-[13px] text-neutral-800">
                {(Object.keys(labels) as (keyof ResidenceSpec)[]).map((key) => (
                    <div key={key} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                        <dt className="text-[11px] font-normal uppercase tracking-[0.12em] text-neutral-500">{labels[key]}</dt>
                        <dd className="text-right font-medium tabular-nums text-[#0a0a0a]">{residence.specs[key]}</dd>
                    </div>
                ))}
            </dl>
            <div className="mt-8 flex flex-col gap-3">
                {residence.highlights.map((highlight) => (
                    <div
                        key={highlight}
                        className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-700"
                    >
                        <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full border border-[#0a0a0a]"
                            style={{ backgroundColor: residence.accentSoft }}
                        />
                        {highlight}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function FeaturesResidencial() {
    const t = useTranslations("pages.residencial.features");
    const [virtualStagingOpen, setVirtualStagingOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [selectedPropertyImages, setSelectedPropertyImages] = useState<string[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);
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
                estacionamientos: t("residences.departamentos.specs.estacionamientos"),
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
                estacionamientos: t("residences.duplex1.specs.estacionamientos"),
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
                estacionamientos: t("residences.duplex2.specs.estacionamientos"),
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
                estacionamientos: t("residences.duplex3.specs.estacionamientos"),
            },
            highlights: [
                t("residences.duplex3.highlights.1"),
                t("residences.duplex3.highlights.2"),
                t("residences.duplex3.highlights.3"),
            ],
        },
    ];

    const active = residences[activeIndex] ?? residences[0];

    const openVirtualStage = (imageUrl: string, residence: Residence) => {
        setSelectedImageUrl(imageUrl);
        setSelectedPropertyImages(residence.images);
        setSelectedResidence(residence);
        setSelectedImageIndex(Math.max(0, residence.images.findIndex((img) => img === imageUrl)));
        setVirtualStagingOpen(true);
    };

    return (
        <>
            <section className="relative bg-[#fff8ed] px-6 pt-10 pb-24 md:px-10 md:py-32 lg:px-16 lg:py-20">
                <div className="mx-auto min-w-0 max-w-[1280px]" style={{ fontFamily: "var(--font-sans)" }}>
                    <div className="grid min-w-0 grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)_minmax(0,280px)] lg:grid-rows-[auto_minmax(22rem,auto)] lg:gap-x-0 lg:gap-y-10">
                        {/* Section title — first on mobile; desktop row above columns */}
                        <header className="min-w-0 border-b border-[#3a3028]/10 pb-6 text-center lg:col-span-3 lg:row-start-1 lg:border-b lg:pb-10 lg:text-left">
                            <div className="mx-auto h-px w-12 bg-[#3a3028]/20 lg:mx-0" />
                            <p
                                className="mt-5 text-[10px] tracking-[0.3em] text-[#b76d4b]/85 uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("kicker")}
                            </p>
                            <motion.h2
                                className="mt-5 max-w-full text-pretty break-words text-center font-light leading-[1.05] tracking-tight text-[#2f2721] lg:max-w-4xl lg:text-left"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
                                }}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                {t("titleLine1")}{" "}
                                <span className="italic text-[#b76d4b]">{t("titleAccent")}</span>
                                <br />
                                {t("titleLine2")}
                            </motion.h2>
                        </header>

                        {/* Property types — below title on mobile; left column on desktop */}
                        <nav
                            aria-label={t("propertyNavAria")}
                            className="flex min-w-0 flex-row gap-2.5 overflow-x-auto border-b border-[#3a3028]/10 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:col-start-1 lg:row-start-2 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:pr-8 lg:pt-2 [&::-webkit-scrollbar]:hidden"
                        >
                            {residences.map((residence, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <button
                                        key={residence.id}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        aria-current={isActive ? "true" : undefined}
                                        className={`shrink-0 whitespace-nowrap border-b-2 px-0 py-2 text-left transition-colors lg:whitespace-normal lg:border-b-0 lg:border-l-2 lg:px-3 lg:py-2.5 lg:pl-4 ${
                                            isActive
                                                ? "border-[#2f2721] text-[#2f2721] lg:-ml-px"
                                                : "border-transparent text-neutral-500 hover:text-neutral-800"
                                        }`}
                                    >
                                        <span
                                            className={`block text-[0.95rem] leading-snug sm:text-base lg:inline ${
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

                        {/* Image carousel — center */}
                        <div className="min-w-0 lg:col-start-2 lg:row-start-2 lg:border-r lg:border-[#3a3028]/10 lg:pr-8 lg:pt-2">
                            <div
                                key={active.id}
                                className="relative aspect-[4/5] w-full min-w-0 overflow-hidden bg-[#f4ebe0]/60 md:aspect-[16/10] lg:aspect-[5/4] lg:max-h-[min(72vh,640px)]"
                            >
                                <div className="absolute inset-0 z-0 min-h-0">
                                    <ResidenceImageCarousel
                                        images={active.images}
                                        title={active.title}
                                        accent={active.accent}
                                        accentSoft={active.accentSoft}
                                        onVirtualStage={(url) => openVirtualStage(url, active)}
                                        t={t}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Details — right */}
                        <div className="min-w-0 lg:col-start-3 lg:row-start-2 lg:pl-2 lg:pt-2">
                            <ResidenceDetailPanel key={active.id} residence={active} labels={labels} t={t} />
                        </div>
                    </div>
                </div>
            </section>
            {selectedImageUrl && (
                <VirtualStagingModal
                    open={virtualStagingOpen}
                    onOpenChange={setVirtualStagingOpen}
                    preloadedImageUrl={selectedImageUrl}
                    propertyImages={selectedPropertyImages}
                    propertyName={selectedResidence?.title}
                    propertyId={1}
                    imageIndex={selectedImageIndex}
                />
            )}
        </>
    );
}

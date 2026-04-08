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
                <div className="relative min-h-0 w-full flex-1 border border-[#b76d4b]/20">
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
                        className="h-8 border-[#b76d4b]/80 bg-[#b76d4b] px-3 text-[11px] font-semibold text-white shadow-md hover:bg-[#9f5a3b] sm:h-9 sm:px-4 sm:text-[12px]"
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
                            <div className="relative h-full min-h-[12rem] w-full border border-[#b76d4b]/20">
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
                    className="left-1 z-30 h-7 w-7 border border-[#f4e6db]/80 bg-[#f4e6db]/90 text-[#8d5639] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-[#f4e6db] disabled:text-[#8d5639]/35 disabled:bg-[#f4e6db]/70 opacity-100 md:left-3 md:h-9 md:w-9 md:opacity-0 md:group-hover/carousel:opacity-100 md:pointer-events-none md:group-hover/carousel:pointer-events-auto"
                />
                <CarouselNext
                    className="right-1 z-30 h-7 w-7 border border-[#f4e6db]/80 bg-[#f4e6db]/90 text-[#8d5639] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-[#f4e6db] disabled:text-[#8d5639]/35 disabled:bg-[#f4e6db]/70 opacity-100 md:right-3 md:h-9 md:w-9 md:opacity-0 md:group-hover/carousel:opacity-100 md:pointer-events-none md:group-hover/carousel:pointer-events-auto"
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
            <div className="flex items-center justify-end py-2">
                <Button
                    type="button"
                    size="sm"
                    className="h-8 rounded-none border-[#b76d4b]/80 bg-[#b76d4b] px-3 text-[11px] font-semibold text-white shadow-md hover:bg-[#9f5a3b] sm:h-9 sm:px-4 sm:text-[12px]"
                    onClick={() => onVirtualStage(images[current] ?? images[0])}
                >
                    <Sparkles className="mr-1.5 size-3.5 sm:size-4" />
                    {t("virtualStage")}
                </Button>
            </div>
        </div>
    );
}

function EditorialFeatureRow({
    residence,
    reverse,
    onVirtualStage,
    labels,
    t,
}: {
    residence: Residence;
    reverse: boolean;
    onVirtualStage: (imageUrl: string) => void;
    labels: Record<keyof ResidenceSpec, string>;
    t: (key: string, values?: Record<string, string | number>) => string;
}) {
    return (
        <article
            className={`grid grid-cols-1 items-start gap-y-8 lg:items-center lg:gap-x-12 xl:gap-x-14 ${
                reverse
                    ? "lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.8fr)] xl:grid-cols-[minmax(0,1.22fr)_minmax(320px,0.78fr)]"
                    : "lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.45fr)] xl:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.22fr)]"
            }`}
        >
            <div className={`order-2 min-w-0 ${reverse ? "lg:order-1" : "lg:order-0"}`}>
                <div className="mx-auto flex w-full max-w-md flex-col items-start lg:max-w-lg">
                    <h3
                        className="mt-1 text-[#3a3028]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 3vw, 3.4rem)",
                            lineHeight: 0.95,
                        }}
                    >
                        {residence.title}
                    </h3>
                    <p
                        className="mt-5 max-w-xs text-sm leading-7 text-[#62564a] md:max-w-md md:text-[15px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {residence.description}
                    </p>
                    <div className="mt-7 w-full max-w-sm">
                        <div className="mb-4 h-px w-14" style={{ backgroundColor: residence.accentSoft }} />
                        <dl
                            className="grid grid-cols-[minmax(0,auto)_1fr] gap-x-4 gap-y-2.5 border-b border-[#3a3028]/10 pb-5"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {(Object.keys(labels) as (keyof ResidenceSpec)[]).map((key) => (
                                <div key={key} className="contents">
                                    <dt className="text-[9px] uppercase tracking-[0.22em] text-[#62564a]/90">{labels[key]}</dt>
                                    <dd className="text-right text-[13px] font-medium tabular-nums text-[#3a3028]">
                                        {residence.specs[key]}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <div className="mt-5 flex flex-col gap-3" style={{ fontFamily: "var(--font-sans)" }}>
                            {residence.highlights.map((highlight) => (
                                <div
                                    key={highlight}
                                    className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em]"
                                    style={{ color: residence.accent }}
                                >
                                    <span
                                        className="h-2 w-2 shrink-0 rounded-full border"
                                        style={{
                                            backgroundColor: residence.accentSoft,
                                            borderColor: residence.accent,
                                        }}
                                    />
                                    {highlight}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-1 min-w-0 lg:order-0">
                <div
                    className={`group relative aspect-[4/5] w-full max-w-[820px] overflow-hidden md:aspect-[16/10] lg:max-w-[740px] xl:max-w-[760px] ${
                        reverse ? "mx-auto lg:mr-auto lg:ml-0" : "mx-auto lg:ml-auto lg:mr-0"
                    }`}
                >
                    <div className="absolute inset-0 z-0 min-h-0">
                        <ResidenceImageCarousel
                            images={residence.images}
                            title={residence.title}
                            accent={residence.accent}
                            accentSoft={residence.accentSoft}
                            onVirtualStage={onVirtualStage}
                            t={t}
                        />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1" style={{ backgroundColor: residence.accent }} />
                </div>
            </div>
        </article>
    );
}

export default function FeaturesResidencial() {
    const t = useTranslations("pages.residencial.features");
    const [virtualStagingOpen, setVirtualStagingOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [selectedPropertyImages, setSelectedPropertyImages] = useState<string[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);

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

    return (
        <>
            <section className="relative bg-[#EFE6DC] px-6 pt-10 pb-24 md:px-10 md:py-32 lg:px-16 lg:py-20">
                <div className="mx-auto max-w-[1280px]">
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#b76d4b]/85 uppercase"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("kicker")}
                    </p>
                    <motion.h2
                        className="mt-5 max-w-4xl text-left font-light leading-[1.05] tracking-tight text-[#2f2721]"
                        style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.75rem, 6vw, 5.5rem)" }}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        {t("titleLine1")} <span className="italic text-[#b76d4b]">{t("titleAccent")}</span><br />
                        {t("titleLine2")}
                    </motion.h2>

                    <div className="mt-8 space-y-18 md:mt-20 md:space-y-20">
                        {residences.map((residence, index) => (
                            <EditorialFeatureRow
                                key={residence.id}
                                residence={residence}
                                reverse={index % 2 === 1}
                                labels={labels}
                                t={t}
                                onVirtualStage={(imageUrl) => {
                                    setSelectedImageUrl(imageUrl);
                                    setSelectedPropertyImages(residence.images);
                                    setSelectedResidence(residence);
                                    setSelectedImageIndex(
                                        Math.max(
                                            0,
                                            residence.images.findIndex((img) => img === imageUrl),
                                        ),
                                    );
                                    setVirtualStagingOpen(true);
                                }}
                            />
                        ))}
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

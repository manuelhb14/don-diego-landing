"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { VirtualStagingModal } from "@/components/virtual-staging/virtual-staging-modal";
import { EyeIcon } from "lucide-react";

/** Ficha técnica homogénea por tipología (referencia proyecto / fichas tipo). */
const SPEC_LABELS = {
    superficie: "Superficie construida",
    recamaras: "Recámaras",
    banos: "Baños",
    estacionamientos: "Estacionamiento",
} as const;

type ResidenceSpec = {
    superficie: string;
    recamaras: string;
    banos: string;
    estacionamientos: string;
};

const residences: {
    id: number;
    title: string;
    accent: string;
    accentSoft: string;
    description: string;
    /** First image is the default; add more paths as assets become available. */
    images: string[];
    specs: ResidenceSpec;
    highlights: string[];
}[] = [
    {
        id: 1,
        title: "Departamentos",
        accent: "#b76d4b",
        accentSoft: "#e7d2c6",
        description:
            "Bloques alrededor del complejo habitacional: estacionamiento techado y bodegas a desnivel forman un circuito que mantiene las calles interiores libres de tránsito vehicular. Cuatro departamentos por nivel con terrazas y azoteas aprovechables.",
        // images: ["/residencias/departamentos.webp", "/babylon/departamentos-1-rear.png", "/babylon/departamentos-1-key-interior.png", "/babylon/departamentos-1-primary-bedroom.png", "/babylon/departamentos-1-primary-bath.png"],
        images: ["/residencias/departamentos.webp", "/babylon/duplex-1-rear.png", "/babylon/duplex-1-key-interior.png", "/babylon/duplex-1-primary-bedroom.png", "/babylon/duplex-1-primary-bath.png"],
        specs: {
            superficie: "113–173 m² (según prototipo)",
            recamaras: "2–3",
            banos: "2–3",
            estacionamientos: "2 cajones por unidad",
        },
        highlights: ["Calles 100 % peatonales", "Terrazas y azoteas", "Estacionamiento a desnivel"],
    },
    {
        id: 2,
        title: "Casas dúplex Tipo 1",
        accent: "#b76d4b",
        accentSoft: "#e7d2c6",
        description:
            "Una vivienda por nivel, cada una con terraza o patio interior y vínculo claro con el exterior. Posibilidad de rentar una recámara de forma independiente.",
        images: ["/residencias/duplex-1.webp", "/babylon/duplex-1-rear.png", "/babylon/duplex-1-key-interior.png", "/babylon/duplex-1-primary-bedroom.png", "/babylon/duplex-1-primary-bath.png"],
        specs: {
            superficie: "128–155 m²",
            recamaras: "2–3",
            banos: "2–3",
            estacionamientos: "2 cajones por unidad",
        },
        highlights: ["Una casa por nivel", "Terraza o patio interior", "Recámara independiente (opcional)"],
    },
    {
        id: 3,
        title: "Casas dúplex Tipo 2",
        accent: "#b76d4b",
        accentSoft: "#e7d2c6",
        description:
            "Viviendas en torno a un patio interior, una casa por nivel. El Tipo 2 conecta las calles peatonales a través del primer nivel. Jacuzzi en prototipos seleccionados.",
        // images: ["/residencias/duplex-2.webp", "/babylon/duplex-2-rear.png", "/babylon/duplex-2-key-interior.png", "/babylon/duplex-2-primary-bedroom.png", "/babylon/duplex-2-primary-bath.png"],
        images: ["/residencias/duplex-2.webp", "/babylon/duplex-1-rear.png", "/babylon/duplex-1-key-interior.png", "/babylon/duplex-1-primary-bedroom.png", "/babylon/duplex-1-primary-bath.png"],
        specs: {
            superficie: "166–185 m²",
            recamaras: "2–4",
            banos: "3–4",
            estacionamientos: "2 cajones por unidad",
        },
        highlights: ["Patio interior", "Calles peatonales en planta baja", "Jacuzzi en selección"],
    },
    {
        id: 4,
        title: "Casas dúplex Tipo 3",
        accent: "#b76d4b",
        accentSoft: "#e7d2c6",
        description:
            "Patio central con una vivienda por nivel; distribuciones con varias terrazas y, en prototipos tipo B, sala de estar. Posibilidad de rentar una recámara de forma independiente.",
        // images: ["/residencias/duplex-3.webp", "/babylon/duplex-3-rear.png", "/babylon/duplex-3-key-interior.png", "/babylon/duplex-3-primary-bedroom.png", "/babylon/duplex-3-primary-bath.png"],
        images: ["/residencias/duplex-3.webp", "/babylon/duplex-1-rear.png", "/babylon/duplex-1-key-interior.png", "/babylon/duplex-1-primary-bedroom.png", "/babylon/duplex-1-primary-bath.png"],
        specs: {
            superficie: "142–181 m² (según prototipo)",
            recamaras: "2–3",
            banos: "2–3",
            estacionamientos: "2 cajones por unidad",
        },
        highlights: ["Patio interior", "Varias terrazas", "Sala de estar (prototipo B)"],
    },
];

const RESIDENCE_IMAGE_SIZES = "(min-width: 1280px) 680px, (min-width: 1024px) 52vw, 100vw";

function ResidenceImageCarousel({
    images,
    title,
    accent,
    accentSoft,
    onVirtualStage,
}: {
    images: string[];
    title: string;
    accent: string;
    accentSoft: string;
    onVirtualStage: (imageUrl: string) => void;
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
                        size="xs"
                        className="h-7 border-transparent bg-[#f4e6db] px-3 text-[11px] text-[#8d5639] shadow-sm hover:bg-[#edd7c8]"
                        onClick={() => onVirtualStage(images[0])}
                    >
                        Visualiza este espacio amueblado
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
        />
    );
}

function ResidenceImageCarouselEmbla({
    images,
    title,
    accent,
    accentSoft,
    onVirtualStage,
}: {
    images: string[];
    title: string;
    accent: string;
    accentSoft: string;
    onVirtualStage: (imageUrl: string) => void;
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
                className="w-full min-h-0 flex-1 [&_[data-slot=carousel-content]]:h-full"
            >
                <CarouselContent className="-ml-0 h-full">
                    {images.map((src, i) => (
                        <CarouselItem key={`${i}-${src}`} className="h-full basis-full pl-0">
                            <div className="relative h-full min-h-[12rem] w-full border border-[#b76d4b]/20">
                                <Image
                                    src={src}
                                    alt={`${title} — ${i + 1} / ${n}`}
                                    fill
                                    className="object-cover"
                                    sizes={RESIDENCE_IMAGE_SIZES}
                                />
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious
                variant="outline"
                className="top-1/2 left-2 z-20 -translate-y-1/2 border-[#3a3028]/20 bg-[#fff8ed]/95 text-[#3a3028] shadow-sm hover:bg-white md:left-3 md:opacity-0 md:group-hover:opacity-100"
            />
            <CarouselNext
                variant="outline"
                className="top-1/2 right-2 z-20 -translate-y-1/2 border-[#3a3028]/20 bg-[#fff8ed]/95 text-[#3a3028] shadow-sm hover:bg-white md:right-3 md:opacity-0 md:group-hover:opacity-100"
            /> */}
            <div
                className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2"
                role="tablist"
                aria-label={`Carrusel de ${title}`}
            >
                {images.map((src, i) => (
                    <button
                        key={`${i}-${src}`}
                        type="button"
                        role="tab"
                        aria-selected={i === current}
                        aria-label={`Ir a imagen ${i + 1} de ${n}`}
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
                    size="xs"
                    className="h-7 rounded-none border-transparent bg-[#f4e6db] px-3 text-[11px] text-[#8d5639] shadow-sm hover:bg-[#edd7c8]"
                    onClick={() => onVirtualStage(images[current] ?? images[0])}
                >
                    <EyeIcon className="size-3.5 mr-1" />
                    Visualiza este espacio amueblado
                </Button>
            </div>
        </div>
    );
}

function EditorialFeatureRow({
    residence,
    reverse,
    onVirtualStage,
}: {
    residence: (typeof residences)[number];
    reverse: boolean;
    onVirtualStage: (imageUrl: string) => void;
}) {
    return (
        <article
            className={`grid grid-cols-1 items-start gap-y-8 lg:items-center lg:gap-x-12 xl:gap-x-14 ${
                reverse
                    ? "lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.8fr)] xl:grid-cols-[minmax(0,1.22fr)_minmax(320px,0.78fr)]"
                    : "lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.45fr)] xl:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.22fr)]"
            }`}
        >
            <div
                className={`order-2 min-w-0 ${reverse ? "lg:order-1" : "lg:order-0"}`}
            >
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
                            {(Object.entries(SPEC_LABELS) as [keyof typeof SPEC_LABELS, string][]).map(([key, label]) => (
                                <div key={key} className="contents">
                                    <dt className="text-[9px] uppercase tracking-[0.22em] text-[#62564a]/90">{label}</dt>
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
                    className={`group relative aspect-[16/10] w-full max-w-[820px] overflow-hidden lg:max-w-[740px] xl:max-w-[760px] ${
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
                        />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1" style={{ backgroundColor: residence.accent }} />
                </div>
            </div>
        </article>
    );
}

export default function FeaturesResidencial() {
    const [virtualStagingOpen, setVirtualStagingOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [selectedPropertyImages, setSelectedPropertyImages] = useState<string[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedResidence, setSelectedResidence] = useState<(typeof residences)[number] | null>(null);

    return (
        <>
        <section className="relative bg-[#EFE6DC] px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-20">
            <div className="mx-auto max-w-[1280px]">
                <p
                    className="text-[10px] tracking-[0.3em] text-[#b76d4b]/85 uppercase"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    [TIPOLOGÍA]
                </p>
                <motion.h2
                    className="mt-5 max-w-4xl text-left font-light leading-[1.05] tracking-tight text-[#2f2721]"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.75rem, 6vw, 5.5rem)" }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    Descubre los <span className="italic text-[#b76d4b]">espacios</span><br />
                    que ofrecemos.
                </motion.h2>

                <div className="mt-8 space-y-18 md:mt-20 md:space-y-20">
                    {residences.map((residence, index) => (
                        <EditorialFeatureRow
                            key={residence.id}
                            residence={residence}
                            reverse={index % 2 === 1}
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

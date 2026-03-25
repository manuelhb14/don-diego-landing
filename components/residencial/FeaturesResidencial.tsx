"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        images: ["/residencias/departamentos.webp"],
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
        images: ["/residencias/duplex-1.webp"],
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
        images: ["/residencias/duplex-2.webp"],
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
        images: ["/residencias/duplex-3.webp"],
        specs: {
            superficie: "142–181 m² (según prototipo)",
            recamaras: "2–3",
            banos: "2–3",
            estacionamientos: "2 cajones por unidad",
        },
        highlights: ["Patio interior", "Varias terrazas", "Sala de estar (prototipo B)"],
    },
];

function ResidenceImageCarousel({
    images,
    title,
    accent,
    accentSoft,
}: {
    images: string[];
    title: string;
    accent: string;
    accentSoft: string;
}) {
    const [index, setIndex] = useState(0);
    const n = images.length;
    const goPrev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);
    const goNext = useCallback(() => setIndex((i) => (i + 1) % n), [n]);

    return (
        <div className="relative h-full w-full">
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={images[index]}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <Image
                        src={images[index]}
                        alt={n > 1 ? `${title} — ${index + 1} / ${n}` : title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 680px, (min-width: 1024px) 52vw, 100vw"
                    />
                </motion.div>
            </AnimatePresence>

            {n > 1 && (
                <>
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex w-14 items-center justify-start bg-gradient-to-r from-[#3a3028]/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:w-16" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex w-14 items-center justify-end bg-gradient-to-l from-[#3a3028]/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:w-16" />
                    <button
                        type="button"
                        onClick={goPrev}
                        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-[#fff8ed]/90 p-2 text-[#3a3028] shadow-md opacity-90 transition-opacity duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a3028]/40 md:left-3 md:opacity-0 md:group-hover:opacity-90"
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-[#fff8ed]/90 p-2 text-[#3a3028] shadow-md opacity-90 transition-opacity duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a3028]/40 md:right-3 md:opacity-0 md:group-hover:opacity-90"
                        aria-label="Imagen siguiente"
                    >
                        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                    <div
                        className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-2"
                        role="tablist"
                        aria-label={`Carrusel de ${title}`}
                    >
                        {images.map((src, i) => (
                            <button
                                key={`${i}-${src}`}
                                type="button"
                                role="tab"
                                aria-selected={i === index}
                                aria-label={`Ir a imagen ${i + 1} de ${n}`}
                                onClick={() => setIndex(i)}
                                className="h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: i === index ? 22 : 8,
                                    backgroundColor: i === index ? accent : accentSoft,
                                    opacity: i === index ? 1 : 0.55,
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function EditorialFeatureRow({
    residence,
    reverse,
}: {
    residence: (typeof residences)[number];
    reverse: boolean;
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
                    className={`group relative aspect-[16/10] w-full max-w-[820px] overflow-hidden bg-[#ebe1d4] shadow-[0_25px_60px_rgba(73,54,39,0.08)] lg:max-w-[740px] xl:max-w-[760px] ${
                        reverse ? "mx-auto lg:mr-auto lg:ml-0" : "mx-auto lg:ml-auto lg:mr-0"
                    }`}
                >
                    <div className="absolute inset-x-0 top-0 z-10 h-1" style={{ backgroundColor: residence.accent }} />
                    <ResidenceImageCarousel
                        images={residence.images}
                        title={residence.title}
                        accent={residence.accent}
                        accentSoft={residence.accentSoft}
                    />
                </div>
            </div>
        </article>
    );
}

export default function FeaturesResidencial() {
    return (
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
                        <EditorialFeatureRow key={residence.id} residence={residence} reverse={index % 2 === 1} />
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import Image from "next/image";
import { motion } from "motion/react";

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
    image: string;
    specs: ResidenceSpec;
    highlights: string[];
}[] = [
    {
        id: 1,
        title: "Departamentos",
        accent: "#c68b70",
        accentSoft: "#ead7cc",
        description:
            "Bloques alrededor del complejo habitacional: estacionamiento techado y bodegas a desnivel forman un circuito que mantiene las calles interiores libres de tránsito vehicular. Cuatro departamentos por nivel con terrazas y azoteas aprovechables.",
        image: "/residencias/departamentos.jpg",
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
        accent: "#b77c7e",
        accentSoft: "#debebf",
        description:
            "Una vivienda por nivel, cada una con terraza o patio interior y vínculo claro con el exterior. Posibilidad de rentar una recámara de forma independiente.",
        image: "/residencias/duplex-1.jpg",
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
        accent: "#b8b267",
        accentSoft: "#d7d7aa",
        description:
            "Viviendas en torno a un patio interior, una casa por nivel. El Tipo 2 conecta las calles peatonales a través del primer nivel. Jacuzzi en prototipos seleccionados.",
        image: "/residencias/duplex-2.jpg",
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
        accent: "#7a8ea3",
        accentSoft: "#dbe3ea",
        description:
            "Patio central con una vivienda por nivel; distribuciones con varias terrazas y, en prototipos tipo B, sala de estar. Posibilidad de rentar una recámara de forma independiente.",
        image: "/residencias/duplex-3.jpg",
        specs: {
            superficie: "142–181 m² (según prototipo)",
            recamaras: "2–3",
            banos: "2–3",
            estacionamientos: "2 cajones por unidad",
        },
        highlights: ["Patio interior", "Varias terrazas", "Sala de estar (prototipo B)"],
    },
];

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
                    className={`relative aspect-[16/10] w-full max-w-[820px] overflow-hidden bg-[#ebe1d4] shadow-[0_25px_60px_rgba(73,54,39,0.08)] lg:max-w-[740px] xl:max-w-[760px] ${
                        reverse ? "mx-auto lg:mr-auto lg:ml-0" : "mx-auto lg:ml-auto lg:mr-0"
                    }`}
                >
                    <div className="absolute inset-x-0 top-0 z-10 h-1" style={{ backgroundColor: residence.accent }} />
                    <Image
                        src={residence.image}
                        alt={residence.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 680px, (min-width: 1024px) 52vw, 100vw"
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
                    className="text-[10px] tracking-[0.3em] text-[#E1B19B] uppercase"
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
                    Descubre los espacios que ofrecemos.
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

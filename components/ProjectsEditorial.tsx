"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";

const editorialProjects = [
    {
        id: 1,
        eyebrow: "Club residencial",
        title: "Club Residencial",
        accent: "#c68b70",
        accentSoft: "#ead7cc",
        description:
            "364 residencias en un entorno 100% peatonal con casa club, restaurantes, spa, deportes y amenidades de primer nivel.",
        supporting:
            "Una comunidad concebida para caminar, convivir y vivir con mayor calma en contacto con el paisaje.",
        details: ["364 residencias", "100% peatonal", "Casa club, spa y restaurantes"],
        image: "/images/renders/render-5.png",
        href: "/residencial",
        cta: "Conocer más",
    },
    {
        id: 2,
        eyebrow: "Organic farm & flowers",
        title: "Organic Farm & Flowers",
        accent: "#b77c7e",
        accentSoft: "#debebf",
        description:
            "Componente sostenible que recupera la vocación agrícola original con huertos orgánicos, frutales y flores de temporada.",
        supporting:
            "Un paisaje productivo que devuelve al proyecto su memoria agrícola y su relación cotidiana con la tierra.",
        details: ["Huertos orgánicos", "Frutales de temporada", "Paisaje sostenible"],
        image: "/images/renders/farm.jpg",
        href: "/farm",
        cta: "Explorar",
    },
    {
        id: 3,
        eyebrow: "Wellness center",
        title: "Wellness Center",
        accent: "#b8b267",
        accentSoft: "#d7d7aa",
        description:
            "Centro especializado para rehabilitación, retiro activo y bienestar integral con acceso directo a la Presa Allende.",
        supporting:
            "Diseñado para una experiencia de retiro activo donde salud, descanso y naturaleza se integran en un mismo destino.",
        details: ["Bienestar integral", "Retiro activo", "Acceso a Presa Allende"],
        image: "/images/gallery/gallery-3.png",
        href: "/wellness",
        cta: "Descubrir",
    },
    {
        id: 4,
        eyebrow: "Presa de la cantera",
        title: "Presa de la Cantera",
        accent: "#7a8ea3",
        accentSoft: "#dbe3ea",
        description:
            "Un gran espacio publico-privado que integra naturaleza, comunidad y vida social junto al agua.",
        supporting:
            "El borde del agua se convierte en un escenario para actividades recreativas, encuentros y vida comunitaria.",
        details: ["Vida junto al agua", "Naturaleza y comunidad", "Espacio social activo"],
        image: "/images/renders/presa-1.png",
        href: "/presa",
        cta: "Visitar",
    },
];

function EditorialProjectRow({
    project,
    reverse,
}: {
    project: (typeof editorialProjects)[number];
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
            <div className={`${reverse ? "lg:order-1" : ""} min-w-0`}>
                <div className="mx-auto flex w-full max-w-md flex-col items-start lg:max-w-lg">
                    {/* <p
                        className="text-[10px] uppercase tracking-[0.28em]"
                        style={{ fontFamily: "var(--font-sans)", color: project.accent }}
                    >
                        {project.eyebrow}
                    </p> */}
                    <h3
                        className="mt-4 text-[#3a3028]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 3vw, 3.4rem)",
                            lineHeight: 0.95,
                        }}
                    >
                        {project.title}
                    </h3>
                    <p
                        className="mt-5 max-w-xs lg:max-w-md text-sm leading-7 text-[#62564a] md:text-[15px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {project.description}
                    </p>
                    <p
                        className="mt-4 max-w-sm text-sm leading-7 text-[#7a6d61] md:text-[15px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {project.supporting}
                    </p>
                    <div className="mt-7 w-full max-w-sm">
                        <div
                            className="mb-4 h-px w-14"
                            style={{ backgroundColor: project.accentSoft }}
                        />
                        <div
                            className="flex flex-col gap-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                        {project.details.map((detail) => (
                            <div
                                key={detail}
                                className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em]"
                                style={{ color: project.accent }}
                            >
                                <span
                                    className="h-2 w-2 rounded-full border"
                                    style={{
                                        backgroundColor: project.accentSoft,
                                        borderColor: project.accent,
                                    }}
                                />
                                {detail}
                            </div>
                        ))}
                        </div>
                    </div>
                    <Link
                        href={project.href}
                        className="group mt-8 -ml-4 inline-flex items-center gap-4 rounded-md px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-[#3a3028] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f6e5d]/40"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        <span>{project.cta}</span>
                        <span className="h-px w-10 bg-[#b8ab9f] transition-all duration-300 group-hover:w-14 group-hover:bg-[#8f6e5d]" />
                    </Link>
                </div>
            </div>

            <div className={`${reverse ? "lg:order-0" : ""} min-w-0`}>
                <div
                    className={`relative aspect-[16/10] w-full max-w-[820px] lg:max-w-[740px] xl:max-w-[760px] overflow-hidden bg-[#ebe1d4] shadow-[0_25px_60px_rgba(73,54,39,0.08)] ${
                        reverse ? "mx-auto lg:mr-auto lg:ml-0" : "mx-auto lg:ml-auto lg:mr-0"
                    }`}
                >
                    <div
                        className="absolute inset-x-0 top-0 z-10 h-1"
                        style={{ backgroundColor: project.accent }}
                    />
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 680px, (min-width: 1024px) 52vw, 100vw"
                    />
                </div>
            </div>
        </article>
    );
}

export default function ProjectsEditorial() {
    return (
        <section id="proyectos" className="bg-[#fff8ef] px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-20">
            <div className="mx-auto max-w-[1280px]">
                {/* <div className="mb-16 max-w-2xl md:mb-24">
                    <p
                        className="text-[10px] uppercase tracking-[0.3em] text-[#aa7d69]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [El proyecto]
                    </p>
                    <h2
                        className="mt-5 text-[#2f2721]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.75rem, 6vw, 5.5rem)",
                            lineHeight: 0.94,
                        }}
                    >
                        Un recorrido mas editorial por las piezas que dan forma a Don Diego.
                    </h2>
                </div> */}

                <div className="space-y-18 md:space-y-20">
                    {editorialProjects.map((project, index) => (
                        <EditorialProjectRow
                            key={project.id}
                            project={project}
                            reverse={index % 2 === 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

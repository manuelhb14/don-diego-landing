"use client";

import Image from "next/image";
import { motion } from "motion/react";

const projects = [
    {
        id: 1,
        tag: "01 — El Núcleo Privado",
        title: "Club Residencial",
        description: "364 residencias en un entorno 100% peatonal. Casa club, restaurantes, spa, deportes y amenidades de primer nivel. Entrada arquitectónica en cantera, piedra y madera — seguridad 24/7.",
        image: "/images/renders/render-1.png",
        accent: "terracotta",
        accentHex: "#E1B19B",
    },
    {
        id: 2,
        tag: "02 — El Paisaje Productivo",
        title: "Organic Farm & Flowers",
        description: "Agricultura orgánica que recupera la herencia agrícola original. Huertos, flores de temporada, invernaderos en terrazas y senderos ciclistas. Farm-to-table para restaurantes del desarrollo.",
        image: "/images/renders/farm.jpg",
        accent: "sage",
        accentHex: "#D7D7AA",
    },
    {
        id: 3,
        tag: "03 — Bienestar Integral",
        title: "Wellness Center",
        description: "Centro de rehabilitación, retiro activo y senior living. Beach club frente a la Presa Allende. 30 departamentos para familiares y servicios complementarios.",
        image: "/images/gallery/gallery-3.png",
        accent: "sky",
        accentHex: "#C8D7E6",
    },
    {
        id: 4,
        tag: "04 — Vida Junto al Agua",
        title: "Presa de la Cantera",
        description: "Malecón lacustre de la presa colonial. Parque acuático, club náutico, anfiteatro al aire libre, Taller de las Artes, restaurantes y espacios comerciales junto al agua.",
        image: "/images/renders/presa-1.png",
        accent: "clay",
        accentHex: "#AA7D69",
    },
];

export default function ProjectsV4() {
    return (
        <section className="bg-cream overflow-hidden">
            {/* Section header */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 lg:pt-36 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
                >
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.25em] text-clay/50 uppercase mb-4">
                            Cuatro Componentes
                        </p>
                        <h2
                            className="font-serif text-dark leading-[1.05]"
                            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                        >
                            Un desarrollo,{" "}
                            <em className="text-clay">cuatro mundos.</em>
                        </h2>
                    </div>
                    <p className="text-dark/35 text-sm max-w-sm lg:text-right leading-relaxed">
                        Integrados alrededor de la Presa La Cantera, cada componente crea un ecosistema de vida, cultura y naturaleza.
                    </p>
                </motion.div>
            </div>

            {/* Project cards — alternating layout */}
            <div className="space-y-0">
                {projects.map((project, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.9 }}
                            className="relative"
                        >
                            <div className={`max-w-[1440px] mx-auto grid lg:grid-cols-2 min-h-[500px] lg:min-h-[600px] ${isEven ? "" : "direction-rtl"}`}>
                                {/* Image side */}
                                <div className={`relative h-[350px] lg:h-auto overflow-hidden ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover object-center"
                                    />
                                    <div className="absolute inset-0 bg-dark/10" />

                                    {/* Number watermark */}
                                    <div
                                        className="absolute bottom-4 right-6 lg:bottom-8 lg:right-10 font-serif text-white/10 leading-none"
                                        style={{ fontSize: "clamp(5rem, 12vw, 12rem)" }}
                                    >
                                        {String(project.id).padStart(2, "0")}
                                    </div>
                                </div>

                                {/* Content side */}
                                <div className={`flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-20 bg-white ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                                    {/* Accent bar */}
                                    <div
                                        className="h-1 w-10 rounded-full mb-8"
                                        style={{ backgroundColor: project.accentHex }}
                                    />

                                    <p
                                        className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
                                        style={{ color: project.accentHex }}
                                    >
                                        {project.tag}
                                    </p>

                                    <h3
                                        className="font-serif text-dark leading-none mb-6"
                                        style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
                                    >
                                        {project.title}
                                    </h3>

                                    <p className="text-dark/45 text-[15px] leading-relaxed max-w-md mb-8">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <div className="h-px w-6" style={{ backgroundColor: `${project.accentHex}40` }} />
                                        <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: `${project.accentHex}80` }}>
                                            Próximamente
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

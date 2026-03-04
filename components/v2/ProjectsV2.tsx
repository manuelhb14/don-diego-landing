"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const projects = [
    {
        id: 1,
        label: "Club Residencial",
        title: "CLUB\nRESIDENCIAL",
        description: "364 residencias en un entorno 100% peatonal con casa club, restaurantes, spa, deportes y amenidades de primer nivel.",
        mainImage: "/images/renders/render-1.png",
        secondary: "/images/gallery/gallery-1.png",
    },
    {
        id: 2,
        label: "Organic Farm & Flowers",
        title: "ORGANIC\nFARM",
        description: "Agricultura orgánica que recupera la herencia agrícola original. Huertos, flores de temporada e invernaderos en terrazas.",
        mainImage: "/images/renders/farm.jpg",
        secondary: "/images/gallery/gallery-4.png",
    },
    {
        id: 3,
        label: "Wellness Center",
        title: "WELLNESS\nCENTER",
        description: "Centro de rehabilitación, retiro activo y senior living con beach club frente a la Presa Allende.",
        mainImage: "/images/gallery/gallery-3.png",
        secondary: "/images/gallery/gallery-7.png",
    },
    {
        id: 4,
        label: "Presa de la Cantera",
        title: "PRESA DE\nLA CANTERA",
        description: "Malecón lacustre, parque acuático, club náutico, anfiteatro al aire libre y espacios comerciales junto al agua.",
        mainImage: "/images/renders/presa-1.png",
        secondary: "/images/gallery/gallery-10.jpg",
    },
];

export default function ProjectsV2() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const go = (idx: number) => {
        setDirection(idx > current ? 1 : -1);
        setCurrent(idx);
    };
    const prev = () => go((current - 1 + projects.length) % projects.length);
    const next = () => go((current + 1) % projects.length);

    const p = projects[current];

    return (
        <section className="relative bg-white overflow-hidden py-24 lg:py-32">
            {/* Section label + dots */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14 flex items-center justify-between mb-14">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    (Nuestros Proyectos)
                </motion.p>
                <div className="flex items-center gap-3">
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => go(i)}
                            className={`transition-all duration-300 rounded-full ${i === current
                                    ? "bg-[#AA7D69] w-6 h-1.5"
                                    : "bg-[#AA7D69]/20 w-2 h-1.5 hover:bg-[#AA7D69]/40"
                                }`}
                            aria-label={`Proyecto ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Slide */}
            <div className="relative max-w-[1400px] mx-auto px-8 lg:px-20">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -60 }}
                        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="grid lg:grid-cols-[1fr_1.4fr_1fr] gap-6 lg:gap-8 items-center"
                    >
                        {/* Left image */}
                        <div className="relative aspect-[3/4] overflow-hidden hidden lg:block">
                            <Image
                                src={p.secondary}
                                alt={p.label}
                                fill
                                className="object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-[#FFF3E1]/5" />
                        </div>

                        {/* Center */}
                        <div className="text-center py-8 lg:py-16">
                            <p
                                className="text-[10px] tracking-[0.3em] text-[#AA7D69] uppercase mb-6"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {p.label}
                            </p>
                            <h2
                                className="text-[#222] leading-none mb-8 whitespace-pre-line"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(3rem, 6vw, 7.5rem)",
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                {p.title}
                            </h2>
                            <div className="h-px w-16 bg-[#E1B19B]/50 mx-auto mb-8" />
                            <p
                                className="text-[#222]/50 text-sm leading-relaxed max-w-sm mx-auto"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {p.description}
                            </p>
                            <div className="mt-8 inline-flex items-center gap-3">
                                <span className="h-px w-6 bg-[#AA7D69]/25" />
                                <span
                                    className="text-[10px] tracking-[0.2em] text-[#AA7D69]/50 uppercase"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    Próximamente
                                </span>
                                <span className="h-px w-6 bg-[#AA7D69]/25" />
                            </div>
                        </div>

                        {/* Right image */}
                        <div className="relative aspect-[3/4] overflow-hidden hidden lg:block">
                            <Image
                                src={p.mainImage}
                                alt={p.label}
                                fill
                                className="object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-[#FFF3E1]/5" />
                        </div>

                        {/* Mobile main image */}
                        <div className="relative aspect-[4/3] overflow-hidden lg:hidden">
                            <Image
                                src={p.mainImage}
                                alt={p.label}
                                fill
                                className="object-cover object-center"
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Prev / Next */}
                <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[#AA7D69]/25 text-[#AA7D69]/60 hover:text-[#AA7D69] hover:border-[#AA7D69]/50 transition-all duration-300 rounded-full"
                    aria-label="Previous"
                >
                    <span className="text-lg">‹</span>
                </button>
                <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[#AA7D69]/25 text-[#AA7D69]/60 hover:text-[#AA7D69] hover:border-[#AA7D69]/50 transition-all duration-300 rounded-full"
                    aria-label="Next"
                >
                    <span className="text-lg">›</span>
                </button>
            </div>

            {/* Bottom rule */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14 mt-16">
                <div className="h-px bg-[#AA7D69]/12" />
            </div>
        </section>
    );
}

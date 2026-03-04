"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useMemo } from "react";

const projects = [
    {
        id: 1,
        label: "01",
        title: "Club Residencial",
        description: "364 residencias en un entorno 100% peatonal con casa club, restaurantes, spa, deportes y amenidades de primer nivel.",
        image: "/images/renders/render-1.png",
        accent: "#E1B19B",
    },
    {
        id: 2,
        label: "02",
        title: "Organic Farm & Flowers",
        description: "Agricultura orgánica que recupera la herencia agrícola original. Huertos, flores de temporada e invernaderos en terrazas.",
        image: "/images/renders/farm.jpg",
        accent: "#AA7D69",
    },
    {
        id: 3,
        label: "03",
        title: "Wellness Center",
        description: "Centro de rehabilitación, retiro activo y senior living con beach club frente a la Presa Allende.",
        image: "/images/gallery/gallery-3.png",
        accent: "#E1B19B",
    },
    {
        id: 4,
        label: "04",
        title: "Presa de la Cantera",
        description: "Malecón lacustre, parque acuático, club náutico, anfiteatro al aire libre y espacios comerciales junto al agua.",
        image: "/images/renders/presa-1.png",
        accent: "#AA7D69",
    },
];

export default function ProjectsV3() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const { inputPoints, outputPoints } = useMemo(() => {
        const pauseWeight = 1.15; // Increase this to make it pause longer!
        const transitionWeight = 1; // How long the scroll transition takes
        const totalWeight = projects.length * pauseWeight + (projects.length - 1) * transitionWeight;

        const inputs: number[] = [];
        const outputs: string[] = [];
        let currentWeight = 0;

        for (let i = 0; i < projects.length; i++) {
            inputs.push(currentWeight / totalWeight);
            outputs.push(`-${i * 100}%`);

            currentWeight += pauseWeight;
            inputs.push(currentWeight / totalWeight);
            outputs.push(`-${i * 100}%`);

            if (i < projects.length - 1) {
                currentWeight += transitionWeight;
            }
        }
        return { inputPoints: inputs, outputPoints: outputs };
    }, []);

    const x = useTransform(scrollYProgress, inputPoints, outputPoints);

    return (
        <section ref={containerRef} className="relative bg-[#111]" style={{ height: `${projects.length * 200}vh` }}>
            {/* Section label */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-14 pt-8">
                    <p
                        className="text-[10px] tracking-[0.3em] text-white/30 uppercase"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        (Nuestros Proyectos)
                    </p>
                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                        <motion.div className="w-24 lg:w-40 h-px bg-white/10 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-[#E1B19B]/70"
                                style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                            />
                        </motion.div>
                        <span className="text-[10px] text-white/25" style={{ fontFamily: "var(--font-sans)" }}>
                            {projects.length}
                        </span>
                    </div>
                </div>

                {/* Horizontal scroll cards */}
                <motion.div
                    className="flex h-full"
                    style={{ x }}
                >
                    {projects.map((project, i) => (
                        <div key={project.id} className="relative flex-shrink-0 w-screen h-full">
                            {/* Background image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex h-full items-end p-8 lg:p-16 pb-16 lg:pb-24">
                                <div className="max-w-2xl">
                                    {/* Number */}
                                    <p
                                        className="text-white/20 mb-4 leading-none"
                                        style={{
                                            fontFamily: "var(--font-serif)",
                                            fontSize: "clamp(4rem, 10vw, 10rem)",
                                            fontWeight: 300,
                                        }}
                                    >
                                        {project.label}
                                    </p>

                                    {/* Title */}
                                    <h3
                                        className="text-white leading-none mb-6"
                                        style={{
                                            fontFamily: "var(--font-serif)",
                                            fontSize: "clamp(2.5rem, 5vw, 5rem)",
                                        }}
                                    >
                                        {project.title}
                                    </h3>

                                    {/* Accent line */}
                                    <div
                                        className="h-px w-16 mb-6"
                                        style={{ backgroundColor: `${project.accent}80` }}
                                    />

                                    {/* Description */}
                                    <p
                                        className="text-white/50 text-sm lg:text-base leading-relaxed max-w-md"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            {/* Right side decorative */}
                            <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
                                {projects.map((_, j) => (
                                    <div
                                        key={j}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${j === i
                                            ? "bg-[#E1B19B] scale-150"
                                            : "bg-white/20"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

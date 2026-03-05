"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import { Footprints, Utensils, Sparkles, Dumbbell, Sprout, Sun, Bike, Home, HeartPulse, Users, Waves, Mountain, Sailboat, Theater, Smile, Store } from "lucide-react";

const projects = [
    {
        id: 1,
        label: "01",
        title: "Club Residencial",
        description: "364 residencias en un entorno 100% peatonal con casa club, restaurantes, spa, deportes y amenidades de primer nivel.",
        image: "/images/renders/render-5.png",
        accent: "#E1B19B",
        features: [
            { icon: Footprints, text: "100% Peatonal" },
            { icon: Utensils, text: "Casa Club & Restaurantes" },
            { icon: Sparkles, text: "Spa & Alberca" },
            { icon: Dumbbell, text: "Deportes & Amenidades" }
        ],
        href: "/residencial"
    },
    {
        id: 2,
        label: "02",
        title: "Organic Farm & Flowers",
        description: "Componente sostenible que recupera la vocación agrícola original con huertos orgánicos, frutales y flores de temporada.",
        image: "/images/renders/farm.jpg",
        accent: "#AA7D69",
        features: [
            { icon: Sprout, text: "Huertos Orgánicos" },
            { icon: Sun, text: "Invernaderos y Terrazas" },
            { icon: Bike, text: "Andadores y Cicloruta" },
            { icon: Home, text: "Baja Densidad Residencial" }
        ],
        href: "/farm"
    },
    {
        id: 3,
        label: "03",
        title: "Wellness Center",
        description: "Centro especializado para rehabilitación, retiro activo y bienestar integral con acceso directo a la Presa Allende.",
        image: "/images/gallery/gallery-3.png",
        accent: "#E1B19B",
        features: [
            { icon: HeartPulse, text: "Rehabilitación y Salud" },
            { icon: Users, text: "Senior Living Especializado" },
            { icon: Waves, text: "Beach Club Privado" },
            { icon: Mountain, text: "Vistas a la Presa" }
        ],
        href: "/wellness"
    },
    {
        id: 4,
        label: "04",
        title: "Presa de la Cantera",
        description: "Un gran espacio público-privado que integra naturaleza, comunidad y vida social junto al agua.",
        image: "/images/renders/presa-1.png",
        accent: "#AA7D69",
        features: [
            { icon: Sailboat, text: "Parque Acuático y Náutico" },
            { icon: Theater, text: "Anfiteatro y Eventos" },
            { icon: Smile, text: "Day Care Comunitario" },
            { icon: Store, text: "Vida Comercial" }
        ],
        href: "/presa"
    },
];

interface ProjectCardProps {
    project: typeof projects[0];
    index: number;
    totalProjects: number;
    scrollYProgress: MotionValue<number>;
    allProjects: typeof projects;
}

function ProjectCard({ project, index, totalProjects, scrollYProgress, allProjects }: ProjectCardProps) {
    const pauseWeight = 1.15;
    const transitionWeight = 1;
    const totalWeight = totalProjects * pauseWeight + (totalProjects - 1) * transitionWeight;

    const startTransitionWeight = index * pauseWeight + (index - 1) * transitionWeight;
    const endTransitionWeight = startTransitionWeight + transitionWeight;

    const nextStartTransitionWeight = (index + 1) * pauseWeight + index * transitionWeight;
    const nextEndTransitionWeight = nextStartTransitionWeight + transitionWeight;

    const y = useTransform(
        scrollYProgress,
        [
            0,
            index === 0 ? 0 : startTransitionWeight / totalWeight,
            index === 0 ? 0 : endTransitionWeight / totalWeight,
            1
        ],
        [
            index === 0 ? "0%" : "100%",
            index === 0 ? "0%" : "100%",
            "0%",
            "0%"
        ]
    );

    const contentY = useTransform(
        scrollYProgress,
        [
            0,
            nextStartTransitionWeight / totalWeight,
            nextEndTransitionWeight / totalWeight,
            1
        ],
        [
            "0%",
            "0%",
            index === totalProjects - 1 ? "0%" : "-100%",
            index === totalProjects - 1 ? "0%" : "-100%"
        ]
    );

    const contentOpacity = useTransform(
        scrollYProgress,
        [
            0,
            nextStartTransitionWeight / totalWeight,
            nextEndTransitionWeight / totalWeight,
            1
        ],
        [
            1,
            1,
            index === totalProjects - 1 ? 1 : 0,
            index === totalProjects - 1 ? 1 : 0
        ]
    );

    const cardArrivedWeight = index === 0 ? 0 : endTransitionWeight;
    // Animate text during the pause phase
    // For index 0, start immediately as user scrolls
    // For others, delay slightly then animate
    const textAnimStartWeight = index === 0 ? 0 : cardArrivedWeight + (pauseWeight * 0.1);
    const textAnimDurationWeight = pauseWeight * 0.4;

    const textAnimStart = textAnimStartWeight / totalWeight;
    const textAnimDuration = textAnimDurationWeight / totalWeight;

    const staggerFraction = 0.5;
    const step = (textAnimDuration * staggerFraction) / 4;

    const createInputRange = (elementIndex: number) => {
        const elementStart = textAnimStart + step * elementIndex;
        const elementEnd = elementStart + (textAnimDuration * (1 - staggerFraction));
        return [0, elementStart, elementEnd, 1];
    };

    const createYOutputRange = () => [30, 30, 0, 0];
    const createOpacityOutputRange = () => [0, 0, 1, 1];

    const labelY = useTransform(scrollYProgress, createInputRange(0), createYOutputRange());
    const labelOpacity = useTransform(scrollYProgress, createInputRange(0), createOpacityOutputRange());

    const titleY = useTransform(scrollYProgress, createInputRange(1), createYOutputRange());
    const titleOpacity = useTransform(scrollYProgress, createInputRange(1), createOpacityOutputRange());

    const lineY = useTransform(scrollYProgress, createInputRange(2), createYOutputRange());
    const lineOpacity = useTransform(scrollYProgress, createInputRange(2), createOpacityOutputRange());

    const descY = useTransform(scrollYProgress, createInputRange(3), createYOutputRange());
    const descOpacity = useTransform(scrollYProgress, createInputRange(3), createOpacityOutputRange());

    const btnY = useTransform(scrollYProgress, createInputRange(4), createYOutputRange());
    const btnOpacity = useTransform(scrollYProgress, createInputRange(4), createOpacityOutputRange());

    const featuresY = useTransform(scrollYProgress, createInputRange(5), createYOutputRange());
    const featuresOpacity = useTransform(scrollYProgress, createInputRange(5), createOpacityOutputRange());

    return (
        <motion.div
            className="absolute inset-0 w-full h-full shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
            style={{ y }}
        >
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 flex h-full items-end p-8 lg:p-16 pb-12"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <div className="max-w-2xl">
                    {/* Number */}
                    <motion.p
                        className="text-white/50 mb-4 leading-none"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(4rem, 10vw, 10rem)",
                            fontWeight: 300,
                            y: labelY,
                            opacity: labelOpacity,
                        }}
                    >
                        {project.label}
                    </motion.p>

                    {/* Title */}
                    <motion.h3
                        className="text-white leading-none mb-6"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.5rem, 5vw, 5rem)",
                            y: titleY,
                            opacity: titleOpacity,
                        }}
                    >
                        {project.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                        className="text-white text-lg lg:text-xl font-medium leading-relaxed max-w-lg mb-4 md:mb-8 font-serif"
                        style={{
                            y: descY,
                            opacity: descOpacity,
                        }}
                    >
                        {project.description}
                    </motion.p>

                    {/* Features Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 md:gap-y-4 gap-x-4 md:gap-x-8 mb-10"
                        style={{
                            y: featuresY,
                            opacity: featuresOpacity,
                        }}
                    >
                        {project.features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Icon size={16} className="text-white/90" strokeWidth={1.5} />
                                    </div>
                                    <span
                                        className="text-white/90 text-sm tracking-wider"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {feature.text}
                                    </span>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Learn More Button */}
                    <motion.div
                        className="inline-block"
                        style={{
                            y: btnY,
                            opacity: btnOpacity,
                        }}
                    >
                        <Link
                            href={project.href}
                            className="group flex items-center gap-4 text-white text-sm tracking-widest uppercase transition-colors hover:text-white/70"
                            style={{
                                fontFamily: "var(--font-sans)",
                            }}
                        >
                            <span>Conocer más</span>
                            <div className="w-8 h-[1px] bg-white/50 group-hover:w-12 group-hover:bg-white transition-all duration-300" />
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right side decorative */}
            <motion.div
                className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                {allProjects.map((_, j) => (
                    <div
                        key={j}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${j === index
                            ? "bg-[#E1B19B] scale-150"
                            : "bg-white/20"
                            }`}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="relative bg-[#111]" style={{ height: `${projects.length * 200}vh` }}>
            {/* Section label */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-14 pt-16">
                    <p
                        className="text-[10px] tracking-[0.3em] text-white/50 uppercase"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [EL PROYECTO]
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

                {/* Vertical scroll cards */}
                <div className="relative w-full h-full">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={i}
                            totalProjects={projects.length}
                            scrollYProgress={scrollYProgress}
                            allProjects={projects}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

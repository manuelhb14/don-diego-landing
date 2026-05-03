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
        accent: "#cc8767",
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
        image: "/babylon/organic-farm.jpeg",
        accent: "#DEBEBF",
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
        accent: "#D7D7AA",
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
        accent: "#C8D7E6",
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
    const pauseWeight = 1.5;
    const transitionWeight = 1;
    const totalWeight = totalProjects * pauseWeight + (totalProjects - 1) * transitionWeight;

    const startTransitionWeight = index * pauseWeight + (index - 1) * transitionWeight;
    const endTransitionWeight = startTransitionWeight + transitionWeight;

    const nextStartTransitionWeight = (index + 1) * pauseWeight + index * transitionWeight;
    const nextEndTransitionWeight = nextStartTransitionWeight + transitionWeight;

    const clipPath = useTransform(
        scrollYProgress,
        [
            0,
            index === 0 ? 0 : startTransitionWeight / totalWeight,
            index === 0 ? 0 : endTransitionWeight / totalWeight,
            1
        ],
        [
            index === 0 ? "inset(0% 0px 0px 0px)" : "inset(100% 0px 0px 0px)",
            index === 0 ? "inset(0% 0px 0px 0px)" : "inset(100% 0px 0px 0px)",
            "inset(0% 0px 0px 0px)",
            "inset(0% 0px 0px 0px)"
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
            "0%",
            "0%"
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
    const textRevealStartFraction = index === 0 ? 0 : 0.1;
    const textRevealDurationFraction = 0.4;

    // Keep the reveal timing the same while extending the pause window after it.
    const textAnimStartWeight = cardArrivedWeight + (pauseWeight * textRevealStartFraction);
    const textAnimDurationWeight = pauseWeight * textRevealDurationFraction;

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

    const cardY = useTransform(scrollYProgress, createInputRange(2), createYOutputRange());
    const cardOpacity = useTransform(scrollYProgress, createInputRange(2), createOpacityOutputRange());

    const descY = useTransform(scrollYProgress, createInputRange(3), createYOutputRange());
    const descOpacity = useTransform(scrollYProgress, createInputRange(3), createOpacityOutputRange());

    const btnY = useTransform(scrollYProgress, createInputRange(4), createYOutputRange());
    const btnOpacity = useTransform(scrollYProgress, createInputRange(4), createOpacityOutputRange());

    const featuresY = useTransform(scrollYProgress, createInputRange(5), createYOutputRange());
    const featuresOpacity = useTransform(scrollYProgress, createInputRange(5), createOpacityOutputRange());

    return (
        <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath, zIndex: index }}
        >
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" /> */}
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 flex h-full items-end p-4 md:p-8 lg:p-16 pb-8 md:pb-12"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <div className="max-w-2xl">
                    {/* Number */}
                    <motion.p
                        className="mb-2 leading-none"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 8vw, 8rem)",
                            fontWeight: 300,
                            color: project.accent,
                            opacity: labelOpacity,
                            y: labelY,
                        }}
                    >
                        {project.label}
                    </motion.p>

                    {/* Title */}
                    <motion.h3
                        className="text-white leading-none mb-2 md:mb-6"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            y: titleY,
                            opacity: titleOpacity,
                        }}
                    >
                        {project.title}
                    </motion.h3>

                    {/* Card Container for details */}
                    <motion.div
                        className="rounded-[1.5rem] px-6 py-3 shadow-2xl relative overflow-hidden group/card border"
                        style={{
                            ["--accent" as string]: project.accent,
                            ["--accent-bg" as string]: `${project.accent}30`,
                            background: `linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)`,
                            borderColor: `${project.accent}40`,
                            boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), inset 0 0 20px ${project.accent}15`,
                            y: cardY,
                            opacity: cardOpacity,
                        } as unknown as Record<string, unknown>}
                    >

                        {/* Glow effect matching project accent color */}
                        <div
                            className="absolute -inset-24 opacity-0 group-hover/card:opacity-10 pointer-events-none transition-opacity duration-1000 mix-blend-screen blur-3xl z-0"
                            style={{ backgroundColor: project.accent }}
                        />

                        {/* Description */}
                        <motion.p
                            className="relative text-white/90 text-lg font-medium leading-relaxed max-w-lg mb-2 md:mb-6 font-serif z-10"
                            style={{
                                y: descY,
                                opacity: descOpacity,
                            }}
                        >
                            {project.description}
                        </motion.p>

                        {/* Features Grid */}
                        <motion.div
                            className="relative grid grid-cols-1 sm:grid-cols-2 gap-y-1 md:gap-y-4 gap-x-4 md:gap-x-6 mb-5 z-10"
                            style={{
                                y: featuresY,
                                opacity: featuresOpacity,
                            }}
                        >
                            {project.features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 group/feature cursor-default"
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300"
                                            style={{
                                                backgroundColor: "var(--feature-hover-bg, rgba(255,255,255,0.05))",
                                                borderColor: "var(--feature-hover-border, rgba(255,255,255,0.1))",
                                                boxShadow: "var(--feature-hover-shadow, none)"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.setProperty('--feature-hover-bg', `${project.accent}30`);
                                                e.currentTarget.style.setProperty('--feature-hover-border', project.accent);
                                                e.currentTarget.style.setProperty('--feature-hover-shadow', `0 0 10px ${project.accent}50`);
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.setProperty('--feature-hover-bg', `rgba(255,255,255,0.05)`);
                                                e.currentTarget.style.setProperty('--feature-hover-border', `rgba(255,255,255,0.1)`);
                                                e.currentTarget.style.setProperty('--feature-hover-shadow', `none`);
                                            }}
                                        >
                                            <Icon size={14} className="transition-colors duration-300 group-hover/feature:brightness-125" style={{ color: project.accent }} strokeWidth={1.5} />
                                        </div>
                                        <span
                                            className="text-white/80 text-sm tracking-wider transition-all duration-300 group-hover/feature:translate-x-1"
                                            style={{
                                                fontFamily: "var(--font-sans)",
                                                color: "var(--feature-text-color, rgba(255,255,255,0.8))"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.setProperty('--feature-text-color', project.accent);
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.setProperty('--feature-text-color', 'rgba(255,255,255,0.8)');
                                            }}
                                        >
                                            {feature.text}
                                        </span>
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* Learn More Button */}
                        <motion.div
                            className="relative inline-block z-10"
                            style={{
                                y: btnY,
                                opacity: btnOpacity,
                            }}
                        >
                            <Link
                                href={project.href}
                                className="group flex items-center gap-4 text-white hover:text-white text-xs md:text-sm tracking-widest uppercase transition-colors"
                                style={{
                                    fontFamily: "var(--font-sans)",
                                }}
                            >
                                <span>Conocer más</span>
                                <div className="relative flex items-center">
                                    <div className="w-8 h-[1px] bg-white/50 group-hover:w-12 transition-all duration-300" />
                                    {/* Arrow icon that appears on hover, matching accent color */}
                                    <svg
                                        className="absolute right-0 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke={project.accent}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right side decorative */}
            <motion.div
                className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                {allProjects.map((p, j) => (
                    <div
                        key={j}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${j === index ? "scale-150" : "bg-white/20"}`}
                        style={j === index ? { backgroundColor: project.accent, boxShadow: `0 0 10px ${project.accent}80` } : {}}
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

"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import { Trees, Maximize, Sun, Shield, Layers, Home, Wine, Car } from "lucide-react";

const residences = [
    {
        id: 1,
        label: "01",
        title: "Dúplex Garden",
        description: "Espacios de dos niveles conectados directamente con el paisaje vivo del club. Ideales para familias que buscan amplitud y jardín privado.",
        image: "/images/renders/render-1.png",
        accent: "#E1B19B",
        features: [
            { icon: Trees, text: "Jardín Privado" },
            { icon: Layers, text: "Dos Niveles" },
            { icon: Car, text: "Acceso Directo" },
            { icon: Shield, text: "Privacidad Periférica" }
        ],
    },
    {
        id: 2,
        label: "02",
        title: "Townhouses",
        description: "Arquitectura contemporánea en tres niveles con terrazas panorámicas. Diseño inteligente que separa el área social de la privada.",
        image: "/images/renders/render-5.png",
        accent: "#E1B19B",
        features: [
            { icon: Maximize, text: "Doble Altura" },
            { icon: Sun, text: "Terrazas Panorámicas" },
            { icon: Home, text: "Diseño Inteligente" },
            { icon: Trees, text: "Vistas al Paisaje" }
        ],
    },
    {
        id: 3,
        label: "03",
        title: "Penthouses",
        description: "El punto más alto de Club Residencial. Vistas ininterrumpidas, amplitud extrema y acabados de lujo de la región guiados por el diseño consciente.",
        image: "/images/renders/render-2.png",
        accent: "#E1B19B",
        features: [
            { icon: Wine, text: "Rooftop Privado" },
            { icon: Sun, text: "Luz Natural Abundante" },
            { icon: Maximize, text: "Espacios Abiertos" },
            { icon: Shield, text: "Seguridad Premium" }
        ],
    },
    {
        id: 4,
        label: "04",
        title: "Villas Familiares",
        description: "Residencias premium independientes con el máximo grado de privacidad. Extensos jardines propios en el corazón del entorno sin vehículos.",
        image: "/images/renders/render-3.png",
        accent: "#E1B19B",
        features: [
            { icon: Home, text: "Residencias Independientes" },
            { icon: Trees, text: "Jardines Extensos" },
            { icon: Shield, text: "Privacidad Total" },
            { icon: Car, text: "Estacionamiento Oculto" }
        ],
    },
];

interface ResidenceCardProps {
    residence: typeof residences[0];
    index: number;
    totalResidences: number;
    scrollYProgress: MotionValue<number>;
}

function ResidenceCard({ residence, index, totalResidences, scrollYProgress }: ResidenceCardProps) {
    const pauseWeight = 1.15;
    const transitionWeight = 1;
    const totalWeight = totalResidences * pauseWeight + (totalResidences - 1) * transitionWeight;

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
            index === totalResidences - 1 ? "0%" : "-100%",
            index === totalResidences - 1 ? "0%" : "-100%"
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
            index === totalResidences - 1 ? 1 : 0,
            index === totalResidences - 1 ? 1 : 0
        ]
    );

    const cardArrivedWeight = index === 0 ? 0 : endTransitionWeight;
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

    const featuresY = useTransform(scrollYProgress, createInputRange(5), createYOutputRange());
    const featuresOpacity = useTransform(scrollYProgress, createInputRange(5), createOpacityOutputRange());

    return (
        <motion.div
            className="absolute inset-0 w-full h-full shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
            style={{ y }}
        >
            {/* Background image */}
            <div className="absolute inset-0 bg-[#1F1D1B]">
                <Image
                    src={residence.image}
                    alt={residence.title}
                    fill
                    className="object-cover object-center opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 flex h-full items-end p-8 lg:p-16 pb-12 lg:pb-24"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <div className="max-w-2xl bg-[#1F1D1B]/40 backdrop-blur-md p-8 lg:p-12 rounded-[24px] border border-white/5 shadow-2xl">
                    {/* Number */}
                    <motion.p
                        className="text-[#E1B19B]/60 mb-2 leading-none"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 6vw, 6rem)",
                            fontWeight: 300,
                            y: labelY,
                            opacity: labelOpacity,
                        }}
                    >
                        {residence.label}
                    </motion.p>

                    {/* Title */}
                    <motion.h3
                        className="text-[#FFF3E1] leading-none mb-6"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 4vw, 4rem)",
                            y: titleY,
                            opacity: titleOpacity,
                        }}
                    >
                        {residence.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                        className="text-[#FFF3E1]/90 text-base lg:text-lg leading-relaxed max-w-lg mb-6 lg:mb-10"
                        style={{
                            fontFamily: "var(--font-sans)",
                            y: descY,
                            opacity: descOpacity,
                        }}
                    >
                        {residence.description}
                    </motion.p>

                    {/* Features Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6"
                        style={{
                            y: featuresY,
                            opacity: featuresOpacity,
                        }}
                    >
                        {residence.features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#E1B19B]/20 flex items-center justify-center shrink-0 border border-[#E1B19B]/30">
                                        <Icon size={14} className="text-[#E1B19B]" strokeWidth={2} />
                                    </div>
                                    <span
                                        className="text-[#FFF3E1]/80 text-[13px] tracking-wider uppercase font-medium"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {feature.text}
                                    </span>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function FeaturesResidencial() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="relative bg-[#1F1D1B]" style={{ height: `${residences.length * 150}vh` }}>
            {/* Section label */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-14 pt-16">
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#E1B19B] uppercase"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [RESIDENCIAS]
                    </p>
                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                        <motion.div className="w-24 lg:w-40 h-px bg-white/10 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-[#E1B19B]"
                                style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                            />
                        </motion.div>
                        <span className="text-[10px] text-[#E1B19B]" style={{ fontFamily: "var(--font-sans)" }}>
                            {residences.length}
                        </span>
                    </div>
                </div>

                {/* Vertical scroll cards */}
                <div className="relative w-full h-full">
                    {residences.map((residence, i) => (
                        <ResidenceCard
                            key={residence.id}
                            residence={residence}
                            index={i}
                            totalResidences={residences.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
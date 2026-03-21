"use client";

import { motion } from "motion/react";

import { EXPERIENCIAS_TITLE_PATHS } from "./experienciasTitlePaths";

const OUTER_G_TRANSFORM = "matrix(1,0,0,1,-462.7,-1485.2)";
const LETTER_G_TRANSFORM = "matrix(1.744749,0,0,0.681499,-1704.100573,263.976581)";

const pathReveal = {
    hidden: { pathLength: 0, fill: "rgba(34, 34, 34, 0)" },
    visible: {
        pathLength: 1,
        fill: "rgba(34, 34, 34, 1)",
        transition: {
            pathLength: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
            fill: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const },
        },
    },
};

export default function HeroExperiencias() {
    return (
        <section className="relative flex min-h-[40vh] md:min-h-[60vh] w-full py-14 md:py-20 items-center justify-center overflow-hidden bg-[#fff8ed]">
            <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-7xl text-center mt-12 md:mt-16">
                <div className="w-full flex flex-col items-center mb-6">
                    <p
                        className="text-[10px] sm:text-xs tracking-[0.3em] text-[#AA7D69] uppercase mb-6 sm:mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [Actividades para disfrutar]
                    </p>

                    <motion.svg
                        role="img"
                        aria-label="Experiencias"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.08,
                                    delayChildren: 0.05,
                                },
                            },
                        }}
                        initial="hidden"
                        animate="visible"
                        viewBox="0 0 2496 221"
                        className="w-full h-auto max-w-[680px] pb-2 px-4 sm:px-8"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g transform={OUTER_G_TRANSFORM}>
                            {EXPERIENCIAS_TITLE_PATHS.map((d, i) => (
                                <g key={i} transform={LETTER_G_TRANSFORM}>
                                    <motion.path
                                        d={d}
                                        variants={pathReveal}
                                        stroke="#222222"
                                        strokeWidth="2"
                                    />
                                </g>
                            ))}
                        </g>
                    </motion.svg>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-md"
                >
                    <p
                        className="text-[#222222]/80 text-lg md:text-xl font-medium leading-relaxed mb-4"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        El club ofrece una amplia gama de actividades para disfrutar, desde gimnasios hasta restaurantes y spa.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

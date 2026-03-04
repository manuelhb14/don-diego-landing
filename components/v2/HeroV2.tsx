"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function HeroV2() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.45, 0.75]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

    return (
        <section ref={ref} className="relative flex h-dvh min-h-[600px] w-full overflow-hidden bg-[#111]">
            {/* Parallax background */}
            <motion.div className="absolute inset-0 w-full h-[130%]" style={{ y: bgY }}>
                <Image
                    src="/images/renders/render-1.png"
                    alt="Don Diego"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </motion.div>

            {/* Gradient overlays */}
            <motion.div
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

            {/* Top rule */}
            <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

            {/* Content */}
            <motion.div
                className="relative z-10 flex h-full w-full flex-col justify-between p-6 lg:p-10"
                style={{ y: contentY }}
            >
                {/* Top: tagline block upper-right */}
                <div className="flex justify-end pt-20 lg:pt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                        className="max-w-[280px] lg:max-w-xs text-right"
                    >
                        <p
                            className="text-white/90 text-sm lg:text-base leading-snug mb-3 uppercase tracking-[0.12em]"
                            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                        >
                            Vivir en Conexión
                        </p>
                        <p
                            className="text-white/55 text-[11px] leading-relaxed tracking-wider"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Un santuario donde la arquitectura se encuentra con la naturaleza.
                            Diseñado para una conexión más profunda.
                        </p>
                        <div className="mt-5 flex justify-end items-center gap-2">
                            <div className="h-px w-8 bg-white/30" />
                            <a
                                href="#proyecto"
                                className="text-[10px] tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                SCROLL
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/*  Bottom: Giant title */}
                <div className="pb-8 lg:pb-10">
                    {/* Location label */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-[11px] tracking-[0.3em] text-white/40 uppercase mb-4"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        San Miguel de Allende
                    </motion.p>

                    {/* Main word mark */}
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "110%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-white font-light leading-none tracking-tight"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(5rem, 17vw, 18rem)",
                                lineHeight: 0.88,
                            }}
                        >
                            DON
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "110%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="text-white font-light leading-none tracking-tight"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(5rem, 17vw, 18rem)",
                                lineHeight: 0.88,
                            }}
                        >
                            DIEGO
                        </motion.h1>
                    </div>

                    {/* Tagline below */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="mt-5 flex items-center gap-6"
                    >
                        <div className="h-px w-12 bg-[#E1B19B]/60" />
                        <p
                            className="text-[11px] tracking-[0.22em] text-[#E1B19B]/80 uppercase"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Arraigado en San Miguel
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

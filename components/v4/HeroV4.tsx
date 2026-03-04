"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function HeroV4() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const leftScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    const rightScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.6]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    return (
        <section ref={ref} className="relative h-dvh min-h-[700px] w-full overflow-hidden bg-dark">
            {/* Split-screen images */}
            <div className="absolute inset-0 flex">
                {/* Left — Heritage: entrance cantera stone */}
                <motion.div className="relative w-1/2 h-full overflow-hidden" style={{ scale: leftScale }}>
                    <Image
                        src="/images/renders/entrance.jpg"
                        alt="Entrada arquitectónica en cantera — herencia colonial"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </motion.div>

                {/* Right — Modern: contemporary render */}
                <motion.div className="relative w-1/2 h-full overflow-hidden" style={{ scale: rightScale }}>
                    <Image
                        src="/images/renders/render-1.png"
                        alt="Render arquitectónico contemporáneo — Don Diego"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </motion.div>

                {/* Center divider line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/15 z-10" />
            </div>

            {/* Unified dark overlay */}
            <motion.div className="absolute inset-0 bg-dark" style={{ opacity: overlayOpacity }} />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-dark/30" />

            {/* Content centered overlay */}
            <motion.div
                className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center"
                style={{ y: contentY }}
            >
                {/* Location tag */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase mb-8"
                >
                    San Miguel de Allende, Guanajuato
                </motion.p>

                {/* Main headline — Louize */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-white leading-[1.05] max-w-5xl"
                        style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
                    >
                        Donde la Historia Vive{" "}
                        <em className="text-terracotta">en Conexión</em>
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-6 text-white/45 text-sm lg:text-base max-w-xl leading-relaxed"
                >
                    Un desarrollo residencial que integra la herencia de la antigua
                    Hacienda de Don Diego con diseño contemporáneo y vida sustentable.
                </motion.p>

                {/* Heritage labels */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-10 flex items-center gap-6"
                >
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[9px] font-bold tracking-[0.2em] text-white/25 uppercase">Herencia</span>
                        <span className="text-[9px] tracking-wider text-terracotta/50">Colonial</span>
                    </div>
                    <div className="h-px w-12 bg-terracotta/30" />
                    <a
                        href="#proyecto"
                        className="text-[11px] font-bold tracking-[0.18em] text-terracotta/80 hover:text-terracotta uppercase transition-colors duration-300"
                    >
                        Conoce más
                    </a>
                    <div className="h-px w-12 bg-terracotta/30" />
                    <div className="hidden sm:flex flex-col items-start">
                        <span className="text-[9px] font-bold tracking-[0.2em] text-white/25 uppercase">Diseño</span>
                        <span className="text-[9px] tracking-wider text-terracotta/50">Contemporáneo</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom: scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <motion.div
                    className="w-px h-10 bg-white/20 origin-top"
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
}

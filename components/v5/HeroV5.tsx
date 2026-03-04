"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MapPin } from "lucide-react";

export default function HeroV5() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={ref} className="relative flex h-dvh min-h-[700px] w-full items-center justify-center overflow-hidden bg-[#111]">
            {/* Full-bleed background image */}
            <motion.div
                className="absolute inset-0 z-0 h-full w-full overflow-hidden"
                style={{ scale: imgScale }}
            >
                <Image
                    src="/images/renders/render-1.png"
                    alt="Don Diego — Club Residencial"
                    fill
                    priority
                    className="object-cover object-center"
                />
                {/* Gradient overlay to ensure text is readable */}
                {/* <div className="absolute inset-0 bg-black/40" /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            </motion.div>

            {/* Centered content block */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center px-4 md:px-8 text-center w-full max-w-4xl"
                style={{ y: contentY }}
            >
                {/* Location tag */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-sm tracking-[0.3em] text-[#FFF3E1] uppercase mb-6 lg:mb-8"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    [DESARROLLO RESIDENCIAL]
                </motion.p>

                {/* Title */}
                <div className="flex flex-col items-center">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[#FFF3E1] leading-none tracking-tight mt-2"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(4.5rem, 12vw, 12rem)",
                                lineHeight: 0.88,
                            }}
                        >
                            DON
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[#FFF3E1] leading-none tracking-tight mt-2"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(4.5rem, 12vw, 12rem)",
                                lineHeight: 0.88,
                            }}
                        >
                            DIEGO
                        </motion.h1>
                    </div>
                </div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-6 lg:mt-8 max-w-md"
                >
                    <p
                        className="text-[#FFF3E1]/80 text-base lg:text-lg leading-relaxed mb-6"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Un santuario donde la arquitectura se encuentra con la naturaleza.
                        Diseñado para una vida en conexión.
                    </p>
                    <motion.a
                        href="#proyecto"
                        whileHover={{ y: 2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="inline-flex items-center justify-center gap-4 group"
                    >
                        <span className="h-px w-8 bg-[#FFF3E1]/40 group-hover:w-12 transition-all duration-500" />
                        <span
                            className="text-[11px] tracking-[0.2em] text-[#FFF3E1] uppercase"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Explorar
                        </span>
                        <span className="h-px w-8 bg-[#FFF3E1]/40 group-hover:w-12 transition-all duration-500" />
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Bottom-right tag */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 flex items-center gap-2 z-10"
            >
                <MapPin className="w-5 h-5 text-[#FFF3E1]" />
                <p
                    className="text-base font-normal text-[#FFF3E1]"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    San Miguel de Allende
                </p>
            </motion.div>
        </section>
    );
}

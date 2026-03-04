"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MapPin } from "lucide-react";

export default function HeroV3() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

    return (
        <section ref={ref} className="relative flex h-dvh min-h-[700px] w-full overflow-hidden bg-[#111]">
            {/* Split layout */}
            <div className="relative z-10 flex h-full w-full flex-col lg:flex-row">

                {/* Left panel — cream with text */}
                <motion.div
                    className="relative flex flex-col justify-end lg:justify-center w-full lg:w-[45%] bg-[#FFF3E1] px-8 py-20 lg:px-16 lg:py-24 z-10 order-2 lg:order-1"
                    style={{ y: contentY }}
                >
                    {/* Decorative vertical line */}
                    {/* <motion.div
                        className="absolute top-8 left-8 lg:top-16 lg:left-16 w-px bg-[#AA7D69]/30"
                        initial={{ height: 0 }}
                        animate={{ height: 80 }}
                        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                    /> */}

                    {/* Location tag */}
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-xs tracking-[0.3em] text-[#AA7D69]/70 uppercase mb-6 lg:mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [DESARROLLO RESIDENCIAL]
                    </motion.p>

                    {/* Title — outlined + filled */}
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[#222] leading-none tracking-tight mt-2"
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
                            className="text-[#222] leading-none tracking-tight mt-2"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(4.5rem, 12vw, 12rem)",
                                lineHeight: 0.88,
                            }}
                        >
                            DIEGO
                        </motion.h1>
                    </div>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-2 lg:mt-4 max-w-md"
                    >
                        <p
                            className="text-[#222]/50 text-base lg:text-lg leading-relaxed mb-4"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Un santuario donde la arquitectura se encuentra con la naturaleza.
                            Diseñado para una vida en conexión.
                        </p>
                        <motion.a
                            href="#proyecto"
                            whileHover={{ x: 6 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="inline-flex items-center gap-4 group"
                        >
                            <span className="h-px w-10 bg-[#AA7D69]/40 group-hover:w-16 transition-all duration-500" />
                            <span
                                className="text-[11px] tracking-[0.2em] text-[#AA7D69] uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                Explorar
                            </span>
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Right panel — full-bleed image with clip-path reveal */}
                <motion.div
                    className="relative w-full lg:w-[55%] h-[45vh] lg:h-full overflow-hidden order-1 lg:order-2"
                    initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                    animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
                        <Image
                            src="/images/renders/render-1.png"
                            alt="Don Diego — Club Residencial"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </motion.div>
                    {/* Gradient overlay for blending */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#111]/20 lg:to-[#FFF3E1]/10" />

                    {/* Bottom-right tag */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 flex items-center gap-2"
                    >
                        <MapPin className="w-5 h-5 text-[#222]" />
                        <p
                            className="text-base font-normal text-[#222]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            San Miguel de Allende
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

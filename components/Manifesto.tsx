"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Manifesto() {
    const containerRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress: textScrollProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const { scrollYProgress: imageScrollProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"], // Extends the tracking to keep images moving as you scroll past
    });

    // Text scroll-linked opacity sequences
    // We break the scroll into phases:
    // 0.20 - 0.35: Scroll in "Con la Tierra"
    // 0.50 - 0.65: Scroll in "Con la Comunidad"
    // 0.80 - 0.95: Scroll in "Con uno Mismo"

    const tierraOpacity = useTransform(textScrollProgress, [0.2, 0.35, 1], [0, 1, 1]);
    const comunidadOpacity = useTransform(textScrollProgress, [0.5, 0.65, 1], [0, 1, 1]);
    const mismoOpacity = useTransform(textScrollProgress, [0.8, 0.95, 1], [0, 1, 1]);

    // Global fade out near the end so it transitions cleanly to the next section
    const textGroupOpacity = useTransform(textScrollProgress, [0, 1], [1, 1]);
    const scrollIndicatorOpacity = useTransform(textScrollProgress, [0, 0.06, 0.42, 0.5], [0, 0.45, 0.45, 0]);

    // Image Parallax transforms
    // Mapped over the entire screen visibility range ("start end" to "end start")
    const y1 = useTransform(imageScrollProgress, [0, 1], ["40%", "-60%"]); // Top left (slow up)
    const y2 = useTransform(imageScrollProgress, [0, 1], ["70%", "-80%"]); // Mid right (medium up)
    const y3 = useTransform(imageScrollProgress, [0, 1], ["100%", "-90%"]); // Bottom left (fast up)

    const y4 = useTransform(imageScrollProgress, [0, 1], ["50%", "-70%"]); // Top right (medium up)
    const y5 = useTransform(imageScrollProgress, [0, 1], ["60%", "-50%"]); // Far left (slow up)
    const y6 = useTransform(imageScrollProgress, [0, 1], ["110%", "-100%"]); // Bottom right (fast up)

    // Opacities linked to text appearance
    // Group 1: With "Con la Tierra" (0.20 - 0.35)
    const op1 = useTransform(textScrollProgress, [0.2, 0.35, 1], [0, 1, 1]);
    const op4 = useTransform(textScrollProgress, [0.25, 0.40, 1], [0, 1, 1]);

    // Group 2: With "Con la Comunidad" (0.50 - 0.65)
    const op2 = useTransform(textScrollProgress, [0.5, 0.65, 1], [0, 1, 1]);
    const op5 = useTransform(textScrollProgress, [0.55, 0.70, 1], [0, 1, 1]);

    // Group 3: With "Con uno Mismo" (0.80 - 0.95)
    const op3 = useTransform(textScrollProgress, [0.8, 0.95, 1], [0, 1, 1]);
    const op6 = useTransform(textScrollProgress, [0.85, 0.98, 1], [0, 1, 1]);


    return (
        <section
            id="proyecto"
            ref={containerRef}
            className="relative bg-[#1F1D1B] w-full"
            style={{ height: "350vh" }} // Tall enough for comfortable scrolling
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* 
                  Background Parallax Images 
                  Option 1: Sized down and pushed partially off-screen on mobile.
                  Desktop has small collisions (around 10-15%).
                */}
                <motion.div className="absolute top-[10%] left-[8%] md:left-[10%] lg:left-[15%] w-30 md:w-32 lg:w-48 xl:w-64 aspect-[4/5] z-0" style={{ y: y1, opacity: op1 }}>
                    <Image src="/images/gallery/gallery-10.jpg" alt="Gallery" fill className="object-cover rounded-sm" />
                </motion.div>

                <motion.div className="absolute top-[18%] right-[8%] md:right-[5%] lg:right-[10%] w-28 md:w-32 lg:w-40 xl:w-56 aspect-square z-0" style={{ y: y4, opacity: op4 }}>
                    <Image src="/images/gallery/gallery-9.jpg" alt="Gallery" fill className="object-cover rounded-sm" />
                </motion.div>

                <motion.div className="absolute top-[45%] -right-[15%] md:right-[10%] lg:right-[15%] w-32 md:w-48 lg:w-56 xl:w-80 aspect-[3/4] z-0" style={{ y: y2, opacity: op2 }}>
                    <Image src="/images/gallery/gallery-15.jpg" alt="Gallery" fill className="object-cover rounded-sm shadow-2xl" />
                </motion.div>

                <motion.div className="absolute top-[60%] left-[-5%] md:left-[5%] lg:left-[8%] w-24 md:w-28 lg:w-32 xl:w-48 aspect-square z-0" style={{ y: y5, opacity: op5 }}>
                    <Image src="/images/gallery/gallery-13.jpg" alt="Gallery" fill className="object-cover rounded-sm" />
                </motion.div>

                <motion.div className="absolute bottom-[2%] md:bottom-[-10%] -left-[0%] md:left-[15%] lg:left-[20%] w-48 md:w-56 lg:w-60 xl:w-96 aspect-video z-0 border-4 md:border-8 border-[#1F1D1B] origin-bottom-left" style={{ y: y3, opacity: op3 }}>
                    <Image src="/images/gallery/gallery-11.jpg" alt="Gallery" fill className="object-cover rounded-sm" />
                </motion.div>

                <motion.div className="absolute bottom-[10%] md:bottom-[5%] right-[2%] md:right-[10%] lg:right-[15%] w-32 md:w-36 lg:w-44 xl:w-60 aspect-[4/3] z-0  origin-bottom-right" style={{ y: y6, opacity: op6 }}>
                    <Image src="/images/gallery/gallery-12.jpg" alt="Gallery" fill className="object-cover rounded-sm" />
                </motion.div>


                {/* Foreground Centered Text */}
                <motion.div
                    className="relative z-10 flex flex-col items-center justify-center text-center pb-32 md:pb-0 px-6 mix-blend-difference"
                    style={{ opacity: textGroupOpacity }}
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#AA7D69] uppercase mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [Qué nos define]
                    </p>

                    <h2
                        className="text-[#E6E1D6] leading-none mb-12"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3.5rem, 8vw, 8rem)",
                        }}
                    >
                        Arraigado en <br /><span className="italic text-[#8C7B6C]">San Miguel</span>
                    </h2>

                    <div
                        className="flex flex-col items-center justify-center gap-4 lg:gap-6 w-full max-w-3xl"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(1.5rem, 3vw, 3rem)",
                        }}
                    >
                        <motion.p className="text-[#D7D7AA] italic self-start ml-4 md:ml-12" style={{ opacity: tierraOpacity }}>
                            Con la Tierra.
                        </motion.p>
                        <motion.p className="text-[#D7D7AA] italic self-center" style={{ opacity: comunidadOpacity }}>
                            Con la Comunidad.
                        </motion.p>
                        <motion.p className="text-[#D7D7AA] italic self-end mr-4 md:mr-12" style={{ opacity: mismoOpacity }}>
                            Con uno Mismo.
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[#E6E1D6]/85"
                    style={{ opacity: scrollIndicatorOpacity }}
                    aria-label="Desliza para explorar el manifiesto"
                >
                    <span
                        className="text-[9px] uppercase tracking-[0.24em]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Desliza
                    </span>
                    <div className="relative h-10 w-px bg-[#E6E1D6]/60">
                        <motion.span
                            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#E6E1D6]/95"
                            animate={
                                shouldReduceMotion
                                    ? undefined
                                    : {
                                        y: [0, 22, 0],
                                        opacity: [0.15, 0.55, 0.15],
                                    }
                            }
                            transition={
                                shouldReduceMotion
                                    ? undefined
                                    : {
                                        duration: 2.4,
                                        ease: [0.215, 0.61, 0.355, 1],
                                        repeat: Number.POSITIVE_INFINITY,
                                    }
                            }
                        />
                    </div>
                    <span className="sr-only">Desliza para explorar el manifiesto</span>
                </motion.div>

            </div>
        </section>
    );
}

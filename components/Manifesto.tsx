"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";

export default function Manifesto() {
    const tm = useTranslations("manifesto");
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress: textScrollProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const { scrollYProgress: imageScrollProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"], // Extends the tracking to keep images moving as you scroll past
    });

    // Tracks the scroll from when the section enters the bottom of the screen until it hits the top (sticky start)
    const { scrollYProgress: approachProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    const approachFade = useTransform(approachProgress, [0, 1], [0, 1]);

    // Text scroll-linked opacity sequences
    // We break the scroll into phases (tuned to feel responsive):
    // 0.00 - 0.20: "Con la Tierra" settles
    // 0.32 - 0.52: "Con la Comunidad" arrives
    // 0.56 - 0.76: "Con uno Mismo" arrives

    // Start subtle, reach full opacity once the section is fully in view.
    const tierraOpacity = useTransform(textScrollProgress, [0, 0.2, 1], [0.35, 1, 1]);
    const comunidadOpacity = useTransform(textScrollProgress, [0.32, 0.52, 1], [0, 1, 1]);
    const mismoOpacity = useTransform(textScrollProgress, [0.56, 0.76, 1], [0, 1, 1]);

    // Global fade out near the end so it transitions cleanly to the next section
    const textGroupOpacity = useTransform(textScrollProgress, [0, 1], [1, 1]);

    // Image Parallax transforms
    // Mapped over the entire screen visibility range ("start end" to "end start")
    const y1 = useTransform(imageScrollProgress, [0, 1], ["40%", "-60%"]); // Top left (slow up)
    const y2 = useTransform(imageScrollProgress, [0, 1], ["70%", "-80%"]); // Mid right (medium up)
    const y3 = useTransform(imageScrollProgress, [0, 1], ["100%", "-90%"]); // Bottom left (fast up)

    const y4 = useTransform(imageScrollProgress, [0, 1], ["50%", "-70%"]); // Top right (medium up)
    const y5 = useTransform(imageScrollProgress, [0, 1], ["60%", "-50%"]); // Far left (slow up)
    const y6 = useTransform(imageScrollProgress, [0, 1], ["110%", "-100%"]); // Bottom right (fast up)

    // Opacities linked to text appearance
    // Group 1: With "Con la Tierra" (0.00 - 0.20)
    // First ones: Top Left (op1) and Bottom Right (op6)
    const op1 = useTransform(textScrollProgress, [0, 0.2, 1], [0.35, 1, 1]);
    const op6 = useTransform(textScrollProgress, [0, 0.2, 1], [0.35, 1, 1]);

    // Group 2: With "Con la Comunidad" (0.32 - 0.52)
    // Keep these images fully hidden until their phase begins.
    const op2 = useTransform(textScrollProgress, [0, 0.32, 0.52, 1], [0, 0, 1, 1]);
    const op5 = useTransform(textScrollProgress, [0, 0.36, 0.56, 1], [0, 0, 1, 1]);

    // Group 3: With "Con uno Mismo" (0.56 - 0.76)
    // Keep these images fully hidden until their phase begins.
    const op3 = useTransform(textScrollProgress, [0, 0.56, 0.76, 1], [0, 0, 1, 1]);
    const op4 = useTransform(textScrollProgress, [0, 0.60, 0.80, 1], [0, 0, 1, 1]);

    // Logic: while approaching (before progress 1), scale from 0 to 25%.
    // Once progress hits 1 (sticky), jump to op values (starting at 35%).
    const imgOp1 = useTransform([approachFade, op1], (latest: number[]) => latest[0] < 1 ? latest[0] * 0.25 : latest[1]);
    const imgOp6 = useTransform([approachFade, op6], (latest: number[]) => latest[0] < 1 ? latest[0] * 0.25 : latest[1]);

    // Group 2/3: do NOT fade in during the approach phase.
    // They must remain at 0 opacity until their text phase starts.
    const imgOp2 = op2;
    const imgOp5 = op5;

    const imgOp3 = op3;
    const imgOp4 = op4;


    return (
        <section
            id="proyecto"
            ref={containerRef}
            className="relative bg-[#fff8ed] w-full"
            style={{ height: "200vh" }} // Slightly shorter so the animation progresses faster
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* 
                  Background Parallax Images 
                  Option 1: Sized down and pushed partially off-screen on mobile.
                  Desktop has small collisions (around 10-15%).
                */}
                <motion.div className="absolute top-[3%] sm:top-[8%] md:top-[10%] left-[1%] sm:left-[7%] md:left-[6%] lg:left-[8%] w-42 sm:w-52 md:w-56 lg:w-60 xl:w-72 aspect-[4/5] z-0" style={{ y: y1, opacity: imgOp1 }}>
                    <EditableImage contentKey="home.manifesto.image.1" fallbackSrc="/final/tierra1.webp" alt="Gallery" fill className="object-cover rounded-sm" />
                </motion.div>

                <motion.div className="absolute top-[14%] sm:top-[17%] right-[-14%] sm:right-[7%] md:right-[7%] lg:right-[10%] w-48 sm:w-48 md:w-52 lg:w-56 xl:w-64 aspect-square z-0" style={{ y: y4, opacity: imgOp4 }}>
                    <EditableImage contentKey="home.manifesto.image.2" fallbackSrc="/final/mismo2.webp" alt="Gallery" fill className="object-cover rounded-sm" />
                </motion.div>

                <motion.div className="absolute top-[52%] sm:top-[37%] -right-[20%] sm:-right-[6%] md:-right-[2%] lg:right-[4%] w-44 sm:w-52 md:w-64 lg:w-72 xl:w-80 aspect-[3/4] z-0" style={{ y: y2, opacity: imgOp2 }}>
                    <EditableImage contentKey="home.manifesto.image.3" fallbackSrc="/final/comunidad1.webp" alt="Gallery" fill className="object-cover rounded-sm shadow-2xl" />
                </motion.div>

                <motion.div className="absolute top-[60%] sm:top-[59%] left-[-28%] sm:left-[-3%] md:left-[1%] lg:left-[8%] w-52 sm:w-60 md:w-72 lg:w-80 xl:w-96 aspect-[4/3] z-0" style={{ y: y5, opacity: imgOp5 }}>
                    <EditableImage contentKey="home.manifesto.image.4" fallbackSrc="/final/comunidad2.webp" alt="Gallery" fill className="object-cover rounded-sm" />
                </motion.div>

                <motion.div className="absolute bottom-[2%] sm:bottom-[0%] md:bottom-[-3%] -left-[20%] sm:left-[4%] md:left-[15%] lg:left-[20%] w-56 sm:w-60 md:w-72 lg:w-80 xl:w-96 aspect-video z-0 origin-bottom-left" style={{ y: y3, opacity: imgOp3 }}>
                    <EditableImage contentKey="home.manifesto.image.5" fallbackSrc="/final/tierra2.webp" alt="Gallery" fill className="object-cover rounded-sm" />
                </motion.div>

                <motion.div className="absolute bottom-[10%] sm:bottom-[8%] md:bottom-[5%] right-[0%] sm:right-[2%] md:right-[6%] lg:right-[2%] w-52 sm:w-56 md:w-64 lg:w-64 xl:w-80 aspect-[4/3] z-0  origin-bottom-right" style={{ y: y6, opacity: imgOp6 }}>
                    <EditableImage contentKey="home.manifesto.image.6" fallbackSrc="/final/mismo1.webp" alt="Gallery" fill className="object-cover rounded-sm" />
                </motion.div>


                {/* Foreground Centered Text (always above images) */}
                <motion.div
                    className="relative z-10 flex flex-col items-center justify-center text-center pb-20 sm:pb-16 md:pb-0 px-6 mix-blend-difference"
                    style={{ opacity: textGroupOpacity }}
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#AA7D69] uppercase mb-8"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        <EditableText contentKey="home.manifesto.kicker" fallback={tm("kicker")} />
                    </p>

                    <h2
                        className="text-[#222222] leading-none mb-12"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3.5rem, 8vw, 8rem)",
                        }}
                    >
                        <EditableText contentKey="home.manifesto.titleRooted" fallback={tm("titleRooted")} /> <br />
                        <span className="italic text-[#6e5947]"><EditableText contentKey="home.manifesto.titlePlace" fallback={tm("titlePlace")} /></span>
                    </h2>

                    <div
                        className="flex flex-col items-center justify-center gap-4 lg:gap-6 w-full max-w-3xl"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(1.5rem, 3vw, 3rem)",
                        }}
                    >
                        <motion.p className="text-[#6F7F52] italic self-start ml-4 md:ml-12" style={{ opacity: tierraOpacity }}>
                            <EditableText contentKey="home.manifesto.lineEarth" fallback={tm("lineEarth")} />
                        </motion.p>
                        <motion.p className="text-[#6F7F52] italic self-center" style={{ opacity: comunidadOpacity }}>
                            <EditableText contentKey="home.manifesto.lineCommunity" fallback={tm("lineCommunity")} />
                        </motion.p>
                        <motion.p className="text-[#6F7F52] italic self-end mr-11 md:mr-12" style={{ opacity: mismoOpacity }}>
                            <EditableText contentKey="home.manifesto.lineSelf" fallback={tm("lineSelf")} />
                        </motion.p>
                    </div>
                </motion.div>

                {/* <motion.div
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
                </motion.div> */}

            </div>
        </section>
    );
}

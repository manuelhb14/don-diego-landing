"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";

export default function Manifesto() {
    const locale = useLocale();
    const tm = useTranslations("manifesto");
    const shouldReduceMotion = useReducedMotion();
    const scrollCueLabel = locale === "es" ? "Desliza" : "Scroll";
    const scrollCueDescription = locale === "es" ? "Desliza para explorar el manifiesto" : "Scroll to explore the manifesto";
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress: textScrollProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const { scrollYProgress: imageScrollProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const { scrollYProgress: approachProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    const approachFade = useTransform(approachProgress, [0, 1], [0, 1]);

    // Text scroll-linked opacity sequences
    // 0.00 - 0.20: "Con la Tierra" settles
    // 0.32 - 0.52: "Con la Comunidad" arrives
    // 0.56 - 0.85: "Con uno Mismo" arrives
    const tierraOpacity = useTransform(textScrollProgress, [0, 0.2, 1], [0.35, 1, 1]);
    const comunidadOpacity = useTransform(textScrollProgress, [0.32, 0.52, 1], [0, 1, 1]);
    const mismoOpacity = useTransform(textScrollProgress, [0.56, 0.85, 1], [0, 1, 1]);

    const textGroupOpacity = useTransform(textScrollProgress, [0, 1], [1, 1]);

    // Image parallax transforms
    const y1 = useTransform(imageScrollProgress, [0, 1], ["40%", "-60%"]);
    const y2 = useTransform(imageScrollProgress, [0, 1], ["70%", "-80%"]);
    const y3 = useTransform(imageScrollProgress, [0, 1], ["100%", "-90%"]);
    const y4 = useTransform(imageScrollProgress, [0, 1], ["50%", "-70%"]);
    const y5 = useTransform(imageScrollProgress, [0, 1], ["60%", "-50%"]);
    const y6 = useTransform(imageScrollProgress, [0, 1], ["110%", "-100%"]);

    const op1 = useTransform(textScrollProgress, [0, 0.2, 1], [0.35, 1, 1]);
    const op6 = useTransform(textScrollProgress, [0, 0.2, 1], [0.35, 1, 1]);
    const op2 = useTransform(textScrollProgress, [0, 0.32, 0.52, 1], [0, 0, 1, 1]);
    const op5 = useTransform(textScrollProgress, [0, 0.36, 0.56, 1], [0, 0, 1, 1]);
    const op3 = useTransform(textScrollProgress, [0, 0.56, 0.85, 1], [0, 0, 1, 1]);
    const op4 = useTransform(textScrollProgress, [0, 0.60, 0.88, 1], [0, 0, 1, 1]);

    const imgOp1 = useTransform([approachFade, op1], (latest: number[]) => latest[0] < 1 ? latest[0] * 0.25 : latest[1]);
    const imgOp6 = useTransform([approachFade, op6], (latest: number[]) => latest[0] < 1 ? latest[0] * 0.25 : latest[1]);
    const imgOp2 = op2;
    const imgOp5 = op5;
    const imgOp3 = op3;
    const imgOp4 = op4;

    const scrollIndicatorOpacity = useTransform(textScrollProgress, [0, 0.08], [1, 0]);

    const dot1Active = useTransform(textScrollProgress, [0, 0.2], [0, 1]);
    const dot2Active = useTransform(textScrollProgress, [0.32, 0.52], [0, 1]);
    const dot3Active = useTransform(textScrollProgress, [0.56, 0.85], [0, 1]);

    return (
        <div id="proyecto">

            {/* Mobile layout (hidden on md+) */}
            <section className="block md:hidden bg-[#fff8ed] pt-14">

                {/* Header */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="px-5 mb-10"
                >
                    <p
                        className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-[#AA7D69]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        <EditableText contentKey="home.manifesto.kicker" fallback={tm("kicker")} />
                    </p>
                    <h2
                        className="text-[#222222] leading-none text-center"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 11vw, 5rem)",
                        }}
                    >
                        <EditableText contentKey="home.manifesto.titleRooted" fallback={tm("titleRooted")} />
                        <br />
                        <span className="italic text-[#6e5947]">
                            <EditableText contentKey="home.manifesto.titlePlace" fallback={tm("titlePlace")} />
                        </span>
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-3 px-5 pb-6">

                {/* Phase 1: text bottom-left */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-[16/9] w-[92%] overflow-hidden rounded-sm"
                >
                    <EditableImage contentKey="home.manifesto.image.1" fallbackSrc="/final/tierra1.webp" alt={tm("lineEarth")} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <p
                        className="absolute bottom-5 left-5 text-[#FFF3E1] italic leading-none"
                        style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 5.5vw, 2rem)" }}
                    >
                        <EditableText contentKey="home.manifesto.lineEarth" fallback={tm("lineEarth")} />
                    </p>
                </motion.div>

                {/* Phase 2: text bottom-center */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="relative ml-auto aspect-[16/9] w-[88%] overflow-hidden rounded-sm"
                >
                    <EditableImage contentKey="home.manifesto.image.3" fallbackSrc="/final/comunidad1.webp" alt={tm("lineCommunity")} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <p
                        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[#FFF3E1] italic leading-none text-center whitespace-nowrap"
                        style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 5.5vw, 2rem)" }}
                    >
                        <EditableText contentKey="home.manifesto.lineCommunity" fallback={tm("lineCommunity")} />
                    </p>
                </motion.div>

                {/* Phase 3: text bottom-right */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="relative aspect-[16/9] w-[92%] overflow-hidden rounded-sm"
                >
                    <EditableImage contentKey="home.manifesto.image.6" fallbackSrc="/final/mismo1.webp" alt={tm("lineSelf")} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <p
                        className="absolute bottom-5 right-5 text-[#FFF3E1] italic leading-none text-right"
                        style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 5.5vw, 2rem)" }}
                    >
                        <EditableText contentKey="home.manifesto.lineSelf" fallback={tm("lineSelf")} />
                    </p>
                </motion.div>

                </div>

            </section>

            {/* Desktop layout (hidden below md) */}
            <section
                ref={containerRef}
                className="hidden md:block relative bg-[#fff8ed] w-full"
                style={{ height: "160vh" }}
            >
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                    <motion.div className="absolute top-[8%] left-[7%] w-52 md:w-56 lg:w-60 xl:w-72 aspect-[4/5] z-0" style={{ y: shouldReduceMotion ? 0 : y1, opacity: shouldReduceMotion ? 0.9 : imgOp1 }}>
                        <EditableImage contentKey="home.manifesto.image.1" fallbackSrc="/final/tierra1.webp" alt={tm("lineEarth")} fill className="object-cover rounded-sm" />
                    </motion.div>

                    <motion.div className="absolute top-[17%] right-[7%] md:right-[7%] lg:right-[10%] w-48 md:w-52 lg:w-56 xl:w-64 aspect-square z-0" style={{ y: shouldReduceMotion ? 0 : y4, opacity: shouldReduceMotion ? 0.9 : imgOp4 }}>
                        <EditableImage contentKey="home.manifesto.image.2" fallbackSrc="/final/mismo2.webp" alt={tm("lineSelf")} fill className="object-cover rounded-sm" />
                    </motion.div>

                    <motion.div className="absolute top-[37%] -right-[6%] md:-right-[2%] lg:right-[4%] w-52 md:w-64 lg:w-72 xl:w-80 aspect-[3/4] z-0" style={{ y: shouldReduceMotion ? 0 : y2, opacity: shouldReduceMotion ? 0.9 : imgOp2 }}>
                        <EditableImage contentKey="home.manifesto.image.3" fallbackSrc="/final/comunidad1.webp" alt={tm("lineCommunity")} fill className="object-cover rounded-sm shadow-2xl" />
                    </motion.div>

                    <motion.div className="absolute top-[59%] left-[-3%] md:left-[1%] lg:left-[8%] w-60 md:w-72 lg:w-80 xl:w-96 aspect-[4/3] z-0" style={{ y: shouldReduceMotion ? 0 : y5, opacity: shouldReduceMotion ? 0.9 : imgOp5 }}>
                        <EditableImage contentKey="home.manifesto.image.4" fallbackSrc="/final/comunidad2.webp" alt={tm("lineCommunity")} fill className="object-cover rounded-sm" />
                    </motion.div>

                    <motion.div className="absolute bottom-[0%] md:bottom-[-3%] left-[4%] md:left-[15%] lg:left-[20%] w-60 md:w-72 lg:w-80 xl:w-96 aspect-video z-0 origin-bottom-left" style={{ y: shouldReduceMotion ? 0 : y3, opacity: shouldReduceMotion ? 0.9 : imgOp3 }}>
                        <EditableImage contentKey="home.manifesto.image.5" fallbackSrc="/final/tierra2.webp" alt={tm("lineEarth")} fill className="object-cover rounded-sm" />
                    </motion.div>

                    <motion.div className="absolute bottom-[8%] md:bottom-[5%] right-[2%] md:right-[6%] lg:right-[2%] w-56 md:w-64 lg:w-64 xl:w-80 aspect-[4/3] z-0 origin-bottom-right" style={{ y: shouldReduceMotion ? 0 : y6, opacity: shouldReduceMotion ? 0.9 : imgOp6 }}>
                        <EditableImage contentKey="home.manifesto.image.6" fallbackSrc="/final/mismo1.webp" alt={tm("lineSelf")} fill className="object-cover rounded-sm" />
                    </motion.div>

                    {/* Foreground centered text */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center justify-center text-center px-6 mix-blend-difference"
                        style={{ opacity: shouldReduceMotion ? 1 : textGroupOpacity }}
                    >
                        <p
                            className="mb-8 text-xs uppercase tracking-[0.3em] text-[#AA7D69]"
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
                            <span className="italic text-[#6e5947]">
                                <EditableText contentKey="home.manifesto.titlePlace" fallback={tm("titlePlace")} />
                            </span>
                        </h2>

                        <div
                            className="flex flex-col items-center justify-center gap-4 lg:gap-6 w-full max-w-3xl"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.5rem, 3vw, 3rem)",
                            }}
                        >
                            <motion.p className="text-[#6F7F52] italic self-start ml-4 md:ml-12" style={{ opacity: shouldReduceMotion ? 1 : tierraOpacity }}>
                                <EditableText contentKey="home.manifesto.lineEarth" fallback={tm("lineEarth")} />
                            </motion.p>
                            <motion.p className="text-[#6F7F52] italic self-center" style={{ opacity: shouldReduceMotion ? 1 : comunidadOpacity }}>
                                <EditableText contentKey="home.manifesto.lineCommunity" fallback={tm("lineCommunity")} />
                            </motion.p>
                            <motion.p className="text-[#6F7F52] italic self-end mr-11 md:mr-12" style={{ opacity: shouldReduceMotion ? 1 : mismoOpacity }}>
                                <EditableText contentKey="home.manifesto.lineSelf" fallback={tm("lineSelf")} />
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Scroll cue — fades once user starts scrolling */}
                    <span className="sr-only">{scrollCueDescription}</span>
                    <motion.div
                        className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[#222222]/50"
                        style={{ opacity: shouldReduceMotion ? 0 : scrollIndicatorOpacity }}
                        aria-hidden
                    >
                        <span
                            className="text-[9px] uppercase tracking-[0.24em]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {scrollCueLabel}
                        </span>
                        <div className="relative h-10 w-px bg-[#222222]/30">
                            <motion.span
                                className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#222222]/70"
                                animate={
                                    shouldReduceMotion
                                        ? undefined
                                        : { y: [0, 22, 0], opacity: [0.15, 0.55, 0.15] }
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
                    </motion.div>

                    {/* 3-dot progress indicator */}
                    <motion.div
                        className="pointer-events-none absolute right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2.5"
                        style={{ opacity: shouldReduceMotion ? 0 : approachFade }}
                        aria-hidden
                    >
                        {([dot1Active, dot2Active, dot3Active] as const).map((active, i) => (
                            <div key={i} className="relative h-2 w-2">
                                <div className="absolute inset-0 rounded-full bg-[#222222]/15" />
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-[#6F7F52]"
                                    style={{ opacity: active, scale: active }}
                                />
                            </div>
                        ))}
                    </motion.div>

                </div>
            </section>

        </div>
    );
}

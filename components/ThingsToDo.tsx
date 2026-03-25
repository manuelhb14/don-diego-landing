"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useMemo, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type ExclusivityItem = {
    id: string;
    title: string;
    imageSrc?: string; // optional for now; you can add later
};

function ParallaxCardImage({
    imageSrc,
    title,
    y,
    reduceMotion,
}: {
    imageSrc: string;
    title: string;
    y: MotionValue<string>;
    reduceMotion: boolean;
}) {
    return (
        <div className="relative overflow-hidden bg-[#EFE6DC] aspect-[7/8]">
            <motion.div
                className="absolute left-0 right-0 h-[145%] w-full -top-[22.5%]"
                style={reduceMotion ? undefined : { y }}
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover object-[center_58%]"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 490px"
                />
            </motion.div>
        </div>
    );
}

export default function ThingsToDo() {
    const hasVisited = useHasVisited();
    const reduceMotion = useReducedMotion();
    const tt = useTranslations("thingsToDo");
    const items = useMemo<ExclusivityItem[]>(
        () => [
            { id: "clubhouse", title: tt("items.clubhouse"), imageSrc: "/babylon/clubhouse.webp" },
            { id: "piscina", title: tt("items.pool"), imageSrc: "/babylon/pool.webp" },
            { id: "gimnasio", title: tt("items.gym"), imageSrc: "/babylon/gym.webp" },
            { id: "spa", title: tt("items.spa"), imageSrc: "/babylon/spa.webp" },
            { id: "restaurante", title: tt("items.restaurant"), imageSrc: "/babylon/restaurant.webp" },
            { id: "padel", title: tt("items.padel"), imageSrc: "/babylon/padel.webp" },
        ],
        [tt],
    );

    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-11%"]);

    return (
        <section ref={sectionRef} className="overflow-visible bg-[#F6F0E8]">
            <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16 py-12 lg:py-16">
                <motion.div
                    initial={hasVisited ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {tt("kicker")}
                    </p>
                    <h2
                        className="text-[#222] leading-none"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)",
                        }}
                    >
                        {tt("title1")}
                    </h2>
                    <h2
                        className="text-[#AA7D69]/90 italic"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)",
                        }}
                    >
                        {tt("title2")}
                    </h2>
                </motion.div>

                <div className="relative mt-8">
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.05 }}
                        ref={scrollerRef}
                        className={[
                            "relative flex gap-0 overflow-x-auto pb-5",
                            "-mx-6 md:-mx-10 lg:-mx-16",
                            "pl-3 md:pl-5 lg:pl-8 pr-6 md:pr-8",
                            "scrollbar-none snap-x snap-mandatory",
                            "select-none",
                        ].join(" ")}
                        style={{
                            WebkitOverflowScrolling: "touch",
                            scrollbarWidth: "none",
                        }}
                    >
                        {/* <div
                            aria-hidden="true"
                            className="shrink-0 snap-start border border-[#222222]/[0.08] bg-transparent p-4"
                            style={{ width: "56px" }}
                        >
                            <div className="aspect-[3/4]" />
                            <div className="h-12" />
                        </div> */}

                        {items.map((item, idx) => (
                            <div
                                key={item.id}
                                className={[
                                    "min-w-[300px] sm:min-w-[360px] lg:min-w-[490px] snap-start border border-[#222222]/[0.08] bg-transparent p-4 -ml-px",
                                    idx === 0 ? "z-[1]" : "",
                                ].join(" ")}
                            >
                                {item.imageSrc ? (
                                    <ParallaxCardImage
                                        imageSrc={item.imageSrc}
                                        title={item.title}
                                        y={imageParallaxY}
                                        reduceMotion={!!reduceMotion}
                                    />
                                ) : (
                                    <div className="relative overflow-hidden bg-[#EFE6DC] aspect-[7/8]">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#E7DCCE] via-[#EFE6DC] to-[#E1D4C5]" />
                                    </div>
                                )}

                                <div className="pt-4 flex items-center justify-between gap-4">
                                    <div
                                        className="text-xl lg:text-2xl text-[#222222]/70"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {item.title}
                                    </div>

                                    {/* <button
                                        type="button"
                                        aria-label={`Abrir ${item.title}`}
                                        className="h-8 w-8 rounded-full border border-[#222222]/25 text-[#222222]/60 hover:text-[#222222] hover:border-[#222222]/35 transition-colors grid place-items-center"
                                    >
                                        <span className="text-[18px] leading-none">+</span>
                                    </button> */}
                                </div>
                            </div>
                        ))}

                        <div className="min-w-[70px] snap-start p-4 -ml-px flex flex-col items-center justify-center">
                            <div className="aspect-square grid place-items-center bg-[#222222] rounded-full p-2">
                                <Link
                                    aria-label={tt("nextAria")}
                                    className="w-full h-full cursor-pointer flex flex-col items-center justify-center"
                                    href="/experiencias"
                                >
                                    <span className="text-white text-2xl lg:text-3xl leading-none w-full h-full flex items-center justify-center p-2">
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </span>
                                </Link>
                            </div>
                            <div className="pt-4 h-8" />
                        </div>
                    </motion.div>
                </div>
                
                    {/* Bottom Right: Paragraph & Link */}
                    <div className="flex justify-center mt-10 md:mt-12 w-full mb-12 md:mb-0">
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="w-full sm:w-[60%] lg:w-[50%] flex flex-col items-end"
                        >
                            <p className="text-[#222] text-xl font-medium leading-relaxed mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                                {tt("body")}
                            </p>
                            <Link
                                href="/experiencias"
                                className="inline-block text-[#222] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-[#222] pb-1 hover:opacity-60 transition-opacity"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {tt("cta")}
                            </Link>
                        </motion.div>
                    </div>

            </div>
        </section>
    );
}

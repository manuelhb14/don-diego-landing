"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function LocationSummaryProyecto() {
    const t = useTranslations("pages.proyecto.locationSummary");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section className="relative w-full overflow-hidden bg-[#15120F] px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-22">
            <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] lg:items-center lg:gap-16 xl:gap-24">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={revealTransition()}
                    className="group relative aspect-[16/10] overflow-hidden rounded-sm border border-[#FFF3E1]/10 bg-[#2A2826] shadow-[0_30px_60px_rgba(12,10,8,0.22)] lg:aspect-[16/9]"
                >
                    <Image
                        src="/images/location/aerial-2.png"
                        alt={t("imageAlt")}
                        fill
                        className="object-cover object-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-safe:group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15120F]/35 via-transparent to-[#15120F]/10" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#15120F]/60 to-transparent" />
                </motion.div>

                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={revealTransition(0.16)}
                    className="flex w-full flex-col items-start"
                >
                    <p
                        className="mb-5 text-xs uppercase tracking-[0.3em] text-[#B76D4B]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("kicker")}
                    </p>

                    <h2
                        className="mb-6 max-w-[680px] text-[#FFF3E1] md:mb-8"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 5.8vw, 5.75rem)",
                            lineHeight: 0.98,
                            letterSpacing: "0",
                        }}
                    >
                        {t("titleLine1")} <br />
                        <span className="italic text-[#B76D4B]">{t("titleLine2")}</span>
                    </h2>

                    <p
                        className="max-w-[560px] text-base font-medium leading-relaxed text-[#FFF3E1]/75 md:text-xl"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {t("body")}
                    </p>

                    <Link
                        href="/ubicacion"
                        className="group mt-9 inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#B76D4B] transition-opacity duration-300 hover:opacity-80 md:mt-10"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("cta")}
                        <span className="h-px w-7 bg-[#B76D4B] transition-all duration-300 group-hover:w-10" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

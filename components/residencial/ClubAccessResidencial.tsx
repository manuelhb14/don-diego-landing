"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { residentialSectionHeadingStyle } from "@/components/residencial/residentialTypography";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const gallery = [
    { src: "/babylon/clubhouse.webp" },
    { src: "/babylon/spa.webp" },
    { src: "/babylon/restaurant.webp" },
] as const;

export default function ClubAccessResidencial() {
    const t = useTranslations("pages.residencial.clubAccess");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section
            aria-labelledby="club-access-heading"
            className="overflow-hidden bg-[#15120F] py-12 text-[#FFF3E1] md:py-14 lg:py-16"
        >
            <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-12">
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition()}
                        className="max-w-xl lg:max-w-none"
                    >
                        <p
                            className="mb-5 text-xs uppercase tracking-[0.3em] text-[#B76D4B]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            id="club-access-heading"
                            className="text-[#FFF3E1]"
                            style={residentialSectionHeadingStyle}
                        >
                            {t("titleLine1")} <span className="italic text-[#B76D4B]">{t("titleAccent")}</span>
                        </h2>
                        <p
                            className="mt-5 text-[#B76D4B] italic"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.2rem, 2vw, 1.65rem)",
                            }}
                        >
                            {t("subtitle")}
                        </p>
                        <p
                            className="mt-6 max-w-[620px] text-base font-medium leading-relaxed text-[#FFF3E1]/75 md:text-xl"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t("body")}
                        </p>
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={revealTransition(0.16)}
                            className="mt-7"
                        >
                            <Link
                                href="/experiencias"
                                className="inline-block border-b border-[#B76D4B]/70 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFF3E1] transition-opacity hover:opacity-70 lg:text-[11px]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("cta")}
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.12)}
                        className="w-full min-w-0 lg:max-w-[680px] lg:justify-self-end"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.25)] lg:aspect-[2.55/1]">
                                <Image
                                    src={gallery[0].src}
                                    alt={t("alts.clubhouse")}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 42vw, 100vw"
                                    priority={false}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                                    <Image
                                        src={gallery[1].src}
                                        alt={t("alts.spa")}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 21vw, 50vw"
                                    />
                                </div>
                                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                                    <Image
                                        src={gallery[2].src}
                                        alt={t("alts.restaurant")}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 21vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

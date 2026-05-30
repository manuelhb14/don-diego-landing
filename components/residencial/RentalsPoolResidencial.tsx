"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { residentialSectionHeadingStyle } from "@/components/residencial/residentialTypography";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function RentalsPoolResidencial() {
    const t = useTranslations("pages.residencial.rentals");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section
            id="rentals"
            aria-labelledby="rentals-pool-heading"
            className="overflow-hidden border-t border-[#1F1D1B]/[0.06] bg-[#FFF8ED] py-16 text-[#1F1D1B] md:py-20 lg:py-24"
        >
            <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition()}
                        className="order-2 lg:order-1 min-w-0"
                    >
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm shadow-[0_20px_50px_rgba(47,39,33,0.10)] lg:aspect-[3/2]">
                            <Image
                                src="/babylon/rental.webp"
                                alt={t("imageAlt")}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 42vw, 100vw"
                                unoptimized
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.12)}
                        className="order-1 lg:order-2 max-w-xl lg:max-w-none"
                    >
                        <p
                            className="mb-5 text-xs uppercase tracking-[0.3em] text-[#B76D4B]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            id="rentals-pool-heading"
                            className="text-[#1F1D1B]"
                            style={residentialSectionHeadingStyle}
                        >
                            {t("titleLine1")}<br /><span className="italic text-[#B76D4B]">{t("titleLine2")}</span>
                        </h2>
                        <p
                            className="mt-5 text-[#B76D4B] italic"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.15rem, 2vw, 1.65rem)",
                            }}
                        >
                            {t("subtitle")}
                        </p>
                        <p
                            className="mt-6 max-w-[620px] text-base font-medium leading-relaxed text-[#1F1D1B]/78 md:text-xl"
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
                                href="/proximamente"
                                className="inline-block border-b border-[#1F1D1B] pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1F1D1B] transition-opacity hover:opacity-60 lg:text-[11px]"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t("cta")}
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

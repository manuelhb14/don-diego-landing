"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function RentalsPoolResidencial() {
    const t = useTranslations("pages.residencial.rentals");
    return (
        <section
            id="rentals"
            aria-labelledby="rentals-pool-heading"
            className="bg-[#fff8ed] text-[#1F1D1B] py-10 lg:py-16 overflow-hidden border-t border-[#1F1D1B]/[0.06]"
        >
            <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1 min-w-0"
                    >
                        <div className="relative w-full aspect-[16/10] lg:aspect-[3/2] overflow-hidden rounded-sm border border-[#1F1D1B]/[0.08] shadow-[0_20px_50px_rgba(47,39,33,0.12)]">
                            <Image
                                src="/babylon/rental.webp"
                                alt={t("imageAlt")}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 42vw, 100vw"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.05 }}
                        className="order-1 lg:order-2 max-w-xl lg:max-w-none"
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#b76d4b]/85 uppercase mb-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            id="rentals-pool-heading"
                            className="text-[#1F1D1B] leading-[1.08]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                            }}
                        >
                            {t("titleLine1")}<br /><span className="italic text-[#b76d4b]">{t("titleLine2")}</span>
                        </h2>
                        <p
                            className="mt-4 text-[#b76d4b]/95 italic"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.15rem, 2vw, 1.65rem)",
                            }}
                        >
                            {t("subtitle")}
                        </p>
                        <p
                            className="mt-5 text-[#1F1D1B]/80 text-base lg:text-[17px] leading-relaxed"
                            style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                        >
                            {t("body")}
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="mt-7"
                        >
                            <Link
                                href="/proximamente"
                                className="inline-block text-[#1F1D1B] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-[#1F1D1B] pb-1 hover:opacity-60 transition-opacity"
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

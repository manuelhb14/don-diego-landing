"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import EditableImage from "@/components/editor/EditableImage";
import EditableText from "@/components/editor/EditableText";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function EquipoNavigationBanner() {
    const t = useTranslations("pages.equipo.navigationBanner");
    const shouldReduceMotion = useReducedMotion() ?? false;
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    return (
        <section className="relative overflow-hidden bg-[#EFE6DC]">
            <div className="absolute inset-0">
                <EditableImage
                    contentKey="pages.equipo.navigationBanner.image"
                    fallbackSrc="/final/proyecto-banner.jpeg"
                    alt={t("imageAlt")}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(239,230,220,1)_0%,rgba(239,230,220,0.96)_32%,rgba(239,230,220,0.66)_46%,rgba(239,230,220,0.18)_62%,rgba(239,230,220,0)_78%)]" />

            <div className="relative z-10 mx-auto flex min-h-[260px] w-full max-w-[1440px] items-center md:min-h-[320px] lg:min-h-[360px]">
                <div className="max-w-[640px] px-6 py-12 md:px-10 md:py-14 lg:pl-16 lg:pr-12">
                    <motion.p
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition()}
                        className="mb-5 text-xs uppercase tracking-[0.28em] text-[#AA7D69]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        <EditableText contentKey="pages.equipo.navigationBanner.eyebrow" fallback={t("eyebrow")} />
                    </motion.p>
                    <motion.h2
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.06)}
                        className="mb-5 leading-[1.06] text-[#222222]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.15rem, 3.6vw, 3.25rem)",
                        }}
                    >
                        <EditableText contentKey="pages.equipo.navigationBanner.title1" fallback={t("title1")} />
                        <br />
                        <EditableText contentKey="pages.equipo.navigationBanner.title2" fallback={t("title2")} />{" "}
                        <em className="text-[#AA7D69]">
                            <EditableText contentKey="pages.equipo.navigationBanner.titleEm" fallback={t("titleEm")} />
                        </em>
                    </motion.h2>
                    <motion.p
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.12)}
                        className="mb-8 max-w-sm text-base leading-[1.72] text-[#222222]/68 lg:text-lg"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        <EditableText contentKey="pages.equipo.navigationBanner.subtitle" fallback={t("subtitle")} />
                    </motion.p>

                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.18)}
                        className="flex items-center"
                    >
                        <Link
                            href="/proyecto"
                            className="inline-flex items-center gap-1.5 border-b border-[#1F1D1B] pb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#1F1D1B] transition-opacity hover:opacity-60 lg:text-xs"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("project")}
                            <ArrowUpRight className="size-3.5 shrink-0 translate-y-px lg:size-4" aria-hidden />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

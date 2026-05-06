"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { useHasVisited } from "@/hooks/useHasVisited";
import EditableImage from "@/components/editor/EditableImage";
import EditableText from "@/components/editor/EditableText";

export default function EquipoNavigationBanner() {
    const t = useTranslations("pages.equipo.navigationBanner");
    const hasVisited = useHasVisited();

    return (
        <section className="relative overflow-hidden bg-[#fff8ed]">
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
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,248,237,1)_0%,rgba(255,248,237,1)_32%,rgba(255,248,237,0.72)_44%,rgba(255,248,237,0.14)_56%,rgba(255,248,237,0)_72%)]" />

            <div className="relative z-10 mx-auto flex min-h-[280px] w-full max-w-[1440px] items-center md:min-h-[340px] lg:min-h-[420px]">
                <div className="max-w-[640px] px-6 py-12 md:px-10 md:py-14 lg:py-20 lg:pl-16 lg:pr-12">
                    <motion.p
                        initial={hasVisited ? false : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-5 text-[10px] uppercase tracking-[0.28em] text-[#AA7D69] sm:text-xs"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        <EditableText contentKey="pages.equipo.navigationBanner.eyebrow" fallback={t("eyebrow")} />
                    </motion.p>
                    <motion.h2
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.05 }}
                        className="mb-5 leading-[1.1] text-[#222222]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 3.4vw, 3rem)",
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
                        initial={hasVisited ? false : { opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.12 }}
                        className="mb-8 max-w-sm text-base leading-[1.85] text-[#222222]/60 lg:text-lg"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        <EditableText contentKey="pages.equipo.navigationBanner.subtitle" fallback={t("subtitle")} />
                    </motion.p>

                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.18 }}
                        className="flex items-center"
                    >
                        <Link
                            href="/proyecto"
                            className="inline-flex items-center gap-1.5 border-b border-[#1F1D1B] pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#1F1D1B] transition-opacity hover:opacity-60 lg:text-[11px]"
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

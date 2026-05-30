"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Coffee, Mountain, PlayCircle } from "lucide-react";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function ConceptPresa() {
    const t = useTranslations("pages.presa.concept");
    const shouldReduceMotion = useReducedMotion() ?? false;

    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.78,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    const featureCards = [
        {
            id: "vistas",
            eyebrow: t("features.vistas.shortTitle"),
            title: t("features.vistas.title"),
            description: t("features.vistas.description"),
            Icon: Mountain,
        },
        {
            id: "encuentro",
            eyebrow: t("features.encuentro.shortTitle"),
            title: t("features.encuentro.title"),
            description: t("features.encuentro.description"),
            Icon: PlayCircle,
        },
        {
            id: "aire-libre",
            eyebrow: t("features.aireLibre.shortTitle"),
            title: t("features.aireLibre.title"),
            description: t("features.aireLibre.description"),
            Icon: Coffee,
        },
    ] as const;

    return (
        <section
            id="concepto"
            className="overflow-hidden bg-[#fff8ed] py-12 text-[#1a221f] lg:py-20"
            aria-label={t("sectionAriaLabel")}
        >
            <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-16">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={revealTransition()}
                    className="mb-8 max-w-[980px] lg:mb-12"
                >
                    <div>
                        <p
                            className="mb-4 text-xs tracking-[0.3em] text-[#5A7A8A] uppercase lg:mb-7"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("eyebrow")}
                        </p>
                        <h2
                            className="leading-[1.02] tracking-normal text-[#1a221f]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.75rem, 5vw, 4.75rem)",
                            }}
                        >
                            {t("title.base")} <span className="italic text-[#5A7A8A]">{t("title.accent")}</span>
                        </h2>
                    </div>
                </motion.div>

                <div className="presa-concept-layout">
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.04)}
                        className="presa-concept-media"
                    >
                        <Image
                            src="/final/presa.png"
                            alt={t("features.vistas.title")}
                            width={2400}
                            height={1340}
                            unoptimized
                            className="presa-concept-image"
                            priority
                            sizes="(min-width: 768px) 58vw, 100vw"
                        />
                    </motion.div>

                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.08)}
                        className="presa-concept-cards"
                    >
                        {featureCards.map((feature, index) => {
                            const Icon = feature.Icon;

                            return (
                                <article
                                    key={feature.id}
                                    className="presa-concept-card"
                                >
                                    <div className="mb-4 flex items-center justify-between gap-4">
                                        <span
                                            className="text-[10px] tracking-[0.26em] text-[#5A7A8A] uppercase"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {String(index + 1).padStart(2, "0")} {feature.eyebrow}
                                        </span>
                                        <span className="grid h-9 w-9 shrink-0 place-items-center border border-[#5A7A8A]/20 bg-[#FFF9F2] text-[#3d5a6b]">
                                            <Icon className="h-4.5 w-4.5" strokeWidth={1.6} aria-hidden />
                                        </span>
                                    </div>
                                    <h3
                                        className="text-[#1a221f]"
                                        style={{
                                            fontFamily: "var(--font-serif)",
                                            fontSize: "clamp(1.35rem, 1.65vw, 1.75rem)",
                                            lineHeight: 1.06,
                                        }}
                                    >
                                        {feature.title}
                                    </h3>
                                    <p
                                        className="mt-3 text-[0.95rem] leading-relaxed text-[#1a1917]/70 lg:text-base lg:leading-relaxed"
                                        style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
                                    >
                                        {feature.description}
                                    </p>
                                </article>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            <style>{`
                .presa-concept-layout {
                    display: grid;
                    gap: 20px;
                    align-items: stretch;
                }

                .presa-concept-media {
                    width: 100%;
                    overflow: hidden;
                    background: #ede5da;
                    box-shadow: 0 24px 54px rgba(26, 25, 23, 0.12);
                    box-shadow: 0 24px 54px rgba(26, 25, 23, 0.12), inset 0 0 0 1px rgba(26, 25, 23, 0.1);
                }

                .presa-concept-image {
                    display: block;
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                    object-position: center;
                }

                .presa-concept-cards {
                    display: grid;
                    gap: 12px;
                    min-width: 0;
                }

                .presa-concept-card {
                    display: flex;
                    min-height: 190px;
                    flex-direction: column;
                    border: 1px solid rgba(90, 122, 138, 0.18);
                    background: #f2efe8;
                    padding: 20px;
                    min-width: 0;
                }

                @media (min-width: 720px) {
                    .presa-concept-layout {
                        grid-template-columns: calc(58% - 14px) calc(42% - 14px);
                        gap: 28px;
                    }

                    .presa-concept-media {
                        min-height: 620px;
                    }

                    .presa-concept-image {
                        height: 100%;
                        min-height: 620px;
                    }

                    .presa-concept-card {
                        min-height: 0;
                    }
                }

                @media (min-width: 1180px) {
                    .presa-concept-layout {
                        grid-template-columns: calc(58% - 16px) calc(42% - 16px);
                        gap: 32px;
                    }

                    .presa-concept-media,
                    .presa-concept-image {
                        min-height: 600px;
                    }

                    .presa-concept-card {
                        padding: 24px;
                    }
                }
            `}</style>
        </section>
    );
}

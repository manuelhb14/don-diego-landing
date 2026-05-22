"use client";

import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import EnvironmentCarousel from "@/components/EnvironmentCarousel";
import { environmentCarouselSlides } from "@/content/environmentCarousels";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function ServicesV2() {
    const shouldReduceMotion = useReducedMotion() ?? false;
    const ts = useTranslations("servicesPage");
    const tProject = useTranslations("projectsEditorial");
    const revealTransition = (delay = 0) => ({
        duration: shouldReduceMotion ? 0 : 0.82,
        ease: EASE_OUT_CUBIC,
        delay: shouldReduceMotion ? 0 : delay,
    });

    const cards = [
        {
            id: "residencial",
            slides: environmentCarouselSlides.residencial,
            num: "01",
            title: tProject("residencial.title"),
            description: tProject("residencial.description"),
            details: [tProject("residencial.d1"), tProject("residencial.d2"), tProject("residencial.d3")],
            cta: tProject("residencial.cta"),
            href: "/residencial",
            accent: "#c68b70",
            ledColor: "#E1B19B",
            ledActive: true,
            statusLabel: ts("status.inDevelopment"),
            pending: false,
        },
        {
            id: "farm",
            slides: environmentCarouselSlides.farm,
            num: "02",
            title: tProject("farm.title"),
            description: tProject("farm.description"),
            details: [tProject("farm.d1"), tProject("farm.d2"), tProject("farm.d3")],
            cta: tProject("farm.cta"),
            href: "/farm",
            accent: "#b77c7e",
            ledColor: "#DEBEBF",
            ledActive: true,
            statusLabel: ts("status.inDevelopment"),
            pending: false,
        },
        {
            id: "presa",
            slides: environmentCarouselSlides.presa,
            num: "03",
            title: tProject("presa.title"),
            description: tProject("presa.description"),
            details: [tProject("presa.d1"), tProject("presa.d2"), tProject("presa.d3")],
            cta: tProject("presa.cta"),
            href: "/presa",
            accent: "#7a8ea3",
            ledColor: "#C8D7E6",
            ledActive: false,
            statusLabel: ts("status.comingSoon"),
            pending: true,
        },
        {
            id: "wellness",
            slides: environmentCarouselSlides.wellness,
            num: "04",
            title: tProject("wellness.title"),
            description: tProject("wellness.description"),
            details: [tProject("wellness.d1"), tProject("wellness.d2"), tProject("wellness.d3")],
            cta: tProject("wellness.cta"),
            href: "/wellness",
            accent: "#b8b267",
            ledColor: "#D7D7AA",
            ledActive: false,
            statusLabel: ts("status.comingSoon"),
            pending: true,
        },
    ];

    return (
        <section id="services" className="bg-[#fff8ed] text-[#222222] overflow-hidden">
            <div className="max-w-[1440px] mx-auto w-full pt-12 pb-16 lg:pt-24 lg:pb-24 px-6 md:px-10 lg:px-16">

                {/* Section header */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={revealTransition()}
                    className="mb-10 flex flex-col gap-5 md:items-end md:justify-between md:flex-row lg:mb-14"
                >
                    <div>
                        <p
                            className="mb-3 text-xs uppercase tracking-[0.3em] text-[#AA7D69]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {ts("kicker")}
                        </p>
                        <h2
                            className="leading-none text-[#222222]"
                            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 6rem)" }}
                        >
                            {ts("heading")}
                        </h2>
                    </div>
                    <p
                        className="max-w-md text-base font-medium leading-relaxed text-[#222222]/72 md:text-right md:text-xl"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {ts("intro")}
                    </p>
                </motion.div>

                {/* Services grid */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={revealTransition(0.16)}
                    className="-mx-5 grid grid-cols-1 px-5 md:-mx-6 md:border-x md:border-t md:px-6 lg:-mx-8 lg:grid-cols-2 lg:px-8"
                    style={{ borderColor: "#22222218" }}
                >
                    {cards.map((card, index) => (
                        <article
                            key={card.id}
                            className={`relative flex flex-col gap-5 py-7 lg:py-9 ${index % 2 === 0 ? "lg:pr-9" : "lg:pl-9 lg:border-l"} border-b`}
                            style={{ borderColor: "#22222215" }}
                        >
                            <Link
                                href={card.href}
                                className={`absolute top-7 hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] border-b pb-0.5 transition-opacity hover:opacity-60 active:translate-y-[1px] sm:inline-flex lg:top-9 ${index % 2 === 0 ? "right-0 lg:right-9" : "right-0"}`}
                                style={{
                                    color: card.accent,
                                    borderColor: card.accent,
                                    fontFamily: "var(--font-sans)",
                                }}
                            >
                                {card.cta}
                            </Link>

                            <div className="grid grid-cols-[2.25rem_1fr] gap-x-4 gap-y-4 md:gap-x-5">
                                <span
                                    className="mt-1 flex h-9 w-9 items-center justify-center border text-[10px] font-bold tracking-[0.1em]"
                                    style={{
                                        color: card.accent,
                                        borderColor: `${card.accent}55`,
                                        fontFamily: "var(--font-sans)",
                                    }}
                                >
                                    {card.num}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3
                                        className="text-[1.625rem] leading-[1.08] text-[#222222] md:text-[2rem]"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {card.title}
                                    </h3>
                                    <span
                                        className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]"
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            backgroundColor: card.pending ? "#EFE6DC" : "#eeeadb",
                                            color: card.pending ? "#6B6358" : "#6b6230",
                                            borderColor: card.pending ? "#d4ccc5" : "#ccc99a",
                                            opacity: card.pending ? 0.8 : 1,
                                        }}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${!card.pending && !shouldReduceMotion ? "animate-pulse" : ""}`}
                                            style={{
                                                backgroundColor: card.pending ? "#8C7B6C" : "#b8b267",
                                            }}
                                        />
                                        {card.statusLabel}
                                    </span>
                                </div>
                                <p
                                    className="col-span-2 max-w-[34rem] text-sm leading-[1.75] text-[#222222]/68 md:col-span-1 md:col-start-2 md:text-base"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {card.description}
                                </p>
                            </div>

                            <EnvironmentCarousel
                                slides={card.slides}
                                accent={card.accent}
                                className="aspect-[16/9] min-h-[220px] md:min-h-[340px] lg:min-h-[300px] xl:min-h-[340px]"
                                imageClassName={`object-center ${card.pending ? "saturate-[0.82] brightness-[0.95]" : ""}`}
                                sizes="(min-width: 1280px) 760px, (min-width: 1024px) 48vw, 100vw"
                            />

                            <div
                                className="grid grid-cols-1 gap-2 border-t pt-4 sm:grid-cols-[1fr_1fr_1fr_auto]"
                                style={{ borderColor: `${card.accent}30` }}
                            >
                                {card.details.map((detail) => (
                                    <span
                                        key={detail}
                                        className="text-xs leading-[1.45] text-[#222222]/62"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {detail}
                                    </span>
                                ))}
                                <div className="pt-2 sm:pt-0 sm:text-right">
                                    <Link
                                        href={card.href}
                                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] border-b pb-0.5 transition-opacity hover:opacity-60 active:translate-y-[1px] sm:hidden"
                                        style={{
                                            color: card.accent,
                                            borderColor: card.accent,
                                            fontFamily: "var(--font-sans)",
                                        }}
                                    >
                                        {card.cta}
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                                            <path d="M1 9L9 1M9 1H3.5M9 1V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </motion.div>

                {/* Closing CTA */}
                <div className="flex justify-center mt-10 md:mt-12 w-full mb-12 md:mb-0">
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={revealTransition(0.16)}
                        className="w-full sm:w-[60%] lg:w-[50%] flex flex-col items-end"
                    >
                        <p
                            className="mb-4 w-full text-left text-base font-medium leading-relaxed text-[#222222] md:text-xl"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {ts("closing")}
                        </p>
                        <Link
                            href="/proyecto"
                            className="inline-block text-[#222] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-[#222] pb-1 hover:opacity-60 transition-opacity"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {ts("cta")}
                        </Link>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

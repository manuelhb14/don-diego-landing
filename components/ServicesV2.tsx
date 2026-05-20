"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useHasVisited } from "@/hooks/useHasVisited";

export default function ServicesV2() {
    const hasVisited = useHasVisited();
    const ts = useTranslations("servicesPage");
    const tProject = useTranslations("projectsEditorial");

    const cards = [
        {
            id: "residencial",
            src: "/final/club-residencial.png",
            alt: "Club Residencial",
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
            src: "/final/farm.jpg",
            alt: "Organic Farm & Flowers",
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
            src: "/final/presa-de-la-cantera.png",
            alt: "Presa de la Cantera",
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
            src: "/final/wellness.png",
            alt: "Wellness Center",
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
                    initial={hasVisited ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 flex max-w-[980px] flex-col gap-5 lg:mb-14"
                >
                    <div>
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {ts("kicker")}
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 6rem)" }}
                        >
                            {ts("heading")}
                        </h2>
                    </div>
                    <p
                        className="max-w-[820px] text-base font-medium leading-relaxed text-[#222] md:text-xl"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {ts("intro")}
                    </p>
                </motion.div>

                {/* Services grid */}
                <motion.div
                    initial={hasVisited ? false : { opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="-mx-5 grid grid-cols-1 border-x border-t px-5 md:-mx-6 md:px-6 lg:-mx-8 lg:grid-cols-2 lg:px-8"
                    style={{ borderColor: "#22222218" }}
                >
                    {cards.map((card, index) => (
                        <article
                            key={card.id}
                            className={`flex flex-col gap-5 py-7 lg:py-9 ${index % 2 === 0 ? "lg:pr-9" : "lg:pl-9 lg:border-l"} border-b`}
                            style={{ borderColor: "#22222215" }}
                        >
                            <div className="flex items-start gap-4 md:gap-5">
                                <span
                                    className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center border text-[10px] font-bold tracking-[0.1em]"
                                    style={{
                                        color: card.accent,
                                        borderColor: `${card.accent}55`,
                                        fontFamily: "var(--font-sans)",
                                    }}
                                >
                                    {card.num}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-3 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#222]/45"
                                                style={{ fontFamily: "var(--font-sans)" }}
                                            >
                                                {card.statusLabel}
                                            </span>
                                            <span
                                                className={`h-2 w-2 rounded-full ${card.ledActive ? "animate-pulse" : ""}`}
                                                style={{
                                                    backgroundColor: card.ledColor,
                                                    opacity: card.ledActive ? 1 : 0.52,
                                                    boxShadow: card.ledActive
                                                        ? `0 0 5px 1px ${card.ledColor}80, 0 0 10px 2px ${card.ledColor}45`
                                                        : `inset 0 0 0 1px ${card.ledColor}80`,
                                                }}
                                            />
                                        </div>
                                        <Link
                                            href={card.href}
                                            className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] border-b pb-0.5 transition-opacity hover:opacity-60 active:translate-y-[1px] sm:inline-flex"
                                            style={{
                                                color: card.accent,
                                                borderColor: card.accent,
                                                fontFamily: "var(--font-sans)",
                                            }}
                                        >
                                            {card.cta}
                                        </Link>
                                    </div>
                                    <h3
                                        className="text-[1.75rem] leading-[1.05] text-[#222] md:text-[2.2rem]"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {card.title}
                                    </h3>
                                    <p
                                        className="mt-4 max-w-[34rem] text-[15px] leading-[1.75] text-[#222]/68 md:text-base"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {card.description}
                                    </p>
                                </div>
                            </div>

                            <div className="relative aspect-[16/9] min-h-[260px] overflow-hidden bg-[#efe2d0] md:min-h-[340px] lg:min-h-[300px] xl:min-h-[340px]">
                                <Image
                                    src={card.src}
                                    alt={card.alt}
                                    fill
                                    className={`object-cover ${card.pending ? "saturate-[0.82] brightness-[0.95]" : ""}`}
                                    sizes="(min-width: 1280px) 760px, (min-width: 1024px) 48vw, 100vw"
                                />
                            </div>

                            <div
                                className="grid grid-cols-1 gap-2 border-t pt-4 sm:grid-cols-[1fr_1fr_1fr_auto]"
                                style={{ borderColor: `${card.accent}30` }}
                            >
                                {card.details.map((detail) => (
                                    <span
                                        key={detail}
                                        className="text-[12px] leading-[1.45] text-[#222]/62"
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
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full sm:w-[60%] lg:w-[50%] flex flex-col items-end"
                    >
                        <p
                            className="w-full text-left text-[#222] text-base md:text-xl font-medium leading-relaxed mb-4"
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

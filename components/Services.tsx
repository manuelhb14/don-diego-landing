"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useTranslations } from "next-intl";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function Services() {
    const hasVisited = useHasVisited();
    const ts = useTranslations("servicesPage");
    const tp = useTranslations("project");
    const tProject = useTranslations("projectsEditorial");
    const [mobileCarouselApi, setMobileCarouselApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    const serviceCards = [
        {
            id: "residencial",
            src: "/final/club-residencial.png",
            alt: tp("residencial.name"),
            line1: ts("cardClubL1"),
            line2: ts("cardClubL2"),
            title: tProject("residencial.title"),
            description: tProject("residencial.description"),
            supporting: tProject("residencial.supporting"),
            details: [tProject("residencial.d1"), tProject("residencial.d2"), tProject("residencial.d3")],
            cta: tProject("residencial.cta"),
            href: "/residencial",
            detailImage: "/final/residencial.png",
            accent: "#c68b70",
            accentSoft: "#ead7cc",
            desktopClass: "w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 self-start order-1 relative z-10",
            transition: { duration: 1, ease: "easeOut" as const },
            imageScaleClass: "group-hover:scale-105",
            ledColor: "#E1B19B",
            ledActive: true,
            statusLabel: ts("status.inDevelopment"),
            pending: false,
        },
        {
            id: "farm",
            src: "/final/farm.jpg",
            alt: tp("farm.name"),
            line1: ts("cardFarmL1"),
            line2: ts("cardFarmL2"),
            title: tProject("farm.title"),
            description: tProject("farm.description"),
            supporting: tProject("farm.supporting"),
            details: [tProject("farm.d1"), tProject("farm.d2"), tProject("farm.d3")],
            cta: tProject("farm.cta"),
            href: "/farm",
            detailImage: "/final/organic-farm.png",
            accent: "#b77c7e",
            accentSoft: "#debebf",
            desktopClass: "w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 md:pt-8 lg:pt-6 self-end md:self-start order-2 relative z-20 mt-4 md:mt-0 right-0",
            transition: { duration: 1, delay: 0.15, ease: "easeOut" as const },
            imageScaleClass: "group-hover:scale-[1.03]",
            ledColor: "#DEBEBF",
            ledActive: true,
            statusLabel: ts("status.inDevelopment"),
            pending: false,
        },
        {
            id: "wellness",
            src: "/final/wellness.png",
            alt: tp("wellness.name"),
            line1: ts("cardWellnessL1"),
            line2: ts("cardWellnessL2"),
            title: tProject("wellness.title"),
            description: tProject("wellness.description"),
            supporting: tProject("wellness.supporting"),
            details: [tProject("wellness.d1"), tProject("wellness.d2"), tProject("wellness.d3")],
            cta: tProject("wellness.cta"),
            href: "/wellness",
            detailImage: "/final/wellness-center.png",
            accent: "#b8b267",
            accentSoft: "#d7d7aa",
            desktopClass: "w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 md:pt-16 lg:pt-12 self-start order-3 relative z-30 mt-4 md:mt-0 text-left",
            transition: { duration: 1, delay: 0.3, ease: "easeOut" as const },
            imageScaleClass: "group-hover:scale-105",
            ledColor: "#D7D7AA",
            ledActive: false,
            statusLabel: ts("status.comingSoon"),
            pending: true,
        },
        {
            id: "presa",
            src: "/final/presa-de-la-cantera.png",
            alt: tp("presa.name"),
            line1: ts("cardPresaL1"),
            line2: ts("cardPresaL2"),
            title: tProject("presa.title"),
            description: tProject("presa.description"),
            supporting: tProject("presa.supporting"),
            details: [tProject("presa.d1"), tProject("presa.d2"), tProject("presa.d3")],
            cta: tProject("presa.cta"),
            href: "/presa",
            detailImage: "/final/presa.png",
            accent: "#7a8ea3",
            accentSoft: "#dbe3ea",
            desktopClass: "w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 md:pt-24 lg:pt-18 self-end md:self-start order-4 relative z-40 mt-4 md:mt-0 right-0",
            transition: { duration: 1, delay: 0.45, ease: "easeOut" as const },
            imageScaleClass: "group-hover:scale-[1.03]",
            ledColor: "#C8D7E6",
            ledActive: false,
            statusLabel: ts("status.comingSoon"),
            pending: true,
        },
    ];

    const selectedCard = serviceCards[selectedCardIndex] ?? serviceCards[0];

    useEffect(() => {
        if (!mobileCarouselApi) return;
        const t = setTimeout(() => {
            setTotalSlides(mobileCarouselApi.scrollSnapList().length);
            setCurrentSlide(mobileCarouselApi.selectedScrollSnap());
        }, 0);

        const onSelect = () => {
            const index = mobileCarouselApi.selectedScrollSnap();
            setCurrentSlide(index);
            setSelectedCardIndex(index);
        };

        mobileCarouselApi.on("select", onSelect);
        mobileCarouselApi.on("reInit", onSelect);

        return () => {
            clearTimeout(t);
            mobileCarouselApi.off("select", onSelect);
            mobileCarouselApi.off("reInit", onSelect);
        };
    }, [mobileCarouselApi]);

    return (
        <section id="services" className="bg-[#fff8ed] text-[#222222] overflow-hidden relative">
            <div className="max-w-[1440px] mx-auto w-full py-12 lg:pt-24 px-6 md:px-10 lg:px-16 flex flex-col">

                {/* Top Section: Headers & Intro Paragraph */}
                <div className="w-full flex justify-between items-end mb-4 lg:mb-8">
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
                            {ts("kicker")}
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 6rem)"
                            }}
                        >
                            {ts("heading")}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:flex"
                    >
                        <p className="text-[#222]/80 text-base leading-[1.8] font-normal tracking-[0.01em] w-[350px] text-right font-serif">
                            {ts("intro")}
                        </p>
                    </motion.div>
                </div>

                {/* Mobile Text (Visible only on small screens) */}
                <motion.div
                    initial={hasVisited ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex lg:hidden mb-8 md:mb-16"
                >
                    <div className="w-full">
                        <p className="text-[#222]/80 text-lg leading-[1.8] font-normal tracking-[0.01em] w-full font-serif">
                            {ts("intro")}
                        </p>
                    </div>
                </motion.div>

                {/* Bottom Section: Staggered Image Cards */}
                <div className="w-full flex flex-col">
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="lg:hidden w-full"
                    >
                        <Carousel
                            setApi={setMobileCarouselApi}
                            opts={{ align: "start", loop: false }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {serviceCards.map((card) => (
                                    <CarouselItem key={card.id} className="basis-[88%] sm:basis-[72%]">
                                        <article className="block relative w-full aspect-[3/4] md:aspect-square group overflow-hidden">
                                            <Image
                                                src={card.src}
                                                alt={card.alt}
                                                fill
                                                className={`object-cover transition-all duration-1000 ${card.imageScaleClass} ${card.pending ? "saturate-[0.82] brightness-[0.92]" : ""}`}
                                            />
                                            <div className={`absolute inset-0 transition-colors duration-500 ${card.pending ? "bg-[#fff8ed]/18" : "bg-black/10"}`}></div>
                                            <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                                                <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white drop-shadow-md" style={{ fontFamily: "var(--font-sans)" }}>
                                                    {card.statusLabel}
                                                </span>
                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full ${card.ledActive ? "animate-pulse" : ""}`}
                                                    style={{
                                                        backgroundColor: card.ledColor,
                                                        opacity: card.ledActive ? 1 : 0.52,
                                                        boxShadow: card.ledActive ? `0 0 5px 1px ${card.ledColor}80, 0 0 10px 2px ${card.ledColor}45` : `inset 0 0 0 1px ${card.ledColor}80`,
                                                    }}
                                                />
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-3 text-center">
                                                <h3
                                                    className="text-white text-[13px] font-medium uppercase tracking-[0.15em] leading-snug drop-shadow-md"
                                                    style={{ fontFamily: "var(--font-sans)" }}
                                                >
                                                    {card.line1}<br />{card.line2}
                                                </h3>
                                            </div>
                                        </article>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                        <div className="flex items-center justify-between mt-4 px-1">
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalSlides }).map((_, index) => (
                                    <button
                                        key={`service-dot-${index}`}
                                        type="button"
                                        onClick={() => {
                                            setSelectedCardIndex(index);
                                            mobileCarouselApi?.scrollTo(index);
                                        }}
                                        aria-label={`Go to slide ${index + 1}`}
                                        className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-5" : "w-2"}`}
                                        style={{ backgroundColor: currentSlide === index ? serviceCards[currentSlide]?.accent : `${serviceCards[index]?.accent}55` }}
                                    />
                                ))}
                            </div>
                            <span
                                className="text-[10px] tracking-[0.12em] tabular-nums"
                                style={{ color: serviceCards[currentSlide]?.accent, fontFamily: "var(--font-sans)" }}
                            >
                                {String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
                            </span>
                        </div>
                    </motion.div>

                    <div className="hidden lg:flex flex-row justify-between gap-2 lg:gap-8 items-start w-full">
                        {serviceCards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial={hasVisited ? false : { opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={card.transition}
                                className={card.desktopClass}
                            >
                                <button
                                    type="button"
                                    onClick={() => setSelectedCardIndex(index)}
                                    aria-pressed={selectedCardIndex === index}
                                    aria-describedby="services-selected-component"
                                    className={`block relative w-full aspect-[2/3] group cursor-pointer overflow-hidden text-left transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${selectedCardIndex === index ? "" : "opacity-80 hover:opacity-100"}`}
                                    style={{
                                        outlineColor: card.accent,
                                        boxShadow: selectedCardIndex === index ? `0 0 0 1px ${card.accent}, 0 0 0 5px #fff8ed` : "none",
                                    }}
                                >
                                    <Image
                                        src={card.src}
                                        alt={card.alt}
                                        fill
                                        className={`object-cover transition-all duration-1000 ${card.imageScaleClass} ${card.pending ? "saturate-[0.82] brightness-[0.92]" : ""}`}
                                    />
                                    <div className={`absolute inset-0 transition-colors duration-500 ${card.pending ? "bg-[#fff8ed]/18 group-hover:bg-[#fff8ed]/12" : "bg-black/10 group-hover:bg-black/0"}`}></div>
                                    <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                                        <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white drop-shadow-md" style={{ fontFamily: "var(--font-sans)" }}>
                                            {card.statusLabel}
                                        </span>
                                        <span
                                            className={`h-2.5 w-2.5 rounded-full ${card.ledActive ? "animate-pulse" : ""}`}
                                            style={{
                                                backgroundColor: card.ledColor,
                                                opacity: card.ledActive ? 1 : 0.52,
                                                boxShadow: card.ledActive ? `0 0 5px 1px ${card.ledColor}80, 0 0 10px 2px ${card.ledColor}45` : `inset 0 0 0 1px ${card.ledColor}80`,
                                            }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2 sm:p-4 text-center">
                                        <h3
                                            className="text-white text-[11px] xl:text-[12px] font-medium uppercase tracking-[0.15em] leading-snug drop-shadow-md"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {card.line1}<br />{card.line2}
                                        </h3>
                                    </div>
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        id="services-selected-component"
                        initial={hasVisited ? false : { opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-8 grid gap-8 border-y py-6 md:mt-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:py-8"
                        style={{ borderColor: `${selectedCard.accent}38`, transition: "border-color 0.5s ease" }}
                    >
                        <motion.div
                            key={`text-${selectedCard.id}`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-[680px]"
                        >
                            <p
                                className="mb-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em]"
                                style={{ color: selectedCard.accent, fontFamily: "var(--font-sans)" }}
                            >
                                <span
                                    className={`h-2 w-2 rounded-full ${selectedCard.ledActive ? "animate-pulse" : ""}`}
                                    style={{
                                        backgroundColor: selectedCard.ledColor,
                                        opacity: selectedCard.ledActive ? 1 : 0.52,
                                    }}
                                />
                                {selectedCard.statusLabel}
                            </p>
                            <h3
                                className="text-4xl leading-[0.98] text-[#222] md:text-[3.25rem] lg:text-[3.5rem]"
                                style={{ fontFamily: "var(--font-serif)" }}
                            >
                                {selectedCard.title}
                            </h3>
                            <p className="mt-7 text-base font-medium leading-[1.7] text-[#222]/84 md:text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                                {selectedCard.description}
                            </p>
                            <p className="mt-4 text-sm leading-[1.7] text-[#222]/64 md:text-base" style={{ fontFamily: "var(--font-serif)" }}>
                                {selectedCard.supporting}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2.5">
                                {selectedCard.details.map((detail) => (
                                    <span
                                        key={detail}
                                        className="border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em]"
                                        style={{
                                            backgroundColor: `${selectedCard.accentSoft}40`,
                                            borderColor: `${selectedCard.accent}40`,
                                            color: selectedCard.accent,
                                            fontFamily: "var(--font-sans)",
                                        }}
                                    >
                                        {detail}
                                    </span>
                                ))}
                            </div>
                            <Link
                                href={selectedCard.href}
                                className="mt-7 inline-block text-[10px] font-bold uppercase tracking-[0.16em] text-[#222] underline decoration-1 underline-offset-8 transition-opacity hover:opacity-60"
                                style={{ fontFamily: "var(--font-sans)", textDecorationColor: selectedCard.accent }}
                            >
                                {selectedCard.cta}
                            </Link>
                        </motion.div>

                        <motion.div
                            key={`image-${selectedCard.id}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                            className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/9] lg:ml-auto"
                            style={{
                                backgroundColor: selectedCard.accentSoft,
                                boxShadow: `0 25px 60px ${selectedCard.accent}20`,
                            }}
                        >
                            <Image
                                src={selectedCard.detailImage}
                                alt={selectedCard.title}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1280px) 420px, (min-width: 1024px) 34vw, 100vw"
                            />
                            <div
                                className="absolute inset-0 pointer-events-none border"
                                style={{ borderColor: `${selectedCard.accent}30` }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Bottom Right: Paragraph & Link */}
                    <div className="flex justify-center mt-10 md:mt-12 w-full mb-12 md:mb-0">
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="w-full sm:w-[60%] lg:w-[50%] flex flex-col items-end"
                        >
                            <p className="w-full text-left text-[#222] text-base md:text-xl font-medium leading-relaxed mb-4" style={{ fontFamily: "var(--font-serif)" }}>
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

            </div>
        </section>
    );
}

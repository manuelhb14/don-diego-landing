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
    const [mobileCarouselApi, setMobileCarouselApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);

    const serviceCards = [
        {
            href: "/residencial",
            src: "/final/residencial.webp",
            alt: tp("residencial.name"),
            line1: ts("cardClubL1"),
            line2: ts("cardClubL2"),
            desktopClass: "w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 self-start order-1 relative z-10",
            transition: { duration: 1, ease: "easeOut" as const },
            imageScaleClass: "group-hover:scale-105",
        },
        {
            href: "/farm",
            src: "/final/organic-farms.webp",
            alt: tp("farm.name"),
            line1: ts("cardFarmL1"),
            line2: ts("cardFarmL2"),
            desktopClass: "w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 md:pt-8 lg:pt-6 self-end md:self-start order-2 relative z-20 mt-4 md:mt-0 right-0",
            transition: { duration: 1, delay: 0.15, ease: "easeOut" as const },
            imageScaleClass: "group-hover:scale-[1.03]",
        },
        {
            href: "/wellness",
            src: "/final/wellness-2.webp",
            alt: tp("wellness.name"),
            line1: ts("cardWellnessL1"),
            line2: ts("cardWellnessL2"),
            desktopClass: "w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 md:pt-16 lg:pt-12 self-start order-3 relative z-30 mt-4 md:mt-0 text-left",
            transition: { duration: 1, delay: 0.3, ease: "easeOut" as const },
            imageScaleClass: "group-hover:scale-105",
        },
        {
            href: "/presa",
            src: "/final/presa.webp",
            alt: tp("presa.name"),
            line1: ts("cardPresaL1"),
            line2: ts("cardPresaL2"),
            desktopClass: "w-[85%] sm:w-[70%] md:w-[23%] flex flex-col pt-0 md:pt-24 lg:pt-18 self-end md:self-start order-4 relative z-40 mt-4 md:mt-0 right-0",
            transition: { duration: 1, delay: 0.45, ease: "easeOut" as const },
            imageScaleClass: "group-hover:scale-[1.03]",
        },
    ];

    useEffect(() => {
        if (!mobileCarouselApi) return;
        const t = setTimeout(() => {
            setTotalSlides(mobileCarouselApi.scrollSnapList().length);
            setCurrentSlide(mobileCarouselApi.selectedScrollSnap());
        }, 0);

        const onSelect = () => {
            setCurrentSlide(mobileCarouselApi.selectedScrollSnap());
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
                    <p className="text-[#222]/80 text-lg leading-[1.8] font-normal tracking-[0.01em] w-full font-serif">
                        {ts("intro")}
                    </p>
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
                            opts={{ align: "start", loop: true }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {serviceCards.map((card) => (
                                    <CarouselItem key={card.href} className="basis-[88%] sm:basis-[72%]">
                                        <Link href={card.href} className="block relative w-full aspect-[3/4] md:aspect-square group cursor-pointer overflow-hidden">
                                            <Image
                                                src={card.src}
                                                alt={card.alt}
                                                fill
                                                className={`object-cover transition-transform duration-1000 ${card.imageScaleClass}`}
                                            />
                                            <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0"></div>
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-3 text-center">
                                                <h3
                                                    className="text-white text-[13px] font-medium uppercase tracking-[0.15em] leading-snug drop-shadow-md"
                                                    style={{ fontFamily: "var(--font-sans)" }}
                                                >
                                                    {card.line1}<br />{card.line2}
                                                </h3>
                                            </div>
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                        <div className="flex items-center justify-center gap-2 mt-4">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={`service-dot-${index}`}
                                    type="button"
                                    onClick={() => mobileCarouselApi?.scrollTo(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={`h-2 w-2 rounded-full transition-all ${currentSlide === index ? "bg-[#AA7D69] w-5" : "bg-[#AA7D69]/35"}`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    <div className="hidden lg:flex flex-row justify-between gap-2 lg:gap-8 items-start w-full">
                        {serviceCards.map((card) => (
                            <motion.div
                                key={card.href}
                                initial={hasVisited ? false : { opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={card.transition}
                                className={card.desktopClass}
                            >
                                <Link href={card.href} className="block relative w-full aspect-[2/3] group cursor-pointer overflow-hidden">
                                    <Image
                                        src={card.src}
                                        alt={card.alt}
                                        fill
                                        className={`object-cover transition-transform duration-1000 ${card.imageScaleClass}`}
                                    />
                                    <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0"></div>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2 sm:p-4 text-center">
                                        <h3
                                            className="text-white text-[11px] xl:text-[12px] font-medium uppercase tracking-[0.15em] leading-snug drop-shadow-md"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {card.line1}<br />{card.line2}
                                        </h3>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Right: Paragraph & Link */}
                    <div className="flex justify-center mt-10 md:mt-12 w-full mb-12 md:mb-0">
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="w-full sm:w-[60%] lg:w-[50%] flex flex-col items-end"
                        >
                            <p className="text-[#222] text-base md:text-xl font-medium leading-relaxed mb-4" style={{ fontFamily: "var(--font-serif)" }}>
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

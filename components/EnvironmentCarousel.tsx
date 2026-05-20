"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, type MotionValue } from "motion/react";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import type { EnvironmentCarouselSlide } from "@/content/environmentCarousels";

type ImageMotionY = MotionValue<number> | MotionValue<string> | number | string;

type EnvironmentCarouselProps = {
    slides: readonly EnvironmentCarouselSlide[];
    accent: string;
    className?: string;
    imageClassName?: string;
    imageLayerClassName?: string;
    imageMotionY?: ImageMotionY;
    priority?: boolean;
    sizes?: string;
};

export default function EnvironmentCarousel({
    slides,
    accent,
    className = "",
    imageClassName = "object-center",
    imageLayerClassName = "absolute inset-0",
    imageMotionY,
    priority = false,
    sizes = "100vw",
}: EnvironmentCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: slides.length > 1,
    });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) {
            return;
        }

        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            emblaApi?.scrollTo(index);
        },
        [emblaApi],
    );

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    if (slides.length === 0) {
        return null;
    }

    return (
        <div
            className={`group relative w-full overflow-hidden bg-[#efe2d0] ${className}`}
            style={{ "--environment-carousel-accent": accent } as CSSProperties}
            role="region"
            aria-label="Environment image carousel"
            aria-roledescription="carousel"
        >
            <div ref={emblaRef} className="h-full overflow-hidden">
                <div className="flex h-full">
                    {slides.map((slide, index) => (
                        <div
                            key={`${slide.src}-${index}`}
                            className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden"
                        >
                            <motion.div className={imageLayerClassName} style={{ y: imageMotionY }}>
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    priority={priority && index === 0}
                                    className={`object-cover ${imageClassName} ${slide.imageClassName ?? ""}`}
                                    sizes={sizes}
                                />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {slides.length > 1 ? (
                <>
                    <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                        <button
                            type="button"
                            aria-label="Previous image"
                            onClick={scrollPrev}
                            className="pointer-events-auto flex h-8 w-8 items-center justify-center border border-white/70 bg-[#16120f]/24 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-sm transition-all duration-300 hover:bg-white/88 hover:text-[#222222] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:pointer-events-none md:h-9 md:w-9 md:group-hover:pointer-events-auto md:group-focus-within:pointer-events-auto"
                        >
                            <ChevronLeft className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next image"
                            onClick={scrollNext}
                            className="pointer-events-auto flex h-8 w-8 items-center justify-center border border-white/70 bg-[#16120f]/24 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-sm transition-all duration-300 hover:bg-white/88 hover:text-[#222222] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:pointer-events-none md:h-9 md:w-9 md:group-hover:pointer-events-auto md:group-focus-within:pointer-events-auto"
                        >
                            <ChevronRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                        </button>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#16120f]/55 via-[#16120f]/16 to-transparent px-4 pb-4 pt-12">
                        <span
                            className="text-[10px] font-bold tracking-[0.2em] text-white/82"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {String(selectedIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                        </span>
                        <div className="pointer-events-auto flex items-center gap-1.5">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    aria-label={`Go to image ${index + 1}`}
                                    aria-current={selectedIndex === index ? "true" : undefined}
                                    onClick={() => scrollTo(index)}
                                    className="h-2 w-2 border border-white/75 bg-white/18 transition-colors duration-300 hover:bg-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    style={{
                                        backgroundColor:
                                            selectedIndex === index ? "var(--environment-carousel-accent)" : undefined,
                                        borderColor:
                                            selectedIndex === index ? "var(--environment-carousel-accent)" : undefined,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}

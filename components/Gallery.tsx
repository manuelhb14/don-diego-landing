"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";

type GallerySlideText = { alt: string; title: string; description: string };

const GALLERY_LAYOUT = [
    { src: "/images/renders/render-1.png", borderColor: "#8C7D6B" },
    { src: "/images/gallery/gallery-1.png", borderColor: "#9A6A4E" },
    { src: "/images/gallery/gallery-4.png", borderColor: "#B58D6A" },
    { src: "/images/renders/presa-1.png", borderColor: "#617983" },
    { src: "/images/gallery/gallery-7.png", borderColor: "#6B7F53" },
    { src: "/images/gallery/gallery-2.png", borderColor: "#AC6F52" },
    { src: "/images/renders/entrance.jpg", borderColor: "#5E5043" },
    { src: "/images/renders/farm.jpg", borderColor: "#5C6B45" },
    { src: "/images/gallery/gallery-5.png", borderColor: "#B89C65" },
    { src: "/images/gallery/gallery-10.jpg", borderColor: "#768465" },
    { src: "/final/presa-2.webp", borderColor: "#7B6A57" },
    { src: "/final/organic-farms.webp", borderColor: "#6A785F" },
] as const;

const MOSAIC_PATTERN = [
    "col-span-2 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-3",
    "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-2",
    "col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1",
    "col-span-2 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
    "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
    "col-span-1 row-span-1 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
    "col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1",
    "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
    "col-span-2 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
    "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
    "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
    "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
] as const;

export default function Gallery() {
    const t = useTranslations("galleryCarousel");
    const slidesText = useMemo(() => t.raw("slides") as GallerySlideText[], [t]);
    const galleryItems = useMemo(
        () =>
            GALLERY_LAYOUT.map((layout, i) => ({
                ...layout,
                ...slidesText[i],
            })),
        [slidesText]
    );

    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightbox, setLightbox] = useState<number | null>(null);

    const closeLightbox = useCallback(() => {
        setLightbox(null);
    }, []);

    const goToPrev = useCallback(() => {
        setLightbox((prev) => {
            if (prev === null) return prev;
            const nextIndex = (prev - 1 + galleryItems.length) % galleryItems.length;
            setCurrentIndex(nextIndex);
            return nextIndex;
        });
    }, [galleryItems.length]);

    const goToNext = useCallback(() => {
        setLightbox((prev) => {
            if (prev === null) return prev;
            const nextIndex = (prev + 1) % galleryItems.length;
            setCurrentIndex(nextIndex);
            return nextIndex;
        });
    }, [galleryItems.length]);

    useEffect(() => {
        if (lightbox === null) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowLeft") {
                goToPrev();
            }

            if (event.key === "ArrowRight") {
                goToNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightbox, closeLightbox, goToPrev, goToNext]);

    const handleImageClick = (index: number) => {
        setCurrentIndex(index);
        setLightbox(index);
    };

    return (
        <>
            <section id="galeria" className="bg-[#fff8ed] pt-12 pb-12 lg:pt-16 lg:pb-14 overflow-hidden">
                {/* Header */}
                <div className="max-w-[1400px] mx-auto px-6 lg:px-14 mb-6 flex items-end justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {t("kicker")}
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 6rem)",
                            }}
                        >
                            {t("title")}
                        </h2>
                    </motion.div>
                    <p
                        className="hidden lg:block text-[#222]/30 text-sm max-w-xs text-right leading-relaxed"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {t("hint")}
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="w-full px-2 md:px-4 lg:px-6 mb-12">
                    <div className="relative">
                        <div className="pointer-events-none absolute -inset-3 md:-inset-4" />
                        <div className="relative grid grid-flow-dense grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[130px] md:auto-rows-[180px] lg:auto-rows-[190px] gap-3 md:gap-4 lg:gap-5">
                            {galleryItems.map((item, i) => {
                                const isActive = i === currentIndex;
                                const tileClass = MOSAIC_PATTERN[i] ?? "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1";

                            return (
                                <motion.button
                                    key={`${item.src}-${i}`}
                                    type="button"
                                    className={`group relative overflow-hidden text-left ${tileClass}`}
                                    style={{
                                        border: isActive
                                            ? "2px solid rgba(34,34,34,0.28)"
                                            : "2px solid rgba(34,34,34,0.08)",
                                        boxShadow: isActive
                                            ? "0 20px 45px rgba(34, 26, 20, 0.2)"
                                            : "0 8px 22px rgba(34, 26, 20, 0.1)",
                                    }}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.45, delay: i * 0.03 }}
                                    animate={{ scale: isActive ? 1.015 : 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => handleImageClick(i)}
                                    aria-label={item.alt}
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.07]"
                                        sizes="(max-width: 768px) 48vw, (max-width: 1024px) 38vw, 24vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                                    <p
                                        className="absolute left-3 bottom-2 md:left-4 md:bottom-3 text-[10px] md:text-xs tracking-[0.18em] text-white/90 uppercase opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {item.title}
                                    </p>
                                </motion.button>
                            );
                            })}
                        </div>
                    </div>
                </div>

            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#111]/97 p-4 md:p-6"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors text-3xl font-light"
                        aria-label={t("ariaClose")}
                    >
                        ×
                    </button>
                    <div className="relative w-full max-w-[1200px] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={goToPrev}
                            className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white transition-colors text-4xl font-light px-2 z-10"
                            aria-label={t("ariaPrev")}
                        >
                            ‹
                        </button>
                        <Image
                            src={galleryItems[lightbox].src}
                            alt={galleryItems[lightbox].alt}
                            width={1400}
                            height={900}
                            className="max-h-[68vh] md:max-h-[72vh] w-auto max-w-[90vw] md:max-w-[86vw] object-contain"
                        />
                        <button
                            onClick={goToNext}
                            className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white transition-colors text-4xl font-light px-2 z-10"
                            aria-label={t("ariaNext")}
                        >
                            ›
                        </button>
                    </div>
                    <div className="mt-6 text-center w-full px-4 max-w-3xl" onClick={(e) => e.stopPropagation()}>
                        <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                            {lightbox + 1} / {galleryItems.length}
                        </p>
                        <p className="text-white/80 text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "var(--font-sans)" }}>
                            {galleryItems[lightbox].title}
                        </p>
                        <p
                            className="text-white/65 text-[13px] md:text-sm leading-relaxed max-w-xl mx-auto"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {galleryItems[lightbox].description}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

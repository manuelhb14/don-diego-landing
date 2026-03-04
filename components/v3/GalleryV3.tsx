"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

const row1 = [
    { src: "/images/renders/render-1.png", alt: "Club Residencial" },
    { src: "/images/gallery/gallery-1.png", alt: "Interior" },
    { src: "/images/gallery/gallery-4.png", alt: "Sala de estar" },
    { src: "/images/renders/presa-1.png", alt: "Presa de la Cantera" },
    { src: "/images/gallery/gallery-7.png", alt: "Paisaje" },
];

const row2 = [
    { src: "/images/gallery/gallery-2.png", alt: "Espacios" },
    { src: "/images/renders/entrance.jpg", alt: "Entrada" },
    { src: "/images/renders/farm.jpg", alt: "Organic Farm" },
    { src: "/images/gallery/gallery-5.png", alt: "Exterior" },
    { src: "/images/gallery/gallery-10.jpg", alt: "Vista aérea" },
];

const allImages = [...row1, ...row2];

function MarqueeRow({
    images,
    direction = "left",
    speed = 40,
    onImageClick,
}: {
    images: { src: string; alt: string }[];
    direction?: "left" | "right";
    speed?: number;
    onImageClick: (idx: number) => void;
}) {
    const [paused, setPaused] = useState(false);
    const doubled = [...images, ...images]; // duplicate for infinite loop

    return (
        <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <motion.div
                className="flex gap-3"
                animate={{
                    x: direction === "left"
                        ? [0, -(images.length * (320 + 12))]
                        : [-(images.length * (320 + 12)), 0],
                }}
                transition={{
                    x: {
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear",
                    },
                }}
                style={{ animationPlayState: paused ? "paused" : "running" }}
            >
                {doubled.map((img, i) => (
                    <div
                        key={`${img.src}-${i}`}
                        className="relative flex-shrink-0 overflow-hidden cursor-pointer group"
                        style={{
                            width: i % 3 === 0 ? 380 : 300,
                            height: i % 3 === 0 ? 260 : 220,
                        }}
                        onClick={() => onImageClick(i % images.length)}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#AA7D69]/0 group-hover:bg-[#AA7D69]/15 transition-colors duration-500" />
                        <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span
                                className="text-[10px] tracking-[0.15em] text-white/80 uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {img.alt}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function GalleryV3() {
    const [lightbox, setLightbox] = useState<number | null>(null);

    const openLightbox = (rowIndex: number, imgIndex: number) => {
        const globalIndex = rowIndex === 0 ? imgIndex : row1.length + imgIndex;
        setLightbox(globalIndex);
    };

    return (
        <>
            <section id="galeria" className="bg-[#FFF3E1] py-20 lg:py-28 overflow-hidden">
                {/* Header */}
                <div className="max-w-[1400px] mx-auto px-6 lg:px-14 mb-12 flex items-end justify-between">
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
                            (Galería)
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 6rem)",
                            }}
                        >
                            El Lugar
                        </h2>
                    </motion.div>
                    <p
                        className="hidden lg:block text-[#222]/30 text-sm max-w-xs text-right leading-relaxed"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Pasa el cursor para pausar · Click para ampliar
                    </p>
                </div>

                {/* Filmstrip rows */}
                <div className="space-y-3">
                    <MarqueeRow
                        images={row1}
                        direction="left"
                        speed={45}
                        onImageClick={(idx) => openLightbox(0, idx)}
                    />
                    <MarqueeRow
                        images={row2}
                        direction="right"
                        speed={50}
                        onImageClick={(idx) => openLightbox(1, idx)}
                    />
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111]/97 p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        onClick={() => setLightbox(null)}
                        className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors text-3xl font-light"
                        aria-label="Close"
                    >
                        ×
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + allImages.length) % allImages.length); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors text-4xl font-light px-2"
                        aria-label="Previous"
                    >
                        ‹
                    </button>
                    <Image
                        src={allImages[lightbox].src}
                        alt={allImages[lightbox].alt}
                        width={1400}
                        height={900}
                        className="max-h-[88vh] w-auto max-w-[90vw] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % allImages.length); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors text-4xl font-light px-2"
                        aria-label="Next"
                    >
                        ›
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                        <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase" style={{ fontFamily: "var(--font-sans)" }}>
                            {lightbox + 1} / {allImages.length}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

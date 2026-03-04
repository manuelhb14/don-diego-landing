"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const galleryImages = [
    { src: "/images/renders/render-1.png", alt: "Club Residencial" },
    { src: "/images/gallery/gallery-1.png", alt: "Interior" },
    { src: "/images/gallery/gallery-2.png", alt: "Espacios" },
    { src: "/images/renders/entrance.jpg", alt: "Entrada" },
    { src: "/images/gallery/gallery-4.png", alt: "Sala de estar" },
    { src: "/images/renders/presa-1.png", alt: "Presa de la Cantera" },
    { src: "/images/gallery/gallery-7.png", alt: "Paisaje" },
    { src: "/images/renders/farm.jpg", alt: "Organic Farm" },
    { src: "/images/gallery/gallery-10.jpg", alt: "Vista aérea" },
    { src: "/images/gallery/gallery-5.png", alt: "Exterior" },
];

export default function GalleryV2() {
    const [lightbox, setLightbox] = useState<number | null>(null);

    return (
        <>
            <section id="galeria" className="bg-[#FFF3E1] py-24 lg:py-32">
                {/* Header */}
                <div className="max-w-[1400px] mx-auto px-6 lg:px-14 mb-14 flex items-end justify-between">
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
                        className="hidden lg:block text-[#222]/35 text-sm max-w-xs text-right leading-relaxed"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Espacios atemporales, a la medida y profundamente pacíficos.
                    </p>
                </div>

                {/* Masonry grid */}
                <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
                        {galleryImages.map((img, i) => (
                            <motion.div
                                key={img.src}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                                className="mb-3 break-inside-avoid cursor-pointer group overflow-hidden"
                                onClick={() => setLightbox(i)}
                            >
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        width={800}
                                        height={600}
                                        className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                    />
                                    <div className="absolute inset-0 bg-[#AA7D69]/0 group-hover:bg-[#AA7D69]/15 transition-colors duration-500" />
                                    <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span
                                            className="text-[10px] tracking-[0.2em] text-white/80 uppercase"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {img.alt}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#222]/97 p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        onClick={() => setLightbox(null)}
                        className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors text-2xl"
                        aria-label="Close"
                    >
                        ×
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors text-4xl font-light px-2"
                        aria-label="Previous"
                    >
                        ‹
                    </button>
                    <Image
                        src={galleryImages[lightbox].src}
                        alt={galleryImages[lightbox].alt}
                        width={1400}
                        height={900}
                        className="max-h-[88vh] w-auto max-w-[90vw] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors text-4xl font-light px-2"
                        aria-label="Next"
                    >
                        ›
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                        <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase" style={{ fontFamily: "var(--font-sans)" }}>
                            {lightbox + 1} / {galleryImages.length}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

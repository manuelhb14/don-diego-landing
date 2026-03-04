"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const images = [
    { src: "/images/renders/render-1.png", alt: "Club Residencial", span: "lg:col-span-2 lg:row-span-2" },
    { src: "/images/gallery/gallery-1.png", alt: "Interior", span: "" },
    { src: "/images/gallery/gallery-4.png", alt: "Sala de estar", span: "" },
    { src: "/images/renders/entrance.jpg", alt: "Entrada", span: "lg:col-span-2" },
    { src: "/images/renders/presa-1.png", alt: "Presa de la Cantera", span: "" },
    { src: "/images/gallery/gallery-7.png", alt: "Paisaje", span: "" },
    { src: "/images/renders/farm.jpg", alt: "Organic Farm", span: "" },
    { src: "/images/gallery/gallery-5.png", alt: "Exterior", span: "" },
    { src: "/images/gallery/gallery-2.png", alt: "Espacios", span: "lg:col-span-2" },
    { src: "/images/gallery/gallery-10.jpg", alt: "Vista aérea", span: "" },
];

export default function GalleryV4() {
    const [lightbox, setLightbox] = useState<number | null>(null);

    return (
        <>
            <section id="galeria" className="bg-dark py-24 lg:py-36">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-14 flex items-end justify-between"
                    >
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.25em] text-terracotta/40 uppercase mb-4">
                                Galería
                            </p>
                            <h2
                                className="font-serif text-white leading-none"
                                style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                            >
                                El Lugar
                            </h2>
                        </div>
                        <p className="hidden lg:block text-white/20 text-sm max-w-xs text-right leading-relaxed">
                            Espacios atemporales, diseñados para una vida en armonía.
                        </p>
                    </motion.div>

                    {/* Editorial asymmetric grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {images.map((img, i) => (
                            <motion.div
                                key={img.src}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
                                className={`relative overflow-hidden cursor-pointer group ${img.span}`}
                                style={{ aspectRatio: img.span.includes("col-span-2") ? "16/9" : "4/5" }}
                                onClick={() => setLightbox(i)}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                                />
                                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-colors duration-500" />
                                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-[10px] font-bold tracking-[0.15em] text-white/80 uppercase">
                                        {img.alt}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/97 p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        onClick={() => setLightbox(null)}
                        className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors text-3xl"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white text-4xl font-light px-2 transition-colors"
                        aria-label="Anterior"
                    >
                        ‹
                    </button>
                    <Image
                        src={images[lightbox].src}
                        alt={images[lightbox].alt}
                        width={1400}
                        height={900}
                        className="max-h-[88vh] w-auto max-w-[90vw] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white text-4xl font-light px-2 transition-colors"
                        aria-label="Siguiente"
                    >
                        ›
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                        <p className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">
                            {lightbox + 1} / {images.length}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

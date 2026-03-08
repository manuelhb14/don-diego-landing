"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";

const galleryItems = [
    { src: "/images/renders/render-1.png", alt: "Club Residencial", title: "CLUB RESIDENCIAL - DISEÑO ARQUITECTÓNICO", description: "Un espacio diseñado para la convivencia comunitaria, combinando el confort interior con vistas privilegiadas y un sofisticado mobiliario contemporáneo.", borderColor: "#8C7D6B" },
    { src: "/images/gallery/gallery-1.png", alt: "Hogar", title: "HOGAR - MATERIALES Y TEXTURAS", description: "Específicamente diseñado para el confort y la convivencia, combinando la comodidad con la elegancia y la funcionalidad.", borderColor: "#9A6A4E" },
    { src: "/images/gallery/gallery-4.png", alt: "Iluminación", title: "ILUMINACIÓN NATURAL - ACABADOS", description: "Acabados en tonos cálidos y detalles sutiles que aportan un ritmo táctil y un encanto atemporal a los interiores modernos.", borderColor: "#B58D6A" },
    { src: "/images/renders/presa-1.png", alt: "Presa de la Cantera", title: "PRESA DE LA CANTERA - ENTORNO NATURAL", description: "Integración perfecta con el paisaje local, ofreciendo vistas inigualables a la presa y manteniendo un profundo respeto por la topografía de la zona.", borderColor: "#617983" },
    { src: "/images/gallery/gallery-7.png", alt: "Paisaje", title: "EL PAISAJE - VEGETACIÓN ENDÉMICA", description: "Amplias áreas diseñadas para conectar orgánicamente con la naturaleza circundante, maximizando la serenidad del entorno exterior.", borderColor: "#6B7F53" },
    { src: "/images/gallery/gallery-2.png", alt: "Espacios", title: "ESPACIOS FLUIDOS - ARMONÍA ESPACIAL", description: "Transiciones naturales entre las diferentes áreas del hogar, guiadas por una paleta de colores tierra y una excepcional artesanía en cada detalle.", borderColor: "#AC6F52" },
    { src: "/images/renders/entrance.jpg", alt: "Entrada", title: "ACCESO PRINCIPAL - BIENVENIDA Y PRESENCIA", description: "Una entrada majestuosa que enmarca el inicio de la experiencia residencial, con una estructura que impone carácter y elegancia rural.", borderColor: "#5E5043" },
    { src: "/images/renders/farm.jpg", alt: "Organic Farm", title: "HUERTO ORGÁNICO - SOSTENIBILIDAD", description: "Espacios cultivables diseñados para cosechar productos frescos, promoviendo un estilo de vida sustentable y profundamente arraigado en la tierra.", borderColor: "#5C6B45" },
    { src: "/images/gallery/gallery-5.png", alt: "Exterior", title: "TERRAZA EXTERIOR - VIVENCIA AL AIRE LIBRE", description: "Zonas de descanso exterior que prolongan la comodidad del interior hacia afuera, propiciando reuniones bajo un cielo despejado.", borderColor: "#B89C65" },
    { src: "/images/gallery/gallery-10.jpg", alt: "Vista aérea", title: "VISTA AÉREA - PLAN MAESTRO", description: "Una perspectiva privilegiada del proyecto integral, donde se aprecia la delicada inserción arquitectónica respetando el fluir del ecosistema local.", borderColor: "#768465" },
];

export default function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, []);

    useEffect(() => {
        if (isPaused || lightbox !== null) return;

        const interval = setInterval(nextSlide, 5000); // 5 seconds per image pause

        return () => clearInterval(interval);
    }, [isPaused, lightbox, currentIndex, nextSlide]); // <--- Adding currentIndex resets timer if changed

    const handleImageClick = (index: number, isCenter: boolean) => {
        if (isCenter) {
            setLightbox(index);
            setIsPaused(true);
        } else {
            setCurrentIndex(index);
        }
    };

    return (
        <>
            <section id="galeria" className="bg-[#FFF3E1] pt-2 lg:pt-4 pb-6 lg:pb-28 overflow-hidden">
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
                            (Galería)
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 6rem)",
                            }}
                        >
                            El Lugar que Quieres
                        </h2>
                    </motion.div>
                    <p
                        className="hidden lg:block text-[#222]/30 text-sm max-w-xs text-right leading-relaxed"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Pasa el cursor para pausar · Click para ampliar
                    </p>
                </div>

                {/* Carousel */}
                <div
                    className="relative w-full h-[45vh] md:h-[60vh] max-h-[500px] md:max-h-[800px] flex items-center justify-center mb-6"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {galleryItems.map((item, i) => {
                        let offset = (i - currentIndex + galleryItems.length) % galleryItems.length;
                        if (offset > galleryItems.length / 2) {
                            offset -= galleryItems.length;
                        }

                        const isCenter = offset === 0;
                        const xOffset = offset * 102;

                        // Optimize rendering: completely hide items too far out of view
                        const isVisible = Math.abs(offset) <= 2;
                        if (!isVisible) return null;

                        return (
                            <motion.div
                                key={`${item.src}-${i}`}
                                className="absolute top-0 bottom-0 my-auto cursor-pointer flex items-center justify-center w-[clamp(280px,70vw,420px)] md:w-[clamp(500px,50vw,900px)] h-full md:h-[clamp(400px,55vh,700px)]"
                                style={{
                                    zIndex: 10 - Math.abs(offset),
                                }}
                                initial={false}
                                animate={{
                                    x: `${xOffset}%`,
                                    scale: isCenter ? 1 : 0.85,
                                    opacity: isCenter ? 1 : 0.6,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 30,
                                    mass: 1,
                                }}
                                onClick={() => handleImageClick(i, isCenter)}
                            >
                                <div
                                    className="relative w-full h-full overflow-hidden transition-all duration-700 bg-black/5"
                                    style={{
                                        border: isCenter ? `clamp(6px, 1vw, 12px) solid ${item.borderColor}` : '0px solid transparent'
                                    }}
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 768px) 80vw, 65vw"
                                    />
                                    {isCenter && (
                                        <div className="absolute inset-0 bg-[#AA7D69]/0 hover:bg-[#AA7D69]/10 transition-colors duration-500" />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Active Info text */}
                <div className="max-w-[800px] mx-auto px-6 text-center min-h-[160px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center"
                        >
                            <h3
                                className="text-sm md:text-lg tracking-[0.2em] md:tracking-[0.3em] text-[#222] uppercase mb-6 md:mb-8 font-serif"
                            >
                                {galleryItems[currentIndex].title}
                            </h3>
                            <p
                                className="text-[#222]/80 text-[14px] md:text-[15px] leading-[1.8] font-normal tracking-[0.01em] max-w-md"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {galleryItems[currentIndex].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111]/97 p-4"
                    onClick={() => {
                        setLightbox(null);
                        setIsPaused(false);
                    }}
                >
                    <button
                        onClick={() => {
                            setLightbox(null);
                            setIsPaused(false);
                        }}
                        className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors text-3xl font-light"
                        aria-label="Close"
                    >
                        ×
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryItems.length) % galleryItems.length); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors text-4xl font-light px-2"
                        aria-label="Previous"
                    >
                        ‹
                    </button>
                    <Image
                        src={galleryItems[lightbox].src}
                        alt={galleryItems[lightbox].alt}
                        width={1400}
                        height={900}
                        className="max-h-[88vh] w-auto max-w-[90vw] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryItems.length); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors text-4xl font-light px-2"
                        aria-label="Next"
                    >
                        ›
                    </button>
                    <div className="absolute bottom-10 md:bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4">
                        <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                            {lightbox + 1} / {galleryItems.length}
                        </p>
                        <p className="text-white/60 text-xs tracking-widest uppercase font-sans">
                            {galleryItems[lightbox].title}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}


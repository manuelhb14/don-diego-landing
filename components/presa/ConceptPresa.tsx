"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";

const features = [
    {
        id: "concept",
        title: "Un destino en sí mismo",
        shortTitle: "Concepto",
        description: "El agua como hilo conductor de comunidad y vida. Un frente lacustre vivo para San Miguel de Allende.",
        image: "/images/gallery/gallery-4.png",
    },
    {
        id: "park",
        title: "Parque acuático",
        shortTitle: "Recreación",
        description: "Áreas recreativas para toda la familia. Espacios diseñados para disfrutar del entorno natural.",
        image: "/images/gallery/gallery-13.jpg",
    },
    {
        id: "club",
        title: "Club náutico",
        shortTitle: "Club",
        description: "Embarcadero y actividades acuáticas en la Presa La Cantera, exclusivas para la comunidad.",
        image: "/images/gallery/gallery-11.jpg",
    },
    {
        id: "living",
        title: "Vivir junto al agua",
        shortTitle: "Residencial",
        description: "Departamentos con vista privilegiada a la presa y espacios gastronómicos con terraza.",
        image: "/images/gallery/gallery-14.JPG",
    },
];

export default function ConceptPresa() {
    const [activeFeature, setActiveFeature] = useState(features[0].id);

    return (
        <section id="concepto" className="bg-[#1F1D1B] py-24 lg:py-32 overflow-hidden min-h-screen flex items-center">
            <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-16">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#C8D7E6] uppercase mb-4"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [La Presa]
                    </p>
                    <h2
                        className="text-[#C8D7E6] leading-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 4vw, 3.5rem)",
                        }}
                    >
                        El Frente Lacustre
                    </h2>
                </motion.div>

                {/* Horizontal Accordion Layout */}
                <div className="flex flex-col lg:flex-row h-[70vh] min-h-[500px] lg:min-h-[600px] gap-2 lg:gap-4">
                    {features.map((feature, index) => {
                        const isActive = activeFeature === feature.id;

                        return (
                            <motion.div
                                key={feature.id}
                                layout
                                onClick={() => setActiveFeature(feature.id)}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1, layout: { duration: 0.4, ease: "easeInOut" } }}
                                className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ease-in-out ${isActive
                                        ? 'flex-[5] lg:flex-[6] h-full shadow-2xl'
                                        : 'flex-[1] lg:flex-[1] h-24 lg:h-full opacity-60 hover:opacity-100 hover:bg-[#C8D7E6]/5'
                                    }`}
                                style={{ backgroundColor: isActive ? 'transparent' : '#2A2826' }}
                            >
                                {/* Background Image (Only visible when active) */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8 }}
                                            className="absolute inset-0 z-0"
                                        >
                                            <Image
                                                src={feature.image}
                                                alt={feature.title}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                            />
                                            {/* Gradient Overlay for Text Legibility */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B] via-[#1F1D1B]/40 to-transparent" />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Inactive State UI (Vertical Text on Desktop, Horizontal on Mobile) */}
                                <div className={`absolute inset-0 flex items-center justify-center p-4 z-10 transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                    <h3
                                        className="text-[#C8D7E6] font-bold tracking-widest text-sm lg:text-base whitespace-nowrap lg:-rotate-90 origin-center"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {feature.shortTitle}
                                    </h3>
                                </div>

                                {/* Active State Content */}
                                <div className={`absolute inset-0 p-8 lg:p-12 flex flex-col justify-end z-20 transition-opacity duration-500 delay-200 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                    <motion.div
                                        initial={false}
                                        animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
                                        transition={{ duration: 0.4, delay: 0.2 }}
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-[#C8D7E6] text-sm font-bold tracking-widest" style={{ fontFamily: "var(--font-sans)" }}>
                                                0{index + 1}
                                            </span>
                                            <div className="h-px flex-grow max-w-[50px] bg-[#C8D7E6]/40" />
                                        </div>
                                        <h3
                                            className="text-[#FFF3E1] text-3xl lg:text-5xl mb-4 leading-tight"
                                            style={{ fontFamily: "var(--font-serif)" }}
                                        >
                                            {feature.title}
                                        </h3>
                                        <p
                                            className="text-[#FFF3E1]/80 text-base lg:text-lg max-w-xl leading-relaxed"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {feature.description}
                                        </p>

                                        {/* Optional Explore Button */}
                                        <button className="mt-8 flex items-center gap-2 text-[#C8D7E6] font-medium text-sm hover:gap-4 transition-all duration-300" style={{ fontFamily: "var(--font-sans)" }}>
                                            <span>Descubrir más</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
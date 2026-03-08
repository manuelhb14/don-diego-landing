"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";

const components = [
    {
        title: "Club Residencial",
        description: "364 residencias diseñadas con densidad inteligente para proteger vistas y privacidad.",
        image: "/images/gallery/gallery-2.png",
        href: "/residencial",
        colSpan: "col-span-1 md:col-span-8",
        aspect: "aspect-[4/3] md:aspect-[21/9]",
    },
    {
        title: "Organic Farm",
        description: "Un espacio agrario vivo donde la tierra nos nutre y conecta con los ciclos naturales.",
        image: "/images/gallery/gallery-5.png",
        href: "/farm",
        colSpan: "col-span-1 md:col-span-4",
        aspect: "aspect-[4/3] md:aspect-[3/4]",
    },
    {
        title: "Wellness Center",
        description: "Santuario para el cuerpo y la mente, diseñado para el equilibrio interior.",
        image: "/images/gallery/gallery-10.jpg",
        href: "/wellness",
        colSpan: "col-span-1 md:col-span-5",
        aspect: "aspect-[4/3] md:aspect-square",
    },
    {
        title: "Presa de la Cantera",
        description: "El corazón azul del proyecto, un cuerpo de agua que refleja la inmensidad del paisaje.",
        image: "/images/gallery/gallery-4.png",
        href: "/presa",
        colSpan: "col-span-1 md:col-span-7",
        aspect: "aspect-[4/3] md:aspect-[16/9]",
    }
];

export default function GridProyecto() {
    const hasVisited = useHasVisited();

    return (
        <section id="componentes" className="bg-[#FFF3E1] pt-12 pb-12 md:pb-24 px-6 md:px-12 lg:px-24 w-full">
            <div className="max-w-[1440px] mx-auto w-full">
                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                    {components.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={hasVisited ? false : { opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.15 }}
                            className={`${item.colSpan} relative group overflow-hidden rounded-sm`}
                        >
                            <Link href={item.href} className={`block w-full h-full relative ${item.aspect} bg-[#1F1D1B]`}>
                                {/* Background Image */}
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                {/* Overlay / Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B]/90 via-[#1F1D1B]/20 to-transparent opacity-95 md:opacity-80 transition-opacity duration-700 group-hover:opacity-95" />

                                {/* Content */}
                                <div className="absolute inset-0 p-5 md:p-12 flex flex-col justify-end">
                                    <div className="transform translate-y-0 md:translate-y-28 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-y-0">
                                        <h3
                                            className="text-[#E6E1D6] text-2xl md:text-3xl lg:text-4xl leading-tight mb-2 md:mb-4"
                                            style={{ fontFamily: "var(--font-serif)" }}
                                        >
                                            {item.title}
                                        </h3>

                                        <div className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 ease-in-out h-auto overflow-hidden">
                                            <p className="text-[#E6E1D6]/80 font-sans font-light text-sm md:text-base max-w-md mb-2 md:mb-6 leading-relaxed">
                                                {item.description}
                                            </p>

                                            <span
                                                className="inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-[#E6E1D6] uppercase group/link"
                                                style={{ fontFamily: "var(--font-sans)" }}
                                            >
                                                Descubrir
                                                <span className="w-6 h-[1px] bg-[#E6E1D6]/50 group-hover/link:w-10 transition-all duration-300" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="w-full mt-10 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8">
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl"
                    >
                        <h2
                            className="text-[#222222] leading-none tracking-tight"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 5rem)",
                            }}
                        >
                            Cuatro Entornos <br />
                            <span className="italic text-[#8C7B6C]">Una Comunidad</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-md md:mb-2 lg:mb-4"
                    >
                        <p className="text-[#222] text-lg md:text-xl font-medium leading-relaxed mb-0" style={{ fontFamily: "var(--font-serif)" }}>
                            Cada componente ha sido diseñado como parte de un ecosistema integral, respetando la vocación del lugar y ofreciendo una experiencia de vida única y armoniosa.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

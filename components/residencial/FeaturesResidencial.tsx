"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const features = [
    {
        id: 1,
        title: "Interior 100% peatonal",
        description: "Sin autos visibles. Circulación vehicular periférica en desnivel que libera el espacio interior.",
    },
    {
        id: 2,
        title: "Estacionamiento techado",
        description: "Periférico con acceso peatonal directo a cada vivienda. 2 cajones por unidad.",
    },
    {
        id: 3,
        title: "Paisaje vivo",
        description: "Jardines, fuentes y riachuelos que recorren el conjunto creando un ambiente de calma.",
    },
    {
        id: 4,
        title: "Arquitectura contemporánea",
        description: "Integrada al entorno natural con materiales de la región: cantera, piedra y madera.",
    },
];

export default function FeaturesResidencial() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={containerRef} className="relative w-full bg-[#1F1D1B]" style={{ height: "300vh" }}>

            {/* Sticky Background & Header */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col lg:flex-row">

                {/* Fixed Background Image */}
                <div className="absolute inset-0 w-full h-full lg:w-3/5 lg:relative z-0">
                    <motion.div style={{ y: imageY }} className="absolute inset-0 h-[120%] w-full">
                        <Image
                            src="/images/renders/render-1.png"
                            alt="Club Residencial"
                            fill
                            className="object-cover object-center"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
                </div>

                {/* Fixed Title Column */}
                <div className="relative z-10 w-full lg:w-2/5 h-full bg-transparent lg:bg-[#DEBEBF] flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 pointer-events-none">
                    <h2
                        className="text-[#DEBEBF] lg:text-[#1F1D1B] leading-tight mb-6 drop-shadow-md lg:drop-shadow-none"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 5vw, 4.5rem)",
                        }}
                    >
                        Club Residencial
                    </h2>

                    <p
                        className="text-[#FFF3E1] lg:text-[#1F1D1B]/80 text-lg lg:text-xl leading-relaxed font-medium max-w-md drop-shadow-md lg:drop-shadow-none"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        364 residencias entre dúplex y departamentos, con densidad inteligente que protege vistas y privacidad.
                    </p>
                </div>

            </div>

            {/* Scrolling Cards Overlay */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none pt-[100vh]">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-16 w-full h-full relative">
                    {/* Position mapping for the cards to stagger them across the scroll height */}
                    {features.map((feature, index) => {
                        return (
                            <div
                                key={feature.id}
                                className="absolute w-full lg:w-2/5 flex items-center justify-center lg:justify-start"
                                style={{
                                    top: `${(index * 35) + 15}%`,
                                    left: index % 2 !== 0 ? 'auto' : '0',
                                    right: index % 2 !== 0 ? '5%' : 'auto',
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ margin: "-20% 0px -20% 0px" }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-[#1F1D1B]/90 backdrop-blur-md p-8 lg:p-12 shadow-2xl border border-white/5 mx-4 lg:mx-0 max-w-md w-full pointer-events-auto"
                                >
                                    <span className="text-[#DEBEBF] text-sm font-bold tracking-widest mb-4 block" style={{ fontFamily: "var(--font-sans)" }}>
                                        0{feature.id}
                                    </span>
                                    <h3
                                        className="text-[#DEBEBF] text-2xl lg:text-3xl mb-4"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {feature.title}
                                    </h3>
                                    <p
                                        className="text-[#FFF3E1]/70 text-base leading-relaxed"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {feature.description}
                                    </p>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </section>
    );
}
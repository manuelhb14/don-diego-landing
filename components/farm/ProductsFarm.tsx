"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";

const products = [
    {
        id: "01",
        title: "Invernaderos y zonas de cultivo",
        description: "Espacios organizados en terrazas con tecnología de agricultura sostenible que garantizan el origen más fresco posible.",
        image: "/images/gallery/gallery-4.png",
    },
    {
        id: "02",
        title: "Andadores y cicloruta",
        description: "Recorrer a pie o en bici la vasta extensión productiva permite integrarse físicamente al proceso natural.",
        image: "/images/gallery/gallery-5.png",
    },
    {
        id: "03",
        title: "Experiencia comunitaria",
        description: "Programas educativos alrededor de lo que se cultiva para enseñar a los habitantes la riqueza de cosechar lo que siembras.",
        image: "/images/gallery/gallery-3.png",
    },
    {
        id: "04",
        title: "El origen de lo local",
        description: "Sustentabilidad pura; un ecosistema cerrado donde los productos nutren directamente los cuerpos y el entorno de Don Diego.",
        image: "/images/gallery/gallery-2.png",
    },
];

export default function ProductsFarm() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Desktop (lg): end at -52% so last two cards visible. Mobile/tablet: -75%.
    const [scrollEnd, setScrollEnd] = useState("-75%");
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const update = () => setScrollEnd(mq.matches ? "-52%" : "-75%");
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    const x = useTransform(scrollYProgress, [0, 1], ["0%", scrollEnd]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-[#DEBEBF]">
            <div className="sticky top-0 h-[88vh] md:h-screen flex items-center overflow-hidden lg:mb-20 mb-0">

                {/* Intro Title fixed on the left for the first phase, then scrolls out? No, let's include it in the scrolling timeline or absolute positioned smartly */}
                <div className="absolute top-20 left-6 md:left-16 z-20">
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#1F1D1B] uppercase mb-4"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [Producción]
                    </p>
                    <h2
                        className="text-[#1F1D1B] leading-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        }}
                    >
                        Ciclo Natural
                    </h2>
                </div>

                <motion.div style={{ x }} className="flex gap-8 lg:gap-16 px-0 md:px-16 pt-32 lg:pt-56 pb-0 items-center h-full">
                    {/* Empty placeholder spacer so the first card sits cleanly center/right initially */}
                    <div className="w-[0vw] md:w-[0px] flex-shrink-0" />

                    {products.map((item) => (
                        <div
                            key={item.id}
                            className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] lg:h-[70vh] flex-shrink-0 group relative rounded-[32px] overflow-hidden shadow-sm flex flex-col bg-[#1F1D1B]"
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[1.5s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B] via-transparent to-transparent opacity-90" />
                            </div>

                            {/* Content Block */}
                            <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
                                <span
                                    className="text-[#DEBEBF] text-lg font-bold tracking-widest mb-4"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {item.id}
                                </span>
                                <h3
                                    className="text-[#FFF3E1] text-3xl lg:text-5xl mb-6 leading-tight"
                                    style={{ fontFamily: "var(--font-serif)" }}
                                >
                                    {item.title}
                                </h3>
                                <div className="h-px w-16 bg-[#DEBEBF]/30 mb-6" />
                                <p
                                    className="text-[#FFF3E1]/80 text-base lg:text-xl leading-relaxed font-light max-w-md"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* End Spacer */}
                    {/* <div className="w-[10vw] flex-shrink-0" /> */}
                </motion.div>
            </div>
        </section>
    );
}
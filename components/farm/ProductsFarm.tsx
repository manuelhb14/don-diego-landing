"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <section ref={sectionRef} className="bg-[#1F1D1B] py-24 lg:py-40 overflow-hidden relative">
            <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-16">

                {/* Floating/Parallax Title */}
                <motion.div
                    style={{ y: titleY }}
                    className="text-center mb-32 lg:mb-48 relative z-0 pointer-events-none"
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#D7D7AA] uppercase mb-6"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [Producción]
                    </p>
                    <h2
                        className="text-[#D7D7AA] leading-tight"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3rem, 7vw, 6rem)",
                            opacity: 0.15
                        }}
                    >
                        Ciclo Natural
                    </h2>
                </motion.div>

                {/* Overlapping Zig-Zag Items */}
                <div className="relative z-10 flex flex-col gap-32 lg:gap-40 mt-[-150px] lg:mt-[-250px]">
                    {products.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div key={item.id} className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-0 ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                                {/* Image Box */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ margin: "-10% 0px -10% 0px" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={`w-full lg:w-3/5 ${isEven ? 'lg:pr-10' : 'lg:pl-10'}`}
                                >
                                    <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </motion.div>

                                {/* Text Box (Overlapping) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ margin: "-10% 0px -10% 0px" }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className={`w-full lg:w-2/5 relative ${isEven ? 'lg:-ml-16' : 'lg:-mr-16'} z-20`}
                                >
                                    <div className="bg-[#D7D7AA] p-10 lg:p-16 shadow-2xl">
                                        <span
                                            className="text-[#1F1D1B] text-sm font-bold tracking-widest mb-6 block"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {item.id}
                                        </span>
                                        <h3
                                            className="text-[#1F1D1B] text-2xl lg:text-4xl mb-6 leading-tight"
                                            style={{ fontFamily: "var(--font-serif)" }}
                                        >
                                            {item.title}
                                        </h3>
                                        <div className="h-px w-12 bg-[#1F1D1B]/20 mb-6" />
                                        <p
                                            className="text-[#1F1D1B]/80 text-base lg:text-lg leading-relaxed font-medium"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
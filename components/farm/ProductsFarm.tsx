"use client";

import Image from "next/image";
import { motion } from "motion/react";

const products = [
    {
        title: "Invernaderos y zonas de cultivo",
        description:
            "Espacios organizados en terrazas con tecnología de agricultura sostenible que garantizan el origen más fresco posible.",
        image: "/babylon/farm-5.png",
    },
    {
        title: "Andadores y cicloruta",
        description:
            "Recorrer a pie o en bici la vasta extensión productiva permite integrarse físicamente al proceso natural.",
        image: "/babylon/farm-3.png",
    },
    {
        title: "Experiencia comunitaria",
        description:
            "Programas educativos alrededor de lo que se cultiva para enseñar a los habitantes la riqueza de cosechar lo que siembras.",
        image: "/babylon/farm-7.png",
    },
    {
        title: "El origen de lo local",
        description:
            "Sustentabilidad pura; un ecosistema cerrado donde los productos nutren directamente los cuerpos y el entorno de Don Diego.",
        image: "/babylon/farm-6.png",
    },
];

export default function ProductsFarm() {
    return (
        <section className="relative bg-[#FFF8ED] py-14 pb-20 lg:py-20 lg:pb-28">
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="mb-8 lg:mb-10">
                    <p
                        className="mb-8 text-[10px] tracking-[0.3em] text-[#9B5C6E]/85 uppercase"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [Producción]
                    </p>
                    <h2
                        className="tracking-tight text-[#1a1917] leading-[1.1]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(3.125rem, 5.25vw, 4.25rem)",
                        }}
                    >
                        Ciclo{" "}
                        <span className="italic text-[#8B4A5E]">Natural</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:gap-x-8 lg:gap-y-10">
                    {products.map((item, i) => (
                        <div
                            key={item.title}
                            className={
                                i % 2 === 1 ? "sm:translate-y-8 lg:translate-y-12" : ""
                            }
                        >
                            <motion.article
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                                className="group relative flex min-h-[340px] flex-col overflow-hidden bg-[#1F1D1B] shadow-sm ring-1 ring-[#DEBEBF]/10 sm:min-h-[360px] lg:min-h-[380px]"
                            >
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover opacity-90 lg:opacity-75 transition-transform duration-[1.5s] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B] via-transparent to-transparent opacity-90" />
                                </div>

                                <div className="relative z-10 mt-auto flex h-full flex-col justify-end p-5 md:p-8">
                                    <h3
                                        className="mb-1 text-balance text-xl leading-[1.15] text-[#FFF8ED] md:text-2xl lg:text-3xl"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className="max-w-md text-sm leading-relaxed font-light text-[#FFF8ED]/88 md:text-base"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </motion.article>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

function Counter({ target, suffix = "" }: { target: string; suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [count, setCount] = useState(0);
    const num = parseInt(target.replace(/[^0-9]/g, ""));
    const isSpecial = target.includes("/");

    useEffect(() => {
        if (!isInView || isSpecial) return;
        let current = 0;
        const step = Math.max(Math.floor(2000 / num), 16);
        const timer = setInterval(() => {
            current++;
            setCount(current);
            if (current >= num) clearInterval(timer);
        }, step);
        return () => clearInterval(timer);
    }, [isInView, num, isSpecial]);

    return <span ref={ref}>{isSpecial ? (isInView ? target : "—") : `${count}${suffix}`}</span>;
}

const stats = [
    { value: "364", suffix: "", label: "Residencias privadas" },
    { value: "30", suffix: "+", label: "Años de experiencia" },
    { value: "8", suffix: " min", label: "Al Centro Histórico" },
    { value: "4", suffix: "", label: "Componentes integrados" },
];

export default function ManifestoV4() {
    return (
        <section id="proyecto" className="relative overflow-hidden">
            {/* Part 1 — Heritage narrative on cream */}
            <div className="bg-cream">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 lg:py-36">
                    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-start">
                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.9 }}
                        >
                            <p className="text-[10px] font-bold tracking-[0.25em] text-clay/50 uppercase mb-10">
                                La Visión
                            </p>

                            <h2
                                className="font-serif text-dark leading-[1.08] mb-8"
                                style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)" }}
                            >
                                Una hacienda colonial.{" "}
                                <em className="text-clay">Un futuro consciente.</em>
                            </h2>

                            <div className="space-y-5 max-w-lg">
                                <p className="text-dark/50 text-[15px] leading-relaxed">
                                    Don Diego nace en las tierras de la antigua Hacienda de Don Diego,
                                    construyendo un nuevo capítulo que honra la herencia agrícola y
                                    arquitectónica de San Miguel de Allende.
                                </p>
                                <p className="text-dark/50 text-[15px] leading-relaxed">
                                    Cuatro componentes integrados alrededor de la Presa La Cantera
                                    — residencial, agrícola, bienestar y lacustre — diseñados para
                                    una vida en conexión con la tierra, la comunidad y uno mismo.
                                </p>
                            </div>

                            <div className="mt-10 flex items-center gap-4">
                                <div className="h-px w-10 bg-clay/25" />
                                <p className="font-serif italic text-clay text-sm">
                                    Patrimonio de la Humanidad · UNESCO
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.9, delay: 0.15 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src="/images/location/san-miguel.png"
                                    alt="San Miguel de Allende — Patrimonio UNESCO"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                            {/* Decorative corner accent */}
                            <div className="absolute -bottom-3 -right-3 w-20 h-20 border border-terracotta/25" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Part 2 — Stats band on dark */}
            <div className="bg-dark py-20 lg:py-24">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <div
                                    className="font-serif text-white/90 leading-none mb-3"
                                    style={{ fontSize: "clamp(3rem, 5.5vw, 5.5rem)" }}
                                >
                                    <Counter target={s.value} suffix={s.suffix} />
                                </div>
                                <p className="text-white/25 text-[11px] font-bold tracking-[0.12em] uppercase">
                                    {s.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

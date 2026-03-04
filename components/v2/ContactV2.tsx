"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

const beliefs = [
    { title: "Bienestar", subtitle: "Vida Integral", desc: "Espacios diseñados para nutrir el cuerpo, la mente, y el alma." },
    { title: "Diseño", subtitle: "Espacios a la Medida", desc: "Cada rincón refleja cuidado artesanal y atención al detalle." },
    { title: "Naturaleza", subtitle: "Conexión Profunda", desc: "Vivir en armonía con el entorno natural y la tierra." },
    { title: "Comunidad", subtitle: "Enriquecimiento Cultural", desc: "Un ambiente que celebra el arte, la historia y las tradiciones." },
];

export default function ContactV2() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="contacto" ref={ref} className="relative bg-[#FFF3E1] overflow-hidden">
            {/* BG image at very low opacity */}
            <motion.div
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{ y: bgY }}
            >
                <Image
                    src="/images/renders/presa-1.png"
                    alt=""
                    fill
                    className="object-cover object-center opacity-[0.06]"
                />
            </motion.div>

            {/* Beliefs row */}
            <div className="relative max-w-[1400px] mx-auto px-6 lg:px-14 pt-24 lg:pt-32 pb-20">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-16"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    (Nuestras Creencias)
                </motion.p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {beliefs.map((b, i) => (
                        <motion.div
                            key={b.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.12 }}
                            className="border-t border-[#AA7D69]/20 pt-6"
                        >
                            <p
                                className="text-[#222] text-xl lg:text-2xl mb-1 leading-tight"
                                style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                            >
                                {b.title}
                            </p>
                            <p
                                className="text-[#AA7D69] text-[10px] tracking-wider uppercase mb-3"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {b.subtitle}
                            </p>
                            <p
                                className="text-[#222]/40 text-xs leading-relaxed"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {b.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14">
                <div className="h-px bg-[#AA7D69]/15" />
            </div>

            {/* Contact form */}
            <div className="relative max-w-[1400px] mx-auto px-6 lg:px-14 py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left: headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                    >
                        <h2
                            className="text-[#222] leading-none mb-8"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 6vw, 7rem)",
                            }}
                        >
                            ÚNETE AL MUNDO DE DON DIEGO
                        </h2>
                        <p
                            className="text-[#222]/45 text-base leading-relaxed max-w-sm"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Descubre Don Diego en persona. Contáctanos para programar un recorrido privado.
                        </p>
                    </motion.div>

                    {/* Right: form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                    >
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="h-px w-16 bg-[#E1B19B]/60 mx-auto mb-8" />
                                <p
                                    className="text-[#222] text-2xl mb-3"
                                    style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                                >
                                    Gracias por tu interés
                                </p>
                                <p
                                    className="text-[#222]/40 text-sm"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    Nos pondremos en contacto contigo pronto.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        className="col-span-2 sm:col-span-1 w-full bg-white/70 border border-[#AA7D69]/20 px-5 py-4 text-[#222] placeholder-[#222]/25 text-sm outline-none focus:border-[#E1B19B]/70 transition-colors"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Teléfono"
                                        className="col-span-2 sm:col-span-1 w-full bg-white/70 border border-[#AA7D69]/20 px-5 py-4 text-[#222] placeholder-[#222]/25 text-sm outline-none focus:border-[#E1B19B]/70 transition-colors"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    className="w-full bg-white/70 border border-[#AA7D69]/20 px-5 py-4 text-[#222] placeholder-[#222]/25 text-sm outline-none focus:border-[#E1B19B]/70 transition-colors"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-[#222] hover:bg-[#333] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    Agendar visita
                                </button>
                                <a
                                    href="https://wa.me/5200000000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-3 border-2 border-[#25D366]/40 hover:border-[#25D366]/70 bg-transparent hover:bg-[#25D366]/5 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#25D366] transition-all duration-300"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Escríbenos por WhatsApp
                                </a>
                                <p className="text-center text-[10px] text-[#222]/25 pt-1" style={{ fontFamily: "var(--font-sans)" }}>
                                    Al enviar, aceptas nuestra política de privacidad.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

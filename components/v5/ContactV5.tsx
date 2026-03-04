"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

export default function ContactV5() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="contacto" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Full-bleed background */}
            <div className="absolute inset-0">
                <Image
                    src="/images/renders/entrance.jpg"
                    alt=""
                    fill
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#111]/30 via-transparent to-[#111]/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-14 py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: CTA text */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#E1B19B]/60 uppercase mb-8"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            (Contacto)
                        </p>

                        <h2
                            className="text-white leading-[1.05] mb-6"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.8rem, 6vw, 6rem)",
                            }}
                        >
                            Únete al mundo de{" "}
                            <em className="text-[#E1B19B]">Don Diego</em>
                        </h2>

                        <p
                            className="text-white/80 text-sm lg:text-base leading-relaxed max-w-md"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Descubre Don Diego en persona. Contáctanos para programar un recorrido privado
                            por nuestras tierras en San Miguel de Allende.
                        </p>

                        {/* Beliefs mini */}
                        <div className="mt-12 grid grid-cols-2 gap-6">
                            {[
                                { title: "Bienestar", desc: "Vida integral" },
                                { title: "Diseño", desc: "Espacios a la medida" },
                                { title: "Naturaleza", desc: "Conexión profunda" },
                                { title: "Comunidad", desc: "Enriquecimiento cultural" },
                            ].map((b, i) => (
                                <motion.div
                                    key={b.title}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                                >
                                    <p
                                        className="text-white/90 text-sm mb-1"
                                        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                                    >
                                        {b.title}
                                    </p>
                                    <p
                                        className="text-white/60 text-xs tracking-wider uppercase"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {b.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Glassmorphic form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="bg-white/[0.07] backdrop-blur-xl border border-white/10 p-8 lg:p-10 rounded-sm transform-gpu will-change-transform"
                    >
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="h-px w-16 bg-[#E1B19B]/50 mx-auto mb-8" />
                                <p
                                    className="text-white text-2xl mb-3"
                                    style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                                >
                                    Gracias por tu interés
                                </p>
                                <p
                                    className="text-white/40 text-sm"
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
                                        className="col-span-2 sm:col-span-1 w-full bg-white/10 border border-white/20 px-5 py-4 text-white placeholder-white/80 text-sm outline-none focus:border-[#E1B19B]/50 transition-colors rounded-sm"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Teléfono"
                                        className="col-span-2 sm:col-span-1 w-full bg-white/[0.06] border border-white/20 px-5 py-4 text-white placeholder-white/80 text-sm outline-none focus:border-[#E1B19B]/50 transition-colors rounded-sm"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    className="w-full bg-white/[0.06] border border-white/20 px-5 py-4 text-white placeholder-white/80 text-sm outline-none focus:border-[#E1B19B]/50 transition-colors rounded-sm"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-[#E1B19B] hover:bg-[#d4a48e] text-[#111] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 rounded-sm"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    Agendar visita
                                </button>
                                <a
                                    href="https://wa.me/5200000000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-3 border border-[#25D366]/30 hover:border-[#25D366]/60 bg-[#25D366]/5 hover:bg-[#25D366]/10 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#25D366]/90 transition-all duration-300 rounded-sm"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Escríbenos por WhatsApp
                                </a>
                                <p className="text-center text-[10px] text-white/70 pt-1" style={{ fontFamily: "var(--font-sans)" }}>
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

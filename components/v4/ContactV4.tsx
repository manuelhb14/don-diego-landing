"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

export default function ContactV4() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="contacto" className="relative overflow-hidden">
            {/* Warm blush/cream gradient band */}
            <div className="relative bg-gradient-to-b from-cream via-blush/30 to-cream py-24 lg:py-36">
                {/* Subtle background texture */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <Image
                        src="/images/renders/entrance.jpg"
                        alt=""
                        fill
                        className="object-cover object-center"
                    />
                </div>

                <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                        >
                            <p className="text-[10px] font-bold tracking-[0.25em] text-clay/50 uppercase mb-6">
                                Contacto
                            </p>

                            <h2
                                className="font-serif text-dark leading-[1.08] mb-6"
                                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}
                            >
                                Agenda tu visita a{" "}
                                <em className="text-clay">Don Diego</em>
                            </h2>

                            <p className="text-dark/40 text-[15px] leading-relaxed max-w-lg mx-auto mb-12">
                                Descubre en persona la integración de herencia colonial y diseño
                                contemporáneo. Contáctanos para un recorrido privado por nuestras tierras.
                            </p>
                        </motion.div>

                        {/* Form card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            className="bg-white border border-clay/10 p-8 lg:p-10 shadow-[0_8px_40px_rgba(170,125,105,0.06)]"
                        >
                            {submitted ? (
                                <div className="py-10">
                                    <div className="h-px w-16 bg-terracotta/40 mx-auto mb-8" />
                                    <p className="font-serif italic text-dark text-2xl mb-3">
                                        Gracias por tu interés
                                    </p>
                                    <p className="text-dark/35 text-sm">
                                        Nos pondremos en contacto contigo pronto.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Nombre"
                                            required
                                            className="w-full bg-cream/60 border border-clay/12 px-5 py-4 text-dark placeholder-dark/25 text-sm outline-none focus:border-terracotta/40 transition-colors"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Teléfono"
                                            className="w-full bg-cream/60 border border-clay/12 px-5 py-4 text-dark placeholder-dark/25 text-sm outline-none focus:border-terracotta/40 transition-colors"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Correo electrónico"
                                        required
                                        className="w-full bg-cream/60 border border-clay/12 px-5 py-4 text-dark placeholder-dark/25 text-sm outline-none focus:border-terracotta/40 transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-dark hover:bg-dark/85 text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300"
                                    >
                                        Agendar visita
                                    </button>
                                    <a
                                        href="https://wa.me/5200000000000"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full items-center justify-center gap-3 border-2 border-[#25D366]/30 hover:border-[#25D366]/60 bg-[#25D366]/5 hover:bg-[#25D366]/10 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#25D366] transition-all duration-300"
                                    >
                                        <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Escríbenos por WhatsApp
                                    </a>
                                    <p className="text-center text-[10px] text-dark/20 pt-1">
                                        Al enviar, aceptas nuestra política de privacidad.
                                    </p>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

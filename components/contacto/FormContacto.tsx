"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Copy, MapPin, Mail, Phone } from "lucide-react";

export default function FormContacto() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="contacto-form" className="bg-[#FFF3E1] py-24 md:py-32 px-6 md:px-12 lg:px-24 w-full relative">
            <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Left Side: Information */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center"
                >
                    <h2
                        className="text-[#222222] leading-none mb-8"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.5rem, 4vw, 4rem)",
                        }}
                    >
                        Conversemos sobre tu <br />
                        <span className="text-[#AA7D69] italic">próximo destino.</span>
                    </h2>

                    <p
                        className="text-[#222222]/80 text-base md:text-lg leading-relaxed max-w-lg mb-12"
                        style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.02em" }}
                    >
                        Descubre Don Diego en persona. Contáctanos para programar un recorrido privado por nuestras tierras, o envíanos un mensaje con tus consultas.
                    </p>

                    <div className="flex flex-col gap-8 w-full max-w-sm">

                        {/* Detail Block */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-full border border-[#AA7D69] flex items-center justify-center shrink-0 group-hover:bg-[#AA7D69] transition-colors duration-300">
                                <MapPin className="w-4 h-4 text-[#AA7D69] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                                <p className="text-[10px] tracking-[0.2em] text-[#AA7D69] uppercase font-bold mb-1" style={{ fontFamily: "var(--font-sans)" }}>Ubicación</p>
                                <p className="text-[#222222] font-serif text-lg leading-snug">San Miguel de Allende, <br />Guanajuato, México</p>
                            </div>
                        </div>

                        {/* Detail Block */}
                        <div className="flex items-start gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 rounded-full border border-[#AA7D69] flex items-center justify-center shrink-0 group-hover:bg-[#AA7D69] transition-colors duration-300">
                                <Mail className="w-4 h-4 text-[#AA7D69] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                                <p className="text-[10px] tracking-[0.2em] text-[#AA7D69] uppercase font-bold mb-1" style={{ fontFamily: "var(--font-sans)" }}>Correo</p>
                                <p className="text-[#222222] font-serif text-lg">info@dondiego.mx</p>
                            </div>
                        </div>

                        {/* Detail Block */}
                        <div className="flex items-start gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 rounded-full border border-[#AA7D69] flex items-center justify-center shrink-0 group-hover:bg-[#AA7D69] transition-colors duration-300">
                                <Phone className="w-4 h-4 text-[#AA7D69] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                                <p className="text-[10px] tracking-[0.2em] text-[#AA7D69] uppercase font-bold mb-1" style={{ fontFamily: "var(--font-sans)" }}>Teléfono / Whatsapp</p>
                                <p className="text-[#222222] font-serif text-lg">+52 000 000 0000</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full h-full min-h-[500px] flex items-center"
                >
                    <div className="w-full bg-[#1A1A1A] p-8 md:p-12 lg:p-16 rounded-2xl shadow-xl border border-[#AA7D69]/20 relative overflow-hidden group">
                        {/* Decorative bg shape */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E1B19B]/5 blur-[100px] rounded-full group-hover:bg-[#E1B19B]/10 transition-colors duration-1000 -translate-y-1/2 translate-x-1/3"></div>

                        {submitted ? (
                            <div className="text-center py-24 relative z-10 flex flex-col items-center justify-center h-full">
                                <div className="h-px w-16 bg-[#AA7D69]/50 mx-auto mb-8" />
                                <p
                                    className="text-[#E6E1D6] text-3xl mb-4"
                                    style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                                >
                                    ¡Gracias por tu mensaje!
                                </p>
                                <p
                                    className="text-[#E6E1D6]/60 text-base max-w-xs mx-auto"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    Nuestro equipo se pondrá en contacto contigo muy pronto.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <h3 className="text-[#E6E1D6] font-serif text-2xl mb-8">Envíanos un mensaje</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[#E6E1D6]/60 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-sans)" }}>Nombre Completo</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-transparent border-b border-[#E6E1D6]/20 py-3 text-[#E6E1D6] placeholder-[#E6E1D6]/30 text-base outline-none focus:border-[#AA7D69] transition-colors"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[#E6E1D6]/60 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-sans)" }}>Teléfono</label>
                                        <input
                                            type="tel"
                                            className="w-full bg-transparent border-b border-[#E6E1D6]/20 py-3 text-[#E6E1D6] placeholder-[#E6E1D6]/30 text-base outline-none focus:border-[#AA7D69] transition-colors"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                            placeholder="Tu número"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#E6E1D6]/60 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-sans)" }}>Correo Electrónico</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-transparent border-b border-[#E6E1D6]/20 py-3 text-[#E6E1D6] placeholder-[#E6E1D6]/30 text-base outline-none focus:border-[#AA7D69] transition-colors"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                        placeholder="tu@correo.com"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#E6E1D6]/60 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-sans)" }}>Mensaje</label>
                                    <textarea
                                        rows={4}
                                        required
                                        className="w-full bg-transparent border-b border-[#E6E1D6]/20 py-3 text-[#E6E1D6] placeholder-[#E6E1D6]/30 text-base outline-none focus:border-[#AA7D69] transition-colors resize-none"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                        placeholder="¿En qué podemos ayudarte?"
                                    />
                                </div>

                                <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto bg-[#AA7D69] hover:bg-[#8C7B6C] text-[#FFF3E1] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 rounded-sm"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        Enviar Mensaje
                                    </button>

                                    <a
                                        href="https://wa.me/5200000000000"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/wa flex items-center gap-3 text-[#E6E1D6]/70 hover:text-[#25D366] transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.15em]"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        <svg className="h-5 w-5 fill-current transition-colors" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Chat WhatsApp
                                    </a>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Socials Section */}
                    <div className="max-w-[1440px] mx-auto w-full mt-24 flex flex-col items-center">
                        <p className="text-[#222222] font-serif text-xl mb-8">Síguenos en nuestras redes</p>
                        <div className="flex items-center gap-8">
                            {/* Instagram */}
                            <a href="#" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-[#AA7D69]/30 flex items-center justify-center hover:bg-[#AA7D69] hover:text-white text-[#AA7D69] transition-all duration-300">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            {/* Facebook */}
                            <a href="#" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-[#AA7D69]/30 flex items-center justify-center hover:bg-[#AA7D69] hover:text-white text-[#AA7D69] transition-all duration-300">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                            {/* WhatsApp */}
                            <a href="#" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-[#AA7D69]/30 flex items-center justify-center hover:bg-[#AA7D69] hover:text-white text-[#AA7D69] transition-all duration-300">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                            {/* TikTok */}
                            <a href="#" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-[#AA7D69]/30 flex items-center justify-center hover:bg-[#AA7D69] hover:text-white text-[#AA7D69] transition-all duration-300">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.014 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.63-.38 3.23-1.07 4.67-1.15 2.4-3.52 4.31-6.19 4.8-1.55.3-3.15.22-4.66-.23-1.6-.47-3.08-1.45-4.13-2.73-1.28-1.57-2.04-3.53-2.12-5.55-.07-2.13.56-4.21 1.75-5.96 1.19-1.74 2.87-3.1 4.9-3.79 1.5-.52 3.12-.66 4.69-.42v3.83c-1.23-.22-2.52-.16-3.72.23-1.24.41-2.31 1.23-3.07 2.27-.6.82-1.01 1.78-1.18 2.8-.18 1.08-.06 2.19.34 3.19.49 1.25 1.34 2.31 2.45 2.97 1.19.7 2.6 1.01 3.97.94 1.3-.08 2.58-.55 3.56-1.39.87-.75 1.48-1.77 1.79-2.88.29-1.03.35-2.12.35-3.19v-14.8c-1.31 0-2.62.01-3.92.01-.01 0 0 0 .01 0z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
                );
}

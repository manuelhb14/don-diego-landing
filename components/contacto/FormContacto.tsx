"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

export default function FormContacto() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    phone: formData.get("phone") || "",
                    message: formData.get("message"),
                }),
            });

            const data = (await res.json()) as { error?: string };

            if (!res.ok) {
                throw new Error(data.error || "Error al enviar");
            }
            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al enviar. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contacto-form" className="bg-[#FFF3E1] pt-16 pb-12 md:py-32 px-6 md:px-12 lg:px-24 w-full relative">
            <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">

                {/* Left Side: Information */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center"
                >
                    <h2
                        className="text-[#222222] leading-none mb-4 lg:mb-8"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.5rem, 4vw, 4rem)",
                        }}
                    >
                        Conversemos sobre <br />
                        <span className="text-[#AA7D69] italic"> tu próximo hogar.</span>
                    </h2>

                    <p
                        className="text-[#222222]/80 text-sm md:text-lg leading-relaxed max-w-lg mb-6 lg:mb-12"
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
                                <p className="text-[#222222] font-serif text-base lg:text-lg leading-snug">San Miguel de Allende, <br />Guanajuato, México</p>
                            </div>
                        </div>

                        {/* Detail Block */}
                        <div className="flex items-start gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 rounded-full border border-[#AA7D69] flex items-center justify-center shrink-0 group-hover:bg-[#AA7D69] transition-colors duration-300">
                                <Mail className="w-4 h-4 text-[#AA7D69] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                                <p className="text-[10px] tracking-[0.2em] text-[#AA7D69] uppercase font-bold mb-1" style={{ fontFamily: "var(--font-sans)" }}>Correo</p>
                                <p className="text-[#222222] font-serif text-base lg:text-lg">info@dondiego.mx</p>
                            </div>
                        </div>

                        {/* Detail Block */}
                        <div className="flex items-start gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 rounded-full border border-[#AA7D69] flex items-center justify-center shrink-0 group-hover:bg-[#AA7D69] transition-colors duration-300">
                                <Phone className="w-4 h-4 text-[#AA7D69] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                                <p className="text-[10px] tracking-[0.2em] text-[#AA7D69] uppercase font-bold mb-1" style={{ fontFamily: "var(--font-sans)" }}>Teléfono / Whatsapp</p>
                                <p className="text-[#222222] font-serif text-base lg:text-lg">+52 000 000 0000</p>
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
                    <div className="w-full bg-[#1A1A1A] px-6 py-6 md:p-12 lg:p-16 rounded-2xl shadow-xl border border-[#AA7D69]/20 relative overflow-hidden group">
                        {/* Decorative bg shape */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E1B19B]/5 blur-[100px] rounded-full group-hover:bg-[#E1B19B]/10 transition-colors duration-1000 -translate-y-1/2 translate-x-1/3"></div>

                        {submitted ? (
                            <div className="text-center py-24 relative z-10 flex flex-col items-center justify-center h-full">
                                <div className="h-px w-16 bg-[#AA7D69]/50 mx-auto mb-4 lg:mb-8" />
                                <p
                                    className="text-[#E6E1D6] text-3xl mb-4"
                                    style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                                >
                                    Gracias por tu interés
                                </p>
                                <p
                                    className="text-[#E6E1D6]/60 text-base max-w-xs mx-auto"
                                    style={{ fontFamily: "var(--font-sans)" }}
                                >
                                    Nos pondremos en contacto contigo pronto.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <h3 className="text-[#E6E1D6] font-serif text-2xl mb-6 lg:mb-8">Envíanos un mensaje</h3>

                                {error && (
                                    <p className="text-red-400/90 text-sm" style={{ fontFamily: "var(--font-sans)" }}>
                                        {error}
                                    </p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-0 lg:gap-2">
                                        <label className="text-[#E6E1D6]/60 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-sans)" }}>Nombre Completo</label>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            disabled={loading}
                                            className="w-full bg-transparent border-b border-[#E6E1D6]/20 py-3 text-[#E6E1D6] placeholder-[#E6E1D6]/30 text-base outline-none focus:border-[#AA7D69] transition-colors disabled:opacity-60"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-0 lg:gap-2">
                                        <label className="text-[#E6E1D6]/60 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-sans)" }}>Teléfono</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            disabled={loading}
                                            className="w-full bg-transparent border-b border-[#E6E1D6]/20 py-3 text-[#E6E1D6] placeholder-[#E6E1D6]/30 text-base outline-none focus:border-[#AA7D69] transition-colors disabled:opacity-60"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                            placeholder="Tu número"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-0 lg:gap-2">
                                    <label className="text-[#E6E1D6]/60 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-sans)" }}>Correo Electrónico</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        disabled={loading}
                                        className="w-full bg-transparent border-b border-[#E6E1D6]/20 py-3 text-[#E6E1D6] placeholder-[#E6E1D6]/30 text-base outline-none focus:border-[#AA7D69] transition-colors disabled:opacity-60"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                        placeholder="tu@correo.com"
                                    />
                                </div>
                                <div className="flex flex-col gap-0 lg:gap-2">
                                    <label className="text-[#E6E1D6]/60 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-sans)" }}>Mensaje</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        required
                                        disabled={loading}
                                        className="w-full bg-transparent border-b border-[#E6E1D6]/20 py-3 text-[#E6E1D6] placeholder-[#E6E1D6]/30 text-base outline-none focus:border-[#AA7D69] transition-colors resize-none disabled:opacity-60"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                        placeholder="¿En qué podemos ayudarte?"
                                    />
                                </div>

                                <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="cursor-pointer w-full md:flex-1 bg-[#AA7D69] hover:brightness-110 transition-brightness duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-[#FFF3E1] px-4 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 rounded-sm whitespace-nowrap"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        {loading ? "Enviando…" : "Enviar Mensaje"}
                                    </button>

                                    <a
                                        href="https://wa.me/5200000000000"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full md:flex-1 items-center justify-center gap-3 border border-[#25D366]/30 hover:border-[#25D366]/60 bg-[#25D366]/5 hover:bg-[#25D366]/10 px-4 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#25D366]/90 transition-all duration-300 rounded-sm whitespace-nowrap"
                                        style={{ fontFamily: "var(--font-sans)" }}
                                    >
                                        <svg className="h-4 w-4 shrink-0 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Chat WhatsApp
                                    </a>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Socials Section */}
            <div className="max-w-[1440px] mx-auto w-full mt-8 lg:mt-24 flex flex-col items-center">
                <p className="text-[#222222] font-serif text-lg lg:text-xl mb-4 lg:mb-8">Síguenos en nuestras redes</p>
                <div className="flex items-center gap-4 lg:gap-8">
                    {/* Instagram */}
                    <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#AA7D69]/30 flex items-center justify-center hover:bg-[#AA7D69] hover:text-white text-[#AA7D69] transition-all duration-300">
                        <svg className="w-5 h-5 lg:w-7 lg:h-7 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a>
                    {/* Youtube */}
                    <a href="https://www.youtube.com/@dondiegosma" target="_blank" rel="noopener noreferrer" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#AA7D69]/30 flex items-center justify-center hover:bg-[#AA7D69] hover:text-white text-[#AA7D69] transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
                            className="w-7 h-7 lg:w-8 lg:h-8 fill-current"
                        ><path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z" /></svg>
                    </a>
                    {/* TikTok */}
                    <a href="https://www.tiktok.com/@dondiegosma" target="_blank" rel="noopener noreferrer" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#AA7D69]/30 flex items-center justify-center hover:bg-[#AA7D69] hover:text-white text-[#AA7D69] transition-all duration-300">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

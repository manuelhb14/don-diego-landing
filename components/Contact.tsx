"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

export default function Contact() {
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
                    message: "Solicitud de agendar visita desde la página principal",
                }),
            });

            const data = await res.json();

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
        <section id="contacto" className="relative flex items-center overflow-hidden bg-[#FFF3E1]">
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-14 py-12 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">

                    {/* Left: CTA text */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#E1B19B]/80 uppercase mb-8"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            (Contacto)
                        </p>

                        <h2
                            className="text-[#222222] leading-[1.05] mb-6"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.8rem, 6vw, 6rem)",
                            }}
                        >
                            Únete al mundo de{" "}
                            <em className="text-[#E1B19B]">Don Diego</em>
                        </h2>

                        <p
                            className="text-[#222222]/80 text-sm lg:text-base leading-relaxed max-w-md"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Descubre Don Diego en persona. Contáctanos para programar un recorrido privado
                            por nuestras tierras en San Miguel de Allende.
                        </p>

                        {/* Beliefs mini */}
                        <div className="mt-8 md:mt-12 grid grid-cols-2 gap-6">
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
                                        className="text-[#222222]/90 text-sm mb-1"
                                        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                                    >
                                        {b.title}
                                    </p>
                                    <p
                                        className="text-[#222222]/60 text-xs tracking-wider uppercase"
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
                        className="w-full h-full min-h-[500px] flex items-center"
                    >
                        <div className="w-full bg-[#1A1A1A] p-6 md:p-8 rounded-2xl shadow-xl border border-[#E1B19B]/20 relative overflow-hidden group">
                            {/* Decorative bg shape */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E1B19B]/5 blur-[100px] rounded-full group-hover:bg-[#E1B19B]/10 transition-colors duration-1000 -translate-y-1/2 translate-x-1/3"></div>

                            {submitted ? (
                                <div className="text-center py-24 relative z-10 flex flex-col items-center justify-center h-full">
                                    <div className="h-px w-16 bg-[#E1B19B]/50 mx-auto mb-8" />
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
                                    {error && (
                                        <p className="text-red-400/90 text-sm" style={{ fontFamily: "var(--font-sans)" }}>
                                            {error}
                                        </p>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[#E6E1D6]/60 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-sans)" }}>Nombre</label>
                                            <input
                                                name="name"
                                                type="text"
                                                required
                                                disabled={loading}
                                                className="w-full bg-transparent border-b border-[#E6E1D6]/20 py-3 text-[#E6E1D6] placeholder-[#E6E1D6]/30 text-base outline-none focus:border-[#E1B19B] transition-colors disabled:opacity-60"
                                                style={{ fontFamily: "var(--font-sans)" }}
                                                placeholder="Tu nombre"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[#E6E1D6]/60 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-sans)" }}>Teléfono</label>
                                            <input
                                                name="phone"
                                                type="tel"
                                                disabled={loading}
                                                className="w-full bg-transparent border-b border-[#E6E1D6]/20 py-3 text-[#E6E1D6] placeholder-[#E6E1D6]/30 text-base outline-none focus:border-[#E1B19B] transition-colors disabled:opacity-60"
                                                style={{ fontFamily: "var(--font-sans)" }}
                                                placeholder="Tu número"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[#E6E1D6]/60 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-sans)" }}>Correo electrónico</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            disabled={loading}
                                            className="w-full bg-transparent border-b border-[#E6E1D6]/20 py-3 text-[#E6E1D6] placeholder-[#E6E1D6]/30 text-base outline-none focus:border-[#E1B19B] transition-colors disabled:opacity-60"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                            placeholder="tu@correo.com"
                                        />
                                    </div>

                                    <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full md:flex-1 bg-[#E1B19B] hover:bg-[#d4a48e] disabled:opacity-60 disabled:cursor-not-allowed text-[#111] px-4 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 rounded-sm whitespace-nowrap"
                                            style={{ fontFamily: "var(--font-sans)" }}
                                        >
                                            {loading ? "Enviando…" : "Agendar visita"}
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
                                            Chat por WhatsApp
                                        </a>
                                    </div>
                                    <p className="text-center text-[10px] text-[#E6E1D6]/50 pt-0 lg:pt-4" style={{ fontFamily: "var(--font-sans)" }}>
                                        Al enviar, aceptas nuestra política de privacidad.
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

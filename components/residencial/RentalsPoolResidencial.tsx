"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function RentalsPoolResidencial() {
    return (
        <section
            id="rentals"
            aria-labelledby="rentals-pool-heading"
            className="bg-[#fff8ed] text-[#1F1D1B] py-14 lg:py-22 overflow-hidden border-t border-[#1F1D1B]/[0.06]"
        >
            <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-12 lg:gap-14 xl:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1 min-w-0"
                    >
                        <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-sm border border-[#1F1D1B]/[0.08] shadow-[0_20px_50px_rgba(47,39,33,0.12)]">
                            <Image
                                src="/babylon/rental.png"
                                alt="Rentals Don Diego"
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 42vw, 100vw"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.05 }}
                        className="order-1 lg:order-2 max-w-xl lg:max-w-none"
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#C28E7A] uppercase mb-4"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            [DON DIEGO RENTALS]
                        </p>
                        <h2
                            id="rentals-pool-heading"
                            className="text-[#1F1D1B] leading-[1.08]"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                            }}
                        >
                            Estancias de corto plazo, gestionadas por Don Diego
                        </h2>
                        <p
                            className="mt-4 text-[#C28E7A]/95 italic"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.15rem, 2vw, 1.65rem)",
                            }}
                        >
                            Un pool de rentas dentro del Club Residencial
                        </p>
                        <p
                            className="mt-6 text-[#1F1D1B]/80 text-base lg:text-[17px] leading-relaxed"
                            style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                        >
                            Selecciona unidades del desarrollo disponibles para hospedaje de corto plazo—reservas,
                            calendario y estándares de servicio coordinados por Don Diego Rentals. Los propietarios
                            delegan la operación; los huéspedes viven el mismo entorno del club con respaldo
                            profesional.
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="mt-9"
                        >
                            <Link
                                href="/proximamente"
                                className="inline-block text-[#1F1D1B] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-[#1F1D1B] pb-1 hover:opacity-60 transition-opacity"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                PRÓXIMAMENTE
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

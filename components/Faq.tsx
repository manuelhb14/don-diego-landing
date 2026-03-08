"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
    {
        question: "¿Qué es Don Diego Club Residencial y de qué componentes consta?",
        answer: "Es un desarrollo inmobiliario de uso mixto estructurado en torno a cuatro componentes con identidad propia: el Club Residencial (núcleo privado de residencias), Organic Farm & Flowers (paisaje productivo), Wellness Center (centro de bienestar integral y senior living) y la Presa de la Cantera (espacio público-privado junto al agua)."
    },
    {
        question: "¿Dónde se encuentra ubicado el desarrollo?",
        answer: "El desarrollo está ubicado de manera estratégica a tan solo 8 minutos del centro histórico de San Miguel de Allende, sobre la Carretera Celaya – Dolores Hidalgo. Colinda con la emblemática Presa Ignacio Allende y la Presa La Cantera."
    },
    {
        question: "¿El acceso a todos los componentes es exclusivo para residentes?",
        answer: "Mientras que el Club Residencial y el Organic Farm son exclusivos y prioritarios para los dueños y residentes, la Presa de la Cantera está concebida como un destino que se abre a la comunidad de San Miguel de Allende, integrando naturaleza y vida social con actividades culturales y recreativas."
    },
    {
        question: "¿Cómo funciona la parte productiva de \"Organic Farm & Flowers\"?",
        answer: "Recupera la vocación agrícola original del predio mediante agricultura orgánica y producción floral de temporada. Más allá de lo estético, los productos frescos nutren los restaurantes y la vida cotidiana del desarrollo. Este componente cuenta con huertos orgánicos, invernaderos y granjas de producción rodeados de andadores y ciclorutas."
    },
    {
        question: "¿Cuál es el diseño urbanístico enfocado al peatón?",
        answer: "El interior del desarrollo es 100% peatonal, liberando el espacio interior de automóviles. El diseño propone un circuito vehicular periférico en desnivel, mientras que el estacionamiento está techado con acceso peatonal directo a las viviendas con dos cajones por unidad."
    }
];

function FaqItem({ question, answer, isOpen, toggle }: { question: string, answer: string, isOpen: boolean, toggle: () => void }) {
    return (
        <div className="border-b border-white/10">
            <button
                onClick={toggle}
                className="w-full flex items-center justify-between py-6 lg:py-8 text-left group"
            >
                <h3
                    className="text-white text-lg lg:text-2xl pr-8 group-hover:text-[#E1B19B] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    {question}
                </h3>
                <span className="relative flex items-center justify-center w-6 h-6 shrink-0">
                    <span
                        className={`absolute w-full h-[1px] bg-white transition-opacity duration-300 group-hover:bg-[#E1B19B]`}
                    />
                    <span
                        className={`absolute w-[1px] h-full bg-white transition-all duration-300 group-hover:bg-[#E1B19B] ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                            }`}
                    />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p
                            className="text-white/60 text-sm lg:text-base leading-relaxed pb-8"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="bg-[#111] py-16 lg:py-36 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-24">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#E1B19B]/40 uppercase mb-4"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            [FAQ]
                        </p>
                        <h2
                            className="text-white leading-none mb-6"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)",
                            }}
                        >
                            Preguntas Frecuentes
                        </h2>
                        <p
                            className="text-white/40 text-base leading-relaxed max-w-sm"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            Encuentra respuestas a las dudas más comunes sobre el desarrollo, inversión y servicios de Don Diego Club Residencial.
                        </p>
                    </motion.div>

                    {/* FAQ Items */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="border-t border-white/10"
                    >
                        {faqs.map((faq, idx) => (
                            <FaqItem
                                key={idx}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === idx}
                                toggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

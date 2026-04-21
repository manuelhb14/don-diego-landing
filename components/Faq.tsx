"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";

type FaqEntry = { question: string; answer: string };

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
    const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([0]));
    const t = useTranslations("faq");
    const faqs = useMemo(() => t.raw("items") as FaqEntry[], [t]);

    return (
        <section id="faq" className="bg-[#2A2826] py-16 lg:py-36 overflow-hidden">
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
                            {t("kicker")}
                        </p>
                        <h2
                            className="text-white leading-none mb-6"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)",
                            }}
                        >
                            {t("title")}
                        </h2>
                        <p
                            className="text-white text-base leading-relaxed max-w-sm"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            {t("intro")}
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
                                isOpen={openIndices.has(idx)}
                                toggle={() =>
                                    setOpenIndices((prev) => {
                                        const next = new Set(prev);
                                        if (next.has(idx)) next.delete(idx);
                                        else next.add(idx);
                                        return next;
                                    })
                                }
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

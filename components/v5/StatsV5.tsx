"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "", duration = 500 }: { target: string; suffix?: string; duration?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);
    const numericTarget = parseInt(target.replace(/[^0-9]/g, ""));
    const hasPrefix = target.startsWith("~") || target.startsWith("+");
    const prefix = hasPrefix ? target[0] : "";
    const isSpecial = target === "24/7";

    useEffect(() => {
        if (!isInView || isSpecial) return;
        let start = 0;
        const end = numericTarget;
        const stepTime = Math.max(Math.floor(duration / end), 16);
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
        }, stepTime);
        return () => clearInterval(timer);
    }, [isInView, numericTarget, duration, isSpecial]);

    return (
        <span ref={ref}>
            {isSpecial ? (isInView ? "24/7" : "0") : `${prefix}${count}${suffix}`}
        </span>
    );
}

const stats = [
    { value: "364", suffix: "", label: "Residencias privadas" },
    { value: "8", suffix: " min", label: "Al Centro Histórico" },
    { value: "100", suffix: "%", label: "Peatonal y cercano" },
    { value: "24/7", suffix: "", label: "Concierge y seguridad" },
];

export default function StatsV5() {
    return (
        <section className="bg-[#FFF3E1] py-20 lg:py-28">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-14">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.12 }}
                            className="relative"
                        >
                            {/* Decorative top accent */}
                            <div className="h-1 w-8 bg-gradient-to-r from-[#AA7D69] to-[#E1B19B] mb-6 rounded-full" />

                            <div
                                className="text-[#222] leading-none mb-3"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(3rem, 6vw, 6.5rem)",
                                    fontWeight: 300,
                                }}
                            >
                                <AnimatedCounter target={s.value} suffix={s.suffix} />
                            </div>
                            <p
                                className="text-[#222]/35 text-xs tracking-wider uppercase"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {s.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import {
    CircleParking,
    Leaf,
    type LucideIcon,
    Route,
    ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";

const EASE_OUT_CUBIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const detailItems = [
    { key: "pedestrianPaths", icon: Route },
    { key: "parkingCircuit", icon: CircleParking },
    { key: "maintenance", icon: ShieldCheck },
    { key: "outdoorLiving", icon: Leaf },
] as const;

function DetailCard({
    Icon,
    title,
    body,
}: {
    Icon: LucideIcon;
    title: string;
    body: string;
}) {
    return (
        <div className="group flex min-h-[138px] min-w-0 flex-col bg-[#fff8ed] p-4 transition-colors duration-300 hover:bg-[#fff4ea] sm:min-h-[158px] sm:p-5 lg:min-h-[188px]">
            <span className="flex h-10 w-10 items-center justify-center border border-[#B76D4B]/22 bg-[#F4E1D7] text-[#B76D4B] transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon className="h-5 w-5 stroke-[1.45]" aria-hidden />
            </span>
            <div className="min-w-0 pt-3">
                <h3
                    className="text-[17px] leading-tight text-[#8D5639]"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    {title}
                </h3>
                <p
                    className="mt-2 text-pretty text-[13px] leading-[1.55] text-[#1F1D1B]/66"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {body}
                </p>
            </div>
        </div>
    );
}

export default function ResidentialDetailsHighlight() {
    const t = useTranslations("pages.residencial.overview");
    const shouldReduceMotion = useReducedMotion() ?? false;

    return (
        <div
            id="club-residencial-detalles"
            aria-labelledby="club-residencial-detalles-heading"
            className="mt-8 w-full text-[#1F1D1B]"
        >
            <h2 id="club-residencial-detalles-heading" className="sr-only">
                {t("titleLine1")} {t("titleAccent")}
            </h2>

            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: shouldReduceMotion ? 0 : 0.78,
                    ease: EASE_OUT_CUBIC,
                }}
                className="grid grid-cols-1 gap-px overflow-hidden border border-[#B76D4B]/18 bg-[#B76D4B]/16 sm:grid-cols-2 lg:grid-cols-4"
            >
                {detailItems.map(({ key, icon: Icon }) => (
                    <DetailCard
                        key={key}
                        Icon={Icon}
                        title={t(`items.${key}.title`)}
                        body={t(`items.${key}.body`)}
                    />
                ))}
            </motion.div>
        </div>
    );
}

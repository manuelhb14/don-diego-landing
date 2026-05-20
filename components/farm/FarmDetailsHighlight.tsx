"use client";

import { motion } from "motion/react";
import {
    Bike,
    Flower2,
    Leaf,
    Sprout,
    Tractor,
    Utensils,
} from "lucide-react";
import { useTranslations } from "next-intl";

const detailItems = [
    { key: "organicCrops", icon: Sprout },
    { key: "seasonalFlowers", icon: Flower2 },
    { key: "greenhouses", icon: Tractor },
    { key: "clubSupply", icon: Utensils },
    { key: "paths", icon: Bike },
    { key: "landCycle", icon: Leaf },
] as const;

export default function FarmDetailsHighlight() {
    const t = useTranslations("pages.farm.overview");

    return (
        <div className="w-full px-4 sm:px-6 lg:px-16">
            <h2 id="organic-farm-detalles-heading" className="sr-only">
                {t("title")}
            </h2>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="grid grid-cols-1 gap-px overflow-hidden border border-[#7e4255]/12 bg-[#7e4255]/12 lg:grid-cols-3 xl:grid-cols-6"
                aria-labelledby="organic-farm-detalles-heading"
            >
                {detailItems.map(({ key, icon: Icon }) => (
                    <div
                        key={key}
                        className="group flex min-h-[154px] min-w-0 flex-col bg-[#f7eadf]/78 p-4 transition-colors duration-300 hover:bg-[#fff4ea] sm:min-h-[176px] sm:p-5 lg:min-h-[224px]"
                    >
                        <span className="flex h-10 w-10 items-center justify-center border border-[#9B5C6E]/24 bg-[#ead1ce] text-[#8B4A5E] transition-transform duration-300 group-hover:-translate-y-0.5">
                            <Icon className="h-5 w-5 stroke-[1.45]" aria-hidden />
                        </span>
                        <div className="min-w-0 pt-4">
                            <h3
                                className="text-[17px] leading-tight text-[#6f394b]"
                                style={{ fontFamily: "var(--font-serif)" }}
                            >
                                {t(`items.${key}.title`)}
                            </h3>
                            <p
                                className="mt-2 text-pretty text-[13px] leading-[1.55] text-[#1a1917]/66"
                                style={{ fontFamily: "var(--font-sans)" }}
                            >
                                {t(`items.${key}.body`)}
                            </p>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

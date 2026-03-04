"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";

const team = [
  { key: "cimenta", logo: "/images/team/cimenta.png" },
  { key: "barragan", logo: "/images/team/barragan.png" },
  { key: "arredarq", logo: "/images/team/arredarq.png" },
] as const;

export default function TeamSection() {
  const t = useTranslations("team");

  return (
    <section id="equipo" className="bg-white py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 font-serif text-5xl tracking-tight text-dark md:text-6xl lg:text-7xl"
        >
          {t("heading")}
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {team.map(({ key, logo }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group flex flex-col items-center border border-dark/5 p-10 text-center transition-all duration-500 hover:border-dark/10 hover:bg-cream/30 lg:p-14"
            >
              <div className="relative mb-8 h-16 w-40">
                <Image
                  src={logo}
                  alt={t(`${key}.name`)}
                  fill
                  className="object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>

              <h3 className="font-sans text-lg font-bold text-dark">
                {t(`${key}.name`)}
              </h3>
              <p className="mt-1 font-sans text-xs font-bold uppercase tracking-[0.15em] text-terracotta">
                {t(`${key}.role`)}
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-dark/60">
                {t(`${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

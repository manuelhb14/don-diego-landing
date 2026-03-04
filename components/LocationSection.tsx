"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";

export default function LocationSection() {
  const t = useTranslations("location");

  const distances = [
    { place: t("centro"), time: t("centroTime") },
    { place: t("queretaro"), time: t("queretaroTime") },
    { place: t("cdmx"), time: t("cdmxTime") },
    { place: t("celaya"), time: t("celayaTime") },
  ];

  return (
    <section id="ubicacion" className="relative overflow-hidden bg-cream py-28 lg:py-40">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/location/aerial.png"
                alt="Location"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -right-6 -top-6 h-32 w-32 border-2 border-clay/20 lg:-right-8 lg:-top-8 lg:h-48 lg:w-48" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-serif text-5xl tracking-tight text-dark md:text-6xl lg:text-7xl">
              {t("heading")}
            </h2>

            <p className="mt-6 font-sans text-base leading-relaxed text-dark/60">
              {t("address")}
            </p>
            <p className="font-sans text-base text-dark/60">
              {t("city")}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6">
              {distances.map(({ place, time }, i) => (
                <motion.div
                  key={place}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="border-l-2 border-terracotta/40 pl-4"
                >
                  <p className="font-sans text-2xl font-bold text-dark">{time}</p>
                  <p className="mt-1 font-sans text-sm text-dark/60">{place}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-12 font-serif text-base italic text-clay">
              {t("presaNote")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

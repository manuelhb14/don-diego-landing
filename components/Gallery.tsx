"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const images = [
  { src: "/images/renders/render-1.png", alt: "Club Residencial Render" },
  { src: "/images/gallery/gallery-1.png", alt: "Render 2" },
  { src: "/images/gallery/gallery-2.png", alt: "Render 3" },
  { src: "/images/renders/entrance.jpg", alt: "Entrance" },
  { src: "/images/gallery/gallery-4.png", alt: "Render 6" },
  { src: "/images/renders/presa-1.png", alt: "Presa" },
  { src: "/images/gallery/gallery-7.png", alt: "Presa 2" },
  { src: "/images/renders/farm.jpg", alt: "Farm" },
  { src: "/images/gallery/gallery-10.jpg", alt: "Aerial" },
  { src: "/images/gallery/gallery-5.png", alt: "Render 7" },
];

export default function Gallery() {
  const t = useTranslations("gallery");
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <section id="galeria" className="bg-dark py-28 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 font-serif text-5xl tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            {t("heading")}
          </motion.h2>
        </div>

        <div className="mx-auto max-w-[100rem] px-4">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {images.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="mb-4 cursor-pointer overflow-hidden break-inside-avoid"
                onClick={() => setLightbox(i)}
              >
                <div className="group relative overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-dark/0 transition-colors duration-500 group-hover:bg-dark/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 font-sans text-2xl text-white/70 transition-colors hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + images.length) % images.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-3xl text-white/50 transition-colors hover:text-white lg:left-8"
            aria-label="Previous"
          >
            ‹
          </button>

          <Image
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            width={1400}
            height={900}
            className="max-h-[85vh] w-auto max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % images.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-3xl text-white/50 transition-colors hover:text-white lg:right-8"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}

"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { MAP_SECTION_IMAGE_SRC } from "@/lib/map-assets";

type GalleryCategory = "all" | "residences" | "amenities" | "surroundings" | "masterplan";

type GalleryItem = {
  id: string;
  src: string;
  category: Exclude<GalleryCategory, "all">;
  size: string;
  objectPosition?: string;
  priority?: boolean;
};

type GalleryItemText = {
  title: string;
  description: string;
  alt: string;
};

const CATEGORIES: GalleryCategory[] = ["all", "residences", "amenities", "surroundings", "masterplan"];

const FULL_GALLERY_LAYOUT = [
  "col-span-2 row-span-2 md:col-start-1 md:col-span-6 md:row-start-1 md:row-span-4",
  "col-span-1 row-span-1 md:col-start-7 md:col-span-3 md:row-start-1 md:row-span-2",
  "col-span-1 row-span-1 md:col-start-10 md:col-span-3 md:row-start-1 md:row-span-2",
  "col-span-2 row-span-1 md:col-start-7 md:col-span-6 md:row-start-3 md:row-span-2",
  "col-span-1 row-span-1 md:col-start-1 md:col-span-3 md:row-start-5 md:row-span-2",
  "col-span-1 row-span-1 md:col-start-4 md:col-span-3 md:row-start-5 md:row-span-2",
  "col-span-1 row-span-2 md:col-start-7 md:col-span-3 md:row-start-5 md:row-span-2",
  "col-span-1 row-span-2 md:col-start-10 md:col-span-3 md:row-start-5 md:row-span-2",
  "col-span-1 row-span-1 md:col-start-1 md:col-span-3 md:row-start-7 md:row-span-2",
  "col-span-1 row-span-2 md:col-start-4 md:col-span-3 md:row-start-7 md:row-span-2",
  "col-span-1 row-span-1 md:col-start-7 md:col-span-3 md:row-start-7 md:row-span-1",
  "col-span-2 row-span-1 md:col-start-10 md:col-span-3 md:row-start-7 md:row-span-1",
] as const;

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "casa-club",
    src: "/images/renders/render-1.png",
    category: "amenities",
    size: "",
    priority: true,
  },
  {
    id: "residencias-jardin",
    src: "/images/gallery/gallery-1.png",
    category: "residences",
    size: "",
    priority: true,
  },
  {
    id: "andadores",
    src: "/images/gallery/gallery-4.png",
    category: "residences",
    size: "",
    priority: true,
  },
  {
    id: "presa-cantera",
    src: "/images/renders/presa-1.png",
    category: "surroundings",
    size: "",
  },
  {
    id: "residencias",
    src: "/images/gallery/gallery-2.png",
    category: "residences",
    size: "",
  },
  {
    id: "masterplan",
    src: "/images/gallery/gallery-10.jpg",
    category: "masterplan",
    size: "",
  },
  {
    id: "malecon",
    src: "/images/renders/render-5.png",
    category: "surroundings",
    size: "",
  },
  {
    id: "acceso",
    src: "/images/renders/entrance.jpg",
    category: "amenities",
    size: "",
  },
  {
    id: "wellness",
    src: "/images/gallery/gallery-3.png",
    category: "amenities",
    size: "",
  },
  {
    id: "farm",
    src: "/final/organic-farms.webp",
    category: "surroundings",
    size: "",
  },
  {
    id: "pool",
    src: "/images/renders/pool.jpeg",
    category: "amenities",
    size: "",
  },
  {
    id: "mapa",
    src: MAP_SECTION_IMAGE_SRC,
    category: "masterplan",
    size: "",
  },
];

function getLightboxImageSizes() {
  return "(min-width: 1024px) 88vw, 96vw";
}

export default function GaleriaExperience() {
  const t = useTranslations("pages.galeria");
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const itemTexts = useMemo(() => t.raw("items") as Record<string, GalleryItemText>, [t]);
  const categoryLabels = useMemo(() => t.raw("categories") as Record<GalleryCategory, string>, [t]);

  const galleryItems = useMemo(
    () =>
      GALLERY_ITEMS.map((item) => ({
        ...item,
        ...itemTexts[item.id],
      })),
    [itemTexts],
  );

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  const activeItem = lightboxIndex === null ? null : filteredItems[lightboxIndex] ?? null;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrevious = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, lightboxIndex, showNext, showPrevious]);

  return (
    <>
      <section className="relative flex min-h-[40vh] w-full items-center justify-center overflow-hidden bg-[#fff8ed] py-14 md:min-h-[40vh] md:py-20">
        <div className="relative z-10 mt-12 flex w-full max-w-7xl flex-col items-center justify-center px-4 text-center md:mt-16">
          <div className="mb-6 flex w-full flex-col items-center">
            <p
              className="mb-6 text-[10px] uppercase tracking-[0.3em] text-[#AA7D69] sm:mb-8 sm:text-xs"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {t("kicker")}
            </p>

            <motion.div
              aria-label={t("title")}
              role="img"
              className="flex w-full max-w-[520px] justify-center px-4 pb-2 sm:px-8"
              initial={shouldReduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src="/logos/galeria.svg"
                alt=""
                width={1475}
                height={269}
                priority
                className="h-auto w-full"
              />
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md"
          >
            <p
              className="mb-4 text-lg font-medium leading-relaxed text-[#222222]/80 md:text-xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t("intro")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#fbf5ea] px-4 pb-10 text-[#242321] md:px-8 md:pb-14 lg:px-12">
        <div className="mx-auto max-w-[1680px]">
          <div className="mt-6 mb-2 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setLightboxIndex(null);
                    setActiveCategory(category);
                  }}
                  className={`h-8 min-w-[82px] shrink-0 rounded-[7px] px-3.5 text-[11px] transition-all duration-300 ${
                    isActive
                      ? "bg-[#242321] text-white shadow-[0_10px_25px_rgba(36,35,33,0.14)]"
                      : "bg-[#efe7dc] text-[#4f4942] hover:bg-[#e8ded0]"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                  aria-pressed={isActive}
                >
                  {categoryLabels[category]}
                </button>
              );
            })}
          </div>

          <motion.div
            id="galeria-grid"
            layout
            className="grid auto-rows-[170px] grid-cols-2 gap-3 md:auto-rows-[132px] md:grid-cols-12 md:gap-4 lg:auto-rows-[150px] xl:auto-rows-[172px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const tileClass = FULL_GALLERY_LAYOUT[index] ?? "lg:col-span-3 lg:row-span-1 md:col-span-3 md:row-span-1 col-span-1 row-span-1";

                return (
                  <motion.button
                    layout
                    key={item.id}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className={`group relative overflow-hidden bg-[#e5d8ca] text-left shadow-[0_18px_45px_rgba(62,45,31,0.12)] ${tileClass}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, delay: index * 0.025, ease: [0.215, 0.61, 0.355, 1] }}
                    aria-label={`${t("openImage")} ${item.title}`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      priority={item.priority}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                      style={{ objectPosition: item.objectPosition ?? "center" }}
                      sizes="(min-width: 1280px) 48vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-75" />
                    <span className="absolute bottom-1 left-1 max-w-[min(78%,360px)] border border-[#FFF3E1]/24 bg-[#141210]/48 px-3 py-2 text-[#FFF3E1] shadow-[0_16px_42px_rgba(20,16,12,0.28)] backdrop-blur-md md:bottom-2 md:left-2 md:px-4 md:py-3">
                      <span className="block text-[14px] leading-tight md:text-base" style={{ fontFamily: "var(--font-serif)" }}>
                        {item.title}
                      </span>
                      <span className="mt-1 hidden text-[12px] leading-5 text-[#FFF3E1]/78 md:block" style={{ fontFamily: "var(--font-sans)" }}>
                        {item.description}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#141210]/95 p-4 text-white md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
              aria-label={t("close")}
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 md:left-8"
              aria-label={t("previous")}
            >
              <ChevronLeft className="size-6" strokeWidth={1.4} />
            </button>

            <div className="grid w-full max-w-[1480px] gap-5" onClick={(event) => event.stopPropagation()}>
              <div className="relative mx-auto aspect-[16/10] max-h-[76vh] w-full overflow-hidden bg-black/20">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  className="object-contain"
                  sizes={getLightboxImageSizes()}
                  priority
                />
              </div>
              <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-2 text-left md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.26em] text-white/40" style={{ fontFamily: "var(--font-sans)" }}>
                    {lightboxIndex + 1} / {filteredItems.length}
                  </p>
                  <h2 className="mt-2 text-3xl leading-none md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>
                    {activeItem.title}
                  </h2>
                </div>
                <p className="max-w-md text-[13px] leading-6 text-white/64 md:text-right" style={{ fontFamily: "var(--font-sans)" }}>
                  {activeItem.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8"
              aria-label={t("next")}
            >
              <ChevronRight className="size-6" strokeWidth={1.4} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

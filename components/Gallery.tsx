"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useHasVisited } from "@/hooks/useHasVisited";

type GalleryCategory = "all" | "residences" | "amenities" | "surroundings" | "masterplan";

type GalleryItem = {
  id: string;
  src: string;
  category: Exclude<GalleryCategory, "all">;
  priority?: boolean;
};

type GalleryItemText = {
  title: string;
  description: string;
  alt: string;
};

const CATEGORIES: GalleryCategory[] = ["all", "residences", "amenities", "surroundings", "masterplan"];

const PREVIEW_LAYOUTS = [
  "col-span-2 row-span-2 md:col-span-6 md:row-span-2",
  "col-span-2 row-span-1 md:col-span-6 md:row-span-1",
  "col-span-1 row-span-1 md:col-span-3 md:row-span-1",
  "col-span-1 row-span-1 md:col-span-3 md:row-span-1",
] as const;

const HOME_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "casa-club",
    src: "/images/renders/render-1.png",
    category: "amenities",
    priority: true,
  },
  {
    id: "residencias-jardin",
    src: "/images/gallery/gallery-1.png",
    category: "residences",
    priority: true,
  },
  {
    id: "andadores",
    src: "/images/gallery/gallery-4.png",
    category: "residences",
    priority: true,
  },
  {
    id: "presa-cantera",
    src: "/images/renders/presa-1.png",
    category: "surroundings",
  },
  {
    id: "residencias",
    src: "/images/gallery/gallery-2.png",
    category: "residences",
  },
  {
    id: "masterplan",
    src: "/images/gallery/gallery-10.jpg",
    category: "masterplan",
  },
  {
    id: "malecon",
    src: "/images/renders/render-5.png",
    category: "surroundings",
  },
  {
    id: "acceso",
    src: "/images/renders/entrance.jpg",
    category: "amenities",
  },
];

export default function Gallery() {
  const t = useTranslations("pages.galeria");
  const hasVisited = useHasVisited();
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const itemTexts = useMemo(() => t.raw("items") as Record<string, GalleryItemText>, [t]);
  const categoryLabels = useMemo(() => t.raw("categories") as Record<GalleryCategory, string>, [t]);

  const galleryItems = useMemo(
    () =>
      HOME_GALLERY_ITEMS.map((item) => ({
        ...item,
        ...itemTexts[item.id],
      })),
    [itemTexts],
  );

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  const previewItems = useMemo(() => filteredItems.slice(0, 4), [filteredItems]);

  const activeItem = lightboxIndex === null ? null : previewItems[lightboxIndex] ?? null;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrevious = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current - 1 + previewItems.length) % previewItems.length;
    });
  }, [previewItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + 1) % previewItems.length;
    });
  }, [previewItems.length]);

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
      <section id="galeria" className="overflow-hidden bg-[#fff8ed] text-[#222222]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 py-12 md:px-10 lg:px-16 lg:pt-24">
          {/* Top: kicker + heading (left) & intro (right on lg) — matches Services */}
          <div className="mb-4 flex w-full items-end justify-between lg:mb-8">
            <motion.div
              initial={hasVisited ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#AA7D69]/60"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {t("kicker")}
              </p>
              <h2 className="leading-none text-[#222]" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 6rem)" }}>
                {t("title")}
              </h2>
            </motion.div>

            <motion.div
              initial={hasVisited ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex"
            >
              <p className="w-[350px] text-right text-base font-normal leading-[1.8] tracking-[0.01em] text-[#222]/80 font-serif">
                {t("intro")}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={hasVisited ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex md:mb-16 lg:hidden"
          >
            <p className="w-full text-lg font-normal leading-[1.8] tracking-[0.01em] text-[#222]/80 font-serif">
              {t("intro")}
            </p>
          </motion.div>

          <div className="flex w-full flex-col">
            <div className="mb-2 mt-4 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
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
                      ? "bg-[#222222] text-white shadow-[0_10px_25px_rgba(34,34,34,0.12)]"
                      : "bg-[#efe7dc] text-[#222]/70 hover:bg-[#e8ded0] hover:text-[#222]"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                  aria-pressed={isActive}
                >
                  {categoryLabels[category]}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <motion.div
              layout
              className="grid auto-rows-[155px] grid-cols-2 gap-3 md:h-[min(62vh,650px)] md:min-h-[500px] md:grid-cols-12 md:grid-rows-2 md:auto-rows-fr md:gap-4 lg:h-[calc(100vh-330px)] lg:min-h-[430px] lg:gap-5"
            >
              <AnimatePresence mode="popLayout">
                {previewItems.map((item, index) => {
                  const tileClass = PREVIEW_LAYOUTS[index] ?? "col-span-1 row-span-1 md:col-span-3 md:row-span-1";

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

            <div className="mb-12 mt-10 flex w-full justify-center md:mb-0 md:mt-12">
              <motion.div
                initial={hasVisited ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex w-full flex-col items-center"
              >
                <Link
                  href="/galeria"
                  className="inline-block border-b border-[#222] pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#222] transition-opacity hover:opacity-60 lg:text-[11px]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {t("viewAll")}
                </Link>
              </motion.div>
            </div>
          </div>
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
                  sizes="(min-width: 1024px) 88vw, 96vw"
                  priority
                />
              </div>
              <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-2 text-left md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.26em] text-white/40" style={{ fontFamily: "var(--font-sans)" }}>
                    {lightboxIndex + 1} / {previewItems.length}
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

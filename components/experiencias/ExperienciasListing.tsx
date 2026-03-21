"use client";

import { motion, AnimatePresence } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { useMemo, useState, useId, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";

type ExperienciaItem = {
    id: string;
    title: string;
    description: string;
    imageSrc?: string;
};

function GridCardMedia({ imageSrc, title }: { imageSrc?: string; title: string }) {
    return (
        <div className="relative overflow-hidden bg-[#EFE6DC] aspect-[7/8]">
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className="object-cover object-[center_58%]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw"
                    aria-hidden
                />
            ) : (
                <div
                    role="img"
                    aria-label={title}
                    className="absolute inset-0 bg-gradient-to-br from-[#E7DCCE] via-[#EFE6DC] to-[#E1D4C5]"
                />
            )}
        </div>
    );
}

/**
 * Vertical band in the viewport (as % of viewport height, measured from the top edge).
 * Slightly above center so panels open when the image sits a bit higher on screen.
 */
const VIEWPORT_TRIGGER_BAND_TOP_PCT = 22;
const VIEWPORT_TRIGGER_BAND_BOTTOM_PCT = 56;

function getGridColumnCount(): number {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
}

export default function ExperienciasListing() {
    const hasVisited = useHasVisited();
    const baseId = useId();
    const [openIds, setOpenIds] = useState<Set<string>>(new Set());
    const columnCountRef = useRef(getGridColumnCount());
    /** Measure only image + title row — excludes expanding panel so height doesn’t feed back into scroll scoring. */
    const anchorRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
    const scrollSyncPausedUntilRef = useRef(0);
    const scrollTickingRef = useRef(false);
    const skipLayoutPauseRef = useRef(true);

    useEffect(() => {
        const onResize = () => {
            const c = getGridColumnCount();
            if (c !== columnCountRef.current) {
                columnCountRef.current = c;
                setOpenIds(new Set());
            }
        };
        columnCountRef.current = getGridColumnCount();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const items = useMemo<ExperienciaItem[]>(
        () => [
            {
                id: "clubhouse",
                title: "Clubhouse",
                imageSrc: "/babylon/clubhouse.webp",
                description:
                    "El corazón social del club: espacios para reunirse, comer y convivir con vistas al entorno de San Miguel.",
            },
            {
                id: "piscina",
                title: "Piscina privada",
                imageSrc: "/babylon/pool.webp",
                description:
                    "Alberca del club residencial para nadar y relajarse en un entorno controlado y exclusivo para residentes e invitados.",
            },
            {
                id: "gimnasio",
                title: "Gimnasio exterior",
                imageSrc: "/babylon/gym.webp",
                description:
                    "Entrenamiento al aire libre integrado al paisaje, pensado para moverte sin renunciar al contacto con la naturaleza.",
            },
            {
                id: "spa",
                title: "Spa",
                imageSrc: "/babylon/spa.webp",
                description:
                    "Rutinas de bienestar y relajación en un santuario de calma dentro del club residencial.",
            },
            {
                id: "restaurante",
                title: "Restaurantes",
                imageSrc: "/babylon/restaurant.webp",
                description:
                    "Propuestas gastronómicas en la casa club: desde experiencias de autor hasta momentos informales entre vecinos.",
            },
            {
                id: "padel",
                title: "Padel",
                imageSrc: "/babylon/padel.webp",
                description:
                    "Canchas de pádel rodeadas de vegetación para jugar, tomar clase y organizar partidos con la comunidad.",
            },
            {
                id: "parques-infantiles",
                title: "Parques infantiles",
                imageSrc: "/babylon/presa-9.webp",
                description:
                    "Áreas de juego seguras y al aire libre para que los más pequeños exploren, corran y compartan el entorno con otras familias.",
            },
            {
                id: "club-nautico",
                title: "Club náutico",
                imageSrc: "/babylon/presa-10.webp",
                description:
                    "Amarres y actividades acuáticas en la Presa La Cantera: el corazón náutico del proyecto para quienes viven el lago a diario.",
            },
            {
                id: "locales-comerciales",
                title: "Locales comerciales",
                imageSrc: "/babylon/presa-7.webp",
                description:
                    "Frentes comerciales integrados al paseo lacustre: servicios, boutique y experiencias que activan el día a día del frente al agua.",
            },
            {
                id: "anfiteatro",
                title: "Anfiteatro al aire libre",
                imageSrc: "/babylon/presa-11.webp",
                description:
                    "Un escenario abierto para conciertos, cine y encuentros comunitarios frente al agua: el pulso cultural del frente lacustre.",
            },
            {
                id: "gastronomia-lacustre",
                title: "Gastronomía frente al agua",
                imageSrc: "/babylon/presa-5.webp",
                description:
                    "Terrazas y propuestas gastronómicas frente al agua: el lugar natural para cerrar el día o recibir a quienes visitan el desarrollo.",
            },
            {
                id: "coworking",
                title: "Coworking",
                imageSrc: "/babylon/coworking.webp",
                description:
                    "Espacios de trabajo en la casa club para concentrarte, reunirte y alternar productividad con el entorno del club.",
            },
            {
                id: "barras-cafe",
                title: "Barras de café",
                imageSrc: "/babylon/coffee-bar.webp",
                description:
                    "Barras de café en el corazón social del club: pausas, encuentros informales y el ritmo del día a día entre vecinos.",
            },
            {
                id: "salon-yoga",
                title: "Salón de yoga",
                imageSrc: "/babylon/yoga.webp",
                description:
                    "Salón dedicado a yoga y prácticas de movimiento en un ambiente sereno del club residencial.",
            },
            {
                id: "jacuzzis",
                title: "Jacuzzis privados",
                imageSrc: "/babylon/jacuzzi.webp",
                description:
                    "Jacuzzis entre riachuelos y paisaje: momentos de relax más allá de la alberca principal.",
            },
            {
                id: "shuttles",
                title: "Shuttles al centro histórico",
                imageSrc: "/babylon/shuttle-2.webp",
                description:
                    "Ruta coordinada entre el club y el centro de San Miguel para moverte sin fricción.",
            },
            {
                id: "paseos-huertos",
                title: "Paseos por los huertos",
                imageSrc: "/babylon/huerto.webp",
                description:
                    "Andadores que atraviesan hileras y bancales para ver de cerca el trabajo diario del huerto y cómo cambia el paisaje con las estaciones.",
            },
            {
                id: "cicloruta",
                title: "Cicloruta",
                imageSrc: "/babylon/farm-3.webp",
                description:
                    "Recorrer en bici la extensión productiva para integrarte al proceso natural y al ritmo de la granja.",
            },
            {
                id: "invernaderos",
                title: "Invernaderos y zonas de cultivo",
                imageSrc: "/babylon/farm-5.webp",
                description:
                    "Invernaderos en terrazas y cultivos organizados con enfoque sostenible y origen cercano.",
            },
            {
                id: "programas-educativos",
                title: "Programas educativos en la granja",
                imageSrc: "/babylon/farm-7.webp",
                description:
                    "Talleres y experiencias comunitarias alrededor de lo que se cultiva y cosecha en el proyecto.",
            },
            {
                id: "flores-temporada",
                title: "Flores de temporada",
                imageSrc: "/babylon/flowers.webp",
                description:
                    "Producción floral que marca estaciones, aroma y color en los espacios comunes de Don Diego.",
            },
            {
                id: "rehabilitacion",
                title: "Centro de rehabilitación",
                imageSrc: "/babylon/wellness-5.webp",
                description:
                    "Espacios especializados para recuperación física y manejo integral del dolor con equipamiento actual.",
            },
            {
                id: "senior-living",
                title: "Senior Living",
                imageSrc: "/babylon/wellness-6.webp",
                description:
                    "Residencias y servicios para una vida activa y acompañada, con comunidad de apoyo permanente.",
            },
            {
                id: "hospedaje-familiar",
                title: "Hospedaje familiar",
                imageSrc: "/babylon/wellness-7.webp",
                description:
                    "Departamentos pensados para que las familias estén cerca durante procesos de recuperación o estancias largas.",
            },
            {
                id: "jardines-terapeuticos",
                title: "Jardines terapéuticos",
                imageSrc: "/babylon/wellness-8.webp",
                description:
                    "Áreas verdes y de esparcimiento integradas con la naturaleza como parte del programa de bienestar.",
            },
            {
                id: "beach-club",
                title: "Beach club frente a la presa",
                imageSrc: "/babylon/presa-4.webp",
                description:
                    "Amenidades tipo playa frente a la Presa Allende: un polo de descanso y convivencia junto al agua.",
            },
            {
                id: "wifi-areas-comunes",
                title: "Wi‑Fi en áreas comunes",
                imageSrc: "/babylon/wifi.webp",
                description:
                    "Conectividad en espacios del club y zonas compartidas para trabajar, reunirte o compartir el día sin perder contacto.",
            },
        ],
        [],
    );

    const getRowItemIds = useCallback(
        (itemId: string): string[] => {
            const cols = columnCountRef.current;
            const idx = items.findIndex((i) => i.id === itemId);
            if (idx === -1) return [itemId];
            const rowStart = Math.floor(idx / cols) * cols;
            return items.slice(rowStart, rowStart + cols).map((i) => i.id);
        },
        [items],
    );

    const updateOpenRowsFromScroll = useCallback(() => {
        if (typeof window === "undefined") return;
        if (Date.now() < scrollSyncPausedUntilRef.current) return;

        const vh = window.innerHeight;
        const bandTop = vh * (VIEWPORT_TRIGGER_BAND_TOP_PCT / 100);
        const bandBottom = vh * (VIEWPORT_TRIGGER_BAND_BOTTOM_PCT / 100);
        const bandCenterY = (bandTop + bandBottom) / 2;

        let winner: { id: string; score: number } | null = null;

        for (const item of items) {
            const el = anchorRefs.current.get(item.id);
            if (!el) continue;
            const r = el.getBoundingClientRect();
            const overlapTop = Math.max(r.top, bandTop);
            const overlapBottom = Math.min(r.bottom, bandBottom);
            const overlap = overlapBottom - overlapTop;
            if (overlap <= 0) continue;

            const cardCenterY = r.top + r.height / 2;
            const score = overlap * 1000 - Math.abs(cardCenterY - bandCenterY);

            if (!winner || score > winner.score) {
                winner = { id: item.id, score };
            }
        }

        const nextIds = winner === null ? new Set<string>() : new Set(getRowItemIds(winner.id));
        setOpenIds((prev) => {
            if (prev.size === nextIds.size && [...prev].every((id) => nextIds.has(id))) return prev;
            return nextIds;
        });
    }, [items, getRowItemIds]);

    /** After any open state commit, briefly ignore scroll so browser scroll-anchoring / layout doesn’t re-enter the scorer. */
    useLayoutEffect(() => {
        if (skipLayoutPauseRef.current) {
            skipLayoutPauseRef.current = false;
            return;
        }
        scrollSyncPausedUntilRef.current = Date.now() + 240;
    }, [openIds]);

    useEffect(() => {
        const onScrollOrResize = () => {
            if (scrollTickingRef.current) return;
            scrollTickingRef.current = true;
            requestAnimationFrame(() => {
                scrollTickingRef.current = false;
                updateOpenRowsFromScroll();
            });
        };

        updateOpenRowsFromScroll();
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);

        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, [updateOpenRowsFromScroll]);

    return (
        <section className="overflow-visible bg-[#fff8ed]">
            <div className="mx-auto w-full max-w-[min(100%,1920px)] px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-12 lg:pt-0 lg:pb-16">
                {/* <motion.div
                    initial={hasVisited ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [Experiencias]
                    </p>
                    <h2
                        className="text-[#222] leading-none"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)",
                        }}
                    >
                        Actividades para disfrutar
                    </h2>
                    <h2
                        className="text-[#AA7D69]/90 italic"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)",
                        }}
                    >
                        dentro de Don Diego
                    </h2>
                </motion.div> */}

                <motion.div
                    initial={hasVisited ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.05 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-px bg-[#222222]/[0.08] border border-[#222222]/[0.08]"
                    style={{ overflowAnchor: "none" }}
                >
                    {items.map((item) => {
                        const isOpen = openIds.has(item.id);
                        const panelId = `${baseId}-${item.id}-panel`;

                        return (
                            <div
                                key={item.id}
                                className="bg-[#F6F0E8] p-2.5 sm:p-3 md:p-3.5 lg:p-4 flex flex-col min-w-0 w-full"
                            >
                                <div
                                    ref={(el) => {
                                        if (el) anchorRefs.current.set(item.id, el);
                                        else anchorRefs.current.delete(item.id);
                                    }}
                                    className="w-full flex flex-col min-w-0 shrink-0"
                                >
                                    <GridCardMedia imageSrc={item.imageSrc} title={item.title} />

                                    <div className="pt-3 flex items-center justify-between gap-2 min-w-0">
                                        <p
                                            id={`${baseId}-${item.id}-title`}
                                            className="text-base md:text-[17px] lg:text-2xl text-[#222222]/85 leading-snug flex-1 min-w-0"
                                            style={{ fontFamily: "var(--font-serif)" }}
                                        >
                                            {item.title}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                scrollSyncPausedUntilRef.current = Date.now() + 900;
                                                const rowIds = getRowItemIds(item.id);
                                                setOpenIds((prev) => {
                                                    if (prev.has(item.id)) {
                                                        const next = new Set(prev);
                                                        for (const id of rowIds) next.delete(id);
                                                        return next;
                                                    }
                                                    return new Set(rowIds);
                                                });
                                            }}
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            aria-label={
                                                isOpen
                                                    ? `Cerrar descripción de ${item.title}`
                                                    : `Abrir descripción de ${item.title}`
                                            }
                                            className={[
                                                "shrink-0 mt-px flex h-7 w-7 items-center justify-center rounded-full",
                                                "bg-[#111111] text-white shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]",
                                                "transition-[transform,background-color,box-shadow] duration-200",
                                                "hover:bg-black hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]",
                                                "active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F0E8]",
                                            ].join(" ")}
                                        >
                                            <motion.span
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                className="flex items-center justify-center"
                                                aria-hidden
                                            >
                                                <Plus className="h-3 w-3" strokeWidth={2.5} />
                                            </motion.span>
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={panelId}
                                            role="region"
                                            aria-labelledby={`${baseId}-${item.id}-title`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                height: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] },
                                                opacity: { duration: 0.22 },
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <p
                                                className="pt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-[#222]/72 border-t border-[#222222]/[0.08] mt-2.5"
                                                style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
                                            >
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </motion.div>

                <div className="flex justify-center mt-10 md:mt-12 w-full mb-12 md:mb-0">
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full sm:w-[60%] lg:w-[50%] flex flex-col items-end"
                    >
                        <p
                            className="text-[#222] text-xl font-medium leading-relaxed mb-4"
                            style={{ fontFamily: "var(--font-serif)" }}
                        >
                            El club ofrece una amplia gama de actividades para disfrutar, desde gimnasios hasta restaurantes y spa. La mayoría de las amenidades son exclusivas para los residentes y sus invitados.
                        </p>
                        <Link
                            href="/contacto"
                            className="inline-block text-[#222] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] border-b border-[#222] pb-1 hover:opacity-60 transition-opacity"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Agenda tu visita
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

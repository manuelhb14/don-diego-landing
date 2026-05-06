"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Dumbbell,
  Flower2,
  Heart,
  LockKeyhole,
  MapPin,
  Music,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sprout,
  SquareMenu,
  Utensils,
  UsersRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useHasVisited } from "@/hooks/useHasVisited";
import { cn } from "@/lib/utils";

const ACTIVITY_TIMES = ["07:30", "08:30", "09:30", "10:30", "11:30", "12:00"] as const;
const CARD_STACK_STAGGER_PX = 24;
const STACK_EXIT_SHIFT_PX = 96;
const STACK_EXIT_DURATION_MS = 480;
/** ease-in-out cubic — on-screen movement (stack “push”) */
const EASE_IN_OUT: [number, number, number, number] = [0.645, 0.045, 0.355, 1];
/** ease-out cubic — elements entering */
const EASE_OUT: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
/**
 * Thumbnails aligned with act1–act6
 * (Yoga, Pickleball, Pádel, Clases de Cocina, Spa, Coworking / Business Center)
 */
const ACTIVITY_IMAGES = [
  "/babylon/yoga.webp",
  "/final/pickleball.png",
  "/final/padel.jpg",
  "/final/clases.jpg",
  "/final/spa.jpg",
  "/babylon/coworking.webp",
] as const;
/** Farm order row thumbnails — item1 produce, item2 herbs, item3 bouquet */
const FARM_ORDER_IMAGES = [
  "/final/tomato.webp",
  "/final/mermelada.jpg",
  "/final/ramo.jpg",
] as const;

const FARM_ORDER_DETAILS = [
  "500 g  ·  Orgánicos",
  "250 ml  ·  Artesanal",
  "1 pieza  ·  De temporada",
] as const;

type TypingPhase = "typing" | "deleting" | "complete";

function ActivityBookingDemo({
  reduceMotion,
  labels,
}: {
  reduceMotion: boolean;
  labels: {
    q1: string; q2: string; q3: string; q4: string; q5: string; q6: string;
    act1: string; act2: string; act3: string; act4: string; act5: string; act6: string;
    placeholder: string;
  };
}) {
  const queries = useMemo(
    () => [labels.q1, labels.q2, labels.q3, labels.q4, labels.q5, labels.q6],
    [labels.q1, labels.q2, labels.q3, labels.q4, labels.q5, labels.q6],
  );
  const activities = useMemo(
    () => [labels.act1, labels.act2, labels.act3, labels.act4, labels.act5, labels.act6],
    [labels.act1, labels.act2, labels.act3, labels.act4, labels.act5, labels.act6],
  );

  const initialConfirmedCount = reduceMotion ? activities.length : 1;
  const initialQueryIdx = reduceMotion ? 0 : 1;

  const [queryIdx, setQueryIdx] = useState(initialQueryIdx);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<TypingPhase>("typing");
  // how many reservations have been confirmed so far
  const [confirmedCount, setConfirmedCount] = useState(initialConfirmedCount);
  const [stackExiting, setStackExiting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const query = queries[queryIdx];

    if (phase === "typing") {
      if (displayed.length >= query.length) {
        let eraseTimer: ReturnType<typeof setTimeout> | null = null;
        const t = setTimeout(() => {
          setConfirmedCount((c) => c + 1);
          eraseTimer = setTimeout(() => setPhase("deleting"), 500);
        }, 100);
        return () => {
          clearTimeout(t);
          if (eraseTimer) clearTimeout(eraseTimer);
        };
      }
      const t = setTimeout(
        () => setDisplayed(query.slice(0, displayed.length + 1)),
        55,
      );
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length === 0) {
        if (queryIdx >= queries.length - 1) {
          // all done — pause so the user can see all confirmed, then reset
          const t = setTimeout(() => setPhase("complete"), 0);
          return () => clearTimeout(t);
        }
        const t = setTimeout(() => {
          setQueryIdx((i) => i + 1);
          setPhase("typing");
        }, 500);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 28);
      return () => clearTimeout(t);
    }

    if (phase === "complete") {
      const t = setTimeout(() => {
        if (reduceMotion) {
          setConfirmedCount(initialConfirmedCount);
          setQueryIdx(initialQueryIdx);
          setDisplayed("");
          setPhase("typing");
        } else {
          setStackExiting(true);
        }
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [phase, displayed, queryIdx, queries, reduceMotion, initialConfirmedCount, initialQueryIdx]);

  useEffect(() => {
    if (!stackExiting || reduceMotion) return;
    const t = setTimeout(() => {
      setConfirmedCount(initialConfirmedCount);
      setQueryIdx(initialQueryIdx);
      setDisplayed("");
      setPhase("typing");
      setStackExiting(false);
    }, STACK_EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [stackExiting, reduceMotion, initialConfirmedCount, initialQueryIdx]);

  const activityMeta = [
    { category: "Bienestar", capacity: "8/12", icon: Heart },
    { category: "Deportes", capacity: "5/8", icon: Dumbbell },
    { category: "Deportes", capacity: "6/8", icon: Dumbbell },
    { category: "Cocina", capacity: "10/14", icon: Utensils },
    { category: "Bienestar", capacity: "4/6", icon: Flower2 },
    { category: "Trabajo", capacity: "6/10", icon: UsersRound },
  ] as const;

  return (
    <div className="relative flex h-full min-h-[250px] flex-col gap-4">
      {/* Search / command input */}
      <div className="flex min-h-12 shrink-0 items-center gap-3 rounded-[20px] border border-[#AA7D69]/15 bg-white px-4 shadow-[0_2px_8px_rgba(80,60,45,0.08)]">
        <Search className="h-4 w-4 shrink-0 text-[#AA7D69]/58" strokeWidth={2} />
        <div className="flex min-w-0 flex-1 items-center gap-px overflow-hidden">
          {displayed.length === 0 && !reduceMotion ? (
            <span className="truncate text-[11px] font-medium text-[#222]/32" style={{ fontFamily: "var(--font-sans)" }}>
              {labels.placeholder}
            </span>
          ) : (
            <span className="truncate text-[11px] font-medium text-[#222]/70" style={{ fontFamily: "var(--font-sans)" }}>
              {displayed}
            </span>
          )}
        </div>
        <SlidersHorizontal className="h-4.5 w-4.5 shrink-0 text-[#AA7D69]" strokeWidth={2} />
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden pb-1">
        <div className="relative mx-auto h-full min-h-[190px] w-full overflow-visible">
          {Array.from({ length: confirmedCount }).map((_, i) => {
            const centerShiftPx =
              confirmedCount > 0 ? ((confirmedCount - 1) * CARD_STACK_STAGGER_PX) / 2 : 0;
            const xOffsetPx = i * CARD_STACK_STAGGER_PX - centerShiftPx;
            const isNewest = i === confirmedCount - 1;
            const xTarget = stackExiting ? xOffsetPx - STACK_EXIT_SHIFT_PX : xOffsetPx;
            const meta = activityMeta[i] ?? activityMeta[0];
            const CategoryIcon = meta.icon;
            return (
            <motion.div
              key={i}
              initial={
                reduceMotion
                  ? false
                  : isNewest
                    ? {
                        opacity: 0,
                        scale: 0.96,
                        x: xOffsetPx + 28,
                        y: 6,
                      }
                    : false
              }
              animate={{
                opacity: stackExiting ? 0 : 1,
                scale: 1,
                x: xTarget,
                y: 0,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : stackExiting
                    ? {
                        x: { type: "tween", duration: STACK_EXIT_DURATION_MS / 1000, ease: EASE_IN_OUT },
                        opacity: { type: "tween", duration: STACK_EXIT_DURATION_MS / 1000, ease: EASE_IN_OUT },
                        scale: { duration: 0 },
                        y: { duration: 0 },
                      }
                    : {
                        x: { type: "tween", duration: 0.42, ease: EASE_IN_OUT },
                        opacity: { type: "tween", duration: 0.32, ease: EASE_OUT },
                        scale: { type: "tween", duration: 0.36, ease: EASE_OUT },
                        y: { type: "tween", duration: 0.36, ease: EASE_OUT },
                      }
              }
              className={cn(
                "absolute left-1/2 top-0 -ml-[6.75rem] flex w-[13.5rem] flex-col overflow-hidden rounded-[16px] border border-[#AA7D69]/12 bg-white will-change-transform",
              )}
              style={{ zIndex: i + 1 }}
            >
              <div className="relative h-[214px] w-full overflow-hidden bg-[#222]/[0.06]">
                <Image
                  src={ACTIVITY_IMAGES[i]!}
                  alt={activities[i]!}
                  fill
                  sizes="190px"
                  className="object-cover"
                />
                <span className="absolute left-0 top-2.5 inline-flex h-5 items-center gap-1 rounded-r-full bg-[#FFFCF7]/95 pl-2.5 pr-2.5 text-[9px] font-medium text-[#AA7D69] shadow-[0_2px_8px_rgba(80,60,45,0.12)]" style={{ fontFamily: "var(--font-sans)" }}>
                  <CategoryIcon className="h-2.5 w-2.5" strokeWidth={1.9} aria-hidden />
                  {meta.category}
                </span>
              </div>
              <div className="px-3 pb-5 pt-3 text-left">
                <h4 className="truncate text-center text-[15px] font-medium leading-tight text-[#222]" style={{ fontFamily: "var(--font-sans)" }}>
                  {activities[i]!}
                </h4>
                <div className="mt-2 flex min-w-0 items-center justify-between gap-1.5 text-[#8E7F73]">
                  <span className="inline-flex min-w-0 items-center gap-1 text-[8.5px] font-medium tabular-nums" style={{ fontFamily: "var(--font-sans)" }}>
                    <CalendarDays className="h-3 w-3 shrink-0 text-[#AA7D69]/68" strokeWidth={1.8} aria-hidden />
                    <span className="truncate">Sábado, 7 jun</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-[8.5px] font-medium tabular-nums" style={{ fontFamily: "var(--font-sans)" }}>
                    <Clock3 className="h-3 w-3 text-[#AA7D69]/68" strokeWidth={1.8} aria-hidden />
                    {ACTIVITY_TIMES[i]} - {ACTIVITY_TIMES[Math.min(i + 1, ACTIVITY_TIMES.length - 1)]}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-[8.5px] font-medium tabular-nums" style={{ fontFamily: "var(--font-sans)" }}>
                    <UsersRound className="h-3 w-3 text-[#AA7D69]/68" strokeWidth={1.8} aria-hidden />
                    {meta.capacity}
                  </span>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function QrPattern() {
  const cells = useMemo(() => {
    const seed = "don-diego-guest";
    const out: boolean[] = [];
    const size = 21;
    const inFinder = (r: number, c: number, originR: number, originC: number) => {
      const y = r - originR;
      const x = c - originC;
      if (x < 0 || x > 6 || y < 0 || y > 6) return false;
      return x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4);
    };

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (inFinder(r, c, 0, 0) || inFinder(r, c, 0, 14) || inFinder(r, c, 14, 0)) {
          out.push(true);
          continue;
        }
        const inFinderQuietZone =
          (r <= 7 && c <= 7) || (r <= 7 && c >= 13) || (r >= 13 && c <= 7);
        if (inFinderQuietZone) {
          out.push(false);
          continue;
        }
        const v = (seed.codePointAt((r * size + c) % seed.length) ?? 0) + r * 17 + c * 13;
        out.push(v % 4 !== 0 || (r + c) % 7 === 0);
      }
    }
    return out;
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[7px] bg-white p-2.5 shadow-[0_10px_24px_rgba(60,44,32,0.16)] ring-1 ring-[#AA7D69]/12">
      <div className="grid gap-px bg-white" style={{ gridTemplateColumns: "repeat(21, minmax(0, 1fr))" }}>
        {cells.map((on, i) => (
          <div
            key={i}
            className={cn(
              "aspect-square rounded-[1px]",
              on ? "bg-[#5A473C]/[0.78]" : "bg-white",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function GuestAccessDemo({
  reduceMotion,
  labels,
}: {
  reduceMotion: boolean;
  labels: { guestName: string; role: string; expires: string; verified: string };
}) {
  return (
    <div className="relative flex h-full min-h-[260px] items-center justify-center overflow-hidden px-1 py-2">
      <div className="relative w-full max-w-[297px] rounded-[18px] border border-[#CBBEAC]/70 bg-[#FFFDF8] px-7 pb-5 pt-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-14 h-24 opacity-45"
          style={{
            background:
              "repeating-radial-gradient(ellipse at 86% 0%, transparent 0 7px, rgba(170,125,105,0.12) 8px 9px, transparent 10px 16px)",
          }}
        />
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#B8A894] text-sm font-semibold text-white shadow-sm" style={{ fontFamily: "var(--font-sans)" }}>
            SR
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight text-[#222]" style={{ fontFamily: "var(--font-sans)" }}>
              {labels.guestName}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-[#222]/45" style={{ fontFamily: "var(--font-sans)" }}>
              {labels.role}
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-5 w-[min(100%,9.1rem)]">
          {!reduceMotion && (
            <motion.div
              className="pointer-events-none absolute inset-x-2 top-2 z-20 h-8 rounded-t-[7px] bg-gradient-to-b from-[#E1B19B]/30 to-transparent"
              animate={{ y: ["0%", "230%", "0%"] }}
              transition={{ type: "tween", duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <QrPattern />
        </div>

        <motion.div
          className="relative z-10 mx-auto mt-4 flex w-fit items-center gap-1.5 rounded-full bg-[#E9EDE4] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#506552]"
          style={{ fontFamily: "var(--font-sans)" }}
          animate={reduceMotion ? undefined : { opacity: [0.78, 1, 0.78] }}
          transition={{ type: "tween", duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} aria-hidden />
          {labels.verified}
        </motion.div>

        <div className="relative z-10 mt-5 border-t border-[#AA7D69]/24 pt-3.5">
          <p className="flex items-center justify-center gap-2 text-[10px] font-medium text-[#222]/45" style={{ fontFamily: "var(--font-sans)" }}>
            <LockKeyhole className="h-3.5 w-3.5 text-[#8F8172]" strokeWidth={1.7} aria-hidden />
            {labels.expires}
          </p>
        </div>
      </div>
    </div>
  );
}

function FarmOrdersDemo({
  reduceMotion,
  labels,
}: {
  reduceMotion: boolean;
  labels: {
    item1: string;
    item2: string;
    item3: string;
    statusOrdering: string;
    statusPreparing: string;
    statusReady: string;
  };
}) {
  const items = [labels.item1, labels.item2, labels.item3];
  const statusLabels = [labels.statusOrdering, labels.statusPreparing, labels.statusReady];
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setPhase((p) => (p + 1) % 4), 1600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const visibleCount = reduceMotion ? 3 : phase === 3 ? 3 : phase + 1;
  /** One status per visible tranche: 1 item → ordering, 2 → preparing, 3 → ready (phase 2 & 3 stay on ready). */
  const step = reduceMotion ? 2 : Math.min(phase, 2);
  const statusProgress = reduceMotion ? "100%" : `${Math.min(step + 1, 3) * 33.333}%`;

  return (
    <div className="relative flex h-full min-h-[320px] flex-col justify-center overflow-hidden px-1 py-2">
      <ul className="relative space-y-2.5">
        {items.map((label, i) => {
          const visible = i < visibleCount;
          const active = i === Math.min(visibleCount - 1, 2);
          const itemDetail = FARM_ORDER_DETAILS[i]!;
          return (
            <motion.li
              key={label}
              className={cn(
                "flex min-h-[5rem] items-center gap-3.5 rounded-[8px] border bg-[#FFFCF7] px-3 py-2.5 transition-shadow duration-300",
                active
                  ? "border-[#E8DDD1] shadow-[0_10px_24px_rgba(54,39,22,0.09)]"
                  : "border-[#EEE7DD] shadow-[0_4px_12px_rgba(54,39,22,0.035)]",
              )}
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: 1, x: 0 }
                  : {
                      opacity: visible ? 1 : 0.36,
                      x: visible ? 0 : 8,
                    }
              }
              transition={{ type: "spring", stiffness: 380, damping: 28, delay: reduceMotion ? 0 : i * 0.05 }}
            >
              <motion.div
                className="relative h-[3.95rem] w-[5.25rem] shrink-0 overflow-hidden rounded-[7px] border border-[#AA7D69]/10 bg-[#AA7D69]/8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]"
                animate={reduceMotion ? undefined : visible ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                transition={{ type: "tween", duration: 0.5 }}
              >
                <Image
                  src={FARM_ORDER_IMAGES[i]}
                  alt={label}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </motion.div>
              <div className="min-w-0 flex-1 pr-1">
                <p className="truncate text-sm font-semibold leading-tight text-[#222]/90" style={{ fontFamily: "var(--font-sans)" }}>
                  {label}
                </p>
                <p className="mt-1.5 truncate text-[11px] font-medium text-[#222]/42" style={{ fontFamily: "var(--font-sans)" }}>
                  {itemDetail}
                </p>
              </div>
              <motion.button
                type="button"
                aria-label={visible ? `${label} seleccionado` : `Agregar ${label}`}
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                  visible
                    ? "border-[#B77451] bg-[#B77451] text-white"
                    : "border-[#E8DDD1] bg-[#FFFCF7] text-[#B77451]/55",
                )}
                animate={reduceMotion ? undefined : visible ? { scale: [1, 1.09, 1] } : { scale: 1 }}
                transition={{ type: "tween", duration: 0.5 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {visible ? (
                    <motion.span
                      key="check"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.55, rotate: -18 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.55, rotate: 18 }}
                      transition={{ duration: 0.18, ease: EASE_OUT }}
                    >
                      <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="plus"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.55, rotate: -18 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.55, rotate: 18 }}
                      transition={{ duration: 0.18, ease: EASE_OUT }}
                    >
                      <Plus className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.li>
          );
        })}
      </ul>
      <div className="relative mt-3 rounded-[8px] border border-[#EEE7DD] bg-[#FFFCF7] px-3.5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3EEE5] text-[#8F715A]">
            <ShoppingBag className="h-4.5 w-4.5" strokeWidth={1.5} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={step}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: -6, transition: { duration: 0.2, ease: EASE_OUT } }
                }
                transition={{
                  duration: 0.32,
                  ease: EASE_OUT,
                  delay: reduceMotion ? 0 : 0.18,
                }}
                className="truncate text-[12px] font-bold leading-tight text-[#222]/90"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {statusLabels[step]}
              </motion.p>
            </AnimatePresence>
            <p className="mt-1 text-[11px] font-medium text-[#222]/48" style={{ fontFamily: "var(--font-sans)" }}>
              Listo estimado: 45 min
            </p>
          </div>
        </div>
        <span className="mt-2.5 block h-1 overflow-hidden rounded-full bg-[#E6DBCF]">
          <motion.span
            className="block h-full rounded-full bg-[#B77451]"
            initial={false}
            animate={{ width: statusProgress }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE_OUT }}
          />
        </span>
      </div>
    </div>
  );
}

function SanMiguelConnectDemo({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const eventRows = [
    {
      icon: Music,
      title: "Concierto en el Jardin",
      when: "Sáb 7 jun  ·  19:00",
      category: "Música",
    },
    {
      icon: ShoppingBag,
      title: "Mercado Orgánico",
      when: "Dom 8 jun  ·  10:00",
      category: "Gastronomía",
    },
    {
      icon: SquareMenu,
      title: "Exposición “Raíces”",
      when: "Dom 8 jun  ·  17:00",
      category: "Arte y cultura",
    },
  ] as const;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      className="relative flex h-full flex-col overflow-hidden rounded-[14px] border border-[#E7DED3] bg-[#FFFCF7] shadow-[0_12px_26px_rgba(76,61,43,0.07)]"
    >
      <motion.div
        className="relative min-h-[148px] overflow-hidden bg-[#4B3524] px-5 py-5"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE_OUT, delay: reduceMotion ? 0 : 0.45 }}
      >
        <Image
          src="/final/comunidad1.webp"
          alt=""
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 44vw, 88vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#2E2118]/85 via-[#2E2118]/52 to-[#2E2118]/12"
        />
        <div className="relative z-10 flex h-full max-w-[220px] flex-col justify-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/78" style={{ fontFamily: "var(--font-sans)" }}>
            Plan del fin de semana
          </p>
          <p className="mt-4 text-[24px] font-medium leading-[1.08] text-white drop-shadow-sm" style={{ fontFamily: "var(--font-serif)" }}>
            Arte, sabores
            <br />
            y buena compañía
          </p>
          <button
            type="button"
            className="mt-4 inline-flex w-fit items-center gap-1 border-b border-white/55 pb-0.5 text-[10px] font-semibold text-white/92"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Ver agenda completa
            <ChevronRight className="h-3 w-3" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </motion.div>

      <ul className="divide-y divide-[#EDE5DD]">
        {eventRows.map((event) => {
          const Icon = event.icon;

          return (
            <li key={event.title} className="flex min-h-[62px] items-center gap-3 px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#F8F4EE] text-[#8E806D]">
                <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium leading-tight text-[#222]/88" style={{ fontFamily: "var(--font-sans)" }}>
                  {event.title}
                </p>
                <p className="mt-1 truncate text-[10px] font-medium text-[#222]/48" style={{ fontFamily: "var(--font-sans)" }}>
                  {event.when}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-[#A59A8D]">
                <span className="hidden max-w-[84px] truncate text-right text-[10px] font-medium sm:block" style={{ fontFamily: "var(--font-sans)" }}>
                  {event.category}
                </span>
                <ChevronRight className="h-4 w-4 text-[#D5B9A8]" strokeWidth={2.2} aria-hidden />
              </div>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

type FeatureCardProps = {
  icon: typeof CalendarDays;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  delay: number;
  hasVisited: boolean;
};

function FeatureCard({
  icon: Icon,
  title,
  description,
  children,
  className,
  contentClassName,
  delay,
  hasVisited,
}: FeatureCardProps) {
  return (
    <motion.article
      initial={hasVisited ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-sm bg-[#FFFCF7] xl:min-h-[520px]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(120% 80% at 100% 0%, rgba(225,177,155,0.12), transparent 55%)",
        }}
      />
      <div className="relative flex flex-1 flex-col">
        <div className="p-4 md:p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#222222]/[0.08] bg-white/80 text-[#AA7D69]">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div>
              <h3 className="text-base font-medium leading-snug text-[#222]" style={{ fontFamily: "var(--font-serif)" }}>
                {title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#222]/55" style={{ fontFamily: "var(--font-serif)" }}>
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className={cn("relative mt-auto min-h-[210px] flex-1 p-3", contentClassName)}>
          {children}
        </div>
      </div>
    </motion.article>
  );
}

export default function AppFeaturesShowcase() {
  const hasVisited = useHasVisited();
  const reduceMotion = useReducedMotion() ?? false;
  const t = useTranslations("appFeatures");
  const tc = useTranslations("appFeatures.cards");

  return (
    <section className="relative overflow-hidden bg-[#EEE9DB] text-[#222222]" aria-labelledby="app-features-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(170,125,105,0.08),transparent)]" />
      <div className="relative mx-auto w-full max-w-[1560px] px-6 py-14 md:px-10 md:py-20 lg:px-10 lg:py-24">
        <motion.div
          initial={hasVisited ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-w-3xl md:mb-14"
        >
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[#AA7D69]/60" style={{ fontFamily: "var(--font-sans)" }}>
            {t("kicker")}
          </p>
          <h2
            id="app-features-heading"
            className="leading-[1.05] text-[#222]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.1rem, 4vw, 3.5rem)",
            }}
          >
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-[1.75] text-[#222]/60" style={{ fontFamily: "var(--font-serif)" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 xl:grid-cols-4 xl:gap-6">
          <FeatureCard
            icon={CalendarDays}
            title={tc("paddle.title")}
            description={tc("paddle.description")}
            delay={0}
            hasVisited={hasVisited}
          >
            <ActivityBookingDemo
              reduceMotion={reduceMotion}
              labels={{
                q1: tc("paddle.q1"),
                q2: tc("paddle.q2"),
                q3: tc("paddle.q3"),
                q4: tc("paddle.q4"),
                q5: tc("paddle.q5"),
                q6: tc("paddle.q6"),
                act1: tc("paddle.act1"),
                act2: tc("paddle.act2"),
                act3: tc("paddle.act3"),
                act4: tc("paddle.act4"),
                act5: tc("paddle.act5"),
                act6: tc("paddle.act6"),
                placeholder: tc("paddle.placeholder"),
              }}
            />
          </FeatureCard>

          <FeatureCard
            icon={ShieldCheck}
            title={tc("guest.title")}
            description={tc("guest.description")}
            delay={0.08}
            hasVisited={hasVisited}
          >
            <GuestAccessDemo
              reduceMotion={reduceMotion}
              labels={{
                guestName: tc("guest.guestName"),
                role: tc("guest.role"),
                expires: tc("guest.expires"),
                verified: tc("guest.verified"),
              }}
            />
          </FeatureCard>

          <FeatureCard
            icon={Sprout}
            title={tc("farm.title")}
            description={tc("farm.description")}
            delay={0.14}
            hasVisited={hasVisited}
          >
            <FarmOrdersDemo
              reduceMotion={reduceMotion}
              labels={{
                item1: tc("farm.item1"),
                item2: tc("farm.item2"),
                item3: tc("farm.item3"),
                statusOrdering: tc("farm.statusOrdering"),
                statusPreparing: tc("farm.statusPreparing"),
                statusReady: tc("farm.statusReady"),
              }}
            />
          </FeatureCard>

          <FeatureCard
            icon={MapPin}
            title={tc("sanMiguel.title")}
            description={tc("sanMiguel.description")}
            delay={0.2}
            hasVisited={hasVisited}
          >
            <SanMiguelConnectDemo reduceMotion={reduceMotion} />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  Search,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useHasVisited } from "@/hooks/useHasVisited";
import { cn } from "@/lib/utils";

const ACTIVITY_TIMES = ["07:30", "09:00", "11:00", "12:00"] as const;
const CARD_STACK_STAGGER_PX = 22;
/** How far the whole stack slides left on cycle reset (px) */
const STACK_EXIT_SHIFT_PX = 120;
const STACK_EXIT_DURATION_MS = 480;
/** ease-in-out cubic — on-screen movement (stack “push”) */
const EASE_IN_OUT: [number, number, number, number] = [0.645, 0.045, 0.355, 1];
/** ease-out cubic — elements entering */
const EASE_OUT: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
/** Thumbnails aligned with act1–act4 (yoga, tennis, padel, swimming) */
const ACTIVITY_IMAGES = [
  "/babylon/yoga.webp",
  "/images/renders/padel-1.png",
  "/babylon/padel.webp",
  "/babylon/piscina.webp",
] as const;
/** Farm order row thumbnails — item1 produce, item2 herbs, item3 bouquet */
const FARM_ORDER_IMAGES = [
  "/babylon/farm-1.webp",
  "/babylon/farm-3.webp",
  "/babylon/flowers.webp",
] as const;

const FARM_STATUS_ACCENTS: readonly {
  text: string;
  border: string;
  bg: string;
  bar: string;
}[] = [
  {
    text: "text-[#8B6914]",
    border: "border-[#C4A35A]/45",
    bg: "bg-transparent",
    bar: "bg-[#C4A35A]/55",
  },
  {
    text: "text-[#AA7D69]",
    border: "border-[#AA7D69]/40",
    bg: "bg-transparent",
    bar: "bg-[#AA7D69]/50",
  },
  {
    text: "text-[#2F5F3A]",
    border: "border-[#5A8A5A]/45",
    bg: "bg-transparent",
    bar: "bg-[#5A8A5A]/55",
  },
];

type TypingPhase = "typing" | "holding" | "deleting" | "complete";

function chunkArray<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function buildMonthGrid(year: number, month: number): (number | null)[][] {
  const first = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  const padStart = first.getDay();
  const cells: (number | null)[] = [];
  for (let i = 0; i < padStart; i++) cells.push(null);
  for (let d = 1; d <= lastDay; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return chunkArray(cells, 7);
}

/** Month (0–11), year, inclusive day range — aligned with stay1…stay3 (April/Jun/Jul 2026 each use 5 grid rows; May had 6) */
const RENTAL_CALENDAR_SLOTS = [
  { month: 3, year: 2026, startDay: 12, endDay: 19 },
  { month: 5, year: 2026, startDay: 3, endDay: 10 },
  { month: 6, year: 2026, startDay: 1, endDay: 5 },
] as const;

function ActivityBookingDemo({
  reduceMotion,
  labels,
}: {
  reduceMotion: boolean;
  labels: {
    q1: string; q2: string; q3: string; q4: string;
    act1: string; act2: string; act3: string; act4: string;
    confirm: string; placeholder: string;
  };
}) {
  const queries = useMemo(
    () => [labels.q1, labels.q2, labels.q3, labels.q4],
    [labels.q1, labels.q2, labels.q3, labels.q4],
  );
  const activities = useMemo(
    () => [labels.act1, labels.act2, labels.act3, labels.act4],
    [labels.act1, labels.act2, labels.act3, labels.act4],
  );

  const [queryIdx, setQueryIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<TypingPhase>("typing");
  // how many reservations have been confirmed so far
  const [confirmedCount, setConfirmedCount] = useState(reduceMotion ? 4 : 0);
  const [stackExiting, setStackExiting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const query = queries[queryIdx];

    if (phase === "typing") {
      if (displayed.length >= query.length) {
        const t = setTimeout(() => setPhase("holding"), 1000);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setDisplayed(query.slice(0, displayed.length + 1)),
        55,
      );
      return () => clearTimeout(t);
    }

    if (phase === "holding") {
      // confirm current activity, then start erasing
      const t = setTimeout(() => {
        setConfirmedCount((c) => c + 1);
        setPhase("deleting");
      }, 700);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length === 0) {
        if (queryIdx >= queries.length - 1) {
          // all done — pause so the user can see all confirmed, then reset
          setPhase("complete");
          return;
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
          setConfirmedCount(0);
          setQueryIdx(0);
          setDisplayed("");
          setPhase("typing");
        } else {
          setStackExiting(true);
        }
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [phase, displayed, queryIdx, queries, reduceMotion]);

  useEffect(() => {
    if (!stackExiting || reduceMotion) return;
    const t = setTimeout(() => {
      setConfirmedCount(0);
      setQueryIdx(0);
      setDisplayed("");
      setPhase("typing");
      setStackExiting(false);
    }, STACK_EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [stackExiting, reduceMotion]);

  const showCursor = phase !== "complete";

  return (
    <div className="relative flex h-full min-h-[200px] flex-col gap-3">
      {/* Search / command input */}
      <div className="flex shrink-0 items-center gap-2 rounded-sm border border-[#222222]/12 bg-transparent px-3 py-2.5">
        <Search className="h-3.5 w-3.5 shrink-0 text-[#AA7D69]/55" />
        <div className="flex min-w-0 flex-1 items-center gap-px overflow-hidden">
          {displayed.length === 0 && !reduceMotion ? (
            <span className="truncate text-[11px] text-[#222]/28" style={{ fontFamily: "var(--font-sans)" }}>
              {labels.placeholder}
            </span>
          ) : (
            <span className="truncate text-[11px] text-[#222]" style={{ fontFamily: "var(--font-sans)" }}>
              {displayed}
            </span>
          )}
          {!reduceMotion && showCursor && (
            <motion.span
              className="inline-flex shrink-0 text-[#AA7D69]/75"
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ type: "tween", duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </motion.span>
          )}
        </div>
      </div>

      {/* Confirmed reservations — overlapping cards, staggered right; offset re-centers bbox when count grows */}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-visible px-1">
        <div className="relative mx-auto min-h-[13rem] w-[min(100%,14.5rem)] shrink-0 overflow-visible">
          {Array.from({ length: confirmedCount }).map((_, i) => {
            const centerShiftPx =
              confirmedCount > 0 ? ((confirmedCount - 1) * CARD_STACK_STAGGER_PX) / 2 : 0;
            const xOffsetPx = i * CARD_STACK_STAGGER_PX - centerShiftPx;
            const isNewest = i === confirmedCount - 1;
            const xTarget = stackExiting ? xOffsetPx - STACK_EXIT_SHIFT_PX : xOffsetPx;
            return (
            <motion.div
              key={i}
              initial={
                reduceMotion
                  ? false
                  : isNewest
                    ? {
                        opacity: 0,
                        scale: 0.94,
                        x: xOffsetPx + 36,
                        y: 8,
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
                "absolute bottom-0 left-1/2 flex w-[10rem] -ml-[5rem] flex-col overflow-hidden rounded-[8px] border border-[#AA7D69]/18 bg-[#FFFCF7] shadow-[0_2px_6px_rgba(0,0,0,0.06)] will-change-transform",
              )}
              style={{ zIndex: i + 1 }}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#222]/[0.06]">
                <Image
                  src={ACTIVITY_IMAGES[i]}
                  alt={activities[i]}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-[3px] bg-[#4A7A4A]/95 text-white">
                  <Check className="h-3 w-3" strokeWidth={2.75} aria-hidden />
                </span>
              </div>
              <div className="flex flex-col items-stretch gap-px px-2 py-1.5 text-left">
                <span
                  className="line-clamp-1 w-full text-left text-xs font-medium leading-snug text-[#222]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {activities[i]}
                </span>
                <span
                  className="text-left text-[10px] font-medium tabular-nums leading-snug text-[#AA7D69]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {ACTIVITY_TIMES[i]}{" "}
                  <span className="text-[#AA7D69]/40" aria-hidden>
                    ·
                  </span>{" "}
                  <span className="font-semibold uppercase tracking-[0.08em] text-[#AA7D69]/65">
                    {labels.confirm}
                  </span>
                </span>
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
    for (let r = 0; r < 11; r++) {
      for (let c = 0; c < 11; c++) {
        const v = (seed.codePointAt((r * 11 + c) % seed.length) ?? 0) + r * 17 + c * 13;
        out.push(v % 3 !== 0);
      }
    }
    return out;
  }, []);

  return (
    <div className="grid grid-cols-11 gap-px rounded-sm border border-[#222222]/10 bg-[#222222]/10 p-1.5">
      {cells.map((on, i) => (
        <div key={i} className={cn("aspect-square rounded-[1px]", on ? "bg-[#222]" : "bg-white")} />
      ))}
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
    <div className="relative flex h-full min-h-[200px] items-center justify-center overflow-hidden">
      <div className="relative flex w-full max-w-[220px] flex-col gap-3">
        <div className="relative overflow-hidden rounded-sm border border-[#222222]/10 bg-transparent p-3">
          {!reduceMotion && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-[#E1B19B]/35 to-transparent"
              animate={{ y: ["0%", "220%", "0%"] }}
              transition={{ type: "tween", duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <div className="mx-auto w-[min(100%,7.5rem)]">
            <QrPattern />
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#222222]/[0.06] pt-2.5">
            <div>
              <p className="text-[11px] font-medium text-[#222]" style={{ fontFamily: "var(--font-sans)" }}>
                {labels.guestName}
              </p>
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#AA7D69]/80" style={{ fontFamily: "var(--font-sans)" }}>
                {labels.role}
              </p>
            </div>
            <motion.span
              className="rounded-full bg-[#D7D7AA]/35 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#222]/70"
              style={{ fontFamily: "var(--font-sans)" }}
              animate={reduceMotion ? undefined : { opacity: [0.65, 1, 0.65] }}
              transition={{ type: "tween", duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {labels.verified}
            </motion.span>
          </div>
        </div>
        <p className="text-center text-[10px] font-medium tracking-wide text-[#222]/45" style={{ fontFamily: "var(--font-sans)" }}>
          {labels.expires}
        </p>
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
  const accent = FARM_STATUS_ACCENTS[step]!;

  return (
    <div className="relative flex h-full min-h-[200px] flex-col justify-center overflow-hidden">
      <ul className="relative space-y-2.5">
        {items.map((label, i) => {
          const visible = i < visibleCount;
          return (
            <motion.li
              key={label}
              className="flex items-center gap-3 rounded-sm border border-[#222222]/[0.08] bg-transparent"
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: 1, x: 0 }
                  : {
                      opacity: visible ? 1 : 0.2,
                      x: visible ? 0 : 10,
                    }
              }
              transition={{ type: "spring", stiffness: 380, damping: 28, delay: reduceMotion ? 0 : i * 0.05 }}
            >
              <motion.div
                className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-[#AA7D69]/18 bg-[#AA7D69]/8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]"
                animate={reduceMotion ? undefined : visible ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                transition={{ type: "tween", duration: 0.5 }}
              >
                <Image
                  src={FARM_ORDER_IMAGES[i]}
                  alt={label}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </motion.div>
              <span className="text-[11px] font-medium text-[#222]/85" style={{ fontFamily: "var(--font-sans)" }}>
                {label}
              </span>
            </motion.li>
          );
        })}
      </ul>
      <div
        className={cn(
          "relative mt-4 flex min-h-[2.75rem] items-center justify-between gap-2 rounded-sm border border-dashed px-3 py-2 opacity-100 transition-colors duration-[480ms]",
          accent.border,
          accent.bg,
        )}
      >
        <div className="flex min-h-[2.5rem] min-w-0 flex-1 items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
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
              className={cn(
                "block max-w-[13rem] text-[10px] font-semibold leading-snug tracking-[0.04em]",
                accent.text,
              )}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {statusLabels[step]}
            </motion.span>
          </AnimatePresence>
        </div>
        {!reduceMotion && (
          <motion.span
            className={cn(
              "h-1 w-12 shrink-0 origin-left rounded-full transition-colors duration-[480ms]",
              accent.bar,
            )}
            animate={{ scaleX: [0.35, 1, 0.35] }}
            transition={{ type: "tween", duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    </div>
  );
}

function UpcomingRentalsDemo({
  reduceMotion,
  labels,
}: {
  reduceMotion: boolean;
  labels: {
    stay1: string;
    date1: string;
    stay2: string;
    date2: string;
    stay3: string;
    date3: string;
    calendarEyebrow: string;
    calendarSelected: string;
  };
}) {
  const locale = useLocale();
  const stays = [
    { name: labels.stay1, rangeLabel: labels.date1 },
    { name: labels.stay2, rangeLabel: labels.date2 },
    { name: labels.stay3, rangeLabel: labels.date3 },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % RENTAL_CALENDAR_SLOTS.length),
      3200,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const idx = reduceMotion ? 0 : active;
  const slot = RENTAL_CALENDAR_SLOTS[idx]!;
  const grid = useMemo(() => buildMonthGrid(slot.year, slot.month), [slot.year, slot.month]);

  const weekdayNarrow = useMemo(() => {
    const sun = new Date(2024, 0, 7);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sun);
      d.setDate(sun.getDate() + i);
      return new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(d);
    });
  }, [locale]);

  const monthLabel = useMemo(() => {
    return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
      new Date(slot.year, slot.month, 1),
    );
  }, [locale, slot.year, slot.month]);

  const inRange = (day: number | null) =>
    day != null && day >= slot.startDay && day <= slot.endDay;

  return (
    <div className="relative flex h-full min-h-[200px] flex-col justify-center overflow-hidden text-[#222]">
      <div className="mb-2 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p
              className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#AA7D69]/75"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {labels.calendarEyebrow}
            </p>
            <p
              className="mt-0.5 truncate text-[11px] font-medium text-[#222]/90"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {stays[idx]!.name}
            </p>
          </div>
          <CalendarDays className="h-4 w-4 shrink-0 text-[#AA7D69]/55" aria-hidden />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={idx}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <div className="flex items-center justify-center gap-1.5">
              <ChevronLeft className="h-3.5 w-3.5 shrink-0 text-[#222]/25" aria-hidden />
              <p
                className="min-w-0 flex-1 text-center text-[10px] font-semibold capitalize leading-tight text-[#222]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {monthLabel}
              </p>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#222]/25" aria-hidden />
            </div>

            <div className="mt-2 grid grid-cols-7 gap-y-0.5">
              {weekdayNarrow.map((w, i) => (
                <span
                  key={`w-${i}`}
                  className="flex h-5 items-center justify-center text-[8px] font-medium text-[#222]/35"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {w}
                </span>
              ))}
              {grid.flat().map((day, i) => (
                <motion.span
                  key={`d-${idx}-${i}-${day ?? "x"}`}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 28,
                    delay: reduceMotion ? 0 : (i % 7) * 0.012 + Math.floor(i / 7) * 0.04,
                  }}
                  className={cn(
                    "flex h-6 items-center justify-center rounded-[3px] text-[9px] tabular-nums",
                    day == null && "pointer-events-none invisible",
                    day != null && !inRange(day) && "text-[#222]/35",
                    day != null &&
                      inRange(day) &&
                      "bg-[#AA7D69]/20 font-semibold text-[#222] ring-1 ring-[#AA7D69]/25",
                  )}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {day ?? ""}
                </motion.span>
              ))}
            </div>

            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#222222]/[0.06] pt-2">
              <p className="text-[9px] font-medium text-[#AA7D69]/85" style={{ fontFamily: "var(--font-sans)" }}>
                {stays[idx]!.rangeLabel}
              </p>
              <span
                className="rounded-full border border-[#AA7D69]/22 bg-[#AA7D69]/[0.08] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#AA7D69]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {labels.calendarSelected}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
    </div>
  );
}

type FeatureCardProps = {
  icon: typeof CalendarDays;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  delay: number;
  hasVisited: boolean;
};

function FeatureCard({ icon: Icon, title, description, children, className, delay, hasVisited }: FeatureCardProps) {
  return (
    <motion.article
      initial={hasVisited ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-sm bg-[#FFFCF7]",
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
        <div className="p-6 md:p-7">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#222222]/[0.08] bg-white/80 text-[#AA7D69] shadow-sm">
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <div>
              <h3 className="text-lg font-medium leading-snug text-[#222]" style={{ fontFamily: "var(--font-serif)" }}>
                {title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#222]/55" style={{ fontFamily: "var(--font-serif)" }}>
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="relative mt-auto min-h-[210px] flex-1 p-3">
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
      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-14 md:px-10 md:py-20 lg:px-16 lg:py-24">
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
                act1: tc("paddle.act1"),
                act2: tc("paddle.act2"),
                act3: tc("paddle.act3"),
                act4: tc("paddle.act4"),
                confirm: tc("paddle.confirm"),
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
            icon={Home}
            title={tc("rentals.title")}
            description={tc("rentals.description")}
            delay={0.2}
            hasVisited={hasVisited}
          >
            <UpcomingRentalsDemo
              reduceMotion={reduceMotion}
              labels={{
                stay1: tc("rentals.stay1"),
                date1: tc("rentals.date1"),
                stay2: tc("rentals.stay2"),
                date2: tc("rentals.date2"),
                stay3: tc("rentals.stay3"),
                date3: tc("rentals.date3"),
                calendarEyebrow: tc("rentals.calendarEyebrow"),
                calendarSelected: tc("rentals.calendarSelected"),
              }}
            />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

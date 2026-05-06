"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Church, Compass, Flower2, Heart, Landmark, Leaf, MapPin, Plane, Route, ShieldCheck, TreePine, Wine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Location from "@/components/Location";

const revealEase = [0.25, 0.46, 0.45, 0.94] as const;

const infoCards = [
    {
        title: "Posición privilegiada",
        body: "Entorno natural, conectividad estratégica y riqueza cultural.",
        icon: Compass,
    },
    {
        title: "Patrimonio Cultural",
        body: "Ciudad Patrimonio de la Humanidad por la UNESCO.",
        icon: Landmark,
    },
    {
        title: "Conectividad",
        body: "Conexión a las principales ciudades del Bajío y del país.",
        icon: Route,
    },
    {
        title: "Entorno Único",
        body: "Naturaleza, arte, gastronomía y bienestar en equilibrio.",
        icon: ShieldCheck,
    },
];

const lifestyleCards = [
    {
        title: "Ritmo sereno",
        body: "Una forma de vida más pausada y consciente.",
        icon: Leaf,
    },
    {
        title: "Cultura viva",
        body: "Arte, tradición y creatividad presentes cada día.",
        icon: Flower2,
    },
    {
        title: "Paisaje inspirador",
        body: "Jardines, cielo abierto y naturaleza integrada.",
        icon: TreePine,
    },
    {
        title: "Bienestar cotidiano",
        body: "Espacios y experiencias que favorecen el equilibrio.",
        icon: Heart,
    },
];

const guideCards = [
    {
        title: "San Miguel de Allende 2024",
        body: "Lo mejor de la ciudad: arte, diseño, gastronomía y experiencias que debes vivir.",
        image: "/final/sma.webp",
        href: "/blog/guia-san-miguel-allende-2026",
    },
    {
        title: "Lo Mejor de Ciudad Pequeña del Mundo",
        body: "Los imperdibles cerca de Don Diego para una vida plena y auténtica.",
        image: "/babylon/sma-1.webp",
        href: "/blog/mejor-ciudad-pequena",
    },
];

const nearbyCards = [
    {
        title: "Centro Histórico",
        time: "8 Min",
        body: "Corazón de la ciudad, restaurantes y cultura.",
        image: "/final/sma.webp",
        icon: Landmark,
    },
    {
        title: "Fábrica La Aurora",
        time: "10 Min",
        body: "Centro de arte y diseño.",
        image: "/babylon/sma-1.webp",
        icon: Compass,
    },
    {
        title: "Viñedos Circundantes",
        time: "20 Min",
        body: "Catas al atardecer y experiencias enoturísticas.",
        image: "/final/vinedo.webp",
        icon: Wine,
    },
    {
        title: "Santuario de Atotonilco",
        time: "25 Min",
        body: "Patrimonio barroco, historia y arquitectura sagrada.",
        image: "/final/sma.jpg",
        icon: Church,
    },
];

const bottomBarItems = [
    {
        label: "León",
        value: "2 h",
        icon: MapPin,
    },
    {
        label: "BJX / Aeropuerto del Bajío",
        value: "1 h 55 min",
        icon: Plane,
    },
    {
        label: "Guanajuato City",
        value: "1 h 15 min",
        icon: MapPin,
    },
    {
        label: "Celaya",
        value: "1 h",
        icon: MapPin,
    },
    {
        label: "Querétaro",
        value: "1 h 05 min",
        icon: MapPin,
    },
    {
        label: "QRO",
        value: "1 h 15 min",
        icon: Plane,
    },
    {
        label: "Pachuca",
        value: "3 h 25 min",
        icon: MapPin,
    },
    {
        label: "Morelia",
        value: "2 h 45 min",
        icon: MapPin,
    },
    {
        label: "Toluca",
        value: "3 h 15 min",
        icon: MapPin,
    },
    {
        label: "TLC",
        value: "3 h 15 min",
        icon: Plane,
    },
    {
        label: "CDMX",
        value: "3 h 30 min",
        icon: MapPin,
    },
    {
        label: "NLU",
        value: "3 h 10 min",
        icon: Plane,
    },
    {
        label: "MEX",
        value: "3 h 20 min",
        icon: Plane,
    },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <p
            className="mb-6 text-[10px] uppercase tracking-[0.3em] text-[#AA7D69] sm:text-xs"
            style={{ fontFamily: "var(--font-sans)" }}
        >
            {children}
        </p>
    );
}

function SmallIcon({ icon: Icon }: { icon: typeof MapPin }) {
    return (
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#D7B6A7]/55 bg-[#FFF9F2] text-[#B87B5F]">
            <Icon className="size-5 stroke-[1.4]" />
        </span>
    );
}

function AnimatedTitleSvg() {
    return (
        <motion.div
            aria-hidden="true"
            className="aspect-[2007/269] h-auto w-full max-w-[570px] bg-[#202326] pr-4 [mask-image:url('/logos/ubicacion.svg')] [mask-position:left_center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/logos/ubicacion.svg')] [-webkit-mask-position:left_center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
    );
}

export default function UbicacionEditorialPage() {
    const bottomBarRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion() ?? false;
    const transferBarVariants: Variants = {
        hidden: { opacity: 0, y: 18 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.65,
                ease: revealEase,
                staggerChildren: 0.045,
                delayChildren: 0.1,
            },
        },
    };
    const transferItemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.45,
                ease: revealEase,
            },
        },
    };
    const revealInitial = shouldReduceMotion ? false : { opacity: 0, y: 24 };
    const revealInView = { opacity: 1, y: 0 };
    const revealViewport = { once: true, margin: "-80px" };

    const scrollBottomBar = (direction: "left" | "right") => {
        bottomBarRef.current?.scrollBy({
            left: direction === "left" ? -260 : 260,
            behavior: "smooth",
        });
    };

    return (
        <main className="overflow-hidden bg-[#F8F1E8] text-[#202326]">
            <section className="relative border-b border-[#E7D8CA] bg-[#fff8ed] pt-24 lg:pt-16">
                <div className="mx-auto grid min-h-[520px] max-w-[1640px] grid-cols-1 lg:grid-cols-2">
                    <motion.div
                        className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-24"
                        initial={shouldReduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: revealEase }}
                    >
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.15, ease: revealEase }}
                        >
                            <Eyebrow>[Donde perteneces]</Eyebrow>
                        </motion.div>
                        <h1 className="sr-only">Ubicación</h1>
                        <AnimatedTitleSvg />
                        <motion.p
                            className="mt-8 max-w-[440px] font-serif text-lg leading-relaxed text-[#303438]/82"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Don Diego Club Residencial se encuentra en el corazón de San Miguel de Allende, rodeado de naturaleza, cultura y experiencias únicas.
                        </motion.p>

                        <motion.div
                            className="mt-20 flex items-start gap-5"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7, ease: revealEase }}
                        >
                            <MapPin className="mt-1 size-8 text-[#B87B5F] stroke-[1.35]" />
                            <div>
                                <p className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.2em] text-[#202326]">
                                    San Miguel<br />de Allende, Guanajuato
                                </p>
                                <div className="mt-9 h-px w-28 bg-[#B87B5F]" />
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="flex flex-col bg-[#fff8ed]">
                        <motion.div
                            className="relative min-h-[420px] overflow-hidden bg-[#EDE1D6] lg:min-h-[620px]"
                            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, delay: 0.2, ease: revealEase }}
                        >
                            <Image
                                src="/final/map.png"
                                alt="Mapa de la ubicación de San Miguel de Allende"
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-[#B87B5F]/10" />
                        </motion.div>

                        <motion.div
                            aria-label="Tiempos de traslado"
                            className="group/transferbar relative border-x border-t border-[#D9CFC0] bg-[#f5eee4] text-[#202326]"
                            initial={shouldReduceMotion ? false : "hidden"}
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.35 }}
                            variants={transferBarVariants}
                        >
                            <button
                                type="button"
                                aria-label="Ver destinos anteriores"
                                onClick={() => scrollBottomBar("left")}
                                className="absolute left-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center border border-[#D2C5B6] bg-[#f5eee4]/90 text-[#AA7D69] opacity-100 shadow-[0_6px_18px_-14px_rgba(32,35,38,0.55)] transition-[background-color,opacity] hover:bg-[#efe5d8] md:pointer-events-none md:opacity-0 md:group-hover/transferbar:pointer-events-auto md:group-hover/transferbar:opacity-100"
                            >
                                <ChevronLeft className="size-3.5 stroke-[1.45]" />
                            </button>

                            <div ref={bottomBarRef} className="flex min-h-[48px] snap-x snap-mandatory overflow-x-auto px-8 [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {bottomBarItems.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        className={`flex w-auto min-w-max snap-start items-center justify-center gap-3 px-5 sm:px-6 ${
                                            index > 0 ? "border-l border-[#D2C5B6]" : ""
                                        }`}
                                        variants={transferItemVariants}
                                    >
                                        <item.icon className="size-3.5 shrink-0 text-[#AA7D69] stroke-[1.55]" />
                                        <div className="flex min-w-max items-baseline gap-3">
                                            <p className="whitespace-nowrap font-serif text-[1.05rem] leading-none text-[#303438]/78">
                                                {item.label}
                                            </p>
                                            {item.value ? (
                                                <p className="shrink-0 text-xs font-medium leading-none tracking-[0.04em] text-[#303438]/48">
                                                    {item.value}
                                                </p>
                                            ) : null}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <button
                                type="button"
                                aria-label="Ver mas destinos"
                                onClick={() => scrollBottomBar("right")}
                                className="absolute right-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center border border-[#D2C5B6] bg-[#f5eee4]/90 text-[#AA7D69] opacity-100 shadow-[0_6px_18px_-14px_rgba(32,35,38,0.55)] transition-[background-color,opacity] hover:bg-[#efe5d8] md:pointer-events-none md:opacity-0 md:group-hover/transferbar:pointer-events-auto md:group-hover/transferbar:opacity-100"
                            >
                                <ChevronRight className="size-3.5 stroke-[1.45]" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            <motion.section
                className="px-6 py-11 sm:px-10 lg:px-24"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={revealInView}
                viewport={revealViewport}
                transition={{ duration: 0.75, ease: revealEase }}
            >
                <div className="mx-auto grid max-w-[1380px] gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {infoCards.map((item, index) => (
                        <motion.article
                            key={item.title}
                            className="flex min-h-[116px] items-center gap-6 rounded bg-[#FFFDF8] px-7 py-6"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                            whileInView={revealInView}
                            viewport={revealViewport}
                            transition={{ duration: 0.65, delay: index * 0.08, ease: revealEase }}
                        >
                            <SmallIcon icon={item.icon} />
                            <div>
                                <h2 className="font-serif text-xl leading-tight text-[#202326]">{item.title}</h2>
                                <p className="mt-2 max-w-[270px] text-sm leading-relaxed text-[#303438]/72">{item.body}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </motion.section>

            <Location
                sectionId="location-ubicacion"
                backgroundClassName="bg-[#F8F1E8]"
                showIntro={false}
                showProximity={false}
            />

            <section className="px-6 pb-16 sm:px-10 lg:px-24">
                <div className="mx-auto max-w-[1380px]">
                    <motion.div
                        initial={revealInitial}
                        whileInView={revealInView}
                        viewport={revealViewport}
                        transition={{ duration: 0.75, ease: revealEase }}
                    >
                        <Eyebrow>Lo mejor de SMA</Eyebrow>
                        <h2 className="mb-6 font-serif text-[clamp(2.4rem,3.7vw,4rem)] leading-tight text-[#202326]">
                            A pocos minutos de tu hogar
                        </h2>
                    </motion.div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {nearbyCards.map((item, index) => (
                            <motion.article
                                key={item.title}
                                className="overflow-hidden rounded border border-[#E3D2C3] bg-[#FAF5EE] shadow-[0_16px_50px_-42px_rgba(32,35,38,0.48)]"
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={revealViewport}
                                transition={{ duration: 0.7, delay: index * 0.08, ease: revealEase }}
                            >
                                <div className="relative z-10 min-h-[190px]">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1280px) 50vw, 320px"
                                    />
                                    <div className="absolute -bottom-6 left-7 z-30 flex size-12 items-center justify-center rounded-full border border-[#D7B6A7] bg-white text-[#B87B5F] shadow-sm">
                                        <item.icon className="size-5 stroke-[1.35]" />
                                    </div>
                                </div>
                                <div className="px-7 pb-7 pt-10">
                                    <div className="mb-3 flex items-center justify-between gap-4">
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#202326]">{item.title}</h3>
                                        <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-[#202326]/70">{item.time}</p>
                                    </div>
                                    <p className="text-sm leading-relaxed text-[#303438]/76">{item.body}</p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#fff8ed] px-6 py-16 sm:px-10 lg:px-24 lg:py-20">
                <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[minmax(340px,390px)_minmax(0,930px)] xl:grid-cols-[minmax(380px,410px)_minmax(0,950px)] lg:items-start">
                    <motion.div
                        initial={revealInitial}
                        whileInView={revealInView}
                        viewport={revealViewport}
                        transition={{ duration: 0.8, ease: revealEase }}
                    >
                        <Eyebrow>Vive lo esencial</Eyebrow>
                        <h2 className="font-serif text-[clamp(2.9rem,4.2vw,4.9rem)] leading-[0.98] text-[#202326]">
                            Una vida<br />con sentido
                        </h2>
                        <p className="mt-7 font-serif text-lg leading-relaxed text-[#303438]/78">
                            Vivir en San Miguel de Allende y en Don Diego significa disfrutar de un ritmo más pausado e intencional, donde la belleza, la cultura, la naturaleza y el bienestar diario se convierten en parte esencial de tu día a día. Aquí, cada recorrido, cada encuentro y cada momento en casa invitan a reconectar con lo importante, rodeado de un entorno que equilibra tranquilidad, inspiración y comunidad.
                        </p>
                    </motion.div>

                    <motion.div
                        className="relative min-h-[360px] w-full max-w-[950px] justify-self-end overflow-hidden rounded-lg bg-[#EDE1D6] shadow-[0_24px_70px_-42px_rgba(32,35,38,0.55)] md:min-h-[500px]"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={revealViewport}
                        transition={{ duration: 0.85, delay: 0.08, ease: revealEase }}
                    >
                        <Image
                            src="/final/restaurante.webp"
                            alt="Mesa al aire libre rodeada de naturaleza"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 920px"
                        />
                    </motion.div>
                </div>

                <div className="mx-auto mt-12 grid max-w-[1380px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {lifestyleCards.map((item, index) => (
                        <motion.article
                            key={item.title}
                            className="flex items-center gap-5 rounded border border-[#E3D2C3] bg-[#FAF5EE]/70 px-6 py-6"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                            whileInView={revealInView}
                            viewport={revealViewport}
                            transition={{ duration: 0.65, delay: index * 0.08, ease: revealEase }}
                        >
                            <SmallIcon icon={item.icon} />
                            <div>
                                <h3 className="font-serif text-lg text-[#202326]">{item.title}</h3>
                                <p className="mt-1 text-sm leading-relaxed text-[#303438]/72">{item.body}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            <section className="bg-[#fff8ed] px-6 pb-16 sm:px-10 lg:px-24">
                <div className="mx-auto max-w-[1380px]">
                    <motion.div
                        className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                        initial={revealInitial}
                        whileInView={revealInView}
                        viewport={revealViewport}
                        transition={{ duration: 0.75, ease: revealEase }}
                    >
                        <div>
                            <Eyebrow>Descubre la ciudad</Eyebrow>
                            <h2 className="font-serif text-[clamp(2.2rem,3.2vw,3.2rem)] leading-tight text-[#202326]">
                                Guías seleccionadas para ti
                            </h2>
                        </div>
                        <Link href="/blog" className="group inline-flex items-center gap-4 border-b border-[#202326] pb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#202326]">
                            Ver todas las guías
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>

                    <div className="grid gap-7 lg:grid-cols-2">
                        {guideCards.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={revealViewport}
                                transition={{ duration: 0.7, delay: index * 0.1, ease: revealEase }}
                            >
                                <Link href={item.href} className="group grid overflow-hidden rounded border border-[#E3D2C3] bg-[#FAF5EE]/80 shadow-[0_18px_55px_-42px_rgba(32,35,38,0.45)] sm:grid-cols-[52%_48%]">
                                    <div className="relative min-h-[230px] overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                            sizes="(max-width: 1024px) 100vw, 360px"
                                        />
                                    </div>
                                    <div className="flex min-h-[230px] flex-col justify-center px-7 py-8">
                                        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.26em] text-[#B87B5F]">Guía</p>
                                        <h3 className="font-serif text-2xl leading-tight text-[#202326]">{item.title}</h3>
                                        <p className="mt-4 text-sm leading-relaxed text-[#303438]/76">{item.body}</p>
                                        <span className="mt-8 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#B87B5F]">
                                            Leer guía <ArrowRight className="size-4" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}

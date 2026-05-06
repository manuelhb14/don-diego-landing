"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useHasVisited } from "@/hooks/useHasVisited";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";

export type EditorialProject = {
    id: number;
    title: string;
    accent: string;
    accentSoft: string;
    description: string;
    supporting: string;
    details: string[];
    image: string;
    href: string;
    cta: string;
    contentPrefix: string;
};

function EditorialProjectRow({
    project,
    reverse,
    index,
    hasVisited,
    shouldReduceMotion,
}: {
    project: EditorialProject;
    reverse: boolean;
    index: number;
    hasVisited: boolean;
    shouldReduceMotion: boolean;
}) {
    const baseDelay = index * 0.08;

    return (
        <motion.article
            className={`grid grid-cols-1 items-start gap-y-6 md:gap-y-8 lg:items-center lg:gap-x-12 xl:gap-x-14 ${
                reverse
                    ? "lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.8fr)] xl:grid-cols-[minmax(0,1.22fr)_minmax(320px,0.78fr)]"
                    : "lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.45fr)] xl:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.22fr)]"
            }`}
            initial={hasVisited || shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.7, delay: baseDelay, ease: [0.215, 0.61, 0.355, 1] }}
        >
            <div className={`${reverse ? "order-1 lg:order-1" : "order-1 lg:order-0"} min-w-0`}>
                <div className="mx-auto flex w-full max-w-md flex-col items-start md:max-w-full lg:max-w-lg">
                    {/* <p
                        className="text-[10px] uppercase tracking-[0.28em]"
                        style={{ fontFamily: "var(--font-sans)", color: project.accent }}
                    >
                        {project.eyebrow}
                    </p> */}
                    <motion.h3
                        className="mt-3 text-[#3a3028] md:mt-4"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 3vw, 3.4rem)",
                            lineHeight: 0.95,
                        }}
                        initial={hasVisited || shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.55, delay: baseDelay + 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <EditableText contentKey={`${project.contentPrefix}.title`} fallback={project.title} />
                    </motion.h3>
                    <motion.p
                        className="mt-4 max-w-xs text-sm leading-7 text-[#62564a] md:mt-5 md:max-w-full md:text-[15px] lg:max-w-md"
                        style={{ fontFamily: "var(--font-sans)" }}
                        initial={hasVisited || shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.55, delay: baseDelay + 0.12, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <EditableText contentKey={`${project.contentPrefix}.description`} fallback={project.description} />
                    </motion.p>
                    <motion.p
                        className="mt-3 max-w-sm text-sm leading-7 text-[#7a6d61] md:mt-4 md:max-w-full md:text-[15px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                        initial={hasVisited || shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.55, delay: baseDelay + 0.16, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <EditableText contentKey={`${project.contentPrefix}.supporting`} fallback={project.supporting} />
                    </motion.p>
                    <motion.div
                        className="mt-5 w-full max-w-sm md:mt-7 md:max-w-full lg:max-w-sm"
                        initial={hasVisited || shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.55, delay: baseDelay + 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <div
                            className="mb-4 h-px w-14"
                            style={{ backgroundColor: project.accentSoft }}
                        />
                        <div
                            className="flex flex-col gap-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                        {project.details.map((detail, detailIndex) => (
                            <div
                                key={`${project.id}-${detailIndex}`}
                                className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6257]"
                            >
                                <span
                                    className="h-2 w-2 rounded-full border"
                                    style={{
                                        backgroundColor: project.accentSoft,
                                        borderColor: project.accent,
                                    }}
                                />
                                <EditableText contentKey={`${project.contentPrefix}.detail.${detailIndex + 1}`} fallback={detail} />
                            </div>
                        ))}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={hasVisited || shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.55, delay: baseDelay + 0.24, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                    <Link
                        href={project.href}
                        className="group mt-6 -ml-4 inline-flex items-center gap-4 rounded-md px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-[#3a3028] md:mt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f6e5d]/40"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        <span><EditableText contentKey={`${project.contentPrefix}.cta`} fallback={project.cta} /></span>
                        <span className="h-px w-10 bg-[#b8ab9f] transition-all duration-300 group-hover:w-14 group-hover:bg-[#8f6e5d]" />
                    </Link>
                    </motion.div>
                </div>
            </div>

            <div className={`${reverse ? "order-0 lg:order-0" : "order-0 lg:order-1"} min-w-0`}>
                <motion.div
                    className={`relative aspect-[16/10] w-full max-w-[820px] lg:max-w-[740px] xl:max-w-[760px] overflow-hidden bg-[#ebe1d4] shadow-[0_25px_60px_rgba(73,54,39,0.08)] ${
                        reverse ? "mx-auto lg:mr-auto lg:ml-0" : "mx-auto lg:ml-auto lg:mr-0"
                    }`}
                    initial={hasVisited || shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: baseDelay + 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                >
                    <EditableImage
                        contentKey={`${project.contentPrefix}.image`}
                        fallbackSrc={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 680px, (min-width: 1024px) 52vw, 100vw"
                    />
                </motion.div>
            </div>
        </motion.article>
    );
}

export default function ProjectsEditorial() {
    const hasVisited = useHasVisited();
    const shouldReduceMotion = useReducedMotion() ?? false;
    const t = useTranslations("projectsEditorial");
    const editorialProjects = useMemo<EditorialProject[]>(
        () => [
            {
                id: 1,
                title: t("residencial.title"),
                accent: "#c68b70",
                accentSoft: "#ead7cc",
                description: t("residencial.description"),
                supporting: t("residencial.supporting"),
                details: [t("residencial.d1"), t("residencial.d2"), t("residencial.d3")],
                image: "/final/residencial.png",
                href: "/residencial",
                cta: t("residencial.cta"),
                contentPrefix: "home.projects.residencial",
            },
            {
                id: 2,
                title: t("farm.title"),
                accent: "#b77c7e",
                accentSoft: "#debebf",
                description: t("farm.description"),
                supporting: t("farm.supporting"),
                details: [t("farm.d1"), t("farm.d2"), t("farm.d3")],
                image: "/final/organic-farm.png",
                href: "/farm",
                cta: t("farm.cta"),
                contentPrefix: "home.projects.farm",
            },
            {
                id: 3,
                title: t("wellness.title"),
                accent: "#b8b267",
                accentSoft: "#d7d7aa",
                description: t("wellness.description"),
                supporting: t("wellness.supporting"),
                details: [t("wellness.d1"), t("wellness.d2"), t("wellness.d3")],
                image: "/final/wellness-center.png",
                href: "/wellness",
                cta: t("wellness.cta"),
                contentPrefix: "home.projects.wellness",
            },
            {
                id: 4,
                title: t("presa.title"),
                accent: "#7a8ea3",
                accentSoft: "#dbe3ea",
                description: t("presa.description"),
                supporting: t("presa.supporting"),
                details: [t("presa.d1"), t("presa.d2"), t("presa.d3")],
                image: "/final/presa.png",
                href: "/presa",
                cta: t("presa.cta"),
                contentPrefix: "home.projects.presa",
            },
        ],
        [t],
    );

    return (
        <section id="proyectos" className="bg-[#fff8ef] px-6 pt-0 pb-20 md:px-10 md:py-16 lg:px-16 lg:py-20">
            <div className="mx-auto max-w-[1280px]">
                {/* <div className="mb-16 max-w-2xl md:mb-24">
                    <p
                        className="text-[10px] uppercase tracking-[0.3em] text-[#aa7d69]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        [El proyecto]
                    </p>
                    <h2
                        className="mt-5 text-[#2f2721]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.75rem, 6vw, 5.5rem)",
                            lineHeight: 0.94,
                        }}
                    >
                        Un recorrido más editorial por las piezas que dan forma a Don Diego.
                    </h2>
                </div> */}

                <div className="space-y-12 md:space-y-20">
                    {editorialProjects.map((project, index) => (
                        <EditorialProjectRow
                            key={project.id}
                            project={project}
                            reverse={index % 2 === 1}
                            index={index}
                            hasVisited={hasVisited}
                            shouldReduceMotion={shouldReduceMotion}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

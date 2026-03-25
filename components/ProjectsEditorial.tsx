"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

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
};

function EditorialProjectRow({
    project,
    reverse,
}: {
    project: EditorialProject;
    reverse: boolean;
}) {
    return (
        <article
            className={`grid grid-cols-1 items-start gap-y-8 lg:items-center lg:gap-x-12 xl:gap-x-14 ${
                reverse
                    ? "lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.8fr)] xl:grid-cols-[minmax(0,1.22fr)_minmax(320px,0.78fr)]"
                    : "lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.45fr)] xl:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.22fr)]"
            }`}
        >
            <div className={`${reverse ? "lg:order-1" : ""} min-w-0`}>
                <div className="mx-auto flex w-full max-w-md flex-col items-start lg:max-w-lg">
                    {/* <p
                        className="text-[10px] uppercase tracking-[0.28em]"
                        style={{ fontFamily: "var(--font-sans)", color: project.accent }}
                    >
                        {project.eyebrow}
                    </p> */}
                    <h3
                        className="mt-4 text-[#3a3028]"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 3vw, 3.4rem)",
                            lineHeight: 0.95,
                        }}
                    >
                        {project.title}
                    </h3>
                    <p
                        className="mt-5 max-w-xs lg:max-w-md text-sm leading-7 text-[#62564a] md:text-[15px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {project.description}
                    </p>
                    <p
                        className="mt-4 max-w-sm text-sm leading-7 text-[#7a6d61] md:text-[15px]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {project.supporting}
                    </p>
                    <div className="mt-7 w-full max-w-sm">
                        <div
                            className="mb-4 h-px w-14"
                            style={{ backgroundColor: project.accentSoft }}
                        />
                        <div
                            className="flex flex-col gap-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                        {project.details.map((detail) => (
                            <div
                                key={detail}
                                className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em]"
                                style={{ color: project.accent }}
                            >
                                <span
                                    className="h-2 w-2 rounded-full border"
                                    style={{
                                        backgroundColor: project.accentSoft,
                                        borderColor: project.accent,
                                    }}
                                />
                                {detail}
                            </div>
                        ))}
                        </div>
                    </div>
                    <Link
                        href={project.href}
                        className="group mt-8 -ml-4 inline-flex items-center gap-4 rounded-md px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-[#3a3028] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f6e5d]/40"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        <span>{project.cta}</span>
                        <span className="h-px w-10 bg-[#b8ab9f] transition-all duration-300 group-hover:w-14 group-hover:bg-[#8f6e5d]" />
                    </Link>
                </div>
            </div>

            <div className={`${reverse ? "lg:order-0" : ""} min-w-0`}>
                <div
                    className={`relative aspect-[16/10] w-full max-w-[820px] lg:max-w-[740px] xl:max-w-[760px] overflow-hidden bg-[#ebe1d4] shadow-[0_25px_60px_rgba(73,54,39,0.08)] ${
                        reverse ? "mx-auto lg:mr-auto lg:ml-0" : "mx-auto lg:ml-auto lg:mr-0"
                    }`}
                >
                    <div
                        className="absolute inset-x-0 top-0 z-10 h-1"
                        style={{ backgroundColor: project.accent }}
                    />
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 680px, (min-width: 1024px) 52vw, 100vw"
                    />
                </div>
            </div>
        </article>
    );
}

export default function ProjectsEditorial() {
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
                image: "/images/renders/render-1.png",
                href: "/residencial",
                cta: t("residencial.cta"),
            },
            {
                id: 2,
                title: t("farm.title"),
                accent: "#b77c7e",
                accentSoft: "#debebf",
                description: t("farm.description"),
                supporting: t("farm.supporting"),
                details: [t("farm.d1"), t("farm.d2"), t("farm.d3")],
                image: "/babylon/organic-farm.jpeg",
                href: "/farm",
                cta: t("farm.cta"),
            },
            {
                id: 3,
                title: t("wellness.title"),
                accent: "#b8b267",
                accentSoft: "#d7d7aa",
                description: t("wellness.description"),
                supporting: t("wellness.supporting"),
                details: [t("wellness.d1"), t("wellness.d2"), t("wellness.d3")],
                image: "/images/gallery/gallery-3.png",
                href: "/wellness",
                cta: t("wellness.cta"),
            },
            {
                id: 4,
                title: t("presa.title"),
                accent: "#7a8ea3",
                accentSoft: "#dbe3ea",
                description: t("presa.description"),
                supporting: t("presa.supporting"),
                details: [t("presa.d1"), t("presa.d2"), t("presa.d3")],
                image: "/images/renders/presa-1.png",
                href: "/presa",
                cta: t("presa.cta"),
            },
        ],
        [t],
    );

    return (
        <section id="proyectos" className="bg-[#fff8ef] px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-20">
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
                        Un recorrido mas editorial por las piezas que dan forma a Don Diego.
                    </h2>
                </div> */}

                <div className="space-y-18 md:space-y-20">
                    {editorialProjects.map((project, index) => (
                        <EditorialProjectRow
                            key={project.id}
                            project={project}
                            reverse={index % 2 === 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

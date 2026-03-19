"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useHasVisited } from "@/hooks/useHasVisited";
import { Eye, Heart } from "lucide-react";

type Post = {
    id: string;
    title: string;
    kicker: string;
    tags: string[];
    likes: number;
    views: number;
    comments: number;
    imageSrc: string;
    imageAlt: string;
};

function isVideoSrc(src: string) {
    return /\.(mp4|webm)$/i.test(src);
}

function MediaCover({ src, alt }: { src: string; alt: string }) {
    if (isVideoSrc(src)) {
        return (
            <video
                src={src}
                aria-label={alt}
                muted
                loop
                playsInline
                preload="metadata"
                autoPlay
                className="absolute inset-0 h-full w-full object-cover"
            />
        );
    }

    return <Image src={src} alt={alt} fill className="object-cover" />;
}

const posts: Post[] = [
    {
        id: "mejor-ciudad-pequena",
        title: "La Mejor Ciudad Pequeña del Mundo",
        kicker: "San Miguel de Allende",
        tags: ["Patrimonio Cultural"],
        comments: 40,
        likes: 297,
        views: 850,
        imageSrc: "/babylon/sma.mp4",
        imageAlt: "San Miguel de Allende [cite: 10]",
    },
    {
        id: "diseno-tranquilidad",
        title: "Diseño para la Tranquilidad",
        kicker: "Club Residencial",
        tags: ["Paisaje Vivo"],
        comments: 25,
        likes: 310,
        views: 620,
        imageSrc: "/babylon/tranquilidad.webp",
        imageAlt: "Club Residencial Don Diego",
    },
    {
        id: "huerto-a-la-mesa",
        title: "Del Huerto a la Mesa",
        kicker: "Organic Farm & Flowers",
        tags: ["Huertos Orgánicos", "Sustentabilidad", "Ciclo Natural"],
        comments: 45,
        likes: 530,
        views: 1105,
        imageSrc: "/babylon/greenhouse-2.webp",
        imageAlt: "Organic Farm & Flowers [cite: 97]",
    },
    {
        id: "vida-junto-al-agua",
        title: "La Vida junto al Agua",
        kicker: "Presa de la Cantera",
        tags: ["Parque Acuático", "Embarcadero", "Naturaleza"],
        comments: 28,
        likes: 375,
        views: 740,
        imageSrc: "/babylon/lago.webp",
        imageAlt: "Presa de la Cantera [cite: 129]",
    }
];

function TagRow({ tags }: { tags: string[] }) {
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {tags.map((t) => (
                <span
                    key={t}
                    className="text-[10px] uppercase tracking-[0.22em] text-[#222]/50"
                    style={{ fontFamily: "var(--font-sans)" }}
                >
                    {t}
                </span>
            ))}
        </div>
    );
}

function MetaRow({ likes, views }: { likes: number; views: number }) {
    return (
        <div className="flex items-center justify-end gap-5">
            <div className="flex items-center gap-2 text-[#222]/45">
                <Heart className="w-4 h-4" />
                <span className="text-[12px]">{likes}</span>
            </div>
            <div className="flex items-center gap-2 text-[#222]/45">
                <Eye className="w-4 h-4" />
                <span className="text-[12px]">{views}</span>
            </div>
        </div>
    );
}

function PostCard({ post }: { post: Post }) {
    return (
        <article className="relative">
            <div className="relative overflow-hidden rounded-sm border border-[#222]/[0.06] bg-[#EFE6DC]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#AA7D69] to-[#E1B19B]" />

                <div className="relative aspect-[2/1]">
                    <MediaCover src={post.imageSrc} alt={post.imageAlt} />
                </div>

                <div className="p-4 md:p-6">
                    <div
                        className="text-[10px] tracking-[0.3em] text-[#AA7D69]/55 uppercase mb-3"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {post.kicker}
                    </div>

                    <h3
                        className="font-serif text-[#222] leading-tight"
                        style={{ fontSize: "clamp(1.1rem, 1.9vw, 1.75rem)" }}
                    >
                        {post.title}
                    </h3>

                    <div className="mt-4">
                        <TagRow tags={post.tags} />
                    </div>

                    {/* <div className="mt-6">
                        <MetaRow likes={post.likes} views={post.views} />
                    </div> */}
                </div>
            </div>
        </article>
    );
}

export default function Blogs() {
    const hasVisited = useHasVisited();

    return (
        <section id="blogs" className="bg-[#F6F0E8] overflow-hidden">
            <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
                    <motion.div
                        initial={hasVisited ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#AA7D69]/60 uppercase mb-3"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            [Blog]
                        </p>
                        <h2
                            className="text-[#222] leading-none"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.25rem, 4.6vw, 4rem)",
                            }}
                        >
                            Historias & Experiencias
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={hasVisited ? false : { opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-[#222]/55 text-sm md:text-lg lg:text-xl leading-relaxed max-w-md"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Un cuaderno visual con momentos del entorno, las caminatas y lo cotidiano en Don Diego.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                    {/* Left column */}
                    <div className="flex flex-col gap-6 md:gap-8">
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <PostCard post={posts[0]} />
                        </motion.div>
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.05 }}
                        >
                            <PostCard post={posts[2]} />
                        </motion.div>
                    </div>

                    {/* Right column (staggered down) */}
                    <div className="flex flex-col gap-6 md:gap-8 md:pt-12">
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.05 }}
                        >
                            <PostCard post={posts[1]} />
                        </motion.div>
                        <motion.div
                            initial={hasVisited ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            <PostCard post={posts[3]} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}


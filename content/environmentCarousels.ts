export type EnvironmentCarouselSlide = {
    src: string;
    alt: string;
    imageClassName?: string;
};

export type EnvironmentKey = "residencial" | "farm" | "presa" | "wellness";

export const environmentCarouselSlides = {
    residencial: [
        {
            src: "/final/residencial.png",
            alt: "Club Residencial exterior",
        },
        {
            src: "/final/club-residencial.png",
            alt: "Club Residencial master plan view",
        },
        {
            src: "/babylon/clubhouse.webp",
            alt: "Casa club at Club Residencial",
        },
        {
            src: "/babylon/pool.webp",
            alt: "Pool amenity at Club Residencial",
        },
    ],
    farm: [
        {
            src: "/final/organic-farm.png",
            alt: "Organic Farm landscape",
            imageClassName: "object-bottom",
        },
        {
            src: "/final/farm.jpg",
            alt: "Organic Farm fields",
        },
        {
            src: "/final/huerto.jpg",
            alt: "Organic Farm orchard",
        },
        {
            src: "/final/flores.png",
            alt: "Seasonal flowers at Organic Farm",
        },
    ],
    presa: [
        {
            src: "/final/presa.png",
            alt: "Presa de la Cantera waterfront",
        },
        {
            src: "/final/presa-de-la-cantera.png",
            alt: "Presa de la Cantera overview",
        },
        {
            src: "/final/presa-2.jpg",
            alt: "Presa de la Cantera water view",
        },
        {
            src: "/babylon/presa-4.webp",
            alt: "Presa de la Cantera promenade",
        },
    ],
    wellness: [
        {
            src: "/final/wellness-center.png",
            alt: "Wellness Center exterior",
        },
        {
            src: "/babylon/wellness-4.webp",
            alt: "Wellness Center garden setting",
        },
        {
            src: "/final/spa.jpg",
            alt: "Wellness Center spa",
        },
        {
            src: "/babylon/wellness-2.webp",
            alt: "Wellness Center amenities",
        },
    ],
} satisfies Record<EnvironmentKey, readonly EnvironmentCarouselSlide[]>;

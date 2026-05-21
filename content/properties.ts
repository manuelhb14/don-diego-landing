export type PropertyLocaleBlock = {
  title: string;
  subtitle: string;
  heroAlt: string;
  floorPlansTitle: string;
  galleryTitle: string;
  backToIndex: string;
  floorPlans: Array<{ imageAlt: string; caption: string }>;
  gallery: Array<{ imageAlt: string; caption: string }>;
};

export type Property = {
  slug: string;
  accent: string;
  heroImageSrc: string;
  floorPlanImageSrcs: [string, string];
  galleryImageSrcs: [string, string, string];
  locales: {
    es: PropertyLocaleBlock;
    en: PropertyLocaleBlock;
  };
};

export type PropertyCardView = {
  slug: string;
  accent: string;
  title: string;
  subtitle: string;
  heroImageSrc: string;
  heroAlt: string;
};

export type PropertyDetailView = {
  slug: string;
  accent: string;
  heroImageSrc: string;
  heroAlt: string;
  title: string;
  subtitle: string;
  floorPlansTitle: string;
  galleryTitle: string;
  backToIndex: string;
  floorPlans: Array<{ imageSrc: string; imageAlt: string; caption: string }>;
  gallery: Array<{ imageSrc: string; imageAlt: string; caption: string }>;
};

const properties: Property[] = [
  {
    slug: "departamentos",
    accent: "#b76d4b",
    heroImageSrc: "/final/tipo2.png",
    floorPlanImageSrcs: [
      "/babylon/duplex-1-rear.png",
      "/babylon/duplex-1-key-interior.png",
    ],
    galleryImageSrcs: [
      "/babylon/duplex-1-primary-bedroom.png",
      "/babylon/duplex-1-primary-bath.png",
      "/babylon/duplex-1-key-interior.png",
    ],
    locales: {
      es: {
        title: "Departamentos",
        subtitle: "Vivienda práctica dentro del Club Residencial",
        heroAlt: "Vista exterior de departamentos en Club Residencial",
        floorPlansTitle: "Plantas",
        galleryTitle: "Interiores",
        backToIndex: "Volver a propiedades",
        floorPlans: [
          { imageAlt: "Plano ilustrativo (1)", caption: "Plano ilustrativo" },
          { imageAlt: "Plano ilustrativo (2)", caption: "Plano ilustrativo" },
        ],
        gallery: [
          { imageAlt: "Recámara (render)", caption: "Recámara" },
          { imageAlt: "Baño (render)", caption: "Baño" },
          { imageAlt: "Interior (render)", caption: "Interior" },
        ],
      },
      en: {
        title: "Apartments",
        subtitle: "",
        heroAlt: "Exterior view of apartments at Club Residencial",
        floorPlansTitle: "Floor plans",
        galleryTitle: "Interiors",
        backToIndex: "Back to properties",
        floorPlans: [
          { imageAlt: "Illustrative plan (1)", caption: "Illustrative plan" },
          { imageAlt: "Illustrative plan (2)", caption: "Illustrative plan" },
        ],
        gallery: [
          { imageAlt: "Bedroom (render)", caption: "Bedroom" },
          { imageAlt: "Bathroom (render)", caption: "Bathroom" },
          { imageAlt: "Interior (render)", caption: "Interior" },
        ],
      },
    },
  },
  {
    slug: "duplex-tipo-1",
    accent: "#b76d4b",
    heroImageSrc: "/final/tipo1.png",
    floorPlanImageSrcs: ["/babylon/duplex-1-rear.png", "/babylon/duplex-1-key-interior.png"],
    galleryImageSrcs: [
      "/babylon/duplex-1-key-interior.png",
      "/babylon/duplex-1-primary-bedroom.png",
      "/babylon/duplex-1-primary-bath.png",
    ],
    locales: {
      es: {
        title: "Casas dúplex Tipo 1",
        subtitle: "Una casa por nivel con terraza o patio interior",
        heroAlt: "Vista exterior de casa dúplex tipo 1",
        floorPlansTitle: "Plantas",
        galleryTitle: "Interiores",
        backToIndex: "Volver a propiedades",
        floorPlans: [
          { imageAlt: "Plano ilustrativo (1)", caption: "Plano ilustrativo" },
          { imageAlt: "Plano ilustrativo (2)", caption: "Plano ilustrativo" },
        ],
        gallery: [
          { imageAlt: "Interior (render)", caption: "Interior" },
          { imageAlt: "Recámara (render)", caption: "Recámara" },
          { imageAlt: "Baño (render)", caption: "Baño" },
        ],
      },
      en: {
        title: "Duplex Homes Type 1",
        subtitle: "",
        heroAlt: "Exterior view of duplex home type 1",
        floorPlansTitle: "Floor plans",
        galleryTitle: "Interiors",
        backToIndex: "Back to properties",
        floorPlans: [
          { imageAlt: "Illustrative plan (1)", caption: "Illustrative plan" },
          { imageAlt: "Illustrative plan (2)", caption: "Illustrative plan" },
        ],
        gallery: [
          { imageAlt: "Interior (render)", caption: "Interior" },
          { imageAlt: "Bedroom (render)", caption: "Bedroom" },
          { imageAlt: "Bathroom (render)", caption: "Bathroom" },
        ],
      },
    },
  },
  {
    slug: "duplex-tipo-2",
    accent: "#b76d4b",
    heroImageSrc: "/final/tipo4.png",
    floorPlanImageSrcs: ["/babylon/duplex-1-rear.png", "/babylon/duplex-1-key-interior.png"],
    galleryImageSrcs: [
      "/babylon/duplex-1-key-interior.png",
      "/babylon/duplex-1-primary-bedroom.png",
      "/babylon/duplex-1-primary-bath.png",
    ],
    locales: {
      es: {
        title: "Casas dúplex Tipo 2",
        subtitle: "Patio interior y conexión con recorridos peatonales",
        heroAlt: "Vista exterior de casa dúplex tipo 2",
        floorPlansTitle: "Plantas",
        galleryTitle: "Interiores",
        backToIndex: "Volver a propiedades",
        floorPlans: [
          { imageAlt: "Plano ilustrativo (1)", caption: "Plano ilustrativo" },
          { imageAlt: "Plano ilustrativo (2)", caption: "Plano ilustrativo" },
        ],
        gallery: [
          { imageAlt: "Interior (render)", caption: "Interior" },
          { imageAlt: "Recámara (render)", caption: "Recámara" },
          { imageAlt: "Baño (render)", caption: "Baño" },
        ],
      },
      en: {
        title: "Duplex Homes Type 2",
        subtitle: "",
        heroAlt: "Exterior view of duplex home type 2",
        floorPlansTitle: "Floor plans",
        galleryTitle: "Interiors",
        backToIndex: "Back to properties",
        floorPlans: [
          { imageAlt: "Illustrative plan (1)", caption: "Illustrative plan" },
          { imageAlt: "Illustrative plan (2)", caption: "Illustrative plan" },
        ],
        gallery: [
          { imageAlt: "Interior (render)", caption: "Interior" },
          { imageAlt: "Bedroom (render)", caption: "Bedroom" },
          { imageAlt: "Bathroom (render)", caption: "Bathroom" },
        ],
      },
    },
  },
  {
    slug: "duplex-tipo-3",
    accent: "#b76d4b",
    heroImageSrc: "/final/tipo3.png",
    floorPlanImageSrcs: ["/babylon/duplex-1-rear.png", "/babylon/duplex-1-key-interior.png"],
    galleryImageSrcs: [
      "/babylon/duplex-1-key-interior.png",
      "/babylon/duplex-1-primary-bedroom.png",
      "/babylon/duplex-1-primary-bath.png",
    ],
    locales: {
      es: {
        title: "Casas dúplex Tipo 3",
        subtitle: "Distribución flexible con varias terrazas",
        heroAlt: "Vista exterior de casa dúplex tipo 3",
        floorPlansTitle: "Plantas",
        galleryTitle: "Interiores",
        backToIndex: "Volver a propiedades",
        floorPlans: [
          { imageAlt: "Plano ilustrativo (1)", caption: "Plano ilustrativo" },
          { imageAlt: "Plano ilustrativo (2)", caption: "Plano ilustrativo" },
        ],
        gallery: [
          { imageAlt: "Interior (render)", caption: "Interior" },
          { imageAlt: "Recámara (render)", caption: "Recámara" },
          { imageAlt: "Baño (render)", caption: "Baño" },
        ],
      },
      en: {
        title: "Duplex Homes Type 3",
        subtitle: "",
        heroAlt: "Exterior view of duplex home type 3",
        floorPlansTitle: "Floor plans",
        galleryTitle: "Interiors",
        backToIndex: "Back to properties",
        floorPlans: [
          { imageAlt: "Illustrative plan (1)", caption: "Illustrative plan" },
          { imageAlt: "Illustrative plan (2)", caption: "Illustrative plan" },
        ],
        gallery: [
          { imageAlt: "Interior (render)", caption: "Interior" },
          { imageAlt: "Bedroom (render)", caption: "Bedroom" },
          { imageAlt: "Bathroom (render)", caption: "Bathroom" },
        ],
      },
    },
  },
];

export function getAllPropertySlugs(): string[] {
  return properties.map((p) => p.slug);
}

export function getAllProperties(locale: "es" | "en"): PropertyCardView[] {
  return properties.map((p) => ({
    slug: p.slug,
    accent: p.accent,
    title: p.locales[locale].title,
    subtitle: p.locales[locale].subtitle,
    heroImageSrc: p.heroImageSrc,
    heroAlt: p.locales[locale].heroAlt,
  }));
}

export function getPropertyBySlug(
  slug: string,
  locale: "es" | "en",
): PropertyDetailView | null {
  const p = properties.find((x) => x.slug === slug);
  if (!p) return null;

  const l = p.locales[locale];
  return {
    slug: p.slug,
    accent: p.accent,
    heroImageSrc: p.heroImageSrc,
    heroAlt: l.heroAlt,
    title: l.title,
    subtitle: l.subtitle,
    floorPlansTitle: l.floorPlansTitle,
    galleryTitle: l.galleryTitle,
    backToIndex: l.backToIndex,
    floorPlans: l.floorPlans.map((fp, idx) => ({
      imageSrc: p.floorPlanImageSrcs[idx] ?? p.floorPlanImageSrcs[0],
      imageAlt: fp.imageAlt,
      caption: fp.caption,
    })),
    gallery: l.gallery.map((g, idx) => ({
      imageSrc: p.galleryImageSrcs[idx] ?? p.galleryImageSrcs[0],
      imageAlt: g.imageAlt,
      caption: g.caption,
    })),
  };
}

import messagesEs from "@/messages/es.json";
import type { ChatContext } from "@/components/chat/types";
import { SITE_CONTACT } from "@/lib/site-contact";

type PageContextEntry = {
    pageType: string;
    detail: Record<string, unknown>;
};

function asRecord(value: unknown): Record<string, unknown> {
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return value as Record<string, unknown>;
}

function getIn(root: unknown, path: string[]): unknown {
    let current: unknown = root;
    for (const key of path) {
        const record = asRecord(current);
        current = record[key];
        if (current === undefined) return undefined;
    }
    return current;
}

const data = asRecord(messagesEs);

const PAGE_CONTEXT_ENTRIES: PageContextEntry[] = [
    {
        pageType: "home",
        detail: {
            heading: getIn(data, ["hero", "tagline"]),
            promise: getIn(data, ["hero", "secondary"]),
            location: getIn(data, ["hero", "location"]),
            projectIntro: getIn(data, ["project", "intro"]),
            components: [
                getIn(data, ["project", "residencial", "name"]),
                getIn(data, ["project", "farm", "name"]),
                getIn(data, ["project", "wellness", "name"]),
                getIn(data, ["project", "presa", "name"]),
            ].filter(Boolean),
        },
    },
    {
        pageType: "proyecto",
        detail: {
            intro: getIn(data, ["pages", "proyecto", "hero", "body"]),
            gridSummary: getIn(data, ["pages", "proyecto", "grid", "bottomBody"]),
            components: {
                residencial: getIn(data, ["pages", "proyecto", "grid", "cards", "residencial"]),
                farm: getIn(data, ["pages", "proyecto", "grid", "cards", "farm"]),
                wellness: getIn(data, ["pages", "proyecto", "grid", "cards", "wellness"]),
                presa: getIn(data, ["pages", "proyecto", "grid", "cards", "presa"]),
            },
            locationSummary: getIn(data, ["pages", "proyecto", "locationSummary", "body"]),
            manifesto: getIn(data, ["pages", "proyecto", "manifesto", "body"]),
        },
    },
    {
        pageType: "residencial",
        detail: {
            hero: getIn(data, ["pages", "residencial", "hero"]),
            typologies: getIn(data, ["pages", "residencial", "features", "residences"]),
            amenities: {
                social: getIn(data, ["pages", "residencial", "amenities", "socialHeart"]),
                wellness: getIn(data, ["pages", "residencial", "amenities", "wellness"]),
                sports: getIn(data, ["pages", "residencial", "amenities", "sports"]),
            },
            rentals: getIn(data, ["pages", "residencial", "rentals"]),
            connectivity: {
                routeTime: getIn(data, ["pages", "residencial", "connectivity", "routeTime"]),
                shuttle: getIn(data, ["pages", "residencial", "connectivity", "shuttles", "body"]),
                wifi: getIn(data, ["pages", "residencial", "connectivity", "wifi", "body"]),
                community: getIn(data, ["pages", "residencial", "connectivity", "community", "body"]),
                nature: getIn(data, ["pages", "residencial", "connectivity", "nature", "body"]),
            },
            sustainability: getIn(data, ["pages", "residencial", "sustainability"]),
        },
    },
    {
        pageType: "farm",
        detail: {
            hero: getIn(data, ["pages", "farm", "hero"]),
            productiveLandscape: getIn(data, ["pages", "farm", "sustentabilidad"]),
            walkways: getIn(data, ["pages", "farm", "paseosHuertos"]),
            production: getIn(data, ["pages", "farm", "products"]),
            flowers: getIn(data, ["pages", "farm", "trabajoFlores"]),
        },
    },
    {
        pageType: "wellness",
        detail: {
            hero: getIn(data, ["pages", "wellness", "hero"]),
            philosophy: getIn(data, ["pages", "wellness", "highlights"]),
            services: getIn(data, ["pages", "wellness", "services"]),
        },
    },
    {
        pageType: "presa",
        detail: {
            hero: getIn(data, ["pages", "presa", "hero"]),
            concept: getIn(data, ["pages", "presa", "concept"]),
            areas: getIn(data, ["pages", "presa", "areas"]),
        },
    },
    {
        pageType: "ubicacion",
        detail: {
            hero: getIn(data, ["pages", "ubicacion", "hero"]),
            locationMexico: getIn(data, ["pages", "ubicacion", "locationMexico"]),
            nearby: getIn(data, ["pages", "ubicacion", "grid", "locations"]),
            commute: {
                centro: getIn(data, ["location", "centroTime"]),
                queretaro: getIn(data, ["location", "queretaroTime"]),
                cdmx: getIn(data, ["location", "cdmxTime"]),
            },
        },
    },
    {
        pageType: "equipo",
        detail: {
            hero: getIn(data, ["pages", "equipo", "hero"]),
            members: getIn(data, ["pages", "equipo", "details", "members"]),
        },
    },
    {
        pageType: "experiencias",
        detail: {
            hero: getIn(data, ["pages", "experiencias", "hero"]),
            items: getIn(data, ["pages", "experiencias", "listing", "items"]),
            footer: getIn(data, ["pages", "experiencias", "listing", "footerText"]),
            commonAmenities: getIn(data, ["thingsToDo", "items"]),
        },
    },
    {
        pageType: "contacto",
        detail: {
            heading: getIn(data, ["contact", "heading"]),
            subtitle: getIn(data, ["contact", "subtitle"]),
            formIntro: getIn(data, ["pages", "contacto", "form", "intro"]),
            whatsappLabel: getIn(data, ["contact", "whatsapp"]),
            cta: getIn(data, ["contact", "submitVisit"]),
            contactPhone: SITE_CONTACT.phoneDisplay,
            contactWhatsappLink: SITE_CONTACT.whatsappUrl,
        },
    },
    {
        pageType: "blog",
        detail: {
            title: getIn(data, ["blogPage", "title"]),
            subtitle: getIn(data, ["blogPage", "subtitle"]),
            intent: "Editorial stories and experiences around Don Diego lifestyle.",
        },
    },
    {
        pageType: "terminos",
        detail: {
            title: getIn(data, ["legal", "termsTitle"]),
            meta: getIn(data, ["meta", "terms"]),
        },
    },
    {
        pageType: "privacidad",
        detail: {
            title: getIn(data, ["legal", "privacyTitle"]),
            meta: getIn(data, ["meta", "privacy"]),
        },
    },
    {
        pageType: "guiaCompra",
        detail: {
            title: getIn(data, ["pages", "purchaseGuide", "title"]),
            intro: getIn(data, ["pages", "purchaseGuide", "intro"]),
            meta: getIn(data, ["meta", "purchaseGuide"]),
            intent: "Step-by-step purchase orientation for foreign buyers evaluating Don Diego; not legal advice.",
        },
    },
    {
        pageType: "proximamente",
        detail: {
            label: getIn(data, ["project", "comingSoon"]),
        },
    },
];

const PAGE_CONTEXT_MAP = new Map(PAGE_CONTEXT_ENTRIES.map((entry) => [entry.pageType, entry.detail]));

export function getDefaultDetailForPageType(pageType: ChatContext["pageType"]): Record<string, unknown> | undefined {
    const detail = PAGE_CONTEXT_MAP.get(pageType);
    return detail ? structuredClone(detail) : undefined;
}

import type { ChatContext } from "@/components/chat/types";

type SuggestionDef = {
    id: string;
    label: {
        es: string;
        en: string;
    };
    prompt: {
        es: string;
        en: string;
    };
};

const HOME_SUGGESTIONS: SuggestionDef[] = [
    {
        id: "home-fit",
        label: {
            es: "A quién le conviene vivir aquí",
            en: "Who is this ideal for",
        },
        prompt: {
            es: "Con base en esta página, ¿para qué tipo de comprador o estilo de vida es ideal Don Diego?",
            en: "Based on this page, what buyer profile or lifestyle is Don Diego best for?",
        },
    },
    {
        id: "home-highlights",
        label: {
            es: "Resume Don Diego en 5 puntos",
            en: "Summarize Don Diego in 5 points",
        },
        prompt: {
            es: "Resume Don Diego Club Residencial en 5 puntos clave para alguien que evalúa invertir.",
            en: "Summarize Don Diego Club Residencial in 5 key points for someone evaluating an investment.",
        },
    },
    {
        id: "home-visit",
        label: {
            es: "Cuando quiera: borrador para visita",
            en: "When ready: visit request draft",
        },
        prompt: {
            es: "Si ya estoy listo para dar el siguiente paso, redacta un mensaje breve y cordial para solicitar una visita privada al desarrollo.",
            en: "If I am ready for the next step, draft a brief, polite message to request a private visit to the development.",
        },
    },
];

const BLOG_SUGGESTIONS: SuggestionDef[] = [
    {
        id: "blog-summary",
        label: {
            es: "Resumen + ideas clave",
            en: "Summary + key takeaways",
        },
        prompt: {
            es: "Hazme un resumen del contenido de esta página con los puntos más importantes.",
            en: "Give me a concise summary of this page with the most important takeaways.",
        },
    },
    {
        id: "blog-questions",
        label: {
            es: "Preguntas para profundizar",
            en: "Questions to go deeper",
        },
        prompt: {
            es: "Dame 5 preguntas útiles para profundizar en este contenido.",
            en: "Give me 5 useful questions to deepen my understanding of this content.",
        },
    },
    {
        id: "blog-apply",
        label: {
            es: "Cómo aplicarlo si busco casa",
            en: "Apply this to home search",
        },
        prompt: {
            es: "¿Cómo aplico estas ideas si estoy buscando una propiedad para vivir o invertir?",
            en: "How can I apply these ideas if I am searching for a property to live in or invest in?",
        },
    },
];

const RESIDENTIAL_SUGGESTIONS: SuggestionDef[] = [
    {
        id: "res-overview",
        label: {
            es: "Pros y contras para una familia",
            en: "Pros and cons for a family",
        },
        prompt: {
            es: "Con base en esta página, dame pros y contras del componente Residencial para una familia.",
            en: "Based on this page, list pros and cons of the Residential component for a family.",
        },
    },
    {
        id: "res-investment",
        label: {
            es: "Potencial para inversión",
            en: "Investment potential",
        },
        prompt: {
            es: "¿Qué argumentos de inversión se pueden extraer de esta página?",
            en: "What investment arguments can be extracted from this page?",
        },
    },
    {
        id: "res-whatsapp",
        label: {
            es: "Borrador WhatsApp al equipo",
            en: "Draft WhatsApp to the team",
        },
        prompt: {
            es: "Cuando quiera contactar al equipo, redacta un mensaje de WhatsApp corto pidiendo disponibilidad y orientación sobre el Club Residencial.",
            en: "When I want to reach the team, draft a short WhatsApp message asking for availability and guidance on Club Residencial.",
        },
    },
];

const PROJECT_SUGGESTIONS: SuggestionDef[] = [
    {
        id: "project-components",
        label: {
            es: "Compara los 4 componentes",
            en: "Compare the 4 components",
        },
        prompt: {
            es: "Compárame los 4 componentes de Don Diego en una tabla simple: objetivo, perfil ideal y beneficios.",
            en: "Compare Don Diego's 4 components in a simple table: goal, ideal profile, and benefits.",
        },
    },
    {
        id: "project-lifestyle",
        label: {
            es: "Qué estilo de vida propone",
            en: "What lifestyle it proposes",
        },
        prompt: {
            es: "¿Qué estilo de vida propone este proyecto y para qué perfiles encaja mejor?",
            en: "What lifestyle does this project propose and what profiles fit best?",
        },
    },
    {
        id: "project-next-steps",
        label: {
            es: "Siguientes pasos para comprar",
            en: "Next steps to buy",
        },
        prompt: {
            es: "Dame una lista de siguientes pasos prácticos para avanzar en una posible compra aquí.",
            en: "Give me a practical next-steps checklist to move forward with a potential purchase here.",
        },
    },
];

const DEFAULT_SUGGESTIONS: SuggestionDef[] = [
    {
        id: "default-summary",
        label: {
            es: "Explícame esta página rápido",
            en: "Explain this page quickly",
        },
        prompt: {
            es: "Explícame esta página en lenguaje simple y breve.",
            en: "Explain this page briefly in simple language.",
        },
    },
    {
        id: "default-benefits",
        label: {
            es: "Beneficios principales",
            en: "Main benefits",
        },
        prompt: {
            es: "¿Cuáles son los principales beneficios que se ven en esta página?",
            en: "What are the main benefits highlighted on this page?",
        },
    },
    {
        id: "default-contact",
        label: {
            es: "Ayúdame a contactar",
            en: "Help me contact them",
        },
        prompt: {
            es: "Ayúdame a redactar un mensaje breve para pedir más información.",
            en: "Help me draft a short message asking for more information.",
        },
    },
];

function getSetForPageType(pageType: string): SuggestionDef[] {
    if (pageType === "home") return HOME_SUGGESTIONS;
    if (pageType === "blog" || pageType === "blogPost") return BLOG_SUGGESTIONS;
    if (pageType === "residencial") return RESIDENTIAL_SUGGESTIONS;
    if (pageType === "proyecto") return PROJECT_SUGGESTIONS;
    return DEFAULT_SUGGESTIONS;
}

export type ChatSuggestion = {
    id: string;
    label: string;
    prompt: string;
};

export function getChatSuggestions(context: ChatContext): ChatSuggestion[] {
    const locale = context.locale === "en" ? "en" : "es";
    const set = getSetForPageType(context.pageType);
    return set.slice(0, 3).map((item) => ({
        id: item.id,
        label: item.label[locale],
        prompt: item.prompt[locale],
    }));
}

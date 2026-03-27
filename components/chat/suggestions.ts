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
        id: "home-highlights",
        label: {
            es: "Resume Don Diego en 5 puntos",
            en: "Summarize Don Diego in 5 points",
        },
        prompt: {
            es: "Resume Don Diego Club Residencial en 5 puntos clave para alguien que evalua invertir.",
            en: "Summarize Don Diego Club Residencial in 5 key points for someone evaluating an investment.",
        },
    },
    {
        id: "home-fit",
        label: {
            es: "A quien le conviene vivir aqui",
            en: "Who is this ideal for",
        },
        prompt: {
            es: "Con base en esta pagina, para que tipo de comprador o estilo de vida es ideal Don Diego?",
            en: "Based on this page, what buyer profile or lifestyle is Don Diego best for?",
        },
    },
    {
        id: "home-visit",
        label: {
            es: "Ayudame a agendar visita",
            en: "Help me schedule a visit",
        },
        prompt: {
            es: "Redacta un mensaje corto y profesional para solicitar una visita privada al desarrollo.",
            en: "Draft a short professional message to request a private visit to the development.",
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
            es: "Hazme un resumen del contenido de esta pagina con los puntos mas importantes.",
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
            es: "Dame 5 preguntas utiles para profundizar en este contenido.",
            en: "Give me 5 useful questions to deepen my understanding of this content.",
        },
    },
    {
        id: "blog-apply",
        label: {
            es: "Como aplicarlo si busco casa",
            en: "Apply this to home search",
        },
        prompt: {
            es: "Como aplico estas ideas si estoy buscando una propiedad para vivir o invertir?",
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
            es: "Con base en esta pagina, dame pros y contras del componente Residencial para una familia.",
            en: "Based on this page, list pros and cons of the Residential component for a family.",
        },
    },
    {
        id: "res-investment",
        label: {
            es: "Potencial para inversion",
            en: "Investment potential",
        },
        prompt: {
            es: "Que argumentos de inversion se pueden extraer de esta pagina?",
            en: "What investment arguments can be extracted from this page?",
        },
    },
    {
        id: "res-whatsapp",
        label: {
            es: "Mensaje de WhatsApp para asesor",
            en: "WhatsApp message to advisor",
        },
        prompt: {
            es: "Redacta un mensaje de WhatsApp para un asesor pidiendo disponibilidad y precios del Club Residencial.",
            en: "Draft a WhatsApp message to an advisor asking for availability and pricing for Club Residencial.",
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
            es: "Comparame los 4 componentes de Don Diego en una tabla simple: objetivo, perfil ideal y beneficios.",
            en: "Compare Don Diego's 4 components in a simple table: goal, ideal profile, and benefits.",
        },
    },
    {
        id: "project-lifestyle",
        label: {
            es: "Que estilo de vida propone",
            en: "What lifestyle it proposes",
        },
        prompt: {
            es: "Que estilo de vida propone este proyecto y para que perfiles encaja mejor?",
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
            es: "Dame una lista de siguientes pasos practicos para avanzar en una posible compra aqui.",
            en: "Give me a practical next-steps checklist to move forward with a potential purchase here.",
        },
    },
];

const DEFAULT_SUGGESTIONS: SuggestionDef[] = [
    {
        id: "default-summary",
        label: {
            es: "Explicame esta pagina rapido",
            en: "Explain this page quickly",
        },
        prompt: {
            es: "Explicame esta pagina en lenguaje simple y breve.",
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
            es: "Cuales son los principales beneficios que se ven en esta pagina?",
            en: "What are the main benefits highlighted on this page?",
        },
    },
    {
        id: "default-contact",
        label: {
            es: "Ayudame a contactar",
            en: "Help me contact them",
        },
        prompt: {
            es: "Ayudame a redactar un mensaje breve para pedir mas informacion.",
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

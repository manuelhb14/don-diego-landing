import { GoogleGenAI } from "@google/genai";
import type { ChatContext, ChatMessage } from "@/components/chat/types";
import { SITE_CONTACT } from "@/lib/site-contact";

type GenerateChatReplyParams = {
    messages: ChatMessage[];
    context: ChatContext;
};

const SHARED_SITE_CONTEXT = `
Don Diego Club Residencial es un desarrollo residencial de lujo en San Miguel de Allende, Guanajuato. Su narrativa central es vivir en conexion con la tierra, la comunidad y uno mismo, con la promesa de estar cerca de todo y lejos de lo comun. El proyecto se presenta como un santuario donde la arquitectura se encuentra con la naturaleza, orientado a una vida consciente y de alto nivel.

San Miguel de Allende se describe como Patrimonio de la Humanidad por la UNESCO, reconocido por su arquitectura colonial, su escena cultural y su clima primaveral. Tambien se enfatiza la presencia de una comunidad internacional fuerte y la apreciacion inmobiliaria sostenida, como base para calidad de vida e inversion.

El desarrollo es de uso mixto y gira alrededor de la Presa La Cantera, sobre tierras de la antigua Hacienda de Don Diego, a 8 minutos del centro historico. Se estructura en cuatro componentes: Club Residencial, Organic Farm & Flowers, Wellness Center y Presa de la Cantera. La identidad del proyecto es integrar comunidad, paisaje, bienestar, actividades y vida social en una sola vision territorial.

Club Residencial: 364 residencias en un entorno 100% peatonal con casa club, restaurantes, spa, deportes y amenidades premium. Se destaca una comunidad pensada para caminar y convivir, con foco en calma, confort y contacto con el paisaje.

Organic Farm & Flowers: componente productivo y sostenible que recupera la vocacion agricola original del terreno, con huertos organicos, frutales, invernaderos y flores de temporada. Su valor es funcional y cultural: productos frescos para restaurantes y vida cotidiana, ademas de paisaje vivo con andadores y ciclorutas.

Wellness Center: espacio de bienestar integral para rehabilitacion, retiro activo y senior living, con vinculacion a Presa Allende y experiencias orientadas a salud, descanso y longevidad.

Presa de la Cantera: frente lacustre con malecon, parque acuatico, club nautico, anfiteatro al aire libre y zonas comerciales junto al agua. Se posiciona como puente entre residentes y comunidad, con vida cultural y recreativa.

Enfoque urbanistico: interior peatonal sin automoviles, con circuito vehicular periferico en desnivel y estacionamiento techado con acceso peatonal directo a viviendas, normalmente con dos cajones por unidad.

Ubicacion y conectividad: direccion en Cerrada del Trebol, Carretera Celaya-Dolores Hidalgo, San Miguel de Allende. Referencias de tiempo: centro historico 8 min, Fabrica La Aurora 10 min, mercados organicos 5 min, Queretaro alrededor de 2 horas y Ciudad de Mexico alrededor de 3.5 horas. El proyecto colinda con Presa Ignacio Allende y Presa La Cantera.

Experiencias y amenidades internas: clubhouse, piscina privada, gimnasio exterior, spa, restaurantes y padel. La mayoria de amenidades son exclusivas para residentes e invitados.

Equipo del proyecto: Grupo Cimienta en desarrollo y direccion general (30+ anos de experiencia inmobiliaria); Barragan Arquitectos en diseno arquitectonico con enfoque contemporaneo enraizado en la identidad de San Miguel; Espacios Verdes/Arredarq en paisajismo y sustentabilidad; Artemisa Branding en identidad y estrategia de marca para real estate de alto nivel.

Mensaje de marca y comunicacion: propuesta de pertenencia y exclusividad, con tono editorial y aspiracional. El lenguaje insiste en bienestar, diseno, naturaleza y comunidad como ejes de valor.

Contacto comercial: invitacion a agendar visita privada, solicitar informacion y conversar por WhatsApp. Tono de conversion orientado a conocer el proyecto en persona y dar seguimiento personalizado.

Contenido editorial del blog: historias y experiencias como cuaderno visual del entorno, caminatas y vida cotidiana en Don Diego, usado para reforzar estilo de vida y contexto cultural.

FAQ clave: explicacion de los 4 componentes, ubicacion exacta, acceso diferenciado entre zonas privadas y areas con vocacion comunitaria, funcionamiento de Organic Farm & Flowers como sistema productivo real, y principios del plan maestro peatonal.

Componentes legales y de confianza: existencia de terminos de servicio, politica de privacidad, consentimiento para contacto y suscripcion, y comunicacion de derechos reservados de marca.
`;

function sanitizeContext(context: ChatContext): ChatContext {
    const sanitizeValue = (value: unknown, depth = 0): unknown => {
        if (value == null) return undefined;
        if (depth > 4) return undefined;

        if (typeof value === "string") {
            const trimmed = value.trim();
            return trimmed ? trimmed.slice(0, 400) : undefined;
        }

        if (typeof value === "number" || typeof value === "boolean") {
            return value;
        }

        if (Array.isArray(value)) {
            const sanitized = value
                .slice(0, 20)
                .map((item) => sanitizeValue(item, depth + 1))
                .filter((item): item is Exclude<typeof item, undefined> => item !== undefined);
            return sanitized.length ? sanitized : undefined;
        }

        if (typeof value === "object") {
            const entries = Object.entries(value as Record<string, unknown>).slice(0, 40);
            const sanitizedEntries = entries
                .map(([key, nested]) => [key, sanitizeValue(nested, depth + 1)] as const)
                .filter(([, nested]) => nested !== undefined);
            return sanitizedEntries.length ? Object.fromEntries(sanitizedEntries) : undefined;
        }

        return undefined;
    };

    const detail = sanitizeValue(context.detail);

    return {
        pathname: context.pathname,
        locale: context.locale,
        pageType: context.pageType,
        detail: detail && typeof detail === "object" ? detail as Record<string, unknown> : undefined,
    };
}

const IMPORTANT_FACTS = [
    "Core promise: conscious, high-end residential living connected to land, community, and wellbeing.",
    "Location: San Miguel de Allende, around 8 minutes from historic center, near Presa Ignacio Allende and Presa La Cantera.",
    "Master plan: four components (Club Residencial, Organic Farm & Flowers, Wellness Center, Presa de la Cantera).",
    "Club Residencial highlights: 364 residences, 100% pedestrian interior, premium amenities and social life.",
    "Urban model: interior without cars, peripheral lower-level vehicular circuit, covered parking with pedestrian access.",
    "CTA priority: invite private visit, provide clear next steps, and keep response concise.",
].join(" ");

const ALWAYS_ON_PROPERTY_TYPES = [
    "Property types in Club Residencial:",
    "Departamentos: 113-173 m2, 2-3 bedrooms, 2-3 bathrooms, 2 parking spaces.",
    "Casas duplex Tipo 1: 128-155 m2, 2-3 bedrooms, 2-3 bathrooms, 2 parking spaces.",
    "Casas duplex Tipo 2: 166-185 m2, 2-4 bedrooms, 3-4 bathrooms, 2 parking spaces.",
    "Casas duplex Tipo 3: 142-181 m2, 2-3 bedrooms, 2-3 bathrooms, 2 parking spaces.",
    "Notes: selected prototypes include jacuzzi; some layouts allow independent bedroom rental.",
].join(" ");

const WHATSAPP_CONTACT_REFERENCE = [
    "WhatsApp contact reference:",
    `Phone display: ${SITE_CONTACT.phoneDisplay}.`,
    `WhatsApp link: ${SITE_CONTACT.whatsappUrl}.`,
    "Do not mention this contact info proactively.",
    "Share it only when the user explicitly asks for contact details, WhatsApp, phone number, or how to reach sales.",
].join(" ");

export function buildSystemPrompt(context: ChatContext): string {
    const lang = context.locale === "en" ? "English" : "Spanish";
    const contextText = JSON.stringify(sanitizeContext(context));

    return [
        "You are Asistente Opta for Don Diego Club Residencial, a luxury real-estate development in San Miguel de Allende.",
        "Be concise, practical, and trustworthy.",
        "Default response length: 3-5 short bullet points or 1 short paragraph (max 90 words).",
        "Only expand when the user explicitly asks for more detail.",
        "Prefer concrete recommendations over long explanations.",
        "Avoid repeating background context unless requested.",
        `Always answer in ${lang}.`,
        "Ground your response in the provided page context.",
        "If context is limited, state assumptions briefly instead of inventing details.",
        "Avoid legal, financial, or medical definitive advice; suggest consulting an expert when needed.",
        `Most important project facts: ${IMPORTANT_FACTS}`,
        `Always-on property types reference: ${ALWAYS_ON_PROPERTY_TYPES}`,
        `Conditional contact reference: ${WHATSAPP_CONTACT_REFERENCE}`,
        `Global Don Diego site context (from es.json): ${SHARED_SITE_CONTEXT}`,
        `Current page context: ${contextText}`,
    ].join(" ");
}

export async function generateChatReply({ messages, context }: GenerateChatReplyParams): Promise<string> {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Missing GOOGLE_GEMINI_API_KEY");
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = process.env.GEMINI_CHAT_MODEL || process.env.GEMINI_MODEL || "gemini-2.5-flash";

    const safeMessages = messages
        .slice(-12)
        .map((message) => `${message.role.toUpperCase()}: ${message.content.trim().slice(0, 1200)}`)
        .join("\n");

    const response = await ai.models.generateContent({
        model,
        contents: [
            { text: buildSystemPrompt(context) },
            { text: `Conversation:\n${safeMessages}` },
        ],
        config: {
            maxOutputTokens: 420,
            temperature: 0.5,
        } as never,
    });

    const reply = response.text;
    if (!reply || !reply.trim()) {
        return context.locale === "en"
            ? "I could not generate a response right now."
            : "No pude generar una respuesta por ahora.";
    }

    return reply.trim();
}

import { GoogleGenAI } from "@google/genai";
import type { ChatContext, ChatMessage } from "@/components/chat/types";

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
    const allowedDetailKeys = ["slug", "title", "category", "tags"];
    const detail: Record<string, unknown> = {};
    if (context.detail) {
        for (const key of allowedDetailKeys) {
            const value = context.detail[key];
            if (typeof value === "string" || Array.isArray(value)) {
                detail[key] = value;
            }
        }
    }

    return {
        pathname: context.pathname,
        locale: context.locale,
        pageType: context.pageType,
        detail: Object.keys(detail).length ? detail : undefined,
    };
}

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

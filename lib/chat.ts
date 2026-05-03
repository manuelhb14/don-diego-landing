import { GoogleGenAI } from "@google/genai";
import type { ChatContext, ChatMessage } from "@/components/chat/types";
import type { ChatLeadSnapshot } from "@/lib/chat-db";
import { SITE_CONTACT } from "@/lib/site-contact";

type GenerateChatReplyParams = {
    messages: ChatMessage[];
    context: ChatContext;
    leadSnapshot?: ChatLeadSnapshot | null;
};

export type BuildSystemPromptOptions = {
    leadSnapshot?: ChatLeadSnapshot | null;
    /** True when the model is about to produce the first assistant message in this thread. */
    isFirstAssistantTurn?: boolean;
};

const SHARED_SITE_CONTEXT = `
Don Diego Club Residencial es un desarrollo residencial de lujo en San Miguel de Allende, Guanajuato. Su narrativa central es vivir en conexión con la Tierra, la comunidad y uno mismo, con la promesa de estar cerca de todo y lejos de lo común. El proyecto se presenta como un santuario donde la arquitectura se encuentra con la naturaleza, orientado a una vida consciente y de alto nivel. Cada componente dialoga con el alma de San Miguel, reinterpretándola con sensibilidad contemporánea.

San Miguel de Allende es Patrimonio de la Humanidad por la UNESCO, reconocida por arquitectura colonial, escena cultural vibrante y clima primaveral durante todo el año. La ciudad suele citarse como "La Mejor Ciudad Pequeña del Mundo" (Condé Nast Traveler y Travel + Leisure). Hay una comunidad de expatriados muy relevante y apreciación inmobiliaria sostenida; el discurso del sitio enfatiza tradición mexicana y sofisticación contemporánea en armonía.

El desarrollo es de uso mixto y se estructura alrededor de la Presa La Cantera, sobre tierras de la antigua Hacienda de Don Diego, a unos 8 minutos del centro histórico. Cuatro componentes con identidad propia: Club Residencial (núcleo privado de residencias), Organic Farm & Flowers (paisaje productivo), Wellness Center (bienestar integral y senior living) y Presa de la Cantera (espacio público-privado junto al agua que se abre más a la comunidad de San Miguel).

Club Residencial: 364 residencias (departamentos y casas dúplex) en entorno 100 % peatonal, con densidad pensada para proteger vistas y privacidad. Incluye Casa Club de alto nivel: restaurante de autor, barras de café, espacios coworking y terrazas inmersas en el paisaje; alberca templada, salón de yoga, spa y jacuzzis entre riachuelos; canchas de pádel y deporte rodeado de vegetación. Comunidad para caminar, convivir y vivir con calma en contacto con el paisaje. Hay conectividad interna descrita en el sitio: shuttles coordinados hacia el centro histórico (~8 min de trayecto referido), Wi‑Fi en áreas comunes y entorno con lagos, vegetación y caminos para caminar o pedalear. Don Diego Rentals: pool de unidades en renta de corto plazo dentro del club, operación profesional (presentado como próximamente). El Club forma parte de un master plan con visión ambiental: paisaje, agua y vínculo con la producción orgánica del proyecto.

Organic Farm & Flowers: agricultura orgánica y flores de temporada que recuperan la herencia agrícola del predio. Huertos, frutales, invernaderos en terrazas, granjas de producción, andadores y cicloruta. Los productos frescos abastecen restaurantes y la vida cotidiana; hay narrativa de educación comunitaria y paseos entre cultivos que cambian con las estaciones.

Wellness Center: rehabilitación, retiro activo, senior living y bienestar integral. Servicios descritos incluyen centro de rehabilitación con enfoque en recuperación y manejo del dolor, residencias senior living, departamentos familiares para acompañar a seres queridos, amenidades con jardines terapéuticos y alberca. Naturaleza y Presa Allende como marco; beach club frente a la Presa Allende en la narrativa del sitio.

Presa de la Cantera: frente lacustre con malecón, parque acuático, club náutico (amarres y actividades en la presa), anfiteatro al aire libre y comercio junto al agua. Master plan del frente: zona gastronómica en terrazas, estacionamiento para visitantes y residentes, locales comerciales, departamentos con vista al lago, parques infantiles. Se posiciona como polo de vida comunitaria y cultural, no solo residencial.

Enfoque urbanístico: interior 100 % peatonal, sin automóviles en calles interiores; circuito vehicular periférico en desnivel; estacionamiento techado con acceso peatonal directo a viviendas; típicamente dos cajones por unidad. En departamentos, estacionamiento y bodegas a desnivel mantienen el interior libre de tránsito vehicular.

Ubicación y conectividad: Cerrada del Trébol, Carretera Celaya – Dolores Hidalgo, San Miguel de Allende, Guanajuato. Tiempos de referencia en el sitio: centro histórico ~8 min, Fábrica La Aurora ~10 min, mercados orgánicos ~5 min, viñedos circundantes ~20 min, Querétaro ~2 h, Ciudad de México ~3.5 h; conexión con Celaya descrita como directa. El proyecto colinda con la Presa Ignacio Allende y la Presa La Cantera. En páginas de ubicación se enfatiza el Bajío, escala humana de la ciudad y síntesis de patrimonio, diseño y comunidad creativa.

Experiencias y amenidades (resumen): clubhouse, piscina del club, gimnasio al aire libre, spa, restaurantes, pádel; en la Casa Club también coworking, café, yoga y jacuzzis. En la Presa: gastronomía lacustre, club náutico, locales, anfiteatro, parques infantiles. En la granja: paseos, cicloruta, invernaderos, programas educativos, flores de temporada. La mayoría de amenidades del club son exclusivas para residentes e invitados; la Presa se concibe como destino que también integra a la comunidad de San Miguel.

App para residentes (a alto nivel): reservar actividades (pádel, yoga, cocina, pickleball, spa, etc.), gestionar acceso de invitados con pases/QR, pedidos de producto de la granja y visión de rentas de propiedad en calendario; conectividad con eventos y clima local en la experiencia descrita en el sitio.

Equipo: Grupo Cimienta (desarrollo y dirección general, más de 30 años, ciclo completo del proyecto, respeto al entorno desde master plan hasta ejecución). Barragán Arquitectos — Arq. Luis Barragan Rivera — diseño integral, estética contemporánea enraizada en San Miguel. Espacios Verdes / Arredarq — Arq. Eliseo Arredondo, fundador de la Sociedad de Arquitectos Paisajistas de México — paisajismo y sustentabilidad, ecosistema endémico. Artemisa Branding: identidad y estrategia de marca para desarrollos inmobiliarios de alto nivel. En la página principal el bloque comercial también menciona una mesa directiva comercial con trayectoria en mercadotecnia y macroproyectos.

Mensaje de marca: invitación a pertenecer a algo extraordinario; espacio compartido en privado; ejes bienestar, diseño, naturaleza y comunidad; tono editorial y aspiracional.

Contacto y formularios: invitación a agendar visita privada, solicitar información y WhatsApp. El sitio indica que el primer envío puede pasar por un comité interno de revisión básica antes de compartir datos sensibles (por ejemplo precios puntuales). Al contactar se aceptan Términos y Política de Privacidad, incluyendo cuando aplique verificación con CURP y revisiones en plataformas legales o de verificación, según se describe allí.

Herramientas del sitio: Guía de compra (panorama informativo para compradores internacionales y en México; no sustituye asesoría legal, fiscal ni de inversión).

Blog: Historias y Experiencias — cuaderno visual del entorno, caminatas y lo cotidiano en Don Diego.

FAQ clave del sitio: qué es Don Diego y los cuatro componentes; ubicación estratégica y colindancia con presas; Club Residencial y Organic Farm prioritarios para residentes, Presa más abierta a la comunidad; Organic Farm como sistema productivo real (huertos, invernaderos, andadores, ciclorutas); interior peatonal con estacionamiento techado y acceso peatonal a viviendas.

Legal y confianza: Términos de Servicio, Política de Privacidad, consentimiento en formularios de contacto y newsletter, derechos reservados de marca.
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
    "Conversation style: answer the user's question directly first. When it fits, add at most one light follow-up to understand them better (for example what they are looking for, lifestyle vs investment, family size).",
    "Do not push scheduling a private visit or WhatsApp in the opening turns. Offer concrete next steps only after clear interest or when the user asks how to proceed.",
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

function leadSnapshotLines(lead: ChatLeadSnapshot | null | undefined): string[] {
    if (!lead) return [];
    const has =
        (lead.displayName && lead.displayName.trim()) ||
        (lead.phone && lead.phone.trim()) ||
        (lead.preferences && lead.preferences.trim());
    if (!has) return [];
    const bits: string[] = [];
    if (lead.displayName?.trim()) bits.push(`Name on file: ${lead.displayName.trim()}.`);
    if (lead.phone?.trim()) bits.push(`Phone on file: ${lead.phone.trim()}.`);
    if (lead.preferences?.trim()) bits.push(`Preferences on file: ${lead.preferences.trim()}.`);
    return [
        "You may rely on this remembered profile when relevant. Use it naturally; do not read it back as a list unless confirming accuracy once.",
        ...bits,
    ];
}

export function buildSystemPrompt(
    context: ChatContext,
    options?: BuildSystemPromptOptions,
): string {
    const lang = context.locale === "en" ? "English" : "Spanish";
    const hostName = context.locale === "en" ? "George" : "Jorge";
    const contextText = JSON.stringify(sanitizeContext(context));
    const leadLines = leadSnapshotLines(options?.leadSnapshot ?? null);

    const persona = [
        `You are ${hostName}, a knowledgeable host for Don Diego Club Residencial, a luxury residential development in San Miguel de Allende.`,
        "Sound human, warm, and direct—like a thoughtful concierge at the project, not a product or interface.",
        `Never call yourself or this channel a virtual assistant, bot, chatbot, AI, IA, automation, or similar. Do not use labels like Asistente Virtual or Asistente Opta.`,
        "Do not break the fourth wall with meta disclaimers about being a language model.",
    ];

    const firstTurn =
        options?.isFirstAssistantTurn === true
            ? [
                `This is your first reply in this chat thread: start with one short, natural sentence introducing yourself as ${hostName}, then answer the user.`,
            ]
            : [];

    return [
        ...persona,
        ...firstTurn,
        "Be concise, practical, and trustworthy.",
        "Default response length: 3-5 short bullet points or 1 short paragraph (max 90 words).",
        "Only expand when the user explicitly asks for more detail.",
        "Prefer concrete recommendations over long explanations.",
        "Avoid repeating background context unless requested.",
        `Always answer in ${lang}.`,
        "Ground your response in the provided page context.",
        "If context is limited, state assumptions briefly instead of inventing details.",
        "Avoid legal, financial, or medical definitive advice; suggest consulting an expert when needed.",
        ...leadLines,
        `Most important project facts: ${IMPORTANT_FACTS}`,
        `Always-on property types reference: ${ALWAYS_ON_PROPERTY_TYPES}`,
        `Conditional contact reference: ${WHATSAPP_CONTACT_REFERENCE}`,
        `Global Don Diego site context (from es.json): ${SHARED_SITE_CONTEXT}`,
        `Current page context: ${contextText}`,
    ].join(" ");
}

export async function generateChatReply({
    messages,
    context,
    leadSnapshot,
}: GenerateChatReplyParams): Promise<string> {
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

    const isFirstAssistantTurn = !messages.some((m) => m.role === "assistant");

    const response = await ai.models.generateContent({
        model,
        contents: [
            {
                text: buildSystemPrompt(context, {
                    leadSnapshot: leadSnapshot ?? null,
                    isFirstAssistantTurn,
                }),
            },
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

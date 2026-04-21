export type PurchaseGuideStep = {
    title: string;
    body: string;
};

export type PurchaseGuideRegion = {
    title: string;
    intro: string;
    bullets: string[];
};

export type PurchaseGuideContent = {
    disclaimerBody: string[];
    mexicoForeignBuyer: {
        title: string;
        paragraphs: string[];
    };
    steps: {
        title: string;
        items: PurchaseGuideStep[];
    };
    homeCountryConsiderations: {
        title: string;
        intro: string;
        unitedStates: PurchaseGuideRegion;
        canada: PurchaseGuideRegion;
        europe: PurchaseGuideRegion;
    };
    checklist: {
        title: string;
        items: string[];
    };
};

const en: PurchaseGuideContent = {
    disclaimerBody: [
        "This guide summarizes common themes that international buyers encounter when evaluating residential real estate in Mexico. It is not legal, tax, immigration, or investment advice, and it does not create an attorney–client or notarial relationship.",
        "Laws, fees, timelines, and documentation requirements change and depend on your facts (marital status, nationality, entity structure, financing, and the specific lot or product). Before you sign anything or send funds, confirm every material point with a Mexican notario público and counsel you select, and with qualified advisers in your home country.",
    ],
    mexicoForeignBuyer: {
        title: "Buying as a foreign national in Mexico (context for Don Diego)",
        paragraphs: [
            "Mexico uses a civil-law system. The notario público is a neutral government-appointed gatekeeper for many real-estate closings: they authenticate instruments, calculate and collect certain taxes and duties at closing, and coordinate registration when applicable. Your notary is not a substitute for your own lawyer if you want independent advice on risk allocation, developer contracts, or corporate structures.",
            "Foreign individuals sometimes hear about the “restricted zone” (generally within 100 km of international land borders and 50 km of the coast), where residential acquisition by foreigners is often structured through a bank trust (fideicomiso). San Miguel de Allende, Guanajuato, is generally outside that restricted band, and direct ownership (escritura in your name or in an entity you control) is often feasible—but this is parcel- and title-specific. Do not assume; verify for your exact unit or lot.",
            "Anti–money laundering (AML) rules mean you should expect requests for identification, proof of address, and documentation of the lawful source of funds. This is normal and should be planned for early.",
        ],
    },
    steps: {
        title: "Step-by-step overview (typical residential purchase)",
        items: [
            {
                title: "1. Clarify what you are buying and from whom",
                body: "Confirm the product type (lot, presale home, inventory home, fractional interest, trust interest, etc.), the counterparty (developer, individual, entity), and what documents establish their right to sell. If buying from a developer, ask how the master development is structured and what security instruments or guarantees may apply.",
            },
            {
                title: "2. Initial commercial terms and reservation (if offered)",
                body: "You may encounter a reservation fee or soft hold. Treat any payment as serious: read refund conditions, timelines, and what happens if diligence reveals a problem. Prefer written terms reviewed by counsel before you wire funds.",
            },
            {
                title: "3. Letter of intent or offer (non-binding unless stated otherwise)",
                body: "A letter of intent can align price, currency, closing window, and included items. Ensure it matches what you intend—some drafts are partially binding. Have counsel review before signature.",
            },
            {
                title: "4. Promise to purchase (contrato de promesa) or private purchase agreement",
                body: "Many transactions use a promesa or similar private agreement with milestones (deposits, conditions precedent, penalties). This is contract law territory: understand defaults, cure periods, and what happens if permits or financing are delayed. Do not rely on verbal assurances that contradict the writing.",
            },
            {
                title: "5. Due diligence (title, liens, authority, and project risk)",
                body: "Common diligence themes include: chain of title and encumbrances (often reviewed via certificado de libertad de gravamen and related registry searches), HOA or master-development obligations, utilities and infrastructure status, liens and fiscal certificates, and seller authority (individual, estate, corporate resolutions). For new construction, add construction permits, completion bonds/warranties where applicable, and delivery standards.",
            },
            {
                title: "6. Closing before the notario público and the escritura",
                body: "The deed (escritura pública) is typically formalized before a notario. The notary’s role includes legal formalities and collection of certain taxes/fees at closing. Ask for a closing statement in advance and reconcile it with your counsel’s expectations.",
            },
            {
                title: "7. Registration and third-party notices",
                body: "Understand what will be registered in the Registro Público de la Propiedad y de Comercio and what evidence you will receive after registration. If a fideicomiso or other vehicle is used, confirm how your rights are evidenced and serviced administratively.",
            },
            {
                title: "8. Handover, utilities, HOA/administration, and insurance",
                body: "Plan for account transfers for utilities where possible, HOA/admin onboarding, keys and access, and property insurance appropriate to your use (full-time residence vs rental).",
            },
            {
                title: "9. Post-closing compliance (Mexico and abroad)",
                body: "After closing, you may have ongoing obligations such as property tax (predial), local filings, and entity maintenance if you use a vehicle. Separately, your home country may impose reporting or tax consequences that are independent from the Mexican closing—see the regional notes below.",
            },
        ],
    },
    homeCountryConsiderations: {
        title: "If you live in the United States, Canada, or Europe",
        intro: "The following are common discussion points for cross-border buyers. They are not exhaustive and may not apply to you. Confirm with advisers licensed in your jurisdiction.",
        unitedStates: {
            title: "United States (informational themes)",
            intro: "U.S. persons often focus on reporting and tax treatment of foreign assets and foreign accounts—rules are fact-specific and change.",
            bullets: [
                "Foreign real estate ownership can interact with U.S. reporting rules when thresholds and definitions are met; concepts that sometimes arise in planning include Form 8938 (Statement of Specified Foreign Financial Assets) and related international information returns. Real estate is not always treated like a bank account—get tailored advice.",
                "If you open or control foreign financial accounts (bank/brokerage), you may need to consider FinCEN Form 114 (FBAR) and other disclosures separately from the deed itself.",
                "Estate planning for non-U.S. situs assets may differ from domestic plans; consider whether you need updated wills, trusts, and beneficiary designations coordinated across jurisdictions.",
                "If you rent the property, you may trigger U.S. and Mexican tax concepts (net income, deductions, withholding, and treaty positions, if applicable).",
            ],
        },
        canada: {
            title: "Canada (informational themes)",
            intro: "Canadian residents may have foreign-property reporting and tax implications depending on how the asset is held and used.",
            bullets: [
                "CRA Form T1135 (Foreign Income Verification Statement) is a recurring compliance topic for certain Canadian residents with specified foreign property above thresholds; determine whether your facts require filing and what must be disclosed.",
                "Principal-residence treatment generally will not apply to a home outside Canada in the same way as a Canadian residence; selling or renting can trigger Canadian tax questions.",
                "Currency conversion, wire timing, and source-of-funds documentation should be coordinated with your bank and your Mexican closing team.",
            ],
        },
        europe: {
            title: "Europe (informational themes)",
            intro: "The EU does not harmonize real-estate purchase law for private buyers; your obligations depend on your country of tax residence, citizenship, and banking relationships.",
            bullets: [
                "Expect AML and source-of-wealth questions from financial institutions when moving large sums cross-border; prepare a clear paper trail.",
                "Tax residency rules differ by country and can affect reporting of foreign assets, wealth taxes (where they exist), and treatment of rental income or capital gains.",
                "If you hold the asset through a company, trust, or partnership, layer-on corporate reporting and substance considerations in both Mexico and your home jurisdiction.",
            ],
        },
    },
    checklist: {
        title: "Documents and materials to prepare early",
        items: [
            "Valid passport (and secondary ID if available).",
            "Proof of address in your home country (utility bill or bank statement, as accepted by the counterparty).",
            "If married or in a recognized partnership: marital regime / matrimonial property documents as applicable; your counsel can advise on how Mexico will view spousal consent.",
            "If buying through an entity: articles of organization, good standing, corporate resolutions, and authorized signatory evidence.",
            "Source-of-funds documentation for AML (employment income, sale proceeds, gifts with supporting letters, investment statements—whatever matches your truth).",
            "Contact details for your Mexican notario and independent counsel; contact details for your home-country tax adviser.",
        ],
    },
};

const es: PurchaseGuideContent = {
    disclaimerBody: [
        "Esta guía resume temas frecuentes que enfrentan compradores internacionales al evaluar vivienda en México. No constituye asesoría legal, fiscal, migratoria ni de inversión, y no crea relación abogado–cliente ni notarial.",
        "Las leyes, honorarios, plazos y requisitos documentales cambian y dependen de sus hechos (estado civil, nacionalidad, estructura societaria, financiamiento y el inmueble o producto específico). Antes de firmar o enviar fondos, confirme cada punto material con un notario público mexicano y abogados de su elección, y con asesores calificados en su país de origen.",
    ],
    mexicoForeignBuyer: {
        title: "Comprar como extranjero en México (contexto para Don Diego)",
        paragraphs: [
            "México es un sistema de derecho civil. El notario público suele ser una figura clave en muchos cierres inmobiliarios: autentica instrumentos, calcula y recauda ciertos impuestos y derechos en el cierre, y coordina el registro cuando corresponde. El notario no reemplaza necesariamente a su propio abogado si desea asesoría independiente sobre riesgos, contratos con desarrollador o estructuras societarias.",
            "A veces se menciona la “zona restringida” (de forma general, 100 km de fronteras terrestres internacionales y 50 km de costas), donde la adquisición habitacional por extranjeros frecuentemente se estructura mediante fideicomiso bancario. San Miguel de Allende, Guanajuato, suele quedar fuera de esa banda restringida, y la propiedad directa (escritura a su nombre o a nombre de una entidad que usted controle) suele ser viable—pero depende del predio y del título. No asuma; verifique para su unidad o lote exacto.",
            "Las normas contra lavado de dinero (AML) implican que deberá aportar identificación, comprobante de domicilio y documentación del origen lícito de los fondos. Es habitual y conviene planearlo desde el inicio.",
        ],
    },
    steps: {
        title: "Panorama paso a paso (compra residencial típica)",
        items: [
            {
                title: "1. Aclare qué compra y a quién le compra",
                body: "Confirme el tipo de producto (lote, vivienda en preventa, inventario, copropiedad, derechos fiduciarios, etc.), la contraparte (desarrollador, persona física, sociedad) y qué documentos acreditan su facultad para enajenar. Si compra a desarrollador, indague cómo está estructurado el desarrollo maestro y qué garantías o figuras de seguridad pueden aplicar.",
            },
            {
                title: "2. Términos comerciales iniciales y apartado (si aplica)",
                body: "Puede haber apartado o reserva. Cualquier pago es serio: revise condiciones de reembolso, plazos y qué ocurre si la debida diligencia revela un problema. Prefiera términos por escrito revisados por asesor antes de transferir fondos.",
            },
            {
                title: "3. Carta de intención u oferta (no vinculante salvo que se diga lo contrario)",
                body: "Una carta de intención puede alinear precio, moneda, ventana de cierre e inclusiones. Asegúrese de que refleje lo que usted quiere—algunos borradores son parcialmente vinculantes. Revise con abogado antes de firmar.",
            },
            {
                title: "4. Promesa de compraventa o contrato privado",
                body: "Muchas operaciones usan promesa o acuerdo privado con hitos (anticipos, condiciones suspensivas, penas). Esto es contrato: entienda incumplimientos, plazos de subsanación y qué pasa si hay retrasos en permisos o financiamiento. No dependa de aseguraciones verbales que contradigan el escrito.",
            },
            {
                title: "5. Debida diligencia (titulo, gravámenes, facultades y riesgos del proyecto)",
                body: "Temas frecuentes: cadena de dominio y gravámenes (p. ej. certificado de libertad de gravamen y búsquedas registrales), obligaciones de condominio o régimen maestro, servicios e infraestructura, certificados fiscales y facultades del enajenante (persona, sucesión, resoluciones societarias). En obra nueva, sume permisos de construcción, garantías de cumplimiento cuando aplique y estándares de entrega.",
            },
            {
                title: "6. Cierre ante notario público y escritura",
                body: "La escritura pública suele formalizarse ante notario. El notario atiende formalidades legales y recauda ciertos impuestos y derechos en el cierre. Solicite un estado de cuenta previo al cierre y concílielo con las expectativas de su asesor.",
            },
            {
                title: "7. Registro y constancias ante terceros",
                body: "Entienda qué se inscribirá en el Registro Público de la Propiedad y de Comercio y qué constancias recibirá tras el registro. Si se usa fideicomiso u otra figura, confirme cómo quedan evidenciados sus derechos y la administración cotidiana.",
            },
            {
                title: "8. Entrega, servicios, administración y seguros",
                body: "Planee cambios de titular en servicios cuando sea posible, alta en administración o condominio, llaves y accesos, y un seguro adecuado al uso (vivienda habitual vs renta).",
            },
            {
                title: "9. Cumplimiento posterior al cierre (México y el extranjero)",
                body: "Después del cierre pueden existir obligaciones como predial, trámites locales y mantenimiento societario si usa un vehículo. Por separado, su país de origen puede imponer reporteos o consecuencias fiscales independientes del cierre en México—vea los anexos regionales.",
            },
        ],
    },
    homeCountryConsiderations: {
        title: "Si vive en Estados Unidos, Canadá o Europa",
        intro: "Lo siguiente son temas frecuentes de conversación para compradores transfronterizos. No es una lista exhaustiva y puede no aplicar a usted. Confirme con asesores autorizados en su jurisdicción.",
        unitedStates: {
            title: "Estados Unidos (temas informativos)",
            intro: "Las personas con vínculos fiscales en EE. UU. suelen analizar reporteo y tratamiento fiscal de activos y cuentas en el extranjero—las reglas dependen de los hechos y cambian.",
            bullets: [
                "La titularidad de inmuebles en el extranjero puede interactuar con reglas de reporteo de EE. UU. cuando se cumplen umbrales y definiciones; en planificación a veces surgen conceptos como el Formulario 8938 y otras declaraciones informativas. Un inmueble no siempre se trata como una cuenta bancaria—requiera asesoría personalizada.",
                "Si abre o controla cuentas financieras extranjeras (banco/corretaje), podría necesitar considerar el Formulario 114 de FinCEN (FBAR) y otras revelaciones aparte de la escritura.",
                "La sucesión para activos fuera de EE. UU. puede diferir de un plan doméstico; evalúe testamentos, fideicomisos y beneficiarios coordinados entre jurisdicciones.",
                "Si renta el inmueble, pueden surgir conceptos fiscales en México y EE. UU. (ingreso neto, deducciones, retenciones y posiciones de tratado, si aplica).",
            ],
        },
        canada: {
            title: "Canadá (temas informativos)",
            intro: "Los residentes canadienses pueden tener reporteo e implicaciones fiscales en el extranjero según la titularidad y el uso del bien.",
            bullets: [
                "El formulario T1135 de la CRA es un tema recurrente de cumplimiento para ciertos residentes con propiedad extranjera especificada por encima de umbrales; determine si aplica a sus hechos y qué debe revelarse.",
                "El tratamiento de vivienda principal no suele aplicarse del mismo modo a una casa fuera de Canadá; la renta o la venta pueden plantear preguntas fiscales canadienses.",
                "Conviene coordinar conversión de moneda, tiempos de transferencia y documentación de origen de fondos con su banco y el equipo de cierre en México.",
            ],
        },
        europe: {
            title: "Europa (temas informativos)",
            intro: "La UE no unifica la compraventa inmobiliaria privada; sus obligaciones dependen de su residencia fiscal, nacionalidad y relaciones bancarias.",
            bullets: [
                "Espere preguntas AML y de origen de patrimonio de instituciones financieras al mover sumas relevantes; prepare un rastro documental claro.",
                "Las reglas de residencia fiscal varían por país y pueden afectar el reporteo de activos en el extranjero, impuestos patrimoniales (donde existan) y el tratamiento de rentas o ganancias de capital.",
                "Si titulariza mediante sociedad, fideicomiso o figura similar, sume reporteos corporativos y análisis de sustancia en México y en su país.",
            ],
        },
    },
    checklist: {
        title: "Documentos y materiales para preparar con anticipación",
        items: [
            "Pasaporte vigente (y identificación adicional si la tiene).",
            "Comprobante de domicilio en su país (recibo de servicio o estado de cuenta bancario, según lo acepte la contraparte).",
            "Si está casado o en unión reconocida: régimen patrimonial y documentos aplicables; su abogado puede orientar sobre consentimientos o requisitos en México.",
            "Si compra por persona moral: acta constitutiva, constancia de situación fiscal, poderes y acuerdos de órgano que acrediten facultades.",
            "Documentación de origen de fondos para AML (ingresos laborales, venta de activo, donación con respaldo, estados de cuenta—independientemente de su caso real).",
            "Datos de contacto de su notario mexicano y abogado independiente; datos de su asesor fiscal en su país.",
        ],
    },
};

export const purchaseGuideByLocale: Record<"en" | "es", PurchaseGuideContent> = {
    en,
    es,
};

export function getPurchaseGuideContent(locale: string): PurchaseGuideContent {
    return locale === "en" ? purchaseGuideByLocale.en : purchaseGuideByLocale.es;
}

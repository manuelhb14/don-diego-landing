export type PurchaseGuideStep = {
    title: string;
    body: string;
};

export type PurchaseGuideRegion = {
    title: string;
    intro: string;
    bullets: string[];
};

/** Cross-border and foreign-buyer view (US / Canada / Europe / LatAm + Mexico context) */
export type InternationalPurchaseGuide = {
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
        latinAmerica: PurchaseGuideRegion;
    };
    checklist: {
        title: string;
        items: string[];
    };
};

/** Buyers who live in Mexico — same journey, phrasing tuned for local buyers */
export type LocalMexicoPurchaseGuide = {
    disclaimerBody: string[];
    localIntro: {
        title: string;
        paragraphs: string[];
    };
    steps: {
        title: string;
        items: PurchaseGuideStep[];
    };
    checklist: {
        title: string;
        items: string[];
    };
};

export type PurchaseGuideBundle = {
    international: InternationalPurchaseGuide;
    localMexico: LocalMexicoPurchaseGuide;
};

const internationalEn: InternationalPurchaseGuide = {
    disclaimerBody: [
        "This page is a friendly overview for people exploring a home at Don Diego in San Miguel de Allende. It is not legal, tax, immigration, or investment advice, and it does not create a lawyer–client or notary relationship with us.",
        "Details depend on your situation (how you’re buying, your nationality, whether you use a company, and the exact lot or unit). Before you sign or wire money, double‑check the important points with a Mexican notario and lawyers you choose, and with advisers in your home country if you’re buying from abroad.",
    ],
    mexicoForeignBuyer: {
        title: "How a purchase is structured at Don Diego (San Miguel de Allende)",
        paragraphs: [
            "At Don Diego, as in most substantial residential transactions in Mexico, closing is usually built around a public deed before a notario público: that office formalizes the instrument, calculates and collects many of the taxes and fees tied to the closing, and, where applicable, coordinates registration. It does not replace independent counsel for negotiating or reviewing the developer’s contract on your side.",
            "Don Diego is located in San Miguel de Allende, Guanajuato—generally outside the coastal or border “restricted” band that often requires a fideicomiso. Title in your name or through an entity you control is often available depending on the specific lot or unit. Your notary and legal team confirm the structure for the property you are actually buying, not a generic “Mexico” rule of thumb.",
            "In line with law and good AML practice, the project will require identification, proof of address, and a documented source of funds. Those steps are part of a development of this scale, not a checklist disconnected from the Don Diego process.",
        ],
    },
    steps: {
        title: "Key stages in the Don Diego purchase process",
        items: [
            {
                title: "1. The specific home, documentation, and the developer as counterparty",
                body: "Your transaction at Don Diego is tied to a specific product in the master plan: typology, delivery status, location within the community, and use of common areas and amenities, all reflected in the sales pack and, later, in your agreements. The counterparty is the developer or a party you verify as authorized; your counsel will align what is offered in marketing with the governing contracts and the documentation supporting the sale at this project.",
            },
            {
                title: "2. Commercial terms, and any reservation or hold",
                body: "Don Diego may set initial terms and, if applicable, a reservation. Any payment for a hold should be governed in writing: refunds, time limits, and the path to a promesa or definitive private contract. You should not transfer funds before your attorney has reviewed the terms in the context of this development.",
            },
            {
                title: "3. Letters of intent or comparable pre-contract instruments",
                body: "Before full execution, you may see letters of intent or similar drafts. They can frame price, currency, and schedule, and sometimes conditions or exclusivity. Your counsel must confirm whether they create binding obligations, conditions precedent, or firm deadlines, so the language stays consistent with what you later sign with the Don Diego team.",
            },
            {
                title: "4. Promesa de compraventa or private purchase agreement",
                body: "This is where price, payment schedule, delivery obligations, penalties, and termination rights are set out. For construction or presale, construction milestones and “delivery standard” need to be explicit. The signed agreement, not side conversations, governs the commercial relationship for your home at Don Diego.",
            },
            {
                title: "5. Due diligence on your unit, title, and the project context",
                body: "Your team will review title, encumbrances, tax certificates, and the master-development and HOA-style rules that apply to your unit, using information from the developer and independent searches as appropriate. If you are buying while work is in progress, permits, security instruments, and delivery criteria for your home in the development are part of that file.",
            },
            {
                title: "6. Deed (escritura) and notarial closing",
                body: "Transfer or the agreed structure is usually formalized in a public deed. The notary will carry out the fiscal and formal steps and collect applicable taxes and fees. Ask for a line-by-line statement well before signing and align it with what Don Diego and your private counsel told you to expect.",
            },
            {
                title: "7. Registration, certificates, and how your right is expressed",
                body: "After the deed, the record that protects your interest should be put in place in the public registry, and you should receive the evidence you need. If a fideicomiso, company, or other vehicle is used, your adviser explains how you evidence and exercise your rights in practice for the home you are acquiring in the project.",
            },
            {
                title: "8. Handover, services, life at the development, and insurance",
                body: "After closing, you will complete service transfers as far as the law and vendors allow, register with the administration and rules that govern Don Diego as a large planned community, and take receipt of the home. Insurance should follow how you will actually use the property in San Miguel: primary home, second home, or—where permitted—rental.",
            },
            {
                title: "9. Ongoing Mexico obligations and, if relevant, your home country",
                body: "Ongoing items may include property tax (predial) and, if a vehicle was used, corporate upkeep. A purchase in Guanajuato does not replace any reporting or tax duties you have elsewhere. Use the regional notes that follow to brief your non-Mexico advisers, based on the purchase you are completing at Don Diego.",
            },
        ],
    },
    homeCountryConsiderations: {
        title: "A quick peek “back home” (US, Canada, Europe & Latin America)",
        intro: "If you still pay taxes or hold bank accounts somewhere else, these topics come up a lot. They’re not a complete list—just a starting point to discuss with a qualified adviser where you file.",
        unitedStates: {
            title: "United States",
            intro: "Many U.S. filers want to know how Mexico fits with reporting and tax rules at home. The details are personal and the rules change—your CPA is the one to trust.",
            bullets: [
                "Owning a home in Mexico can interact with U.S. reporting in ways that don’t show up the same as a U.S. house; forms like 8938 or other disclosures are sometimes in play. Don’t equate a deed with a bank account for reporting—get advice that matches your actual facts.",
                "If you open or control foreign bank or brokerage accounts, you may have FinCEN (FBAR) and other filings to think about separately from the property.",
                "Estate plans that work in the U.S. don’t always move neatly across a border. Ask whether wills, trusts, and beneficiaries need a coordinated update.",
                "If you rent the home out, both Mexican and U.S. tax ideas may apply to income, deductions, and (where relevant) treaty positions.",
            ],
        },
        canada: {
            title: "Canada",
            intro: "Canadian tax residents often want to know how a foreign home affects reporting and tax, especially T1135 and the principal-residence story.",
            bullets: [
                "CRA Form T1135 can matter for some people with “specified foreign property” over certain thresholds. Whether you file and what you disclose depends on your exact situation—confirm with a Canadian tax preparer.",
                "The “principal residence” break you know from Canada often doesn’t map the same way to a home outside the country. Selling or renting can raise Canadian questions you’ll want to plan for.",
                "Work with your bank and your Mexican closing team on wire timing, currency, and the paper trail for source of funds so nothing surprises you at the last minute.",
            ],
        },
        europe: {
            title: "Europe",
            intro: "There isn’t one EU-wide “how to buy in Mexico” manual. What matters is your country of tax residence, citizenship, and how your bank treats large transfers.",
            bullets: [
                "Banks may ask for source-of-wealth and AML documentation when you move serious money. A clear, honest paper trail is your friend.",
                "Residency and reporting rules differ by country and can affect foreign assets, wealth or income taxes, and how rent or a future sale is treated.",
                "If you use a company, trust, or partnership, add cross-border corporate and reporting angles in both Mexico and at home.",
            ],
        },
        latinAmerica: {
            title: "Latin America",
            intro: "If you live or bank in the region, you may already be used to strict AML questions and currency swings. Mexico’s process will still have its own rhythm—line up your documents early.",
            bullets: [
                "Treat international wires and currency conversion as a planned step: your bank, timing, and supporting docs should line up with what the developer and notary expect.",
                "If you’re tax-resident in another LatAm country, ask your accountant how a Mexican property affects reporting or tax there—treaty networks and local rules differ widely.",
                "If you use a local entity to invest, your lawyer should map corporate resolutions, signatory authority, and any cross-border repatriation of funds in advance.",
                "Source-of-funds rules apply broadly; have employment, business, or sale documentation ready in a form institutions accept.",
            ],
        },
    },
    checklist: {
        title: "Nice to gather early (you’ll thank yourself later)",
        items: [
            "Passport and, if you have it, a second ID.",
            "Proof of address where you live now (utility bill or bank statement—whatever your team asks for).",
            "If you’re married or in a registered partnership: documents about your property regime; your counsel can explain what Mexico may need for consent or signatures.",
            "If a company is buying: corporate charter, good standing, resolutions, and proof of who signs.",
            "A straightforward file on where the money comes from (salary, sale of another asset, gift with a letter, investments—what’s true in your case).",
            "Contact info for the Mexican notary and your own lawyer, plus a tax contact in your home country if you need one.",
        ],
    },
};

const localMexicoEn: LocalMexicoPurchaseGuide = {
    disclaimerBody: [
        "This text is for buyers who reside in Mexico and are evaluating a home at Don Diego, San Miguel de Allende. It is not a substitute for legal or tax advice, or for the judgment of your notary.",
        "Each deal is individual: product type, payment structure, any financing, and your personal documentation. Before you sign or fund, validate with your notary and with private counsel the instruments that bind you to the Don Diego project.",
    ],
    localIntro: {
        title: "Your Don Diego purchase as a Mexico-based buyer",
        paragraphs: [
            "Don Diego is a master-planned residential community with its own commercial materials, rules of use, and shared amenities. Those materials should be read together with the formal contracts, construction and delivery schedule where applicable, and the eventual escritura, with support from an attorney in addition to the notary.",
            "Your attorney will review the developer-facing documents—reservation, promesa or private contract, and handover—while the notary’s office carries out the formal, fiscal, and—where applicable—registration steps. The two work in parallel, not in isolation.",
            "If you use a mortgage, co-lending, or a structure the developer coordinates, align approved dates and covenants with the closing calendar for the specific home you are buying in Don Diego.",
        ],
    },
    steps: {
        title: "Key stages in the Don Diego purchase process (buyers in Mexico)",
        items: [
            {
                title: "1. Product, price, and the agreement with the developer",
                body: "With Don Diego you will define the unit or lot, payment structure, handover or construction milestones, and the amenity package attached to your typology, as reflected in the project’s documentation. The signatory for the development must show authority to bind the seller; your counsel cross-checks that against the file issued by the Don Diego sales and legal teams for this project in San Miguel.",
            },
            {
                title: "2. Deposit or hold on terms you accept with Don Diego",
                body: "If a hold applies, the written conditions should set amount, hold period, refund rules, and the transition to a promesa or final contract. No payment should be made on commercial terms you have not accepted in writing with advice, in the specific context of acquiring this home from the development.",
            },
            {
                title: "3. Promesa or private contract: performance, time limits, and remedies",
                body: "This is the governing private-law instrument: price, payment, delivery or construction, and the consequences of breach. It must be consistent with what the Don Diego team has committed in your commercial relationship and with what the public deed is expected to reflect later.",
            },
            {
                title: "4. Family property regime and documents for the notary",
                body: "Depending on marital or partnership status, the notary will need civil registry extracts, property-regime information, and other certificates. Producing them early avoids stalling the closing of your unit at the development in Guanajuato.",
            },
            {
                title: "5. Diligence on the home within the Don Diego project",
                body: "Title, encumbrances, tax certificates, condominium or use-regime rules, and conformity to what was approved for the community are verified with the notary’s office and, as needed, with materials supplied by the development. Your private counsel will coordinate what must be in place for your home in this master plan before or at closing.",
            },
            {
                title: "6. Deed, taxes, and fees in the notarial act",
                body: "The public deed is where the transfer or the agreed structure is performed. The notary will set out the taxes, fees, and—where required—withholdings for your specific transaction. Request a full estimate in advance and reconcile it with what you agreed with Don Diego and with your attorney.",
            },
            {
                title: "7. Registry, evidence, and any condominium or use rules",
                body: "After the deed, your interest should be supported by the right registrations or certificates, and you should understand any condo-style voting, fees, and restrictions. Your adviser should connect those rules to the master plan and governance model for life at Don Diego.",
            },
            {
                title: "8. Physical handover, services, property tax, and insurance",
                body: "After closing, you will place utilities in your name as permitted, meet contribution or administration requirements tied to the development, satisfy property tax, and take out property insurance that matches your actual use: primary residence, second home, or—if allowed—rental within the project’s terms.",
            },
        ],
    },
    checklist: {
        title: "Documentos que suelen pedir (según su caso)",
        items: [
            "Identificación oficial vigente (INE o pasaporte) y, si aplica, CURP y RFC actualizados.",
            "Comprobante de domicilio reciente.",
            "Acta de matrimonio o convenio, o documentos de soltería / régimen patrimonial—lo que pida su notario o abogado según su situación.",
            "Si compra con crédito: letra y condiciones, y aprobación del banco o esquema del desarrollador.",
            "Si es persona moral: acta, poderes, constancias fiscales y constancia de inscripción al RFC.",
            "Comprobación de origen de recursos (nóminas, declaraciones, contratos, estados de cuenta—lo que refleje su operación).",
        ],
    },
};

const internationalEs: InternationalPurchaseGuide = {
    disclaimerBody: [
        "Esta página es un panorama amable para quienes exploran una vivienda en Don Diego, San Miguel de Allende. No es asesoría legal, fiscal, migratoria ni de inversión, y no crea relación de abogado o notario con nosotros.",
        "Cada caso es distinto (cómo compra, su nacionalidad, si usa una sociedad, y el lote o unidad concreto). Antes de firmar o transferir, confirme lo importante con un notario y abogados de su elección, y con asesores en su país de origen si compra desde el extranjero.",
    ],
    mexicoForeignBuyer: {
        title: "Cómo se estructura su compra en Don Diego (San Miguel de Allende)",
        paragraphs: [
            "En Don Diego, al igual que en la mayoría de operaciones inmobiliarias serias en México, el cierre suele concentrarse en torno a la escrituración ante notario público: esta figura interviene en la formalización del instrumento, en el cálculo y recaudo de impuestos y derechos vinculados al cierre y, cuando corresponde, en el registro. Para revisar riesgos contractuales y cláusulas a su favor en el acuerdo con el desarrollador, conviene contar con abogado independiente además de la labor notarial.",
            "Don Diego se ubica en San Miguel de Allende, Guanajuato, en una zona en la que, por lo general, no opera la lógica de la fideicomiso en franja restringida costera o fronteriza. En la práctica, la titularidad directa o un esquema societario puede ser viable según su unidad o lote; la situación concreta se confirma con su notario y asesoría, tomando en cuenta el predio y el título, no la generalidad de “comprar en México”.",
            "El desarrollo, en línea con la normativa y buenas prácticas de prevención de lavado de dinero, requerirá identificación, comprobación de domicilio y acreditación del origen lícito de los fondos. Se trata de requisitos habituales en un proyecto de esta escala, no de trámites aislados del contexto de Don Diego.",
        ],
    },
    steps: {
        title: "Etapas del proceso de compra en Don Diego",
        items: [
            {
                title: "1. Definición del inmueble y documentación con el desarrollador",
                body: "Su operación en Don Diego se vincula a un producto concreto dentro del plan maestro del Club Residencial: tipología, estado de entrega, ubicación en el conjunto y condiciones de uso de amenidades y áreas comunes, todo ello fijado en la documentación comercial y contractual. La contratación se realizará con el desarrollador o, en su caso, con quien acredite la legitimación; su asesor verificará la relación entre lo ofrecido y las facultades y documentos que respaldan la enajenación en el marco de este proyecto.",
            },
            {
                title: "2. Condiciones comerciales iniciales y, en su caso, apartado o reserva",
                body: "El equipo de Don Diego puede proponerle condiciones iniciales y, si aplica, un apartado o reserva. Cualquier pago vinculado a un apartado deberá quedar claramente regido en un escrito: plazos, reembolsos, y siguientes hitos hasta la firma de promesa o contrato definitivo. Conviene que ese texto sea revisado por su abogado antes de transferir fondos.",
            },
            {
                title: "3. Propuestas previas: carta de intención u ofertas de negocio",
                body: "Antes de la formalización definitiva pueden utilizarse documentos de intención o de oferta. Estos instrumentos fijan referencias de precio, moneda, calendario y, en ocasiones, supuestos de exclusividad, pero su alcance legal varía. Su asesor deberá confirmar si le generan obligaciones, condiciones suspensivas o plazos vinculantes, para que no haya desajuste con lo acordado más adelante con Don Diego como desarrollador.",
            },
            {
                title: "4. Promesa de compraventa o contrato privado",
                body: "En esta etapa se concretan precio, calendario de pagos, obligaciones de entrega, penalidades, causas de rescisión y, para obra o preventa, coherencia con plazos de construcción y entrega fina. El acuerdo debe plasmar de manera íntegra lo negociado con el desarrollador; las alegaciones verbales que no consten en el escrito no sustituyen el contrato firmado en relación con su unidad en Don Diego.",
            },
            {
                title: "5. Debida diligencia sobre su unidad, el título y el entorno de proyecto",
                body: "La revisión de dominio, gravámenes, certificados fiscales y reglas del régimen bajo el cual se integra su inmueble dentro del conjunto, debe realizarse con el acompañamiento de notario o abogado, en coordinación con la información que el desarrollador entrega en Don Diego. Si la entrega es en obra, se incorporan criterios de permisos, avance de construcción, garantías ofrecidas y calidad de entrega acordada para su producto en el desarrollo.",
            },
            {
                title: "6. Firma de la escritura pública y cierre de operación ante notario",
                body: "La tradición de dominio o la constitución de la figura acordada se formalizan de ordinario en escritura pública, donde el notario concentra las obligaciones fiscales y de registro vinculadas a la operación. Debe solicitar con anticipación un desglose de importes, impuestos y honorarios, y cotejarlo con lo estipulado con Don Diego y con lo comentado con su asesoría privada.",
            },
            {
                title: "7. Inscripción en el Registro Público y entrega de constancias",
                body: "Tras la celebración de la escritura, procederá la inscripción o anotación que corresponda, según su caso, en el registro de la entidad, y usted deberá recibir las constancias o instrumentos con los que queda de manifiesto su derecho respecto al inmueble adquirido en el proyecto. Si se utilizara fideicomiso, sociedad u otra estructura, su asesor explicará cómo queda acreditada la titularidad o el beneficio a favor de usted en el día a día.",
            },
            {
                title: "8. Recepción de la vivienda, servicios, régimen de uso en Don Diego y seguros",
                body: "Una vez materializada la entrega, deberá completarse el traslado a su nombre, en lo que el ordenamiento permita, de servicios como energía o agua, además del alta en el esquema de administración o régimen de uso de áreas y amenidades de Don Diego. Un seguro acorde a la residencia en San Miguel, ya sea vivienda habitual, segunda residencia o eventual renta, deberá alinearse con su uso real del inmueble.",
            },
            {
                title: "9. Obligaciones posteriores al cierre en México y, en su caso, en su país de origen",
                body: "Después de la operación, podrán subsistir obligaciones locales como el predial y la conservación, en su caso, de estructuras societarias. Si mantiene residencia fiscal o patrimonial fuera de México, podrán existir deberes de información o impuestos que no se sustituyen por el acto de compra en Guanajuato. Las notas regionales al final de esta guía ofrecen temas a tratar con su contador o abogado en el extranjero, en función de su perfil y de la compra concretada en Don Diego.",
            },
        ],
    },
    homeCountryConsiderations: {
        title: "Un vistazo a su región: EE. UU., Canadá, Europa y América Latina",
        intro: "Si mantiene cuentas o obligaciones fiscales fuera de México, suelen salir estas conversaciones. No es una lista completa: son puntos de partida con un asesor autorizado en su jurisdicción.",
        unitedStates: {
            title: "Estados Unidos",
            intro: "A muchas personas con vínculo fiscal en EE. UU. les preocupa cómo un inmueble en México se cruza con reporteos y reglas fiscales allá. Los detalles son personales y cambian: su CPA o preparador lo orienta.",
            bullets: [
                "La titularidad en México puede tocar reglas de reporteo de formas distintas a un inmueble doméstico; formularios como el 8938 u otros a veces entran. No asimile escritura a cuenta bancaria: pida asesoría a su medida.",
                "Cuentas financieras en el extranjero pueden exigir FBAR (FinCEN) y otras obligaciones, aparte de la compra inmobiliaria.",
                "Un testamento o plan patrimonial hecho solo para EE. UU. puede no alinearse con un activo en México; valore coordinar testamentos, fideicomisos y beneficiarios.",
                "Si renta, pueden convivir criterios fiscales en México y EE. UU. sobre renta, deducción y, si aplica, tratado.",
            ],
        },
        canada: {
            title: "Canadá",
            intro: "Residentes fiscales canadienses suelen plantearse reporteo (p. ej. T1135) y el tratamiento de vivienda en el extranjero frente a la vivienda principal canadiense.",
            bullets: [
                "El T1135 aplica a ciertas situaciones con propiedad extranjera sobre umbrales; no es automático en todos—confirme con su preparador canadiense.",
                "Vender o rentar un hogar fuera de Canadá no siempre se trata como la vivienda principal; planee consecuencias fiscales allá.",
                "Coordine con su banco y el equipo de cierre en México: divisas, tiempos de traslado y documentación de origen de recursos.",
            ],
        },
        europe: {
            title: "Europa",
            intro: "No hay un manual único de la UE para “comprar en México.” Lo que prima es su residencia fiscal, su nacionalidad y qué pide su banco al mover capitales.",
            bullets: [
                "Espere preguntas AML y de patrimonio; tenga pista documental clara y coherente.",
                "Cada país tiene reglas de residencia y de activos en el extranjero; afecta impuestos patrimoniales, renta o plusvalía según su caso.",
                "Si el activo pasa por sociedad, fideicomiso o similar, sume análisis societario y de reporte en ambos lados del Atlántico.",
            ],
        },
        latinAmerica: {
            title: "América Latina",
            intro: "Si vive o banca en la región, tal vez conoce preguntas estrictas de cumplimiento y el tipo de cambio. El flujo en México tendrá su propio calendario: adelante documentos.",
            bullets: [
                "Trate traslados y tipo de cambio como paso planeado: banco, tiempos y soportes alineados con lo que pida el desarrollador o el notario.",
                "Si es residente fiscal de otro país de LatAm, pregunte a su contador cómo afecta un inmueble en México al reporte o impuestos locales; la red de tratados y leyes nacionales varía.",
                "Si invierte vía sociedad, alinee poderes, acuerdos de órgano y regreso de recursos, si aplica, con asesoría transfronteriza.",
                "El origen lícito de recursos aplica con fuerza: tenga a la mano nóminas, negocios, contratos o venta de activos, según corresponda.",
            ],
        },
    },
    checklist: {
        title: "Qué conviene juntar desde temprano",
        items: [
            "Pasaporte vigente y, si aplica, segunda identificación.",
            "Comprobante de domicilio en su país (recibo o estado de cuenta, según lo acepte la operación).",
            "Si está casado o en unión reconocida: documentos de régimen patrimonial; su abogado indicará requisitos de consentimiento en México si aplican.",
            "Si compra con persona moral: acta, situación de la sociedad, resoluciones y constancia de quien firma.",
            "Expediente claro de origen de recursos: nómina, venta de un bien, donación con respaldo, inversiones, etc.",
            "Datos de notario y abogado en México; dato de su asesor fiscal o legal en su país de origen si aplica.",
        ],
    },
};

const localMexicoEs: LocalMexicoPurchaseGuide = {
    disclaimerBody: [
        "Este resumen se dirige a compradores con residencia en México que evalúan una adquisición en Don Diego, San Miguel de Allende. No sustituye asesoría legal o fiscal, ni el criterio de su notario.",
        "Cada operación en el desarrollo se individualiza: tipología, forma de pago, eventual crédito y documentación personal. Antes de firmar o aportar recursos, valide con su notario y con su asesor privado el alcance de los instrumentos vinculados a Don Diego.",
    ],
    localIntro: {
        title: "Su compra en Don Diego, como comprador en México",
        paragraphs: [
            "Don Diego es un desarrollo inmobiliario con plan maestro integrado, amenidades y reglas de convivencia propias. La información comercial del Club Residencial debe acompañarse de revisión de contratos, calendario de producto y, en su caso, de obra, con el apoyo de abogado y notario, para asegurar coherencia entre lo ofrecido y lo escriturado.",
            "En la relación con el desarrollador, su abogado revisará términos de apartado, de promesa o contrato privado, y de entrega, en estrecho vínculo con la formalización notarial, que concentra impuestos y requisitos de cierre. Ambas líneas de trabajo se complementan.",
            "En caso de crédito hipotecario, cofinanciamiento o esquemas ofrecidos en coordinación con el desarrollo, deberá alinear fechas y condiciones aprobadas con el calendario de compra fijado para su unidad en Don Diego.",
        ],
    },
    steps: {
        title: "Etapas del proceso de compra en Don Diego (compradores en México)",
        items: [
            {
                title: "1. Producto, precio y contratación con el desarrollador",
                body: "Usted concretará con Don Diego la unidad o lote, su esquema de pago, condiciones de entrega y, en su caso, acceso a dotaciones o amenidades según su tipología, todo ello vinculado a la documentación que emite el desarrollador para este proyecto. La persona o entidad que comparezca a firmar deberá acreditar representación o legitimación, que su asesor cotejará con los documentos aportados por el área comercial y legal de Don Diego.",
            },
            {
                title: "2. Apartado o reservas, en los términos pactados con Don Diego",
                body: "Si aplica reserva o apartado, el contrato o anexo deberá describir monto, vigencia, reembolsos y tránsito hacia la promesa o contrato definitivo. Ninguna transferencia debería realizarse sin un instrumento o condiciones previamente aceptado por usted bajo asesoría, en la medida de la relación con el desarrollador de este inmueble en San Miguel.",
            },
            {
                title: "3. Promesa o contrato privado: obligaciones, plazos y sanciones",
                body: "En esta etapa se fijan las obligaciones recíprocas, calendario de entrega o de obra, y las consecuencias de incumplimiento. Es el instrumento rector de la operación inmobiliaria con el desarrollador; cualquier ajuste posterior deberá reflejarse en modificaciones o convenios que su asesor haga coincidir con el proyecto Don Diego y con la futura escritura.",
            },
            {
                title: "4. Estado civil, régimen patrimonial y documentación para el notario",
                body: "El notario, en atención a su situación patrimonial y familiar, requerirá constancias de identidad, actas o convenios, de conformidad con el régimen aplicable. Anticipar acta de matrimonio, constancia de soltería o acuerdos patrimoniales, entre otros, evita retrasar la firma de su compra en el desarrollador y el desahogo del protocolo notarial en Guanajuato.",
            },
            {
                title: "5. Diligencia sobre su inmueble en el entorno de Don Diego",
                body: "La verificación de dominio, gravámenes, certificados fiscales, obligaciones de condominio o de régimen de uso, y adecuación de su unidad a lo aprobado para el fraccionamiento, forma parte de la certeza que debe obtenerse antes o para el cierre, según haya fijado su asesor con el notario, siempre con la colaboración documental estructurada en el desarrollo de Don Diego.",
            },
            {
                title: "6. Cierre, escritura pública e impuestos y derechos asociados",
                body: "En la celebración de la escritura pública, el notario desglosará impuestos, derechos, honorarios y, en su caso, cálculos retenidos, conforme a la operación inmobiliaria vinculada a su inmueble en el proyecto. Debe exigir el estado de cuenta o borrador con suficiente antelación y conciliarlo con lo pactado con Don Diego y con su abogado.",
            },
            {
                title: "7. Inscripción, constancias y, en su caso, constitución de copropiedad o régimen de uso",
                body: "Tras la ejecución de la escritura, el registro o las constancias deberán amparar adecuadamente su posición en el inmueble. Si aplica un régimen de unidades o aprovechamientos, su asesor deberá explicarle la operación de cuotas, votaciones o restricciones de uso, en sintonía con el desarrollo y el plan maestro de Don Diego.",
            },
            {
                title: "8. Entrega material, servicios, predial y seguro en el entorno de Don Diego",
                body: "Una vez concluido el cierre, deberá completar trámites de titulares de servicio, aportaciones a administración o aprovechamientos, y dar cumplimiento al predial, y contratar un seguro acorde a su uso del inmueble en Don Diego: vivienda habitual, segunda residencia o, si aplica, arrendamiento.",
            },
        ],
    },
    checklist: {
        title: "Documentos frecuentes (según su operación)",
        items: [
            "Identificación vigente (INE o pasaporte) y, si aplica, CURP y RFC.",
            "Comprobante de domicilio reciente.",
            "Acta de matrimonio, convenio o constancias de soltería / régimen—lo que indique su notario.",
            "Si compra a crédito: carta de aprobación, condiciones y, si aplica, coordinación banco–desarrollador.",
            "Si es persona moral: acta, poderes, CSF y e.firma o documentación que pida su notario para representación.",
            "Origen de recursos: nóminas, declaraciones, contratos, estados de cuenta—lo que refleje su operación lícita.",
        ],
    },
};

const purchaseGuideByLocale: Record<"en" | "es", PurchaseGuideBundle> = {
    en: {
        international: internationalEn,
        localMexico: localMexicoEn,
    },
    es: {
        international: internationalEs,
        localMexico: localMexicoEs,
    },
};

export function getPurchaseGuideBundle(locale: string): PurchaseGuideBundle {
    return locale === "en" ? purchaseGuideByLocale.en : purchaseGuideByLocale.es;
}

/** @deprecated use getPurchaseGuideBundle; kept for any stray imports */
export function getPurchaseGuideContent(locale: string): PurchaseGuideBundle {
    return getPurchaseGuideBundle(locale);
}

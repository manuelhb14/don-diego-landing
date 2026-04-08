function formatLegalDate(locale: string) {
    const tag = locale === "en" ? "en-US" : "es-MX";
    return new Date().toLocaleDateString(tag, { year: "numeric", month: "long", day: "numeric" });
}

type Props = {
    locale: string;
    lastUpdatedLabel: string;
};

export default function PrivacyPolicyArticle({ locale, lastUpdatedLabel }: Props) {

    if (locale === "en") {
        return (
            <div className="font-sans font-light text-sm md:text-base leading-relaxed space-y-8 opacity-90">
                <section>
                    <p className="mb-4">
                        {lastUpdatedLabel} {formatLegalDate(locale)}
                    </p>
                    <p>
                        Don Diego is committed to protecting your privacy. This Privacy Policy describes how we collect, use, store, and protect your personal information when you use our website and services. We encourage you to read this policy carefully to understand our data practices.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">1. Data Controller</h2>
                    <p>
                        The controller of your personal data is Don Diego (or the legal entity operating the relevant project). For any questions regarding the protection of your data, you may contact us through the channels indicated in the Contact section of this website.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">2. Data We Collect</h2>
                    <p className="mb-4">We may collect the following types of information:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Identification data:</strong> first name, last name, email address, phone number.</li>
                        <li><strong>Browsing data:</strong> IP address, browser type, pages visited, time spent on the site.</li>
                        <li><strong>Voluntarily provided data:</strong> information you provide when completing forms, requesting project information, subscribing to newsletters, or communicating with us.</li>
                    </ul>
                    <p>
                        We do not collect sensitive data (ethnic origin, political opinions, religious beliefs, health, sexual orientation, etc.) unless strictly necessary and with your explicit consent.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">3. Purposes of Processing</h2>
                    <p>
                        We use your personal data to: respond to inquiries about our real estate projects; send commercial information about developments, promotions, and news (where you have consented); manage newsletter subscriptions; improve our services and user experience on the website; comply with legal obligations; and, where applicable, manage purchase or reservation processes.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">4. Legal Basis</h2>
                    <p>
                        Processing is based on: your consent (when you provide data through forms or subscriptions); pre-contractual or contractual measures (when you request information or services); our legitimate interests (site improvement, security, commercial communication); and compliance with applicable legal obligations.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">5. Cookies and Similar Technologies</h2>
                    <p>
                        We use cookies and similar technologies to improve site functionality, analyze traffic, and personalize content. Cookies may be technical (necessary for the site to operate), preference-related (to remember your choices), or analytical (to understand how the site is used). You may configure your browser to reject cookies, though some features may be affected.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">6. Sharing of Data</h2>
                    <p>
                        We do not sell or rent your personal data. We may share information with service providers who help us operate the site (hosting, web analytics, email delivery) under confidentiality agreements. We may also disclose data when required by law or to protect our legal rights.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">7. Your Rights</h2>
                    <p className="mb-4">
                        In accordance with applicable data protection laws (including Mexico’s Federal Law on Protection of Personal Data Held by Private Parties and the GDPR where applicable), you have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Access:</strong> know what data we hold about you.</li>
                        <li><strong>Rectification:</strong> request correction of inaccurate or incomplete data.</li>
                        <li><strong>Erasure:</strong> request deletion when data is no longer needed.</li>
                        <li><strong>Objection:</strong> object to processing in certain cases.</li>
                        <li><strong>Restriction:</strong> request limitation of processing in certain circumstances.</li>
                        <li><strong>Portability:</strong> receive your data in a structured format where applicable.</li>
                    </ul>
                    <p>
                        To exercise these rights, contact us through the channels indicated in the Contact section. You may also lodge a complaint with the competent data protection authority.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">8. Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is completely secure.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">9. Data Retention</h2>
                    <p>
                        We retain your personal data for as long as necessary to fulfill the purposes described in this policy and to meet applicable legal obligations. After those periods, data will be securely deleted or anonymized.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">10. Minors</h2>
                    <p>
                        Our services are not directed at individuals under 18. We do not knowingly collect personal information from minors. If you become aware that a minor has provided us with personal data, please contact us so we can delete it.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">11. Changes to This Policy</h2>
                    <p>
                        We may modify this Privacy Policy at any time. Changes take effect upon publication on this website. We recommend reviewing this page periodically. The last updated date is shown at the beginning of the document.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">12. Contact</h2>
                    <p>
                        If you have questions about this Privacy Policy or wish to exercise your data protection rights, contact us through the official channels listed in the Contact section of this website.
                    </p>
                </section>
            </div>
        );
    }

    return (
        <div className="font-sans font-light text-sm md:text-base leading-relaxed space-y-8 opacity-90">
            <section>
                <p className="mb-4">
                    {lastUpdatedLabel} {formatLegalDate(locale)}
                </p>
                <p>
                    Don Diego se compromete a proteger su privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos su información personal cuando utiliza nuestro sitio web y nuestros servicios. Le recomendamos leer atentamente esta política para comprender nuestras prácticas en materia de datos.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">1. Responsable del Tratamiento</h2>
                <p>
                    El responsable del tratamiento de sus datos personales es Don Diego (o la entidad legal que opere el proyecto correspondiente). Para cualquier consulta relacionada con la protección de sus datos, puede contactarnos a través de los canales indicados en la sección de Contacto de este sitio web.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">2. Datos que Recopilamos</h2>
                <p className="mb-4">
                    Podemos recopilar los siguientes tipos de información:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Datos de identificación:</strong> nombre, apellidos, correo electrónico, número de teléfono.</li>
                    <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia en el sitio.</li>
                    <li><strong>Datos proporcionados voluntariamente:</strong> información que nos facilita al completar formularios, solicitar información de proyectos, suscribirse a newsletters o comunicarse con nosotros.</li>
                </ul>
                <p>
                    No recopilamos datos sensibles (origen étnico, opiniones políticas, creencias religiosas, salud, orientación sexual, etc.) salvo que sea estrictamente necesario y con su consentimiento explícito.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">3. Finalidad del Tratamiento</h2>
                <p>
                    Utilizamos sus datos personales para: responder a sus consultas sobre nuestros proyectos inmobiliarios; enviarle información comercial sobre desarrollos, promociones y novedades (si ha dado su consentimiento); gestionar su suscripción a newsletters; mejorar nuestros servicios y la experiencia de usuario en el sitio web; cumplir con obligaciones legales; y, en su caso, gestionar procesos de compra o reserva.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">4. Base Legal</h2>
                <p>
                    El tratamiento de sus datos se basa en: su consentimiento (cuando nos proporciona datos a través de formularios o suscripciones); la ejecución de medidas precontractuales o contractuales (cuando solicita información o servicios); nuestro interés legítimo (mejora del sitio, seguridad, comunicación comercial); y el cumplimiento de obligaciones legales aplicables.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">5. Cookies y Tecnologías Similares</h2>
                <p>
                    Utilizamos cookies y tecnologías similares para mejorar la funcionalidad del sitio, analizar el tráfico y personalizar el contenido. Las cookies pueden ser técnicas (necesarias para el funcionamiento del sitio), de preferencias (para recordar sus opciones) o analíticas (para entender cómo se usa el sitio). Puede configurar su navegador para rechazar cookies, aunque esto podría afectar algunas funcionalidades.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">6. Compartición de Datos</h2>
                <p>
                    No vendemos ni alquilamos sus datos personales. Podemos compartir información con proveedores de servicios que nos ayudan a operar el sitio (hosting, análisis web, envío de correos) bajo acuerdos de confidencialidad. También podemos divulgar datos cuando la ley lo exija o para proteger nuestros derechos legales.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">7. Sus Derechos</h2>
                <p className="mb-4">
                    De conformidad con la legislación aplicable en materia de protección de datos (incluyendo la Ley Federal de Protección de Datos Personales en posesión de los particulares en México y el RGPD cuando aplique), usted tiene derecho a:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Acceso:</strong> conocer qué datos tenemos sobre usted.</li>
                    <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
                    <li><strong>Cancelación:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
                    <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos en ciertos supuestos.</li>
                    <li><strong>Limitación:</strong> solicitar que se limite el tratamiento en determinadas circunstancias.</li>
                    <li><strong>Portabilidad:</strong> recibir sus datos en formato estructurado cuando aplique.</li>
                </ul>
                <p>
                    Para ejercer estos derechos, puede contactarnos a través de los canales indicados en la sección de Contacto. También tiene derecho a presentar una reclamación ante la autoridad de protección de datos competente.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">8. Seguridad</h2>
                <p>
                    Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra el acceso no autorizado, la alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es completamente seguro.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">9. Conservación de Datos</h2>
                <p>
                    Conservamos sus datos personales durante el tiempo necesario para cumplir con las finalidades descritas en esta política y con las obligaciones legales aplicables. Una vez cumplidos estos plazos, los datos serán eliminados o anonimizados de forma segura.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">10. Menores</h2>
                <p>
                    Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente información personal de menores. Si tiene conocimiento de que un menor nos ha proporcionado datos personales, le rogamos que nos contacte para proceder a su eliminación.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">11. Cambios a esta Política</h2>
                <p>
                    Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Los cambios entrarán en vigor desde su publicación en este sitio web. Le recomendamos revisar periódicamente esta página para estar informado de cualquier actualización. La fecha de última actualización se indica al inicio del documento.
                </p>
            </section>

            <section>
                <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">12. Contacto</h2>
                <p>
                    Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos en materia de protección de datos, puede contactarnos a través de los canales oficiales indicados en la sección de Contacto de este sitio web.
                </p>
            </section>
        </div>
    );
}

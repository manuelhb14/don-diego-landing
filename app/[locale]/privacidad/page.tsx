import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function PrivacidadPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} theme="dark" />

            <main className="bg-[#FFF3E1] min-h-screen pt-32 pb-24 px-6 lg:px-12 text-[#222222]">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-5xl md:text-6xl mb-12">Política de Privacidad</h1>

                    <div className="font-sans font-light text-sm md:text-base leading-relaxed space-y-8 opacity-90">
                        <section>
                            <p className="mb-4">
                                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                </div>
            </main>

            <Footer />
        </>
    );
}

import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function TerminosPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} theme="dark" />

            <main className="bg-[#FFF3E1] min-h-screen pt-32 pb-24 px-6 lg:px-12 text-[#222222]">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-5xl md:text-6xl mb-12">Términos de Servicio</h1>

                    <div className="font-sans font-light text-sm md:text-base leading-relaxed space-y-8 opacity-90">
                        <section>
                            <p className="mb-4">
                                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <p>
                                Bienvenido a Don Diego. Estos términos de servicio rigen el uso de nuestro sitio web y los servicios que ofrecemos. Al acceder o utilizar nuestro sitio web, usted acepta estar sujeto a estos términos en su totalidad. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">1. Uso del Sitio Web</h2>
                            <p className="mb-4">
                                El contenido de este sitio web es únicamente para su información general y uso personal. Está sujeto a cambios sin previo aviso. Nos reservamos el derecho de modificar, suspender o discontinuar el sitio web o cualquier servicio en cualquier momento.
                            </p>
                            <p>
                                Usted acepta usar este sitio web solo para fines legales y de una manera que no infrinja los derechos de, restrinja o inhiba el uso y disfrute de este sitio web por parte de terceros.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">2. Propiedad Intelectual</h2>
                            <p>
                                Este sitio web contiene material que es de nuestra propiedad o está bajo licencia nuestra. Este material incluye, pero no se limita a, el diseño, la disposición, el aspecto, la apariencia, los gráficos y el contenido escrito. Queda prohibida la reproducción, distribución o uso no autorizado de dicho material sin nuestro consentimiento expreso por escrito.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">3. Información de Proyectos e Inmuebles</h2>
                            <p>
                                Toda la información referente a proyectos inmobiliarios, amenidades, precios, disponibilidad y especificaciones mostrada en este sitio es de carácter informativo y está sujeta a cambios sin previo aviso. Las imágenes y renders presentados son representaciones artísticas conceptuales que pueden variar del producto final entregado.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">4. Política de Privacidad y Protección de Datos</h2>
                            <p>
                                El uso de este sitio web también está sujeto a nuestra Política de Privacidad. Al proporcionar su información de contacto a través de nuestros formularios (para newsletters, información de proyectos, etc.), usted consiente que Don Diego recopile y procese sus datos para comunicarnos con usted acerca de nuestros desarrollos.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">5. Limitación de Responsabilidad</h2>
                            <p>
                                Ni nosotros ni ningún tercero ofrecemos garantía alguna en cuanto a la exactitud, puntualidad, rendimiento, integridad o idoneidad de la información y los materiales encontrados u ofrecidos en este sitio web para cualquier propósito particular. Usted reconoce que dicha información y materiales pueden contener inexactitudes o errores, y expresamente excluimos la responsabilidad por cualquier inexactitud o error en la mayor medida permitida por la ley.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">6. Enlaces a Sitios de Terceros</h2>
                            <p>
                                Ocasionalmente, este sitio web puede incluir enlaces a otros sitios web. Estos enlaces se proporcionan para su conveniencia y para facilitar más información. No significa que respaldemos dicho(s) sitio(s) web, y no tenemos responsabilidad alguna sobre el contenido de los sitios web enlazados.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">7. Ley Aplicable y Jurisdicción</h2>
                            <p>
                                Su uso de este sitio web y cualquier disputa que surja de dicho uso están sujetos a las leyes vigentes de México, o de la jurisdicción especificada para nuestras operaciones, sin dar efecto a ningún principio de conflictos de leyes.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">8. Contacto</h2>
                            <p>
                                Si tiene alguna pregunta sobre estos Términos de Servicio, por favor contáctenos a través de nuestros canales oficiales en la sección de Contacto.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

function formatLegalDate(locale: string) {
    const tag = locale === "en" ? "en-US" : "es-MX";
    return new Date().toLocaleDateString(tag, { year: "numeric", month: "long", day: "numeric" });
}

export default function TermsOfServiceArticle({ locale }: { locale: string }) {
    const lastUpdated =
        locale === "en" ? "Last updated:" : "Última actualización:";

    if (locale === "en") {
        return (
            <div className="font-sans font-light text-sm md:text-base leading-relaxed space-y-8 opacity-90">
                <section>
                    <p className="mb-4">
                        {lastUpdated} {formatLegalDate(locale)}
                    </p>
                    <p>
                        Welcome to Don Diego. These terms of service govern your use of our website and the services we offer. By accessing or using our website, you agree to be bound by these terms in full. If you do not agree with any part of these terms, you must not use our website.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">1. Use of the Website</h2>
                    <p className="mb-4">
                        The content of this website is for your general information and personal use only. It is subject to change without notice. We reserve the right to modify, suspend, or discontinue the website or any service at any time.
                    </p>
                    <p>
                        You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict or inhibit their use and enjoyment of the site.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">2. Intellectual Property</h2>
                    <p>
                        This website contains material owned by or licensed to us, including but not limited to design, layout, appearance, graphics, and written content. Reproduction, distribution, or unauthorized use of such material without our express written consent is prohibited.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">3. Project and Property Information</h2>
                    <p>
                        All information regarding real estate projects, amenities, prices, availability, and specifications shown on this site is for informational purposes only and is subject to change without notice. Images and renders are conceptual artistic representations and may differ from the final delivered product.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">4. Privacy Policy and Data Protection</h2>
                    <p>
                        Use of this website is also subject to our Privacy Policy. By providing your contact information through our forms (for newsletters, project information, etc.), you consent to Don Diego collecting and processing your data to communicate with you about our developments.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">5. Limitation of Liability</h2>
                    <p>
                        Neither we nor any third party provides any warranty as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials on this website for any particular purpose. You acknowledge that such information may contain inaccuracies or errors, and we expressly exclude liability for any inaccuracy or error to the fullest extent permitted by law.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">6. Links to Third-Party Sites</h2>
                    <p>
                        This website may occasionally include links to other sites. These links are provided for convenience and further information. They do not signify that we endorse those sites, and we have no responsibility for the content of linked websites.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">7. Applicable Law and Jurisdiction</h2>
                    <p>
                        Your use of this website and any dispute arising from such use are subject to the laws of Mexico, or the jurisdiction specified for our operations, without regard to conflict-of-law principles.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl md:text-3xl mt-12 mb-6">8. Contact</h2>
                    <p>
                        If you have any questions about these Terms of Service, please contact us through the official channels listed in the Contact section.
                    </p>
                </section>
            </div>
        );
    }

    return (
        <div className="font-sans font-light text-sm md:text-base leading-relaxed space-y-8 opacity-90">
            <section>
                <p className="mb-4">
                    {lastUpdated} {formatLegalDate(locale)}
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
    );
}

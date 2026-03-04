"use client";

export default function FooterV5() {
    return (
        <footer className="bg-[#C8D7E6] text-[#222222] w-full relative overflow-hidden pt-16 lg:pt-24 transition-colors duration-300" id="contact">
            <div className="container mx-auto px-6 lg:px-12 mb-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Newsletter Section */}
                    <div className="lg:col-span-4 flex flex-col space-y-8">
                        <div>
                            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
                                ÚNETE al<br />
                                MUNDO<br />
                                de DON DIEGO
                            </h2>
                            <p className="font-sans text-sm font-light leading-relaxed max-w-xs opacity-80">
                                Suscríbete para unirte a nuestra comunidad y mantenerte al día con el desarrollo.
                            </p>
                        </div>
                        <form className="w-full max-w-md space-y-6 pt-4">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full relative">
                                    <input
                                        className="w-full bg-transparent border-0 border-b border-[#222222]/40 placeholder:text-[#222222]/60 text-xs font-sans tracking-wider py-3 px-0 focus:ring-0 focus:border-[#222222] transition-colors"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="NOMBRE *"
                                        required
                                        type="text"
                                    />
                                </div>
                                <div className="w-full relative">
                                    <input
                                        className="w-full bg-transparent border-0 border-b border-[#222222]/40 placeholder:text-[#222222]/60 text-xs font-sans tracking-wider py-3 px-0 focus:ring-0 focus:border-[#222222] transition-colors"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="APELLIDO *"
                                        required
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="w-full relative">
                                <input
                                    className="w-full bg-transparent border-0 border-b border-[#222222]/40 placeholder:text-[#222222]/60 text-xs font-sans tracking-wider py-3 px-0 focus:ring-0 focus:border-[#222222] transition-colors"
                                    id="email"
                                    name="email"
                                    placeholder="CORREO ELECTRÓNICO *"
                                    required
                                    type="email"
                                />
                            </div>
                            <div className="flex items-start gap-3 mt-4">
                                <div className="flex items-center h-5">
                                    <input
                                        className="focus:ring-[#222222] h-4 w-4 text-[#222222] border-[#222222] rounded-sm bg-transparent"
                                        id="consent"
                                        name="consent"
                                        type="checkbox"
                                    />
                                </div>
                                <div className="ml-1 text-xs font-sans font-light leading-tight opacity-80">
                                    <label className="font-medium text-[#222222]" htmlFor="consent">
                                        Consiento que mi información sea recopilada de acuerdo con la política de privacidad de Don Diego
                                    </label>
                                </div>
                            </div>
                            <button
                                className="inline-block border-b border-[#222222] pb-1 text-xs font-sans tracking-widest uppercase hover:opacity-70 transition-opacity mt-4"
                                type="submit"
                            >
                                Enviar Formulario
                            </button>
                        </form>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block lg:col-span-3"></div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-2">
                        <ul className="space-y-3 font-sans text-xs tracking-widest uppercase font-medium">
                            <li><a className="hover:underline underline-offset-4" href="#properties">Proyectos</a></li>
                            <li><a className="hover:underline underline-offset-4" href="#amenities">Amenidades</a></li>
                            <li><a className="hover:underline underline-offset-4" href="#location">Ubicación</a></li>
                            <li><a className="hover:underline underline-offset-4" href="#hero">Acerca de</a></li>
                            <li><a className="hover:underline underline-offset-4" href="#amenities">Bienestar</a></li>
                            <li><a className="hover:underline underline-offset-4" href="#hero">Estudio</a></li>
                            <li><a className="hover:underline underline-offset-4" href="#contact">Preguntas</a></li>
                            <li><a className="hover:underline underline-offset-4" href="#contact">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="lg:col-span-3 lg:text-right">
                        <ul className="space-y-3 font-sans text-xs tracking-widest uppercase font-medium">
                            <li><a className="hover:underline underline-offset-4" href="#">Instagram</a></li>
                            <li><a className="hover:underline underline-offset-4" href="#">Pinterest</a></li>
                            <li><a className="hover:underline underline-offset-4" href="#">Linkedin</a></li>
                            <li><a className="hover:underline underline-offset-4" href="#">Facebook</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Large DON DIEGO Text */}
            <div className="w-full overflow-hidden leading-none select-none pointer-events-none mt-12 md:mt-0">
                <h1 className="font-serif text-[18vw] text-center tracking-tighter text-[#222222] opacity-100 transform translate-y-[15%]">
                    DON DIEGO
                </h1>
            </div>

            {/* Bottom Links */}
            <div className="w-full px-4 lg:px-8 mt-2 mb-6 flex justify-end items-end text-[9px] md:text-[10px] font-sans tracking-widest uppercase text-white/60 z-20 mix-blend-difference gap-6">
                <div className="flex gap-6">
                    <a className="hover:underline underline-offset-4" href="#">Términos de Servicio</a>
                </div>
                <div className="hidden md:block">
                    <a className="hover:underline underline-offset-4" href="#">Política de Privacidad</a>
                </div>
                <div className="text-right">
                    <span>Marca Registrada de Don Diego 2026</span>
                </div>
            </div>
        </footer>
    );
}

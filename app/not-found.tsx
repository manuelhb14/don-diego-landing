import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <html lang="es">
            <body>
                <div className="min-h-screen bg-[#C8D7E6] flex flex-col items-center justify-center overflow-hidden relative selection:bg-[#222] selection:text-[#C8D7E6]">
                    {/* Navbar placeholder for 404 - simple and elegant */}
                    <nav className="absolute top-0 w-full p-6 lg:p-10 flex justify-between items-center z-50">
                        <div className="flex-1 hidden md:block"></div>
                        <Link href="/" className="flex-none flex items-center justify-center relative mix-blend-difference">
                            <Image
                                src="/logos/logo-new.png"
                                alt="Don Diego Logo"
                                width={140}
                                height={44}
                                className="h-4 w-auto object-contain"
                                priority
                            />
                        </Link>
                        <div className="flex flex-1 justify-end">
                            <Link
                                href="/contacto"
                                className="text-xs font-medium tracking-[0.18em] uppercase text-[#222] hover:opacity-70 transition-opacity"
                                style={{ fontFamily: 'var(--font-sans)' }}
                            >
                                Contacto
                            </Link>
                        </div>
                    </nav>

                    <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-16 md:mt-24 w-full max-w-7xl mx-auto">

                        {/* The Giant "404" Area */}
                        <div className="relative w-full flex justify-center items-end h-[40vh] md:h-[50vh] mb-12 lg:mb-20">

                            {/* Numbers Container */}
                            <div
                                className="relative flex items-end justify-center w-full max-w-[1000px] text-[#222] gap-2 md:gap-8"
                                style={{ fontFamily: 'var(--font-serif)' }}
                            >
                                {/* First '4' */}
                                <div className="relative text-[25vw] md:text-[20vw] leading-none tracking-tighter flex justify-center z-10 mix-blend-multiply">
                                    4
                                    {/* Image intersecting the first 4 */}
                                    {/* <div className="absolute bottom-[10%] left-[20%] w-[60%] aspect-[3/4] z-20 pointer-events-none rounded-t-full rounded-b-md overflow-hidden shadow-2xl skew-y-3 skew-x-2 -rotate-6">
                                        <Image src="/images/gallery/gallery-10.jpg" alt="Art 1" fill className="object-cover" />
                                    </div> */}
                                </div>

                                {/* Middle '0' */}
                                <div className="relative text-[25vw] md:text-[20vw] leading-none tracking-tighter flex justify-center z-20 mix-blend-multiply">
                                    0
                                    {/* Image intersecting the 0 */}
                                    {/* <div className="absolute top-[10%] -right-[15%] w-[70%] aspect-square z-10 pointer-events-none rounded-full overflow-hidden shadow-2xl -rotate-12 border-4 border-[#C8D7E6]">
                                        <Image src="/images/gallery/gallery-15.jpg" alt="Art 2" fill className="object-cover" />
                                    </div> */}
                                </div>

                                {/* Last '4' */}
                                <div className="relative text-[25vw] md:text-[20vw] leading-none tracking-tighter flex justify-center z-10 mix-blend-multiply">
                                    4
                                    {/* Image intersecting the last 4 */}
                                    {/* <div className="absolute bottom-0 right-[20%] w-[55%] aspect-[4/5] z-30 pointer-events-none rounded-md overflow-hidden shadow-2xl rotate-6">
                                        <Image src="/images/gallery/gallery-9.jpg" alt="Art 3" fill className="object-cover" />
                                    </div> */}
                                </div>
                            </div>

                        </div>

                        {/* Text Area */}
                        <div className="flex flex-col items-center justify-center space-y-6 z-30 relative backdrop-blur-sm p-6 rounded-2xl max-w-2xl">
                            <h1
                                className="text-4xl md:text-5xl lg:text-6xl text-[#222] tracking-wide"
                                style={{ fontFamily: 'var(--font-serif)' }}
                            >
                                Página No Encontrada
                            </h1>

                            <p
                                className="text-sm md:text-base text-[#222]/80 max-w-md mx-auto"
                                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
                            >
                                Mmm - has vagado por territorio inexplorado.<br className="hidden md:block" />
                                Déjanos guiarte de vuelta a algo extraordinario.
                            </p>

                            <div className="pt-4">
                                <Link
                                    href="/"
                                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium tracking-[0.18em] uppercase transition-all duration-300 group text-[#222] hover:text-[#222]/70"
                                    style={{ fontFamily: 'var(--font-sans)' }}
                                >
                                    Ver Proyectos
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-full transition-all duration-300 bg-[#222] group-hover:w-1/2" />
                                </Link>
                            </div>
                        </div>

                    </main>

                    {/* Decorative ambient blurred shapes */}
                    <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-white/20 rounded-full mix-blend-overlay blur-[120px] pointer-events-none hidden md:block"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#E1B19B]/20 rounded-full mix-blend-multiply blur-[150px] pointer-events-none hidden md:block"></div>

                </div>
            </body>
        </html>
    );
}

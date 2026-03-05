import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
type Props = {
    params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            {/* <Loading /> */}
            <Navbar locale={locale} />
            <main>
                <Hero />
                <Manifesto />
                <Services />
                <Projects />
                <Location />
                <Gallery />
                <Team />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

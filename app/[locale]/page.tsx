import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Vision from "@/components/Vision";
import ProjectsEditorial from "@/components/ProjectsEditorial";
import Location from "@/components/Location";
import Exclusivity from "@/components/Exclusivity";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import ThingsToDo from "@/components/ThingsToDo";
import AppFeaturesShowcase from "@/components/AppFeaturesShowcase";
import Blogs from "@/components/Blogs";
import { getSanMiguelWeather } from "@/lib/weather";
type Props = {
    params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const weather = await getSanMiguelWeather();

    return (
        <>
            {/* <Loading /> */}
            <Navbar locale={locale} hideLogoAtTop={true} />
            <main>
                <Hero initialWeather={weather} />
                <Manifesto />
                <Vision />
                <Services />
                <ProjectsEditorial />
                <ThingsToDo />
                <AppFeaturesShowcase />
                <Location />
                <Blogs />
                <Team />
                <Exclusivity />
                <Contact />
                <Faq />
            </main>
            <Footer />
        </>
    );
}

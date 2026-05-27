import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Vision from "@/components/Vision";
import Location from "@/components/Location";
import Services from "@/components/Services";
import ServicesV2 from "@/components/ServicesV2";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import ThingsToDo from "@/components/ThingsToDo";
import AppFeaturesShowcase from "@/components/AppFeaturesShowcase";
import Blogs from "@/components/Blogs";
import { getSanMiguelWeather } from "@/lib/weather";
import InstagramPostsContacto from "@/components/contacto/InstagramPostsContacto";
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
                <ServicesV2 />
                <Team />
                <ThingsToDo />
                <AppFeaturesShowcase />
                <Location />
                {/* <Blogs /> */}
                <InstagramPostsContacto />
                <Contact />
                <Faq />
            </main>
            <Footer />
        </>
    );
}

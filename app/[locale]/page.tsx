import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectOverview from "@/components/ProjectOverview";
import Gallery from "@/components/Gallery";
import LocationSection from "@/components/LocationSection";
import TeamSection from "@/components/TeamSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <Hero />
        <AboutSection />
        <ProjectOverview />
        <Gallery />
        <LocationSection />
        <TeamSection />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

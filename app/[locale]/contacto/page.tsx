import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroContacto from "@/components/contacto/HeroContacto";
import FormContacto from "@/components/contacto/FormContacto";
import Footer from "@/components/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ContactoPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Navbar locale={locale} theme="dark" />
            <main>
                <HeroContacto />
                <FormContacto />
            </main>
            <Footer />
        </>
    );
}

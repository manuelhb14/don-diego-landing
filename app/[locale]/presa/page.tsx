import { setRequestLocale } from "next-intl/server";
import NavbarV5 from "@/components/v5/NavbarV5";
import HeroPresa from "@/components/presa/HeroPresa";
import ConceptPresa from "@/components/presa/ConceptPresa";
import FooterV5 from "@/components/v5/FooterV5";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function PresaPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <NavbarV5 locale={locale} />
            <main>
                <HeroPresa />
                <ConceptPresa />
            </main>
            <FooterV5 />
        </>
    );
}
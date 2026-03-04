import { setRequestLocale } from "next-intl/server";
import NavbarV5 from "@/components/v5/NavbarV5";
import HeroFarm from "@/components/farm/HeroFarm";
import SustentabilidadFarm from "@/components/farm/SustentabilidadFarm";
import ProductsFarm from "@/components/farm/ProductsFarm";
import FooterV5 from "@/components/v5/FooterV5";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function FarmPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <NavbarV5 locale={locale} />
            <main>
                <HeroFarm />
                <SustentabilidadFarm />
                <ProductsFarm />
            </main>
            <FooterV5 />
        </>
    );
}
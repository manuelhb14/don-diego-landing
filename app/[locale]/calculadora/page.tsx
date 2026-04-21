import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCalculadora from "@/components/calculadora/HeroCalculadora";
import MortgageCalculator from "@/components/calculadora/MortgageCalculator";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.calculadora" });
  const title = t("title");
  const description = t("description");
  return { title, description, openGraph: { title, description } };
}

export default async function CalculadoraPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar locale={locale} theme="dark" />
      <main>
        <HeroCalculadora />
        <MortgageCalculator />
      </main>
      <Footer />
    </>
  );
}

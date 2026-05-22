import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import HeroPropiedades from "@/components/propiedades/HeroPropiedades";
import { getAllProperties } from "@/content/properties";
import InteractivePropertyMap, {
  type PropertyMapCopy,
  type PropertyMapItem,
} from "@/components/propiedades/InteractivePropertyMap";
import { type PropertyCardData } from "@/components/propiedades/PropertyCard";
import ResidencesShowcasePropiedades from "@/components/propiedades/ResidencesShowcasePropiedades";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.propertiesIndex" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function PropiedadesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("propertiesIndex");
  const tFeatures = await getTranslations("pages.residencial.features");
  const properties = getAllProperties(locale as "es" | "en");
  const interactiveMapCopy = t.raw("interactiveMap") as PropertyMapCopy;

  const residenceKeyBySlug: Record<string, "departamentos" | "duplex1" | "duplex2" | "duplex3"> = {
    departamentos: "departamentos",
    "duplex-tipo-1": "duplex1",
    "duplex-tipo-2": "duplex2",
    "duplex-tipo-3": "duplex3",
  };

  const propertyCards: PropertyCardData[] = properties.map((p) => {
    const residenceKey = residenceKeyBySlug[p.slug];
    const details = residenceKey
      ? {
          labels: {
            superficie: tFeatures("labels.superficie"),
            recamaras: tFeatures("labels.recamaras"),
            banos: tFeatures("labels.banos"),
          },
          values: {
            superficie: tFeatures(`residences.${residenceKey}.specs.superficie`),
            recamaras: tFeatures(`residences.${residenceKey}.specs.recamaras`),
            banos: tFeatures(`residences.${residenceKey}.specs.banos`),
          },
        }
      : null;

    return {
      ...p,
      details,
    };
  });

  const mapMetaBySlug: Record<string, Pick<PropertyMapItem, "mapType">> = {
    departamentos: { mapType: "farm" },
    "duplex-tipo-1": { mapType: "presa" },
    "duplex-tipo-2": { mapType: "residencial" },
    "duplex-tipo-3": { mapType: "wellness" },
  };

  const mapProperties: PropertyMapItem[] = propertyCards
    .map((property) => {
      const meta = mapMetaBySlug[property.slug];
      if (!meta) return null;
      return {
        ...property,
        ...meta,
      };
    })
    .filter((property): property is PropertyMapItem => Boolean(property));

  return (
    <>
      <Navbar locale={locale} theme="dark" />
      <main className="bg-[#F6F0E8] min-h-screen">
        <HeroPropiedades
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ResidencesShowcasePropiedades />

        <InteractivePropertyMap
          copy={interactiveMapCopy}
          properties={mapProperties}
        />

        {/* <section className="mx-auto max-w-6xl px-6 md:px-10 lg:px-14 pt-10 pb-16 md:pb-24">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-7">
            {propertyCards.map((property) => (
              <li key={property.slug}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        </section> */}

        <Contact />
      </main>
      <Footer />
    </>
  );
}

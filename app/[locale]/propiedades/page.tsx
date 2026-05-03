import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroPropiedades from "@/components/propiedades/HeroPropiedades";
import { getAllProperties } from "@/content/properties";
import InteractivePropertyMap, {
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

  const mapMetaBySlug: Record<
    string,
    Pick<PropertyMapItem, "mapType" | "typeLabel" | "mapColor" | "panel" | "marker">
  > = {
    departamentos: {
      mapType: "farm",
      typeLabel: locale === "en" ? "Residences" : "Residencias",
      mapColor: "#C4654F",
      panel: {
        kicker: locale === "en" ? "Property Type" : "Tipo de propiedad",
        description:
          locale === "en"
            ? "Residences designed for everyday comfort, surrounded by green areas with direct access to the development amenities."
            : "Residencias diseñadas para la vida diaria, rodeadas de áreas verdes y con acceso directo a las amenidades del desarrollo.",
        typology: locale === "en" ? "Apartment" : "Departamento",
        price: locale === "en" ? "From $8,750,000 MXN" : "$8,750,000 MXN",
        availability: locale === "en" ? "12 available" : "12 disponibles",
        amenities:
          locale === "en"
            ? ["Garden", "Terrace", "2 levels", "Green view"]
            : ["Jardín", "Terraza", "2 niveles", "Vista verde"],
        planLabel: locale === "en" ? "View property plan" : "Ver plano de propiedad",
      },
      marker: { x: 400, y: 304 },
    },
    "duplex-tipo-1": {
      mapType: "presa",
      typeLabel: "Townhouses",
      mapColor: "#9EBCCD",
      panel: {
        kicker: locale === "en" ? "Property Type" : "Tipo de propiedad",
        description:
          locale === "en"
            ? "Townhouses with clear outdoor connection, private terraces, and efficient layouts for flexible living."
            : "Townhouses con conexión clara al exterior, terrazas privadas y distribuciones eficientes para una vida flexible.",
        typology: locale === "en" ? "Townhouse" : "Townhouse",
        price: locale === "en" ? "From $9,400,000 MXN" : "$9,400,000 MXN",
        availability: locale === "en" ? "8 available" : "8 disponibles",
        amenities:
          locale === "en"
            ? ["Terrace", "Patio", "Lock-off", "Green view"]
            : ["Terraza", "Patio", "Lock-off", "Vista verde"],
        planLabel: locale === "en" ? "View property plan" : "Ver plano de propiedad",
      },
      marker: { x: 326, y: 191 },
    },
    "duplex-tipo-2": {
      mapType: "residencial",
      typeLabel: "Villas",
      mapColor: "#8FA383",
      panel: {
        kicker: locale === "en" ? "Property Type" : "Tipo de propiedad",
        description:
          locale === "en"
            ? "Villas organized around interior patios, with generous terraces and a quieter relationship to the landscape."
            : "Villas organizadas alrededor de patios interiores, con terrazas amplias y una relación más tranquila con el paisaje.",
        typology: locale === "en" ? "Villa" : "Villa",
        price: locale === "en" ? "From $10,200,000 MXN" : "$10,200,000 MXN",
        availability: locale === "en" ? "6 available" : "6 disponibles",
        amenities:
          locale === "en"
            ? ["Patio", "Jacuzzi", "Terrace", "Garden"]
            : ["Patio", "Jacuzzi", "Terraza", "Jardín"],
        planLabel: locale === "en" ? "View property plan" : "Ver plano de propiedad",
      },
      marker: { x: 339, y: 248 },
    },
    "duplex-tipo-3": {
      mapType: "wellness",
      typeLabel: locale === "en" ? "Lots" : "Lotes",
      mapColor: "#9A86A1",
      panel: {
        kicker: locale === "en" ? "Property Type" : "Tipo de propiedad",
        description:
          locale === "en"
            ? "Lots positioned for privacy and long views, ready for a tailored residence within the Don Diego landscape."
            : "Lotes ubicados para privacidad y vistas largas, listos para una residencia a la medida dentro del paisaje de Don Diego.",
        typology: locale === "en" ? "Lot" : "Lote",
        price: locale === "en" ? "From $5,900,000 MXN" : "$5,900,000 MXN",
        availability: locale === "en" ? "10 available" : "10 disponibles",
        amenities:
          locale === "en"
            ? ["Green view", "Garden", "Privacy", "Custom"]
            : ["Vista verde", "Jardín", "Privacidad", "A medida"],
        planLabel: locale === "en" ? "View property plan" : "Ver plano de propiedad",
      },
      marker: { x: 309, y: 298 },
    },
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
          eyebrow={locale === "en" ? "[PROPERTIES]" : "[PROPIEDADES]"}
          title={locale === "en" ? "Interactive Property Map" : "El Mapa Interactivo"}
          description={
            locale === "en"
              ? "Explore each property type within the development. Select an area on the map to view its matching property card."
              : "Explora cada tipo de propiedad dentro del desarrollo. Selecciona una zona del mapa para ver su ficha correspondiente."
          }
          viewLabel={locale === "en" ? "View" : "Ver"}
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
      </main>
      <Footer />
    </>
  );
}

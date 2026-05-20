import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

const ASSETS = [
    { name: "Big tree", src: "/images/hero/assets/big-tree-low-poly.png", width: 996, height: 1580 },
    { name: "Round tree", src: "/images/hero/assets/round-tree-low-poly.png", width: 344, height: 384 },
    { name: "Branching tree", src: "/images/hero/assets/branching-tree-low-poly.png", width: 440, height: 464 },
    { name: "Flowering shrub", src: "/images/hero/assets/flowering-shrub-low-poly.png", width: 293, height: 195 },
    { name: "Agave", src: "/images/hero/assets/agave-low-poly.png", width: 309, height: 259 },
    { name: "Broad leaf", src: "/images/hero/assets/broad-leaf-plant-low-poly.png", width: 274, height: 317 },
    { name: "Ornamental grass", src: "/images/hero/assets/ornamental-grass-low-poly.png", width: 348, height: 379 },
    { name: "Agapanthus", src: "/images/hero/assets/agapanthus-low-poly.png", width: 200, height: 388 },
    { name: "Salvia", src: "/images/hero/assets/salvia-low-poly.png", width: 153, height: 383 },
    { name: "Lavender", src: "/images/hero/assets/lavender-low-poly.png", width: 131, height: 361 },
    { name: "White daisy", src: "/images/hero/assets/white-daisy-stem-low-poly.png", width: 160, height: 362 },
    { name: "Olive branch", src: "/images/hero/assets/olive-branch-low-poly.png", width: 243, height: 335 },
] as const;

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function TestPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="min-h-dvh bg-[#d9c9a8]">
            <section className="mx-auto grid min-h-dvh w-full max-w-7xl content-center px-6 py-10">
                <div className="grid grid-cols-2 items-end gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
                    {ASSETS.map((asset, index) => (
                        <figure key={asset.src} className="grid min-h-[240px] place-items-end">
                            <Image
                                src={asset.src}
                                alt={`${asset.name} low-poly asset`}
                                width={asset.width}
                                height={asset.height}
                                priority={index < 4}
                                className="h-auto max-h-[280px] w-auto max-w-full object-contain"
                            />
                            <figcaption className="mt-3 w-full text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#4e442c]">
                                {asset.name}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>
        </main>
    );
}

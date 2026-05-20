"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { mixHex, mulberry32 } from "@/lib/hero-scene-seed";
import type { WeatherCondition } from "@/lib/weather";
import "./hero-botanical-background.css";

const HERO_BOTANICAL_SEED = 0x646f6e64; // "dond" — stable layout
const SHOW_PREVIEW_TOGGLE = process.env.NODE_ENV === "development";

type BotanicalPngAsset = {
    key: string;
    src: string;
    width: number;
    height: number;
    className: string;
    sizes: string;
};

const SKY_ASSETS: BotanicalPngAsset[] = [
    {
        key: "sky-morning",
        src: "/hero/02_sky_gradient_morning.png",
        width: 1625,
        height: 968,
        className: "hero-sky-asset hero-sky-morning",
        sizes: "100vw",
    },
    {
        key: "sky-sunset",
        src: "/hero/02_sky_gradient_sunset.png",
        width: 1672,
        height: 941,
        className: "hero-sky-asset hero-sky-sunset",
        sizes: "100vw",
    },
    {
        key: "sky-night",
        src: "/hero/02_sky_gradient_night.png",
        width: 1672,
        height: 941,
        className: "hero-sky-asset hero-sky-night",
        sizes: "100vw",
    },
];

const SUN_ASSETS: BotanicalPngAsset[] = [
    {
        key: "sun-disk-morning",
        src: "/hero/clean/01_sun_disk_morning.png",
        width: 723,
        height: 743,
        className: "hero-sun-asset hero-sun-disk hero-sun-morning",
        sizes: "(min-width: 1280px) 112px, 9vw",
    },
    {
        key: "sun-disk-sunset",
        src: "/hero/clean/01_sun_disk_sunset.png",
        width: 793,
        height: 812,
        className: "hero-sun-asset hero-sun-disk hero-sun-sunset",
        sizes: "(min-width: 1280px) 120px, 9.5vw",
    },
    {
        key: "sun-disk-night",
        src: "/hero/clean/01_sun_disk_night.png",
        width: 768,
        height: 839,
        className: "hero-sun-asset hero-sun-disk hero-sun-night",
        sizes: "(min-width: 1280px) 98px, 8vw",
    },
];

const CLOUD_ASSETS: BotanicalPngAsset[] = [
    {
        key: "wisp-left",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp cloud-wisp-left",
        sizes: "(min-width: 1280px) 360px, 28vw",
    },
    {
        key: "wisp-mid",
        src: "/hero/clean/02_cloud_wisp_2.png",
        width: 1008,
        height: 265,
        className: "hero-cloud-asset cloud-wisp cloud-wisp-mid",
        sizes: "(min-width: 1280px) 330px, 26vw",
    },
    {
        key: "wisp-right",
        src: "/hero/clean/02_cloud_wisp_3.png",
        width: 1153,
        height: 373,
        className: "hero-cloud-asset cloud-wisp cloud-wisp-right",
        sizes: "(min-width: 1280px) 350px, 27vw",
    },
    {
        key: "cloudy-wisp-high",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud cloudy-wisp-high",
        sizes: "(min-width: 1280px) 300px, 24vw",
    },
    {
        key: "cloudy-wisp-low",
        src: "/hero/clean/02_cloud_wisp_3.png",
        width: 1153,
        height: 373,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud cloudy-wisp-low",
        sizes: "(min-width: 1280px) 330px, 26vw",
    },
    {
        key: "cloudy-wisp-far",
        src: "/hero/clean/02_cloud_wisp_2.png",
        width: 1008,
        height: 265,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud cloudy-wisp-far",
        sizes: "(min-width: 1280px) 270px, 22vw",
    },
    {
        key: "cloudy-wisp-upper",
        src: "/hero/clean/02_cloud_wisp_3.png",
        width: 1153,
        height: 373,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud cloudy-wisp-upper",
        sizes: "(min-width: 1280px) 300px, 24vw",
    },
    {
        key: "cloudy-wisp-middle",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud cloudy-wisp-middle",
        sizes: "(min-width: 1280px) 280px, 23vw",
    },
    {
        key: "cloudy-wisp-trailing",
        src: "/hero/clean/02_cloud_wisp_2.png",
        width: 1008,
        height: 265,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud cloudy-wisp-trailing",
        sizes: "(min-width: 1280px) 260px, 21vw",
    },
    {
        key: "rain-cloud-left",
        src: "/hero/clean/02_cloud_wisp_rain_1.png",
        width: 912,
        height: 559,
        className: "hero-cloud-asset rain-cloud rain-cloud-left",
        sizes: "(min-width: 1280px) 300px, 24vw",
    },
    {
        key: "rain-cloud-mid",
        src: "/hero/clean/02_cloud_wisp_rain_2.png",
        width: 1194,
        height: 483,
        className: "hero-cloud-asset rain-cloud rain-cloud-mid",
        sizes: "(min-width: 1280px) 420px, 32vw",
    },
    {
        key: "rain-cloud-right",
        src: "/hero/clean/02_cloud_wisp_rain_3.png",
        width: 1050,
        height: 709,
        className: "hero-cloud-asset rain-cloud rain-cloud-right",
        sizes: "(min-width: 1280px) 320px, 25vw",
    },
];

const HILL_ASSETS: BotanicalPngAsset[] = [
    {
        key: "far-hills",
        src: "/hero/clean/02_hills_layer_far.png",
        width: 1625,
        height: 968,
        className: "hero-hill-asset hero-hill-far",
        sizes: "100vw",
    },
    {
        key: "mid-hills",
        src: "/hero/clean/02_hills_layer_mid.png",
        width: 1625,
        height: 968,
        className: "hero-hill-asset hero-hill-mid",
        sizes: "100vw",
    },
    {
        key: "close-hills",
        src: "/hero/clean/02_hills_layer_close.png",
        width: 1625,
        height: 968,
        className: "hero-hill-asset hero-hill-close",
        sizes: "100vw",
    },
];

const BUILDING_ASSETS: BotanicalPngAsset[] = [
    {
        key: "main-villa-day",
        src: "/hero/clean/03_main_villa_structure_off_2_clean.png",
        width: 1211,
        height: 731,
        className: "hero-building-asset hero-building-villa hero-building-day",
        sizes: "(min-width: 1280px) 640px, 52vw",
    },
    {
        key: "main-villa-lit",
        src: "/hero/clean/03_main_villa_structure_on.png",
        width: 1221,
        height: 730,
        className: "hero-building-asset hero-building-villa hero-building-lit",
        sizes: "(min-width: 1280px) 640px, 52vw",
    },
    {
        key: "adobe-left-day",
        src: "/hero/clean/04_single_adobe_house_01_off.png",
        width: 1332,
        height: 586,
        className: "hero-building-asset hero-adobe-row hero-adobe-row-a hero-building-day",
        sizes: "(min-width: 1280px) 330px, 26vw",
    },
    {
        key: "adobe-left-lit",
        src: "/hero/clean/04_single_adobe_house_01_on.png",
        width: 1332,
        height: 588,
        className: "hero-building-asset hero-adobe-row hero-adobe-row-a hero-building-lit",
        sizes: "(min-width: 1280px) 330px, 26vw",
    },
    {
        key: "adobe-right-day",
        src: "/hero/clean/04_single_adobe_house_02_off.png",
        width: 1045,
        height: 641,
        className: "hero-building-asset hero-adobe-row hero-adobe-row-b hero-building-day",
        sizes: "(min-width: 1280px) 260px, 22vw",
    },
    {
        key: "adobe-right-lit",
        src: "/hero/clean/04_single_adobe_house_02_on.png",
        width: 1044,
        height: 643,
        className: "hero-building-asset hero-adobe-row hero-adobe-row-b hero-building-lit",
        sizes: "(min-width: 1280px) 260px, 22vw",
    },
    {
        key: "adobe-far-day",
        src: "/hero/clean/04_single_adobe_house_01_off.png",
        width: 1332,
        height: 586,
        className: "hero-building-asset hero-adobe-row hero-adobe-row-c hero-building-day",
        sizes: "(min-width: 1280px) 260px, 21vw",
    },
    {
        key: "adobe-far-lit",
        src: "/hero/clean/04_single_adobe_house_01_on.png",
        width: 1332,
        height: 588,
        className: "hero-building-asset hero-adobe-row hero-adobe-row-c hero-building-lit",
        sizes: "(min-width: 1280px) 260px, 21vw",
    },
];

const FOREGROUND_ASSETS: BotanicalPngAsset[] = [
    {
        key: "round-tree-left",
        src: "/hero/clean/05_rounded_tree.png",
        width: 834,
        height: 1363,
        className: "png-asset round-tree round-tree-left",
        sizes: "(min-width: 1280px) 150px, 13vw",
    },
    {
        key: "edge-tree-left",
        src: "/hero/clean/05_rounded_tree.png",
        width: 834,
        height: 1363,
        className: "png-asset edge-tree edge-tree-left",
        sizes: "(min-width: 1280px) 260px, 20vw",
    },
    {
        key: "airy-tree-left-edge",
        src: "/hero/clean/05_airy_tree.png",
        width: 906,
        height: 1423,
        className: "png-asset airy-tree airy-tree-left-edge",
        sizes: "(min-width: 1280px) 310px, 24vw",
    },
    {
        key: "airy-tree-right",
        src: "/hero/clean/05_airy_tree.png",
        width: 906,
        height: 1423,
        className: "png-asset airy-tree airy-tree-right",
        sizes: "(min-width: 1280px) 190px, 16vw",
    },
    {
        key: "cypress-right",
        src: "/hero/clean/05_cypress_tree.png",
        width: 265,
        height: 1419,
        className: "png-asset cypress-tree cypress-tree-right",
        sizes: "(min-width: 1280px) 88px, 7vw",
    },
    {
        key: "agave-cluster-left",
        src: "/hero/clean/05_agave_cluster.png",
        width: 1143,
        height: 759,
        className: "png-asset agave-cluster agave-cluster-left",
        sizes: "(min-width: 1280px) 310px, 28vw",
    },
    {
        key: "agave-single-front",
        src: "/hero/clean/05_agave_single.png",
        width: 1101,
        height: 870,
        className: "png-asset agave-single agave-single-front",
        sizes: "(min-width: 1280px) 220px, 20vw",
    },
    {
        key: "grass-left",
        src: "/hero/clean/05_grass_tuft.png",
        width: 935,
        height: 826,
        className: "png-asset grass-tuft grass-tuft-left",
        sizes: "(min-width: 1280px) 220px, 20vw",
    },
    {
        key: "succulent-right",
        src: "/hero/clean/05_succulent_rossete.png",
        width: 1006,
        height: 795,
        className: "png-asset succulent succulent-right",
        sizes: "(min-width: 1280px) 210px, 19vw",
    },
    {
        key: "orange-flowers-left",
        src: "/hero/clean/05_orange_flower_bush.png",
        width: 979,
        height: 852,
        className: "png-asset flower-bush orange-flower-left",
        sizes: "(min-width: 1280px) 160px, 15vw",
    },
    {
        key: "pink-flowers-right",
        src: "/hero/clean/05_pink_flower_bush.png",
        width: 1021,
        height: 818,
        className: "png-asset flower-bush pink-flower-right",
        sizes: "(min-width: 1280px) 170px, 15vw",
    },
    {
        key: "white-flower-front",
        src: "/hero/clean/05_white_flower_clump.png",
        width: 1002,
        height: 969,
        className: "png-asset white-flower white-flower-front",
        sizes: "(min-width: 1280px) 110px, 10vw",
    },
    {
        key: "cattail-front",
        src: "/hero/clean/05_cattail_reed.png",
        width: 582,
        height: 1232,
        className: "png-asset cattail cattail-front",
        sizes: "(min-width: 1280px) 92px, 8vw",
    },
    {
        key: "rock-front",
        src: "/hero/clean/05_rock_set.png",
        width: 982,
        height: 503,
        className: "png-asset rock-set rock-set-front",
        sizes: "(min-width: 1280px) 170px, 15vw",
    },
];

type ResolvedTimeOfDay = "morning" | "sunset" | "night";

type WeatherResponse = {
    condition?: WeatherCondition;
};

type TimePreviewMode = "auto" | ResolvedTimeOfDay;
type WeatherPreviewMode = "auto" | WeatherCondition;

function getTimeOfDay(date = new Date()): ResolvedTimeOfDay {
    const hour = date.getHours();
    if (hour >= 5 && hour < 17) return "morning";
    if (hour >= 17 && hour < 20) return "sunset";
    return "night";
}

function stageBackgroundStyle(): CSSProperties {
    const bgT = 0.3;
    const bg = mixHex("#f7f0dc", "#c9b98e", bgT);
    const bgDeep = mixHex("#e8dcc2", "#9c8d60", bgT);
    return {
        background: `radial-gradient(ellipse at 50% 35%, ${bg} 0%, ${bgDeep} 95%)`,
    };
}

export type HeroBotanicalBackgroundProps = {
    className?: string;
    initialWeatherCondition?: WeatherCondition;
    atmosphereOnly?: boolean;
};

export default function HeroBotanicalBackground({
    className,
    initialWeatherCondition = "partly-cloudy",
    atmosphereOnly = false,
}: HeroBotanicalBackgroundProps) {
    const [autoTimeOfDay, setAutoTimeOfDay] = useState<ResolvedTimeOfDay>(() => getTimeOfDay());
    const [timeMode, setTimeMode] = useState<TimePreviewMode>("auto");
    const resolvedTimeOfDay = timeMode === "auto" ? autoTimeOfDay : timeMode;
    const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>(initialWeatherCondition);
    const [weatherMode, setWeatherMode] = useState<WeatherPreviewMode>("auto");
    const resolvedWeatherCondition = weatherMode === "auto" ? weatherCondition : weatherMode;

    useEffect(() => {
        const updateTimeOfDay = () => setAutoTimeOfDay(getTimeOfDay());
        const interval = window.setInterval(updateTimeOfDay, 60_000);
        return () => window.clearInterval(interval);
    }, []);

    useEffect(() => {
        let ignore = false;

        const updateWeather = async () => {
            try {
                const res = await fetch("/api/weather", { cache: "no-store" });
                if (!res.ok) return;
                const data = (await res.json()) as WeatherResponse;
                if (!ignore && data.condition) setWeatherCondition(data.condition);
            } catch {
                // Keep the default visual state if live weather cannot load.
            }
        };

        updateWeather();
        const interval = window.setInterval(updateWeather, 30 * 60_000);
        return () => {
            ignore = true;
            window.clearInterval(interval);
        };
    }, []);

    const scene = useMemo(() => {
        const rng = mulberry32(HERO_BOTANICAL_SEED);
        const sparkles = Array.from({ length: 18 }, (_, i) => {
            const left = rng() * 100;
            const top = rng() * 100;
            const delay = rng() * 3;
            return { key: `sp-${i}`, left, top, delay };
        });
        const fountainSpans = Array.from({ length: 22 }, (_, i) => ({
            key: `fp-${i}`,
            delay: (i / 22) * 2.4,
            dx: (rng() - 0.5) * 14,
        }));
        const motes = Array.from({ length: 18 }, (_, i) => ({
            key: `m-${i}`,
            left: rng() * 100,
            top: 50 + rng() * 45,
            fx: (rng() - 0.5) * 100,
            fy: -40 - rng() * 80,
            delay: rng() * 14,
        }));
        const rainDrops = Array.from({ length: 82 }, (_, i) => ({
            key: `rd-${i}`,
            cls: i >= 58 ? "storm-drop" : i >= 34 ? "heavy-drop" : "",
            left: (i * 19 + Math.floor(rng() * 12)) % 100,
            delay: -(rng() * 1.8),
            dur: 0.72 + rng() * 0.34,
            len: 16 + rng() * 14,
        }));
        return { sparkles, fountainSpans, motes, rainDrops };
    }, []);

    const rootStyle = {
        ...(atmosphereOnly ? {} : stageBackgroundStyle()),
        ["--anim-speed" as string]: 1,
        ["--light" as string]: 1,
        ["--density" as string]: 1,
        ["--hue-shift" as string]: "0deg",
    } as CSSProperties;

    const previewToggle = SHOW_PREVIEW_TOGGLE ? (
        <div className="preview-toggle" aria-label="Preview background time and weather">
            <div className="preview-toggle-row" aria-label="Preview time of day">
                {[
                    ["auto", "Auto"],
                    ["morning", "Morning"],
                    ["sunset", "Sunset"],
                    ["night", "Night"],
                ].map(([mode, label]) => (
                    <button
                        key={mode}
                        type="button"
                        className={timeMode === mode ? "active" : ""}
                        aria-pressed={timeMode === mode}
                        onClick={() => setTimeMode(mode as TimePreviewMode)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="preview-toggle-row weather" aria-label="Preview weather">
                {[
                    ["auto", "Auto"],
                    ["clear", "Clear"],
                    ["partly-cloudy", "Partly"],
                    ["cloudy", "Cloudy"],
                    ["fog", "Fog"],
                    ["drizzle", "Drizzle"],
                    ["rain", "Rain"],
                    ["thunderstorm", "Storm"],
                    ["windy", "Wind"],
                ].map(([mode, label]) => (
                    <button
                        key={mode}
                        type="button"
                        className={weatherMode === mode ? "active" : ""}
                        aria-pressed={weatherMode === mode}
                        onClick={() => setWeatherMode(mode as WeatherPreviewMode)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    ) : null;

    const atmosphere = (
        <>
            <div className="hero-cloud-assets" aria-hidden>
                {CLOUD_ASSETS.map((asset) => (
                    <Image
                        key={asset.key}
                        src={asset.src}
                        alt=""
                        className={asset.className}
                        width={asset.width}
                        height={asset.height}
                        sizes={asset.sizes}
                    />
                ))}
                <span className="distant-bird-line" />
            </div>
            <div className="weather-fog" aria-hidden />
            <div className="weather-rain" aria-hidden>
                {scene.rainDrops.map((drop) => (
                    <span
                        key={drop.key}
                        className={drop.cls}
                        style={
                            {
                                left: `${drop.left}%`,
                                height: `${drop.len}px`,
                                animationDelay: `${drop.delay}s`,
                                animationDuration: `calc(${drop.dur}s / var(--anim-speed, 1))`,
                            } as CSSProperties
                        }
                    />
                ))}
            </div>
            <div className="weather-lightning" aria-hidden />
            <div className="motes">
                {scene.motes.map((m) => (
                    <div
                        key={m.key}
                        className="mote"
                        style={{
                            left: `${m.left}%`,
                            top: `${m.top}%`,
                            ["--fx" as string]: `${m.fx}px`,
                            ["--fy" as string]: `${m.fy}px`,
                            animationDelay: `-${m.delay}s`,
                        }}
                    />
                ))}
            </div>
            <div className="sprite-bird sprite-bird-a" aria-hidden>
                <span />
            </div>
            <div className="sprite-bird sprite-bird-b" aria-hidden>
                <span />
            </div>
        </>
    );

    if (atmosphereOnly) {
        return (
            <div
                className={`hero-botanical-stage-wrap hero-botanical-atmosphere-overlay ${className ?? ""}`}
                data-time-of-day={resolvedTimeOfDay}
                data-weather={resolvedWeatherCondition}
                style={rootStyle}
            >
                {previewToggle}
                <div className="scene-botanical">{atmosphere}</div>
            </div>
        );
    }

    return (
        <div
            className={`hero-botanical-stage-wrap ${className ?? ""}`}
            data-time-of-day={resolvedTimeOfDay}
            data-weather={resolvedWeatherCondition}
            style={rootStyle}
        >
            {previewToggle}
            <div className="scene-botanical">
                <div className="sky">
                    {SKY_ASSETS.map((asset) => (
                        <Image
                            key={asset.key}
                            src={asset.src}
                            alt=""
                            className={asset.className}
                            width={asset.width}
                            height={asset.height}
                            sizes={asset.sizes}
                            priority={asset.key === "sky-morning"}
                        />
                    ))}
                </div>
                <div className="stars" aria-hidden />
                <div className="hero-sun-assets" aria-hidden>
                    {SUN_ASSETS.map((asset) => (
                        <Image
                            key={asset.key}
                            src={asset.src}
                            alt=""
                            className={asset.className}
                            width={asset.width}
                            height={asset.height}
                            sizes={asset.sizes}
                        />
                    ))}
                </div>
                {atmosphere}
                <div className="png-hill-assets" aria-hidden>
                    {HILL_ASSETS.map((asset) => (
                        <Image
                            key={asset.key}
                            src={asset.src}
                            alt=""
                            className={asset.className}
                            width={asset.width}
                            height={asset.height}
                            sizes={asset.sizes}
                        />
                    ))}
                </div>
                <div className="hero-building-assets" aria-hidden>
                    {BUILDING_ASSETS.map((asset) => (
                        <Image
                            key={asset.key}
                            src={asset.src}
                            alt=""
                            className={asset.className}
                            width={asset.width}
                            height={asset.height}
                            sizes={asset.sizes}
                        />
                    ))}
                </div>
                <div className="pond" aria-hidden>
                    <Image
                        src="/hero/clean/06_pond_new.png"
                        alt=""
                        className="pond-image"
                        width={1659}
                        height={390}
                        sizes="(min-width: 1280px) 1420px, 88vw"
                    />
                    <div className="pond-water" />
                    <div className="ripple" />
                    <div className="ripple r2" />
                    <div className="ripple r3" />
                    <div className="ripple r4" />
                    {scene.sparkles.map((s) => (
                        <div
                            key={s.key}
                            className="sparkle"
                            style={{
                                left: `${s.left}%`,
                                top: `${s.top}%`,
                                animationDelay: `-${s.delay}s`,
                            }}
                        />
                    ))}
                </div>
                <div className="png-foreground-assets" aria-hidden>
                    {FOREGROUND_ASSETS.map((asset) => (
                        <Image
                            key={asset.key}
                            src={asset.src}
                            alt=""
                            className={asset.className}
                            width={asset.width}
                            height={asset.height}
                            sizes={asset.sizes}
                        />
                    ))}
                </div>
                <div className="fountain-plume">
                    {scene.fountainSpans.map((s) => (
                        <span
                            key={s.key}
                            style={{
                                animationDelay: `-${s.delay.toFixed(2)}s`,
                                ["--dx" as string]: `${s.dx}px`,
                            }}
                        />
                    ))}
                </div>
                <div
                    className="butterfly"
                    style={{ left: "18%", bottom: "35%", zIndex: 46 }}
                    dangerouslySetInnerHTML={{
                        __html: `<svg width="24" height="20" viewBox="0 0 30 24" xmlns="http://www.w3.org/2000/svg"><ellipse cx="10" cy="10" rx="6" ry="9" fill="#e8c890" opacity="0.85"/><ellipse cx="20" cy="10" rx="6" ry="9" fill="#e8c890" opacity="0.85"/><ellipse cx="10" cy="16" rx="4" ry="5" fill="#d4a870" opacity="0.9"/><ellipse cx="20" cy="16" rx="4" ry="5" fill="#d4a870" opacity="0.9"/><ellipse cx="15" cy="12" rx="1.5" ry="7" fill="#5a3a1a"/></svg>`,
                    }}
                />
            </div>
        </div>
    );
}

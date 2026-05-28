"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { mixHex, mulberry32 } from "@/lib/hero-scene-seed";
import type { WeatherCondition } from "@/lib/weather";
import "./hero-botanical-background.css";

const HERO_BOTANICAL_SEED = 0x646f6e64; // "dond" — stable layout
const HERO_CLOUD_SEED = 0x636c6473; // "clds"
const HERO_CLOUD_ASSET_VERSION = "cloud-neutral-2";
const SHOW_PREVIEW_TOGGLE = process.env.NODE_ENV === "development";

type BotanicalPngAsset = {
    key: string;
    src: string;
    width: number;
    height: number;
    className: string;
    sizes: string;
    style?: CSSProperties;
};

type SetTwoBird = {
    key: string;
    style: CSSProperties;
};

type CloudVariant = {
    src: string;
    width: number;
    height: number;
};

const cssVars = (vars: Record<string, string>): CSSProperties => vars as CSSProperties;

const randomRange = (rand: () => number, min: number, max: number, precision = 1) =>
    Number((min + rand() * (max - min)).toFixed(precision));

const cleanCloudSrc = (fileName: string) => `/hero/clean/${fileName}?v=${HERO_CLOUD_ASSET_VERSION}`;

const CLOUD_VARIANTS: CloudVariant[] = [
    { src: cleanCloudSrc("nube_1.png"), width: 1054, height: 383 },
    { src: cleanCloudSrc("nube_2.png"), width: 922, height: 333 },
    { src: cleanCloudSrc("nube_3.png"), width: 1058, height: 170 },
    { src: cleanCloudSrc("nube_4.png"), width: 1170, height: 570 },
    { src: cleanCloudSrc("nube_5.png"), width: 1031, height: 445 },
];

const RAIN_CLOUD_VARIANTS: CloudVariant[] = [
    { src: cleanCloudSrc("nube_lluvia_1.png"), width: 1081, height: 309 },
    { src: cleanCloudSrc("nube_lluvia_2.png"), width: 1154, height: 202 },
    { src: cleanCloudSrc("nube_lluvia_3.png"), width: 931, height: 388 },
    { src: cleanCloudSrc("nube_lluvia_4.png"), width: 1151, height: 269 },
    { src: cleanCloudSrc("nube_lluvia_5.png"), width: 1106, height: 199 },
];

const WEATHER_CLOUD_SEED: Record<WeatherCondition, number> = {
    clear: 0x636c6561,
    "partly-cloudy": 0x70617274,
    cloudy: 0x636c6f75,
    fog: 0x666f6720,
    drizzle: 0x6472697a,
    rain: 0x7261696e,
    thunderstorm: 0x73746f72,
    windy: 0x77696e64,
    unknown: 0x756e6b6e,
};

const DEFAULT_CLOUD_VARIANT_POOL = [0, 1, 2, 3, 4];
const CLOUD_VARIANT_POOLS: Partial<Record<WeatherCondition, number[]>> = {
    clear: [0, 1, 2, 2],
    "partly-cloudy": [0, 1, 2, 3, 4, 0, 1],
    cloudy: [0, 1, 3, 4, 3, 4, 0, 1],
    fog: [0, 1, 3, 4, 1],
    drizzle: [0, 1, 2, 3, 4, 1],
    rain: [0, 1, 2, 3, 4, 3, 4],
    thunderstorm: [0, 1, 2, 3, 4, 0, 2],
    windy: [0, 1, 2, 3, 4],
    unknown: DEFAULT_CLOUD_VARIANT_POOL,
};

const RAIN_CLOUD_WEATHER = new Set<WeatherCondition>(["drizzle", "rain", "thunderstorm"]);

const FLOCK_FORMATION = [
    { x: 0, y: 0 },
    { x: -2.6, y: 7 },
    { x: 2.4, y: 6 },
    { x: -4.8, y: 14 },
    { x: 4.6, y: 13 },
    { x: -1.4, y: 19 },
    { x: 1.8, y: 18 },
] as const;

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
        key: "partly-wisp-high",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp partly-extra-cloud partly-wisp-high",
        sizes: "(min-width: 1280px) 280px, 22vw",
    },
    {
        key: "partly-wisp-soft",
        src: "/hero/clean/02_cloud_wisp_2.png",
        width: 1008,
        height: 265,
        className: "hero-cloud-asset cloud-wisp partly-extra-cloud partly-wisp-soft",
        sizes: "(min-width: 1280px) 300px, 24vw",
    },
    {
        key: "partly-wisp-trailing",
        src: "/hero/clean/02_cloud_wisp_3.png",
        width: 1153,
        height: 373,
        className: "hero-cloud-asset cloud-wisp partly-extra-cloud partly-wisp-trailing",
        sizes: "(min-width: 1280px) 310px, 24vw",
    },
    {
        key: "partly-wisp-distant",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp partly-extra-cloud",
        sizes: "(min-width: 1280px) 235px, 18vw",
        style: cssVars({
            "--cloud-top": "2%",
            "--cloud-left": "-42vw",
            "--cloud-width": "clamp(130px, 17vw, 235px)",
            "--cloud-rotate": "-1deg",
            "--cloud-mid-x": "82vw",
            "--cloud-end-x": "154vw",
            "--cloud-mid-y": "2px",
            "--cloud-end-y": "-3px",
            "--cloud-duration": "154s",
            "--cloud-delay": "-128s",
        }),
    },
    {
        key: "partly-wisp-low",
        src: "/hero/clean/02_cloud_wisp_3.png",
        width: 1153,
        height: 373,
        className: "hero-cloud-asset cloud-wisp partly-extra-cloud",
        sizes: "(min-width: 1280px) 320px, 25vw",
        style: cssVars({
            "--cloud-top": "18%",
            "--cloud-left": "-46vw",
            "--cloud-width": "clamp(180px, 25vw, 320px)",
            "--cloud-rotate": "1deg",
            "--cloud-mid-x": "86vw",
            "--cloud-end-x": "158vw",
            "--cloud-mid-y": "-5px",
            "--cloud-end-y": "2px",
            "--cloud-duration": "118s",
            "--cloud-delay": "-32s",
        }),
    },
    {
        key: "partly-wisp-small",
        src: "/hero/clean/02_cloud_wisp_2.png",
        width: 1008,
        height: 265,
        className: "hero-cloud-asset cloud-wisp partly-extra-cloud",
        sizes: "(min-width: 1280px) 220px, 17vw",
        style: cssVars({
            "--cloud-top": "5%",
            "--cloud-left": "-18vw",
            "--cloud-width": "clamp(125px, 16vw, 220px)",
            "--cloud-rotate": "3deg",
            "--cloud-mid-x": "58vw",
            "--cloud-end-x": "128vw",
            "--cloud-mid-y": "-2px",
            "--cloud-end-y": "3px",
            "--cloud-duration": "146s",
            "--cloud-delay": "-18s",
        }),
    },
    {
        key: "partly-wisp-wide",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp partly-extra-cloud",
        sizes: "(min-width: 1280px) 340px, 26vw",
        style: cssVars({
            "--cloud-top": "15%",
            "--cloud-left": "-52vw",
            "--cloud-width": "clamp(190px, 26vw, 340px)",
            "--cloud-rotate": "-2deg",
            "--cloud-mid-x": "94vw",
            "--cloud-end-x": "166vw",
            "--cloud-mid-y": "4px",
            "--cloud-end-y": "-2px",
            "--cloud-duration": "136s",
            "--cloud-delay": "-108s",
        }),
    },
    {
        key: "partly-wisp-horizon",
        src: "/hero/clean/02_cloud_wisp_2.png",
        width: 1008,
        height: 265,
        className: "hero-cloud-asset cloud-wisp partly-extra-cloud",
        sizes: "(min-width: 1280px) 300px, 23vw",
        style: cssVars({
            "--cloud-top": "10%",
            "--cloud-left": "-58vw",
            "--cloud-width": "clamp(170px, 23vw, 300px)",
            "--cloud-rotate": "-1deg",
            "--cloud-mid-x": "102vw",
            "--cloud-end-x": "174vw",
            "--cloud-mid-y": "2px",
            "--cloud-end-y": "-2px",
            "--cloud-duration": "142s",
            "--cloud-delay": "-118s",
        }),
    },
    {
        key: "partly-wisp-upper-thread",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp partly-extra-cloud",
        sizes: "(min-width: 1280px) 245px, 19vw",
        style: cssVars({
            "--cloud-top": "3%",
            "--cloud-left": "-28vw",
            "--cloud-width": "clamp(145px, 19vw, 245px)",
            "--cloud-rotate": "2deg",
            "--cloud-mid-x": "68vw",
            "--cloud-end-x": "140vw",
            "--cloud-mid-y": "-4px",
            "--cloud-end-y": "2px",
            "--cloud-duration": "166s",
            "--cloud-delay": "-52s",
        }),
    },
    {
        key: "partly-wisp-garden-low",
        src: "/hero/clean/02_cloud_wisp_3.png",
        width: 1153,
        height: 373,
        className: "hero-cloud-asset cloud-wisp partly-extra-cloud",
        sizes: "(min-width: 1280px) 280px, 22vw",
        style: cssVars({
            "--cloud-top": "19%",
            "--cloud-left": "-62vw",
            "--cloud-width": "clamp(160px, 22vw, 280px)",
            "--cloud-rotate": "1.5deg",
            "--cloud-mid-x": "104vw",
            "--cloud-end-x": "176vw",
            "--cloud-mid-y": "-3px",
            "--cloud-end-y": "3px",
            "--cloud-duration": "126s",
            "--cloud-delay": "-86s",
        }),
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
        key: "cloudy-wisp-distant",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud cloudy-wisp-distant",
        sizes: "(min-width: 1280px) 250px, 20vw",
    },
    {
        key: "cloudy-wisp-veil",
        src: "/hero/clean/02_cloud_wisp_2.png",
        width: 1008,
        height: 265,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud cloudy-wisp-veil",
        sizes: "(min-width: 1280px) 320px, 25vw",
    },
    {
        key: "cloudy-wisp-shelf",
        src: "/hero/clean/02_cloud_wisp_3.png",
        width: 1153,
        height: 373,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 350px, 27vw",
        style: cssVars({
            "--cloud-top": "0.5%",
            "--cloud-left": "-50vw",
            "--cloud-width": "clamp(210px, 28vw, 360px)",
            "--cloud-rotate": "2deg",
            "--cloud-mid-x": "92vw",
            "--cloud-end-x": "164vw",
            "--cloud-mid-y": "2px",
            "--cloud-end-y": "-4px",
            "--cloud-duration": "162s",
            "--cloud-delay": "-146s",
        }),
    },
    {
        key: "cloudy-wisp-lower-drift",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 300px, 23vw",
        style: cssVars({
            "--cloud-top": "17%",
            "--cloud-left": "-36vw",
            "--cloud-width": "clamp(170px, 23vw, 300px)",
            "--cloud-rotate": "-1.5deg",
            "--cloud-mid-x": "74vw",
            "--cloud-end-x": "146vw",
            "--cloud-mid-y": "-4px",
            "--cloud-end-y": "1px",
            "--cloud-duration": "122s",
            "--cloud-delay": "-54s",
        }),
    },
    {
        key: "cloudy-wisp-thread",
        src: "/hero/clean/02_cloud_wisp_2.png",
        width: 1008,
        height: 265,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 245px, 19vw",
        style: cssVars({
            "--cloud-top": "3.5%",
            "--cloud-left": "-16vw",
            "--cloud-width": "clamp(140px, 18vw, 245px)",
            "--cloud-rotate": "4deg",
            "--cloud-mid-x": "54vw",
            "--cloud-end-x": "126vw",
            "--cloud-mid-y": "-1px",
            "--cloud-end-y": "4px",
            "--cloud-duration": "172s",
            "--cloud-delay": "-24s",
        }),
    },
    {
        key: "cloudy-wisp-deep",
        src: "/hero/clean/02_cloud_wisp_3.png",
        width: 1153,
        height: 373,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 330px, 25vw",
        style: cssVars({
            "--cloud-top": "11%",
            "--cloud-left": "-58vw",
            "--cloud-width": "clamp(190px, 26vw, 340px)",
            "--cloud-rotate": "0.5deg",
            "--cloud-mid-x": "98vw",
            "--cloud-end-x": "170vw",
            "--cloud-mid-y": "3px",
            "--cloud-end-y": "-3px",
            "--cloud-duration": "138s",
            "--cloud-delay": "-96s",
        }),
    },
    {
        key: "cloudy-wisp-high-thread",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 260px, 20vw",
        style: cssVars({
            "--cloud-top": "7%",
            "--cloud-left": "-30vw",
            "--cloud-width": "clamp(150px, 20vw, 260px)",
            "--cloud-rotate": "-3deg",
            "--cloud-mid-x": "68vw",
            "--cloud-end-x": "140vw",
            "--cloud-mid-y": "-5px",
            "--cloud-end-y": "2px",
            "--cloud-duration": "148s",
            "--cloud-delay": "-78s",
        }),
    },
    {
        key: "cloudy-wisp-crown",
        src: "/hero/clean/02_cloud_wisp_2.png",
        width: 1008,
        height: 265,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 310px, 24vw",
        style: cssVars({
            "--cloud-top": "0.5%",
            "--cloud-left": "-54vw",
            "--cloud-width": "clamp(180px, 24vw, 310px)",
            "--cloud-rotate": "-2deg",
            "--cloud-mid-x": "94vw",
            "--cloud-end-x": "166vw",
            "--cloud-mid-y": "2px",
            "--cloud-end-y": "-2px",
            "--cloud-duration": "176s",
            "--cloud-delay": "-158s",
        }),
    },
    {
        key: "cloudy-wisp-main-fill",
        src: "/hero/clean/02_cloud_wisp_3.png",
        width: 1153,
        height: 373,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 380px, 29vw",
        style: cssVars({
            "--cloud-top": "8%",
            "--cloud-left": "-64vw",
            "--cloud-width": "clamp(220px, 29vw, 380px)",
            "--cloud-rotate": "1deg",
            "--cloud-mid-x": "106vw",
            "--cloud-end-x": "178vw",
            "--cloud-mid-y": "-3px",
            "--cloud-end-y": "2px",
            "--cloud-duration": "118s",
            "--cloud-delay": "-104s",
        }),
    },
    {
        key: "cloudy-wisp-close-soft",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 340px, 26vw",
        style: cssVars({
            "--cloud-top": "15%",
            "--cloud-left": "-48vw",
            "--cloud-width": "clamp(200px, 26vw, 340px)",
            "--cloud-rotate": "-1deg",
            "--cloud-mid-x": "88vw",
            "--cloud-end-x": "160vw",
            "--cloud-mid-y": "4px",
            "--cloud-end-y": "-2px",
            "--cloud-duration": "104s",
            "--cloud-delay": "-18s",
        }),
    },
    {
        key: "cloudy-wisp-low-bank",
        src: "/hero/clean/02_cloud_wisp_2.png",
        width: 1008,
        height: 265,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 320px, 25vw",
        style: cssVars({
            "--cloud-top": "18%",
            "--cloud-left": "-58vw",
            "--cloud-width": "clamp(190px, 25vw, 320px)",
            "--cloud-rotate": "2deg",
            "--cloud-mid-x": "98vw",
            "--cloud-end-x": "170vw",
            "--cloud-mid-y": "-4px",
            "--cloud-end-y": "2px",
            "--cloud-duration": "134s",
            "--cloud-delay": "-62s",
        }),
    },
    {
        key: "cloudy-wisp-steady-veil",
        src: "/hero/clean/02_cloud_wisp_3.png",
        width: 1153,
        height: 373,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 440px, 34vw",
        style: cssVars({
            "--cloud-top": "5%",
            "--cloud-left": "-72vw",
            "--cloud-width": "clamp(250px, 34vw, 440px)",
            "--cloud-rotate": "-1deg",
            "--cloud-mid-x": "124vw",
            "--cloud-end-x": "196vw",
            "--cloud-mid-y": "-4px",
            "--cloud-end-y": "2px",
            "--cloud-duration": "210s",
            "--cloud-delay": "-74s",
        }),
    },
    {
        key: "cloudy-wisp-steady-bank",
        src: "/hero/clean/02_cloud_wisp_1.png",
        width: 1133,
        height: 185,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 390px, 30vw",
        style: cssVars({
            "--cloud-top": "14%",
            "--cloud-left": "-20vw",
            "--cloud-width": "clamp(230px, 30vw, 390px)",
            "--cloud-rotate": "1deg",
            "--cloud-mid-x": "70vw",
            "--cloud-end-x": "142vw",
            "--cloud-mid-y": "3px",
            "--cloud-end-y": "-3px",
            "--cloud-duration": "188s",
            "--cloud-delay": "-86s",
        }),
    },
    {
        key: "cloudy-wisp-gap-cover",
        src: "/hero/clean/02_cloud_wisp_2.png",
        width: 1008,
        height: 265,
        className: "hero-cloud-asset cloud-wisp cloudy-extra-cloud",
        sizes: "(min-width: 1280px) 360px, 28vw",
        style: cssVars({
            "--cloud-top": "9%",
            "--cloud-left": "-20vw",
            "--cloud-width": "clamp(210px, 28vw, 360px)",
            "--cloud-rotate": "2deg",
            "--cloud-mid-x": "60vw",
            "--cloud-end-x": "134vw",
            "--cloud-mid-y": "-3px",
            "--cloud-end-y": "2px",
            "--cloud-duration": "152s",
            "--cloud-delay": "-72s",
        }),
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

const createSetTwoBirdFlocks = (): SetTwoBird[] => {
    const rand = mulberry32(HERO_BOTANICAL_SEED ^ 0x62697264);
    const groups = [
        { count: 5, top: 8, spread: 1.4, phase: -7, duration: 56 },
        { count: 4, top: 15, spread: 1.8, phase: -22, duration: 63 },
        { count: 4, top: 24, spread: 1.6, phase: -39, duration: 72 },
        { count: 5, top: 31, spread: 1.5, phase: -57, duration: 78 },
        { count: 3, top: 11, spread: 2, phase: -69, duration: 86 },
    ];

    return groups.flatMap((group, groupIndex) => {
        const baseDuration = randomRange(rand, group.duration - 5, group.duration + 7);
        const baseDelay = randomRange(rand, group.phase - 4, group.phase + 4);
        const baseStartX = randomRange(rand, -24, -14);
        const baseQuarterX = randomRange(rand, 18, 30);
        const baseMidX = randomRange(rand, 44, 62);
        const baseLateX = randomRange(rand, 78, 94);
        const baseEndX = randomRange(rand, 114, 124);
        const baseStartY = randomRange(rand, -12, 12);
        const baseQuarterY = randomRange(rand, -18, 14);
        const baseMidY = randomRange(rand, -24, 18);
        const baseLateY = randomRange(rand, -20, 16);
        const baseEndY = randomRange(rand, -18, 12);
        const flockSize = randomRange(rand, 0.68, 1.08, 2);
        const flockWidth = `clamp(${randomRange(rand, 9, 15)}px, ${randomRange(rand, 0.82, 1.38, 2)}vw, ${randomRange(rand, 17, 29)}px)`;
        const flockStartScale = randomRange(rand, 0.38, 0.58, 2) * flockSize;
        const flockQuarterScale = randomRange(rand, 0.45, 0.64, 2) * flockSize;
        const flockMidScale = randomRange(rand, 0.48, 0.68, 2) * flockSize;
        const flockLateScale = randomRange(rand, 0.43, 0.62, 2) * flockSize;
        const flockEndScale = randomRange(rand, 0.34, 0.54, 2) * flockSize;

        return Array.from({ length: group.count }, (_, birdIndex) => {
            const formation = FLOCK_FORMATION[birdIndex % FLOCK_FORMATION.length];
            const jitterX = randomRange(rand, -0.8, 0.8, 1);
            const jitterY = randomRange(rand, -2.2, 2.2, 1);
            const top = randomRange(rand, group.top - group.spread, group.top + group.spread) + formation.y * 0.12;
            const opacity = randomRange(rand, 0.26, 0.48, 2);

            return {
                key: `set-two-bird-${groupIndex}-${birdIndex}`,
                style: cssVars({
                    "--bird-top": `${top}%`,
                    "--bird-width": flockWidth,
                    "--bird-opacity": `${opacity}`,
                    "--bird-duration": `${baseDuration + randomRange(rand, -3.5, 3.5)}s`,
                    "--bird-delay": `${baseDelay + randomRange(rand, -1.8, 1.8, 1)}s`,
                    "--bird-wing-delay": `${randomRange(rand, -0.76, -0.04, 2)}s`,
                    "--bird-wing-duration": `${randomRange(rand, 0.7, 0.94, 2)}s`,
                    "--bird-start-x": `${baseStartX + formation.x + jitterX}vw`,
                    "--bird-quarter-x": `${baseQuarterX + formation.x + jitterX}vw`,
                    "--bird-mid-x": `${baseMidX + formation.x + jitterX}vw`,
                    "--bird-late-x": `${baseLateX + formation.x + jitterX}vw`,
                    "--bird-end-x": `${baseEndX + formation.x + jitterX}vw`,
                    "--bird-start-y": `${baseStartY + formation.y + jitterY}px`,
                    "--bird-quarter-y": `${baseQuarterY + formation.y + jitterY}px`,
                    "--bird-mid-y": `${baseMidY + formation.y + jitterY}px`,
                    "--bird-late-y": `${baseLateY + formation.y + jitterY}px`,
                    "--bird-end-y": `${baseEndY + formation.y + jitterY}px`,
                    "--bird-start-scale": `${flockStartScale}`,
                    "--bird-quarter-scale": `${flockQuarterScale}`,
                    "--bird-mid-scale": `${flockMidScale}`,
                    "--bird-late-scale": `${flockLateScale}`,
                    "--bird-end-scale": `${flockEndScale}`,
                    "--bird-start-rotate": `${randomRange(rand, -3, 3)}deg`,
                    "--bird-quarter-rotate": `${randomRange(rand, -5, 4)}deg`,
                    "--bird-mid-rotate": `${randomRange(rand, -4, 5)}deg`,
                    "--bird-late-rotate": `${randomRange(rand, -5, 4)}deg`,
                    "--bird-end-rotate": `${randomRange(rand, -3, 3)}deg`,
                }),
            };
        });
    });
};

const SET_TWO_BIRDS = createSetTwoBirdFlocks();

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
        key: "side-plant-right",
        src: "/hero/clean/plants_02.png",
        width: 1045,
        height: 1405,
        className: "png-asset side-plant side-plant-right",
        sizes: "(min-width: 1280px) 380px, 27vw",
    },
];

const HERO_08_ASSETS: BotanicalPngAsset[] = [];

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

function getRandomizedCloudAssets(
    seed: number,
    weatherCondition: WeatherCondition,
): BotanicalPngAsset[] {
    const rng = mulberry32(seed ^ (WEATHER_CLOUD_SEED[weatherCondition] ?? 0));
    const variants = RAIN_CLOUD_WEATHER.has(weatherCondition) ? RAIN_CLOUD_VARIANTS : CLOUD_VARIANTS;
    const variantPool = CLOUD_VARIANT_POOLS[weatherCondition] ?? DEFAULT_CLOUD_VARIANT_POOL;
    let lastVariantIndex = -1;

    return CLOUD_ASSETS.map((asset, index) => {
        let variantIndex = variantPool[Math.floor(rng() * variantPool.length)] ?? 0;
        let attempts = 0;

        while (variantIndex === lastVariantIndex && attempts < 3) {
            variantIndex = variantPool[Math.floor(rng() * variantPool.length)] ?? 0;
            attempts += 1;
        }

        if (variantIndex === lastVariantIndex) {
            variantIndex = (variantIndex + 1 + (index % (variants.length - 1))) % variants.length;
        }

        lastVariantIndex = variantIndex;
        const variant = variants[variantIndex] ?? variants[0];

        return {
            ...asset,
            src: variant.src,
            width: variant.width,
            height: variant.height,
        };
    });
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
    const [cloudSeed, setCloudSeed] = useState(HERO_CLOUD_SEED);

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

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            setCloudSeed((Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0);
        });
        return () => window.cancelAnimationFrame(frame);
    }, []);

    const randomizedCloudAssets = useMemo(
        () => getRandomizedCloudAssets(cloudSeed, resolvedWeatherCondition),
        [cloudSeed, resolvedWeatherCondition],
    );

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
                {randomizedCloudAssets.map((asset) => (
                    <Image
                        key={asset.key}
                        src={asset.src}
                        alt=""
                        className={asset.className}
                        width={asset.width}
                        height={asset.height}
                        sizes={asset.sizes}
                        style={asset.style}
                    />
                ))}
            </div>
            <div className="set-two-bird-flocks" aria-hidden>
                {SET_TWO_BIRDS.map((bird) => (
                    <div key={bird.key} className="set-two-bird" style={bird.style}>
                        <span />
                    </div>
                ))}
            </div>
            <div className="hero-08-assets" aria-hidden>
                {HERO_08_ASSETS.map((asset) => (
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

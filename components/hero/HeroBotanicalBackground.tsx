"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { mixHex, mulberry32 } from "@/lib/hero-scene-seed";
import type { WeatherCondition } from "@/lib/weather";
import "./hero-botanical-background.css";

const HERO_BOTANICAL_SEED = 0x646f6e64; // "dond" — stable layout
const SHOW_PREVIEW_TOGGLE = process.env.NODE_ENV === "development";

const HILLS_SVG = `
<svg viewBox="0 0 1280 800" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
  <path d="M0 520 Q 200 460 400 480 Q 600 500 800 460 Q 1000 420 1280 450 L 1280 800 L 0 800 Z" fill="#b8ad7a" opacity="0.72"/>
  <path d="M0 560 Q 180 510 360 520 Q 540 530 720 500 Q 900 470 1080 490 Q 1180 500 1280 490 L 1280 800 L 0 800 Z" fill="#8fa15d" opacity="0.82"/>
  <path d="M0 600 Q 160 570 320 580 Q 480 590 640 570 Q 820 550 980 565 Q 1150 580 1280 570 L 1280 800 L 0 800 Z" fill="#587f42" opacity="0.9"/>
  <path d="M0 635 Q 160 610 330 620 Q 510 630 690 606 Q 850 586 1010 604 Q 1160 620 1280 608 L 1280 800 L 0 800 Z" fill="#376b3b" opacity="0.42"/>
  ${Array.from({ length: 58 }, (_, i) => {
      const x = 20 + ((i * 53) % 1240);
      const y = 545 + ((i * 29) % 105);
      const rx = 7 + (i % 5) * 2.5;
      const ry = 2.5 + (i % 4);
      const fill = ["#6f944a", "#789b51", "#496f37", "#9aa861"][i % 4];
      const opacity = 0.22 + (i % 3) * 0.08;
      return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" opacity="${opacity}"/>`;
  }).join("")}
</svg>`;

type Rng = () => number;
type ResolvedTimeOfDay = "morning" | "sunset" | "night";

type WeatherResponse = {
    condition?: WeatherCondition;
};

type TimePreviewMode = "auto" | ResolvedTimeOfDay;
type WeatherPreviewMode = "auto" | WeatherCondition;

function cloudSvg(w: number, h: number) {
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="${w * 0.25}" cy="${h * 0.7}" rx="${w * 0.22}" ry="${h * 0.38}" fill="#fff" opacity="0.85"/>
  <ellipse cx="${w * 0.5}" cy="${h * 0.55}" rx="${w * 0.3}" ry="${h * 0.48}" fill="#fff" opacity="0.9"/>
  <ellipse cx="${w * 0.75}" cy="${h * 0.65}" rx="${w * 0.25}" ry="${h * 0.4}" fill="#fff" opacity="0.82"/>
  <ellipse cx="${w * 0.45}" cy="${h * 0.45}" rx="${w * 0.2}" ry="${h * 0.35}" fill="#fff" opacity="0.78"/>
  <ellipse cx="${w * 0.5}" cy="${h * 0.85}" rx="${w * 0.45}" ry="${h * 0.14}" fill="#b8c6cf" opacity="0.4"/>
</svg>`;
}

function getTimeOfDay(date = new Date()): ResolvedTimeOfDay {
    const hour = date.getHours();
    if (hour >= 5 && hour < 17) return "morning";
    if (hour >= 17 && hour < 20) return "sunset";
    return "night";
}

function orchardSvg(x: number, y: number, rows: number, cols: number): string {
    return Array.from({ length: rows * cols }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = x + col * 22 + row * 7;
        const cy = y + row * 16;
        const fill = (row + col) % 2 === 0 ? "#5f8340" : "#476f38";
        return `<g opacity="0.92">
          <line x1="${cx}" y1="${cy + 8}" x2="${cx}" y2="${cy + 20}" stroke="#6f4b2a" stroke-width="2"/>
          <ellipse cx="${cx}" cy="${cy + 6}" rx="10" ry="12" fill="${fill}"/>
          <ellipse cx="${cx - 3}" cy="${cy + 2}" rx="5" ry="6" fill="#8aa85a" opacity="0.42"/>
        </g>`;
    }).join("");
}

function casaClubVillageSvg(x: number, y: number): string {
    const terraceUmbrellas = [84, 116, 148, 180].map((ux, i) => {
        const opacity = i === 0 || i === 3 ? 0.78 : 0.9;
        return `<g opacity="${opacity}">
          <line x1="${ux}" y1="23" x2="${ux}" y2="31" stroke="#8a6b4d" stroke-width="0.9"/>
          <path d="M${ux - 13} 23 Q ${ux} 14 ${ux + 13} 23 Z" fill="#d7bf96" stroke="#b7976c" stroke-width="0.45"/>
          <path d="M${ux - 9} 23 Q ${ux} 18 ${ux + 9} 23" fill="none" stroke="#b7976c" stroke-width="0.45" opacity="0.68"/>
        </g>`;
    }).join("");
    const upperWindows = [76, 104, 132, 160].map((wx, i) => {
        const tint = i === 2 ? "#b8d0d4" : "#b7c7bd";
        return `<g>
          <rect x="${wx}" y="63" width="16" height="27" rx="1" fill="#8d6747" opacity="0.42"/>
          <rect class="window-lit" x="${wx + 3}" y="66" width="10" height="21" rx="1" fill="${tint}" opacity="0.5"/>
          <line x1="${wx + 8}" y1="66" x2="${wx + 8}" y2="87" stroke="#755a3e" stroke-width="0.55" opacity="0.45"/>
        </g>`;
    }).join("");
    const groundBays = Array.from({ length: 6 }, (_, i) => {
        const bx = 58 + i * 25;
        return `<g>
          <rect x="${bx}" y="98" width="17" height="29" fill="#6f5037" opacity="0.78"/>
          <rect class="window-lit" x="${bx + 2}" y="101" width="13" height="23" fill="#b7c6bd" opacity="0.35"/>
          <line x1="${bx + 8.5}" y1="101" x2="${bx + 8.5}" y2="124" stroke="#3d2c1d" stroke-width="0.6" opacity="0.46"/>
        </g>`;
    }).join("");
    const porchColumns = Array.from({ length: 8 }, (_, i) => {
        const cx = 48 + i * 25;
        return `<rect x="${cx}" y="95" width="3" height="33" fill="#9f7654" opacity="0.82"/>`;
    }).join("");
    const roofSlats = Array.from({ length: 15 }, (_, i) => {
        const sx = 44 + i * 12;
        return `<line x1="${sx}" y1="93" x2="${sx + 6}" y2="89" stroke="#8a5f3d" stroke-width="0.75" opacity="0.48"/>`;
    }).join("");
    const railingPosts = Array.from({ length: 6 }, (_, i) => {
        const rx = 69 + i * 21;
        return `<line x1="${rx}" y1="27" x2="${rx}" y2="48" stroke="#6e8d95" stroke-width="0.55" opacity="0.58"/>`;
    }).join("");

    return `<g transform="translate(${x} ${y}) scale(1.1)">
      <ellipse cx="112" cy="131" rx="126" ry="7" fill="#6e5a38" opacity="0.16"/>
      <rect x="0" y="8" width="44" height="120" fill="#d7b487" opacity="0.98"/>
      <rect x="-8" y="23" width="10" height="105" fill="#a87a5b" opacity="0.42"/>
      <rect x="36" y="42" width="20" height="44" fill="#8a694f" opacity="0.34"/>
      <rect x="40" y="48" width="12" height="28" fill="#b9c8c1" opacity="0.42"/>
      <rect x="42" y="50" width="170" height="78" fill="#dfbd91" opacity="0.98"/>
      <rect x="58" y="30" width="136" height="47" fill="#e7caa0" opacity="0.98"/>
      <rect x="185" y="30" width="9" height="47" fill="#b7865f" opacity="0.28"/>
      <rect x="48" y="27" width="150" height="4" fill="#f4ddb8" opacity="0.64"/>
      <rect x="64" y="28" width="124" height="20" fill="#83b8c5" opacity="0.36"/>
      <rect x="64" y="43" width="124" height="6" fill="#63a7bf" opacity="0.34"/>
      <rect x="62" y="26" width="128" height="2" fill="#eef7f5" opacity="0.78"/>
      <rect x="62" y="26" width="128" height="23" fill="none" stroke="#6e8d95" stroke-width="0.75" opacity="0.44"/>
      ${railingPosts}
      ${terraceUmbrellas}
      ${upperWindows}
      <rect x="38" y="89" width="181" height="6" fill="#8b5d38" opacity="0.78"/>
      <rect x="38" y="95" width="181" height="2" fill="#5d3c28" opacity="0.48"/>
      ${roofSlats}
      ${groundBays}
      ${porchColumns}
      <rect x="203" y="70" width="23" height="58" fill="#d0a679" opacity="0.82"/>
      <rect x="204" y="76" width="21" height="4" fill="#8b5d38" opacity="0.66"/>
      ${[207, 216, 225].map((cx) => `<rect x="${cx}" y="80" width="2" height="48" fill="#8b5d38" opacity="0.7"/>`).join("")}
      ${[207, 216, 225].map((cx) => `<line x1="${cx - 2}" y1="75" x2="${cx + 7}" y2="68" stroke="#8b5d38" stroke-width="0.8" opacity="0.58"/>`).join("")}
      <rect x="48" y="124" width="154" height="4" fill="#cda77c" opacity="0.64"/>
    </g>`;
}

function buildHousesSvg(rng: Rng): string {
    const houses: string[] = [];
    let x = 78;
    const template = [
        { w: 38, h: 42, roof: "flat" as const, color: "#d4a88a" },
        { w: 44, h: 46, roof: "pitch" as const, color: "#c89572" },
        { w: 32, h: 38, roof: "flat" as const, color: "#e8c8a8" },
        { w: 40, h: 40, roof: "pitch" as const, color: "#b8855a" },
        { w: 36, h: 44, roof: "flat" as const, color: "#dab890" },
        { w: 42, h: 40, roof: "pitch" as const, color: "#c89572" },
        { w: 34, h: 36, roof: "flat" as const, color: "#e8c8a8" },
    ];
    template.slice(0, 4).forEach((h, index) => {
        const y = 152 - h.h - (index % 3) * 2;
        houses.push(
            `<rect x="${x}" y="${y}" width="${h.w}" height="${h.h}" fill="${h.color}" opacity="0.88"/>`,
        );
        houses.push(`<rect x="${x - 3}" y="${y - 5}" width="${h.w + 6}" height="5" fill="#b98c6a" opacity="0.82"/>`);
        houses.push(
            `<rect class="window-lit window-lit-small" x="${x + h.w * 0.25}" y="${y + h.h * 0.4}" width="${h.w * 0.15}" height="${h.h * 0.25}" fill="#3a2a1a" opacity="0.5"/>`,
        );
        if (h.w > 38) {
            houses.push(
                `<rect class="window-lit window-lit-small" x="${x + h.w * 0.6}" y="${y + h.h * 0.4}" width="${h.w * 0.15}" height="${h.h * 0.25}" fill="#3a2a1a" opacity="0.5"/>`,
            );
        }
        x += h.w + 2 + rng() * 4;
    });
    x = 878;
    template.slice(2).concat(template.slice(0, 5)).forEach((h, index) => {
        const y = 152 - h.h - (index % 2) * 3;
        houses.push(`<rect x="${x}" y="${y}" width="${h.w}" height="${h.h}" fill="${h.color}" opacity="0.88"/>`);
        houses.push(`<rect x="${x - 3}" y="${y - 5}" width="${h.w + 6}" height="5" fill="#b98c6a" opacity="0.82"/>`);
        houses.push(`<rect class="window-lit window-lit-small" x="${x + h.w * 0.25}" y="${y + h.h * 0.4}" width="${h.w * 0.15}" height="${h.h * 0.25}" fill="#3a2a1a" opacity="0.5"/>`);
        if (h.w > 38) {
            houses.push(`<rect class="window-lit window-lit-small" x="${x + h.w * 0.6}" y="${y + h.h * 0.4}" width="${h.w * 0.15}" height="${h.h * 0.25}" fill="#3a2a1a" opacity="0.5"/>`);
        }
        x += h.w + 2 + rng() * 4;
    });
    const trees = Array.from({ length: 7 }, (_, i) => {
        const tx = 640 + i * 76 + rng() * 18;
        const ty = 152 - 20 - rng() * 15;
        return `<ellipse cx="${tx}" cy="${ty}" rx="15" ry="19" fill="${i % 2 === 0 ? "#476f38" : "#5f8340"}" opacity="0.92"/>
          <ellipse cx="${tx - 4}" cy="${ty - 5}" rx="9" ry="11" fill="#7f9f55" opacity="0.42"/>`;
    }).join("");
    return `<svg viewBox="0 0 1280 160" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      ${casaClubVillageSvg(270, 14)}
      ${orchardSvg(516, 98, 3, 6)}
      ${houses.join("")}
      ${trees}
    </svg>`;
}

function agapantoSvg(scale: number): string {
    const w = 120 * scale;
    const h = 320 * scale;
    const flowers22 = Array.from({ length: 22 }, (_, i) => {
        const angle = (i / 22) * Math.PI * 2;
        const r = 22 + (i % 3) * 3;
        const cx = Math.cos(angle) * r;
        const cy = Math.sin(angle) * r * 0.8;
        const size = 4 + (i % 3);
        const shade = i % 2 === 0 ? "#c4d3e0" : "#a8bccf";
        return `<ellipse cx="${cx}" cy="${cy}" rx="${size}" ry="${size * 1.3}" fill="${shade}" opacity="0.9"/>`;
    }).join("");
    const flowers14 = Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2 + 0.3;
        const r = 12;
        const cx = Math.cos(angle) * r;
        const cy = Math.sin(angle) * r * 0.8;
        return `<ellipse cx="${cx}" cy="${cy}" rx="4" ry="5" fill="#dfe8f0" opacity="0.95"/>`;
    }).join("");
    return `<svg viewBox="0 0 120 320" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 320 Q 40 250 20 200 Q 10 160 18 140" stroke="#3d5128" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M60 320 Q 55 260 48 210 Q 42 170 50 150" stroke="#4a6033" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M68 320 Q 75 255 90 210 Q 105 170 100 150" stroke="#3d5128" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M55 320 Q 58 280 62 240 Q 68 200 80 170" stroke="#5a7340" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M60 320 Q 61 200 62 80" stroke="#4a6033" stroke-width="3" fill="none"/>
        <g transform="translate(62, 70)">${flowers22}${flowers14}
          <ellipse cx="-8" cy="-6" rx="3" ry="3.5" fill="#f0f4f8" opacity="0.9"/>
          <ellipse cx="6" cy="-10" rx="2.5" ry="3" fill="#f0f4f8" opacity="0.9"/>
        </g>
      </svg>`;
}

function salviaSvg(scale: number): string {
    const w = 80 * scale;
    const h = 280 * scale;
    const florets = Array.from({ length: 16 }, (_, i) => {
        const y = 130 - i * 7;
        const side = i % 2 === 0 ? -1 : 1;
        const x = 40 + side * 5;
        const color = i % 3 === 0 ? "#dfe8f0" : "#b8c7d1";
        return `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="${color}" opacity="0.9"/><ellipse cx="${x + side * 3}" cy="${y - 1}" rx="3" ry="2" fill="#8fa3b4" opacity="0.85"/>`;
    }).join("");
    return `<svg viewBox="0 0 80 280" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 280 Q 39 200 40 100 Q 41 60 42 30" stroke="#415a2e" stroke-width="2.5" fill="none"/>
        <path d="M40 240 Q 20 235 10 220 Q 20 230 40 234 Z" fill="#5a7340" opacity="0.9"/>
        <path d="M40 220 Q 62 215 72 200 Q 60 212 40 216 Z" fill="#4a6033" opacity="0.9"/>
        <path d="M40 190 Q 18 185 8 170 Q 20 182 40 186 Z" fill="#5a7340" opacity="0.9"/>
        <path d="M40 170 Q 60 165 70 150 Q 58 162 40 166 Z" fill="#4a6033" opacity="0.9"/>
        ${florets}
        <ellipse cx="42" cy="20" rx="4" ry="6" fill="#8fa3b4" opacity="0.85"/>
      </svg>`;
}

function pastoSvg(scale: number, rng: Rng): string {
    const w = 100 * scale;
    const h = 260 * scale;
    const blades = Array.from({ length: 9 }, (_, i) => {
        const startX = 40 + (rng() - 0.5) * 30;
        const endX = startX + (rng() - 0.5) * 70;
        const curveX = startX + (endX - startX) * 0.5 + (rng() - 0.5) * 20;
        const height = 180 + rng() * 70;
        const shade = ["#5a7340", "#6b8549", "#7a9454", "#4a6033"][i % 4];
        const sw = 1.5 + rng();
        return `<path d="M${startX} 260 Q ${curveX} ${260 - height * 0.5} ${endX} ${260 - height}" stroke="${shade}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>`;
    }).join("");
    const seeds = Array.from({ length: 4 }, (_, i) => {
        const x = 30 + i * 15;
        const y = 60 + rng() * 30;
        return `<ellipse cx="${x}" cy="${y}" rx="3" ry="8" fill="#c8bd8c" opacity="0.85"/>`;
    }).join("");
    return `<svg viewBox="0 0 100 260" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${blades}${seeds}</svg>`;
}

function lavandaSvg(scale: number): string {
    const w = 60 * scale;
    const h = 240 * scale;
    const cluster = Array.from({ length: 18 }, (_, i) => {
        const y = 110 - i * 4;
        const side = (i % 2 === 0 ? -1 : 1) * (1 + (i % 3) * 0.5);
        const x = 30 + side * 2;
        return `<circle cx="${x}" cy="${y}" r="2.2" fill="#c4d3e0" opacity="0.9"/>`;
    }).join("");
    return `<svg viewBox="0 0 60 240" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 240 L 30 110" stroke="#5a7340" stroke-width="1.8" fill="none"/>
        <path d="M25 200 L 18 180" stroke="#5a7340" stroke-width="1.5" fill="none"/>
        <path d="M35 180 L 42 160" stroke="#5a7340" stroke-width="1.5" fill="none"/>
        ${cluster}
        <circle cx="30" cy="38" r="2.5" fill="#dfe8f0"/>
      </svg>`;
}

function hojaGrandeSvg(scale: number): string {
    const w = 200 * scale;
    const h = 240 * scale;
    return `<svg viewBox="0 0 200 240" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 240 Q 95 180 90 130 Q 85 80 75 40" stroke="#3d5128" stroke-width="3" fill="none"/>
        <g transform="translate(75, 40)">
          <path d="M0 0 Q -50 20 -60 70 Q -55 110 -10 120 Q 30 110 35 70 Q 30 20 0 0 Z" fill="#4a6033" opacity="0.95"/>
          <path d="M-5 10 Q -35 30 -40 65 Q -37 95 -10 100" stroke="#3d5128" stroke-width="1.2" fill="none"/>
          <path d="M-5 10 Q 10 30 15 60 Q 13 90 -10 100" stroke="#3d5128" stroke-width="1" fill="none" opacity="0.6"/>
          <path d="M-15 20 Q -35 35 -40 65" stroke="#7a9454" stroke-width="0.8" fill="none" opacity="0.7"/>
        </g>
        <g transform="translate(100, 90) rotate(-15)">
          <path d="M0 0 Q -40 15 -48 55 Q -44 90 -5 95 Q 25 88 30 55 Q 25 15 0 0 Z" fill="#5a7340" opacity="0.95"/>
          <path d="M-3 8 Q -28 25 -32 55 Q -30 80 -5 85" stroke="#3d5128" stroke-width="1" fill="none"/>
        </g>
        <g transform="translate(120, 160) rotate(20)">
          <path d="M0 0 Q -35 12 -42 48 Q -38 78 -4 82 Q 22 76 26 48 Q 22 12 0 0 Z" fill="#415a2e" opacity="0.95"/>
          <path d="M-3 7 Q -24 22 -28 48 Q -26 70 -4 74" stroke="#2a3e1c" stroke-width="1" fill="none"/>
        </g>
      </svg>`;
}

function florBlancaSvg(scale: number): string {
    const w = 80 * scale;
    const h = 200 * scale;
    const clusters = (
        [
            [0, 0],
            [-12, -5],
            [10, -8],
            [-5, -15],
            [12, -18],
            [-15, -22],
            [5, -25],
            [-3, -32],
            [14, -10],
            [-8, 2],
        ] as const
    )
        .map(([x, y]) => {
            const petals = Array.from({ length: 5 }, (_, i) => {
                const a = (i / 5) * Math.PI * 2;
                const px = Math.cos(a) * 3.5;
                const py = Math.sin(a) * 3.5;
                const rot = (a * 180) / Math.PI;
                return `<ellipse cx="${px}" cy="${py}" rx="2.5" ry="3.5" fill="#f0ebdc" transform="rotate(${rot}, ${px}, ${py})" opacity="0.95"/>`;
            }).join("");
            return `<g transform="translate(${x}, ${y})">${petals}<circle cx="0" cy="0" r="1.5" fill="#c8a550"/></g>`;
        })
        .join("");
    return `<svg viewBox="0 0 80 200" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 200 Q 38 140 40 80" stroke="#4a6033" stroke-width="1.8" fill="none"/>
        <path d="M40 170 Q 22 168 15 155 Q 28 165 40 166 Z" fill="#5a7340"/>
        <path d="M40 140 Q 58 138 65 125 Q 52 135 40 136 Z" fill="#5a7340"/>
        <g transform="translate(40, 70)">${clusters}</g>
      </svg>`;
}

function olivoSvg(scale: number): string {
    const w = 180 * scale;
    const h = 120 * scale;
    const leaves = Array.from({ length: 12 }, (_, i) => {
        const t = i / 11;
        const x = 10 + t * 160;
        const y = 78 - t * 38;
        const side = i % 2 === 0 ? -1 : 1;
        const lx = x + side * 2;
        const ly = y + side * 3;
        const rot = -20 + side * 30;
        return `<ellipse cx="${lx}" cy="${ly}" rx="12" ry="3.5" fill="#8a9d6a" opacity="0.9" transform="rotate(${rot}, ${lx}, ${ly})"/>
            <ellipse cx="${lx}" cy="${ly}" rx="12" ry="3.5" fill="none" stroke="#5a7340" stroke-width="0.8" transform="rotate(${rot}, ${lx}, ${ly})"/>`;
    }).join("");
    return `<svg viewBox="0 0 180 120" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 80 Q 60 70 120 55 Q 150 48 175 40" stroke="#5a5a3a" stroke-width="1.8" fill="none"/>
        ${leaves}
      </svg>`;
}

type PlantName = "hojaGrande" | "agapanto" | "pasto" | "salvia" | "lavanda" | "florBlanca" | "olivo";

type PlantRow = {
    name: PlantName;
    left: number;
    scale: number;
    rot: number;
    z: number;
    mod: string;
};

const PLANT_CONFIG: PlantRow[] = [
    { name: "hojaGrande", left: -8, scale: 1.1, rot: -10, z: 8, mod: "" },
    { name: "agapanto", left: 3, scale: 0.85, rot: -5, z: 9, mod: "slow" },
    { name: "pasto", left: 8, scale: 0.9, rot: 0, z: 7, mod: "" },
    { name: "salvia", left: 14, scale: 0.75, rot: 3, z: 8, mod: "fast" },
    { name: "lavanda", left: 18, scale: 0.7, rot: -4, z: 7, mod: "" },
    { name: "florBlanca", left: 10, scale: 0.8, rot: 2, z: 9, mod: "reverse" },
    { name: "pasto", left: 22, scale: 0.8, rot: -2, z: 6, mod: "slow" },
    { name: "hojaGrande", left: 92, scale: 1.0, rot: 12, z: 8, mod: "reverse" },
    { name: "agapanto", left: 84, scale: 0.9, rot: 4, z: 9, mod: "" },
    { name: "salvia", left: 78, scale: 0.8, rot: -3, z: 8, mod: "slow" },
    { name: "pasto", left: 72, scale: 0.85, rot: 0, z: 7, mod: "fast" },
    { name: "lavanda", left: 82, scale: 0.75, rot: 5, z: 7, mod: "reverse" },
    { name: "florBlanca", left: 88, scale: 0.8, rot: -2, z: 9, mod: "" },
    { name: "pasto", left: 68, scale: 0.75, rot: 3, z: 6, mod: "" },
    { name: "salvia", left: 30, scale: 0.55, rot: 0, z: 5, mod: "slow" },
    { name: "lavanda", left: 38, scale: 0.5, rot: -3, z: 5, mod: "" },
    { name: "salvia", left: 62, scale: 0.55, rot: 4, z: 5, mod: "reverse" },
    { name: "lavanda", left: 68, scale: 0.5, rot: 2, z: 5, mod: "slow" },
    { name: "pasto", left: 44, scale: 0.45, rot: 0, z: 4, mod: "fast" },
    { name: "pasto", left: 56, scale: 0.48, rot: 0, z: 4, mod: "" },
    { name: "olivo", left: -3, scale: 0.7, rot: -25, z: 10, mod: "slow" },
    { name: "olivo", left: 95, scale: 0.8, rot: 205, z: 10, mod: "reverse" },
    { name: "pasto", left: 35, scale: 0.38, rot: 0, z: 3, mod: "slow" },
    { name: "pasto", left: 52, scale: 0.35, rot: 0, z: 3, mod: "" },
    { name: "lavanda", left: 48, scale: 0.4, rot: -2, z: 3, mod: "reverse" },
];

function plantSvg(name: PlantName, scale: number, rng: Rng): string {
    switch (name) {
        case "agapanto":
            return agapantoSvg(scale);
        case "salvia":
            return salviaSvg(scale);
        case "pasto":
            return pastoSvg(scale, rng);
        case "lavanda":
            return lavandaSvg(scale);
        case "hojaGrande":
            return hojaGrandeSvg(scale);
        case "florBlanca":
            return florBlancaSvg(scale);
        case "olivo":
            return olivoSvg(scale);
        default:
            return "";
    }
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
};

export default function HeroBotanicalBackground({ className, initialWeatherCondition = "partly-cloudy" }: HeroBotanicalBackgroundProps) {
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
        const housesSvg = buildHousesSvg(rng);
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
        let olivoIndex = 0;
        const plants = PLANT_CONFIG.map((row, i) => {
            const svg = plantSvg(row.name, row.scale, rng);
            const delay = rng() * 6;
            const isOlivo = row.name === "olivo";
            const corner = isOlivo ? (olivoIndex++ === 0 ? "left" : "right") : null;
            return { ...row, svg, delay, i, isOlivo, corner };
        });
        const motes = Array.from({ length: 18 }, (_, i) => ({
            key: `m-${i}`,
            left: rng() * 100,
            top: 50 + rng() * 45,
            fx: (rng() - 0.5) * 100,
            fy: -40 - rng() * 80,
            delay: rng() * 14,
        }));
        const weatherClouds = [
            { key: "wc-a", cls: "cloud-a", w: 260, h: 96 },
            { key: "wc-b", cls: "cloud-b", w: 190, h: 70 },
            { key: "wc-c", cls: "cloud-c", w: 320, h: 112 },
            { key: "wc-d", cls: "cloud-d extra", w: 240, h: 86 },
            { key: "wc-e", cls: "cloud-e extra", w: 300, h: 104 },
            { key: "wc-f", cls: "cloud-f extra", w: 170, h: 62 },
            { key: "wc-g", cls: "cloud-g cloudy-only", w: 210, h: 76 },
            { key: "wc-h", cls: "cloud-h cloudy-only", w: 280, h: 96 },
            { key: "wc-i", cls: "cloud-i cloudy-only", w: 150, h: 54 },
            { key: "wc-j", cls: "cloud-j cloudy-only", w: 230, h: 82 },
            { key: "wc-k", cls: "cloud-k cloudy-only", w: 190, h: 68 },
            { key: "wc-l", cls: "cloud-l cloudy-only", w: 310, h: 106 },
            { key: "wc-m", cls: "cloud-m cloudy-only", w: 130, h: 48 },
        ];
        const rainDrops = Array.from({ length: 82 }, (_, i) => ({
            key: `rd-${i}`,
            cls: i >= 58 ? "storm-drop" : i >= 34 ? "heavy-drop" : "",
            left: (i * 19 + Math.floor(rng() * 12)) % 100,
            delay: -(rng() * 1.8),
            dur: 0.72 + rng() * 0.34,
            len: 16 + rng() * 14,
        }));
        return { housesSvg, sparkles, fountainSpans, plants, motes, weatherClouds, rainDrops };
    }, []);

    return (
        <div
            className={`hero-botanical-stage-wrap ${className ?? ""}`}
            data-time-of-day={resolvedTimeOfDay}
            data-weather={resolvedWeatherCondition}
            style={{
                ...stageBackgroundStyle(),
                ["--anim-speed" as string]: 1,
                ["--light" as string]: 1,
                ["--density" as string]: 1,
                ["--hue-shift" as string]: "0deg",
            }}
        >
            {SHOW_PREVIEW_TOGGLE ? (
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
            ) : null}
            <div className="scene-botanical">
                <div className="sky" />
                <div className="stars" aria-hidden />
                <div className="moon" aria-hidden />
                <div className="sun-glow">
                    <div className="sun-glow-inner" />
                </div>
                <div className="sun-disc" />
                <div className="weather-clouds" aria-hidden>
                    {scene.weatherClouds.map((c) => (
                        <span
                            key={c.key}
                            className={`weather-cloud ${c.cls}`}
                            style={{ width: `${c.w}px`, height: `${c.h}px`, ["--cloud-start" as string]: `-${c.w}px` }}
                            dangerouslySetInnerHTML={{ __html: cloudSvg(c.w, c.h) }}
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
                <div className="hills" dangerouslySetInnerHTML={{ __html: HILLS_SVG }} />
                <div className="houses" dangerouslySetInnerHTML={{ __html: scene.housesSvg }} />
                <div className="pond">
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
                <div className="plants">
                    {scene.plants.map((p) => {
                        const className = `plant${p.mod ? ` ${p.mod}` : ""}`;
                        const base: CSSProperties = {
                            left: `${p.left}%`,
                            zIndex: p.z,
                            transform: `rotate(${p.rot}deg)`,
                            animationDelay: `-${p.delay}s`,
                        };
                        const olivoStyle: CSSProperties =
                            p.isOlivo && p.corner
                                ? p.corner === "left"
                                    ? {
                                          bottom: "auto",
                                          top: "-20px",
                                          left: "-40px",
                                      }
                                    : {
                                          bottom: "auto",
                                          top: "-20px",
                                          left: "auto",
                                          right: "-40px",
                                      }
                                : {};
                        return (
                            <div
                                key={`plant-${p.i}-${p.name}`}
                                className={className}
                                style={{ ...base, ...olivoStyle }}
                                dangerouslySetInnerHTML={{ __html: p.svg }}
                            />
                        );
                    })}
                </div>
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
                <div
                    className="bird"
                    style={{ top: "14%", animationDelay: "-5s", zIndex: 42 }}
                    dangerouslySetInnerHTML={{
                        __html: `<svg width="28" height="14" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 12 Q 10 4 18 12 Q 26 4 34 12" stroke="#3d5128" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
                    }}
                />
                <div
                    className="bird"
                    style={{
                        top: "22%",
                        animationDelay: "-14s",
                        animationDuration: "calc(38s / var(--anim-speed, 1))",
                        zIndex: 42,
                    }}
                    dangerouslySetInnerHTML={{
                        __html: `<svg width="20" height="10" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 12 Q 10 4 18 12 Q 26 4 34 12" stroke="#3d5128" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
                    }}
                />
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

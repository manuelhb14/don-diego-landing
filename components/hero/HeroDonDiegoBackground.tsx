"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { mixHex, mulberry32 } from "@/lib/hero-scene-seed";
import "./hero-don-diego-background.css";

const HERO_DON_DIEGO_SEED = 0x64646f6e; // "ddon" — stable layout

type Rng = () => number;
type ResolvedTimeOfDay = "morning" | "sunset" | "night";

function getTimeOfDay(date = new Date()): ResolvedTimeOfDay {
    const hour = date.getHours();
    if (hour >= 5 && hour < 17) return "morning";
    if (hour >= 17 && hour < 20) return "sunset";
    return "night";
}

const HILLS_SVG = `<svg viewBox="0 0 1360 780" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
  <defs>
    <linearGradient id="dd-hill1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8b890"/><stop offset="1" stop-color="#a89870"/></linearGradient>
    <linearGradient id="dd-hill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8a880"/><stop offset="1" stop-color="#988868"/></linearGradient>
    <linearGradient id="dd-hill3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a89870"/><stop offset="1" stop-color="#887858"/></linearGradient>
  </defs>
  <path d="M0 460 Q 180 380 360 400 Q 540 420 680 390 Q 820 360 1000 385 Q 1180 410 1360 395 L1360 780 L0 780 Z" fill="#c0b898" opacity="0.45"/>
  <path d="M0 500 Q 160 440 320 455 Q 500 472 680 445 Q 860 418 1040 440 Q 1200 458 1360 445 L1360 780 L0 780 Z" fill="url(#dd-hill1)" opacity="0.6"/>
  <path d="M0 545 Q 140 505 300 515 Q 480 528 660 505 Q 840 482 1020 500 Q 1200 518 1360 505 L1360 780 L0 780 Z" fill="url(#dd-hill2)" opacity="0.7"/>
  <path d="M0 590 Q 120 565 280 572 Q 460 582 640 562 Q 820 542 1000 558 Q 1180 574 1360 562 L1360 780 L0 780 Z" fill="url(#dd-hill3)" opacity="0.72"/>
  ${Array.from({ length: 45 }, (_, i) => {
      const x = 30 + ((i * 29) % 1300);
      const y = 470 + ((i * 13) % 85);
      const r = 4 + (i % 4) * 2;
      const op = 0.4 + 0.2 * (i % 3);
      return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="#7a8a50" opacity="${op}"/>`;
  }).join("")}
</svg>`;

function villageOrchardSvg(x: number, y: number): string {
    return Array.from({ length: 18 }, (_, i) => {
        const col = i % 6;
        const row = Math.floor(i / 6);
        const cx = x + col * 22 + row * 8;
        const cy = y + row * 15;
        const fill = (row + col) % 2 === 0 ? "#7a8f5a" : "#5f7d42";
        return `<g opacity="0.88">
          <line x1="${cx}" y1="${cy + 8}" x2="${cx}" y2="${cy + 20}" stroke="#7a6040" stroke-width="2"/>
          <ellipse cx="${cx}" cy="${cy + 6}" rx="10" ry="12" fill="${fill}"/>
          <ellipse cx="${cx - 3}" cy="${cy + 2}" rx="5" ry="6" fill="#9baa70" opacity="0.42"/>
        </g>`;
    }).join("");
}

function buildVillageSvg(rng: Rng): string {
    const parts: string[] = [];
    parts.push(
        `<svg viewBox="0 0 1360 150" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">`,
    );
    parts.push(villageOrchardSvg(520, 94));
    const cols = ["#d8c4a0", "#c8a888", "#e0ceb0", "#c0a880", "#d4b898", "#b89878", "#dac8a8", "#c4b090"];
    let x = 60;
    for (let i = 0; i < 26; i++) {
        if (x > 240 && x < 860) x = 875;
        const w = 44 + rng() * 32;
        const h = 48 + rng() * 36;
        const y = 150 - h;
        const c = cols[i % cols.length];
        parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" opacity="0.97"/>`);
        parts.push(`<rect x="${x - 3}" y="${y - 4}" width="${w + 6}" height="5" fill="${c}" opacity="0.85"/>`);
        const nw = Math.floor(1 + w / 30);
        for (let j = 0; j < nw; j++) {
            const wx = x + 10 + j * (w / (nw + 0.4));
            parts.push(
                `<rect x="${wx}" y="${y + h * 0.22}" width="${w * 0.2}" height="${h * 0.35}" fill="rgba(180,210,225,0.45)" stroke="rgba(140,120,85,0.4)" stroke-width="0.8"/>`,
            );
        }
        if (h > 55) {
            parts.push(
                `<rect x="${x + 10}" y="${y + 5}" width="${w * 0.2}" height="${h * 0.2}" fill="rgba(180,210,225,0.35)"/>`,
            );
        }
        if (rng() < 0.5) {
            for (let v = 0; v < 4; v++) {
                parts.push(
                    `<line x1="${x + v * (w / 3)}" y1="${y - 4}" x2="${x + v * (w / 3)}" y2="${y - 14}" stroke="${c}" stroke-width="3" opacity="0.8"/>`,
                );
            }
            parts.push(`<rect x="${x - 5}" y="${y - 15}" width="${w + 10}" height="3" fill="${c}" opacity="0.7"/>`);
        }
        x += w + 4 + rng() * 8;
    }
    for (let i = 0; i < 12; i++) {
        const tx = 100 + i * 96 + rng() * 25;
        const ty = 150;
        const th = 24 + rng() * 14;
        parts.push(`<line x1="${tx}" y1="${ty}" x2="${tx + (rng() - 0.5) * 4}" y2="${ty - th}" stroke="#7a6040" stroke-width="3"/>`);
        parts.push(`<ellipse cx="${tx}" cy="${ty - th}" rx="${th * 0.85}" ry="${th * 0.65}" fill="#7a8f5a" opacity="0.9"/>`);
        parts.push(
            `<ellipse cx="${tx - 4}" cy="${ty - th - 4}" rx="${th * 0.55}" ry="${th * 0.4}" fill="#95a870" opacity="0.75"/>`,
        );
    }
    parts.push(`</svg>`);
    return parts.join("");
}

function buildPresaSvg(): string {
    // Simple cantera/stone dam band; intentionally subtle.
    const stones = Array.from({ length: 64 }, (_, i) => {
        const w = 18 + (i % 3) * 4;
        const h = 10 + (i % 4) * 2;
        const x = i * 22 - 20;
        const y = 70 - ((i * 7) % 18);
        const c = ["#c4b090", "#b8a480", "#a89474", "#d0c0a0"][i % 4];
        return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${c}" opacity="0.85"/>`;
    }).join("");
    return `<svg viewBox="0 0 1360 90" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">${stones}</svg>`;
}

function svgWrap(content: string, vw: number, vh: number, w: number, h: number) {
    return `<svg viewBox="0 0 ${vw} ${vh}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}

function cloudSvg(w: number, h: number) {
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="${w * 0.25}" cy="${h * 0.7}" rx="${w * 0.22}" ry="${h * 0.38}" fill="#fff" opacity="0.85"/>
  <ellipse cx="${w * 0.5}" cy="${h * 0.55}" rx="${w * 0.3}" ry="${h * 0.48}" fill="#fff" opacity="0.9"/>
  <ellipse cx="${w * 0.75}" cy="${h * 0.65}" rx="${w * 0.25}" ry="${h * 0.4}" fill="#fff" opacity="0.82"/>
  <ellipse cx="${w * 0.45}" cy="${h * 0.45}" rx="${w * 0.2}" ry="${h * 0.35}" fill="#fff" opacity="0.78"/>
  <ellipse cx="${w * 0.5}" cy="${h * 0.85}" rx="${w * 0.45}" ry="${h * 0.14}" fill="#b8c6cf" opacity="0.4"/>
</svg>`;
}

function fishSvg(flip: boolean) {
    return `<svg viewBox="0 0 32 16" width="32" height="16" xmlns="http://www.w3.org/2000/svg">
  <g transform="${flip ? "translate(32,0) scale(-1,1)" : ""}">
    <ellipse cx="14" cy="8" rx="10" ry="4.5" fill="#6a9ab0" opacity="0.82"/>
    <path d="M24 8 Q 30 4 32 8 Q 30 12 24 8 Z" fill="#6a9ab0" opacity="0.75"/>
    <ellipse cx="12" cy="7" rx="1.5" ry="1.5" fill="#1a2830" opacity="0.7"/>
    <path d="M16 5 Q 20 3 22 5" stroke="#5a8aa0" stroke-width="0.6" fill="none" opacity="0.6"/>
  </g>
</svg>`;
}

function casaClubSvg() {
    return `<svg viewBox="0 0 300 155" width="300" height="155" xmlns="http://www.w3.org/2000/svg">
  <rect x="28" y="58" width="244" height="94" fill="#d8c8a8" opacity="0.97"/>
  <rect x="58" y="22" width="184" height="54" fill="#e0d0b0" opacity="0.95"/>
  <rect x="44" y="12" width="212" height="14" fill="#bf8b5f" opacity="0.88"/>
  <rect x="50" y="16" width="200" height="7" fill="#c8b898" opacity="0.9"/>
  <rect x="24" y="52" width="252" height="8" fill="#b8a888" opacity="0.85"/>
  <rect x="96" y="22" width="108" height="24" rx="3" fill="#5ab0d0" opacity="0.82"/>
  <rect x="99" y="24" width="102" height="20" rx="2" fill="#7ac8e0" opacity="0.6"/>
  <line x1="106" y1="30" x2="194" y2="30" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
  <line x1="110" y1="38" x2="190" y2="38" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
  <rect x="91" y="19" width="118" height="5" fill="#c8b898" opacity="0.9"/>
  ${[54, 96, 138, 180, 222]
      .map(
          (x) =>
              `<rect x="${x}" y="68" width="24" height="32" rx="1" fill="rgba(160,210,230,0.45)" stroke="rgba(140,120,85,0.4)" stroke-width="0.8"/>`,
      )
      .join("")}
  ${[82, 120, 158, 196]
      .map(
          (x) =>
              `<rect x="${x}" y="32" width="20" height="18" rx="1" fill="rgba(160,210,230,0.4)" stroke="rgba(140,120,85,0.35)" stroke-width="0.7"/>`,
      )
      .join("")}
  <rect x="124" y="104" width="52" height="48" fill="rgba(140,120,85,0.2)"/>
  <path d="M124 104 Q 150 84 176 104" fill="rgba(140,120,85,0.27)"/>
  ${[34, 54, 74, 94, 114]
      .map((v) => `<line x1="${v}" y1="52" x2="${v}" y2="36" stroke="#c8b898" stroke-width="3" opacity="0.7"/>`)
      .join("")}
  ${[186, 206, 226, 246, 266]
      .map((v) => `<line x1="${v}" y1="52" x2="${v}" y2="36" stroke="#c8b898" stroke-width="3" opacity="0.7"/>`)
      .join("")}
  <rect x="90" y="136" width="120" height="7" fill="#c8b898" opacity="0.72"/>
</svg>`;
}

function grassSvg(scale: number, rng: Rng) {
    const blades = Array.from({ length: 11 }, () => {
        const startX = 55 + (rng() - 0.5) * 32;
        const endX = startX + (rng() - 0.5) * 70;
        const curveX = startX + (endX - startX) * 0.5 + (rng() - 0.5) * 20;
        const height = 150 + rng() * 80;
        const shade = ["#5a8238", "#6b9548", "#4a6a30", "#7aa058"][Math.floor(rng() * 4)];
        const sw = 1.2 + rng() * 1.1;
        return `<path d="M${startX} 260 Q ${curveX} ${260 - height * 0.55} ${endX} ${260 - height}" stroke="${shade}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>`;
    }).join("");
    const seeds = Array.from({ length: 4 }, (_, i) => {
        const x = 30 + i * 16 + rng() * 6;
        const y = 70 + rng() * 40;
        return `<ellipse cx="${x}" cy="${y}" rx="3" ry="8" fill="#d4caa8" opacity="0.75"/>`;
    }).join("");
    return svgWrap(blades + seeds, 120, 260, 120 * scale, 260 * scale);
}

function agapantoSvg(scale: number, rng: Rng) {
    const flowers = Array.from({ length: 22 }, (_, i) => {
        const angle = (i / 22) * Math.PI * 2 + rng() * 0.15;
        const r = 20 + (i % 3) * 3;
        const cx = Math.cos(angle) * r;
        const cy = Math.sin(angle) * r * 0.8;
        const size = 3.8 + (i % 3) * 0.8;
        const shade = i % 2 === 0 ? "#c8d8e8" : "#a8b8c8";
        return `<ellipse cx="${cx}" cy="${cy}" rx="${size}" ry="${size * 1.35}" fill="${shade}" opacity="0.9"/>`;
    }).join("");
    const stems = `
      <path d="M60 320 Q 55 260 48 210 Q 42 170 50 150" stroke="#4a6a30" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M62 320 Q 61 220 62 90" stroke="#547838" stroke-width="3" fill="none"/>
    `;
    return `<svg viewBox="0 0 120 320" width="${120 * scale}" height="${320 * scale}" xmlns="http://www.w3.org/2000/svg">
      ${stems}
      <g transform="translate(62, 80)">${flowers}</g>
    </svg>`;
}

function whiteFlowersSvg(scale: number, rng: Rng) {
    const clusters = Array.from({ length: 10 }, (_, i) => {
        const x = (rng() - 0.5) * 26;
        const y = -i * 4 - rng() * 6;
        const petals = Array.from({ length: 5 }, (_, j) => {
            const a = (j / 5) * Math.PI * 2;
            const px = Math.cos(a) * 3.4;
            const py = Math.sin(a) * 3.4;
            const rot = (a * 180) / Math.PI;
            return `<ellipse cx="${px}" cy="${py}" rx="2.5" ry="3.6" fill="#f8f4e8" transform="rotate(${rot}, ${px}, ${py})" opacity="0.95"/>`;
        }).join("");
        return `<g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})">${petals}<circle cx="0" cy="0" r="1.5" fill="#f0c050" opacity="0.95"/></g>`;
    }).join("");
    const stem = `<path d="M40 200 Q 38 140 40 80" stroke="#4a6a30" stroke-width="1.8" fill="none"/>`;
    const leaves = `
      <path d="M40 170 Q 22 168 15 155 Q 28 165 40 166 Z" fill="#5a8238"/>
      <path d="M40 140 Q 58 138 65 125 Q 52 135 40 136 Z" fill="#5a8238"/>
    `;
    return `<svg viewBox="0 0 80 200" width="${80 * scale}" height="${200 * scale}" xmlns="http://www.w3.org/2000/svg">
      ${stem}${leaves}<g transform="translate(40, 70)">${clusters}</g>
    </svg>`;
}

function salviaSvg(scale: number) {
    const stem = `<path d="M40 260 Q 39 180 40 95 Q 41 55 42 22" stroke="#456030" stroke-width="2.2" fill="none"/>`;
    const leaves = `
      <path d="M40 220 Q 20 217 12 204 Q 24 215 40 217 Z" fill="#547838" opacity="0.88"/>
      <path d="M40 198 Q 60 195 70 182 Q 58 192 40 194 Z" fill="#4a6a30" opacity="0.88"/>
      <path d="M40 168 Q 18 165 10 152 Q 22 163 40 165 Z" fill="#547838" opacity="0.88"/>
      <path d="M40 148 Q 60 145 68 132 Q 56 143 40 145 Z" fill="#4a6a30" opacity="0.88"/>
    `;
    const florets = Array.from({ length: 18 }, (_, i) => {
        const y = 115 - i * 5;
        const side = i % 2 === 0 ? -1 : 1;
        const x = 40 + side * 4.5;
        const c = i % 3 === 0 ? "#c8d8e8" : "#a8b8c8";
        return `<ellipse cx="${x}" cy="${y}" rx="4.5" ry="3" fill="${c}" opacity="0.88"/><ellipse cx="${
            x + side * 2.5
        }" cy="${y - 1}" rx="3" ry="2" fill="#8a9eb8" opacity="0.8"/>`;
    }).join("");
    const tip = `<ellipse cx="42" cy="16" rx="4" ry="5.5" fill="#8a9eb8" opacity="0.8"/>`;
    return svgWrap(stem + leaves + florets + tip, 80, 260, 80 * scale, 260 * scale);
}

function yuccaSvg(scale: number, rng: Rng) {
    const spikes = Array.from({ length: 18 }, (_, i) => {
        const a = -Math.PI * 0.75 + (i / 17) * Math.PI * 1.5 + (rng() - 0.5) * 0.12;
        const len = 62 + rng() * 30;
        const cx = 60;
        const cy = 90;
        const ex = cx + Math.cos(a) * len;
        const ey = cy + Math.sin(a) * len;
        const col = ["#4a6230", "#5a7238", "#3a5220"][i % 3];
        return `<path d="M${cx} ${cy} Q ${(cx + ex) / 2} ${(cy + ey) / 2 - 5} ${ex} ${ey}" stroke="${col}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    }).join("");
    const base = Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const r = 18;
        const x = 60 + Math.cos(a) * r;
        const y = 90 + Math.sin(a) * r * 0.6;
        return `<ellipse cx="${x}" cy="${y}" rx="12" ry="3" fill="#4a6230" opacity="0.7" transform="rotate(${(a * 180) / Math.PI},${x},${y})"/>`;
    }).join("");
    const trunk = `<ellipse cx="60" cy="200" rx="5" ry="110" fill="#6a5830" opacity="0.7"/>`;
    return svgWrap(trunk + base + spikes, 120, 240, 120 * scale, 240 * scale);
}

function rocksSvg(scale: number) {
    const rocks = [
        { cx: 55, cy: 70, rx: 28, ry: 18, c: "#b0a08a" },
        { cx: 95, cy: 65, rx: 20, ry: 14, c: "#a89878" },
        { cx: 30, cy: 72, rx: 18, ry: 12, c: "#b8a890" },
        { cx: 80, cy: 75, rx: 14, ry: 9, c: "#c0b09a" },
        { cx: 118, cy: 68, rx: 16, ry: 10, c: "#b0a080" },
    ];
    const items = rocks
        .map(
            (r) =>
                `<ellipse cx="${r.cx}" cy="${r.cy}" rx="${r.rx}" ry="${r.ry}" fill="${r.c}" opacity="0.85"/><ellipse cx="${
                    r.cx - r.rx * 0.2
                }" cy="${r.cy - r.ry * 0.2}" rx="${r.rx * 0.6}" ry="${r.ry * 0.4}" fill="rgba(255,248,235,0.15)"/>`,
        )
        .join("");
    return svgWrap(items, 150, 90, 150 * scale, 90 * scale);
}

function shrubSvg(scale: number, rng: Rng) {
    const items: string[] = [];
    items.push(`<path d="M70 200 Q 68 150 70 100 Q 72 60 68 30" stroke="#5a6030" stroke-width="2" fill="none"/>`);
    const branches = [
        [-40, 80, 20],
        [30, 90, 25],
        [-25, 110, 18],
        [38, 120, 22],
        [-20, 140, 15],
        [28, 150, 18],
    ] as const;
    branches.forEach(([bx, by, bl]) => {
        items.push(`<path d="M70 ${by} Q ${70 + bx * 0.5} ${by - 10} ${70 + bx} ${by - bl}" stroke="#6a7038" stroke-width="1.4" fill="none"/>`);
        items.push(`<ellipse cx="${70 + bx}" cy="${by - bl}" rx="${8 + rng() * 2}" ry="${5 + rng() * 1.5}" fill="#6a8038" opacity="0.75"/>`);
        items.push(
            `<ellipse cx="${70 + bx + 3}" cy="${by - bl - 2}" rx="${6 + rng() * 1.5}" ry="${4 + rng()}" fill="#7a9045" opacity="0.65"/>`,
        );
    });
    items.push(`<ellipse cx="70" cy="195" rx="45" ry="15" fill="#5a7030" opacity="0.7"/>`);
    return svgWrap(items.join(""), 140, 200, 140 * scale, 200 * scale);
}

function blueberrySvg(scale: number, rng: Rng) {
    const items: string[] = [];
    const stems = [
        [55, 130, 50],
        [45, 120, 45],
        [65, 125, 48],
        [40, 140, 38],
        [70, 138, 42],
    ] as const;
    stems.forEach(([x, , h]) => {
        items.push(`<path d="M${x} 180 Q ${x - 2} ${180 - h * 0.5} ${x} ${180 - h}" stroke="#4a5a30" stroke-width="2" fill="none"/>`);
        items.push(`<ellipse cx="${x}" cy="${180 - h}" rx="12" ry="9" fill="#5a7838" opacity="0.8"/>`);
        items.push(`<ellipse cx="${x + 2}" cy="${180 - h - 3}" rx="9" ry="7" fill="#7a9848" opacity="0.65"/>`);
    });
    for (let i = 0; i < 18; i++) {
        const x = 20 + rng() * 90;
        const y = 80 + rng() * 70;
        const r = 3.5 + rng() * 2;
        items.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#4858a8" opacity="0.88"/>`);
        items.push(`<circle cx="${x - 0.8}" cy="${y - 0.8}" r="${r * 0.4}" fill="#8090d8" opacity="0.6"/>`);
        items.push(`<ellipse cx="${x}" cy="${y - r + 0.5}" rx="1.5" ry="0.8" fill="#2a3870" opacity="0.5"/>`);
    }
    items.push(`<ellipse cx="55" cy="178" rx="50" ry="12" fill="#3a5020" opacity="0.65"/>`);
    return svgWrap(items.join(""), 110, 185, 110 * scale, 185 * scale);
}

function strawberrySvg(scale: number, rng: Rng) {
    const items: string[] = [];
    items.push(`<ellipse cx="75" cy="115" rx="70" ry="22" fill="#4a7230" opacity="0.72"/>`);
    for (let i = 0; i < 12; i++) {
        const x = 15 + i * 11;
        const y = 95 + rng() * 15;
        items.push(
            `<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="#5a8238" opacity="0.82" transform="rotate(${rng() * 30 - 15},${x},${y})"/>`,
        );
        items.push(
            `<ellipse cx="${x + 2}" cy="${y - 3}" rx="7" ry="5" fill="#70a048" opacity="0.65" transform="rotate(${rng() * 20 - 10},${x},${y})"/>`,
        );
    }
    for (let i = 0; i < 8; i++) {
        const x = 20 + i * 18 + rng() * 5;
        const y = 90 + rng() * 18;
        items.push(`<ellipse cx="${x}" cy="${y}" rx="5" ry="6.5" fill="#e02828" opacity="0.9"/>`);
        items.push(`<ellipse cx="${x}" cy="${y - 4}" rx="3" ry="2" fill="#50a030" opacity="0.9"/>`);
        items.push(`<circle cx="${x - 1.5}" cy="${y}" r="0.8" fill="#f8c0a0" opacity="0.7"/>`);
        items.push(`<circle cx="${x + 1.5}" cy="${y + 1}" r="0.8" fill="#f8c0a0" opacity="0.7"/>`);
    }
    for (let i = 0; i < 5; i++) {
        const x = 25 + i * 25;
        const y = 78 + rng() * 10;
        items.push(`<circle cx="${x}" cy="${y}" r="5" fill="#f8f4e8" opacity="0.9"/>`);
        items.push(`<circle cx="${x}" cy="${y}" r="2" fill="#f0c050" opacity="0.9"/>`);
    }
    return svgWrap(items.join(""), 150, 130, 150 * scale, 130 * scale);
}

function mandarinSvg(scale: number, rng: Rng) {
    const trunk = `<path d="M55 200 Q 53 160 52 130 Q 51 105 54 85" stroke="#7a5a30" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M55 170 Q 38 155 28 140" stroke="#7a5a30" stroke-width="2.5" fill="none"/>
  <path d="M53 155 Q 70 140 80 125" stroke="#7a5a30" stroke-width="2.5" fill="none"/>`;
    const canopy = `
  <ellipse cx="54" cy="75" rx="42" ry="38" fill="#5a7a32" opacity="0.88"/>
  <ellipse cx="50" cy="70" rx="34" ry="30" fill="#6a8a40" opacity="0.75"/>
  <ellipse cx="60" cy="78" rx="30" ry="26" fill="#78984a" opacity="0.6"/>`;
    const fruits = [
        [42, 82],
        [60, 68],
        [72, 80],
        [38, 70],
        [55, 90],
        [65, 72],
        [48, 60],
        [70, 88],
    ]
        .map(
            ([x, y]) =>
                `<circle cx="${x}" cy="${y}" r="5" fill="#f08020" opacity="0.92"/><circle cx="${x - 1}" cy="${
                    y - 1
                }" r="2" fill="#f8b060" opacity="0.7"/>`,
        )
        .join("");
    const leaves = Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r = 30 + rng() * 10;
        const lx = 54 + Math.cos(a) * r;
        const ly = 75 + Math.sin(a) * r * 0.8;
        return `<ellipse cx="${lx}" cy="${ly}" rx="8" ry="3" fill="#4a7228" opacity="0.8" transform="rotate(${(a * 180) / Math.PI},${lx},${ly})"/>`;
    }).join("");
    return svgWrap(trunk + canopy + fruits + leaves, 110, 200, 110 * scale, 200 * scale);
}

function oliveSvg(scale: number, rng: Rng) {
    const trunk = `
    <path d="M110 300 Q 108 240 106 200 Q 100 170 96 145 Q 92 120 98 100" stroke="#6a5030" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M110 300 Q 112 240 115 200 Q 120 170 118 140" stroke="#7a6040" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M103 200 Q 85 185 72 170" stroke="#7a6040" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M108 190 Q 128 175 140 158" stroke="#7a6040" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M100 165 Q 82 150 68 135" stroke="#6a5030" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M106 155 Q 125 142 136 128" stroke="#6a5030" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  `;
    const clusters = [
        [98, 95],
        [80, 110],
        [115, 100],
        [68, 125],
        [132, 115],
        [75, 145],
        [128, 140],
        [92, 130],
        [60, 105],
        [145, 100],
        [88, 75],
        [108, 68],
        [70, 90],
        [140, 130],
        [55, 120],
        [155, 108],
        [96, 115],
        [118, 88],
        [65, 150],
        [142, 148],
    ] as const;
    const canopy = clusters
        .map(([cx, cy]) => {
            const leaves = Array.from({ length: 8 }, (_, i) => {
                const a = (i / 8) * Math.PI * 2 + rng() * 0.3;
                const r = 10 + rng() * 6;
                const lx = cx + Math.cos(a) * r;
                const ly = cy + Math.sin(a) * r * 0.7;
                const rot = (a * 180) / Math.PI;
                const base = i % 2 === 0 ? "#8aa070" : "#7a8f5a";
                return `<ellipse cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" rx="12" ry="3.5" fill="${base}" opacity="0.85" transform="rotate(${rot.toFixed(
                    1,
                )}, ${lx.toFixed(1)}, ${ly.toFixed(1)})"/>`;
            }).join("");
            const cloud = `<ellipse cx="${cx}" cy="${cy}" rx="26" ry="18" fill="rgba(148,168,120,0.28)"/>`;
            return `${cloud}${leaves}`;
        })
        .join("");
    return svgWrap(trunk + canopy, 220, 300, 220 * scale, 300 * scale);
}

function stageBackgroundStyle(): CSSProperties {
    const t = 0.25;
    const top = mixHex("#dff0f0", "#b8ccc0", t);
    const mid = mixHex("#eef5e0", "#c8d8a0", t);
    const bot = mixHex("#c8d8a0", "#8aaa58", t);
    return { background: `linear-gradient(180deg, ${top} 0%, ${mid} 55%, ${bot} 100%)` };
}

export type HeroDonDiegoBackgroundProps = {
    className?: string;
};

export default function HeroDonDiegoBackground({ className }: HeroDonDiegoBackgroundProps) {
    const [autoTimeOfDay, setAutoTimeOfDay] = useState<ResolvedTimeOfDay>(() => getTimeOfDay());
    const resolvedTimeOfDay = autoTimeOfDay;

    useEffect(() => {
        const updateTimeOfDay = () => setAutoTimeOfDay(getTimeOfDay());
        const interval = window.setInterval(updateTimeOfDay, 60_000);
        return () => window.clearInterval(interval);
    }, []);

    const scene = useMemo(() => {
        const rng = mulberry32(HERO_DON_DIEGO_SEED);

        const villageSvg = buildVillageSvg(rng);
        const presaSvg = buildPresaSvg();

        const clouds = [
            { top: "5%", w: 220, h: 80, delay: -40, dur: 125 },
            { top: "14%", w: 180, h: 60, delay: -20, dur: 120 },
            { top: "8%", w: 280, h: 90, delay: -70, dur: 140 },
            { top: "18%", w: 160, h: 55, delay: -95, dur: 110 },
            { top: "3%", w: 250, h: 82, delay: -85, dur: 150 },
            { top: "12%", w: 150, h: 52, delay: -35, dur: 130 },
        ].map((c, i) => ({ ...c, key: `c-${i}` }));

        const canalLines = Array.from({ length: 10 }, (_, i) => ({
            key: `cl-${i}`,
            top: 8 + i * 9,
            delay: -(rng() * 7),
        }));
        const canalSparks = Array.from({ length: 22 }, (_, i) => ({
            key: `cs-${i}`,
            left: rng() * 100,
            top: 10 + rng() * 80,
            delay: -(rng() * 3),
        }));

        const fountain = Array.from({ length: 28 }, (_, i) => {
            const angle = (rng() - 0.5) * 1.2;
            const speed = 0.6 + rng() * 0.5;
            const dx = Math.sin(angle) * 35;
            const dy = -40 - rng() * 30;
            return {
                key: `fa-${i}`,
                dx,
                dy,
                dy2: -8 - rng() * 8,
                delay: -((i / 28) * 2.2),
                dur: 1.8 + speed,
            };
        });

        const fish = [
            { key: "f-1", left: "15%", bottom: "16%", delay: 0, dur: 22, flip: false },
            { key: "f-2", left: "60%", bottom: "18%", delay: -10, dur: 28, flip: true },
            { key: "f-3", left: "35%", bottom: "15%", delay: -5, dur: 18, flip: false },
            { key: "f-4", left: "78%", bottom: "17%", delay: -15, dur: 25, flip: true },
        ];

        const plantConfig = [
            ["white", -3, 0.95, -5, ""],
            ["salvia", 6, 0.85, -3, "s"],
            ["agapanto", 3, 0.82, -4, ""],
            ["grass", 11, 0.9, 0, "r"],
            ["salvia", 17, 0.75, 2, ""],
            ["white", 13, 0.8, -2, "s"],
            ["grass", 20, 0.75, 0, ""],
            ["yucca", 8, 0.65, 1, "s"],
            ["rocks", 7, 1.0, 0, ""],
            ["strawberry", 15, 0.7, 0, "s"],
            ["blueberry", 25, 0.75, 2, ""],

            ["white", 95, 0.95, 6, "r"],
            ["salvia", 90, 0.85, 3, "s r"],
            ["agapanto", 93, 0.82, 4, "r"],
            ["grass", 85, 0.9, 0, ""],
            ["salvia", 80, 0.78, -3, "s"],
            ["white", 87, 0.8, 2, "s r"],
            ["grass", 78, 0.75, 0, "r"],
            ["yucca", 86, 0.7, -2, "s r"],
            ["rocks", 85, 1.0, 0, ""],
            ["strawberry", 73, 0.7, 0, "r"],
            ["blueberry", 68, 0.72, -2, "s"],

            ["salvia", 28, 0.5, 0, "s"],
            ["grass", 34, 0.48, 0, ""],
            ["white", 38, 0.45, 0, "s r"],
            ["salvia", 62, 0.5, 0, "r"],
            ["grass", 68, 0.48, 0, "s"],
            ["white", 72, 0.45, 0, ""],
            ["agapanto", 44, 0.42, 0, "s"],
            ["agapanto", 56, 0.42, 0, "r"],

            ["shrub", 25, 0.32, 0, "s"],
            ["shrub", 48, 0.28, 0, ""],
            ["shrub", 72, 0.3, 0, "s r"],
            ["grass", 42, 0.32, 0, "s"],
            ["grass", 58, 0.3, 0, "r"],
        ] as const;

        const plants = plantConfig.map(([kind, left, scale, rot, mod], idx) => {
            let svg = "";
            if (kind === "white") svg = whiteFlowersSvg(scale, rng);
            if (kind === "salvia") svg = salviaSvg(scale);
            if (kind === "agapanto") svg = agapantoSvg(scale, rng);
            if (kind === "grass") svg = grassSvg(scale, rng);
            if (kind === "yucca") svg = yuccaSvg(scale, rng);
            if (kind === "rocks") svg = rocksSvg(scale);
            if (kind === "strawberry") svg = strawberrySvg(scale, rng);
            if (kind === "blueberry") svg = blueberrySvg(scale, rng);
            if (kind === "shrub") svg = shrubSvg(scale, rng);
            return {
                key: `p-${idx}-${kind}`,
                kind,
                left,
                scale,
                rot,
                mod,
                svg,
                z: idx > 30 ? 2 : 6,
                delay: -(rng() * 7),
            };
        });

        const oliveTrees = [
            { kind: "olive", left: "2%", bottom: "32%", scale: 0.45, cls: "", z: 10 },
            { kind: "mandarin", left: "9%", bottom: "30%", scale: 0.42, cls: "r", z: 10 },
            { kind: "olive", left: "16%", bottom: "33%", scale: 0.38, cls: "", z: 10 },
            { kind: "olive", left: "24%", bottom: "31%", scale: 0.35, cls: "r", z: 9 },
            { kind: "mandarin", left: "33%", bottom: "30%", scale: 0.32, cls: "", z: 9 },
            { kind: "olive", left: "65%", bottom: "30%", scale: 0.32, cls: "r", z: 9 },
            { kind: "mandarin", left: "74%", bottom: "30%", scale: 0.35, cls: "", z: 9 },
            { kind: "olive", left: "82%", bottom: "32%", scale: 0.38, cls: "r", z: 10 },
            { kind: "olive", left: "89%", bottom: "33%", scale: 0.42, cls: "", z: 10 },
            { kind: "mandarin", left: "95%", bottom: "31%", scale: 0.44, cls: "r", z: 10 },
        ].map((t, i) => {
            const svg =
                t.kind === "olive" ? oliveSvg(t.scale, rng) : mandarinSvg(t.scale, rng);
            return { ...t, svg, key: `ot-${i}`, delay: -(rng() * 9) };
        });

        const motes = Array.from({ length: 22 }, (_, i) => ({
            key: `m-${i}`,
            left: rng() * 100,
            top: 40 + rng() * 52,
            fx: (rng() - 0.5) * 90,
            fy: -35 - rng() * 75,
            delay: -(rng() * 15),
        }));

        const butterflies = [
            { key: "bf1", left: "18%", bottom: "42%", c1: "#e8c060", c2: "#d4a040", delay: -2 },
            { key: "bf2", left: "75%", bottom: "44%", c1: "#d090c8", c2: "#b870a8", delay: -7, reverse: true },
            { key: "bf3", left: "55%", bottom: "40%", c1: "#60a8e8", c2: "#4080c0", delay: -12 },
        ];

        const birds = [
            { id: "b1", size: 24, color: "#4a6a8a", top: "6%", delay: 0, dur: 26 },
            { id: "b2", size: 18, color: "#5a7a9a", top: "10%", delay: -9, dur: 34 },
            { id: "b3", size: 16, color: "#4a6a8a", top: "14%", delay: -22, dur: 44, rev: true },
            { id: "b4", size: 12, color: "#6a8aaa", top: "8%", delay: -5, dur: 50 },
            { id: "b5", size: 20, color: "#4a6070", top: "18%", delay: -30, dur: 38, rev: true },
            { id: "b6", size: 10, color: "#5a7888", top: "5%", delay: -40, dur: 60 },
            { id: "b7", size: 14, color: "#4a6a8a", top: "12%", delay: -18, dur: 42, rev: true },
            { id: "b8", size: 16, color: "#5a7090", top: "7%", delay: -52, dur: 30 },
        ].map((b) => ({ ...b, key: b.id }));

        return { villageSvg, presaSvg, clouds, canalLines, canalSparks, fountain, fish, plants, oliveTrees, motes, butterflies, birds };
    }, []);

    const birdSvg = (sz: number, col: string) =>
        `<svg width="${sz}" height="${sz * 0.5}" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 12 Q 10 4 18 12 Q 26 4 34 12" stroke="${col}" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;

    const butterflySvg = (c1: string, c2: string) =>
        `<svg width="22" height="18" viewBox="0 0 28 22" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="9" cy="9" rx="7" ry="9" fill="${c1}" opacity="0.85"/>
  <ellipse cx="19" cy="9" rx="7" ry="9" fill="${c1}" opacity="0.85"/>
  <ellipse cx="9" cy="15" rx="5" ry="5.5" fill="${c2}" opacity="0.9"/>
  <ellipse cx="19" cy="15" rx="5" ry="5.5" fill="${c2}" opacity="0.9"/>
  <ellipse cx="14" cy="11" rx="1.5" ry="7" fill="#3a2010"/>
</svg>`;

    return (
        <div
            className={`hero-dd-stage-wrap ${className ?? ""}`}
            data-time-of-day={resolvedTimeOfDay}
            style={{
                ...stageBackgroundStyle(),
                ["--anim-speed" as string]: 1,
                ["--hue-shift" as string]: "0deg",
                ["--density" as string]: 1,
                ["--light" as string]: 1,
            }}
        >
            {/*
            <div className="time-toggle" aria-label="Preview background time of day">
                {[
                    ["auto", "Auto"],
                    ["morning", "Morning"],
                    ["sunset", "Sunset"],
                    ["night", "Night"],
                ].map(([mode, label]) => (
                    <button
                        key={mode}
                        type="button"
                        className={mode === "auto" ? "active" : ""}
                        aria-pressed={mode === "auto"}
                    >
                        {label}
                    </button>
                ))}
            </div>
            */}
            <div className="scene-dd">
                <div className="sky" />
                <div className="stars" aria-hidden />
                <div className="moon" aria-hidden />
                <div className="sun-bloom" />
                <div className="hills" dangerouslySetInnerHTML={{ __html: HILLS_SVG }} />
                <div className="village" dangerouslySetInnerHTML={{ __html: scene.villageSvg }} />
                <div className="presa" dangerouslySetInnerHTML={{ __html: scene.presaSvg }} />

                <div className="clouds" aria-hidden>
                    {scene.clouds.map((c) => (
                        <div
                            key={c.key}
                            className="cloud"
                            style={
                                {
                                    top: c.top,
                                    left: 0,
                                    width: `${c.w}px`,
                                    height: `${c.h}px`,
                                    ["--cx-start" as string]: `-${c.w}px`,
                                    ["--cx-end" as string]: "100vw",
                                    animationDuration: `calc(${c.dur}s / var(--anim-speed, 1))`,
                                    animationDelay: `${c.delay}s`,
                                } as CSSProperties
                            }
                            dangerouslySetInnerHTML={{
                                __html: cloudSvg(c.w, c.h),
                            }}
                        />
                    ))}
                </div>

                <div className="acequia">
                    <div className="cantera-wall left" />
                    <div className="acequia-edge top" />
                    <div className="acequia-water" />
                    {scene.canalLines.map((l) => (
                        <div
                            key={l.key}
                            className="canal-line"
                            style={{ top: `${l.top}%`, animationDelay: `${l.delay}s` }}
                        />
                    ))}
                    {scene.canalSparks.map((s) => (
                        <div
                            key={s.key}
                            className="canal-spark"
                            style={{
                                left: `${s.left}%`,
                                top: `${s.top}%`,
                                animationDelay: `${s.delay}s`,
                            }}
                        />
                    ))}
                    <div className="acequia-edge bot" />
                    <div className="cantera-wall right" />
                </div>

                <div className="fountain-arc" aria-hidden>
                    {scene.fountain.map((s) => (
                        <span
                            key={s.key}
                            style={
                                {
                                    ["--dx" as string]: `${s.dx}px`,
                                    ["--dy" as string]: `${s.dy}px`,
                                    ["--dy2" as string]: `${s.dy2}px`,
                                    animationDelay: `${s.delay}s`,
                                    animationDuration: `calc(${s.dur}s / var(--anim-speed, 1))`,
                                } as CSSProperties
                            }
                        />
                    ))}
                </div>

                <div className="fish" aria-hidden>
                    {scene.fish.map((f) => (
                        <div
                            key={f.key}
                            className="fish-item"
                            style={{
                                left: f.left,
                                bottom: f.bottom,
                                animation: `ddFishSwim calc(${f.dur}s / var(--anim-speed, 1)) ease-in-out ${f.delay}s infinite`,
                            }}
                            dangerouslySetInnerHTML={{ __html: fishSvg(f.flip) }}
                        />
                    ))}
                </div>

                <div className="plants" aria-hidden>
                    {scene.plants.map((p) => {
                        const isRock = p.kind === "rocks";
                        return (
                            <div
                                key={p.key}
                                className={`plant${p.mod ? ` ${p.mod}` : ""}${isRock ? " rock" : ""}`}
                                style={{
                                    left: `${p.left}%`,
                                    zIndex: p.z,
                                    transform: `rotate(${p.rot}deg)`,
                                    animationDelay: `${p.delay}s`,
                                }}
                                dangerouslySetInnerHTML={{ __html: p.svg }}
                            />
                        );
                    })}
                </div>

                <div className="olives" aria-hidden>
                    {scene.oliveTrees.map((t) => (
                        <div
                            key={t.key}
                            className={`olive-tree${t.cls ? ` ${t.cls}` : ""}`}
                            style={{
                                left: t.left,
                                bottom: t.bottom,
                                zIndex: t.z,
                                animationDelay: `${t.delay}s`,
                            }}
                            dangerouslySetInnerHTML={{ __html: t.svg }}
                        />
                    ))}
                </div>

                <div
                    className="casaclub"
                    aria-hidden
                    dangerouslySetInnerHTML={{
                        __html: `<div class="casaclub-inner">${casaClubSvg()}</div>`,
                    }}
                />

                <div className="ground-green" aria-hidden />

                <div className="motes" aria-hidden>
                    {scene.motes.map((m) => (
                        <div
                            key={m.key}
                            className="mote"
                            style={
                                {
                                    left: `${m.left}%`,
                                    top: `${m.top}%`,
                                    ["--fx" as string]: `${m.fx}px`,
                                    ["--fy" as string]: `${m.fy}px`,
                                    animationDelay: `${m.delay}s`,
                                } as CSSProperties
                            }
                        />
                    ))}
                </div>

                {scene.birds.map((b) => (
                    <div
                        key={b.key}
                        className={`bird${b.rev ? " rev" : ""}`}
                        style={
                            {
                                top: b.top,
                                animationDelay: `${b.delay}s`,
                                animationDuration: `calc(${b.dur}s / var(--anim-speed, 1))`,
                            } as CSSProperties
                        }
                        dangerouslySetInnerHTML={{ __html: birdSvg(b.size, b.color) }}
                        aria-hidden
                    />
                ))}

                {scene.butterflies.map((b) => (
                    <div
                        key={b.key}
                        className={`butterfly${b.reverse ? " reverse" : ""}`}
                        style={
                            {
                                left: b.left,
                                bottom: b.bottom,
                                animationDelay: `${b.delay ?? 0}s`,
                            } as CSSProperties
                        }
                        dangerouslySetInnerHTML={{ __html: butterflySvg(b.c1, b.c2) }}
                        aria-hidden
                    />
                ))}
            </div>
        </div>
    );
}

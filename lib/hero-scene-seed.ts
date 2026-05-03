/** Deterministic PRNG (mulberry32) for hero procedural SVG — stable SSR/hydration. */
export function mulberry32(seed: number): () => number {
    let t = seed >>> 0;
    return () => {
        t += 0x6d2b79f5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

export function mixHex(a: string, b: string, t: number): string {
    const pa = Number.parseInt(a.slice(1), 16);
    const pb = Number.parseInt(b.slice(1), 16);
    const ra = (pa >> 16) & 255;
    const ga = (pa >> 8) & 255;
    const ba = pa & 255;
    const rb = (pb >> 16) & 255;
    const gb = (pb >> 8) & 255;
    const bb = pb & 255;
    const r = Math.round(ra + (rb - ra) * t);
    const g = Math.round(ga + (gb - ga) * t);
    const bl = Math.round(ba + (bb - ba) * t);
    return `#${((r << 16) | (g << 8) | bl).toString(16).padStart(6, "0")}`;
}

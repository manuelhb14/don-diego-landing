"use client";

import { cn } from "@/lib/utils";

type Style = "Minimalism" | "Modern" | "Industrial" | "Scandinavian" | "Boho";

export type VirtualStagingStyleValue = Style;

const styles: { value: Style; label: string }[] = [
  { value: "Minimalism", label: "Minimalista" },
  { value: "Modern", label: "Moderno" },
  { value: "Industrial", label: "Industrial" },
  { value: "Scandinavian", label: "Escandinavo" },
  { value: "Boho", label: "Bohemio" },
];

export const styleButtonClasses: Record<VirtualStagingStyleValue, string> = {
  Minimalism:
    "border border-[#d6c5ba] bg-gradient-to-r from-[#f8efe7] via-[#f4e8de] to-[#f1e2d7] text-[#6d4c3f] hover:from-[#f6ece3] hover:to-[#ecdacb]",
  Modern:
    "border border-[#a9b8c9] bg-gradient-to-r from-[#e8eef6] via-[#dde7f2] to-[#d2dfed] text-[#31455e] hover:from-[#dfe8f4] hover:to-[#c6d7ea]",
  Industrial:
    "border border-[#9d928b] bg-gradient-to-r from-[#e4dfdb] via-[#d3cbc5] to-[#c3b8af] text-[#3f3935] hover:from-[#d8d0ca] hover:to-[#b7a99e]",
  Scandinavian:
    "border border-[#bfd3c4] bg-gradient-to-r from-[#eef6f1] via-[#e3efe8] to-[#d7e8de] text-[#355747] hover:from-[#e1eee6] hover:to-[#c8dfd2]",
  Boho:
    "border border-[#c9a995] bg-gradient-to-r from-[#f6e8d8] via-[#efcfb7] to-[#e3b392] text-[#6a3f2b] hover:from-[#f0ddc9] hover:to-[#d99f7e]",
};

const styleMeta: Record<VirtualStagingStyleValue, { note: string; chip: string }> = {
  Minimalism: { note: "Limpio, sobrio", chip: "#cbb4a6" },
  Modern: { note: "Actual, elegante", chip: "#8ba7c6" },
  Industrial: { note: "Texturas, carácter", chip: "#8f8177" },
  Scandinavian: { note: "Cálido, luminoso", chip: "#8bb29a" },
  Boho: { note: "Orgánico, acogedor", chip: "#c08360" },
};

interface StyleTileSelectorProps {
  value: VirtualStagingStyleValue;
  onChange: (value: VirtualStagingStyleValue) => void;
  className?: string;
}

export function StyleTileSelector({ value, onChange, className }: StyleTileSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Select style" className={cn("grid grid-cols-2 gap-2.5", className)}>
      {styles.map((style) => {
        const isSelected = value === style.value;
        const meta = styleMeta[style.value];

        return (
          <button
            key={style.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(style.value)}
            className={cn(
              "group rounded-xl px-3 py-2.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA7D69]/35",
              styleButtonClasses[style.value],
              isSelected
                ? "opacity-100 ring-1 ring-[#AA7D69]/45 shadow-[0_6px_20px_rgba(122,78,55,0.16)]"
                : "opacity-75 hover:opacity-100",
            )}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="text-sm leading-none font-semibold tracking-[0.02em]">{style.label}</span>
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: meta.chip }} />
            </span>
            <span className="mt-1.5 block text-[11px] leading-none text-[#6b564b]/85">{meta.note}</span>
          </button>
        );
      })}
    </div>
  );
}

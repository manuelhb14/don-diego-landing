"use client";

type ProjectStatusPillProps = {
    label: string;
    color: string;
    active: boolean;
    className?: string;
};

export default function ProjectStatusPill({ label, color, active, className = "" }: ProjectStatusPillProps) {
    return (
        <div className={`absolute right-5 top-5 z-20 flex items-center gap-2 ${className}`}>
            <span
                className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#222]/60"
                style={{ fontFamily: "var(--font-sans)" }}
            >
                {label}
            </span>
            <span
                className={`h-2.5 w-2.5 rounded-full ${active ? "animate-pulse" : ""}`}
                style={{
                    backgroundColor: color,
                    opacity: active ? 1 : 0.52,
                    boxShadow: active ? `0 0 5px 1px ${color}80, 0 0 10px 2px ${color}45` : `inset 0 0 0 1px ${color}80`,
                }}
            />
        </div>
    );
}

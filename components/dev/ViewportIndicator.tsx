"use client";

import { useEffect, useState } from "react";

function getViewportLabel(width: number) {
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";
  return "xs";
}

export default function ViewportIndicator() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const viewport = getViewportLabel(width);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[9999] p-2">
      <div className="rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white backdrop-blur">
        {viewport} ({width}px)
      </div>
    </div>
  );
}

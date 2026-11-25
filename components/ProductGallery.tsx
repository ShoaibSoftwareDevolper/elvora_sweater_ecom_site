"use client";

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { views } from "@/data/products";

const crop = (zoom: number, origin: string) => ({ transform: `scale(${zoom})`, transformOrigin: origin });

export default function ProductGallery({ image, alt }: { image: StaticImageData; alt: string }) {
  const [active, setActive] = useState(0);
  const strip = useRef<HTMLUListElement>(null);
  const view = views[active];

  const go = (next: number) => {
    const index = (next + views.length) % views.length;
    setActive(index);
    strip.current?.children[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  };

  return (
    <div className="min-w-0">
      <div className="group relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={image}
          alt={`${alt} — ${view.label.toLowerCase()} view`}
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 1440px) 820px, (min-width: 768px) 56vw, 100vw"
          style={crop(view.zoom, view.origin)}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous image"
            className="grid size-10 place-items-center rounded-full bg-white/85 transition-colors hover:bg-white"
          >
            <ChevronLeft size={18} strokeWidth={1.6} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next image"
            className="grid size-10 place-items-center rounded-full bg-white/85 transition-colors hover:bg-white"
          >
            <ChevronRight size={18} strokeWidth={1.6} aria-hidden />
          </button>
        </div>
        <p className="absolute bottom-3 left-3 bg-white/85 px-2 py-0.5 text-[11px] tabular-nums" aria-live="polite">
          {active + 1} / {views.length} · {view.label}
        </p>
      </div>

      <ul ref={strip} className="mt-[var(--grid-gap)] flex gap-[clamp(6px,0.7vw,10px)] overflow-x-auto [scrollbar-width:none]">
        {views.map((v, i) => (
          <li key={v.label} className="w-[calc((100%-5*clamp(6px,0.7vw,10px))/6)] min-w-[64px] shrink-0">
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${v.label.toLowerCase()} view`}
              aria-current={i === active}
              className={`relative block aspect-[4/5] w-full overflow-hidden bg-surface transition-opacity duration-300 ${
                i === active ? "" : "opacity-75 hover:opacity-100"
              }`}
            >
              <Image src={image} alt="" fill sizes="110px" style={crop(v.zoom, v.origin)} className="object-cover" />
              <span
                aria-hidden
                className={`absolute inset-0 border transition-colors duration-300 ${i === active ? "border-ink" : "border-transparent"}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

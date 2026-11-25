import Image from "next/image";
import { MoveRight } from "lucide-react";
import { assets } from "@/data/assets";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="frame relative grid md:grid-cols-[48.2%_1fr]">
      <div data-hero="reveal-left" className="relative h-[78svh] max-h-[760px] min-h-[480px] overflow-hidden bg-[#d9c6b2] md:h-[clamp(560px,41vw,820px)] md:max-h-none">
        <Image
          src={assets.footerNeutral}
          alt="A woman in a cream cable-knit sweater seated in a cognac leather chair"
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 1440px) 694px, (min-width: 768px) 48vw, 100vw"
          data-hero="slide-left"
          className="object-cover object-[50%_62%]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent md:hidden" />
      </div>

      <div data-hero="reveal-right" className="relative hidden flex-col bg-surface md:flex">
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={assets.heroStack}
            alt="Brown, cream and green sweaters folded on a leather chair"
            fill
            placeholder="blur"
            sizes="(min-width: 1440px) 746px, 52vw"
            data-hero="slide-right"
            className="object-cover object-[50%_70%]"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[96px] px-[var(--gutter)] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.22)] md:inset-x-auto md:top-[24%] md:bottom-auto md:left-[30%] md:px-0">
        <h1
          id="hero-title"
          data-hero="wordmark"
          className="text-[clamp(64px,9.2vw,140px)] leading-[0.95] font-light tracking-[-0.01em] whitespace-nowrap"
        >
          ELVORA
        </h1>
        <p
          data-hero="description"
          className="mt-[clamp(6px,0.7vw,10px)] w-max border-t border-white/70 pt-[clamp(6px,0.7vw,10px)] pr-[clamp(24px,4vw,60px)] text-[clamp(22px,2.6vw,38px)] leading-[1.15] font-light"
        >
          new collection 2026
        </p>
      </div>

      <a
        href="#catalog"
        data-hero="description"
        className="group grid grid-cols-[1fr_auto] items-stretch bg-white text-[14px] md:absolute md:right-0 md:bottom-0 md:w-[51.8%] md:grid-cols-[65%_35%]"
      >
        <span className="flex items-center px-[var(--gutter)] py-5 md:px-[clamp(20px,2.4vw,32px)] md:py-[clamp(18px,2.1vw,26px)]">show all</span>
        <span className="flex items-center justify-center bg-surface px-8 transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
          <MoveRight size={30} strokeWidth={0.8} aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5" />
        </span>
      </a>
    </section>
  );
}

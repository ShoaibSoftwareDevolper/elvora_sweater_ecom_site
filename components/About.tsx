import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { assets } from "@/data/assets";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="wrap mt-[var(--section)] scroll-mt-4">
      <div className="grid gap-[clamp(24px,3.4vw,48px)] md:grid-cols-[31.5%_1fr]">
        <div data-reveal="panel" className="relative aspect-[4/5] overflow-hidden bg-surface">
          <Image
            src={assets.aboutPortrait}
            alt="A woman in an oversized cream cable-knit sweater seated on a leather sofa"
            fill
            placeholder="blur"
            sizes="(min-width: 1440px) 420px, (min-width: 768px) 30vw, 100vw"
            data-reveal-img
            className="object-cover object-[50%_25%]"
          />
        </div>

        <div className="flex flex-col">
          <h2
            id="about-title"
            data-reveal="heading"
            className="border-b border-ink/25 pb-1 text-[clamp(22px,2.2vw,30px)] leading-[1.15] font-normal tracking-[0.02em] uppercase"
          >
            About us
          </h2>

          <div className="mt-[clamp(28px,8vw,120px)] grid flex-1 items-end gap-[clamp(24px,3.4vw,48px)] lg:grid-cols-[1fr_47%]">
            <div data-reveal="heading" className="max-w-[340px]">
              <h3 className="text-[clamp(26px,2.75vw,38px)] leading-[1.15] font-normal tracking-[-0.01em]">
                <span className="inline-flex items-center gap-[0.25em]">
                  ELVORA
                  <ArrowRight aria-hidden strokeWidth={1.6} className="size-[0.8em] translate-y-[0.04em]" />
                </span>
                <br />
                gentle touch
              </h3>
              <p className="mt-[clamp(14px,1.8vw,24px)] text-[13px] leading-[1.6] md:text-[14px]">
                Softness and responsibility are the heart of the brand. We knit from natural, traceable fibres so a
                modern woman can feel both beautiful and comfortable, season after season.
              </p>
              <a href="#contacts" className="text-link mt-[clamp(20px,2.6vw,36px)] text-[12.5px]">
                more about the brand <ArrowRight size={14} strokeWidth={1.8} aria-hidden />
              </a>
            </div>
            <div data-reveal="panel" data-swap="left" className="relative aspect-[5/3] overflow-hidden bg-surface">
              <div data-swap-base className="absolute inset-0">
                <Image
                  src={assets.aboutDetail}
                  alt="Close-up of a cream cable-knit sleeve resting on a leather armrest"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1440px) 420px, (min-width: 1024px) 30vw, 100vw"
                  data-reveal-img
                  className="object-cover"
                />
              </div>
              <div data-swap-next className="absolute inset-0" style={{ transform: "translateX(-100%)" }}>
                <Image
                  src={assets.aboutSage}
                  alt="A woman in a sage green ribbed sweater seated on a leather sofa"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1440px) 420px, (min-width: 1024px) 30vw, 100vw"
                  className="object-cover object-[50%_40%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

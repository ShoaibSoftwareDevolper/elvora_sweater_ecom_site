import Image from "next/image";
import { assets } from "@/data/assets";

export default function Promo() {
  return (
    <section
      id="delivery"
      aria-labelledby="promo-title"
      data-reveal="panel"
      className="frame relative mt-[var(--section)] grid h-[clamp(240px,34.7vw,500px)] scroll-mt-4 place-items-center overflow-hidden bg-[#a98c73]"
    >
      <Image
        src={assets.promo}
        alt=""
        fill
        placeholder="blur"
        sizes="(min-width: 1440px) 1440px, 100vw"
        data-reveal-img
        className="scale-[1.06] object-cover object-[50%_40%] blur-[6px] md:blur-[9px]"
      />
      <div aria-hidden className="absolute inset-0 bg-black/15" />
      <div className="relative px-6 text-center text-white">
        <h2 id="promo-title" data-reveal="heading" className="text-[clamp(22px,2.7vw,38px)] leading-[1.2] font-normal tracking-[0.01em]">
          a scarf as a gift
          <br />
          when buying two sweaters
        </h2>
        <p data-reveal="heading" className="mt-[clamp(10px,1.2vw,16px)] text-[13px] font-light text-white/85 md:text-[14px]">
          Free delivery on every order over $150
        </p>
      </div>
    </section>
  );
}

import Image from "next/image";
import { assets } from "@/data/assets";

/** Wave emblem + ELVORA name. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image src={assets.emblem} alt="" aria-hidden sizes="72px" className="h-[18px] w-auto md:h-[21px]" />
      <span className="text-[15px] leading-none font-normal tracking-[0.26em] md:text-[16px]">ELVORA</span>
    </span>
  );
}

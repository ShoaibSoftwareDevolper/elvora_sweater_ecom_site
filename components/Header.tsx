"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingCart } from "lucide-react";
import Logo from "./Logo";
import { useStore } from "./StoreProvider";

export const navLinks = [
  { label: "catalog", href: "/#catalog" },
  { label: "about us", href: "/#about" },
  { label: "delivery", href: "/#delivery" },
  { label: "contacts", href: "/#contacts" },
];

const item = "inline-flex min-h-9 items-center transition-opacity duration-300 hover:opacity-55";
const icon = `${item} relative min-w-9 justify-center`;

function Badge({ value }: { value: number }) {
  if (value === 0) return null;
  return (
    <span className="absolute top-0.5 right-0 grid min-w-3.5 place-items-center rounded-full bg-ink px-0.5 text-[9px] leading-3.5 font-normal text-white tabular-nums">
      {value}
    </span>
  );
}

export default function Header() {
  const { open, count, liked } = useStore();

  return (
    <header data-hero="header" className="frame border-b border-line bg-white">
      <nav aria-label="Primary" className="flex items-center justify-between px-[clamp(12px,1.4vw,20px)] py-[var(--header-y)] text-[13px] md:text-[13.5px]">
        <div className="flex items-center gap-2 md:gap-[clamp(28px,4.4vw,64px)]">
          <button type="button" className={`${icon} -ml-2 md:hidden`} onClick={() => open("menu")} aria-haspopup="dialog" aria-label="Menu">
            <Menu size={18} strokeWidth={1.2} aria-hidden />
          </button>
          <Link href="/" aria-label="ELVORA home" className={`${item} md:-ml-1`}>
            <Logo />
          </Link>
          <ul className="hidden items-center gap-[clamp(28px,4.4vw,64px)] text-muted md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`${item} hover:text-ink`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="-mr-1.5 flex items-center">
          <button type="button" className={icon} onClick={() => open("search")} aria-haspopup="dialog" aria-label="Search">
            <Search size={17} strokeWidth={1.3} aria-hidden />
          </button>
          <button
            type="button"
            className={icon}
            onClick={() => open("wishlist")}
            aria-haspopup="dialog"
            aria-label={`Wishlist, ${liked.length} ${liked.length === 1 ? "item" : "items"}`}
          >
            <Heart size={17} strokeWidth={1.3} aria-hidden />
            <Badge value={liked.length} />
          </button>
          <button
            type="button"
            className={icon}
            onClick={() => open("bag")}
            aria-haspopup="dialog"
            aria-label={`Basket, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <ShoppingCart size={18} strokeWidth={1.3} aria-hidden />
            <Badge value={count} />
          </button>
        </div>
      </nav>
    </header>
  );
}

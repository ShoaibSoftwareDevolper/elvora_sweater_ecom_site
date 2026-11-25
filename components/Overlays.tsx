"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Heart, Minus, Plus, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { getProduct, products, formatPrice } from "@/data/products";
import Logo from "./Logo";
import { navLinks } from "./Header";
import { useStore, type Panel } from "./StoreProvider";

const sideClasses = {
  left: "inset-y-0 left-0 w-full max-w-[420px] -translate-x-full",
  right: "inset-y-0 right-0 w-full max-w-[420px] translate-x-full",
  top: "inset-x-0 top-0 max-h-[88svh] -translate-y-full",
  // Full-width sheet that drops down from the top.
  drop: "inset-x-0 top-0 max-h-[88svh] -translate-y-full shadow-[0_12px_40px_rgba(0,0,0,0.06)]",
};

function Sheet({
  id,
  side,
  label,
  children,
}: {
  id: Panel;
  side: keyof typeof sideClasses;
  label: string;
  children: React.ReactNode;
}) {
  const { panel, close } = useStore();
  const isOpen = panel === id;
  const dialog = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  if (isOpen && !mounted) setMounted(true);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      const target = dialog.current?.querySelector<HTMLElement>("[data-autofocus]") ?? dialog.current;
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] ${isOpen ? "visible" : "pointer-events-none invisible delay-700"}`}
      inert={!isOpen}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={() => close()}
        className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={dialog}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        data-lenis-prevent
        className={`absolute flex flex-col outline-none overflow-y-auto overscroll-contain bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${side === "drop" ? "duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform" : "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"} ${sideClasses[side]} ${isOpen ? "visible translate-x-0 translate-y-0 transition-transform" : "invisible transition-[transform,visibility]"}`}
      >
        <div className={`flex items-center justify-between py-[var(--header-y)] md:px-8 ${side === "top" || side === "drop" ? "wrap" : "px-[var(--gutter)]"}`}>
          <p className="text-[13px] font-normal tracking-[0.08em] uppercase">{label}</p>
          <button
            type="button"
            onClick={() => close()}
            aria-label={`Close ${label.toLowerCase()}`}
            className="-mr-2 inline-flex size-9 items-center justify-center transition-opacity hover:opacity-60"
          >
            <X size={16} strokeWidth={1.3} aria-hidden />
          </button>
        </div>
        {mounted && children}
      </div>
    </div>
  );
}

function MobileMenu() {
  const { open, close } = useStore();

  return (
    <div className="flex flex-1 flex-col px-[var(--gutter)] pb-8">
      <nav aria-label="Mobile">
        <ul className="border-t border-line">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-line">
              <Link href={link.href} onClick={() => close(false)} className="flex min-h-13 items-center text-[16px]">
                {link.label}
              </Link>
            </li>
          ))}
          <li className="border-b border-line">
            <button type="button" onClick={() => open("wishlist")} className="flex min-h-13 w-full items-center text-[16px]">
              wishlist
            </button>
          </li>
        </ul>
      </nav>
      <Logo className="mt-auto self-center pt-10" />
    </div>
  );
}

function ProductRow({ id }: { id: string }) {
  const { close } = useStore();
  const [productId, size] = id.split("|");
  const product = getProduct(productId);
  if (!product) return null;
  return (
    <>
      <div className="relative aspect-[4/5] w-16 shrink-0 overflow-hidden bg-surface">
        <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <Link href={`/products/${product.id}`} onClick={() => close(false)} className="text-[13px] font-normal hover:underline">
          {product.name}
        </Link>
        <p className="meta mt-0.5">
          {product.color}
          {size && ` · Size ${size}`} · {formatPrice(product.price)}
        </p>
      </div>
    </>
  );
}

function SearchPanel() {
  const { add } = useStore();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const results = products.filter((p) => p.name.toLowerCase().includes(q));

  return (
    <div className="wrap pb-8 md:px-8">
      <label htmlFor="site-search" className="sr-only">
        Search sweaters
      </label>
      <input
        id="site-search"
        type="search"
        data-autofocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search sweaters"
        autoComplete="off"
        className="w-full border-b border-ink/25 bg-transparent py-3 text-[16px] outline-none placeholder:text-muted focus:border-ink"
      />
      <p className="meta mt-4" aria-live="polite">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>
      <ul className="mt-2 grid gap-x-8 md:grid-cols-2">
        {results.map((p) => (
          <li key={p.id} className="flex items-center gap-4 border-b border-line py-3">
            <ProductRow id={p.id} />
            <button
              type="button"
              onClick={() => add(p.id)}
              aria-label={`Add ${p.name} to basket`}
              className="text-link min-h-9 px-1 text-[12px]"
            >
              Add to basket
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BagPanel() {
  const { bag, setQty, close } = useStore();
  const subtotal = bag.reduce(
    (sum, line) => sum + (getProduct(line.id.split("|")[0])?.price ?? 0) * line.qty,
    0,
  );

  if (bag.length === 0) {
    return (
      <div className="wrap pb-8 md:px-8">
        <p className="text-[13px] text-muted">Your basket is empty.</p>
        <Link href="/#catalog" onClick={() => close(false)} className="text-link mt-4">
          Discover the collection <ArrowRight size={14} strokeWidth={1.8} aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap grid gap-8 pb-8 md:grid-cols-[minmax(0,1fr)_320px] md:gap-[clamp(32px,5vw,80px)] md:px-8">
      <ul className="border-t border-line">
        {bag.map((line) => (
          <li key={line.id} className="flex items-center gap-4 border-b border-line py-4">
            <ProductRow id={line.id} />
            <div className="flex items-center text-[12px]" role="group" aria-label="Quantity">
              <button
                type="button"
                onClick={() => setQty(line.id, line.qty - 1)}
                aria-label="Decrease quantity"
                className="grid size-8 place-items-center hover:opacity-60"
              >
                <Minus size={13} strokeWidth={1.6} aria-hidden />
              </button>
              <span className="w-5 text-center tabular-nums" aria-live="polite">
                {line.qty}
              </span>
              <button
                type="button"
                onClick={() => setQty(line.id, line.qty + 1)}
                aria-label="Increase quantity"
                className="grid size-8 place-items-center hover:opacity-60"
              >
                <Plus size={13} strokeWidth={1.6} aria-hidden />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="md:border-t md:border-line md:pt-4">
        <div className="flex justify-between text-[13px]">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <button
          type="button"
          disabled
          className="mt-5 w-full cursor-not-allowed bg-ink py-3.5 text-[11px] font-medium uppercase tracking-[0.08em] text-white opacity-40"
        >
          Checkout
        </button>
        <p className="meta mt-3 text-center">Checkout is not available in this preview. Your basket is kept for this visit only.</p>
      </div>
    </div>
  );
}

function WishlistPanel() {
  const { liked, toggleLike, add, close } = useStore();
  const total = liked.reduce((sum, id) => sum + (getProduct(id)?.price ?? 0), 0);

  if (liked.length === 0) {
    return (
      <div className="wrap pb-8 md:px-8">
        <p className="text-[13px] text-muted">
          Your wishlist is empty. Tap the <Heart size={12} strokeWidth={1.4} aria-hidden className="inline align-[-1px]" /> on a
          sweater to save it here.
        </p>
        <Link href="/#catalog" onClick={() => close(false)} className="text-link mt-4">
          Discover the collection <ArrowRight size={14} strokeWidth={1.8} aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap grid gap-8 pb-8 md:grid-cols-[minmax(0,1fr)_320px] md:gap-[clamp(32px,5vw,80px)] md:px-8">
      <ul className="border-t border-line">
        {liked.map((id) => (
          <li key={id} className="flex items-center gap-4 border-b border-line py-4">
            <ProductRow id={id} />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => add(id)}
                aria-label="Add to basket"
                className="grid size-9 place-items-center transition-opacity hover:opacity-60"
              >
                <ShoppingCart size={15} strokeWidth={1.5} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => toggleLike(id)}
                aria-label="Remove from wishlist"
                className="grid size-9 place-items-center transition-opacity hover:opacity-60"
              >
                <X size={15} strokeWidth={1.5} aria-hidden />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="md:border-t md:border-line md:pt-4">
        <div className="flex justify-between text-[13px]">
          <span>
            {liked.length} saved {liked.length === 1 ? "item" : "items"}
          </span>
          <span className="tabular-nums">{formatPrice(total)}</span>
        </div>
        <button
          type="button"
          onClick={() => liked.forEach((id) => add(id))}
          className="mt-5 w-full bg-ink py-3.5 text-[11px] font-medium tracking-[0.08em] text-white uppercase transition-opacity duration-300 hover:opacity-85"
        >
          Add all to basket
        </button>
        <p className="meta mt-3 text-center">Your wishlist is kept for this visit only.</p>
      </div>
    </div>
  );
}

export default function Overlays() {
  return (
    <>
      <Sheet id="menu" side="left" label="Menu">
        <MobileMenu />
      </Sheet>
      <Sheet id="search" side="top" label="Search">
        <SearchPanel />
      </Sheet>
      <Sheet id="bag" side="drop" label="Basket">
        <BagPanel />
      </Sheet>
      <Sheet id="wishlist" side="drop" label="Wishlist">
        <WishlistPanel />
      </Sheet>
    </>
  );
}

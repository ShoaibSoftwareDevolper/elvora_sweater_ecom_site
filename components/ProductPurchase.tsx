"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { sizes } from "@/data/products";
import { useStore } from "./StoreProvider";

export default function ProductPurchase({ id, name, soldOut }: { id: string; name: string; soldOut: string[] }) {
  const { add, liked, toggleLike } = useStore();
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const saved = liked.includes(id);

  const addToCart = () => {
    if (!size) {
      setError(true);
      return;
    }
    add(id, size);
  };

  return (
    <div className="mt-6">
      <fieldset>
        <legend className="text-[11px] font-normal tracking-[0.1em] uppercase">
          Size{size && <span className="ml-2 text-muted normal-case tracking-normal">{size} selected</span>}
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {sizes.map((s) => {
            const disabled = soldOut.includes(s);
            const selected = size === s;
            return (
              <button
                key={s}
                type="button"
                disabled={disabled}
                aria-pressed={selected}
                aria-label={disabled ? `${s}, sold out` : s}
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                className={`grid h-10 min-w-11 place-items-center border px-2 text-[12px] tabular-nums transition-colors duration-200 ${
                  disabled
                    ? "border-line text-ink/25 line-through"
                    : selected
                      ? "border-ink bg-ink text-white"
                      : "border-line hover:border-ink"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        {error && (
          <p role="alert" className="mt-2 text-[12px] text-[#a1342b]">
            Please choose a size.
          </p>
        )}
      </fieldset>

      <p className="mt-5 flex items-center gap-2 text-[12px] text-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-[#4f7a4a]" />
        In stock — ships in 1–2 business days
      </p>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={addToCart}
          className="h-12 flex-1 bg-ink text-[11px] font-normal tracking-[0.14em] text-white uppercase transition-opacity duration-300 hover:opacity-85"
        >
          Add to cart
        </button>
        <button
          type="button"
          onClick={() => toggleLike(id)}
          aria-pressed={saved}
          aria-label={`${saved ? "Remove" : "Save"} ${name} ${saved ? "from" : "to"} wishlist`}
          className="grid size-12 place-items-center border border-line transition-colors hover:border-ink"
        >
          <Heart size={17} strokeWidth={1.4} aria-hidden className={saved ? "fill-ink" : ""} />
        </button>
      </div>
    </div>
  );
}

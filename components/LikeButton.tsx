"use client";

import { Heart } from "lucide-react";
import { useStore } from "./StoreProvider";

export default function LikeButton({ id, name }: { id: string; name: string }) {
  const { liked, toggleLike } = useStore();
  const active = liked.includes(id);

  return (
    <button
      type="button"
      onClick={() => toggleLike(id)}
      aria-pressed={active}
      aria-label={`${active ? "Remove" : "Save"} ${name} ${active ? "from" : "to"} wishlist`}
      className="absolute top-2 right-2 z-20 grid size-9 place-items-center transition-[opacity,scale] duration-300 hover:opacity-60 active:scale-90"
    >
      <Heart size={15} strokeWidth={1.3} aria-hidden className={active ? "fill-ink" : ""} />
    </button>
  );
}

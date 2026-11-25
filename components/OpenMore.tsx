"use client";

import { useStore } from "./StoreProvider";

export default function OpenMore() {
  const { open } = useStore();

  return (
    <button type="button" onClick={() => open("search")} aria-haspopup="dialog" className="text-link text-[14px] font-normal">
      open more
    </button>
  );
}

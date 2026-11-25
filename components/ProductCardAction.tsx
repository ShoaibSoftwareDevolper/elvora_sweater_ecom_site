import Link from "next/link";

export default function ProductCardAction({ id, name }: { id: string; name: string }) {
  return (
    <Link
      href={`/products/${id}`}
      aria-label={`View ${name}`}
      className="absolute inset-0 z-10 focus-visible:outline-offset-4"
    />
  );
}

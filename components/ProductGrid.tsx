import Image from "next/image";
import { formatPrice, type Product } from "@/data/products";
import LikeButton from "./LikeButton";
import ProductCardAction from "./ProductCardAction";

function ProductCard({ product, sizes }: { product: Product; sizes: string }) {
  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          placeholder="blur"
          sizes={sizes}
          className="object-cover [transition:scale_1.8s_cubic-bezier(0.16,1,0.3,1),filter_1.2s_ease-out,opacity_1.2s_ease-out] group-hover:scale-[1.04] group-hover:opacity-[0.94] group-hover:blur-[0.6px]"
        />
        {product.compareAt && (
          <span className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[10px] font-normal tracking-[0.08em] uppercase">
            Sale
          </span>
        )}
      </div>
      <div className="mt-3 md:mt-4">
        <h3 className="text-[13px] leading-snug font-normal md:text-[14px]">{product.name}</h3>
        <p className="mt-0.5 flex gap-2 text-[13px] tabular-nums md:text-[14px]">
          <span className={product.compareAt ? "text-ink" : "text-muted"}>{formatPrice(product.price)}</span>
          {product.compareAt && <s className="text-muted">{formatPrice(product.compareAt)}</s>}
        </p>
      </div>
      <ProductCardAction id={product.id} name={product.name} />
      <LikeButton id={product.id} name={product.name} />
    </article>
  );
}

export default function ProductGrid({ products, columns = 3 }: { products: Product[]; columns?: 3 | 4 }) {
  const four = columns === 4;
  const sizes = four
    ? "(min-width: 1440px) 320px, (min-width: 768px) 23vw, 48vw"
    : "(min-width: 1440px) 430px, (min-width: 768px) 30vw, 100vw";

  return (
    <ul
      data-reveal="grid"
      className={`grid gap-x-[var(--grid-gap)] gap-y-9 ${four ? "grid-cols-2 md:grid-cols-4" : "sm:grid-cols-3"}`}
    >
      {products.map((product) => (
        <li key={product.id} data-reveal-item>
          <ProductCard product={product} sizes={sizes} />
        </li>
      ))}
    </ul>
  );
}

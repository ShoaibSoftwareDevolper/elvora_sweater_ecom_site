import About from "@/components/About";
import Hero from "@/components/Hero";
import OpenMore from "@/components/OpenMore";
import ProductGrid from "@/components/ProductGrid";
import Promo from "@/components/Promo";
import ScrollReveal from "@/components/ScrollReveal";
import { moreProducts, popularProducts } from "@/data/products";

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <Hero />

      <section id="catalog" aria-labelledby="catalog-title" className="wrap mt-[var(--section)] scroll-mt-4">
        <h2 id="catalog-title" data-reveal="heading" className="section-title mb-[clamp(18px,2vw,28px)]">
          The most popular
        </h2>
        <ProductGrid products={popularProducts} />
        <div className="mt-[clamp(32px,4vw,52px)] text-center">
          <OpenMore />
        </div>
      </section>

      <Promo />

      <section id="all-products" aria-labelledby="all-products-title" className="wrap mt-[var(--section)] scroll-mt-4">
        <h2 id="all-products-title" data-reveal="heading" className="section-title mb-[clamp(18px,2vw,28px)]">
          All products
        </h2>
        <ProductGrid products={moreProducts} />
        <div className="mt-[clamp(32px,4vw,52px)] text-center">
          <OpenMore />
        </div>
      </section>

      <About />
    </main>
  );
}

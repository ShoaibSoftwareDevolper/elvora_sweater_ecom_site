import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Plus } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import ProductGrid from "@/components/ProductGrid";
import ProductPurchase from "@/components/ProductPurchase";
import ScrollReveal from "@/components/ScrollReveal";
import { formatPrice, getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/products/[id]">): Promise<Metadata> {
  const product = getProduct((await params).id);
  if (!product) return {};
  return {
    title: `${product.name}, ${product.color}`,
    description: product.description,
    openGraph: { images: [{ url: product.image.src, width: product.image.width, height: product.image.height, alt: product.alt }] },
  };
}

function Section({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-line">
      <summary className="flex min-h-13 list-none items-center justify-between text-[11px] font-normal tracking-[0.1em] uppercase [&::-webkit-details-marker]:hidden">
        {title}
        <Plus size={15} strokeWidth={1.5} aria-hidden className="transition-transform duration-300 group-open:rotate-45" />
      </summary>
      <div className="pb-5 text-[13px] leading-[1.65] text-ink/80">{children}</div>
    </details>
  );
}

export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const product = getProduct((await params).id);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const styleWith = related.slice(0, 2);
  const instalment = formatPrice(Math.round((product.price / 4) * 100) / 100);

  return (
    <main>
      <ScrollReveal />
      <div className="wrap pt-[clamp(16px,2vw,28px)]">
        <nav aria-label="Breadcrumb" className="meta">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-ink">
                home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={12} strokeWidth={1.6} />
            </li>
            <li>
              <Link href="/#catalog" className="hover:text-ink">
                catalog
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={12} strokeWidth={1.6} />
            </li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-[clamp(14px,1.6vw,24px)] grid grid-cols-1 gap-[clamp(28px,3.6vw,56px)] md:grid-cols-[minmax(0,57%)_minmax(0,1fr)]">
          <ProductGallery image={product.image} alt={product.alt} />

          <div className="md:sticky md:top-6 md:self-start lg:pr-[clamp(0px,3vw,48px)]">
            <p className="meta tracking-[0.18em] uppercase">ELVORA</p>
            <h1 className="mt-1.5 text-[clamp(22px,2vw,28px)] leading-[1.2] font-normal tracking-[0.02em] uppercase">
              {product.name}, {product.color}
            </h1>
            <p className="mt-3 flex items-baseline gap-2.5 text-[15px] tabular-nums">
              <span>{formatPrice(product.price)}</span>
              {product.compareAt && (
                <>
                  <s className="text-muted">{formatPrice(product.compareAt)}</s>
                  <span className="bg-ink px-1.5 py-px text-[10px] tracking-[0.08em] text-white uppercase">
                    Save {Math.round((1 - product.price / product.compareAt) * 100)}%
                  </span>
                </>
              )}
            </p>
            <p className="meta mt-1.5">
              or 4 interest-free payments of <span className="text-ink">{instalment}</span>
            </p>

            <ProductPurchase id={product.id} name={product.name} soldOut={product.soldOut} />

            <div className="mt-8">
              <h2 className="text-[11px] font-normal tracking-[0.1em] uppercase">Details</h2>
              <p className="mt-2 text-[13px] leading-[1.65] text-ink/80">{product.description}</p>
            </div>

            <div className="mt-6 border-t border-line">
              <Section title="Product features & fit">
                <ul className="list-disc space-y-1 pl-4">
                  {product.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Section>
              <Section title="Fabric & care">
                <ul className="list-disc space-y-1 pl-4">
                  {product.fabric.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Section>
              <Section title="Style it with">
                <ul className="space-y-1">
                  {styleWith.map((p) => (
                    <li key={p.id}>
                      <Link href={`/products/${p.id}`} className="underline underline-offset-3 hover:text-ink">
                        {p.name}, {p.color}
                      </Link>{" "}
                      <span className="text-muted">— {formatPrice(p.price)}</span>
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title="Need help?">
                <p>
                  Free delivery on orders over $150 and free returns within 30 days. Questions about sizing? Write to us
                  through the{" "}
                  <Link href="/#contacts" className="underline underline-offset-3">
                    contacts
                  </Link>{" "}
                  page.
                </p>
              </Section>
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="related-title" className="wrap mt-[var(--section)]">
        <h2
          id="related-title"
          data-reveal="heading"
          className="mb-[clamp(18px,2.2vw,32px)] text-center text-[12px] font-normal tracking-[0.14em] uppercase"
        >
          You may also like
        </h2>
        <ProductGrid products={related} columns={4} />
      </section>
    </main>
  );
}

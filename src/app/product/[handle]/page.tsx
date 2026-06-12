import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyBox from "@/components/BuyBox";
import MeatArt, { ART_BG } from "@/components/MeatArt";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import {
  ClockIcon,
  KnifeIcon,
  LeafIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/Icons";
import { getProduct, getProducts } from "@/lib/shopify";

export const revalidate = 120;

type Params = { handle: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { handle } = await params;
  const { product } = await getProduct(handle);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: product.image
      ? { images: [{ url: product.image.url }] }
      : undefined,
  };
}

const PERKS = [
  { icon: KnifeIcon, label: "Cut after you order" },
  { icon: ClockIcon, label: "30-min delivery slots" },
  { icon: TruckIcon, label: "Chilled 0–4°C cold chain" },
  { icon: ShieldIcon, label: "FSSAI-licensed facility" },
  { icon: LeafIcon, label: "No antibiotic residue" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { handle } = await params;
  const { product } = await getProduct(handle);
  if (!product) notFound();

  const { products } = await getProducts();
  const related = products
    .filter((p) => p.handle !== product.handle)
    .sort((a, b) => {
      const aSame = a.category === product.category ? 0 : 1;
      const bSame = b.category === product.category ? 0 : 1;
      return aSame - bSame;
    })
    .slice(0, 4);

  return (
    <div className="px-4 pb-28 sm:px-6 lg:pb-0">
      <div className="mx-auto max-w-7xl">
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-6 text-xs font-bold text-ink-soft">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            <li aria-hidden="true">→</li>
            <li>
              <Link href="/shop" className="hover:text-brand">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">→</li>
            <li className="text-brand">{product.title}</li>
          </ol>
        </nav>

        <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* media */}
          <Reveal>
            <div
              className={`sticker relative aspect-square overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${ART_BG[product.art]}`}
            >
              {product.image ? (
                <Image
                  src={product.image.url}
                  alt={product.image.altText ?? product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <MeatArt
                  art={product.art}
                  className="absolute inset-0 m-auto h-[72%] w-[72%] animate-float"
                />
              )}
              {product.badge && (
                <span className="absolute left-5 top-5 -rotate-3 rounded-full border-2 border-ink bg-amber px-3.5 py-1 font-display text-sm font-extrabold uppercase tracking-wide shadow-chunky-sm">
                  {product.badge}
                </span>
              )}
            </div>
          </Reveal>

          {/* details */}
          <Reveal delay={100} className="lg:py-4">
            <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
              {product.category}
            </p>
            <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {product.title}
            </h1>

            {(product.weight || product.serves || product.pieces) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {[product.weight, product.pieces, product.serves]
                  .filter(Boolean)
                  .map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border-2 border-ink/15 bg-white px-3 py-1 text-xs font-bold text-ink-soft"
                    >
                      {chip}
                    </span>
                  ))}
              </div>
            )}

            <div className="mt-6">
              <BuyBox product={product} />
            </div>

            {product.description && (
              <div className="mt-8 rounded-3xl border-3 border-ink bg-white p-5 shadow-chunky-sm">
                <h2 className="font-display text-lg font-extrabold">
                  What you&apos;re getting
                </h2>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink-soft">
                  {product.description}
                </p>
              </div>
            )}

            <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {PERKS.map((perk) => (
                <li
                  key={perk.label}
                  className="flex items-center gap-2 rounded-2xl border-2 border-ink/12 bg-white px-3 py-2.5 text-[11px] font-extrabold leading-tight"
                >
                  <perk.icon className="h-4.5 w-4.5 shrink-0 text-brand" />
                  {perk.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* related */}
        {related.length > 0 && (
          <section className="mt-16 border-t-3 border-ink/10 pt-10 sm:mt-20">
            <Reveal>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Goes great <span className="text-brand">with</span>
              </h2>
            </Reveal>
            <ul className="mt-6 grid grid-cols-2 gap-3 pb-14 sm:gap-5 xl:grid-cols-4">
              {related.map((p, i) => (
                <Reveal as="li" key={p.id} delay={i * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

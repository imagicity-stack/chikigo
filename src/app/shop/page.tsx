import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";
import { buildCategories } from "@/lib/categories";
import { getProducts } from "@/lib/shopify";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Shop Fresh Cuts",
  description:
    "Browse fresh chicken, mutton, seafood, eggs and ready-to-cook — cut after you order, delivered in 30 minutes.",
};

export default async function ShopPage() {
  const { products, demo } = await getProducts();
  const categories = buildCategories(products, demo);

  return (
    <div className="px-4 sm:px-6">
      <div className="mx-auto max-w-7xl pb-2 pt-8 sm:pt-10">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
          The full counter
        </p>
        <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
          Pick your <span className="text-outline">cut</span> 🔪
        </h1>
        <p className="mt-2 max-w-xl text-sm font-semibold text-ink-soft sm:text-base">
          Everything below is cut after you order and delivered chilled, never frozen.
          {demo && " (Showing the demo catalog — connect Shopify to list your live products.)"}
        </p>
      </div>

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl py-10 text-center font-display text-lg font-bold text-ink-soft">
            Sharpening knives…
          </div>
        }
      >
        <ShopClient products={products} categories={categories} />
      </Suspense>
    </div>
  );
}

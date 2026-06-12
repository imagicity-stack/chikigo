"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";
import MeatArt, { ART_BG } from "./MeatArt";
import { discountPercent, formatMoney } from "@/lib/format";
import { BagIcon, CheckIcon, PlusIcon } from "./Icons";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, busy } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const variant = product.variants[0];

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    await addToCart({
      merchandiseId: variant.id,
      quantity: 1,
      snapshot: {
        title: product.title,
        variantTitle: variant.title,
        price: variant.price,
        art: product.art,
        handle: product.handle,
        image: product.image,
      },
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border-3 border-ink bg-white shadow-chunky-sm transition duration-200 hover:-translate-y-1.5 hover:shadow-chunky"
    >
      {/* art / image */}
      <div
        className={`relative aspect-[5/4] overflow-hidden border-b-3 border-ink bg-gradient-to-br ${ART_BG[product.art]}`}
      >
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.altText ?? product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <MeatArt
            art={product.art}
            className="absolute inset-0 m-auto h-[78%] w-[78%] transition duration-300 group-hover:rotate-3 group-hover:scale-110"
          />
        )}
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full border-2 border-ink bg-amber px-2.5 py-0.5 font-display text-[11px] font-extrabold uppercase tracking-wide text-ink">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute right-2.5 top-2.5 rotate-6 rounded-lg border-2 border-ink bg-brand px-2 py-1 font-display text-[11px] font-extrabold text-white shadow-chunky-sm">
            {discount}% OFF
          </span>
        )}
        {!product.availableForSale && (
          <span className="absolute inset-x-0 bottom-0 bg-ink/85 py-1.5 text-center font-display text-xs font-bold uppercase tracking-widest text-cream">
            Sold out today
          </span>
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-1 p-3.5 sm:p-4">
        <h3 className="font-display text-[15px] font-extrabold leading-snug sm:text-base">
          {product.title}
        </h3>
        <p className="text-xs font-semibold text-ink-soft">
          {[product.weight, product.serves].filter(Boolean).join(" · ") || product.category}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="leading-tight">
            <span className="font-display text-lg font-extrabold sm:text-xl">
              {formatMoney(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="ml-1.5 text-xs font-bold text-ink/40 line-through">
                {formatMoney(product.compareAtPrice)}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={busy || !product.availableForSale || !variant}
            aria-label={`Add ${product.title} to basket`}
            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-3 border-ink text-white shadow-chunky-sm transition active:translate-y-1 active:shadow-none ${
              justAdded ? "bg-leaf" : "bg-brand hover:bg-brand-dark"
            }`}
          >
            {justAdded ? (
              <CheckIcon className="h-4.5 w-4.5 animate-pop" />
            ) : (
              <>
                <BagIcon className="h-4.5 w-4.5" />
                <PlusIcon className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-ink bg-amber p-px text-ink" />
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

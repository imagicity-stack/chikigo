"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { discountPercent, formatMoney } from "@/lib/format";
import { BagIcon, BoltIcon, CheckIcon, MinusIcon, PlusIcon } from "./Icons";
import type { Product } from "@/lib/types";

export default function BuyBox({ product }: { product: Product }) {
  const { addToCart, busy } = useCart();
  const [selectedId, setSelectedId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const variant =
    product.variants.find((v) => v.id === selectedId) ?? product.variants[0];
  const discount = variant ? discountPercent(variant.price, variant.compareAtPrice) : null;

  const handleAdd = async () => {
    if (!variant) return;
    await addToCart({
      merchandiseId: variant.id,
      quantity,
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
    setTimeout(() => setJustAdded(false), 1800);
  };

  const addLabel = justAdded ? "Added to basket!" : "Add to basket";

  return (
    <>
      <div className="space-y-5">
        {/* price */}
        <div className="flex flex-wrap items-baseline gap-2.5">
          <span className="font-display text-4xl font-extrabold">
            {variant ? formatMoney(variant.price) : "—"}
          </span>
          {variant?.compareAtPrice && (
            <span className="text-lg font-bold text-ink/40 line-through">
              {formatMoney(variant.compareAtPrice)}
            </span>
          )}
          {discount && (
            <span className="rotate-2 rounded-lg border-2 border-ink bg-brand px-2 py-0.5 font-display text-sm font-extrabold text-white">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* variants */}
        {product.variants.length > 1 && (
          <div>
            <p className="mb-2 font-display text-sm font-extrabold uppercase tracking-wider text-ink-soft">
              Pick your pack
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedId(v.id)}
                  disabled={!v.availableForSale}
                  className={`rounded-2xl border-3 border-ink px-4 py-2 font-display text-sm font-bold transition active:scale-95 disabled:opacity-40 ${
                    v.id === variant?.id
                      ? "bg-ink text-cream shadow-chunky-sm"
                      : "bg-white hover:bg-amber/40"
                  }`}
                >
                  {v.title}
                  <span className="ml-2 opacity-70">{formatMoney(v.price)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* qty + add (desktop/tablet) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border-3 border-ink bg-white shadow-chunky-sm">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="px-4 py-2.5 transition active:scale-90"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="min-w-8 text-center font-display text-lg font-extrabold">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(50, q + 1))}
              aria-label="Increase quantity"
              className="px-4 py-2.5 transition active:scale-90"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleAdd}
            disabled={busy || !variant || !product.availableForSale}
            className={`btn flex-1 text-lg sm:flex-none sm:px-10 ${
              justAdded ? "btn-primary !bg-leaf" : "btn-primary"
            }`}
          >
            {justAdded ? <CheckIcon className="h-5 w-5" /> : <BagIcon className="h-5 w-5" />}
            {addLabel}
          </button>
        </div>

        <p className="flex items-center gap-2 text-sm font-bold text-ink-soft">
          <BoltIcon className="h-4 w-4 text-brand" />
          Order now — delivered today in a 30-minute slot.
        </p>
      </div>

      {/* sticky mobile buy bar */}
      <div className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom))] z-[55] border-t-3 border-ink bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <span className="block font-display text-xl font-extrabold">
              {variant ? formatMoney({ ...variant.price, amount: variant.price.amount * quantity }) : "—"}
            </span>
            <span className="text-[11px] font-bold text-ink-soft">
              {quantity} × {variant?.title ?? ""}
            </span>
          </div>
          <button
            onClick={handleAdd}
            disabled={busy || !variant || !product.availableForSale}
            className={`btn flex-1 py-3 text-base ${justAdded ? "btn-primary !bg-leaf" : "btn-primary"}`}
          >
            {justAdded ? <CheckIcon className="h-5 w-5" /> : <BagIcon className="h-5 w-5" />}
            {addLabel}
          </button>
        </div>
      </div>
    </>
  );
}

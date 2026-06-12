"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { FREE_DELIVERY_THRESHOLD, useCart } from "./CartContext";
import MeatArt, { ART_BG } from "./MeatArt";
import { formatMoney } from "@/lib/format";
import { BagIcon, BoltIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon, XIcon } from "./Icons";

export default function CartDrawer() {
  const { cart, isOpen, busy, demoMode, closeCart, updateLine, removeLine } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const lines = cart?.lines ?? [];
  const subtotal = cart?.subtotal ?? { amount: 0, currencyCode: "INR" };
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal.amount);
  const progress = Math.min(100, (subtotal.amount / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <div
      className={`fixed inset-0 z-[70] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* overlay */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/55 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* drawer */}
      <aside
        role="dialog"
        aria-label="Your cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b-3 border-ink bg-brand px-5 py-4 text-white">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            Your Basket{" "}
            {cart && cart.totalQuantity > 0 && (
              <span className="ml-1 inline-block rounded-full bg-ink px-2.5 py-0.5 text-sm align-middle">
                {cart.totalQuantity}
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full border-2 border-white/0 p-2 transition hover:rotate-90 hover:border-white/60"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* free delivery progress */}
        <div className="border-b-2 border-ink/10 bg-cream-dark px-5 py-3">
          <div className="mb-1.5 flex items-center gap-2 text-sm font-bold">
            <TruckIcon className="h-4.5 w-4.5 shrink-0 text-brand" />
            {remaining > 0 ? (
              <span>
                Add{" "}
                <span className="text-brand">
                  {formatMoney({ amount: remaining, currencyCode: subtotal.currencyCode })}
                </span>{" "}
                more for FREE delivery
              </span>
            ) : (
              <span className="text-leaf">You&apos;ve unlocked FREE delivery! 🎉</span>
            )}
          </div>
          <div className="h-2.5 overflow-hidden rounded-full border-2 border-ink/20 bg-white">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber to-brand transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* lines */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="relative">
                <BagIcon className="h-20 w-20 text-ink/20" strokeWidth={1.6} />
                <span className="absolute -right-2 -top-2 animate-wiggle text-3xl">🍗</span>
              </div>
              <p className="font-display text-xl font-bold">Your basket is hungry.</p>
              <p className="max-w-[220px] text-sm text-ink-soft">
                Fill it with fresh cuts — delivery in as little as 30 minutes.
              </p>
              <button onClick={closeCart} className="btn btn-primary mt-2">
                Browse fresh cuts
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-3 rounded-2xl border-3 border-ink bg-white p-3 shadow-chunky-sm"
                >
                  <Link
                    href={`/product/${line.handle}`}
                    onClick={closeCart}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-ink/15 bg-gradient-to-br ${ART_BG[line.art]}`}
                  >
                    {line.image ? (
                      <Image
                        src={line.image.url}
                        alt={line.image.altText ?? line.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <MeatArt art={line.art} className="h-full w-full p-1.5" />
                    )}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${line.handle}`}
                        onClick={closeCart}
                        className="font-display text-sm font-bold leading-snug hover:text-brand"
                      >
                        {line.title}
                      </Link>
                      <button
                        onClick={() => removeLine(line.id)}
                        disabled={busy}
                        aria-label={`Remove ${line.title}`}
                        className="shrink-0 rounded-lg p-1 text-ink/40 transition hover:bg-brand/10 hover:text-brand"
                      >
                        <TrashIcon className="h-4.5 w-4.5" />
                      </button>
                    </div>
                    {line.variantTitle && (
                      <span className="text-xs font-semibold text-ink-soft">
                        {line.variantTitle}
                      </span>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border-2 border-ink">
                        <button
                          onClick={() => updateLine(line.id, line.quantity - 1)}
                          disabled={busy}
                          aria-label="Decrease quantity"
                          className="px-2.5 py-1 transition active:scale-90"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center font-display text-sm font-extrabold">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => updateLine(line.id, line.quantity + 1)}
                          disabled={busy}
                          aria-label="Increase quantity"
                          className="px-2.5 py-1 transition active:scale-90"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-base font-extrabold">
                        {formatMoney(line.lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* footer */}
        {lines.length > 0 && (
          <div className="border-t-3 border-ink bg-white px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-semibold text-ink-soft">Subtotal</span>
              <span className="font-display text-2xl font-extrabold">
                {formatMoney(subtotal)}
              </span>
            </div>
            {demoMode ? (
              <div className="space-y-2">
                <button className="btn btn-ink w-full text-lg" disabled>
                  <BoltIcon className="h-5 w-5 text-amber" />
                  Checkout
                </button>
                <p className="text-center text-xs font-semibold text-ink-soft">
                  Demo mode — connect your Shopify store in{" "}
                  <code className="rounded bg-cream-dark px-1">.env.local</code> to enable
                  real checkout.
                </p>
              </div>
            ) : (
              <a
                href={cart?.checkoutUrl ?? "#"}
                className="btn btn-ink w-full text-lg"
                aria-disabled={!cart?.checkoutUrl}
              >
                <BoltIcon className="h-5 w-5 text-amber" />
                Checkout securely
              </a>
            )}
            <p className="mt-2.5 text-center text-[11px] font-semibold tracking-wide text-ink-soft">
              ⚡ 30-min delivery slots · 🧊 Chilled, never frozen · 🔒 Secure payment
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

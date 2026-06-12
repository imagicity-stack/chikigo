"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { BagIcon, GridIcon, HomeIcon, WhatsAppIcon } from "./Icons";

export default function BottomNav() {
  const { cart, openCart } = useCart();
  const pathname = usePathname();
  const count = cart?.totalQuantity ?? 0;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

  const itemClass = (active: boolean) =>
    `flex flex-col items-center gap-0.5 pt-2 pb-1 text-[10px] font-bold tracking-wide transition ${
      active ? "text-brand" : "text-ink/60"
    }`;

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed inset-x-0 bottom-0 z-[65] border-t-3 border-ink bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <div className="grid grid-cols-4">
        <Link href="/" className={itemClass(pathname === "/")}>
          <HomeIcon className="h-5.5 w-5.5" />
          Home
        </Link>
        <Link href="/shop" className={itemClass(pathname.startsWith("/shop"))}>
          <GridIcon className="h-5.5 w-5.5" />
          Shop
        </Link>
        <button onClick={openCart} className={itemClass(false)} aria-label="Open cart">
          <span className="relative -mt-5 flex h-12 w-12 items-center justify-center rounded-full border-3 border-ink bg-brand text-white shadow-chunky-sm transition active:translate-y-1 active:shadow-none">
            <BagIcon className="h-6 w-6" />
            {count > 0 && (
              <span
                key={count}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 animate-pop items-center justify-center rounded-full border-2 border-ink bg-amber px-1 font-display text-[11px] font-extrabold text-ink"
              >
                {count > 99 ? "99+" : count}
              </span>
            )}
          </span>
          Basket
        </button>
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi Chikigo! I'd like to order fresh meat.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClass(false)}
        >
          <WhatsAppIcon className="h-5.5 w-5.5" />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}

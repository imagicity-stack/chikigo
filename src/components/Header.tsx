"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useCart } from "./CartContext";
import { BagIcon, BoltIcon, MenuIcon, PinIcon, XIcon } from "./Icons";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?cat=chicken", label: "Chicken" },
  { href: "/shop?cat=mutton", label: "Mutton" },
  { href: "/shop?cat=seafood", label: "Seafood" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { cart, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const count = cart?.totalQuantity ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* promo strip */}
      <div className="relative z-[60] flex items-center justify-center gap-2 bg-ink px-3 py-1.5 text-center text-[11px] font-bold tracking-wide text-cream sm:text-xs">
        <BoltIcon className="h-3.5 w-3.5 shrink-0 text-amber" />
        <span>
          FLAT 20% OFF your first order — code{" "}
          <span className="rounded bg-brand px-1.5 py-0.5 font-display tracking-widest">
            CHIKI20
          </span>
        </span>
        <span className="hidden items-center gap-1 sm:inline-flex">
          · <PinIcon className="h-3.5 w-3.5 text-amber" /> Delivering across the city
        </span>
      </div>

      <header
        className={`sticky top-0 z-[60] border-b-3 border-ink bg-cream/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_4px_24px_-12px_rgb(43_36_38/0.4)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Logo size="md" />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3.5 py-1.5 font-display text-[15px] font-bold text-ink transition hover:-rotate-2 hover:bg-brand hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/shop" className="btn btn-primary hidden px-5 py-2 text-sm sm:inline-flex">
              <BoltIcon className="h-4 w-4 text-amber" />
              Order now
            </Link>
            <button
              onClick={openCart}
              aria-label={`Open cart, ${count} items`}
              className="relative rounded-full border-3 border-ink bg-white p-2.5 shadow-chunky-sm transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
            >
              <BagIcon className="h-5 w-5" />
              {count > 0 && (
                <span
                  key={count}
                  className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 animate-pop items-center justify-center rounded-full border-2 border-ink bg-brand px-1 font-display text-[11px] font-extrabold text-white"
                >
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-full border-3 border-ink bg-white p-2.5 shadow-chunky-sm transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[80] flex flex-col bg-ink text-cream transition-[opacity,visibility] duration-300 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="dialog"
        aria-label="Menu"
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Logo size="md" light />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="rounded-full border-3 border-cream/30 p-2.5 transition hover:rotate-90 hover:border-brand hover:text-brand"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-7" aria-label="Mobile">
          {NAV.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-baseline gap-3 py-2.5 font-display text-4xl font-extrabold tracking-tight transition hover:translate-x-2 hover:text-brand"
              style={{
                transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(12px)",
                transitionProperty: "opacity, transform, color",
                transitionDuration: "400ms",
              }}
            >
              <span className="font-body text-sm font-bold text-brand">0{i + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-7 pb-10">
          <p className="font-display text-sm font-bold tracking-[0.18em] text-cream/60">
            FRESH CUTS. <span className="text-brand">FAST DELIVERY.</span>
          </p>
        </div>
      </div>
    </>
  );
}

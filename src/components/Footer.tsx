import Link from "next/link";
import Logo from "./Logo";
import Marquee from "./Marquee";
import { LeafIcon, MailIcon, PhoneIcon, PinIcon, ShieldIcon, TruckIcon } from "./Icons";

const SHOP_LINKS = [
  { href: "/shop?cat=chicken", label: "Chicken" },
  { href: "/shop?cat=mutton", label: "Mutton" },
  { href: "/shop?cat=seafood", label: "Seafood" },
  { href: "/shop?cat=eggs", label: "Eggs" },
  { href: "/shop?cat=ready-to-cook", label: "Ready to Cook" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact Us" },
  { href: "/shop", label: "All Products" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <Marquee
        items={[
          "FRESH CUTS",
          "FAST DELIVERY",
          "NEVER FROZEN",
          "CUT TO ORDER",
          "FSSAI LICENSED",
          "30-MIN SLOTS",
        ]}
        className="border-y-3 border-ink bg-brand py-3 font-display text-lg font-extrabold text-white"
        separator="🍗"
      />

      <div className="mx-auto max-w-7xl px-4 pb-28 pt-12 sm:px-6 lg:pb-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div className="space-y-4">
            <Logo size="md" light tagline />
            <p className="max-w-xs text-sm leading-relaxed text-cream/70">
              Chikigo delivers fresh, hygienically cut meat from our kitchen to yours
              in as little as 30 minutes. Cut after you order. Chilled, never frozen.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold">
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-cream/25 px-3 py-1">
                <ShieldIcon className="h-3.5 w-3.5 text-amber" /> FSSAI Licensed
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-cream/25 px-3 py-1">
                <LeafIcon className="h-3.5 w-3.5 text-leaf" /> No Antibiotics
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-cream/25 px-3 py-1">
                <TruckIcon className="h-3.5 w-3.5 text-brand" /> Cold Chain
              </span>
            </div>
          </div>

          <nav aria-label="Shop">
            <h3 className="mb-3 font-display text-lg font-extrabold text-brand">Shop</h3>
            <ul className="space-y-2 text-sm font-semibold text-cream/75">
              {SHOP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:pl-1 hover:text-amber">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="mb-3 font-display text-lg font-extrabold text-brand">Company</h3>
            <ul className="space-y-2 text-sm font-semibold text-cream/75">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:pl-1 hover:text-amber">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-3 font-display text-lg font-extrabold text-brand">
              Get in touch
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold text-cream/75">
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-amber" />
                <a href="tel:+919999999999" className="hover:text-amber">
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 shrink-0 text-amber" />
                <a href="mailto:hello@chikigo.in" className="hover:text-amber">
                  hello@chikigo.in
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <span>Delivering fresh across your city, 6 AM – 10 PM, every day.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t-2 border-cream/15 pt-6 text-xs font-semibold text-cream/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Chikigo. All rights reserved.</span>
          <span>
            Made with <span className="text-brand">♥</span> and very sharp knives.
          </span>
        </div>
      </div>

      {/* giant watermark */}
      <div
        className="select-none overflow-hidden pb-[env(safe-area-inset-bottom)] leading-none"
        aria-hidden="true"
      >
        <p className="-mb-[0.23em] text-center font-display text-[22vw] font-extrabold tracking-tight text-cream/[0.06]">
          Chikigo
        </p>
      </div>
    </footer>
  );
}

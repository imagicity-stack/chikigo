import Link from "next/link";
import Marquee from "@/components/Marquee";
import MeatArt from "@/components/MeatArt";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import {
  ArrowRightIcon,
  BoltIcon,
  KnifeIcon,
  LeafIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { buildCategories } from "@/lib/categories";
import { getProducts } from "@/lib/shopify";
import type { Category } from "@/lib/types";

export const revalidate = 120;

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Hi Chikigo! I'd like to order fresh meat. 🍗",
)}`;

export default async function HomePage() {
  const { products, demo } = await getProducts();
  const bestsellers = products.slice(0, 8);
  const categories = buildCategories(products, demo);

  return (
    <>
      <Hero demo={demo} />
      <RedTicker />
      <Categories categories={categories} />
      <Bestsellers>
        {bestsellers.map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 4) * 70}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </Bestsellers>
      <HowItWorks />
      <FreshPromise />
      <Testimonials />
      <WhatsAppCta />
      <Faq />
    </>
  );
}

/* ─────────────────────────── hero ──────────────────────────── */

function Hero({ demo }: { demo: boolean }) {
  return (
    <section className="dot-grid relative overflow-hidden">
      {/* floating bits */}
      <MeatArt
        art="drumstick"
        className="pointer-events-none absolute -left-8 top-10 h-24 w-24 rotate-[-18deg] opacity-25 [--float-rotate:-18deg] animate-float-slow sm:h-32 sm:w-32"
      />
      <MeatArt
        art="prawn"
        className="pointer-events-none absolute -right-6 bottom-24 h-20 w-20 rotate-12 opacity-25 [--float-rotate:12deg] animate-float sm:h-28 sm:w-28 lg:bottom-10"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-6 lg:pb-20">
        <div className="relative z-10 text-center lg:text-left">
          {demo && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-amber/80 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider">
              Demo catalog — add Shopify keys to go live
            </p>
          )}
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border-3 border-ink bg-white px-4 py-1.5 font-display text-sm font-extrabold shadow-chunky-sm">
            <BoltIcon className="h-4 w-4 text-brand" />
            DELIVERED IN 30 MINUTES
          </p>

          <h1 className="font-display text-[13.5vw] font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.2rem]">
            FRESH MEAT,
            <br />
            <span className="text-brand">FREAKY</span>{" "}
            <span className="text-outline">FAST.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base font-semibold leading-relaxed text-ink-soft sm:text-lg lg:mx-0">
            Chicken, mutton & seafood — cut <em>after</em> you order, chilled at
            0–4°C, and sprinted to your door. Never frozen. Never boring.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link href="/shop" className="btn btn-primary px-7 py-3 text-lg">
              Shop fresh cuts
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost px-6 py-3 text-lg"
            >
              <WhatsAppIcon className="h-5 w-5 text-leaf" />
              WhatsApp us
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-extrabold tracking-wide text-ink-soft lg:justify-start">
            <li className="flex items-center gap-1.5">
              <ShieldIcon className="h-4 w-4 text-brand" /> FSSAI LICENSED
            </li>
            <li className="flex items-center gap-1.5">
              <LeafIcon className="h-4 w-4 text-leaf" /> NO ANTIBIOTICS
            </li>
            <li className="flex items-center gap-1.5">
              <KnifeIcon className="h-4 w-4 text-amber" /> CUT TO ORDER
            </li>
          </ul>
        </div>

        {/* hero art */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="sticker relative mx-auto aspect-square w-[78%] rounded-full bg-gradient-to-br from-[#ffe3cf] to-[#ffc9b0]">
            <MeatArt
              art="drumstick"
              className="absolute inset-0 m-auto h-[72%] w-[72%] animate-float"
            />
            {/* steam */}
            <span className="absolute left-1/2 top-3 h-4 w-1.5 -translate-x-4 rounded-full bg-ink/20 animate-steam" />
            <span className="absolute left-1/2 top-2 h-5 w-1.5 translate-x-2 rounded-full bg-ink/20 animate-steam [animation-delay:0.9s]" />
          </div>

          <div className="sticker tilt-l absolute -left-1 top-4 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 animate-float-slow sm:left-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf/15">
              <TruckIcon className="h-5 w-5 text-leaf" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-extrabold">Order #1042</p>
              <p className="text-[11px] font-bold text-ink-soft">
                Delivered in <span className="text-leaf">28 min</span> 🚀
              </p>
            </div>
          </div>

          <div className="sticker tilt-r absolute -right-1 bottom-6 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 animate-float [animation-delay:1.2s] sm:right-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber/25">
              <StarIcon className="h-5 w-5 text-amber" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-extrabold">4.9 / 5</p>
              <p className="text-[11px] font-bold text-ink-soft">12,000+ happy kitchens</p>
            </div>
          </div>

          <div className="sticker absolute -bottom-3 left-1/2 -translate-x-1/2 rotate-[-3deg] rounded-full bg-brand px-4 py-1.5 font-display text-sm font-extrabold text-white">
            0–4°C · NEVER FROZEN ❄️
          </div>
        </div>
      </div>
    </section>
  );
}

function RedTicker() {
  return (
    <div className="relative z-10 -rotate-1 border-y-3 border-ink bg-brand py-2.5 sm:-mt-2">
      <Marquee
        items={["FRESH CUTS", "FAST DELIVERY", "CUT TO ORDER", "NEVER FROZEN", "30-MIN SLOTS"]}
        className="font-display text-base font-extrabold tracking-wide text-white sm:text-lg"
        separator="⚡"
      />
    </div>
  );
}

/* ──────────────────────── categories ───────────────────────── */

function Categories({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal>
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
          The lineup
        </p>
        <h2 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Shop by <span className="text-outline">craving</span>
        </h2>
      </Reveal>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat, i) => (
          <Reveal
            as="li"
            key={cat.slug}
            delay={i * 70}
            className={i === 0 && categories.length % 2 === 1 ? "col-span-2 md:col-span-1" : ""}
          >
            <Link
              href={`/shop?cat=${cat.slug}`}
              className={`group flex h-full flex-col items-center gap-2 rounded-3xl border-3 border-ink bg-white p-5 text-center shadow-chunky-sm transition duration-200 hover:-translate-y-1.5 hover:bg-amber/20 hover:shadow-chunky ${
                i % 2 ? "md:tilt-r" : "md:tilt-l"
              } hover:!rotate-0`}
            >
              <MeatArt
                art={cat.art}
                className="h-20 w-20 transition duration-300 group-hover:scale-110 group-hover:-rotate-6 sm:h-24 sm:w-24"
              />
              <span className="font-display text-lg font-extrabold">{cat.name}</span>
              <span className="text-xs font-semibold text-ink-soft">{cat.tagline}</span>
              <span className="mt-auto inline-flex items-center gap-1 font-display text-xs font-extrabold text-brand opacity-0 transition group-hover:opacity-100">
                DIVE IN <ArrowRightIcon className="h-3.5 w-3.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ──────────────────────── bestsellers ──────────────────────── */

function Bestsellers({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-y-3 border-ink bg-cream-dark/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
              Crowd favourites
            </p>
            <h2 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              The <span className="text-brand">bestsellers</span>
            </h2>
          </div>
          <Link href="/shop" className="btn btn-ink hidden sm:inline-flex">
            See everything
            <ArrowRightIcon className="h-4.5 w-4.5" />
          </Link>
        </Reveal>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {children}
        </ul>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="btn btn-ink w-full">
            See everything
            <ArrowRightIcon className="h-4.5 w-4.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── how it works ─────────────────────── */

const STEPS = [
  {
    icon: BoltIcon,
    title: "You tap it",
    text: "Pick your cuts in the app or on WhatsApp. Takes less time than boiling water.",
    color: "bg-amber text-ink",
  },
  {
    icon: KnifeIcon,
    title: "We cut it",
    text: "Your order is cut fresh by certified butchers the moment it lands. Not a second before.",
    color: "bg-brand text-white",
  },
  {
    icon: TruckIcon,
    title: "We sprint",
    text: "Chilled at 0–4°C and raced to your door in a 30-minute slot. Still cold, guaranteed.",
    color: "bg-leaf text-white",
  },
];

function HowItWorks() {
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="text-center">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-amber">
            Cleaver-sharp simple
          </p>
          <h2 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            From tap to <span className="text-brand">tawa</span> in 30
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 110}>
              <div className="relative h-full rounded-3xl border-3 border-cream/20 bg-cream/5 p-6 pt-9 transition hover:-translate-y-1 hover:border-cream/40">
                <span className="absolute -top-5 left-6 font-display text-6xl font-extrabold text-cream/15">
                  0{i + 1}
                </span>
                <span
                  className={`relative mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border-3 border-ink ${step.color} shadow-[0_4px_0_0_rgb(253_248_240/0.35)]`}
                >
                  <step.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-2xl font-extrabold">{step.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-cream/70">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────── fresh promise ─────────────────────── */

const PROMISES = [
  "Cut only after you order — zero pre-cut stock",
  "Chilled at 0–4°C from cleaver to doorstep",
  "FSSAI-licensed facility, washed in RO water",
  "Antibiotic-residue-free, vet-checked sourcing",
  "Didn't love it? Full refund, no questions",
];

function FreshPromise() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2">
        <Reveal>
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
            The Chikigo promise
          </p>
          <h2 className="mt-1 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Never frozen.
            <br />
            <span className="text-outline">Never sorry.</span>
          </h2>
          <ul className="mt-6 space-y-3">
            {PROMISES.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 70} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-leaf text-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 13 4.5 4.5L19 7" />
                  </svg>
                </span>
                <span className="font-semibold">{p}</span>
              </Reveal>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="sticker relative mx-auto flex aspect-square w-full max-w-sm flex-col items-center justify-center gap-2 rounded-[3rem] bg-gradient-to-br from-[#dcf0fb] to-[#bfe0f3] text-center">
            <span className="text-5xl" aria-hidden="true">
              🧊
            </span>
            <p className="font-display text-7xl font-extrabold tracking-tight">
              0–4<span className="text-brand">°C</span>
            </p>
            <p className="px-8 font-display text-lg font-bold text-ink-soft">
              the only temperature your meat ever knows
            </p>
            <span className="sticker absolute -right-3 top-8 rotate-12 rounded-full bg-amber px-3.5 py-1 font-display text-xs font-extrabold animate-wiggle">
              COLD CHAIN ✓
            </span>
            <span className="sticker absolute -left-3 bottom-10 -rotate-6 rounded-full bg-white px-3.5 py-1 font-display text-xs font-extrabold">
              VET CHECKED 🩺
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────── testimonials ──────────────────────── */

const REVIEWS = [
  {
    name: "Priya M.",
    place: "Indiranagar",
    text: "Ordered at 6:40, biryani on the stove by 7:15. The curry cut was so fresh it made my Sunday. Chikigo is sorcery.",
    emoji: "🍛",
  },
  {
    name: "Arjun K.",
    place: "Powai",
    text: "Gym guy here — their boneless breast is cleaner than my bulking spreadsheet. Zero water release on the pan. Hooked.",
    emoji: "💪",
  },
  {
    name: "Sana & Omar",
    place: "Banjara Hills",
    text: "The seekh kebabs saved our house party. 8 sticks, 12 minutes, 0 leftovers. The delivery guy even rang twice politely.",
    emoji: "🎉",
  },
];

function Testimonials() {
  return (
    <section className="border-y-3 border-ink bg-amber/15">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="text-center">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
            Word on the street
          </p>
          <h2 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            12,000+ happy <span className="text-brand">kitchens</span>
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal
              as="li"
              key={r.name}
              delay={i * 100}
              className={i % 2 ? "md:tilt-r" : "md:tilt-l"}
            >
              <figure className="flex h-full flex-col rounded-3xl border-3 border-ink bg-white p-6 shadow-chunky-sm transition hover:rotate-0 hover:-translate-y-1">
                <div className="flex gap-1 text-amber" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} className="h-4.5 w-4.5" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm font-semibold leading-relaxed text-ink-soft">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-cream text-lg">
                    {r.emoji}
                  </span>
                  <div className="leading-tight">
                    <p className="font-display text-sm font-extrabold">{r.name}</p>
                    <p className="text-xs font-bold text-ink-soft">{r.place}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────── whatsapp cta ──────────────────────── */

function WhatsAppCta() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <MeatArt
        art="wings"
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rotate-12 opacity-15"
      />
      <MeatArt
        art="fish"
        className="pointer-events-none absolute -bottom-12 -left-10 h-44 w-44 -rotate-12 opacity-15"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-amber">
            Too lazy to browse?
          </p>
          <h2 className="mt-1 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Order on WhatsApp.
            <br />
            <span className="text-outline-cream">Like texting a friend.</span>
          </h2>
          <p className="mt-4 max-w-md text-base font-semibold leading-relaxed text-white/85">
            Message us what you&apos;re craving — “2kg curry cut & a dozen eggs” works
            perfectly. A real human (and a very fast bike) handles the rest.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-cream mt-7 px-7 py-3 text-lg"
          >
            <WhatsAppIcon className="h-5.5 w-5.5 text-leaf" />
            Chat with Chikigo
          </a>
        </Reveal>

        {/* phone mockup */}
        <Reveal delay={150} className="mx-auto w-full max-w-[290px]">
          <div className="rounded-[2.4rem] border-4 border-ink bg-ink p-2.5 shadow-lifted">
            <div className="space-y-2.5 rounded-[1.9rem] bg-cream p-4 pb-7 pt-9 text-ink">
              <div className="mx-auto -mt-5 mb-2 h-1.5 w-16 rounded-full bg-ink/20" />
              <p className="text-center font-display text-xs font-extrabold tracking-wider text-ink-soft">
                CHIKIGO · online ⚡
              </p>
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-leaf/20 px-3.5 py-2 text-sm font-semibold">
                2 kg curry cut pls 🙏
              </div>
              <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm border-2 border-ink/10 bg-white px-3.5 py-2 text-sm font-semibold">
                On it! Cut fresh & at your door by{" "}
                <span className="font-extrabold text-brand">7:25 PM</span> ⚡
              </div>
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-leaf/20 px-3.5 py-2 text-sm font-semibold">
                you guys are unreal 😭🔥
              </div>
              <div className="w-fit rounded-2xl rounded-bl-sm border-2 border-ink/10 bg-white px-3.5 py-2 text-sm font-semibold">
                🍗❤️
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────── faq ─────────────────────────── */

const FAQS = [
  {
    q: "Is the meat really never frozen?",
    a: "Really. Your order is cut after you place it, chilled to 0–4°C, and delivered in an insulated box. We don't own a single freezer for stock — that's the whole point of Chikigo.",
  },
  {
    q: "How fast is 'fast delivery'?",
    a: "In most service areas we deliver inside a 30-minute slot you pick at checkout. During peak dinner rush it can stretch slightly — we'll always show you a live ETA.",
  },
  {
    q: "What if I'm not happy with my order?",
    a: "Tell us within 24 hours and we'll refund or replace it, no interrogation. Freshness complaints are taken extremely personally by our butchers.",
  },
  {
    q: "Where do you source from?",
    a: "Partner farms we audit ourselves — vet-checked birds and livestock raised without antibiotic misuse, processed in FSSAI-licensed facilities, washed in RO water.",
  },
  {
    q: "Do you deliver every day?",
    a: "Every single day, 6 AM to 10 PM — including Sundays, match days and that one rainy day everyone else stops delivering.",
  },
];

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal className="text-center">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
          Burning questions
        </p>
        <h2 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Before you <span className="text-brand">grill</span> us
        </h2>
      </Reveal>

      <div className="mt-8 space-y-3">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <details className="group rounded-2xl border-3 border-ink bg-white shadow-chunky-sm open:shadow-chunky">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-display text-base font-extrabold sm:text-lg [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-amber font-body text-lg font-bold transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm font-semibold leading-relaxed text-ink-soft">
                {f.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

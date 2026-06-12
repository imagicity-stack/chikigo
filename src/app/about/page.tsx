import type { Metadata } from "next";
import Link from "next/link";
import MeatArt from "@/components/MeatArt";
import Reveal from "@/components/Reveal";
import {
  ArrowRightIcon,
  BoltIcon,
  KnifeIcon,
  LeafIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why Chikigo exists: fresh meat, cut after you order, delivered freaky fast. No freezers, no shortcuts.",
};

const VALUES = [
  {
    icon: KnifeIcon,
    title: "Cut to order",
    text: "Nothing is pre-cut and waiting around. Your order is the butcher's next job.",
  },
  {
    icon: BoltIcon,
    title: "Obsessed with speed",
    text: "We time every delivery like a relay race. 30-minute slots, live ETAs, zero excuses.",
  },
  {
    icon: ShieldIcon,
    title: "Hygiene first",
    text: "FSSAI-licensed facility, RO-washed cuts, gloved hands, sanitised blades. Every. Single. Time.",
  },
  {
    icon: LeafIcon,
    title: "Honest sourcing",
    text: "Partner farms we audit ourselves — vet-checked and raised without antibiotic misuse.",
  },
];

const TIMELINE = [
  ["6:00 AM", "Farm pickups — vet-checked, same-day stock only."],
  ["8:00 AM", "Quality check: temperature, texture & freshness audits."],
  ["All day", "Orders cut fresh by certified butchers, the moment they land."],
  ["+30 min", "Insulated cold-chain delivery sprints to your doorstep."],
  ["10:00 PM", "Counters cleared. Nothing carries over. Tomorrow starts fresh."],
];

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-6">
      {/* hero */}
      <section className="dot-grid -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div className="mx-auto max-w-4xl py-14 text-center sm:py-20">
          <Reveal>
            <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
              Our story
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
              We got tired of <span className="text-brand">“fresh”</span>
              <br />
              meaning <span className="text-outline">frozen-ish.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-ink-soft sm:text-lg">
              Chikigo started with a simple gripe: why does buying meat mean choosing
              between a crowded market at 7 AM and a freezer bag of mystery? So we
              built the thing we wanted — a butcher counter that lives in your phone,
              cuts only after you order, and runs like a sprint team.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-8 flex justify-center gap-6">
            <MeatArt art="drumstick" className="h-16 w-16 -rotate-12 animate-float sm:h-20 sm:w-20" />
            <MeatArt art="prawn" className="h-16 w-16 animate-float [animation-delay:0.6s] sm:h-20 sm:w-20" />
            <MeatArt art="fish" className="h-16 w-16 rotate-12 animate-float [animation-delay:1.2s] sm:h-20 sm:w-20" />
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="mx-auto max-w-7xl py-10 sm:py-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 80}>
              <div className="h-full rounded-3xl border-3 border-ink bg-white p-5 shadow-chunky-sm transition hover:-translate-y-1 hover:shadow-chunky">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-ink bg-brand text-white">
                  <v.icon className="h-5.5 w-5.5" />
                </span>
                <h2 className="font-display text-xl font-extrabold">{v.title}</h2>
                <p className="mt-1.5 text-sm font-semibold leading-relaxed text-ink-soft">
                  {v.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* a day at chikigo */}
      <section className="-mx-4 border-y-3 border-ink bg-ink px-4 text-cream sm:-mx-6 sm:px-6">
        <div className="mx-auto max-w-3xl py-14 sm:py-20">
          <Reveal className="text-center">
            <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-amber">
              Behind the counter
            </p>
            <h2 className="mt-1 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              A day at <span className="text-brand">Chikigo</span>
            </h2>
          </Reveal>
          <ol className="mt-10 space-y-0">
            {TIMELINE.map(([time, text], i) => (
              <Reveal as="li" key={time} delay={i * 80} className="relative flex gap-5 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="flex h-3.5 w-3.5 shrink-0 rounded-full border-2 border-cream bg-brand" />
                  {i < TIMELINE.length - 1 && (
                    <span className="w-0.5 flex-1 bg-cream/20" />
                  )}
                </div>
                <div className="-mt-1.5">
                  <p className="font-display text-lg font-extrabold text-amber">{time}</p>
                  <p className="text-sm font-semibold leading-relaxed text-cream/75">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-4xl py-14 text-center sm:py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            Taste the difference <span className="text-brand">tonight.</span>
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn btn-primary px-7 py-3 text-lg">
              <TruckIcon className="h-5 w-5" />
              Shop fresh cuts
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

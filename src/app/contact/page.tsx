import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import {
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions, feedback or a custom cut request? Talk to Chikigo on WhatsApp, phone or email — real humans, fast replies.",
};

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

const CHANNELS = [
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    line1: "Fastest — usually under 5 min",
    line2: "+91 99999 99999",
    href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Chikigo! 👋")}`,
    accent: "bg-leaf text-white",
  },
  {
    icon: PhoneIcon,
    title: "Call us",
    line1: "6 AM – 10 PM, every day",
    line2: "+91 99999 99999",
    href: "tel:+919999999999",
    accent: "bg-brand text-white",
  },
  {
    icon: MailIcon,
    title: "Email",
    line1: "Replies within 24 hours",
    line2: "hello@chikigo.in",
    href: "mailto:hello@chikigo.in",
    accent: "bg-amber text-ink",
  },
];

export default function ContactPage() {
  return (
    <div className="px-4 sm:px-6">
      <div className="mx-auto max-w-5xl py-14 sm:py-20">
        <Reveal className="text-center">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand">
            Say hello
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Talk to a <span className="text-brand">human</span> 👋
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base font-semibold text-ink-soft">
            Custom cut requests, delivery questions, feedback for our butchers —
            we read everything and reply fast.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 90}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-full flex-col items-center gap-2 rounded-3xl border-3 border-ink bg-white p-6 text-center shadow-chunky-sm transition hover:-translate-y-1.5 hover:shadow-chunky"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink ${c.accent}`}
                >
                  <c.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-xl font-extrabold">{c.title}</span>
                <span className="text-xs font-bold text-ink-soft">{c.line1}</span>
                <span className="font-display text-sm font-extrabold text-brand">
                  {c.line2}
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-10">
          <div className="grid gap-4 rounded-3xl border-3 border-ink bg-white p-6 shadow-chunky-sm sm:grid-cols-2 sm:p-8">
            <div className="flex items-start gap-3">
              <PinIcon className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <div>
                <h2 className="font-display text-lg font-extrabold">Service area</h2>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-ink-soft">
                  Delivering across the city — enter your pincode at checkout to
                  confirm your 30-minute slot.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <div>
                <h2 className="font-display text-lg font-extrabold">Hours</h2>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-ink-soft">
                  6 AM – 10 PM, all 7 days. Rain, match day or festival rush — the
                  bikes still roll.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

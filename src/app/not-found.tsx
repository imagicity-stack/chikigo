import Link from "next/link";
import MeatArt from "@/components/MeatArt";
import { ArrowRightIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="dot-grid flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="relative">
        <p className="font-display text-[28vw] font-extrabold leading-none tracking-tight text-outline sm:text-[12rem]">
          404
        </p>
        <MeatArt
          art="drumstick"
          className="absolute -right-6 -top-4 h-20 w-20 rotate-12 animate-wiggle sm:h-28 sm:w-28"
        />
      </div>
      <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-4xl">
        This cut doesn&apos;t exist.
      </h1>
      <p className="mt-2 max-w-sm text-sm font-semibold text-ink-soft">
        The page you&apos;re looking for got delivered somewhere else. The good stuff
        is still on the counter though.
      </p>
      <Link href="/shop" className="btn btn-primary mt-6 px-7 py-3 text-lg">
        Back to the shop
        <ArrowRightIcon className="h-5 w-5" />
      </Link>
    </div>
  );
}

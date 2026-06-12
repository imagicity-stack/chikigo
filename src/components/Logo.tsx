import Link from "next/link";

export function MotionDashes({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 30"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
    >
      <path d="M6 24 L10 13" />
      <path d="M17 22 L19 8" />
      <path d="M27 23 L31 14" />
    </svg>
  );
}

export default function Logo({
  size = "md",
  tagline = false,
  light = false,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  tagline?: boolean;
  light?: boolean;
}) {
  const sizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-6xl sm:text-7xl",
  } as const;
  const dashSizes = {
    sm: "h-3 -top-1.5 -right-3",
    md: "h-3.5 -top-2 -right-3.5",
    lg: "h-5 -top-3 -right-5",
    xl: "h-7 -top-4 -right-7",
  } as const;

  return (
    <Link
      href="/"
      aria-label="Chikigo — home"
      className="group inline-flex flex-col items-center leading-none"
    >
      <span
        className={`whitespace-nowrap font-display font-extrabold tracking-tight ${sizes[size]} ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        Chiki
        <span className="relative inline-block text-brand">
          go
          <MotionDashes
            className={`absolute text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6 ${dashSizes[size]}`}
          />
        </span>
      </span>
      {tagline && (
        <span
          className={`mt-1 flex items-center gap-2 font-display text-[0.55em] font-bold tracking-[0.18em] ${
            light ? "text-cream/80" : "text-ink-soft"
          }`}
        >
          <span className="h-0.5 w-5 rounded-full bg-brand" aria-hidden="true" />
          FRESH CUTS. <span className="text-brand">FAST DELIVERY.</span>
          <span className="h-0.5 w-5 rounded-full bg-brand" aria-hidden="true" />
        </span>
      )}
    </Link>
  );
}

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

function Base({
  children,
  className = "h-5 w-5",
  strokeWidth = 2.4,
  fill = "none",
}: IconProps & { children: React.ReactNode; fill?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const BagIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5.5 8h13l-1 12.5a1.5 1.5 0 0 1-1.5 1.4H8a1.5 1.5 0 0 1-1.5-1.4L5.5 8Z" />
    <path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" />
  </Base>
);

export const BoltIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" strokeWidth={0}>
    <path d="M13.2 2.2 4.8 13.4c-.3.5 0 1.1.6 1.1h4.8l-1.5 7c-.1.7.7 1.1 1.2.5l8.4-11.2c.4-.5 0-1.1-.6-1.1h-4.8l1.5-7c.1-.7-.7-1.1-1.2-.5Z" />
  </Base>
);

export const StarIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" strokeWidth={0}>
    <path d="M12 2.6 14.7 8.4l6.3.7-4.7 4.3 1.3 6.2L12 16.5 6.4 19.6l1.3-6.2L3 9.1l6.3-.7L12 2.6Z" />
  </Base>
);

export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </Base>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2.8 4.5 5.6v5.6c0 4.7 3.2 8 7.5 10 4.3-2 7.5-5.3 7.5-10V5.6L12 2.8Z" />
    <path d="m8.8 11.8 2.3 2.3 4.2-4.5" />
  </Base>
);

export const LeafIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 19C4 9 10 4 20 4c0 10-5 16-13 15.5" />
    <path d="M5 19c2-5 6-9 11-11" />
  </Base>
);

export const TruckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 6h11v11h-11z" />
    <path d="M13.5 10h4.2l3.3 3.7V17h-2.8" />
    <circle cx="6.5" cy="17.8" r="1.9" />
    <circle cx="16.6" cy="17.8" r="1.9" />
  </Base>
);

export const KnifeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20.5 3.5 8 16c-2 2-4.6 1.6-5.5.5L17 6c1.6-1.6 3.5-2.5 3.5-2.5Z" />
    <path d="m13 11 6.5 6.5" />
  </Base>
);

export const FlameIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21c4 0 6.5-2.6 6.5-6.2 0-3.1-2-5.2-3.6-7.1-.4 1.2-1 2-2 2.6.1-2.8-1.2-5.8-3.7-7.3.2 2.5-.6 4-2 5.7-1.2 1.6-2.7 3.4-2.7 6.1C4.5 18.4 8 21 12 21Z" />
  </Base>
);

export const PlusIcon = (p: IconProps) => (
  <Base {...p} strokeWidth={3}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const MinusIcon = (p: IconProps) => (
  <Base {...p} strokeWidth={3}>
    <path d="M5 12h14" />
  </Base>
);

export const XIcon = (p: IconProps) => (
  <Base {...p} strokeWidth={2.8}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const TrashIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 6.5h15M9 6.5V4.8c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3v1.7M7 6.5l.8 12.7c0 .7.6 1.3 1.3 1.3h5.8c.7 0 1.3-.6 1.3-1.3L17 6.5" />
    <path d="M10.2 10.5v6M13.8 10.5v6" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p} strokeWidth={2.8}>
    <path d="M4.5 12h15M13 5.5 19.5 12 13 18.5" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p} strokeWidth={2.8}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Base>
);

export const HomeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m3.5 10.8 8.5-7 8.5 7" />
    <path d="M5.5 9.5v10h4.7v-5.6h3.6v5.6h4.7v-10" />
  </Base>
);

export const GridIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
  </Base>
);

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 3.8h3.4l1.7 4.4-2.1 1.6a12.6 12.6 0 0 0 5.7 5.7l1.6-2.1 4.4 1.7V19c0 1.1-.9 2.1-2.1 2A16.4 16.4 0 0 1 3 6c-.1-1.2.9-2.2 2-2.2Z" />
  </Base>
);

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4.5 7.5 7.5 6 7.5-6" />
  </Base>
);

export const PinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21.5s-7-6.4-7-11.5a7 7 0 0 1 14 0c0 5.1-7 11.5-7 11.5Z" />
    <circle cx="12" cy="9.8" r="2.6" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p} strokeWidth={3}>
    <path d="m4.5 12.8 5 5L19.5 6.5" />
  </Base>
);

export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Base>
);

export const WhatsAppIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2a9.9 9.9 0 0 0-8.5 15.1L2 22l5-1.4A10 10 0 1 0 12 2Zm0 18.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.6-6c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.6.2-.8l.4-.5c.1-.2.2-.3.3-.5v-.5L9.8 7.5c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.2s1 2.6 1.1 2.8c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.7-.4Z" />
  </svg>
);

import type { ArtKey } from "@/lib/types";

/**
 * Hand-drawn flat SVG illustrations for every cut we sell.
 * Used wherever a product has no Shopify photo (demo mode) and
 * as playful brand art across the site.
 */

const STROKE = "#2b2426";
const sw = 5;

function Drumstick() {
  return (
    <>
      {/* bone */}
      <path d="M70 48 96 22" stroke={STROKE} strokeWidth={15} strokeLinecap="round" />
      <path d="M70 48 96 22" stroke="#f7ede1" strokeWidth={9} strokeLinecap="round" />
      <circle cx="103" cy="24" r="8.5" fill="#f7ede1" stroke={STROKE} strokeWidth={4.5} />
      <circle cx="94" cy="15" r="8.5" fill="#f7ede1" stroke={STROKE} strokeWidth={4.5} />
      {/* meat */}
      <path
        d="M67 31c11 4 17 13 17 24 0 21-19 39-40 39C26 94 13 84 13 67 13 43 41 21 67 31Z"
        fill="#f59f7f"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M68 42c6 5 8 14 5 21"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <path
        d="M30 81c-4-3-7-8-7-13"
        fill="none"
        stroke="#d9745a"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </>
  );
}

function Wings() {
  return (
    <>
      <path
        d="M18 64c2-14 14-24 28-24 8 0 13 4 20 4s12-6 21-6c10 0 16 7 15 15-1 10-12 14-22 16-8 2-13 8-22 10-16 4-42 4-40-15Z"
        fill="#f6a983"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M34 52c-4 3-7 7-8 12"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <path
        d="M66 48c-3 5-3 10 0 14M80 46c-2 4-2 9 0 13"
        fill="none"
        stroke="#d9745a"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </>
  );
}

function Breast() {
  return (
    <>
      <path
        d="M24 70c-8-16 2-38 22-44 21-7 47 1 52 18 4 14-8 24-24 28-19 5-42 12-50-2Z"
        fill="#f9b19b"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M42 38 56 64M58 33l13 25M74 32l10 20"
        stroke="#e2806b"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M33 44c-4 5-5 12-3 18"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth={sw}
        strokeLinecap="round"
      />
    </>
  );
}

function WholeChicken() {
  return (
    <>
      <ellipse cx="60" cy="58" rx="38" ry="30" fill="#f6c79b" stroke={STROKE} strokeWidth={sw} />
      <path
        d="M38 82c-4 6-1 12 5 12s9-5 8-11M82 82c4 6 1 12-5 12s-9-5-8-11"
        fill="#f7ede1"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M30 50c4-8 12-13 21-14M86 44c3 4 5 9 5 14"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <path
        d="M44 64c5 4 11 6 16 6s11-2 16-6"
        fill="none"
        stroke="#d99a64"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </>
  );
}

function CurryCut() {
  return (
    <>
      <rect x="14" y="42" width="38" height="36" rx="12" fill="#ef7d6b" stroke={STROKE} strokeWidth={sw} transform="rotate(-8 33 60)" />
      <rect x="56" y="50" width="34" height="32" rx="11" fill="#f59f7f" stroke={STROKE} strokeWidth={sw} transform="rotate(6 73 66)" />
      <rect x="44" y="16" width="34" height="30" rx="11" fill="#f6a983" stroke={STROKE} strokeWidth={sw} transform="rotate(-4 61 31)" />
      <circle cx="61" cy="31" r="6.5" fill="#f7ede1" stroke={STROKE} strokeWidth={4} />
      <path d="M24 52c3-2 8-3 12-2" stroke="#fff" strokeOpacity="0.7" strokeWidth={4} strokeLinecap="round" fill="none" />
      <path d="M66 60c4-1 9 0 12 2" stroke="#fff" strokeOpacity="0.6" strokeWidth={4} strokeLinecap="round" fill="none" />
    </>
  );
}

function Keema() {
  return (
    <>
      <path
        d="M20 66h80c-2 18-19 28-40 28S22 84 20 66Z"
        fill="#e8232e"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M24 66c-2-8 4-13 10-11 1-8 11-12 17-7 3-7 14-8 18-1 7-5 16-1 16 6 7-1 12 6 9 13H24Z"
        fill="#f08080"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <circle cx="42" cy="58" r="2.6" fill="#c1121f" />
      <circle cx="58" cy="54" r="2.6" fill="#c1121f" />
      <circle cx="74" cy="58" r="2.6" fill="#c1121f" />
      <path d="M48 92c8 2 16 2 24 0" stroke="#8e0a14" strokeWidth={4} strokeLinecap="round" fill="none" />
    </>
  );
}

function Chops() {
  return (
    <>
      <path
        d="M30 28c16-12 38-8 46 6 7 13 2 28-12 35-15 8-32 5-40-7-8-13-5-25 6-34Z"
        fill="#e0566a"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M36 35c12-9 27-7 33 3"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.65"
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <path d="M62 70 84 99" stroke="#f7ede1" strokeWidth={11} strokeLinecap="round" />
      <circle cx="88" cy="103" r="7.5" fill="#f7ede1" stroke={STROKE} strokeWidth={4.5} />
      <path d="M62 70 82 96" stroke={STROKE} strokeWidth={4.5} strokeLinecap="round" opacity="0.25" />
      <path
        d="M44 44c6-4 14-4 19 0"
        fill="none"
        stroke="#fbd1d9"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </>
  );
}

function Prawn() {
  return (
    <>
      <path
        d="M84 30C66 14 36 20 26 42c-9 21 4 44 26 48 8 2 16 1 22-2l-8-10c-22 6-36-12-30-28 6-15 26-19 38-8Z"
        fill="#fb8c5a"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M84 30c10 9 13 24 6 36-5 8-13 13-16 14l-8-10c8-3 14-9 15-17 1-9-3-17-9-21Z"
        fill="#f96f3d"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M70 92c-4 8 2 14 8 12-2-4-1-8 2-11"
        fill="#f96f3d"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path d="M46 40c-5 4-8 10-7 17M58 36c-4 3-6 8-6 13" stroke="#fdc4a4" strokeWidth={4} strokeLinecap="round" fill="none" />
      <path d="M86 28c4-6 12-8 18-6M88 34c6-2 13 0 16 4" stroke={STROKE} strokeWidth={4} strokeLinecap="round" fill="none" />
      <circle cx="80" cy="38" r="3" fill={STROKE} />
    </>
  );
}

function Fish() {
  return (
    <>
      <path
        d="M16 60c12-18 32-28 50-24 16 4 26 14 30 24-4 10-14 20-30 24-18 4-38-6-50-24Z"
        fill="#7fb5d6"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M96 60l16-14c2 9 2 19 0 28L96 60Z"
        fill="#5e9dc4"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M56 38c-4 6-6 14-6 22s2 16 6 22"
        fill="none"
        stroke="#5e9dc4"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path d="M24 54c4-4 9-7 14-9" stroke="#fff" strokeOpacity="0.7" strokeWidth={4} strokeLinecap="round" fill="none" />
      <circle cx="34" cy="58" r="3.4" fill={STROKE} />
      <path d="M26 68c3 2 7 3 10 2" stroke={STROKE} strokeWidth={3.5} strokeLinecap="round" fill="none" />
    </>
  );
}

function Fillet() {
  return (
    <>
      <path
        d="M22 80C18 56 40 30 70 26c20-3 30 8 28 22-3 20-24 38-48 40-14 1-26-1-28-8Z"
        fill="#fbc6ad"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M36 70c10-16 26-28 44-32M44 78c8-12 20-22 34-27"
        stroke="#f49d77"
        strokeWidth={4.5}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M30 62c2-6 6-12 11-17" stroke="#fff" strokeOpacity="0.75" strokeWidth={4.5} strokeLinecap="round" fill="none" />
    </>
  );
}

function Eggs() {
  return (
    <>
      <path
        d="M40 26c10 0 19 13 19 27 0 12-8 20-19 20S21 65 21 53c0-14 9-27 19-27Z"
        fill="#fff7ea"
        stroke={STROKE}
        strokeWidth={sw}
      />
      <path
        d="M80 18c10 0 19 13 19 27 0 12-8 20-19 20S61 57 61 45c0-14 9-27 19-27Z"
        fill="#ffe8c7"
        stroke={STROKE}
        strokeWidth={sw}
      />
      <path
        d="M34 74h52c1 12-10 22-26 22S33 86 34 74Z"
        fill="#fff7ea"
        stroke={STROKE}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M34 74c4-3 8 2 12-1s8-2 11 1 8 2 11-1 9-2 12 1"
        fill="none"
        stroke={STROKE}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle cx="60" cy="84" r="7" fill="#ffb703" stroke={STROKE} strokeWidth={4} />
      <path d="M31 38c-2 4-3 8-3 12M71 30c-2 4-3 8-3 12" stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity="0.9" />
    </>
  );
}

function Kebab() {
  return (
    <>
      <path d="M60 8v104" stroke="#a9784f" strokeWidth={6} strokeLinecap="round" />
      <circle cx="60" cy="12" r="6" fill="#a9784f" stroke={STROKE} strokeWidth={4} />
      <rect x="42" y="24" width="36" height="22" rx="11" fill="#c75146" stroke={STROKE} strokeWidth={sw} />
      <rect x="42" y="52" width="36" height="22" rx="11" fill="#d96148" stroke={STROKE} strokeWidth={sw} />
      <rect x="42" y="80" width="36" height="22" rx="11" fill="#c75146" stroke={STROKE} strokeWidth={sw} />
      <path d="M50 31c4-2 10-2 14 0M50 59c4-2 10-2 14 0M50 87c4-2 10-2 14 0" stroke="#f1a08a" strokeWidth={4} strokeLinecap="round" fill="none" />
    </>
  );
}

function Tikka() {
  return (
    <>
      <path d="M18 102 102 18" stroke="#a9784f" strokeWidth={6} strokeLinecap="round" />
      <rect x="56" y="14" width="30" height="28" rx="10" fill="#e8232e" stroke={STROKE} strokeWidth={sw} transform="rotate(45 71 28)" />
      <rect x="38" y="40" width="30" height="28" rx="10" fill="#d96148" stroke={STROKE} strokeWidth={sw} transform="rotate(45 53 54)" />
      <rect x="20" y="66" width="30" height="28" rx="10" fill="#e8232e" stroke={STROKE} strokeWidth={sw} transform="rotate(45 35 80)" />
      <path d="M68 22c3 1 6 4 7 7M50 48c3 1 6 4 7 7M32 74c3 1 6 4 7 7" stroke="#ffb1a3" strokeWidth={4} strokeLinecap="round" fill="none" />
      <path d="M88 78c0-6 8-6 8-12M98 84c0-5 6-5 6-10" stroke="#ffb703" strokeWidth={4} strokeLinecap="round" fill="none" />
    </>
  );
}

function Salami() {
  return (
    <>
      <circle cx="50" cy="60" r="34" fill="#e0566a" stroke={STROKE} strokeWidth={sw} />
      <circle cx="50" cy="60" r="25" fill="#ef7d8c" stroke={STROKE} strokeWidth={4} />
      <circle cx="42" cy="52" r="4" fill="#fdf8f0" />
      <circle cx="58" cy="48" r="3.4" fill="#fdf8f0" />
      <circle cx="60" cy="66" r="4.4" fill="#fdf8f0" />
      <circle cx="44" cy="70" r="3" fill="#fdf8f0" />
      <circle cx="52" cy="59" r="2.6" fill="#fdf8f0" />
      <path
        d="M88 30c8 5 13 14 13 24"
        stroke={STROKE}
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <circle cx="88" cy="74" r="16" fill="#ef7d8c" stroke={STROKE} strokeWidth={4.5} />
      <circle cx="84" cy="70" r="2.6" fill="#fdf8f0" />
      <circle cx="92" cy="78" r="3" fill="#fdf8f0" />
    </>
  );
}

const ART: Record<ArtKey, () => React.ReactNode> = {
  drumstick: Drumstick,
  wings: Wings,
  breast: Breast,
  "whole-chicken": WholeChicken,
  "curry-cut": CurryCut,
  keema: Keema,
  chops: Chops,
  prawn: Prawn,
  fish: Fish,
  fillet: Fillet,
  eggs: Eggs,
  kebab: Kebab,
  tikka: Tikka,
  salami: Salami,
};

export const ART_BG: Record<ArtKey, string> = {
  drumstick: "from-[#ffe3cf] to-[#ffd0b5]",
  wings: "from-[#ffe8d2] to-[#fcd0ae]",
  breast: "from-[#ffe4dc] to-[#ffcfc2]",
  "whole-chicken": "from-[#fff0d8] to-[#fbdcae]",
  "curry-cut": "from-[#ffe3cf] to-[#ffc9b0]",
  keema: "from-[#ffdfdf] to-[#ffc4c4]",
  chops: "from-[#ffdce4] to-[#ffc2cf]",
  prawn: "from-[#ffe6d4] to-[#ffcdab]",
  fish: "from-[#dcf0fb] to-[#bfe0f3]",
  fillet: "from-[#ffeede] to-[#ffd9bb]",
  eggs: "from-[#fff6e0] to-[#ffe9bd]",
  kebab: "from-[#ffe2d6] to-[#ffc8b4]",
  tikka: "from-[#ffe0d0] to-[#ffc3ab]",
  salami: "from-[#ffdfe6] to-[#ffc6d2]",
};

export default function MeatArt({
  art,
  className = "",
}: {
  art: ArtKey;
  className?: string;
}) {
  const Piece = ART[art] ?? ART["curry-cut"];
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" role="img">
      <Piece />
    </svg>
  );
}

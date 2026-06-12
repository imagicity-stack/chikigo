export default function Marquee({
  items,
  reverse = false,
  className = "",
  separator = "★",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
  separator?: string;
}) {
  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="mx-4 inline-flex items-center gap-8 whitespace-nowrap sm:mx-6">
          <span>{item}</span>
          <span aria-hidden="true" className="text-[0.8em] opacity-80">
            {separator}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        <div className="flex shrink-0 items-center">{row}</div>
        <div className="flex shrink-0 items-center">{row}</div>
      </div>
    </div>
  );
}

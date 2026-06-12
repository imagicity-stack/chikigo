"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { SearchIcon, XIcon } from "./Icons";
import { slugify } from "@/lib/categories";
import type { Category, Product } from "@/lib/types";

export default function ShopClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const activeCat = searchParams.get("cat") ?? "all";

  // categories actually present in the catalog (Shopify may differ from demo)
  const cats = useMemo(() => {
    const present = new Map<string, string>();
    for (const p of products) present.set(slugify(p.category), p.category);
    const known = categories.filter((c) => present.has(c.slug));
    const extras = [...present.entries()]
      .filter(([slug]) => !categories.some((c) => c.slug === slug))
      .map(([slug, name]) => ({ slug, name }));
    return [...known.map((c) => ({ slug: c.slug, name: c.name })), ...extras];
  }, [products, categories]);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCat !== "all") {
      list = list.filter((p) => slugify(p.category) === activeCat);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [products, activeCat, query]);

  const setCat = (slug: string) => {
    router.replace(slug === "all" ? "/shop" : `/shop?cat=${slug}`, { scroll: false });
  };

  const pill = (active: boolean) =>
    `shrink-0 rounded-full border-3 border-ink px-4 py-1.5 font-display text-sm font-bold transition active:scale-95 ${
      active
        ? "bg-ink text-cream shadow-chunky-sm"
        : "bg-white text-ink hover:bg-amber/40"
    }`;

  return (
    <div>
      {/* filter bar */}
      <div className="sticky top-[57px] z-40 -mx-4 border-b-3 border-ink bg-cream/95 px-4 py-3 backdrop-blur sm:top-[61px] sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center">
          <div className="scrollbar-slim flex gap-2 overflow-x-auto pb-1 md:pb-0">
            <button onClick={() => setCat("all")} className={pill(activeCat === "all")}>
              All cuts
            </button>
            {cats.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCat(c.slug)}
                className={pill(activeCat === c.slug)}
              >
                {c.name}
              </button>
            ))}
          </div>
          <label className="relative ml-auto block w-full md:w-64">
            <SearchIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chicken, keema, prawns…"
              className="w-full rounded-full border-3 border-ink bg-white py-2 pl-10 pr-9 text-sm font-semibold outline-none transition placeholder:text-ink/40 focus:shadow-chunky-sm"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink/50 hover:bg-cream-dark"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            )}
          </label>
        </div>
      </div>

      {/* grid */}
      <div className="mx-auto max-w-7xl py-6 sm:py-8">
        <p className="mb-4 text-sm font-bold text-ink-soft">
          {filtered.length} {filtered.length === 1 ? "cut" : "cuts"} ready to deliver ⚡
        </p>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-3xl border-3 border-dashed border-ink/30 py-16 text-center">
            <span className="text-5xl">🔍🍗</span>
            <p className="font-display text-xl font-extrabold">No cuts match that.</p>
            <p className="text-sm font-semibold text-ink-soft">
              Try “chicken”, “keema” or clear the search.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCat("all");
              }}
              className="btn btn-primary mt-1"
            >
              Show everything
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product, i) => (
              <Reveal as="li" key={product.id} delay={(i % 4) * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

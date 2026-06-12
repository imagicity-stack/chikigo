import type { ArtKey, Category, Product } from "./types";

/** Curated category set shown while the site runs on the demo catalog. */
export const DEMO_CATEGORIES: Category[] = [
  { name: "Chicken", slug: "chicken", art: "drumstick", tagline: "Tender, juicy, never frozen" },
  { name: "Mutton", slug: "mutton", art: "chops", tagline: "Soft, fresh & flavour-packed" },
  { name: "Seafood", slug: "seafood", art: "prawn", tagline: "Coast-fresh, cleaned & cut" },
  { name: "Eggs", slug: "eggs", art: "eggs", tagline: "Farm eggs, packed daily" },
  { name: "Ready to Cook", slug: "ready-to-cook", art: "kebab", tagline: "Marinated by chefs" },
];

/** Same slug rules everywhere so pills, links and filters always agree. */
export function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const CATEGORY_ART: Array<[RegExp, ArtKey]> = [
  [/chicken|poultry|bird/i, "drumstick"],
  [/mutton|goat|lamb/i, "chops"],
  [/prawn|shrimp/i, "prawn"],
  [/fish|seafood|sea food/i, "fish"],
  [/egg/i, "eggs"],
  [/keema|mince/i, "keema"],
  [/salami|sausage|ham|cold ?cut/i, "salami"],
  [/ready|marinat|kebab|kabab|tikka|cook/i, "kebab"],
  [/\bmeat\b/i, "chops"],
];

export function categoryArt(name: string): ArtKey {
  for (const [re, art] of CATEGORY_ART) if (re.test(name)) return art;
  return "curry-cut";
}

const CATEGORY_TAGLINES: Array<[RegExp, string]> = [
  [/chicken|poultry/i, "Tender, juicy, never frozen"],
  [/mutton|goat|lamb/i, "Soft, fresh & flavour-packed"],
  [/seafood|fish|prawn|shrimp/i, "Coast-fresh, cleaned & cut"],
  [/egg/i, "Farm eggs, packed daily"],
  [/ready|marinat|kebab|tikka/i, "Marinated by chefs"],
];

function categoryTagline(name: string): string {
  for (const [re, tagline] of CATEGORY_TAGLINES) if (re.test(name)) return tagline;
  return "Cut to order, packed cold";
}

/**
 * The categories actually present in the catalog, in catalog order — so the
 * home-page cards and /shop filter pills always reflect the live Shopify
 * products instead of a hardcoded list. Demo mode keeps the curated demo set.
 */
export function buildCategories(products: Product[], demo: boolean): Category[] {
  if (demo || products.length === 0) return DEMO_CATEGORIES;
  const seen = new Map<string, Category>();
  for (const p of products) {
    const name = p.category.trim();
    const slug = slugify(name);
    if (!slug || seen.has(slug)) continue;
    seen.set(slug, {
      name,
      slug,
      art: categoryArt(name),
      tagline: categoryTagline(name),
    });
  }
  return [...seen.values()];
}

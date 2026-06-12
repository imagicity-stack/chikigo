import { DEMO_PRODUCTS, demoProductByHandle } from "./demo-data";
import type { ArtKey, Cart, CartLine, Money, Product, ProductVariant } from "./types";

const rawDomain = process.env.SHOPIFY_STORE_DOMAIN;
const publicToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-10";

/** Bare myshopify domain, tolerant of a pasted protocol or trailing slash. */
export const shopDomain = rawDomain
  ? rawDomain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim()
  : undefined;

export type StorefrontAuth = {
  header: "X-Shopify-Storefront-Access-Token" | "Shopify-Storefront-Private-Token";
  value: string;
  kind: "public" | "private";
};

/**
 * Pick the right token + header. Shopify exposes two Storefront API tokens:
 *   - public  (hex string) → header `X-Shopify-Storefront-Access-Token` (safe client-side)
 *   - private (`shpat_…`)  → header `Shopify-Storefront-Private-Token`  (server-side only)
 *
 * Every Shopify call in this app runs server-side, so we prefer the private
 * token (higher rate limits, what Shopify recommends for servers). We also
 * auto-correct a private token that was pasted into the public env var so the
 * site works no matter which one you used.
 */
export function resolveStorefrontAuth(): StorefrontAuth | null {
  if (privateToken) {
    return { header: "Shopify-Storefront-Private-Token", value: privateToken, kind: "private" };
  }
  if (publicToken) {
    if (publicToken.startsWith("shpat_")) {
      return { header: "Shopify-Storefront-Private-Token", value: publicToken, kind: "private" };
    }
    return { header: "X-Shopify-Storefront-Access-Token", value: publicToken, kind: "public" };
  }
  return null;
}

const storefrontAuth = resolveStorefrontAuth();

export const shopifyConfigured = Boolean(shopDomain && storefrontAuth);

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "no-store",
  revalidate,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number;
}): Promise<T> {
  if (!shopifyConfigured) {
    throw new Error("Shopify is not configured");
  }
  const endpoint = `https://${shopDomain}/api/${apiVersion}/graphql.json`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [storefrontAuth!.header]: storefrontAuth!.value,
    },
    body: JSON.stringify({ query, variables }),
    ...(revalidate !== undefined ? { next: { revalidate } } : { cache }),
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL error: ${json.errors[0].message}`);
  }
  return json.data as T;
}

/* ───────────────────────── art & category inference ───────────────────── */

const ART_RULES: Array<[RegExp, ArtKey]> = [
  [/drumstick|leg|tangdi/i, "drumstick"],
  [/wing/i, "wings"],
  [/breast|fillet.*chicken|boneless.*chicken/i, "breast"],
  [/whole.*(chicken|bird)/i, "whole-chicken"],
  [/keema|mince|kheema/i, "keema"],
  [/chop|rib/i, "chops"],
  [/prawn|shrimp/i, "prawn"],
  [/fillet|basa|boneless.*fish/i, "fillet"],
  [/fish|rohu|pomfret|surmai|salmon|mackerel|catla/i, "fish"],
  [/egg/i, "eggs"],
  [/seekh|kebab|kabab/i, "kebab"],
  [/tikka|marinat/i, "tikka"],
  [/salami|sausage|ham|cold cut/i, "salami"],
  [/curry cut/i, "curry-cut"],
];

export function inferArt(title: string, category?: string): ArtKey {
  const haystack = `${title} ${category ?? ""}`;
  for (const [re, art] of ART_RULES) {
    if (re.test(haystack)) return art;
  }
  if (/mutton|goat|lamb/i.test(haystack)) return "chops";
  if (/sea|fish/i.test(haystack)) return "fish";
  return "curry-cut";
}

/* ───────────────────────────── normalizers ─────────────────────────────── */

type ShopifyMoney = { amount: string; currencyCode: string };

type ShopifyVariantNode = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
};

type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null; width: number; height: number } | null;
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange: { minVariantPrice: ShopifyMoney };
  variants: { nodes: ShopifyVariantNode[] };
};

const toMoney = (m: ShopifyMoney | null | undefined): Money | null =>
  m && parseFloat(m.amount) > 0
    ? { amount: parseFloat(m.amount), currencyCode: m.currencyCode }
    : null;

function normalizeVariant(v: ShopifyVariantNode): ProductVariant {
  return {
    id: v.id,
    title: v.title === "Default Title" ? "Standard" : v.title,
    price: toMoney(v.price) ?? { amount: 0, currencyCode: "INR" },
    compareAtPrice: toMoney(v.compareAtPrice),
    availableForSale: v.availableForSale,
  };
}

function normalizeProduct(node: ShopifyProductNode): Product {
  const category = node.productType || "Fresh Meat";
  const badge = node.tags.find((t) => /bestseller|new|premium|chef/i.test(t)) ?? null;
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    category,
    tags: node.tags,
    badge,
    weight: node.variants.nodes[0]?.title === "Default Title" ? "" : (node.variants.nodes[0]?.title ?? ""),
    serves: "",
    pieces: "",
    image: node.featuredImage
      ? {
          url: node.featuredImage.url,
          altText: node.featuredImage.altText,
          width: node.featuredImage.width,
          height: node.featuredImage.height,
        }
      : null,
    art: inferArt(node.title, category),
    price: toMoney(node.priceRange.minVariantPrice) ?? { amount: 0, currencyCode: "INR" },
    compareAtPrice: toMoney(node.compareAtPriceRange?.minVariantPrice),
    availableForSale: node.availableForSale,
    variants: node.variants.nodes.map(normalizeVariant),
  };
}

/* ───────────────────────────── queries ─────────────────────────────────── */

const PRODUCT_FIELDS = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    productType
    tags
    availableForSale
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 10) {
      nodes {
        id
        title
        availableForSale
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

export async function getProducts(): Promise<{ products: Product[]; demo: boolean }> {
  if (!shopifyConfigured) {
    return { products: DEMO_PRODUCTS, demo: true };
  }
  try {
    const data = await shopifyFetch<{ products: { nodes: ShopifyProductNode[] } }>({
      query: `
        ${PRODUCT_FIELDS}
        query AllProducts {
          products(first: 60, sortKey: BEST_SELLING) {
            nodes {
              ...ProductFields
            }
          }
        }
      `,
      revalidate: 120,
    });
    const products = data.products.nodes.map(normalizeProduct);
    if (products.length === 0) return { products: DEMO_PRODUCTS, demo: true };
    return { products, demo: false };
  } catch (err) {
    console.error("[chikigo] Falling back to demo catalog:", err);
    return { products: DEMO_PRODUCTS, demo: true };
  }
}

export async function getProduct(handle: string): Promise<{ product: Product | null; demo: boolean }> {
  if (!shopifyConfigured) {
    return { product: demoProductByHandle(handle) ?? null, demo: true };
  }
  try {
    const data = await shopifyFetch<{ product: ShopifyProductNode | null }>({
      query: `
        ${PRODUCT_FIELDS}
        query ProductByHandle($handle: String!) {
          product(handle: $handle) {
            ...ProductFields
          }
        }
      `,
      variables: { handle },
      revalidate: 120,
    });
    if (!data.product) {
      return { product: demoProductByHandle(handle) ?? null, demo: true };
    }
    return { product: normalizeProduct(data.product), demo: false };
  } catch (err) {
    console.error("[chikigo] Falling back to demo product:", err);
    return { product: demoProductByHandle(handle) ?? null, demo: true };
  }
}

/* ───────────────────────────── cart ────────────────────────────────────── */

const CART_FIELDS = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
            product {
              title
              handle
              productType
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: ShopifyMoney };
  lines: {
    nodes: Array<{
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        price: ShopifyMoney;
        image: { url: string; altText: string | null } | null;
        product: {
          title: string;
          handle: string;
          productType: string;
          featuredImage: { url: string; altText: string | null } | null;
        };
      };
    }>;
  };
};

function normalizeCart(cart: ShopifyCart): Cart {
  const lines: CartLine[] = cart.lines.nodes.map((line) => {
    const unit = toMoney(line.merchandise.price) ?? { amount: 0, currencyCode: "INR" };
    const image = line.merchandise.image ?? line.merchandise.product.featuredImage;
    return {
      id: line.id,
      quantity: line.quantity,
      merchandiseId: line.merchandise.id,
      title: line.merchandise.product.title,
      variantTitle:
        line.merchandise.title === "Default Title" ? "" : line.merchandise.title,
      price: unit,
      lineTotal: { amount: unit.amount * line.quantity, currencyCode: unit.currencyCode },
      image: image ? { url: image.url, altText: image.altText } : null,
      art: inferArt(line.merchandise.product.title, line.merchandise.product.productType),
      handle: line.merchandise.product.handle,
    };
  });
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: toMoney(cart.cost.subtotalAmount) ?? { amount: 0, currencyCode: "INR" },
    lines,
  };
}

export async function cartCreate(): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: `
      ${CART_FIELDS}
      mutation CartCreate {
        cartCreate {
          cart {
            ...CartFields
          }
        }
      }
    `,
  });
  return normalizeCart(data.cartCreate.cart);
}

export async function cartGet(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: `
      ${CART_FIELDS}
      query CartGet($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFields
        }
      }
    `,
    variables: { cartId },
  });
  return data.cart ? normalizeCart(data.cart) : null;
}

export async function cartLinesAdd(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: `
      ${CART_FIELDS}
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
        }
      }
    `,
    variables: { cartId, lines },
  });
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function cartLinesUpdate(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: `
      ${CART_FIELDS}
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
        }
      }
    `,
    variables: { cartId, lines },
  });
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function cartLinesRemove(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: `
      ${CART_FIELDS}
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFields
          }
        }
      }
    `,
    variables: { cartId, lineIds },
  });
  return normalizeCart(data.cartLinesRemove.cart);
}

export type Money = {
  amount: number;
  currencyCode: string;
};

export type ArtKey =
  | "drumstick"
  | "wings"
  | "breast"
  | "whole-chicken"
  | "curry-cut"
  | "keema"
  | "chops"
  | "prawn"
  | "fish"
  | "fillet"
  | "eggs"
  | "kebab"
  | "tikka"
  | "salami";

export type ProductVariant = {
  id: string;
  title: string;
  price: Money;
  compareAtPrice: Money | null;
  availableForSale: boolean;
};

export type ProductImage = {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  badge: string | null;
  weight: string;
  serves: string;
  pieces: string;
  image: ProductImage | null;
  art: ArtKey;
  price: Money;
  compareAtPrice: Money | null;
  availableForSale: boolean;
  variants: ProductVariant[];
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandiseId: string;
  title: string;
  variantTitle: string;
  price: Money;
  lineTotal: Money;
  image: ProductImage | null;
  art: ArtKey;
  handle: string;
};

export type Cart = {
  id: string;
  checkoutUrl: string | null;
  totalQuantity: number;
  subtotal: Money;
  lines: CartLine[];
};

export type Category = {
  name: string;
  slug: string;
  art: ArtKey;
  tagline: string;
};

import type { Money } from "./types";

export function formatMoney(money: Money): string {
  const hasPaise = money.amount % 1 !== 0;
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: money.currencyCode,
      minimumFractionDigits: hasPaise ? 2 : 0,
      maximumFractionDigits: hasPaise ? 2 : 0,
    }).format(money.amount);
  } catch {
    return `₹${money.amount}`;
  }
}

export function discountPercent(price: Money, compareAt: Money | null): number | null {
  if (!compareAt || compareAt.amount <= price.amount) return null;
  return Math.round(((compareAt.amount - price.amount) / compareAt.amount) * 100);
}

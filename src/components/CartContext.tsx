"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ArtKey, Cart, CartLine, Money, ProductImage } from "@/lib/types";

const CART_ID_KEY = "chikigo:cartId";
const DEMO_CART_KEY = "chikigo:demoCart";

export const FREE_DELIVERY_THRESHOLD = 499;

export type AddToCartInput = {
  merchandiseId: string;
  quantity: number;
  snapshot: {
    title: string;
    variantTitle: string;
    price: Money;
    art: ArtKey;
    handle: string;
    image?: ProductImage | null;
  };
};

type DemoLine = {
  merchandiseId: string;
  quantity: number;
  snapshot: AddToCartInput["snapshot"];
};

type CartContextValue = {
  cart: Cart | null;
  isOpen: boolean;
  busy: boolean;
  demoMode: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (input: AddToCartInput) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

function demoLinesToCart(lines: DemoLine[]): Cart {
  const cartLines: CartLine[] = lines.map((l) => ({
    id: l.merchandiseId,
    quantity: l.quantity,
    merchandiseId: l.merchandiseId,
    title: l.snapshot.title,
    variantTitle: l.snapshot.variantTitle,
    price: l.snapshot.price,
    lineTotal: {
      amount: l.snapshot.price.amount * l.quantity,
      currencyCode: l.snapshot.price.currencyCode,
    },
    image: l.snapshot.image ?? null,
    art: l.snapshot.art,
    handle: l.snapshot.handle,
  }));
  const subtotalAmount = cartLines.reduce((sum, l) => sum + l.lineTotal.amount, 0);
  return {
    id: "demo-cart",
    checkoutUrl: null,
    totalQuantity: cartLines.reduce((sum, l) => sum + l.quantity, 0),
    subtotal: {
      amount: subtotalAmount,
      currencyCode: cartLines[0]?.price.currencyCode ?? "INR",
    },
    lines: cartLines,
  };
}

function readDemoLines(): DemoLine[] {
  try {
    const raw = window.localStorage.getItem(DEMO_CART_KEY);
    return raw ? (JSON.parse(raw) as DemoLine[]) : [];
  } catch {
    return [];
  }
}

function writeDemoLines(lines: DemoLine[]) {
  try {
    window.localStorage.setItem(DEMO_CART_KEY, JSON.stringify(lines));
  } catch {
    /* storage unavailable — cart lives for the session only */
  }
}

export function CartProvider({
  children,
  shopifyEnabled,
}: {
  children: React.ReactNode;
  shopifyEnabled: boolean;
}) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const demoLinesRef = useRef<DemoLine[]>([]);

  const syncDemo = useCallback((lines: DemoLine[]) => {
    demoLinesRef.current = lines;
    writeDemoLines(lines);
    setCart(demoLinesToCart(lines));
  }, []);

  // hydrate cart on mount
  useEffect(() => {
    if (!shopifyEnabled) {
      const lines = readDemoLines();
      demoLinesRef.current = lines;
      setCart(demoLinesToCart(lines));
      return;
    }
    const cartId = window.localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "get", cartId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.cart) {
          setCart(data.cart as Cart);
        } else {
          window.localStorage.removeItem(CART_ID_KEY);
        }
      })
      .catch(() => {
        /* offline or expired — start fresh on next add */
      });
  }, [shopifyEnabled]);

  const callCartApi = useCallback(
    async (payload: Record<string, unknown>): Promise<Cart | null> => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Cart request failed");
      const data = (await res.json()) as { cart: Cart | null };
      if (data.cart) {
        window.localStorage.setItem(CART_ID_KEY, data.cart.id);
        setCart(data.cart);
      }
      return data.cart;
    },
    [],
  );

  const addToCart = useCallback(
    async (input: AddToCartInput) => {
      setBusy(true);
      try {
        if (!shopifyEnabled) {
          const lines = [...demoLinesRef.current];
          const existing = lines.find((l) => l.merchandiseId === input.merchandiseId);
          if (existing) {
            existing.quantity = Math.min(50, existing.quantity + input.quantity);
          } else {
            lines.push({
              merchandiseId: input.merchandiseId,
              quantity: input.quantity,
              snapshot: input.snapshot,
            });
          }
          syncDemo(lines);
        } else {
          const cartId = window.localStorage.getItem(CART_ID_KEY) ?? undefined;
          await callCartApi({
            action: "add",
            cartId,
            merchandiseId: input.merchandiseId,
            quantity: input.quantity,
          });
        }
        setIsOpen(true);
      } finally {
        setBusy(false);
      }
    },
    [shopifyEnabled, callCartApi, syncDemo],
  );

  const updateLine = useCallback(
    async (lineId: string, quantity: number) => {
      setBusy(true);
      try {
        if (!shopifyEnabled) {
          let lines = [...demoLinesRef.current];
          if (quantity <= 0) {
            lines = lines.filter((l) => l.merchandiseId !== lineId);
          } else {
            lines = lines.map((l) =>
              l.merchandiseId === lineId ? { ...l, quantity: Math.min(50, quantity) } : l,
            );
          }
          syncDemo(lines);
        } else {
          const cartId = window.localStorage.getItem(CART_ID_KEY);
          if (!cartId) return;
          await callCartApi({ action: "update", cartId, lineId, quantity });
        }
      } finally {
        setBusy(false);
      }
    },
    [shopifyEnabled, callCartApi, syncDemo],
  );

  const removeLine = useCallback(
    (lineId: string) => updateLine(lineId, 0),
    [updateLine],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isOpen,
      busy,
      demoMode: !shopifyEnabled,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addToCart,
      updateLine,
      removeLine,
    }),
    [cart, isOpen, busy, shopifyEnabled, addToCart, updateLine, removeLine],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

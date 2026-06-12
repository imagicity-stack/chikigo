import { NextResponse } from "next/server";
import {
  cartCreate,
  cartGet,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  shopifyConfigured,
} from "@/lib/shopify";

type CartAction =
  | { action: "get"; cartId: string }
  | { action: "add"; cartId?: string; merchandiseId: string; quantity: number }
  | { action: "update"; cartId: string; lineId: string; quantity: number }
  | { action: "remove"; cartId: string; lineId: string };

export async function POST(request: Request) {
  if (!shopifyConfigured) {
    return NextResponse.json({ demo: true, cart: null });
  }

  let body: CartAction;
  try {
    body = (await request.json()) as CartAction;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    switch (body.action) {
      case "get": {
        const cart = await cartGet(body.cartId);
        return NextResponse.json({ demo: false, cart });
      }
      case "add": {
        const quantity = Math.max(1, Math.min(50, Math.floor(body.quantity || 1)));
        const cartId = body.cartId || (await cartCreate()).id;
        const cart = await cartLinesAdd(cartId, [
          { merchandiseId: body.merchandiseId, quantity },
        ]);
        return NextResponse.json({ demo: false, cart });
      }
      case "update": {
        const quantity = Math.max(0, Math.min(50, Math.floor(body.quantity)));
        const cart =
          quantity === 0
            ? await cartLinesRemove(body.cartId, [body.lineId])
            : await cartLinesUpdate(body.cartId, [{ id: body.lineId, quantity }]);
        return NextResponse.json({ demo: false, cart });
      }
      case "remove": {
        const cart = await cartLinesRemove(body.cartId, [body.lineId]);
        return NextResponse.json({ demo: false, cart });
      }
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[chikigo] Cart API error:", err);
    return NextResponse.json(
      { error: "Cart operation failed. Please try again." },
      { status: 500 },
    );
  }
}

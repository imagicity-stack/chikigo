import { NextResponse } from "next/server";
import { resolveStorefrontAuth, shopDomain } from "@/lib/shopify";

export const dynamic = "force-dynamic";

/**
 * Diagnostic endpoint — visit /api/health on your deployment to see exactly
 * why the site is (or isn't) pulling live Shopify products.
 *
 * It NEVER returns a token value, only whether one is present, its length and
 * which type was detected, so it is safe to leave deployed. Delete this file
 * once you're happily live if you'd rather not expose config state.
 */
export async function GET() {
  const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-10";
  const auth = resolveStorefrontAuth();

  const env = {
    SHOPIFY_STORE_DOMAIN: shopDomain ?? null,
    storefront_token_present: Boolean(auth),
    storefront_token_type: auth?.kind ?? null, // "public" | "private"
    storefront_token_header: auth?.header ?? null,
    storefront_token_length: auth?.value.length ?? 0,
    SHOPIFY_API_VERSION: apiVersion,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
  };

  // Not configured at all → the site is intentionally in demo mode.
  if (!shopDomain || !auth) {
    return NextResponse.json({
      ok: false,
      mode: "demo",
      reason:
        "Missing SHOPIFY_STORE_DOMAIN and/or a Storefront token. Add them in " +
        "Vercel → Settings → Environment Variables, then REDEPLOY (env vars " +
        "only apply to new deployments).",
      env,
    });
  }

  const endpoint = `https://${shopDomain}/api/${apiVersion}/graphql.json`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [auth.header]: auth.value,
      },
      body: JSON.stringify({
        query: `{
          shop { name primaryDomain { url } }
          products(first: 5, sortKey: BEST_SELLING) {
            nodes { title handle availableForSale }
          }
        }`,
      }),
      cache: "no-store",
    });

    const text = await res.text();
    let json: {
      data?: {
        shop?: { name?: string; primaryDomain?: { url?: string } };
        products?: { nodes?: Array<{ title: string; availableForSale: boolean }> };
      };
      errors?: Array<{ message: string }>;
    } = {};
    try {
      json = JSON.parse(text);
    } catch {
      // non-JSON (often an HTML error page) — surfaced via rawSnippet below
    }

    const products = json.data?.products?.nodes ?? [];
    const graphqlErrors = json.errors?.map((e) => e.message) ?? [];

    let mode: "live" | "demo" = "demo";
    let reason = "";

    if (!res.ok) {
      reason =
        res.status === 401 || res.status === 403
          ? `Shopify rejected the token (${res.status}). It's wrong, expired, or sent with the wrong header. Detected token type: "${auth.kind}" → header "${auth.header}". A "shpat_…" token MUST use the private header; a plain hex token MUST use the public header.`
          : res.status === 404
            ? "404 from Shopify — SHOPIFY_STORE_DOMAIN is wrong or the API version doesn't exist. Domain must look like 'your-store.myshopify.com'."
            : `Shopify returned HTTP ${res.status} ${res.statusText}.`;
    } else if (graphqlErrors.length) {
      reason = `Shopify accepted the request but returned GraphQL errors: ${graphqlErrors.join("; ")}`;
    } else if (products.length === 0) {
      reason =
        "Connected successfully, but 0 products are visible to this app — so the site falls back to the demo catalog. Fix: in Shopify Admin, make your products available to this app's sales channel (Products → select all → More actions → Include in sales channel → your app). Also confirm products are Active, not Draft.";
    } else {
      mode = "live";
      reason = `Live and healthy — ${products.length} product(s) visible via the ${auth.kind} Storefront token.`;
    }

    return NextResponse.json({
      ok: mode === "live",
      mode,
      reason,
      env,
      shopify: {
        endpoint,
        httpStatus: `${res.status} ${res.statusText}`,
        shopName: json.data?.shop?.name ?? null,
        primaryDomain: json.data?.shop?.primaryDomain?.url ?? null,
        graphqlErrors,
        productCount: products.length,
        sampleTitles: products.map((p) => p.title),
        rawSnippet: text.startsWith("{") ? undefined : text.slice(0, 300),
      },
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      mode: "demo",
      reason:
        "Network/DNS error reaching Shopify — usually a malformed SHOPIFY_STORE_DOMAIN. It must be the bare domain like 'your-store.myshopify.com' (no https://, no trailing slash).",
      env,
      error: err instanceof Error ? err.message : String(err),
      attemptedEndpoint: endpoint,
    });
  }
}

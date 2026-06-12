import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Diagnostic endpoint — visit /api/health on your deployment to see exactly
 * why the site is (or isn't) pulling live Shopify products.
 *
 * It NEVER returns the access token itself, only whether one is present and
 * its length, so it is safe to leave deployed. Delete this file once you're
 * happily live if you'd rather not expose config state.
 */
export async function GET() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN || null;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || null;
  const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-10";

  const env = {
    SHOPIFY_STORE_DOMAIN: domain,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN_present: Boolean(token),
    SHOPIFY_STOREFRONT_ACCESS_TOKEN_length: token ? token.length : 0,
    SHOPIFY_API_VERSION: apiVersion,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
  };

  // Not configured at all → the site is intentionally in demo mode.
  if (!domain || !token) {
    return NextResponse.json({
      ok: false,
      mode: "demo",
      reason:
        "Missing SHOPIFY_STORE_DOMAIN and/or SHOPIFY_STOREFRONT_ACCESS_TOKEN. " +
        "Add them in Vercel → Settings → Environment Variables, then REDEPLOY " +
        "(env vars only apply to new deployments).",
      env,
    });
  }

  // Catch a common mistake: full URL instead of the bare myshopify domain.
  const cleanDomain = domain
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .trim();
  const endpoint = `https://${cleanDomain}/api/${apiVersion}/graphql.json`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
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
      // non-JSON (often an HTML error page) — surface a snippet
    }

    const products = json.data?.products?.nodes ?? [];
    const graphqlErrors = json.errors?.map((e) => e.message) ?? [];

    let mode: "live" | "demo" = "demo";
    let reason = "";

    if (!res.ok) {
      reason =
        res.status === 401 || res.status === 403
          ? "Shopify rejected the token (401/403). The SHOPIFY_STOREFRONT_ACCESS_TOKEN is wrong, or it's the Admin API token instead of the Storefront API token."
          : res.status === 404
            ? "404 from Shopify — SHOPIFY_STORE_DOMAIN is wrong, or the API version doesn't exist. Domain must look like 'your-store.myshopify.com'."
            : `Shopify returned HTTP ${res.status} ${res.statusText}.`;
    } else if (graphqlErrors.length) {
      reason = `Shopify accepted the request but returned GraphQL errors: ${graphqlErrors.join("; ")}`;
    } else if (products.length === 0) {
      reason =
        "Connected successfully, but 0 products are visible to this app — so the site falls back to the demo catalog. Fix: in Shopify Admin, make your products available to this app's sales channel (Products → select all → More actions → Include in sales channel → your app). Also confirm products are Active, not Draft.";
    } else {
      mode = "live";
      reason = `Live and healthy — ${products.length} product(s) visible to the storefront.`;
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

# 🍗 Chikigo — Fresh Cuts. Fast Delivery.

An ultra-creative, mobile-first meat delivery storefront powered by **Next.js 15**
and the **Shopify Storefront API**.

## ✨ What's inside

- **Full storefront** — home, shop with category filters + live search, product
  pages with variant/quantity selection, about, contact and a playful 404.
- **Slide-out basket** — real Shopify carts (create/add/update/remove) with a
  free-delivery progress bar and secure Shopify checkout handoff.
- **Demo mode** — no credentials? The site runs on a built-in 16-product Indian
  catalog (₹ pricing) with hand-drawn SVG illustrations, and the basket works
  locally so you can feel the whole flow.
- **Mobile-first everything** — app-style bottom navigation, sticky buy bar on
  product pages, thumb-sized tap targets, safe-area insets.
- **Brand-true design** — charcoal + Chikigo red, chunky rounded type (Baloo 2),
  sticker shadows, marquee tickers, scroll-reveal animations, floating meat art.
- **Fast & accessible** — server components, ISR (120 s), no heavy animation
  libraries, `prefers-reduced-motion` respected, semantic markup throughout.

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the site boots in **demo mode** instantly.

## 🛍 Connect your Shopify store

1. In Shopify Admin go to **Settings → Apps and sales channels → Develop apps**
   (enable custom app development if asked) → **Create an app** (e.g. "Chikigo Web").
2. **Configure Storefront API scopes** and enable at least:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts` & `unauthenticated_read_checkouts`
3. **Install the app**, then copy the **Storefront API access token** from
   *API credentials*.
4. Create `.env.local` (copy `.env.example`) and fill in:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxx        # paste yours — keep it out of git!
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

5. Restart `npm run dev`. Your live products, prices, images and real Shopify
   checkout now power the site. 🎉

### How products map to the site

| Shopify field            | Used for                                            |
| ------------------------ | --------------------------------------------------- |
| **Product type**         | Category filter pills on `/shop` (e.g. `Chicken`)   |
| **Variants**             | Pack picker (500 g / 1 kg …) on product pages       |
| **Compare-at price**     | Strike-through price + “% OFF” sticker              |
| **Tags** (`Bestseller`, `New`, `Premium`, `Chef's Pick`) | Badge on product cards |
| **Featured image**       | Product card / page imagery (falls back to SVG art) |

Tip: set product types to `Chicken`, `Mutton`, `Seafood`, `Eggs`,
`Ready to Cook` to light up the themed category cards on the home page.

## 🧱 Stack

| Layer      | Choice                                          |
| ---------- | ----------------------------------------------- |
| Framework  | Next.js 15 (App Router, React 19, TypeScript)   |
| Styling    | Tailwind CSS v4 (custom Chikigo theme tokens)   |
| Commerce   | Shopify Storefront GraphQL API (server-side)    |
| Fonts      | Baloo 2 (display) + Manrope (body), `next/font` |
| Animations | Hand-rolled CSS + IntersectionObserver reveals  |

The Storefront token never reaches the browser — all Shopify calls run in
server components and the `/api/cart` route handler.

## 📦 Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and **import the
   `imagicity-stack/chikigo` repository** — Vercel auto-detects Next.js, no
   build settings needed.
2. Before the first deploy, open **Environment Variables** and add (for
   Production + Preview):
   - `SHOPIFY_STORE_DOMAIN` — `your-store.myshopify.com`
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — your Storefront API token
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — e.g. `91XXXXXXXXXX`
   - `NEXT_PUBLIC_SITE_URL` — your final domain (can be added later; the
     site auto-falls back to the Vercel production URL)
3. **Deploy.** Production builds come from `main`, every branch/PR gets a
   preview URL automatically.
4. Add your **custom domain** under *Settings → Domains*, then set
   `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` and redeploy so OG tags &
   sitemap use it.

Already configured in the repo for Vercel:

- `vercel.json` pins serverless functions (cart API, ISR) to **`bom1`
  (Mumbai)** for low latency in India.
- `robots.txt` + dynamic `sitemap.xml` (includes every product page).
- Branded Open Graph share image (`/opengraph-image.png`) for WhatsApp,
  Instagram & friends.
- Security headers (nosniff, frame, referrer, permissions policies).

Self-hosting works too: `npm run build && npm start`.

---

Made with ♥ and very sharp knives.

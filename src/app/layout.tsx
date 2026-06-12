import type { Metadata, Viewport } from "next";
import { Baloo_2, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { shopifyConfigured } from "@/lib/shopify";
import { getSiteUrl } from "@/lib/site";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Chikigo — Fresh Cuts. Fast Delivery.",
    template: "%s · Chikigo",
  },
  description:
    "Fresh chicken, mutton, seafood & more — cut after you order and delivered to your door in as little as 30 minutes. Chilled, never frozen.",
  keywords: [
    "meat delivery",
    "fresh chicken online",
    "mutton delivery",
    "seafood delivery",
    "Chikigo",
  ],
  openGraph: {
    title: "Chikigo — Fresh Cuts. Fast Delivery.",
    description:
      "Fresh meat, cut after you order, delivered in as little as 30 minutes.",
    type: "website",
    siteName: "Chikigo",
  },
};

export const viewport: Viewport = {
  themeColor: "#e8232e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="antialiased">
        <CartProvider shopifyEnabled={shopifyConfigured}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BottomNav />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

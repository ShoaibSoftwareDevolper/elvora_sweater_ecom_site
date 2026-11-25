import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { assets } from "@/data/assets";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Overlays from "@/components/Overlays";
import SmoothScroll from "@/components/SmoothScroll";
import StoreProvider from "@/components/StoreProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

const heroIntro =
  "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('hero-intro')";

const title = "ELVORA — Knitwear, New Collection 2026";
const description =
  "ELVORA makes soft, considered knitwear: oversized cable-knits, mohair blends and chunky sweaters designed to feel as good as they look.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: { default: title, template: "%s — ELVORA" },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "ELVORA",
    images: [
      {
        url: assets.heroPortrait.src,
        width: assets.heroPortrait.width,
        height: assets.heroPortrait.height,
        alt: "A woman in a cream cable-knit ELVORA sweater on a cognac leather sofa",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: heroIntro }} />
      </head>
      <body suppressHydrationWarning>
        <StoreProvider>
          <SmoothScroll />
          <div id="top">
            <Header />
            {children}
            <Footer />
          </div>
          <Overlays />
        </StoreProvider>
      </body>
    </html>
  );
}

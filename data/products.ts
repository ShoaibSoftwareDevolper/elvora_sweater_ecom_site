import type { StaticImageData } from "next/image";
import { assets } from "./assets";

export type Product = {
  id: string;
  name: string;
  color: string;
  price: number;
  compareAt?: number;
  image: StaticImageData;
  alt: string;
  description: string;
  features: string[];
  fabric: string[];
  soldOut: string[];
};

export const sizes = ["XS", "S", "M", "L", "XL"];

/** Crops of the single studio photo, used as gallery "angles" on the product page. */
export const views = [
  { label: "Front", zoom: 1, origin: "50% 50%" },
  { label: "Neckline", zoom: 2.3, origin: "50% 16%" },
  { label: "Sleeve", zoom: 2, origin: "10% 62%" },
  { label: "Knit texture", zoom: 3.2, origin: "50% 48%" },
  { label: "Cuff", zoom: 2.6, origin: "86% 88%" },
  { label: "Hem", zoom: 2.2, origin: "50% 84%" },
];

const care = ["Hand wash cold or dry clean", "Dry flat in shape, do not tumble dry", "Store folded, never on a hanger"];

export const popularProducts: Product[] = [
  {
    id: "cocoa-mohair",
    name: "Oversized Mohair-blend Sweater",
    color: "Cocoa",
    price: 129,
    compareAt: 159,
    image: assets.cocoa,
    alt: "Cocoa brown oversized mohair-blend sweater laid flat",
    description:
      "A cloud-soft mohair blend brushed for a gentle halo. Cut relaxed through the body with dropped shoulders, balloon sleeves and deep ribbed cuffs.",
    features: ["Oversized, relaxed fit", "Dropped shoulders and balloon sleeves", "Ribbed crew neck, cuffs and hem", "Model is 175 cm and wears size S"],
    fabric: ["46% mohair, 30% wool, 24% polyamide", ...care],
    soldOut: ["XL"],
  },
  {
    id: "cream-cable",
    name: "Oversized Cable-knit Sweater",
    color: "Cream",
    price: 98,
    image: assets.cream,
    alt: "Cream cable-knit sweater with ribbed cuffs laid flat",
    description:
      "Our signature cable-knit in undyed cream. Heavy braided cables run the full length of the body, finished with a high ribbed neck and long cuffs.",
    features: ["Oversized fit", "Full-length braided cables", "High ribbed neckline", "Model is 175 cm and wears size S"],
    fabric: ["70% wool, 30% alpaca", ...care],
    soldOut: [],
  },
  {
    id: "forest-chunky",
    name: "Chunky Knit Sweater",
    color: "Forest green",
    price: 84,
    image: assets.forest,
    alt: "Forest green chunky knit sweater with balloon sleeves laid flat",
    description:
      "A deep forest green in a lofty chunky knit. Boxy through the body with full balloon sleeves gathered into a narrow rib.",
    features: ["Boxy, relaxed fit", "Balloon sleeves", "Ribbed crew neck", "Model is 175 cm and wears size S"],
    fabric: ["60% wool, 40% recycled polyamide", ...care],
    soldOut: ["XS"],
  },
];

export const moreProducts: Product[] = [
  {
    id: "burgundy-cable",
    name: "Chunky Cable-knit Sweater",
    color: "Burgundy",
    price: 112,
    image: assets.burgundy,
    alt: "Burgundy chunky cable-knit sweater with a wide neckline laid flat",
    description:
      "Rich burgundy cables in a chunky gauge, with a wide boat neckline and voluminous sleeves that gather into deep ribbed cuffs.",
    features: ["Cropped, oversized fit", "Wide boat neckline", "Chunky cable front", "Model is 175 cm and wears size S"],
    fabric: ["80% wool, 20% cashmere", ...care],
    soldOut: [],
  },
  {
    id: "camel-turtleneck",
    name: "Oversized Turtleneck Sweater",
    color: "Camel",
    price: 105,
    compareAt: 135,
    image: assets.camel,
    alt: "Camel oversized turtleneck sweater laid flat",
    description:
      "A long-line turtleneck in a fine camel knit. Slouchy through the body with a generous fold-over collar, made to layer over dresses or wide trousers.",
    features: ["Long-line, oversized fit", "Fold-over turtleneck", "Side vents at the hem", "Model is 175 cm and wears size S"],
    fabric: ["50% wool, 30% alpaca, 20% polyamide", ...care],
    soldOut: ["L"],
  },
  {
    id: "taupe-cardigan",
    name: "Oversized Knit Cardigan",
    color: "Taupe",
    price: 118,
    image: assets.taupe,
    alt: "Taupe oversized V-neck knit cardigan with wooden buttons laid flat",
    description:
      "An easy V-neck cardigan in warm taupe, closed with natural wooden buttons. Soft, slightly brushed and cut roomy enough to wear over knitwear.",
    features: ["Oversized fit", "V-neck with wooden buttons", "Ribbed placket, cuffs and hem", "Model is 175 cm and wears size S"],
    fabric: ["55% wool, 45% recycled polyamide", ...care],
    soldOut: [],
  },
];

export const products = [...popularProducts, ...moreProducts];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (value: number) => `$${value.toFixed(2)}`;

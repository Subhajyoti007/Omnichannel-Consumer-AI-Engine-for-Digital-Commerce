// Enterprise mock catalog for TeleAgent AI — OneShop / OneApp
// Products, plans, accessories, promotions, and Customer Digital Twin seed.

export type ProductCategory =
  | "device"
  | "plan"
  | "accessory"
  | "bundle"
  | "fiber"
  | "insurance";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  currency: "EUR";
  image: string;
  tagline: string;
  description: string;
  specs: Record<string, string>;
  compatibleWith?: string[];
  margin: number; // 0..1 business margin
  inventory: number;
  rating: number;
  reviews: number;
  tags: string[];
  eligibleTiers: ("bronze" | "silver" | "gold" | "platinum")[];
}

export interface Promotion {
  id: string;
  title: string;
  discount: number; // percent
  appliesTo: string[]; // product ids
  reason: string;
  endsAt: string;
}

export interface JourneyEvent {
  id: string;
  ts: string;
  channel: "OneShop" | "OneApp" | "Store" | "CallCenter";
  type:
    | "view"
    | "compare"
    | "add_to_cart"
    | "remove_from_cart"
    | "checkout_start"
    | "checkout_pause"
    | "purchase"
    | "feedback"
    | "chat"
    | "recommendation_accepted"
    | "recommendation_rejected"
    | "session_resume";
  label: string;
  productId?: string;
  meta?: Record<string, string | number>;
}

export interface LedgerEntry {
  id: string;
  ts: string;
  label: string;
  delta: number; // + earn, - redeem
  category: "purchase" | "engagement" | "redemption" | "bonus";
}

export interface CustomerDigitalTwin {
  id: string;
  name: string;
  email: string;
  avatar: string;
  loyaltyTier: "bronze" | "silver" | "gold" | "platinum";
  loyaltyPoints: number;
  currentPlan: string;
  ownedDevices: string[];
  network: { technology: "5G" | "4G" | "Fiber"; strength: number; city: string };
  preferredBrands: string[];
  preferredPriceRange: [number, number];
  intent:
    | "browsing"
    | "researching"
    | "comparing"
    | "ready_to_buy"
    | "post_purchase";
  churnProbability: number; // 0..1
  clv: number; // customer lifetime value
  engagementScore: number; // 0..100
  contractEligibleFrom: string;
  browsingHistory: string[];
  purchaseHistory: { productId: string; ts: string; price: number }[];
  recommendationHistory: { productId: string; score: number; accepted: boolean }[];
  feedbackHistory: { ts: string; rating: number; note: string }[];
  cart: { productId: string; qty: number }[];
  journey: JourneyEvent[];
  loyaltyLedger: LedgerEntry[];
}

// -- Catalog -----------------------------------------------------------------

export const PRODUCTS: Product[] = [
  {
    id: "dev-s25u",
    name: "Galaxy S25 Ultra 512GB",
    brand: "Samsung",
    category: "device",
    price: 1399,
    originalPrice: 1499,
    currency: "EUR",
    image: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-sm-s938-1.jpg",
    tagline: "Flagship 5G with Galaxy AI",
    description:
      "6.9\" AMOLED, Snapdragon 8 Gen 4, 200MP camera, S Pen. Bundles perfectly with MagentaMobil XL.",
    specs: { display: "6.9\" QHD+", storage: "512GB", camera: "200MP", "5G": "Yes" },
    compatibleWith: ["plan-mag-xl", "acc-buds3", "acc-watch7", "ins-mobile-plus"],
    margin: 0.22,
    inventory: 34,
    rating: 4.8,
    reviews: 2841,
    tags: ["ai", "5g", "flagship", "camera"],
    eligibleTiers: ["silver", "gold", "platinum"],
  },
  {
    id: "dev-ip16pm",
    name: "iPhone 16 Pro Max 256GB",
    brand: "Apple",
    category: "device",
    price: 1449,
    currency: "EUR",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSBiBCy50EVDEo_IemR30DC8JRO48JaIIQrC7W0wPZF9xEqDJoT5Ur9yVOmgNhIcAkZ1YxU8dg8Rz5l3IL3EPq_jQ0V5SbplJckfKcOQ7s",
    tagline: "Apple Intelligence, titanium build",
    description:
      "A18 Pro chip, 5x telephoto, Apple Intelligence. Pairs with MagentaMobil XL and AppleCare+.",
    specs: { display: "6.9\" OLED", storage: "256GB", camera: "48MP", "5G": "Yes" },
    compatibleWith: ["plan-mag-xl", "acc-airpods-pro", "acc-watch-ultra", "ins-mobile-plus"],
    margin: 0.18,
    inventory: 21,
    rating: 4.9,
    reviews: 5210,
    tags: ["ai", "5g", "flagship", "apple"],
    eligibleTiers: ["gold", "platinum"],
  },
  {
    id: "dev-pixel9",
    name: "Google Pixel 9 Pro 256GB",
    brand: "Google",
    category: "device",
    price: 1099,
    originalPrice: 1199,
    currency: "EUR",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpNCQnLVkAlsEC9dm1E3dyCSAyAKdUiZh9bdyfOJc64VOXs2T0h9rcvaK2V4NaiZQEIBzfGv0LyqzUqhi715sdfvRywq84sJ1TvnFc21esEDNGSfkGPG8f65xIeGVj5ffFpVrlAg&usqp=CAc",
    tagline: "Gemini-powered photography",
    description:
      "Tensor G4, 50MP camera, Gemini Nano on-device. Great match for MagentaMobil M.",
    specs: { display: "6.3\" OLED", storage: "256GB", camera: "50MP", "5G": "Yes" },
    compatibleWith: ["plan-mag-m", "acc-buds3", "ins-mobile"],
    margin: 0.24,
    inventory: 58,
    rating: 4.7,
    reviews: 1420,
    tags: ["ai", "5g", "camera"],
    eligibleTiers: ["bronze", "silver", "gold", "platinum"],
  },
  {
    id: "plan-mag-xl",
    name: "MagentaMobil XL 5G",
    brand: "Telekom",
    category: "plan",
    price: 84.95,
    currency: "EUR",
    image: "/MagentaMobil_XL_5G.png",
    tagline: "Unlimited 5G + StreamOn",
    description: "Unlimited data, 5G+, EU roaming, StreamOn Music & Video included.",
    specs: { data: "Unlimited", speed: "5G+ up to 3 Gbit/s", eu_roaming: "Included" },
    margin: 0.55,
    inventory: 999,
    rating: 4.6,
    reviews: 8834,
    tags: ["unlimited", "5g", "premium"],
    eligibleTiers: ["silver", "gold", "platinum"],
  },
  {
    id: "plan-mag-m",
    name: "MagentaMobil M",
    brand: "Telekom",
    category: "plan",
    price: 49.95,
    currency: "EUR",
    image: "/magentamobil_m.png",
    tagline: "20 GB with 5G",
    description: "20 GB high-speed data, 5G, EU roaming.",
    specs: { data: "20 GB", speed: "5G", eu_roaming: "Included" },
    margin: 0.62,
    inventory: 999,
    rating: 4.4,
    reviews: 5120,
    tags: ["value", "5g"],
    eligibleTiers: ["bronze", "silver", "gold", "platinum"],
  },
  {
    id: "fiber-1g",
    name: "MagentaZuhause Glasfaser 1 Gbit/s",
    brand: "Telekom",
    category: "fiber",
    price: 59.95,
    currency: "EUR",
    image: "gradient-teal",
    tagline: "Fiber to the home, 1 Gbit/s",
    description: "Symmetric fiber, MagentaTV, HomeCare+ eligible.",
    specs: { down: "1 Gbit/s", up: "500 Mbit/s", tv: "MagentaTV" },
    margin: 0.48,
    inventory: 999,
    rating: 4.5,
    reviews: 3211,
    tags: ["fiber", "home"],
    eligibleTiers: ["bronze", "silver", "gold", "platinum"],
  },
  {
    id: "acc-buds3",
    name: "Galaxy Buds3 Pro",
    brand: "Samsung",
    category: "accessory",
    price: 249,
    currency: "EUR",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRKyf6QzVxhlP9igkyZE8IpnLerHCDfHyCuJ0VjaFUaJmP1LC0CAda6xLhBiaErf2KTwpBnv2t1x3A0KJzdA3MD82usyf62WPLFUEgpZynSJ6D7ArWMWeKp",
    tagline: "ANC earbuds with AI translation",
    description: "Adaptive ANC, real-time translation, 6h + 24h with case.",
    specs: { anc: "Yes", battery: "6h + 24h" },
    compatibleWith: ["dev-s25u", "dev-pixel9"],
    margin: 0.35,
    inventory: 120,
    rating: 4.6,
    reviews: 990,
    tags: ["audio", "ai"],
    eligibleTiers: ["bronze", "silver", "gold", "platinum"],
  },
  {
    id: "acc-airpods-pro",
    name: "AirPods Pro 2 USB-C",
    brand: "Apple",
    category: "accessory",
    price: 279,
    currency: "EUR",
    image: "gradient-slate",
    tagline: "Adaptive Audio + Hearing Aid",
    description: "H2 chip, Adaptive Audio, Personalized Volume.",
    specs: { anc: "Yes", battery: "6h + 30h" },
    compatibleWith: ["dev-ip16pm"],
    margin: 0.30,
    inventory: 88,
    rating: 4.7,
    reviews: 4210,
    tags: ["audio", "apple"],
    eligibleTiers: ["bronze", "silver", "gold", "platinum"],
  },
  {
    id: "acc-watch7",
    name: "Galaxy Watch 7 44mm LTE",
    brand: "Samsung",
    category: "accessory",
    price: 379,
    currency: "EUR",
    image: "gradient-magenta",
    tagline: "LTE health tracking",
    description: "Body composition, sleep coaching, LTE — needs a MultiSIM plan.",
    specs: { lte: "Yes", battery: "40h" },
    compatibleWith: ["dev-s25u", "plan-mag-xl"],
    margin: 0.32,
    inventory: 45,
    rating: 4.4,
    reviews: 640,
    tags: ["wearable", "lte", "health"],
    eligibleTiers: ["silver", "gold", "platinum"],
  },
  {
    id: "acc-watch-ultra",
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "accessory",
    price: 899,
    currency: "EUR",
    image: "gradient-magenta",
    tagline: "Titanium, 36h battery",
    description: "Precision dual-frequency GPS, Action button, LTE.",
    specs: { lte: "Yes", battery: "36h" },
    compatibleWith: ["dev-ip16pm", "plan-mag-xl"],
    margin: 0.28,
    inventory: 12,
    rating: 4.8,
    reviews: 1100,
    tags: ["wearable", "lte", "premium"],
    eligibleTiers: ["gold", "platinum"],
  },
  {
    id: "ins-mobile-plus",
    name: "HandyProtect Premium",
    brand: "Telekom",
    category: "insurance",
    price: 12.95,
    currency: "EUR",
    image: "gradient-teal",
    tagline: "Full damage + theft cover",
    description: "24h device replacement, no deductible for screen repairs.",
    specs: { cover: "Damage, theft, water", deductible: "0€ screen" },
    margin: 0.70,
    inventory: 999,
    rating: 4.3,
    reviews: 210,
    tags: ["insurance", "premium"],
    eligibleTiers: ["bronze", "silver", "gold", "platinum"],
  },
  {
    id: "ins-mobile",
    name: "HandyProtect Basic",
    brand: "Telekom",
    category: "insurance",
    price: 6.95,
    currency: "EUR",
    image: "gradient-teal",
    tagline: "Screen + damage cover",
    description: "Covers accidental damage and screen breaks.",
    specs: { cover: "Damage, screen" },
    margin: 0.72,
    inventory: 999,
    rating: 4.1,
    reviews: 180,
    tags: ["insurance"],
    eligibleTiers: ["bronze", "silver", "gold", "platinum"],
  },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: "promo-s25-launch",
    title: "S25 Ultra Launch — 100€ off",
    discount: 7,
    appliesTo: ["dev-s25u"],
    reason: "New flagship launch window, Gold tier eligible",
    endsAt: "2026-08-31",
  },
  {
    id: "promo-pixel-swap",
    title: "Trade-in Pixel bonus",
    discount: 9,
    appliesTo: ["dev-pixel9"],
    reason: "Boost conversion, high margin device",
    endsAt: "2026-09-15",
  },
  {
    id: "promo-fiber-bundle",
    title: "Free 3 months MagentaTV with Fiber",
    discount: 15,
    appliesTo: ["fiber-1g"],
    reason: "Cross-sell fiber to mobile customers",
    endsAt: "2026-10-01",
  },
];

import { seedLedger } from "./loyalty-data";

// -- Digital Twin seed -------------------------------------------------------

export const SEED_TWIN: CustomerDigitalTwin = {
  id: "cust-84021",
  name: "Marcus",
  email: "marcus.h@example.com",
  avatar: "MH",
  loyaltyTier: "gold",
  loyaltyPoints: 12450,
  currentPlan: "plan-mag-m",
  ownedDevices: ["dev-ip14"],
  network: { technology: "5G", strength: 82, city: "Berlin" },
  preferredBrands: ["Apple", "Samsung", "Sony"],
  preferredPriceRange: [30, 900],
  intent: "comparing",
  churnProbability: 0.12,
  clv: 3450,
  engagementScore: 78,
  contractEligibleFrom: "2024-09-01T00:00:00Z",
  browsingHistory: ["dev-s25u", "plan-mag-xl"],
  purchaseHistory: [
    { productId: "dev-ip14", ts: "2022-09-15T10:00:00Z", price: 999 },
    { productId: "acc-buds3", ts: "2023-01-20T14:30:00Z", price: 179 },
  ],
  recommendationHistory: [
    { productId: "fiber-500", score: 0.92, accepted: false },
    { productId: "acc-buds3", score: 0.88, accepted: true },
  ],
  feedbackHistory: [
    { ts: "2024-02-15T09:00:00Z", rating: 5, note: "Store pickup was super fast" },
    { ts: "2023-06-10T11:20:00Z", rating: 4, note: "App is good but sometimes slow" },
  ],
  cart: [],
  journey: [
    {
      id: "j1",
      ts: new Date(Date.now() - 3600000).toISOString(),
      channel: "OneApp",
      type: "view",
      label: "Viewed Galaxy S25 Ultra",
      productId: "dev-s25u",
    },
    {
      id: "j2",
      ts: new Date(Date.now() - 3500000).toISOString(),
      channel: "OneApp",
      type: "compare",
      label: "Compared plans",
      meta: { comparedWith: "plan-mag-l" },
    },
  ],
  loyaltyLedger: seedLedger(),
};

export const CHANNEL_LABEL: Record<JourneyEvent["channel"], string> = {
  OneShop: "OneShop · Web",
  OneApp: "OneApp · Mobile",
  Store: "Retail Store",
  CallCenter: "Call Center",
};

export function productById(id: string): Product | undefined {
  return PROMPTS_INDEX.get(id);
}
const PROMPTS_INDEX = new Map(PRODUCTS.map((p) => [p.id, p]));

import { LedgerEntry } from "./mock-data";

export interface Perk {
  id: string;
  title: string;
  category: "entertainment" | "travel" | "shopping" | "telco" | "experience";
  cost: number; // points
  partner: string;
  description: string;
  eligibleTiers: ("bronze" | "silver" | "gold" | "platinum")[];
  hot?: boolean;
}

export const PERKS: Perk[] = [
  {
    id: "perk-disney-3m",
    title: "3 months Disney+ on us",
    category: "entertainment",
    cost: 2_000,
    partner: "Disney+",
    description: "Stream Marvel, Star Wars and Pixar for three months on any device.",
    eligibleTiers: ["bronze", "silver", "gold", "platinum"],
  },
  {
    id: "perk-spotify-family",
    title: "6 months Spotify Family",
    category: "entertainment",
    cost: 3_500,
    partner: "Spotify",
    description: "Ad-free listening for up to 6 accounts, half a year.",
    eligibleTiers: ["silver", "gold", "platinum"],
    hot: true,
  },
  {
    id: "perk-lufthansa-2500mi",
    title: "2,500 Miles & More miles",
    category: "travel",
    cost: 4_000,
    partner: "Lufthansa",
    description: "Boost your Miles & More balance — good for a short-haul flight.",
    eligibleTiers: ["gold", "platinum"],
  },
  {
    id: "perk-magentatv-6m",
    title: "6 months MagentaTV Plus",
    category: "telco",
    cost: 2_800,
    partner: "Telekom",
    description: "All the sport, series and movies you love, on any screen.",
    eligibleTiers: ["silver", "gold", "platinum"],
  },
  {
    id: "perk-bosch-30",
    title: "30€ Bosch Home Store voucher",
    category: "shopping",
    cost: 3_000,
    partner: "Bosch",
    description: "Redeem against any Bosch smart-home appliance.",
    eligibleTiers: ["bronze", "silver", "gold", "platinum"],
  },
  {
    id: "perk-fc-bayern",
    title: "FC Bayern home-match ticket",
    category: "experience",
    cost: 12_000,
    partner: "FC Bayern",
    description: "Category 2 seat plus a Magenta Moments hospitality pass.",
    eligibleTiers: ["gold", "platinum"],
    hot: true,
  },
  {
    id: "perk-early-access",
    title: "Early access to next iPhone drop",
    category: "telco",
    cost: 1_500,
    partner: "Telekom",
    description: "Reserve your device 24h before public launch, priority delivery.",
    eligibleTiers: ["gold", "platinum"],
    hot: true,
  },
  {
    id: "perk-doubledata-30d",
    title: "Double data for 30 days",
    category: "telco",
    cost: 800,
    partner: "Telekom",
    description: "Your MagentaMobil allowance doubled — automatically applied.",
    eligibleTiers: ["bronze", "silver", "gold", "platinum"],
  },
];

export function seedLedger(): LedgerEntry[] {
  const now = Date.now();
  const d = (h: number) => new Date(now - h * 3_600_000).toISOString();
  return [
    { id: "l1", ts: d(2),   label: "Chat session on OneApp",             delta:   +50, category: "engagement" },
    { id: "l2", ts: d(20),  label: "Accepted Galaxy Buds3 recommendation", delta:  +200, category: "engagement" },
    { id: "l3", ts: d(72),  label: "Monthly MagentaMobil payment",         delta:  +500, category: "purchase" },
    { id: "l4", ts: d(240), label: "Redeemed: 3 months Disney+",           delta: -2000, category: "redemption" },
    { id: "l5", ts: d(720), label: "Anniversary bonus",                    delta: +1000, category: "bonus" },
  ];
}

export type PriceDirection = "up" | "down" | "flat";
export type Unit = "kg" | "litre" | "dozen" | "piece";
export type SortOption = "default" | "price-asc" | "price-desc";

export interface PriceChange {
  dir: PriceDirection;
  pct: number;
}

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: Unit;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface AuthUser {
  name: string;
  email: string;
  image?: string | null;
}

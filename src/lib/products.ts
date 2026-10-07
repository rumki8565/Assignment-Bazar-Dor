import type { MarketPrice, Product, SortOption } from "@/types";

export function getTopRisers(products: Product[], limit = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, limit);
}

export function getTopFallers(products: Product[], limit = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, limit);
}

/** C1: numeric sort (prices are numbers, never compared as Bengali strings) */
export function sortProducts(
  products: Product[],
  option: SortOption,
): Product[] {
  const copy = [...products];
  if (option === "price-asc") return copy.sort((a, b) => a.today - b.today);
  if (option === "price-desc") return copy.sort((a, b) => b.today - a.today);
  return copy;
}

export interface MarketRow extends MarketPrice {
  avg: number;
}

export interface MarketStats {
  lowest: number;
  highest: number;
  average: number;
  rows: MarketRow[];
}

export function getMarketStats(markets: MarketPrice[]): MarketStats | null {
  if (markets.length === 0) return null;
  const rows: MarketRow[] = markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);
  return {
    lowest: Math.min(...markets.map((m) => m.min)),
    highest: Math.max(...markets.map((m) => m.max)),
    average: Math.round(rows.reduce((sum, r) => sum + r.avg, 0) / rows.length),
    rows,
  };
}

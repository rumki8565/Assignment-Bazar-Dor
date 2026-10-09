"use client";

import { useMemo, useState } from "react";
import { toBnDigits } from "@/lib/bn";
import { sortProducts } from "@/lib/products";
import type { Product, SortOption } from "@/types";
import ProductGrid from "./ProductGrid";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

function isSortOption(value: string): value is SortOption {
  return SORT_OPTIONS.some((option) => option.value === value);
}

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end gap-2 rounded-xl border border-line bg-surface p-3">
        <label htmlFor="sort" className="text-sm text-muted">
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(event) => {
              const next = event.target.value;
              if (isSortOption(next)) setSort(next);
            }}
            className="cursor-pointer appearance-none rounded-lg border border-line bg-surface py-1.5 pl-3 pr-8 text-sm font-medium text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </div>

      <p className="text-xs text-muted">
        মোট {toBnDigits(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <ProductGrid products={sorted} />
    </div>
  );
}

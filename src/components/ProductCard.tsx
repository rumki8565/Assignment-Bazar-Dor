import Link from "next/link";
import { UNIT_LABEL, formatPrice } from "@/lib/bn";
import type { Product } from "@/types";
import PriceChangeBadge from "./PriceChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block h-full rounded-xl border border-line bg-surface p-3.5 transition hover:border-brand hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-canvas text-xl"
        >
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="break-words text-sm font-semibold leading-snug text-ink">
            {product.nameBn}
          </h3>
          <p className="text-xs text-muted">{UNIT_LABEL[product.unit]}</p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-lg font-bold leading-snug text-ink">
            {formatPrice(product.today)}{" "}
            <span className="text-sm font-normal text-muted">টাকা</span>
          </p>
        </div>
        <PriceChangeBadge change={product.change} />
      </div>
    </Link>
  );
}

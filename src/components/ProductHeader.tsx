import Link from "next/link";
import {
  UNIT_LABEL,
  UNIT_SHORT,
  formatPrice,
  getChangeSentence,
} from "@/lib/bn";
import type { Product } from "@/types";
import PriceChangeBadge from "./PriceChangeBadge";

export default function ProductHeader({ product }: { product: Product }) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-canvas text-3xl"
        >
          {product.image}
        </span>
        <div>
          <h1 className="text-2xl font-bold leading-snug text-ink sm:text-3xl">
            {product.nameBn}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
            <span>{UNIT_LABEL[product.unit]}</span>
            <span aria-hidden>·</span>
            <Link
              href={`/category/${product.category}`}
              className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand hover:bg-brand hover:text-white"
            >
              {product.categoryNameBn}
            </Link>
          </p>
          <p className="mt-1.5 text-sm text-muted">
            {getChangeSentence(product)}
          </p>
        </div>
      </div>

      <div className="shrink-0 rounded-xl bg-canvas px-5 py-3 text-center sm:min-w-36">
        <p className="text-xs text-muted">আজকের দাম</p>
        <p className="text-3xl font-bold leading-snug text-ink">
          {formatPrice(product.today)}
        </p>
        <p className="text-xs text-muted">টাকা / {UNIT_SHORT[product.unit]}</p>
        <div className="mt-1.5">
          <PriceChangeBadge change={product.change} />
        </div>
      </div>
    </section>
  );
}

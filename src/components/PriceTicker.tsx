import { UNIT_SHORT, formatPrice, getChangeBadge } from "@/lib/bn";
import type { PriceDirection, Product } from "@/types";

const TONE: Record<PriceDirection, string> = {
  up: "text-rise",
  down: "text-fall",
  flat: "text-flat",
};

function TickerItem({ product }: { product: Product }) {
  const badge = getChangeBadge(product.change);
  return (
    <li className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm">
      <span aria-hidden>{product.image}</span>
      <span className="font-medium text-ink">{product.nameBn}</span>
      <span className="text-muted">
        {formatPrice(product.today)} টাকা/{UNIT_SHORT[product.unit]}
      </span>
      <span className={`font-semibold ${TONE[badge.dir]}`}>{badge.text}</span>
    </li>
  );
}

export default function PriceTicker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  const duration = `${Math.max(products.length * 4, 20)}s`;

  return (
    <div
      role="region"
      aria-label="আজকের দামের তালিকা"
      className="ticker overflow-hidden border-b border-line bg-surface motion-reduce:overflow-x-auto"
    >
      <div
        className="ticker-track flex w-max"
        style={{ animationDuration: duration }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-8 py-2 pr-8"
          >
            {products.map((product) => (
              <TickerItem key={product.id} product={product} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

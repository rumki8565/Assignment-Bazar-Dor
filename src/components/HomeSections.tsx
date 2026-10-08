import { getProducts } from "@/lib/api";
import { toBnDigits } from "@/lib/bn";
import { getTopFallers, getTopRisers } from "@/lib/products";
import ProductGrid from "./ProductGrid";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  marker?: { symbol: string; className: string };
}

function SectionHeading({ title, subtitle, marker }: SectionHeadingProps) {
  return (
    <div className="mb-3">
      <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
        {marker && (
          <span aria-hidden className={`text-sm ${marker.className}`}>
            {marker.symbol}
          </span>
        )}
        {title}
      </h2>
      {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
    </div>
  );
}

export default async function HomeSections() {
  const products = await getProducts();
  const risers = getTopRisers(products);
  const fallers = getTopFallers(products);

  return (
    <div className="space-y-10">
      {risers.length > 0 && (
        <section>
          <SectionHeading
            title="আজ দাম বেড়েছে"
            marker={{ symbol: "▲", className: "text-rise" }}
          />
          <ProductGrid products={risers} />
        </section>
      )}

      {fallers.length > 0 && (
        <section>
          <SectionHeading
            title="আজ দাম কমেছে"
            marker={{ symbol: "▼", className: "text-fall" }}
          />
          <ProductGrid products={fallers} />
        </section>
      )}

      <section id="সব-পণ্য" className="scroll-mt-6">
        <SectionHeading
          title="সব পণ্য"
          subtitle={`মোট ${toBnDigits(products.length)}টি পণ্য দেখানো হচ্ছে`}
        />
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="rounded-xl border border-line bg-surface p-6 text-center text-sm text-muted">
            এখন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}

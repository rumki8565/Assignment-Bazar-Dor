import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import EmptyState from "@/components/EmptyState";
import MarketPriceTable from "@/components/MarketPriceTable";
import PriceSummary from "@/components/PriceSummary";
import ProductHeader from "@/components/ProductHeader";
import { getProductBySlug } from "@/lib/api";
import { getMarketStats } from "@/lib/products";
import { requireSession } from "@/lib/session";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product
      ? `${product.nameBn} | বাজার দর`
      : "পাওয়া যায়নি | বাজার দর",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // Unknown product: show the 404 message to everyone (logged in or not).
  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <EmptyState
          code="৪০৪"
          title="পণ্যটি খুঁজে পাওয়া যায়নি"
          description="আপনি যে পণ্যটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।"
        />
      </div>
    );
  }

  // Protected: visitors who are not logged in are sent to the sign in page.
  await requireSession(`/product/${slug}`);

  const stats = getMarketStats(product.markets);

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:py-8">
      <Breadcrumb
        items={[
          { label: "হোম", href: "/" },
          {
            label: product.categoryNameBn,
            href: `/category/${product.category}`,
          },
          { label: product.nameBn },
        ]}
      />

      <ProductHeader product={product} />

      {stats ? (
        <>
          <PriceSummary
            lowest={stats.lowest}
            highest={stats.highest}
            average={stats.average}
            unit={product.unit}
          />
          <MarketPriceTable rows={stats.rows} />
        </>
      ) : (
        <p className="rounded-2xl border border-line bg-surface p-6 text-center text-sm text-muted">
          এই পণ্যের বাজারভিত্তিক তথ্য এখন পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
}

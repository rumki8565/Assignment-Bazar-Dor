import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MarketPriceTable from "@/components/MarketPriceTable";
import PriceSummary from "@/components/PriceSummary";
import ProductHeader from "@/components/ProductHeader";
import { getProductBySlug, getProducts } from "@/lib/api";
import { getMarketStats } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Only real products exist; any other slug gets the 404 page.
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
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

  if (!product) notFound();

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

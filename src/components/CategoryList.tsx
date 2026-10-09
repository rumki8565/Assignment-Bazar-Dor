import { getProductsByCategory } from "@/lib/api";
import CategoryProducts from "./CategoryProducts";
import EmptyState from "./EmptyState";

interface CategoryListProps {
  slug: string;
  categoryName: string;
}

export default async function CategoryList({
  slug,
  categoryName,
}: CategoryListProps) {
  const products = await getProductsByCategory(slug);

  if (products.length === 0) {
    return (
      <EmptyState
        code="৪০৪"
        headingLevel="h2"
        title={`${categoryName} ক্যাটাগরিতে কোনো পণ্য নেই`}
        description="অন্য ক্যাটাগরি দেখুন বা হোম পেজে ফিরে যান।"
      />
    );
  }

  return <CategoryProducts key={slug} products={products} />;
}

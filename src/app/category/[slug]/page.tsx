import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CategoryList from "@/components/CategoryList";
import { CategoryListSkeleton } from "@/components/ProductSkeletons";
import { getCategories, getCategoryBySlug } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Only the real categories exist; any other slug gets the 404 page.
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return {
    title: category
      ? `${category.nameBn} | বাজার দর`
      : "পাওয়া যায়নি | বাজার দর",
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-6 sm:py-8">
      <header className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4">
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-canvas text-2xl"
        >
          {category.icon}
        </span>
        <div>
          <h1 className="text-xl font-bold leading-snug text-ink">
            {category.nameBn}
          </h1>
          <p className="text-xs text-muted">
            প্রতিটি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList slug={slug} categoryName={category.nameBn} />
      </Suspense>
    </div>
  );
}

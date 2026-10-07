import type { Category, Product } from "@/types";

const BASE_URLS: string[] = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchJson<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return (await res.json()) as T;
    } catch (error) {
      lastError = error; // try the alternative URL
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("API request failed");
}

export function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>("/products");
}

export function getCategories(): Promise<Category[]> {
  return fetchJson<Category[]>("/categories");
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === slug);
}

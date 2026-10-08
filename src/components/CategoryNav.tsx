"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types";

export default function CategoryNav({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  if (categories.length === 0) return null;

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="-mx-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max min-w-full items-center gap-1.5">
        {categories.map((category) => {
          const href = `/category/${category.slug}`;
          const isActive = pathname === href;
          return (
            <li key={category.id}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand text-white"
                    : "text-ink hover:bg-brand-soft"
                }`}
              >
                <span aria-hidden>{category.icon}</span>
                {category.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

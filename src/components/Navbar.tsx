import Link from "next/link";
import { getBanglaDate } from "@/lib/bn";
import type { Category } from "@/types";
import AuthMenu from "./AuthMenu";
import CategoryNav from "./CategoryNav";

export default function Navbar({ categories }: { categories: Category[] }) {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg"
            >
              🛒
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold text-ink">বাজার দর</span>
              <span className="block text-xs text-muted">
                {getBanglaDate()}
              </span>
            </span>
          </Link>
          <AuthMenu />
        </div>
        <CategoryNav categories={categories} />
      </div>
    </header>
  );
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden className="rounded-xl border border-line bg-surface p-3.5">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-line" />
        <div className="space-y-2">
          <div className="h-3.5 w-28 animate-pulse rounded bg-line" />
          <div className="h-3 w-16 animate-pulse rounded bg-line" />
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-3 w-14 animate-pulse rounded bg-line" />
          <div className="h-5 w-20 animate-pulse rounded bg-line" />
        </div>
        <div className="h-5 w-14 animate-pulse rounded-md bg-line" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div role="status" aria-live="polite" className="space-y-10">
      <span className="sr-only">লোড হচ্ছে…</span>
      {[6, 6, 9].map((count, index) => (
        <section key={index}>
          <div className="mb-3 h-6 w-40 animate-pulse rounded bg-line" />
          <ProductGridSkeleton count={count} />
        </section>
      ))}
    </div>
  );
}

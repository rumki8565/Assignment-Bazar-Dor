"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center">
      <p aria-hidden className="text-4xl">
        ⚠️
      </p>
      <h1 className="mt-3 text-xl font-bold text-ink">তথ্য লোড করা যায়নি</h1>
      <p className="mt-1 text-sm text-muted">কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
      <button
        type="button"
        onClick={reset}
        className="btn btn-sm sm:btn-md mt-5 border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark"
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}

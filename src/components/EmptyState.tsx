import Link from "next/link";

interface EmptyStateProps {
  code?: string;
  title: string;
  description: string;
  headingLevel?: "h1" | "h2";
}

export default function EmptyState({
  code,
  title,
  description,
  headingLevel = "h1",
}: EmptyStateProps) {
  const Heading = headingLevel;
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-line bg-surface p-8 text-center">
      {code && <p className="text-5xl font-bold text-brand">{code}</p>}
      <Heading className="mt-3 text-xl font-bold text-ink">{title}</Heading>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <Link
        href="/"
        className="btn btn-sm sm:btn-md mt-5 border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

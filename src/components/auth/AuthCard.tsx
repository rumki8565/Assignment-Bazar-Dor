import Link from "next/link";
import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  footer: ReactNode;
  children: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  footer,
  children,
}: AuthCardProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-10 sm:py-14">
      <div className="text-center">
        <h1 className="text-2xl font-bold leading-snug text-ink">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        {children}
        <p className="mt-5 text-center text-sm text-muted">{footer}</p>
      </div>

      <Link
        href="/"
        className="mt-5 text-center text-xs text-muted hover:text-brand"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

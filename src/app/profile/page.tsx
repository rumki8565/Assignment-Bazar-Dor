import type { Metadata } from "next";
import Link from "next/link";
import SignOutButton from "@/components/profile/SignOutButton";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল | বাজার দর" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");
  const initial = Array.from(user.name.trim())[0] ?? "?";

  return (
    <div className="mx-auto max-w-xl space-y-4 px-4 py-8 sm:py-10">
      <div>
        <h1 className="text-2xl font-bold leading-snug text-ink">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-sm text-muted">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <section className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white"
          >
            {initial}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-ink">{user.name}</p>
          <p className="truncate text-sm text-muted">{user.email}</p>
        </div>
        <SignOutButton />
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-base font-bold text-ink">তথ্য</h2>
        <div className="mt-3">
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-ink"
          >
            নাম
          </label>
          <input
            id="name"
            readOnly
            value={user.name}
            className="w-full rounded-lg border border-line bg-canvas/50 px-3 py-2 text-sm text-ink"
          />
        </div>
        <Link
          href="/profile/update"
          className="btn btn-sm sm:btn-md mt-4 w-full border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark"
        >
          আপডেট
        </Link>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট | বাজার দর" };

export default async function UpdateProfilePage() {
  const { user } = await requireSession("/profile/update");

  return (
    <div className="mx-auto max-w-xl space-y-4 px-4 py-8 sm:py-10">
      <Link href="/profile" className="text-xs text-muted hover:text-brand">
        ← প্রোফাইলে ফিরে যান
      </Link>
      <div>
        <h1 className="text-2xl font-bold leading-snug text-ink">
          তথ্য আপডেট করুন
        </h1>
        <p className="mt-1 text-sm text-muted">আপনার নাম পরিবর্তন করুন।</p>
      </div>

      <section className="rounded-2xl border border-line bg-surface p-5">
        <UpdateProfileForm initialName={user.name} />
      </section>
    </div>
  );
}

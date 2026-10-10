"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import FormField from "@/components/auth/FormField";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { validateName } from "@/lib/validation";

export default function UpdateProfileForm({
  initialName,
}: {
  initialName: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    const trimmed = name.trim();
    if (trimmed === initialName) {
      setError(null);
      toast("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setError(null);
    setSubmitting(true);
    const { error: authError } = await authClient.updateUser({ name: trimmed });
    setSubmitting(false);

    if (authError) {
      const message = getAuthErrorMessage(
        authError,
        "তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।",
      );
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormField
        id="name"
        label="নাম"
        value={name}
        onChange={setName}
        placeholder="আপনার নাম লিখুন"
        autoComplete="name"
        disabled={submitting}
      />

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-rise-soft px-3 py-2 text-sm text-rise"
        >
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-sm sm:btn-md flex-1 border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <span
                className="loading loading-spinner loading-xs"
                aria-hidden
              />
              অপেক্ষা করুন…
            </>
          ) : (
            "তথ্য আপডেট করুন"
          )}
        </button>
        <Link
          href="/profile"
          className="btn btn-sm sm:btn-md border-line bg-surface font-normal text-ink hover:bg-brand-soft"
        >
          বাতিল
        </Link>
      </div>
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { validateSignIn } from "@/lib/validation";
import FormField from "./FormField";
import SocialButtons from "./SocialButtons";

export type SignInNotice = "login-required" | "oauth-error" | null;

interface SignInFormProps {
  callbackUrl: string;
  notice: SignInNotice;
}

export default function SignInForm({ callbackUrl, notice }: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (notice === "login-required") {
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন।", {
        id: "login-required",
      });
    } else if (notice === "oauth-error") {
      toast.error("সোশ্যাল লগইন সম্পূর্ণ করা যায়নি। আবার চেষ্টা করুন।", {
        id: "oauth-error",
      });
    }
  }, [notice]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateSignIn({ email, password });
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setError(null);
    setSubmitting(true);
    const { error: authError } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });
    setSubmitting(false);

    if (authError) {
      const message = getAuthErrorMessage(
        authError,
        "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।",
      );
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField
          id="email"
          label="ইমেইল"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
          disabled={submitting}
        />
        <FormField
          id="password"
          label="পাসওয়ার্ড"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="কমপক্ষে ৮ অক্ষর"
          autoComplete="current-password"
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

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-sm sm:btn-md w-full border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
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
            "সাইন ইন"
          )}
        </button>
      </form>

      <SocialButtons callbackURL={callbackUrl} disabled={submitting} />
    </>
  );
}

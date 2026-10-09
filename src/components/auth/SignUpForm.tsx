"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { withCallbackUrl } from "@/lib/redirect";
import { validateSignUp } from "@/lib/validation";
import FormField from "./FormField";
import SocialButtons from "./SocialButtons";

export default function SignUpForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateSignUp({
      name,
      email,
      password,
      confirmPassword,
    });
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setError(null);
    setSubmitting(true);
    const { error: authError } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setSubmitting(false);

    if (authError) {
      const message = getAuthErrorMessage(
        authError,
        "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।",
      );
      setError(message);
      toast.error(message);
      return;
    }

    // Sign up also signs the user in; the assignment sends them to the sign in page.
    await authClient.signOut();
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
    router.push(withCallbackUrl("/signin", callbackUrl));
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField
          id="name"
          label="নাম"
          value={name}
          onChange={setName}
          placeholder="যেমন: রহিম উদ্দিন"
          autoComplete="name"
          disabled={submitting}
        />
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
          autoComplete="new-password"
          disabled={submitting}
        />
        <FormField
          id="confirmPassword"
          label="পাসওয়ার্ড নিশ্চিত করুন"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="আবার লিখুন"
          autoComplete="new-password"
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
            "অ্যাকাউন্ট তৈরি করুন"
          )}
        </button>
      </form>

      <SocialButtons callbackURL="/" disabled={submitting} />
    </>
  );
}

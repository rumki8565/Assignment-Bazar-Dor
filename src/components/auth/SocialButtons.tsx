"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";

type Provider = "google" | "github";

function GoogleIcon() {
  return (
    <svg aria-hidden viewBox="0 0 18 18" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

interface SocialButtonsProps {
  callbackURL: string;
  disabled?: boolean;
}

export default function SocialButtons({
  callbackURL,
  disabled,
}: SocialButtonsProps) {
  const [pending, setPending] = useState<Provider | null>(null);

  async function handleClick(provider: Provider) {
    setPending(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL,
      errorCallbackURL: "/signin",
    });
    if (error) {
      setPending(null);
      toast.error(
        getAuthErrorMessage(
          error,
          "সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।",
        ),
      );
    }
    // On success the browser is sent to Google / GitHub.
  }

  const buttonClass =
    "btn btn-sm sm:btn-md flex-1 border-line bg-surface font-normal text-ink hover:bg-brand-soft";

  return (
    <div className="mt-5">
      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        অথবা
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => handleClick("google")}
          disabled={disabled || pending !== null}
          className={buttonClass}
        >
          {pending === "google" ? (
            <span className="loading loading-spinner loading-xs" aria-hidden />
          ) : (
            <GoogleIcon />
          )}
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => handleClick("github")}
          disabled={disabled || pending !== null}
          className={buttonClass}
        >
          {pending === "github" ? (
            <span className="loading loading-spinner loading-xs" aria-hidden />
          ) : (
            <GitHubIcon />
          )}
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </div>
  );
}

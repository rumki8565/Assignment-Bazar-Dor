"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    const { error } = await authClient.signOut();
    setPending(false);

    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="btn btn-sm shrink-0 border-rise bg-surface font-normal text-rise hover:bg-rise-soft disabled:opacity-60"
    >
      {pending ? "সাইন আউট হচ্ছে…" : "↩\uFE0E সাইন আউট"}
    </button>
  );
}

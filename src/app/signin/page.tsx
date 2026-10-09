import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import SignInForm, { type SignInNotice } from "@/components/auth/SignInForm";
import { getSafeCallbackUrl, withCallbackUrl } from "@/lib/redirect";
import { getServerSession } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন ইন | বাজার দর" };

interface SignInPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const callbackUrl = getSafeCallbackUrl(params.callbackUrl);

  const session = await getServerSession();
  if (session) redirect(callbackUrl);

  const notice: SignInNotice =
    params.reason === "login-required"
      ? "login-required"
      : params.error
        ? "oauth-error"
        : null;

  return (
    <AuthCard
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
      footer={
        <>
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href={withCallbackUrl("/signup", callbackUrl)}
            className="font-medium text-brand hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </>
      }
    >
      <SignInForm callbackUrl={callbackUrl} notice={notice} />
    </AuthCard>
  );
}

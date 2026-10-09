import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import SignUpForm from "@/components/auth/SignUpForm";
import { getSafeCallbackUrl, withCallbackUrl } from "@/lib/redirect";
import { getServerSession } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন আপ | বাজার দর" };

interface SignUpPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const callbackUrl = getSafeCallbackUrl(params.callbackUrl);

  const session = await getServerSession();
  if (session) redirect(callbackUrl);

  return (
    <AuthCard
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
      footer={
        <>
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href={withCallbackUrl("/signin", callbackUrl)}
            className="font-medium text-brand hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </>
      }
    >
      <SignUpForm callbackUrl={callbackUrl} />
    </AuthCard>
  );
}

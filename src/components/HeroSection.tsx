import Image from "next/image";
import { getBanglaDate } from "@/lib/bn";

// Put your banner in /public. Change this if your file has another name or extension.
const HERO_IMAGE = "/hero-basket.png";

export default function HeroSection() {
  return (
    <section className="grid items-center gap-4 rounded-2xl border border-line bg-surface p-5 sm:p-8 md:grid-cols-2">
      <div>
        <p className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
          {getBanglaDate()}
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-snug text-ink sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          href="#সব-পণ্য"
          className="btn btn-sm sm:btn-md mt-5 border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="relative h-44 w-full sm:h-56 md:h-64">
        <Image
          src={HERO_IMAGE}
          alt="ফল ও সবজির ঝুড়ি"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain md:object-right"
        />
      </div>
    </section>
  );
}

import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import HomeSections from "@/components/HomeSections";
import { HomeSkeleton } from "@/components/ProductSkeletons";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-6 sm:py-8">
      <HeroSection />
      <Suspense fallback={<HomeSkeleton />}>
        <HomeSections />
      </Suspense>
    </div>
  );
}

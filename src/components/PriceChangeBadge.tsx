import { getChangeBadge } from "@/lib/bn";
import type { PriceChange, PriceDirection } from "@/types";

const TONE: Record<PriceDirection, string> = {
  up: "bg-rise-soft text-rise",
  down: "bg-fall-soft text-fall",
  flat: "bg-flat-soft text-flat",
};

export default function PriceChangeBadge({ change }: { change: PriceChange }) {
  const badge = getChangeBadge(change);
  return (
    <span
      className={`shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-semibold ${TONE[badge.dir]}`}
    >
      {badge.text}
    </span>
  );
}

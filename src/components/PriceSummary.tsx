import { UNIT_LABEL, formatTaka } from "@/lib/bn";
import type { Unit } from "@/types";

interface SummaryCardProps {
  label: string;
  value: string;
  caption: string;
  valueClassName: string;
}

function SummaryCard({
  label,
  value,
  caption,
  valueClassName,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-line bg-canvas/50 p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-bold leading-snug ${valueClassName}`}>
        {value}
      </p>
      <p className="mt-0.5 text-xs text-muted">{caption}</p>
    </div>
  );
}

interface PriceSummaryProps {
  lowest: number;
  highest: number;
  average: number;
  unit: Unit;
}

export default function PriceSummary({
  lowest,
  highest,
  average,
  unit,
}: PriceSummaryProps) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5">
      <h2 className="text-base font-bold text-ink">দামের সারসংক্ষেপ</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <SummaryCard
          label="সর্বনিম্ন দাম"
          value={formatTaka(lowest)}
          caption="সবচেয়ে কম দামের বাজার"
          valueClassName="text-brand"
        />
        <SummaryCard
          label="সর্বোচ্চ দাম"
          value={formatTaka(highest)}
          caption="সবচেয়ে বেশি দামের বাজার"
          valueClassName="text-rise"
        />
        <SummaryCard
          label="গড় দাম"
          value={formatTaka(average)}
          caption={`${UNIT_LABEL[unit]}-এর হিসাব`}
          valueClassName="text-brand"
        />
      </div>
    </section>
  );
}

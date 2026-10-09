import { formatTaka } from "@/lib/bn";
import type { MarketRow } from "@/lib/products";

export default function MarketPriceTable({ rows }: { rows: MarketRow[] }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5">
      <h2 className="text-base font-bold text-ink">বাজারভিত্তিক আজকের দাম</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[34rem] border-collapse text-sm">
          <caption className="sr-only">বাজারভিত্তিক আজকের দাম</caption>
          <thead>
            <tr className="text-xs text-muted">
              <th scope="col" className="px-4 py-2.5 text-left font-medium">
                বাজার
              </th>
              <th scope="col" className="px-4 py-2.5 text-left font-medium">
                বিভাগ
              </th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">
                সর্বনিম্ন
              </th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">
                সর্বোচ্চ
              </th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">
                গড়
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.market}-${index}`}
                className={index % 2 === 1 ? "bg-canvas/60" : undefined}
              >
                <td className="px-4 py-2.5 font-medium text-ink">
                  {row.market}
                </td>
                <td className="px-4 py-2.5 text-muted">{row.division}</td>
                <td className="px-4 py-2.5 text-right text-muted">
                  {formatTaka(row.min)}
                </td>
                <td className="px-4 py-2.5 text-right text-muted">
                  {formatTaka(row.max)}
                </td>
                <td className="px-4 py-2.5 text-right font-bold text-ink">
                  {formatTaka(row.avg)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

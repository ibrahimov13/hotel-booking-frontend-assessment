import type { DailyPriceDetail } from '../../types/booking'

interface DailyBreakdownTableProps {
  rows: DailyPriceDetail[]
}

const formatValue = (label?: string, price?: number) => {
  if (!price) return '—'
  return label ? `${label} · $${price}` : `$${price}`
}

export const DailyBreakdownTable = ({ rows }: DailyBreakdownTableProps) => {
  if (!rows.length) {
    return (
      <p className="text-sm text-slate-500">
        Complete Steps 1 & 2 to see a detailed breakdown.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto overflow-hidden rounded-2xl border border-slate-100">
      <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-2 py-3 text-left sm:px-4">Day</th>
            <th className="px-2 py-3 text-left sm:px-4">Hotel</th>
            <th className="px-2 py-3 text-left sm:px-4">Lunch</th>
            <th className="px-2 py-3 text-left sm:px-4">Dinner</th>
            <th className="px-2 py-3 text-right sm:px-4">Daily total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.dayLabel}>
              <td className="px-2 py-3 font-semibold text-slate-900 sm:px-4">
                {row.dayLabel}
              </td>
              <td className="px-2 py-3 sm:px-4">${row.hotelPrice}</td>
              <td className="px-2 py-3 sm:px-4">{formatValue(row.lunchLabel, row.lunchPrice)}</td>
              <td className="px-2 py-3 sm:px-4">
                {formatValue(row.dinnerLabel, row.dinnerPrice)}
              </td>
              <td className="px-2 py-3 text-right font-semibold text-slate-900 sm:px-4">
                ${row.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


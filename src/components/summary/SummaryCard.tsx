interface SummaryCardProps {
  items: Array<{
    label: string
    value: string
  }>
}

export const SummaryCard = ({ items }: SummaryCardProps) => (
  <dl className="grid gap-4">
    {items.map((item) => (
      <div
        key={item.label}
        className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
      >
        <dt className="text-xs uppercase tracking-wide text-slate-500">
          {item.label}
        </dt>
        <dd className="text-base font-semibold text-slate-800">
          {item.value || '—'}
        </dd>
      </div>
    ))}
  </dl>
)


import type { SelectHTMLAttributes } from 'react'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  placeholder?: string
  error?: string
}

export const SelectField = ({
  label,
  placeholder = 'Select an option',
  error,
  children,
  ...props
}: SelectFieldProps) => (
  <label className="flex flex-col gap-1 text-sm text-slate-600">
    <span className="font-semibold text-slate-800">{label}</span>
    <select
      {...props}
      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/40"
    >
      <option value="">{placeholder}</option>
      {children}
    </select>
    {error ? <span className="text-xs text-rose-600">{error}</span> : null}
  </label>
)


import type { InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const InputField = ({ label, error, ...props }: InputFieldProps) => (
  <label className="flex flex-col gap-1 text-sm text-slate-600">
    <span className="font-semibold text-slate-800">{label}</span>
    <input
      {...props}
      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/40"
    />
    {error ? <span className="text-xs text-rose-600">{error}</span> : null}
  </label>
)


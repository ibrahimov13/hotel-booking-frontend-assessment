import type { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export const FormSection = ({
  title,
  description,
  children,
}: FormSectionProps) => (
  <div className="space-y-3 rounded-xl border border-slate-100 bg-white p-4">
    <div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {description ? (
        <p className="text-sm text-slate-500">{description}</p>
      ) : null}
    </div>
    {children}
  </div>
)


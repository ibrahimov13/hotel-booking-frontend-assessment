import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  description?: string
  children: ReactNode
}

export const Card = ({ title, description, children }: CardProps) => (
  <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
    {title ? (
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        {description ? (
          <p className="text-sm text-slate-500">{description}</p>
        ) : null}
      </header>
    ) : null}
    {children}
  </section>
)


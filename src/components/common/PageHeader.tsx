interface PageHeaderProps {
  title: string
  subtitle?: string
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <div className="mb-8">
    <p className="text-sm uppercase tracking-widest text-brand-muted">
      Booking Wizard
    </p>
    <h1 className="text-3xl font-bold text-brand">{title}</h1>
    {subtitle ? (
      <p className="mt-2 text-base text-slate-500">{subtitle}</p>
    ) : null}
  </div>
)


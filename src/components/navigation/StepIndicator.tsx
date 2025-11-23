import { NavLink } from 'react-router-dom'

const steps = [
  { id: 1, label: 'Step 1', path: '/' },
  { id: 2, label: 'Step 2', path: '/step-2' },
  { id: 3, label: 'Step 3', path: '/step-3' },
]

export const StepIndicator = () => (
  <nav className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-2 sm:flex-row sm:gap-4 sm:p-4">
    {steps.map((step) => (
      <NavLink
        key={step.id}
        to={step.path}
        className={({ isActive }) =>
          [
            'w-full flex-1 rounded-xl px-3 py-2 text-center text-xs font-semibold transition sm:px-4 sm:text-sm',
            isActive
              ? 'bg-brand text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-900',
          ].join(' ')
        }
      >
        {step.label}
      </NavLink>
    ))}
  </nav>
)


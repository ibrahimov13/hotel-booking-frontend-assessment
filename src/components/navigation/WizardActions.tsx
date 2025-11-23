import type { ReactNode } from 'react'

interface WizardActionsProps {
  leftSlot?: ReactNode
  rightSlot?: ReactNode
}

export const WizardActions = ({ leftSlot, rightSlot }: WizardActionsProps) => (
  <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex-1">{leftSlot}</div>
    <div className="flex justify-end gap-3">{rightSlot}</div>
  </div>
)


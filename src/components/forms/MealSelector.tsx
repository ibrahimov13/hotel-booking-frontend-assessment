import clsx from 'clsx'
import { boardTypes } from '../../data/options'
import type { BoardCode } from '../../types/booking'

interface MealSelectorProps {
  boardType: BoardCode | ''
}

export const MealSelector = ({ boardType }: MealSelectorProps) => (
  <div className="grid gap-4 sm:grid-cols-3">
    {boardTypes.map((board) => (
      <div
        key={board.code}
        className={clsx(
          'rounded-xl border p-4 text-sm transition',
          boardType === board.code
            ? 'border-brand bg-brand/5 text-brand'
            : 'border-slate-200 bg-slate-50 text-slate-600',
        )}
      >
        <p className="text-base font-semibold text-slate-800">{board.name}</p>
        <p className="text-xs text-slate-500">{board.description}</p>
        {board.code === 'FB' && (
          <ul className="mt-3 list-disc ps-4 text-xs text-slate-500">
            <li>Lunch & dinner selectable each day</li>
          </ul>
        )}
        {board.code === 'HB' && (
          <ul className="mt-3 list-disc ps-4 text-xs text-slate-500">
            <li>Pick lunch or dinner per day</li>
          </ul>
        )}
        {board.code === 'NB' && (
          <ul className="mt-3 list-disc ps-4 text-xs text-slate-500">
            <li>Meals disabled in planner</li>
          </ul>
        )}
      </div>
    ))}
  </div>
)


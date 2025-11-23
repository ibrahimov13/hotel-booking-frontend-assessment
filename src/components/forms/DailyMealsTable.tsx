import type { BoardCode, DailyMealSelection, MealOption } from '../../types/booking'
import { MealDropdown } from './MealDropdown'

interface DailyMealsTableProps {
  days: string[]
  boardType: BoardCode | ''
  selections: DailyMealSelection[]
  mealOptions?: {
    lunch: MealOption[]
    dinner: MealOption[]
  }
  onMealChange: (
    dayIndex: number,
    type: 'lunch' | 'dinner',
    mealId: number | null,
  ) => void
}

export const DailyMealsTable = ({
  days,
  boardType,
  selections,
  mealOptions,
  onMealChange,
}: DailyMealsTableProps) => {
  if (!mealOptions) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
        Select a destination country in Step 1 to unlock meal options.
      </div>
    )
  }

  const mealsDisabled = boardType === 'NB'

  return (
    <div className="overflow-hidden rounded-xl border border-slate-100">
      <table className="min-w-full divide-y divide-slate-200 text-left">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Day</th>
            <th className="px-4 py-3">Lunch</th>
            <th className="px-4 py-3">Dinner</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
          {days.map((dayLabel, index) => {
            const selection = selections[index]
            return (
              <tr key={dayLabel}>
                <td className="px-4 py-3 font-medium">{dayLabel}</td>
                <td className="px-4 py-3">
                  <MealDropdown
                    meals={mealOptions.lunch}
                    value={selection?.lunchId ?? null}
                    disabled={mealsDisabled}
                    onChange={(mealId) => onMealChange(index, 'lunch', mealId)}
                  />
                </td>
                <td className="px-4 py-3">
                  <MealDropdown
                    meals={mealOptions.dinner}
                    value={selection?.dinnerId ?? null}
                    disabled={mealsDisabled}
                    onChange={(mealId) => onMealChange(index, 'dinner', mealId)}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}


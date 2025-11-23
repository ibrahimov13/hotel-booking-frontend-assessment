import type { MealOption } from '../../types/booking'

interface MealDropdownProps {
  meals: MealOption[]
  value: number | null
  disabled?: boolean
  onChange: (mealId: number | null) => void
  placeholder?: string
}

export const MealDropdown = ({
  meals,
  value,
  disabled,
  onChange,
  placeholder = 'Select meal',
}: MealDropdownProps) => (
  <select
    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 disabled:bg-slate-50 disabled:text-slate-400"
    value={value !== null && value !== undefined ? String(value) : ''}
    disabled={disabled}
    onChange={(event) => {
      const selectedValue = event.target.value
      onChange(selectedValue ? Number(selectedValue) : null)
    }}
  >
    <option value="">{placeholder}</option>
    {meals.map((meal) => (
      <option key={meal.id} value={meal.id}>
        {meal.name} · ${meal.price}
      </option>
    ))}
  </select>
)


import { InputField } from './InputField'

interface DateRangePickerProps {
  startDate: string
  nights: number
  onStartDateChange?: (value: string) => void
  onNightChange?: (value: number) => void
  errors?: {
    startDate?: string
    nights?: string
  }
}

export const DateRangePicker = ({
  startDate,
  nights,
  onStartDateChange,
  onNightChange,
  errors,
}: DateRangePickerProps) => (
  <div className="grid gap-4 sm:grid-cols-2">
    <InputField
      type="date"
      label="Start Date"
      value={startDate}
      error={errors?.startDate}
      onChange={(event) => onStartDateChange?.(event.target.value)}
    />
    <InputField
      type="number"
      min={1}
      label="Number of Nights"
      value={nights}
      error={errors?.nights}
      onChange={(event) => onNightChange?.(Number(event.target.value))}
    />
  </div>
)


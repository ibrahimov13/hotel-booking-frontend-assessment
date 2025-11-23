const dayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

export const generateTravelDays = (
  startDate: string,
  nights: number,
): string[] => {
  const safeNights = Math.max(1, Number.isNaN(nights) ? 1 : nights)

  if (!startDate) {
    return Array.from({ length: safeNights }, (_, index) => `Day ${index + 1}`)
  }

  const start = new Date(startDate)

  return Array.from({ length: safeNights }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return `${dayFormatter.format(date)}`
  })
}

export const formatDateRange = (startDate: string, nights: number) => {
  if (!startDate) return 'TBD'

  const start = new Date(startDate)
  const end = new Date(startDate)
  end.setDate(start.getDate() + Math.max(0, nights - 1))

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  })

  const startLabel = formatter.format(start)
  const endLabel = formatter.format(end)

  return nights > 1 ? `${startLabel} → ${endLabel}` : startLabel
}


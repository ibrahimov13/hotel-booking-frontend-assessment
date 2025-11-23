import type {
  BasicConfig,
  BoardCode,
  DailyMealSelection,
  DateRangeConfig,
} from '../types/booking'

export type StepOneErrors = Partial<{
  citizenship: string
  startDate: string
  nights: string
  country: string
  hotelId: string
  boardType: string
}>

export const validateStepOne = (
  basics: BasicConfig,
  dateRange: DateRangeConfig,
): StepOneErrors => {
  const errors: StepOneErrors = {}

  if (!basics.citizenship.trim()) {
    errors.citizenship = 'Citizenship is required.'
  }

  if (!dateRange.startDate) {
    errors.startDate = 'Start date is required.'
  }

  if (!dateRange.nights || dateRange.nights < 1) {
    errors.nights = 'Stay must be at least one night.'
  }

  if (!basics.country) {
    errors.country = 'Destination country is required.'
  }

  if (!basics.boardType) {
    errors.boardType = 'Board type must be selected.'
  }

  if (!basics.hotelId) {
    errors.hotelId = 'Please choose a hotel.'
  }

  return errors
}

export const validateDailyMeals = (
  boardType: BoardCode | '',
  dailyMeals: DailyMealSelection[],
  nights: number,
): { isValid: boolean; message?: string } => {
  if (!boardType) {
    return { isValid: false, message: 'Please complete Step 1 first.' }
  }

  const limitedMeals = dailyMeals.slice(0, nights)

  if (boardType === 'NB') {
    const hasMeals = limitedMeals.some(
      (entry) => entry.lunchId || entry.dinnerId,
    )
    if (hasMeals) {
      return {
        isValid: false,
        message: 'Meals cannot be selected when No Board is chosen.',
      }
    }
    return { isValid: true }
  }

  if (boardType === 'HB') {
    const invalidDay = limitedMeals.find(
      (entry) => entry.lunchId && entry.dinnerId,
    )
    if (invalidDay) {
      return {
        isValid: false,
        message: `Day ${invalidDay.dayIndex + 1}: choose lunch OR dinner for Half Board.`,
      }
    }
  }

  return { isValid: true }
}


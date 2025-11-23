export type BoardCode = 'FB' | 'HB' | 'NB'

export interface CountryOption {
  id: number
  name: string
}

export interface HotelOption {
  id: number
  name: string
  price: number
}

export interface MealOption {
  id: number
  name: string
  price: number
}

export interface DateRangeConfig {
  startDate: string
  nights: number
}

export interface BasicConfig {
  citizenship: string
  country: string
  boardType: BoardCode | ''
  hotelId: number | null
}

export interface DailyMealSelection {
  dayIndex: number
  lunchId: number | null
  dinnerId: number | null
}

export interface DailyPriceDetail {
  dayLabel: string
  hotelPrice: number
  lunchPrice: number
  dinnerPrice: number
  total: number
  lunchLabel?: string
  dinnerLabel?: string
}

export interface PricingBreakdown {
  hotelTotal: number
  mealTotal: number
  grandTotal: number
  days: DailyPriceDetail[]
}

export interface BookingState {
  basics: BasicConfig
  dateRange: DateRangeConfig
  dailyMeals: DailyMealSelection[]
  pricing: PricingBreakdown
}

export interface BookingContextValue {
  state: BookingState
  updateBasics: (payload: Partial<BasicConfig>) => void
  updateDateRange: (payload: Partial<DateRangeConfig>) => void
  setDailyMeals: (
    dayIndex: number,
    payload: Partial<Omit<DailyMealSelection, 'dayIndex'>>,
  ) => void
  setPricing: (payload: Partial<PricingBreakdown>) => void
  resetBooking: () => void
}

export const initialBookingState: BookingState = {
  basics: {
    citizenship: '',
    country: '',
    boardType: '',
    hotelId: null,
  },
  dateRange: {
    startDate: '',
    nights: 1,
  },
  dailyMeals: [],
  pricing: {
    hotelTotal: 0,
    mealTotal: 0,
    grandTotal: 0,
    days: [],
  },
}


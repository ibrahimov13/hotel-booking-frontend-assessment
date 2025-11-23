import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import {
  initialBookingState,
  type BasicConfig,
  type BookingContextValue,
  type BookingState,
  type DailyMealSelection,
  type DateRangeConfig,
  type PricingBreakdown,
} from '../types/booking'
import { loadBookingState, saveBookingState, clearBookingState } from '../utils/storage'

type BookingAction =
  | { type: 'UPDATE_BASICS'; payload: Partial<BasicConfig> }
  | { type: 'UPDATE_DATES'; payload: Partial<DateRangeConfig> }
  | {
      type: 'SET_DAILY_MEALS'
      payload: { dayIndex: number; data: Partial<DailyMealSelection> }
    }
  | { type: 'SET_PRICING'; payload: Partial<PricingBreakdown> }
  | { type: 'RESET' }

const BookingContext = createContext<BookingContextValue | undefined>(undefined)

const clampNights = (value?: number) => {
  if (!value || Number.isNaN(value)) {
    return 1
  }
  return Math.max(1, Math.floor(value))
}

const createEmptyDailyMeals = (nights: number): DailyMealSelection[] =>
  Array.from({ length: nights }, (_, index) => ({
    dayIndex: index,
    lunchId: null,
    dinnerId: null,
  }))

const resizeDailyMeals = (
  meals: DailyMealSelection[],
  nights: number,
): DailyMealSelection[] => {
  const padded = createEmptyDailyMeals(nights)

  return padded.map((entry, index) => ({
    ...entry,
    ...meals[index],
    dayIndex: index,
  }))
}

const clearMealSelections = (
  meals: DailyMealSelection[],
): DailyMealSelection[] =>
  meals.map((entry) => ({
    ...entry,
    lunchId: null,
    dinnerId: null,
  }))

const bookingReducer = (
  state: BookingState,
  action: BookingAction,
): BookingState => {
  switch (action.type) {
    case 'UPDATE_BASICS': {
      const nextBasics = { ...state.basics, ...action.payload }
      let nextDailyMeals = state.dailyMeals

      if (
        action.payload.country &&
        action.payload.country !== state.basics.country
      ) {
        nextBasics.hotelId = null
        nextDailyMeals = createEmptyDailyMeals(state.dateRange.nights)
      }

      if (
        action.payload.boardType &&
        action.payload.boardType !== state.basics.boardType &&
        action.payload.boardType === 'NB'
      ) {
        nextDailyMeals = clearMealSelections(nextDailyMeals)
      }

      return {
        ...state,
        basics: nextBasics,
        dailyMeals: nextDailyMeals,
      }
    }

    case 'UPDATE_DATES': {
      const nextNights = clampNights(action.payload.nights ?? undefined)
      const nextDateRange: DateRangeConfig = {
        ...state.dateRange,
        ...action.payload,
        nights: nextNights,
      }

      const nextDailyMeals = resizeDailyMeals(state.dailyMeals, nextNights)

      return {
        ...state,
        dateRange: nextDateRange,
        dailyMeals: nextDailyMeals,
      }
    }

    case 'SET_DAILY_MEALS': {
      const { dayIndex, data } = action.payload
      const syncedMeals = resizeDailyMeals(
        state.dailyMeals,
        state.dateRange.nights,
      )

      const updatedMeals = syncedMeals.map((entry) =>
        entry.dayIndex === dayIndex ? { ...entry, ...data } : entry,
      )

      return { ...state, dailyMeals: updatedMeals }
    }

    case 'SET_PRICING':
      return {
        ...state,
        pricing: {
          ...state.pricing,
          ...action.payload,
        },
      }

    case 'RESET':
      return initialBookingState

    default:
      return state
  }
}

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    bookingReducer,
    undefined,
    () => loadBookingState(),
  )

  useEffect(() => {
    const hasData =
      state.basics.citizenship ||
      state.basics.country ||
      state.dateRange.startDate ||
      state.dailyMeals.length > 0

    if (hasData) {
      const timeoutId = setTimeout(() => {
        saveBookingState(state)
      }, 300) 

      return () => clearTimeout(timeoutId)
    }
  }, [state])

  const updateBasics = useCallback(
    (payload: Partial<BasicConfig>) =>
      dispatch({ type: 'UPDATE_BASICS', payload } as BookingAction),
    [],
  )

  const updateDateRange = useCallback(
    (payload: Partial<DateRangeConfig>) =>
      dispatch({ type: 'UPDATE_DATES', payload } as BookingAction),
    [],
  )

  const setDailyMeals = useCallback(
    (dayIndex: number, payload: Partial<Omit<DailyMealSelection, 'dayIndex'>>) =>
      dispatch({
        type: 'SET_DAILY_MEALS',
        payload: { dayIndex, data: { dayIndex, ...payload } },
      } as BookingAction),
    [],
  )

  const setPricing = useCallback(
    (payload: Partial<PricingBreakdown>) =>
      dispatch({ type: 'SET_PRICING', payload } as BookingAction),
    [],
  )

  const resetBooking = useCallback(() => {
    dispatch({ type: 'RESET' })
    clearBookingState()
  }, [])

  const value: BookingContextValue = useMemo(
    () => ({
      state,
      updateBasics,
      updateDateRange,
      setDailyMeals,
      setPricing,
      resetBooking,
    }),
    [state, updateBasics, updateDateRange, setDailyMeals, setPricing, resetBooking],
  )

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}

export default BookingContext


import type { BookingState } from '../types/booking'
import { initialBookingState } from '../types/booking'

const STORAGE_KEY = 'hotel-booking-state'

export const saveBookingState = (state: BookingState): void => {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serialized)
  } catch (error) {
    console.warn('Failed to save booking state to localStorage:', error)
  }
}

export const loadBookingState = (): BookingState => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY)
    if (!serialized) {
      return initialBookingState
    }

    const parsed = JSON.parse(serialized) as BookingState
    if (
      parsed &&
      typeof parsed === 'object' &&
      'basics' in parsed &&
      'dateRange' in parsed &&
      'dailyMeals' in parsed &&
      'pricing' in parsed
    ) {
      return parsed
    }

    return initialBookingState
  } catch (error) {
    console.warn('Failed to load booking state from localStorage:', error)
    return initialBookingState
  }
}

export const clearBookingState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.warn('Failed to clear booking state from localStorage:', error)
  }
}


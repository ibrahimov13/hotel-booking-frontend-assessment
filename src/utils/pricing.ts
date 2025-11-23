import { hotelsByCountry, mealOptions } from '../data/options'
import type {
  BookingState,
  DailyPriceDetail,
  MealOption,
  PricingBreakdown,
} from '../types/booking'
import { generateTravelDays } from './date'

export const getSelectedHotel = (country: string, hotelId: number | null) => {
  if (!country || !hotelId) return undefined
  const hotelList = hotelsByCountry[country] ?? []
  return hotelList.find((hotel) => hotel.id === hotelId)
}

const findHotelPrice = (country: string, hotelId: number | null) =>
  getSelectedHotel(country, hotelId)?.price ?? 0

const findMealById = (
  country: string,
  type: 'lunch' | 'dinner',
  mealId: number | null,
): MealOption | undefined => {
  if (!country || !mealId) return undefined
  return mealOptions[country]?.[type]?.find((meal) => meal.id === mealId)
}

export const calculateHotelTotal = (pricePerNight: number, nights: number) =>
  pricePerNight * Math.max(1, nights)

export const calculateMealTotal = (days: DailyPriceDetail[]) =>
  days.reduce((sum, entry) => sum + (entry.lunchPrice + entry.dinnerPrice), 0)

export const calculateGrandTotal = (
  hotelTotal: number,
  mealTotal: number,
) => hotelTotal + mealTotal

export const buildPricingBreakdown = (state: BookingState): PricingBreakdown => {
  const { basics, dateRange, dailyMeals } = state
  const hotelPrice = findHotelPrice(basics.country, basics.hotelId)
  const days = generateTravelDays(dateRange.startDate, dateRange.nights)

  const dayDetails: DailyPriceDetail[] = days.map((label, index) => {
    const selection = dailyMeals[index]
    const lunch = findMealById(basics.country, 'lunch', selection?.lunchId ?? null)
    const dinner = findMealById(
      basics.country,
      'dinner',
      selection?.dinnerId ?? null,
    )

    const lunchPrice = lunch?.price ?? 0
    const dinnerPrice = dinner?.price ?? 0
    const total = hotelPrice + lunchPrice + dinnerPrice

    return {
      dayLabel: label,
      hotelPrice,
      lunchPrice,
      dinnerPrice,
      total,
      lunchLabel: lunch?.name,
      dinnerLabel: dinner?.name,
    }
  })

  const hotelTotal = calculateHotelTotal(hotelPrice, days.length)
  const mealTotal = calculateMealTotal(dayDetails)
  const grandTotal = calculateGrandTotal(hotelTotal, mealTotal)

  return {
    days: dayDetails,
    hotelTotal,
    mealTotal,
    grandTotal,
  }
}

